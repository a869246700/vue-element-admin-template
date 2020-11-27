<template>
  <el-card class="normal-panel-item">
    <div class="data-wrapper">
      <div class="left-wrapper">
        <div class="title">项目基础信息</div>
        <div class="basic-content">
          <div class="project-info">
            <div class="project">{{ project }}</div>
            <div class="duty">
              <div class="avatar">
                <img v-if="isExistDutyAvatar" :src="dutyAvatar" @error="avatarErrorLoad">
                <img v-else src="@/assets/ka.png">
              </div>
              <div class="duty-info">
                <span class="name">{{ dutyInfo.name_cn }}</span>
                <span class="office">{{ dutyInfo.office }}</span>
              </div>
            </div>
          </div>

          <!-- 多项目阶段，项目阶段切换 -->
          <div v-if="isMultiProjectStage" class="multi-stage-change">
            <el-radio-group
              v-model="currentProjectStageLabel"
              size="mini"
              @change="handleProjectStageChange"
            >
              <el-radio-button
                v-for="(item, index) in projectStageLabelList"
                :key="index"
                :label="item"
              >
                <span class="one-row">{{ item }}</span>
              </el-radio-button>
            </el-radio-group>
          </div>

          <!-- 项目周期 -->
          <div class="project-cycle-wrapper">
            <div class="project-cycle" :class="isMultiProjectStage ? 'mt30' : 'mt40'">
              <i class="iconfont icon-clock icon" />
              <div class="content">
                <div>{{ `${currentProjectStage.project_start} ~ ${currentProjectStage.project_start}` }}</div>
                <span>项目周期</span>
              </div>
            </div>

            <div class="project-cycle" :class="isMultiProjectStage ? 'mt30' : 'mt40'">
              <i class="icon el-icon-suitcase" />
              <div class="content">
                <div>{{ `${currentProjectStage.defect}个/kloc / ${currentProjectStage.defect_target}个/kloc` }}</div>
                <span>项目缺陷数量 / 目标数量（总）</span>
              </div>
            </div>

            <div class="project-cycle" :class="isMultiProjectStage ? 'mt30' : 'mt40'">
              <i class="icon el-icon-date" />
              <div class="content">
                <div>{{ `项目成本：${currentProjectStage.cost}D/k，目标：${currentProjectStage.cost_target}D/k` }}</div>
                <div>
                  <el-progress :percentage="Math.round(currentProjectStage.cost / currentProjectStage.cost_target * 100)" style="width: 100%;" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-wrapper">
        <div class="title">
          <div>{{ '阶段：' + currentMilestone.stage }}</div>
          <el-popover v-model="isPopoverShow" placement="bottom" width="50" trigger="click">
            <div class="operation">
              <div @click="handleEditClick">编辑</div>
              <div @click="handleDeleteClick">删除</div>
            </div>
            <i slot="reference" class="el-icon-more" />
          </el-popover>
        </div>
        <div class="progress">
          <el-steps>
            <el-step status="process">
              <template #icon>
                <div class="dot">
                  <span class="text">开始</span>
                </div>
              </template>
              <template #title>
                <span style="font-size: 13px">启动日期</span>
              </template>
              <template #description>
                <span style="font-size: 12px">
                  {{ currentMilestone.plan_start_date | parseTime('{y}-{m}-{d}') }}
                </span>
              </template>
            </el-step>

            <el-step status="finish">
              <template #icon>
                <div class="dot">
                  <span class="text">进行中</span>
                </div>
              </template>
              <template #title>
                <span style="font-size: 13px">当前进度</span>
              </template>
              <template #description>
                <span style="font-size: 12px">
                  {{ new Date() | parseTime('{y}-{m}-{d}') }}
                </span>
              </template>
            </el-step>

            <el-step :status="currentMilestone.delay ? 'error' : 'wait'">
              <template #icon>
                <div class="dot">
                  <span class="text">结束</span>
                </div>
              </template>
              <template #title>
                <span style="font-size: 13px">完成日期</span>
              </template>
              <template #description>
                <span style="font-size: 12px">
                  {{ currentMilestone.plan_end_date | parseTime('{y}-{m}-{d}') }}
                </span>
              </template>
            </el-step>
          </el-steps>
        </div>

        <!-- 项目总体测试 -->
        <div class="total-test" style="padding-top: 20px; border-top: 1px solid #d9d9d9;">
          <div class="title">内测里程碑</div>
          <div class="progress">
            <el-steps :active="currentMilestoneIndex" finish-status="success" process-status="finish">
              <el-step
                v-for="(item, index) in currentProjectStage.milestoneList"
                :key="index"
                :status="calcMilestoneStatus(item.actual_end_date, item.plan_end_date, index)"
              >
                <template #icon>
                  <div class="dot">
                    <span v-if="currentMilestoneIndex === index" class="text">当前阶段</span>
                    <span v-else class="text">{{ item.stage }}</span>
                  </div>
                </template>
                <template #title>
                  <el-popover placement="top-start" trigger="hover" class="popover">
                    <div>阶段：{{ item.stage }}</div>
                    <div>计划结束时间：{{ item.plan_end_date | parseTime('{y}-{m}-{d}') }}</div>
                    <div v-if="item.actual_end_date">实际结束时间：{{ item.actual_end_date | parseTime('{y}-{m}-{d}') }}</div>
                    <div v-if="item.actual_start_date">实际开始时间：{{ item.actual_start_date | parseTime('{y}-{m}-{d}') }}</div>
                    <div v-if="item.deviation">偏差率：{{ item.deviation + '%' }}</div>
                    <span slot="reference" style="font-size: 13px; cursor: pointer;">{{ item.stage }}</span>
                  </el-popover>
                </template>
                <template #description>
                  <div
                    v-if="item.progress !== 0 && item.actual_end_date && item.deviation && item.actual_start_date"
                  >
                    <div>计划结束:{{ item.plan_end_date | parseTime('{y}-{m}-{d}') }}</div>
                    <div>实际结束:{{ item.actual_end_date | parseTime('{y}-{m}-{d}') }}</div>
                    <div>偏差率:{{ item.deviation + '%' }}</div>
                  </div>
                  <span v-else style="font-size: 12px;">计划结束{{ item.plan_end_date | parseTime('{y}-{m}-{d}') }}</span>
                </template>
              </el-step>
            </el-steps>
          </div>
        </div>
      </div>
    </div>
    <div class="other-info">
      <el-row :gutter="20" style="margin-top: 20px; height: 110px;">
        <el-col :span="7">
          <div class="flex" style="height: 40px;">
            <i class="el-icon-s-order icon" />
            <div>
              <div>{{ `${currentProjectStage.package_defect}个/k ~ ${currentProjectStage.package_defect_target}个/k` }}</div>
              <div style="margin-top: 5px;">工作包缺陷质量(实际/目标)</div>
            </div>
          </div>

          <div class="flex" style="margin-top: 30px; height: 40px;">
            <i class="el-icon-s-order icon" />
            <div>
              <div>{{ `${currentProjectStage.omiss_bug_defect}个/k ~ ${currentProjectStage.omiss_bug_defect_target}个/k` }}</div>
              <div style="margin-top: 5px;">遗留BUG缺陷质量(实际/目标)</div>
            </div>
          </div>
        </el-col>

        <el-col :span="9">
          <div class="flex" style="height: 40px;">
            <i class="iconfont icon-clock icon" />
            <div>
              <div>当前轮次 进度偏差率：{{ `${currentProjectStage.current_deviation_rate}%（delay ${currentProjectStage.current_deviation_day}D）` }}</div>
              <div
                style="margin-top: 5px;"
              >项目整体 进度偏差率：{{ `${currentProjectStage.total_deviation_rate}%（delay ${currentProjectStage.total_deviation_day}D）` }}</div>
            </div>
          </div>

          <div class="flex" style="margin-top: 30px; height: 40px;">
            <i class="el-icon-s-operation icon" />
            <div>
              <div v-if="currentProjectStage.deviation_round">
                <span>已偏差轮次</span>
                <span v-for="item in currentProjectStage.deviation_round" :key="item.stage">
                  {{ `${item.stage}(${item.rate}% ${item.day}D)` }}、
                </span>
              </div>
              <div v-else>已偏差轮次：暂无</div>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div>项目风险结项情况</div>
          <div class="flex" style="margin-top: 20px; height: 40px;">
            <div class="flex" style="margin-right: 20px;">
              <i class="el-icon-warning icon" style="color: #ff3333" />
              <div>
                <div>{{ currentProjectStage.risk || 0 }}</div>
                <span>总风险项</span>
              </div>
            </div>
            <div class="flex" style="height: 40px;">
              <i class="el-icon-s-claim icon" style="color: #13ce66" />
              <div>
                <div>{{ currentProjectStage.knot || 0 }}</div>
                <span>已结项</span>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="1" class="flex enter">
          <el-button type="primary" icon="el-icon-right" circle />
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  filters: {
    parseTime
  },
  props: {
    // 项目名
    project: {
      type: String,
      default: '12.5PL1'
    },
    // 负责人信息
    dutyInfo: {
      type: Object,
      default() {
        return {
          name_cn: '叶轩乾',
          name_en: 'gaoyu',
          office: 'PTM'
        }
      }
    },
    // 项目多阶段数据列表
    projectStageList: {
      type: Array,
      default: () => [
        {
          project: '测试项目名1', // 项目名
          duty_name: '叶轩乾1', // 负责人名
          duty_office: '', // 负责人职位
          project_start: '2020-09-01', // 项目启动时间
          project_end: '2020-11-30', // 项目结束时间
          defect: '1.96', // 当前缺陷数
          defect_target: '2.3', // 缺陷总目标
          cost: '750', // 当前成本
          cost_target: '1500', // 当前成本总目标
          current_stage: '准入测试',
          package_defect: '0.96', // 工作包缺陷
          package_defect_target: '2.3', // 工作包缺陷总目标
          omiss_bug_defect: '1.3', // 遗留BUG缺陷质量
          omiss_bug_defect_target: '0.8', // 遗留BUG缺陷质量总目标
          current_deviation_rate: '0', // 当前轮次 进度偏差率
          current_deviation_day: '0', // 当前轮次 进度偏差天数
          total_deviation_rate: '30', // 项目整体 进度偏差率
          total_deviation_day: '12', // 项目整体 进度偏差天数
          risk: '10', // 总风险项数量
          knot: '23', // 已结项
          // 偏差周期信息
          deviation_round: [
            {
              stage: '准入',
              rate: '10',
              day: '2'
            },
            {
              stage: '首轮',
              rate: '5',
              day: '3'
            },
            {
              stage: '次轮',
              rate: '8',
              day: '2'
            }
          ],
          // 里程碑数据
          milestoneList: [
            {
              stage: '准入测试',
              plan_start_date: new Date('2021-01-01'),
              plan_end_date: new Date('2021-01-30'),
              actual_start_date: new Date('2021-01-01'),
              actual_end_date: new Date('2021-01-21'),
              deviation: 10 // 偏差率
            },
            {
              stage: '首轮测试',
              plan_start_date: new Date('2021-02-01'),
              plan_end_date: new Date('2021-02-30'),
              actual_start_date: new Date('2021-02-01'),
              actual_end_date: new Date('2021-02-21'),
              deviation: 10 // 偏差率
            },
            {
              stage: '次轮测试',
              plan_start_date: new Date('2021-03-01'),
              plan_end_date: new Date('2021-03-31'),
              actual_start_date: new Date('2021-03-01'),
              actual_end_date: new Date('2021-03-30'),
              deviation: 20 // 偏差率
            },
            {
              stage: '首轮回归',
              plan_start_date: new Date('2021-04-01'),
              plan_end_date: new Date('2021-04-30'),
              actual_start_date: new Date('2021-04-01'),
              actual_end_date: new Date('2021-04-31'),
              deviation: 30 // 偏差率
            },
            {
              stage: '次轮回归',
              plan_start_date: new Date('2021-05-01'),
              plan_end_date: new Date('2021-05-30'),
              actual_start_date: new Date('2021-05-01'),
              actual_end_date: new Date('2021-05-31'),
              deviation: 40 // 偏差率
            },
            {
              stage: '发布',
              plan_start_date: new Date('2021-06-01'),
              plan_end_date: new Date('2021-06-30'),
              actual_start_date: new Date('2021-06-01'),
              actual_end_date: new Date('2021-06-21'),
              deviation: 0 // 偏差率
            }
          ]
        },
        {
          project: '测试项sdadsadasdasdsa目名2', // 项目名
          duty_name: '叶轩乾2', // 负责人名
          duty_office: '', // 负责人职位
          project_start: '2020-09-01', // 项目启动时间
          project_end: '2020-11-30', // 项目结束时间
          defect: '1.96', // 当前缺陷数
          defect_target: '2.3', // 缺陷总目标
          current_stage: '次轮',
          cost: '300', // 当前成本
          cost_target: '900', // 当前成本总目标
          // 里程碑数据
          milestoneList: [
            {
              stage: '首轮',
              plan_start_date: new Date('2021-09-01'),
              plan_end_date: new Date('2021-09-30'),
              actual_start_date: new Date('2021-10-01'),
              actual_end_date: new Date('2021-10-31'),
              deviation: 10 // 偏差率
            },
            {
              stage: '次轮',
              plan_start_date: new Date('2021-10-01'),
              plan_end_date: new Date('2021-10-31'),
              actual_start_date: new Date('2021-11-01'),
              actual_end_date: new Date('2021-11-30'),
              deviation: 20 // 偏差率
            },
            {
              stage: '首轮回归',
              plan_start_date: new Date('2021-11-01'),
              plan_end_date: new Date('2021-11-30'),
              actual_start_date: new Date('2021-12-01'),
              actual_end_date: new Date('2021-12-31'),
              deviation: 30 // 偏差率
            }
          ]
        },
        {
          project: '测试项目名3', // 项目名
          duty_name: '叶轩乾3', // 负责人名
          duty_office: '', // 负责人职位
          project_start: '2022-09-01', // 项目启动时间
          project_end: '2022-11-30', // 项目结束时间
          defect: '1.96', // 当前缺陷数
          defect_target: '2.3', // 缺陷总目标
          cost: '500', // 当前成本
          cost_target: '800', // 当前成本总目标
          current_stage: '首轮回归',
          // 里程碑数据
          milestoneList: [
            {
              stage: '首轮',
              delay: true,
              plan_start_date: new Date('2022-09-01'),
              plan_end_date: new Date('2022-09-30'),
              actual_start_date: new Date('2022-10-01'),
              actual_end_date: new Date('2022-10-31'),
              deviation: 10 // 偏差率
            },
            {
              stage: '次轮',
              delay: true,
              plan_start_date: new Date('2022-10-01'),
              plan_end_date: new Date('2022-10-31'),
              actual_start_date: new Date('2022-11-01'),
              actual_end_date: new Date('2022-11-30'),
              deviation: 10 // 偏差率
            },
            {
              stage: '首轮回归',
              delay: true,
              plan_start_date: new Date('2022-11-01'),
              plan_end_date: new Date('2022-11-30'),
              actual_start_date: new Date('2022-12-01'),
              actual_end_date: new Date('2022-12-31'),
              deviation: 10 // 偏差率
            }
          ]
        }
      ]
    }
  },
  data() {
    return {
      isPopoverShow: false,
      currentProjectStageLabel: '',
      projectStageLabelList: [],
      isExistDutyAvatar: true // 是否存在负责人头像
    }
  },
  computed: {
    // 是否是多阶段项目
    isMultiProjectStage() {
      return this.projectStageList.length > 1
    },
    // 当前阶段项目
    currentProjectStage() {
      return this.projectStageList ? this.projectStageList.find(e => e.project === this.currentProjectStageLabel) : null
    },
    // 当前里程碑数据
    currentMilestone() {
      return this.currentProjectStage ? this.currentProjectStage.milestoneList.find(e => e.stage === this.currentProjectStage.current_stage) : null
    },
    // 当前里程碑对应下标
    currentMilestoneIndex() {
      return this.currentProjectStage ? this.currentProjectStage.milestoneList.findIndex(e => e.stage === this.currentProjectStage.current_stage) : 0
    },
    // 负责人头像
    dutyAvatar() {
      return 'http://oa.ruijie.com.cn/ImgUser/' + this.dutyInfo.name_en + '.jpg'
    }
  },
  created() {
    this.currentProjectStageLabel = this.projectStageList.length > 0 && this.projectStageList[0].project
    this.projectStageLabelList = this.projectStageList.map((element) => element.project)
  },
  methods: {
    handleEditClick() {
      console.log('编辑')
      this.isPopoverShow = false
    },
    handleDeleteClick() {
      console.log('删除')
      this.isPopoverShow = false
    },
    // 切换当前项目阶段
    handleProjectStageChange(e) {
      console.log(e)
    },
    // 判断返回的状态
    calcMilestoneStatus(actualEndDate, planEndDate, index) {
      // 如果没有 actualEndDate
      if (!actualEndDate) {
        return 'finish'
      }
      // 如果下标超过，则显示等待状态
      if (index > this.currentMilestoneIndex - 1) {
        return ''
      } else if (index === this.currentMilestoneIndex - 1) {
        return actualEndDate > planEndDate ? 'error' : 'finish'
      } else {
        return actualEndDate > planEndDate ? 'error' : 'success'
      }
    },
    // 头像错误加载
    avatarErrorLoad() {
      this.isExistDutyAvatar = false
    }
  }
}
</script>

<style lang="scss" scoped>
.normal-panel-item {

  .data-wrapper {
    display: flex;

    .left-wrapper {
      height: 100%;
      // flex: 30%;
      // width: 320px;
      padding-right: 20px;

      .basic-content {
        margin-top: 20px;

        .project-info {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .project {
            font-size: 24px;
            font-weight: 700;
            color: #999;
          }
        }

        .duty {
          display: flex;
          align-items: center;

          .avatar img {
            width: 36px;
            height: 40px;
            border-radius: 50%;
          }

          .duty-info {
            margin-left: 8px;
            span {
              display: block;
            }
          }
        }

        .project-cycle-wrapper {
          margin-top: 15px;

          .project-cycle {
            display: flex;
            align-items: center;

            .content {
              margin-left: 10px;

              div {
                margin-bottom: 4px;
              }
            }
          }

          .mt30 {
            margin-top: 35px;
          }

          .mt40 {
            margin-top: 50px;
          }
        }

        .icon {
          font-size: 30px;
        }
      }
    }

    .right-wrapper {
      flex: 1;
      padding-left: 20px;
      border-left: 1px solid #ccc;

      .title {
        display: flex;
        justify-content: space-between;
      }

      .progress {
        margin-top: 35px;
        padding-bottom: 20px;
      }

      .dot {
        position: relative;

        .text {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translate(-50%);
          border: 1px solid;
          padding: 2px 4px;
          border-radius: 15px;
          font-size: 12px;
        }
      }
    }
  }

  .operation {
    > div {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #f1f1f1;
      }
    }
  }

  .multi-stage-change {
    margin-top: 15px;

    .one-row {
      width: 70px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
  }
}

.other-info {
  padding-top: 20px;
  border-top: 1px solid #d9d9d9;

  .flex {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 30px;
    font-size: 24px;
  }

  .enter {
    height: 100%;
    justify-content: center;
  }
}
</style>

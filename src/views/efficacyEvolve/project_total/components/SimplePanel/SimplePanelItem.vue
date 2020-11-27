<template>
  <el-card class="small-data-panel">
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
                <span class="name">{{ dutyInfo.name_cn || '无' }}</span>
                <span class="office">{{ dutyInfo.office || '无' }}</span>
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

          <div v-else class="multi-stage-change" />

          <!-- 项目周期 -->
          <div class="project-cycle-wrapper">
            <div class="project-cycle">
              <i class="iconfont icon-clock icon" />
              <div class="content">
                <div v-if="currentProjectStage">{{ currentProjectStage.project_start + '~' + currentProjectStage.project_start }}</div>
                <div v-else>暂无信息</div>
                <span>项目周期</span>
              </div>
            </div>

            <div class="project-cycle">
              <i class="icon el-icon-suitcase" />
              <div class="content">
                <div v-if="currentProjectStage">{{ `${currentProjectStage.defect}个/kloc - ${currentProjectStage.defect_target}个/kloc` }}</div>
                <div v-else>0个/kloc - 0个/kloc</div>
                <span>项目缺陷数量 / 目标数量（总）</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-wrapper">
        <div class="title">
          <div v-if="currentMilestone">{{ '阶段：' + currentMilestone.stage }}</div>
          <div v-else>阶段：暂无信息</div>
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
                <span v-if="currentMilestone" style="font-size: 12px">
                  {{ currentMilestone.plan_start_date | parseTime('{y}-{m}-{d}') }}
                </span>
                <span v-else style="font-size: 12px">
                  {{ new Date() | parseTime('{y}-{m}-{d}') }}
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

            <el-step :status="currentMilestone && (currentMilestone.plan_end_date < currentMilestone.actual_end_date) ? 'error' : 'wait'">
              <template #icon>
                <div class="dot">
                  <span class="text">结束</span>
                </div>
              </template>
              <template #title>
                <span style="font-size: 13px">完成日期</span>
              </template>
              <template #description>
                <span v-if="currentMilestone" style="font-size: 12px">
                  {{ currentMilestone.plan_end_date | parseTime('{y}-{m}-{d}') }}
                </span>
                <span v-else style="font-size: 12px">
                  {{ new Date() | parseTime('{y}-{m}-{d}') }}
                </span>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="bottom-btn">
          <span>点击前往</span>
          <el-button type="primary" icon="el-icon-right" circle />
        </div>
      </div>
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
      default: '项目名称'
    },
    // 负责人信息
    dutyInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // 项目多阶段数据列表
    projectStageList: {
      type: Array,
      default: () => []
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
    // 负责人头像
    dutyAvatar() {
      return this.dutyInfo ? 'http://oa.ruijie.com.cn/ImgUser/' + this.dutyInfo.name_en + '.jpg' : '@/assets/ka.png'
    }
  },
  created() {
    this.currentProjectStageLabel = this.projectStageList.length > 0 && this.projectStageList[0].project
    this.projectStageLabelList = this.projectStageList.map((element) => element.project)
  },
  methods: {
    handleEditClick() {
      this.$emit('edit', this.$props)
      this.isPopoverShow = false
    },
    handleDeleteClick() {
      this.$emit('delete', this.$props)
      this.isPopoverShow = false
    },
    // 切换当前项目阶段
    handleProjectStageChange(e) {
      console.log(e)
    },
    // 头像错误加载
    avatarErrorLoad() {
      this.isExistDutyAvatar = false
    }
  }
}
</script>

<style lang="scss" scoped>
.data-wrapper {
  height: 220px;
  display: flex;

  .left-wrapper {
    height: 100%;
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
        .project-cycle {
          display: flex;
          align-items: center;
          margin-top: 15px;

          .content {
            margin-left: 10px;

            div {
              margin-bottom: 4px;
            }
          }
        }

        .mt30 {
          margin-top: 25px;
        }

        .mt40 {
          margin-top: 40px;
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
      margin-top: 50px;
      margin-bottom: 30px;
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
  height: 25px;
  margin-top: 15px;

  .one-row {
    width: 70px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
}

.bottom-btn {
  margin: 10px 10px 0px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & span {
    margin-right: 5px;
  }
}
</style>

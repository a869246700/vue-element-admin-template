<template>
  <el-card id="project-total" title="在行项目信息看板">
    <div slot="header" class="header">
      <el-radio-group v-model="panelActive">
        <el-radio-button label="0">在行项目信息看板</el-radio-button>
        <el-radio-button label="1">历史项目信息看板</el-radio-button>
      </el-radio-group>

      <div class="flex-container">
        <div class="create-box pointer-type">
          <i class="el-icon-plus" style="font-size: 24px;" @click="handleCreateClick" />
        </div>

        <div class="panel-select">
          <div
            :class="sizeActive === '0' ? 'active' : ''"
            class="panel-select-icon pointer-type"
            style="border-right: 1px solid #d3d3d3;"
            @click="handleSizeChange(0)"
          >
            <svg-icon icon-class="list" class="icon" />
          </div>
          <div
            :class="sizeActive === '1' ? 'active' : ''"
            class="panel-select-icon pointer-type"
            @click="handleSizeChange(1)"
          >
            <svg-icon icon-class="component" class="icon" />
          </div>
        </div>
      </div>
    </div>

    <div class="project-item-wrapper">
      <transition name="fade" mode="out-in">
        <div v-if="panelSize" key="normal" class="normal-project-item">
          <normal-panel :list="list" @edit="handleEdit" @delete="handleDelete" />
        </div>

        <div v-else key="simple" class="small-project-item">
          <simple-panel :list="list" @edit="handleEdit" @delete="handleDelete" />
        </div>
      </transition>
    </div>
  </el-card>
</template>

<script>
import NormalPanel from './components/NormalPanel'
import SimplePanel from './components/SimplePanel'

export default {
  name: 'ProjectTotal',
  components: {
    NormalPanel,
    SimplePanel
  },
  data() {
    return {
      panelActive: '0', // 在行看板 和 历史看板切换
      sizeActive: '1', // 简易面板和常规面板切换
      list: [
        {
          project: '12.5PL1',
          dutyInfo: {
            name_cn: '叶轩乾',
            name_en: 'yexuanqian',
            office: 'PTM'
          },
          projectStageList: [
            {
              project: '测试项目名1', // 项目名
              duty_name: '叶轩乾1', // 负责人名
              duty_office: '', // 负责人职位
              project_start: '2020-09-01', // 项目启动时间
              project_end: '2020-11-30', // 项目结束时间
              defect: '2.96', // 当前缺陷数
              defect_target: '3.3', // 缺陷总目标
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
        },
        {
          project: '12.4PL1',
          dutyInfo: {
            name_cn: '高宇',
            name_en: 'gaoyu',
            office: 'PTM'
          },
          projectStageList: [
            {
              project: '测试项目名1', // 项目名
              duty_name: '叶轩乾1', // 负责人名
              duty_office: '', // 负责人职位
              project_start: '2020-09-01', // 项目启动时间
              project_end: '2020-11-30', // 项目结束时间
              defect: '2.96', // 当前缺陷数
              defect_target: '3.3', // 缺陷总目标
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
            }
          ]
        },
        {
          project: '12.6PL1',
          dutyInfo: {
            name_cn: '卢继伟',
            name_en: 'lujiwei',
            office: '无'
          },
          projectStageList: [
            {
              project: '测试项目名1', // 项目名
              duty_name: '叶轩乾1', // 负责人名
              duty_office: '', // 负责人职位
              project_start: '2020-09-01', // 项目启动时间
              project_end: '2020-11-30', // 项目结束时间
              defect: '2.96', // 当前缺陷数
              defect_target: '3.3', // 缺陷总目标
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
            }
          ]
        },
        {
          project: '12.7PL1',
          dutyInfo: {
            name_cn: '卢继伟',
            name_en: 'lujiwei',
            office: '无'
          },
          projectStageList: [
            {
              project: '测试项目名1', // 项目名
              duty_name: '叶轩乾1', // 负责人名
              duty_office: '', // 负责人职位
              project_start: '2020-09-01', // 项目启动时间
              project_end: '2020-11-30', // 项目结束时间
              defect: '2.96', // 当前缺陷数
              defect_target: '3.3', // 缺陷总目标
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
            }
          ]
        }
      ]
    }
  },
  computed: {
    panelSize() {
      return this.sizeActive === '0'
    }
  },
  methods: {
    handleCreateClick() {
      this.$router.push('/efficacyEvolve/project_line/AddProject')
    },
    handleSizeChange(flag) {
      this.sizeActive = String(flag)
    },
    handleEdit(item) {
      console.log(item)
    },
    handleDelete(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
#project-total {
  font-size: 14px;
  margin: 20px;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .flex-container {
    .create-box {
      border: 1px solid #ccc;
      padding: 4px;
    }
  }

  .panel-select {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #d3d3d3;
    margin-left: 10px;

    .panel-select-icon {
      box-sizing: border-box;
      padding: 6px;

      .icon {
        height: 20px;
        width: 20px;
      }
    }

    & .active {
      color: #1890ff;
      // border: 1px solid #d3d3d3;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

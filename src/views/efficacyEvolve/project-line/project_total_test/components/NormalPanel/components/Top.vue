<template>
  <div class="wrapper">
    <div class="basic-info">
      <div class="title">项目基础信息</div>
      <div class="basic-content">
        <div class="project-info">
          <div class="project">{{ project }}</div>
          <div class="duty">
            <div class="avatar">
              <img src="@/assets/ka.png">
            </div>
            <div class="duty-info">
              <span class="name">{{ user.name }}</span>
              <span class="office">{{ user.office }}</span>
            </div>
          </div>
        </div>

        <!-- 项目周期 -->
        <div class="project-cycle-wrapper">
          <div class="project-cycle">
            <i class="iconfont icon-clock icon" />
            <div class="content">
              <div>{{ `${project_round.start} ~ ${project_round.end}` }}</div>
              <span>项目周期</span>
            </div>
          </div>

          <div class="project-cycle">
            <i class="icon el-icon-suitcase" />
            <div class="content">
              <div>1.96个/kloc / 2.3个/kloc</div>
              <span>项目缺陷数量 / 目标数量（总）</span>
            </div>
          </div>

          <div class="project-cycle">
            <i class="icon el-icon-date" />
            <div class="content">
              <div>项目成本：1200D/k，目标：2399D/k</div>
              <el-progress :percentage="51" style="width: 100%;" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="timeline">
      <!-- 阶段测试 -->
      <div class="stage-test">
        <div class="title">
          <div>{{ '阶段：' + currentStage.title }}</div>
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
                  <span class="text">{{ currentStage.start_title }}</span>
                </div>
              </template>
              <template #title>
                <span style="font-size: 13px;">{{ currentStage.start_text }}</span>
              </template>
              <template #description>
                <span
                  style="font-size: 12px;"
                >{{ currentStage.plan_start_date | parseTime('{y}-{m}-{d}') }}</span>
              </template>
            </el-step>

            <el-step status="finish">
              <template #icon>
                <div class="dot">
                  <span class="text">{{ currentStage.current_title }}</span>
                </div>
              </template>
              <template #title>
                <span style="font-size: 13px;">{{ currentStage.current_text }}</span>
              </template>
              <template #description>
                <span
                  style="font-size: 12px;"
                >{{ currentStage.current_date | parseTime('{y}-{m}-{d}') }}</span>
              </template>
            </el-step>

            <el-step :status="currentStage.delay ? 'error' : 'wait'">
              <template #icon>
                <div class="dot">
                  <span class="text">{{ currentStage.end_title }}</span>
                </div>
              </template>
              <template #title>
                <span style="font-size: 13px;">{{ currentStage.end_text }}</span>
              </template>
              <template #description>
                <span
                  style="font-size: 12px;"
                >{{ currentStage.plan_end_date | parseTime('{y}-{m}-{d}') }}</span>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>

      <!-- 项目总体测试 -->
      <div class="total-test">
        <div class="title">{{ total.title }}</div>
        <div class="progress">
          <el-steps :active="total.active" finish-status="success" process-status="finish">
            <el-step
              v-for="(item, index) in total.timeList"
              :key="index"
              :status="item.delay ? 'error' : ''"
            >
              <template #icon>
                <div class="dot">
                  <span v-if="total.active === index" class="text">当前阶段</span>
                  <span v-else class="text">{{ item.title }}</span>
                </div>
              </template>
              <template #title>
                <el-popover placement="top-start" trigger="hover" class="popover">
                  <div>{{ `阶段：${item.title}` }}</div>
                  <div>{{ `计划结束时间：${item.plan_end_date}` }}</div>
                  <div v-if="item.actual_end_date">{{ `实际结束时间：${item.actual_end_date}` }}</div>
                  <div v-if="item.actual_start_date">{{ `实际开始时间：${item.actual_start_date}` }}</div>
                  <div v-if="item.deviation">{{ `偏差率：${item.deviation * 100}%` }}</div>
                  <span slot="reference" style="font-size: 13px; cursor: pointer;">{{ item.text }}</span>
                </el-popover>
              </template>
              <template #description>
                <div
                  v-if="item.progress !== 0 && item.actual_end_date && item.deviation && item.actual_start_date"
                >
                  <div>{{ `计划结束: ${item.plan_end_date}` }}</div>
                  <div>{{ `实际结束: ${item.actual_end_date}` }}</div>
                  <div>{{ `偏差率: ${item.deviation * 100}%` }}</div>
                </div>
                <span v-else style="font-size: 12px;">{{ `计划结束: ${item.plan_end_date}` }}</span>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  filters: {
    parseTime
  },
  data() {
    return {
      isPopoverShow: false,
      project: '12.4PL1',
      user: {
        name: '叶轩乾',
        office: 'PTM'
      },
      project_round: {
        isShow: true,
        start: '2020/09/01',
        end: '2020/10/31'
      },
      currentStage: {
        title: '首轮回归',
        delay: true,
        start_title: '启动',
        start_text: '启动日期',
        current_title: '进行中',
        current_text: '当前进度',
        end_title: '完成',
        end_text: '计划完成日期',
        current_date: new Date(),
        plan_start_date: new Date('2020-09-01'),
        actual_start_date: new Date('2020-09-01'),
        plan_end_date: new Date('2020-09-07'),
        actual_end_date: new Date('2020-09-07')
      },
      total: {
        active: 3,
        title: '内测里程碑',
        timeList: [
          {
            title: '准入',
            text: '准入',
            delay: true,
            actual_start_date: `${new Date('2020-08-01').getMonth() + 1}月${new Date(
              '2020-08-01'
            ).getDate()}日`,
            plan_end_date: `${new Date('2020-09-01').getMonth() + 1}月${new Date(
              '2020-09-01'
            ).getDate()}日`,
            actual_end_date: `${new Date('2020-09-02').getMonth() + 1}月${new Date(
              '2020-09-02'
            ).getDate()}日`,
            deviation: 0.1
          },
          {
            title: '首轮测试',
            text: '首轮测试',
            delay: true,
            actual_start_date: `${new Date('2020-09-01').getMonth() + 1}月${new Date(
              '2020-09-01'
            ).getDate()}日`,
            plan_end_date: `${new Date('2020-09-07').getMonth() + 1}月${new Date(
              '2020-09-07'
            ).getDate()}日`,
            actual_end_date: `${new Date('2020-09-08').getMonth() + 1}月${new Date(
              '2020-09-08'
            ).getDate()}日`,
            deviation: 0.2
          },
          {
            title: '次轮测试',
            text: '次轮测试',
            delay: false,
            actual_start_date: `${new Date('2020-09-08').getMonth() + 1}月${new Date(
              '2020-09-08'
            ).getDate()}日`,
            plan_end_date: `${new Date('2020-09-12').getMonth() + 1}月${new Date(
              '2020-09-12'
            ).getDate()}日`,
            actual_end_date: `${new Date('2020-09-11').getMonth() + 1}月${new Date(
              '2020-09-11'
            ).getDate()}日`,
            deviation: 0.3
          },
          {
            title: '首轮回归',
            text: '首轮回归',
            delay: false,
            actual_start_date: `${new Date('2020-09-12').getMonth() + 1}月${new Date(
              '2020-09-12'
            ).getDate()}日`,
            plan_end_date: `${new Date('2020-09-16').getMonth() + 1}月${new Date(
              '2020-09-16'
            ).getDate()}日`
          },
          {
            title: '次轮回归',
            text: '次轮回归',
            delay: false,
            plan_end_date: `${new Date('2020-09-22').getMonth() + 1}月${new Date(
              '2020-09-22'
            ).getDate()}日`
          },
          {
            title: '发布',
            text: '发布',
            delay: false,
            plan_end_date: `${new Date('2020-09-30').getMonth() + 1}月${new Date(
              '2020-09-30'
            ).getDate()}日`
          }
        ]
      }
    }
  },
  methods: {
    handleEditClick() {
      console.log('编辑')
      this.isPopoverShow = false
    },
    handleDeleteClick() {
      console.log('删除')
      this.isPopoverShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}

.basic-info {
  height: 100%;
  width: 320px;
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

      .avatar {
        width: 36px;
        height: 36px;

        img {
          width: 100%;
        }
      }

      .duty-info {
        margin-left: 8px;
        span {
          display: block;
        }
      }
    }

    .project-cycle-wrapper {
      margin-top: 30px;
      margin-left: 10px;

      .project-cycle {
        display: flex;
        align-items: center;
        margin-top: 40px;

        .content {
          margin-left: 10px;

          div {
            margin-bottom: 4px;
          }
        }
      }
    }
  }
}

.timeline {
  flex: 1;
  padding-left: 20px;
  border-left: 1px solid #ccc;

  .title {
    display: flex;
    justify-content: space-between;
  }

  .stage-test {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }

  .total-test {
    margin-top: 20px;
  }

  .progress {
    margin-top: 30px;
  }

  .dot {
    position: relative;

    .text {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translate(-50%);
      border: 1px solid;
      padding: 2px 4px;
      border-radius: 15px;
      font-size: 12px;
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

.icon {
  width: 30px;
  font-size: 24px;
}
</style>

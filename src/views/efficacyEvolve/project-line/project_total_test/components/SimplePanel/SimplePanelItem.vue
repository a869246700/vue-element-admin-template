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
          </div>
        </div>
      </div>

      <div class="right-wrapper">
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
    </div>
  </el-card>
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
.data-wrapper {
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

        .project-cycle {
          display: flex;
          align-items: center;
          margin-top: 20px;

          .content {
            margin-left: 10px;

            div {
              margin-bottom: 4px;
            }
          }
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
      margin-top: 70px;
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
</style>

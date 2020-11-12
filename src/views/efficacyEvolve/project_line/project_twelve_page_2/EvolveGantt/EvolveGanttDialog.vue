<template>
  <!-- 添加对话框 -->
  <el-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="60%"
    class="dialog"
    @close="handleDialogClose"
  >
    <div slot="title" style="padding: 0px">顶部操作栏，占位符</div>
    <div class="wrapper">
      <!-- 顶部 -->
      <div class="header">
        <!-- 标题 -->
        <div class="title">
          <span v-if="!editMap.name">{{ temp.name }}</span>
          <el-input
            v-else
            v-model.trim="temp.name"
            placeholder="请输入任务名"
            style="width: 150px"
          />
          <i
            :class="!editMap.name ? 'el-icon-edit' : 'el-icon-circle-check'"
            class="checked"
            @click="!editMap.name ? editClick('name') : updateClick('name')"
          />
        </div>
        <!-- 信息栏 -->
        <div class="infos-bar">
          <!-- 任务状态 -->
          <div class="task-status">
            <i :class="temp.progress === 1 ? 'el-icon-circle-check ed' : 'el-icon-loading ing'" />
            <div class="brief">
              <span v-if="temp.progress !== 1" class="status" style="color: orange">进行中</span>
              <span v-else class="status" style="color: yellowgreen">已完成</span>
              <span class="tips">当前状态</span>
            </div>
          </div>
          <!-- 负责人 -->
          <div class="person-name">
            <div class="brief">
              <div v-if="!editMap.principal" @dblclick="editClick('principal')">
                <span class="person">{{ temp.principal }}</span>
                <span class="tips">负责人</span>
              </div>

              <div v-else>
                <el-input
                  v-model.trim="temp.principal"
                  placeholder="请输入负责人"
                  style="width: 100px"
                />
                <i
                  :class="!editMap.principal ? 'el-icon-edit' : 'el-icon-circle-check'"
                  class="checked"
                  @click="!editMap.principal ? editClick('principal') : updateClick('principal')"
                />
              </div>
            </div>
          </div>

          <!-- 开始时间 -->
          <div class="start-date">
            <div v-if="!editMap.planStartDate" class="flex">
              <i class="el-icon-time" />
              <div class="brief">
                <div @dblclick="editClick('planStartDate')">
                  <span class="start">{{ temp.planStartDate | parseTime('{y}-{m}-{d}') }}</span>
                  <span class="tips">开始时间</span>
                </div>
              </div>
            </div>

            <div v-else>
              <div style="margin-bottom: 5px">选择开始时间</div>
              <el-date-picker
                v-model="temp.planStartDate"
                size="mini"
                :clearable="false"
                placeholder="选择开始时间"
                style="width: 150px; margin-bottom: 10px"
                @blur="updateClick('planStartDate')"
              />
            </div>
          </div>

          <!-- 结束时间 -->
          <div class="end-date">
            <i v-show="!editMap.planEndDate" class="el-icon-date" />
            <div v-show="!editMap.planEndDate" class="brief">
              <div @dblclick="editClick('planEndDate')">
                <!-- 根据是否超时，渲染颜色 -->
                <span :class="handleEndTimeOver() ? '' : 'over'">{{
                  temp.planEndDate | parseTime('{y}-{m}-{d}')
                }}</span>
                <span class="tips">截止时间</span>
              </div>
            </div>

            <div v-show="editMap.planEndDate">
              <div style="margin-bottom: 5px">选择截止时间</div>
              <el-date-picker
                ref="end_dateRef"
                v-model="temp.planEndDate"
                :clearable="false"
                size="mini"
                placeholder="选择开始时间"
                style="width: 150px; margin-bottom: 10px"
                @blur="updateClick('planEndDate')"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 主体内容 -->
      <div class="content">
        <!-- 任务信息，子任务，关联任务，附件 -->
        <el-tabs v-model="activeName">
          <el-tab-pane name="first">
            <span slot="label"> <i class="el-icon-s-unfold" /> 任务信息 </span>

            <div class="task-info">
              <div class="task-type">
                <span class="task-info-title">任务类型</span>
                <div style="margin-top: 10px">
                  <span v-if="!editMap.type">{{ temp.type || '暂无信息' }}</span>
                  <el-input
                    v-else
                    v-model.trim="temp.type"
                    placeholder="请选择项目类型"
                    style="width: 150px"
                  />
                  <i
                    :class="!editMap.type ? 'el-icon-edit' : 'el-icon-circle-check'"
                    class="checked"
                    @click="!editMap.type ? editClick('type') : updateClick('type')"
                  />
                </div>
              </div>

              <div class="priority">
                <span class="task-info-title">优先级</span>
                <div style="margin-top: 10px">
                  <span v-if="!editMap.priority">{{ temp.priority | priorityFilter }}</span>
                  <el-select
                    v-else
                    ref="priorityRef"
                    v-model="temp.priority"
                    placeholder="请选择优先级"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in prioritySelectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                      <span
                        v-for="(item2, index) in parseInt(item.value)"
                        :key="index"
                        style="float: left"
                        :style="item.value | colorFilter"
                      >!</span>
                      <span style="float: left; margin-left: 4px">{{ item.label }}</span>
                    </el-option>
                  </el-select>
                  <i
                    :class="!editMap.priority ? 'el-icon-edit' : 'el-icon-circle-check'"
                    class="checked"
                    @click="!editMap.priority ? editClick('priority') : updateClick('priority')"
                  />
                </div>
              </div>

              <div class="second-duty">
                <span class="task-info-title">次要负责人</span>
                <div style="margin-top: 10px">
                  <span v-if="!editMap.secondary">{{ temp.secondary || '暂无信息' }}</span>
                  <el-input
                    v-else
                    v-model.trim="temp.secondary"
                    placeholder="请输入次要负责人"
                    style="width: 150px"
                  />
                  <i
                    :class="!editMap.secondary ? 'el-icon-edit' : 'el-icon-circle-check'"
                    class="checked"
                    @click="!editMap.secondary ? editClick('secondary') : updateClick('secondary')"
                  />
                </div>
              </div>

              <div class="deviation-rate">
                <span class="task-info-title">偏差率</span>
                <div style="margin-top: 10px">
                  <span v-if="!editMap.deviation">{{ temp.deviation + '%' || '暂无信息' }}</span>
                  <el-input
                    v-else
                    v-model.trim="temp.deviation"
                    placeholder="请输入偏差率"
                    style="width: 150px"
                  />
                  <i
                    :class="!editMap.deviation ? 'el-icon-edit' : 'el-icon-circle-check'"
                    class="checked"
                    @click="!editMap.deviation ? editClick('deviation') : updateClick('deviation')"
                  />
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 子任务 -->
          <el-tab-pane v-if="childTaskList.length !== 0" name="second">
            <span slot="label"> <i class="el-icon-set-up" /> 子任务 </span>

            <div class="child-task">
              <div
                v-if="childTaskList.length === 0"
                class="add-child-task"
                @click="hadnleChildTaskAddClick"
              >
                <i class="el-icon-plus" style="margin-right: 5px" />
                <span>添加子任务</span>
              </div>

              <div v-else class="child-task-list">
                <el-table :data="childTaskList" border style="width: 100%">
                  <el-table-column prop="name" label="任务名" />
                  <el-table-column prop="principal" label="负责人" width="120" align="center" />
                  <el-table-column prop="deviation" label="偏差率" width="80" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.deviation + '%' }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="任务开始时间" width="140" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.start_date | parseTime('{y}-{m}-{d}') }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="计划任务结束时间" width="160" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.plan_end_date | parseTime('{y}-{m}-{d}') }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="实际任务结束时间" width="160" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.end_date | parseTime('{y}-{m}-{d}') }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="progress" label="完成度" width="80" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.progress ? row.progress * 100 + '%' : '0%' }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  filters: {
    colorFilter(key) {
      const colorMap = {
        1: 'color: rgb(34, 215, 187)',
        2: 'color: rgb(45, 188, 255)',
        3: 'color: rgb(255, 210, 52)',
        4: 'color: rgb(249, 105, 170)',
        5: 'color: rgb(250, 90, 85)'
      }
      return colorMap[key]
    },
    priorityFilter(priority) {
      const priorityMap = {
        '1': '最低',
        '2': '较低',
        '3': '普通',
        '4': '较高',
        '5': '最高'
      }
      return priorityMap[priority]
    }
  },
  props: {
    ganttList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      textMap: {
        update: '编辑',
        create: '添加'
      },
      editMap: {
        name: false,
        principal: false,
        planStartDate: false,
        planEndDate: false,
        type: false,
        priority: false,
        secondary: false,
        deviation: false
      },
      temp: {},
      dialogStatus: 'update', // 当前 添加和修改对话框 的类型
      dialogVisible: false, // 控制添加和修改对话框的显示与隐藏
      activeName: 'first', // 当前 tabs 的 active
      prioritySelectOptions: [
        {
          value: '1',
          label: '最低'
        },
        {
          value: '2',
          label: '较低'
        },
        {
          value: '3',
          label: '普通'
        },
        {
          value: '4',
          label: '较高'
        },
        {
          value: '5',
          label: '最高'
        }
      ] // 优先级选择配置项
    }
  },
  computed: {
    childTaskList() {
      return this.ganttList.filter((e) => e.parent === Number(this.temp.id))
    }
  },
  methods: {
    // 显示对话框
    showDialog() {
      this.$nextTick(() => {
        this.dialogVisible = true
      })
    },
    // 设置temp
    setTemp(row) {
      this.temp = Object.assign({}, row)
      this.activeName = 'first'
    },
    resetEditMap() {
      this.editMap = {
        name: false,
        principal: false,
        planStartDate: false,
        planEndDate: false,
        type: false,
        priority: false,
        secondary: false,
        deviation: false
      }
    },
    handleDialogClose() {
      // 关闭之前进行表单校验
      this.validate()
      // this.dialogVisible = true
    },
    // 校验方法
    validate() {
      for (const key in this.temp) {
        const element = this.temp[key]
        console.log(key + ': ' + element)
      }
    },
    // 判断完成时间是否超时
    handleEndTimeOver() {
      const { actualEndDate, planEndDate } = this.temp
      // 实际时间是否小于等于计划时间
      return actualEndDate <= planEndDate
    },
    // 点击编辑按钮
    editClick(key) {
      this.editMap[key] = true
    },
    // 点击完成编辑按钮
    updateClick(key) {
      if (!this.temp[key] || this.temp[key] === '') {
        this.$message('请填入...')
        return
      }
      this.editMap[key] = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;

  .flex {
    display: flex;
  }

  .checked {
    margin-left: 10px;
    font-size: 18px !important;

    &:hover {
      color: #1890ff;
    }
  }

  .header {
    margin-bottom: 20px;

    .title {
      font-size: 24px;
      margin-bottom: 40px;
      height: 30px;
    }

    .infos-bar {
      height: 60px;
      display: flex;
      margin-top: 20px;

      > div {
        flex: 1;
        display: flex;
        align-items: center;

        i {
          width: 36px;
          height: 36px;
          line-height: 36px;
          font-size: 36px;
          margin-right: 8px;
        }

        .ing {
          color: rgb(255, 164, 21);
        }

        .ed {
          color: #a9cd32;
        }

        span {
          display: block;
        }
      }

      .tips {
        margin-top: 8px;
        color: #aaa;
        font-size: 12px;
      }

      .over {
        color: red;
      }
    }
  }

  .content {
    // 任务信息
    .task-info {
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      color: #888;
      margin-top: 5px;

      > div {
        padding: 0 10px 15px;
      }

      .task-type {
        flex: 50%;
        height: 60px;
      }

      .task-info-title {
        font-weight: bold;
      }

      .priority {
        flex: 50%;
        height: 60px;
      }

      .second-duty {
        flex: 100%;
        margin-top: 20px;
        height: 60px;
      }

      .deviation-rate {
        margin-top: 20px;
        height: 70px;
      }
    }

    .child-task {
      .add-child-task {
        min-height: 100px;
        color: #1890ff;
        padding: 30px;
        cursor: pointer;
      }
    }
  }
}

.el-dialog {
  z-index: 99999 !important;
}
</style>

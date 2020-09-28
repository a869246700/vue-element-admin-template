<template>
  <div class="evolve-gantt">
    <div class="brief">
      <div class="tag">
        <el-tag>项目计划：当前项目阶段 XXX</el-tag>
      </div>
      <div class="tag">
        <el-tag type="success">全部计划与工作：共X条，已完成X条</el-tag>
      </div>
    </div>

    <!-- 甘特图 -->
    <gantt ref="ganttRef" :tasks="tasks" @edit="handleRowClick" />

    <!-- 添加对话框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="60%"
      class="dialog"
      @close="handleDialogCloseClick"
    >
      <div slot="title" style="padding: 0px">顶部操作栏，占位符</div>
      <div class="wrapper">
        <!-- 顶部 -->
        <div class="header">
          <!-- 标题 -->
          <div class="title">
            <span v-show="!editMap.task_name">{{ temp.task_name }}</span>
            <el-input
              v-show="editMap.task_name"
              v-model.trim=" temp.task_name"
              placeholder="请输入任务类型"
              style="width: 150px;"
            />
            <i
              :class="!editMap.task_name ? 'el-icon-edit' : 'el-icon-circle-check'"
              class="checked"
              @click="!editMap.task_name ? editClick('task_name') : updateClick('task_name')"
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
                <div v-show="!editMap.duty_name" @dblclick="editClick('duty_name')">
                  <span class="person">{{ temp.duty_name }}</span>
                  <span class="tips">负责人</span>
                </div>

                <el-input
                  v-show="editMap.duty_name"
                  v-model.trim="temp.duty_name"
                  placeholder="请输入负责人"
                  style="width: 100px"
                  @blur="updateClick('duty_name')"
                />
              </div>
            </div>
            <!-- 开始时间 -->
            <div class="start-date">
              <i v-show="!editMap.start_date" class="el-icon-time" />
              <div v-show="!editMap.start_date" class="brief">
                <div @dblclick="editClick('start_date')">
                  <span class="start">{{ temp.start_date | parseTime('{y}-{m}-{d}') }}</span>
                  <span class="tips">开始时间</span>
                </div>
              </div>

              <div v-show="editMap.start_date">
                <div style="margin-bottom: 5px;">选择开始时间</div>
                <el-date-picker
                  v-model="temp.start_date"
                  type="datetime"
                  size="mini"
                  placeholder="选择开始时间"
                  style="width: 150px; margin-bottom: 10px;"
                  @change="handleDateChange"
                  @blur="updateClick('start_date')"
                />
              </div>
            </div>
            <!-- 结束时间 -->
            <div class="end-date">
              <i v-show="!editMap.end_date" class="el-icon-date" />
              <div v-show="!editMap.end_date" class="brief">
                <div @dblclick="editClick('end_date')">
                  <!-- 根据是否超时，渲染颜色 -->
                  <span
                    :class="handleEndTimeOver() ? '' : 'over'"
                  >{{ temp.end_date | parseTime('{y}-{m}-{d}') }}</span>
                  <span class="tips">截止时间</span>
                </div>
              </div>

              <div v-show="editMap.end_date">
                <div style="margin-bottom: 5px;">选择截止时间</div>
                <el-date-picker
                  ref="end_dateRef"
                  v-model="temp.end_date"
                  type="datetime"
                  size="mini"
                  placeholder="选择开始时间"
                  style="width: 150px; margin-bottom: 10px;"
                  @blur="updateClick('end_date')"
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
              <span slot="label">
                <i class="el-icon-s-unfold" /> 任务信息
              </span>

              <div class="task-info">
                <div class="task-type">
                  <span>任务类型</span>
                  <div style="margin-top: 10px;">
                    <span v-show="!editMap.task_type">{{ temp.task_type || '暂无信息' }}</span>
                    <el-input
                      v-show="editMap.task_type"
                      v-model.trim=" temp.task_type"
                      placeholder="请输入任务类型"
                      style="width: 150px;"
                    />
                    <i
                      :class="!editMap.task_type ? 'el-icon-edit' : 'el-icon-circle-check'"
                      class="checked"
                      @click="!editMap.task_type ? editClick('task_type') : updateClick('task_type')"
                    />
                  </div>
                </div>

                <div class="priority">
                  <span>优先级</span>
                  <div style="margin-top: 10px;">
                    <span v-show="!editMap.priority">{{ temp.priority || '暂无信息' }}</span>
                    <el-select
                      v-show="editMap.priority"
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
                          style="float: left;"
                          :style="item.value | colorFilter"
                        >!</span>
                        <span style="float: left; margin-left:4px;">{{ item.label }}</span>
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
                  <span>次要负责人</span>
                  <div style="margin-top: 10px;">
                    <span v-show="!editMap.second_duty_name">{{ temp.second_duty_name || '暂无信息' }}</span>
                    <el-input
                      v-show="editMap.second_duty_name"
                      v-model.trim=" temp.second_duty_name"
                      placeholder="请输入次要负责人"
                      style="width: 150px;"
                    />
                    <i
                      :class="!editMap.second_duty_name ? 'el-icon-edit' : 'el-icon-circle-check'"
                      class="checked"
                      @click="!editMap.second_duty_name ? editClick('second_duty_name') : updateClick('second_duty_name')"
                    />
                  </div>
                </div>

                <div class="deviation-rate">
                  <span>偏差率</span>
                  <div style="margin-top: 10px;">
                    <span v-show="!editMap.deviation">{{ temp.deviation || '暂无信息' }}</span>
                    <el-input
                      v-show="editMap.deviation"
                      v-model.trim=" temp.deviation"
                      placeholder="请输入偏差率"
                      style="width: 150px;"
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
              <span slot="label">
                <i class="el-icon-set-up" /> 子任务
              </span>

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
                    <el-table-column prop="task_name" label="任务名" />
                    <el-table-column prop="duty_name" label="负责人" width="100" align="center" />
                    <el-table-column prop="deviation" label="偏差率" width="80" align="center">
                      <template slot-scope="{row}">
                        <span>{{ row.deviation * 100 + '%' }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="任务开始时间" width="140" align="center">
                      <template slot-scope="{row}">
                        <span>{{ row.start_date | parseTime('{y}-{m}-{d}') }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="计划任务结束时间" width="160" align="center">
                      <template slot-scope="{row}">
                        <span>{{ row.plan_end_date | parseTime('{y}-{m}-{d}') }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="实际任务结束时间" width="160" align="center">
                      <template slot-scope="{row}">
                        <span>{{ row.end_date | parseTime('{y}-{m}-{d}') }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column prop="progress" label="完成度" width="80" align="center">
                      <template slot-scope="{row}">
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
  </div>
</template>

<script>
import Gantt from '@/components/Gantt/index'
import { parseTime } from '@/utils'

export default {
  components: {
    Gantt
  },
  filters: {
    colorFilter(key) {
      const colorMap = {
        '1': 'color: rgb(34, 215, 187)',
        '2': 'color: rgb(45, 188, 255)',
        '3': 'color: rgb(255, 210, 52)',
        '4': 'color: rgb(249, 105, 170)',
        '5': 'color: rgb(250, 90, 85)'
      }
      return colorMap[key]
    },
    parseTime
  },
  data() {
    return {
      key: 0,
      dataSource: {
        data: [
          {
            id: 1,
            task_name: '测试1',
            start_date: new Date(2020, 6, 25), // 实际开始
            end_date: new Date(2020, 6, 30), // 实际结束
            plan_end_date: new Date(2020, 6, 30), // 计划结束
            deviation: 0.8,
            progress: 1,
            duty_name: '张总'
          },
          {
            id: 2,
            task_name: '测试2',
            start_date: new Date(2020, 7, 1),
            end_date: new Date(2020, 7, 15),
            plan_end_date: new Date(2020, 7, 15),
            deviation: 0.8,
            progress: 0.5,
            duty_name: '李总'
          },
          {
            id: 3,
            task_name: '测试2-1',
            start_date: new Date(2020, 7, 1),
            end_date: new Date(2020, 7, 8),
            plan_end_date: new Date(2020, 7, 8),
            deviation: 0.8,
            progress: 0.8,
            duty_name: '赵总',
            parent: 2
          },
          {
            id: 4,
            task_name: '测试2-2',
            start_date: new Date(2020, 7, 9),
            end_date: new Date(2020, 7, 20),
            plan_end_date: new Date(2020, 7, 20),
            deviation: 0.8,
            duty_name: '王总',
            progress: 0.7,
            parent: 2
          },
          {
            id: 5,
            task_name: '测试2-1-1',
            start_date: new Date(2020, 7, 9),
            end_date: new Date(2020, 7, 15),
            plan_end_date: new Date(2020, 7, 15),
            deviation: 0.8,
            duty_name: '王总',
            parent: 4
          }
        ],
        links: [{ id: 1, source: 3, target: 4, type: '0' }]
      },
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        id: undefined,
        task_name: undefined,
        start_date: undefined,
        plan_end_date: undefined,
        duty_name: undefined,
        duration: undefined,
        progress: undefined,
        status: '',
        task_type: undefined,
        priority: undefined,
        second_duty_name: undefined
      },
      editMap: {
        task_name: false,
        duty_name: false,
        start_date: false,
        end_date: false,
        plan_end_date: false,
        task_type: false,
        priority: false,
        second_duty_name: false,
        deviation: false
      },
      activeName: 'first', // 当前 tabs 的 active
      prioritySelectOptions: [
        {
          value: '3',
          label: '普通'
        },
        {
          value: '1',
          label: '最低'
        },
        {
          value: '5',
          label: '最高'
        },
        {
          value: '4',
          label: '较高'
        },
        {
          value: '2',
          label: '较低'
        }
      ], // 优先级选择配置项
      priorityValue: '', // 优先级选项选中值
      isPrioritySelectVisible: false, // 控制优先级选择是否显示
      childTaskList: [] // 子任务列表
    }
  },
  computed: {
    datas() {
      // 子节点根据父节点，延长父节点的时间
      const datas = this.dataSource.data
      for (const item of datas) {
        for (const child of datas) {
          if (item.id === child.parent) {
            // 如果子任务结束时间 大于 主任务的结束时间，则主任务变红，子任务变橙
            if (child.end_date > item.end_date) {
              item.end_date = child.end_date
              item.color = 'LightCoral'
              child.color = 'SandyBrown'
            }
          }
        }
      }

      return datas || []
    },
    links() {
      return this.dataSource.links || []
    },
    tasks() {
      return { data: this.datas, links: this.links } || {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.ganttRef.init()
    })
  },
  methods: {
    // 点击编辑按钮
    editClick(key) {
      this.editMap[key] = true
    },
    // 点击完成编辑按钮
    updateClick(key) {
      this.editMap[key] = false
    },
    // 修改日期
    handleDateChange() {
      console.log(this.temp.start_date, this.temp.end_date)
      console.log(this.temp)
    },
    // 点击任务
    handleRowClick(id) {
      const row = this.dataSource.data.find((e) => e.id === parseInt(id))
      this.temp = row

      this.dialogFormVisible = true
      this.handleChildTaskLoad() // 加载子任务
    },
    // 点击添加联系人
    handleAddPersonClick() {
      this.$notify({
        title: '点击添加联系人',
        type: 'success',
        duration: 1000
      })
    },
    // 加载子任务
    handleChildTaskLoad() {
      const parentId = this.temp.id
      const list = this.dataSource.data.filter((e) => e.parent === parentId)
      this.childTaskList = list
    },
    // 监听对话框的关闭事件
    handleDialogCloseClick() {
      this.activeName = 'first'
      this.$nextTick(() => {
        // 重置 editMap
        this.resetEditMap()
        // 修改标记
        if (!this.temp.parent) {
          this.$refs.ganttRef.setStartOrEndDate(this.temp.start_date, this.temp.plan_end_date)
        }
        this.$refs.ganttRef.updateMarker()
        // 重新加载gantt
        this.$refs.ganttRef.init()
        console.log('刷新视图')
      })
    },
    // 判断完成时间是否超时
    handleEndTimeOver() {
      const endEndDate = +new Date(this.temp.end_date)
      const planEndDate = +new Date(this.temp.plan_end_date)
      // 实际时间是否小于等于计划时间
      return endEndDate <= planEndDate
    },
    resetEditMap() {
      this.editMap = {
        task_name: false,
        duty_name: false,
        start_date: false,
        end_date: false,
        plan_end_date: false,
        task_type: false,
        priority: false,
        second_duty_name: false,
        deviation: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.evolve-gantt {
  margin-bottom: 20px;

  .brief {
    margin-bottom: 10px;

    .el-tag {
      margin-bottom: 5px;
      font-size: 16px;
    }
  }
}

.checked {
  margin-left: 10px;
  font-size: 18px;
}

.wrapper {
  width: 100%;

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

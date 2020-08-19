<template>
  <div class="gantt">
    <!-- 甘特图 -->
    <gantt ref="gantt" :tasks="tasks" @edit="handleRowClick" />

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
          <div class="title">{{ temp.text }}</div>
          <!-- 信息栏 -->
          <div class="infos-bar">
            <!-- 任务状态 -->
            <div class="task-status">
              <i class="iconfont icon-clock" />
              <div class="brief">
                <span v-if="temp.progress !== 1" class="status" style="color: orange">进行中</span>
                <span v-else class="status" style="color: yellowgreen">已完成</span>
                <span class="tips">当前状态</span>
              </div>
            </div>
            <!-- 负责人 -->
            <div class="person-name">
              <div class="brief">
                <span class="person">{{ temp.personName }}</span>
                <span class="tips">负责人</span>
              </div>
            </div>
            <!-- 开始时间 -->
            <div class="start-date">
              <i class="iconfont icon-riqi" />
              <div class="brief">
                <span class="start">{{ temp.start_date | parseTime('{y}-{m}-{d}') }}</span>
                <span class="tips">开始时间</span>
              </div>
            </div>
            <!-- 结束时间 -->
            <div class="end-date">
              <i class="iconfont icon-riqi1" />
              <div class="brief">
                <!-- 根据是否超时，渲染颜色 -->
                <span
                  :class="handleEndTimeOver() ? '' : 'over'"
                >{{ temp.plan_end_date | parseTime('{y}-{m}-{d}') }}</span>
                <span class="tips">截止时间</span>
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
                  <div class="field-item">
                    <i class="el-icon-success icon" />
                    <span>示例项目</span>
                  </div>
                </div>

                <div class="priority">
                  <span>优先级</span>
                  <div style="margin-top: 6px;">
                    <el-select
                      ref="priorityRef"
                      v-model="priorityValue"
                      placeholder="请选择优先级"
                      clearable
                      @change="handleChange"
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
                  </div>
                </div>

                <div class="deviation-rate">
                  <span>偏差率</span>
                  <div style="margin-top: 10px; height: 100px;">偏差率表示区域</div>
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
                    <el-table-column prop="text" label="任务名" />
                    <el-table-column prop="personName" label="负责人" width="100" align="center" />
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
            text: '测试1',
            start_date: new Date(2020, 6, 25), // 实际开始
            end_date: new Date(2020, 6, 30), // 实际结束
            plan_end_date: new Date(2020, 6, 30), // 计划结束
            deviation: 0.8,
            progress: 1,
            personName: '张总'
          },
          {
            id: 2,
            text: '测试2',
            start_date: new Date(2020, 7, 1),
            end_date: new Date(2020, 7, 15),
            plan_end_date: new Date(2020, 7, 15),
            deviation: 0.8,
            progress: 0.5,
            personName: '李总'
          },
          {
            id: 3,
            text: '测试2-1',
            start_date: new Date(2020, 7, 1),
            end_date: new Date(2020, 7, 8),
            plan_end_date: new Date(2020, 7, 8),
            deviation: 0.8,
            progress: 0.8,
            personName: '赵总',
            parent: 2
          },
          {
            id: 4,
            text: '测试2-2',
            start_date: new Date(2020, 7, 9),
            end_date: new Date(2020, 7, 20),
            plan_end_date: new Date(2020, 7, 20),
            deviation: 0.8,
            personName: '王总',
            progress: 0.7,
            parent: 2
          },
          {
            id: 5,
            text: '测试2-1-1',
            start_date: new Date(2020, 7, 9),
            end_date: new Date(2020, 7, 15),
            plan_end_date: new Date(2020, 7, 15),
            deviation: 0.8,
            personName: '王总',
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
        text: undefined,
        start_date: undefined,
        personName: undefined,
        duration: undefined,
        progress: undefined,
        status: ''
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
  methods: {
    // 点击任务
    handleRowClick(id) {
      const row = this.dataSource.data.find((e) => e.id === parseInt(id))
      this.temp = Object.assign({}, row)

      this.dialogFormVisible = true
      this.handleChildTaskLoad() // 加载子任务
    },
    // 修改优先级
    handleChange(v) {
      console.log(v)
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
      // console.log('对话框关闭')
      this.activeName = 'first'
    },
    // 判断完成时间是否超时
    handleEndTimeOver() {
      const endEndDate = +new Date(this.temp.end_date)
      const planEndDate = +new Date(this.temp.plan_end_date)
      // 实际时间是否小于等于计划时间
      return endEndDate <= planEndDate
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;

  .header {
    margin-bottom: 20px;

    .title {
      font-size: 24px;
      margin-bottom: 40px;
    }

    .infos-bar {
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

        &:nth-child(1) i {
          color: rgb(255, 164, 21);
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

      .field-item {
        margin: 16px 0 0;

        .icon {
          margin-right: 4px;
        }
      }

      .task-type {
        flex: 50%;
      }

      .priority {
        flex: 50%;
      }

      .person {
        flex: 100%;
        margin-top: 20px;

        .person-list {
          display: flex;

          span {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            margin-right: 8px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            border-radius: 50%;
            background-color: rgb(255, 159, 115);
          }

          .add-person {
            font-size: 32px;
          }
        }
      }

      .deviation-rate {
        margin-top: 20px;
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

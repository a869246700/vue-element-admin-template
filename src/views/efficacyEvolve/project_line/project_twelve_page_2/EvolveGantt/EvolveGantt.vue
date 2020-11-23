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
    <gantt ref="ganttRef" :datas="ganttList" :links="ganttLinks" @dbl-click="handleRowClick" />

    <evolve-gantt-dialog ref="dialogRef" :gantt-list="ganttList" @dialog-close="handleDialogCloseClick" />
  </div>
</template>

<script>
import Gantt from '@/components/Gantt/index'
import EvolveGanttDialog from './EvolveGanttDialog'
import { parseTime } from '@/utils'
import request from '@/services/request'

export default {
  components: {
    Gantt,
    EvolveGanttDialog
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
  inject: ['_project'],
  data() {
    return {
      ganttList: [],
      ganttLinks: [],
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        id: undefined,
        name: undefined,
        planStartDate: undefined,
        planEndDate: undefined,
        principal: undefined,
        duration: undefined,
        progress: undefined,
        status: '',
        task_type: undefined,
        priority: undefined,
        second_duty_name: undefined
      },
      editMap: {
        name: false,
        principal: false,
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
      childTaskList: [], // 子任务列表
      dialogKey: 0
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
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getGanttList(this._project)
    },
    // 点击任务
    handleRowClick(id) {
      const row = this.ganttList.find((e) => e.id === parseInt(id))

      const temp = {
        id,
        name: row.name,
        createName: row.createName,
        createTime: row.createTime,
        deviation: row.deviation,
        parent: row.parent,
        type: row.type,
        path: row.path,
        actualStartDate: row.start_date,
        actualEndDate: row.end_date,
        planStartDate: row.plan_start_date,
        planEndDate: row.plan_end_date,
        position: row.position,
        principal: row.principal,
        secondary: row.secondary,
        priority: row.priority,
        progress: row.progress,
        project: row.project,
        remark: row.remark
      }

      this.$refs.dialogRef.setTemp(temp) // 设置temp
      this.$refs.dialogRef.showDialog() // 显示对话框
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
      })
    },
    async getGanttList(project) {
      const { data: res } = await request('/api/projectTestTask/listGantt', {
        params: {
          project
        }
      })
      const tempArr = res
      // 进行参数转换
      const resultArr = tempArr.map((item) => {
        return {
          ...item,
          start_date: new Date(item.planStartDate),
          end_date: new Date(item.planEndDate),
          plan_start_date: new Date(item.planStartDate),
          plan_end_date: new Date(item.planEndDate),
          progress: item.progress / 100
        }
      })

      this.ganttList = resultArr
      this.$nextTick(() => {
        // 数据重新加载
        this.$refs.ganttRef.init()
      })
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
</style>

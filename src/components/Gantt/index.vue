<template>
  <div>
    <div class="tool-bar">
      <el-radio-group v-model="currentDateType" @change="handleDateTypeChange">
        <el-radio-button label="月" />
        <el-radio-button label="周" />
        <el-radio-button label="日" />
      </el-radio-group>
      <div class="btns">
        <el-button type="primary" size="small" @click="handleExpandClick">全屏</el-button>
      </div>
    </div>
    <div ref="gantt" :class="isFullScreen ? 'zoom' : ''" class="left-container" />
  </div>
</template>

<script>
import gantt from 'dhtmlx-gantt' // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import locale from './gantt-locale.js'

export default {
  name: 'DhtmlxGantt',
  props: {
    datas: {
      type: Array,
      default: () => [],
      required: true
    },
    links: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      task: {
        data: [],
        links: []
      },
      gantt: undefined,
      currentDateType: '周', // 当前选中的日期类型
      startMarkerId: undefined, // 开始标记的 id
      endMarkerId: undefined, // 结束标记的 id
      todayMarkerId: undefined,
      start_date: undefined, // 项目开始的标记
      end_date: undefined, // 项目结束的标记
      currentId: undefined, // 当前行的 id
      isFullScreen: false // 是否全屏
    }
  },
  computed: {
    isRefresh() {
      return this.datas
    }
  },
  watch: {
    datas(newV, oldV) {
      this.$set(this.task, 'data', newV)
    },
    links(newV, oldV) {
      this.$set(this.task, 'links', newV)
    }
  },
  methods: {
    // 初始化
    init() {
      gantt.clearAll() // 清除所有的方法

      this.gantt = gantt
      /* -------------------启动插件-------------- */
      this.gantt.plugins({
        marker: true,
        fullscreen: true
      })

      /* --------------------配置项--------------------- */
      this.gantt.locale = locale
      this.handleDateTypeChange(this.currentDateType)
      // 配置显示列   // name:绑定数据的名称  align：对其方式  label显示在表头的名称
      this.gantt.config.columns = [
        {
          name: 'name',
          tree: true,
          width: '*',
          label: '任务名',
          align: 'left'
        },
        {
          name: 'principal',
          label: '负责人',
          align: 'center'
        },
        {
          name: 'deviation',
          label: '偏差率',
          align: 'center',
          template: (h) => `<span>${h.deviation}%</span>`
        }
      ]

      this.gantt.config.row_height = 40 // 甘特图的行高
      this.gantt.config.scale_height = 40 // 甘特图的表头高度
      this.gantt.config.min_column_width = 60
      this.gantt.config.scale_height = 40 * 2
      this.gantt.config.drag_resize = true // 两边不可拖动
      this.gantt.config.readonly = true // 只读模式

      /* ---------------- 标记 -------------------- */
      // Today 标记
      this.todayMarkerId = gantt.addMarker({
        start_date: this.getEndOfDate(),
        css: 'today',
        text: 'Today'
      })

      /* ------------------ 模板 ---------------------------------- */
      // 显示到进度条上的文本   计划名称和任务进度百分比
      this.gantt.templates.task_text = (start, end, task) => {
        return `<span> ${task.name}：当前进度${task.progress * 100}% </span>`
      }

      /* ------------------ 事件 ---------------------------------- */
      // 当行点击事件，修改 market 的位置
      this.gantt.attachEvent('onTaskRowClick', (id) => {
        this.rowTouch(id)
      })

      this.gantt.attachEvent('onTaskDblClick', () => {
        this.$emit('dbl-click', this.currentId)
      })

      this.gantt.attachEvent('onTaskSelected', (id) => {
        this.gantt.showTask(id)
        this.rowTouch(id)
      })

      this.gantt.attachEvent('onCollapse', () => {
        this.isFullScreen = false
      })

      this.gantt.init(this.$refs.gantt)
      this.gantt.parse(this.task)
    },
    rowTouch(id) {
      if (this.currentId === id) {
        return
      }
      this.currentId = id

      let target = this.datas.find((e) => e.id === parseInt(id))
      console.log(target)
      // 如果存在主任务 parent，则添加和修改标记
      if (target.parent !== 0) {
        let parentNode = target
        let parentId = target.parent
        while (parentId !== 0) {
          parentNode = this.datas.find((e) => e.id === parentId)
          parentId = parentNode.parent
        }
        target = parentNode
      }

      // 如果没有标记过，则进行创建 marker，否则就进行修改 marker
      if (this.start_date && this.end_date) {
        // console.log('修改')
        this.setStartOrEndDate(target.start_date, target.plan_end_date)
        this.updateMarker()
      } else {
        // console.log('添加')
        this.setStartOrEndDate(target.start_date, target.plan_end_date)
        this.createMarker()
      }
    },
    // 获取今日结束时间
    getEndOfDate() {
      return new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
    },
    // 创建 marker
    createMarker() {
      // 任务开始时间
      this.startMarkerId = gantt.addMarker({
        start_date: this.start_date,
        css: 'projectStartDate',
        text: 'D.Sta'
      })
      // 任务结束时间
      this.endMarkerId = gantt.addMarker({
        start_date: this.end_date,
        css: 'projectEndDate',
        text: 'D.End'
      })
    },
    // 修改 marker 的位置
    updateMarker() {
      // PS: 为了防止在组件调整后，回到改页面时，gantt插件会自动移除marker的操作。
      //      所以我们在修改marker的位置的时候，需要事先进行判断是否存在标记，不存在则创建新的。
      if (this.gantt.getMarker(this.startMarkerId) && this.gantt.getMarker(this.endMarkerId)) {
        this.gantt.getMarker(this.startMarkerId).start_date = this.start_date
        this.gantt.getMarker(this.endMarkerId).start_date = this.end_date
        this.gantt.renderMarkers()
      } else {
        // console.log('找不到之前的标记，重新创建')
        this.createMarker()
      }
    },
    // 设置 start end
    setStartOrEndDate(start, end) {
      this.start_date = start
      this.end_date = end
    },
    // 修改日期方位
    getGanttConfigByZoomValue(value) {
      switch (value) {
        case '日':
          return {
            scale_unit: 'day',
            date_scale: '%m-%d',
            subscales: [
              {
                unit: 'year',
                step: 1,
                date: '%Y 年'
              }
            ]
          }
        case '周':
          return {
            scale_unit: 'week',
            date_scale: '%M %W周',
            subscales: [
              {
                unit: 'year',
                step: 1,
                date: '%Y 年'
              }
            ]
          }
        case '月':
          return {
            scale_unit: 'month', // 时间坐标轴单位“minute”, “hour”, “day”, “week”, “quarter”, “month”, “year”
            date_scale: '%M', // 日期格式 先数字后文字
            // 配置右边表头
            subscales: [
              {
                // 时间坐标为月份的时候  先显示年份再月份
                unit: 'year',
                step: 1,
                date: '%Y 年'
              }
            ]
          }
        default:
          return {}
      }
    },
    // 修改日期类型
    handleDateTypeChange(key) {
      const res = this.getGanttConfigByZoomValue(key)
      for (const key in res) {
        this.gantt.config[key] = res[key]
      }
      this.gantt.render()
    },
    // 点击全屏按钮
    handleExpandClick() {
      this.isFullScreen = true
      this.gantt.expand()
    }
  }
}
</script>

<style>
.tool-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.left-container {
  position: relative;
  height: 600px;
  width: 100%;
}

.zoom {
  z-index: 1001 !important;
}

.projectStartDate {
  background: DeepSkyBlue;
}

.projectEndDate {
  background: FireBrick;
}
</style>

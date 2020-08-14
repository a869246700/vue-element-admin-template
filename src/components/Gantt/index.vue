<template>
  <div>
    <div ref="gantt" class="left-container" />
  </div>
</template>

<script>
import gantt from 'dhtmlx-gantt' // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
// import 'dhtmlx-gantt/codebase/locale/locale_cn' // 本地化

export default {
  name: 'DhtmlxGantt',
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      gantt.config.scale_unit = 'day' // 时间坐标轴单位“minute”, “hour”, “day”, “week”, “quarter”, “month”, “year”
      gantt.config.date_scale = '%d' // 日期格式 先数字后文字
      gantt.config.row_height = 40 // 甘特图的行高
      gantt.config.scale_height = 40 // 甘特图的表头高度
      gantt.config.scroll_on_click = false
      gantt.config.min_column_width = 60
      gantt.config.duration_unit = 'day'
      gantt.config.scale_height = 40 * 2
      // gantt.config.row_height = 28;
      gantt.config.drag_resize = true // 两边不可拖动
      gantt.config.readonly = false // 只读模式
      // 配置右边表头
      gantt.config.subscales = [
        {
          // 时间坐标为月份的时候  先显示年份再月份
          unit: 'year',
          step: 1,
          date: '%Y'
        },
        {
          unit: 'month',
          setp: 1,
          date: '%F'
        }
      ]
      // 配置显示列   // name:绑定数据的名称  align：对其方式  label显示在表头的名称
      gantt.config.columns = [
        {
          name: 'text',
          tree: true,
          width: '*',
          label: '计划名称',
          resize: true
        },
        { name: 'start_date', width: '80', align: 'center', label: '开始时间' },
        { name: 'end_date', width: '80', align: 'center', label: '结束时间' },
        {
          name: 'duration',
          width: '70',
          align: 'center',
          label: '执行时间',
          template: (obj) => obj.duration
        }
      ]

      // 显示到进度条上的文本   计划名称和任务进度百分比
      gantt.templates.task_text = (start, end, task) => {
        return (
          "<b style='text-align:left;'>计划名称:</b> " +
          task.text +
          "    <span style='text-align:left;'>" +
          '完成计划：' +
          Math.round(task.progress * 100) +
          '% </span>'
        )
      }

      // 双击触发调用 dialog
      gantt.attachEvent('onBeforeLightbox', (id) => {
        this.$emit('edit', id)
      })

      gantt.init(this.$refs.gantt)
      gantt.parse(this.tasks)
    }
  }
}
</script>

<style>
.left-container {
  height: 600px;
}
</style>

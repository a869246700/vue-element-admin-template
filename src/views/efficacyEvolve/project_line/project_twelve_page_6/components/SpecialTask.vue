<template>
  <!-- 专项任务 -->
  <div class="special-task">
    <!-- 通知栏 -->
    <div v-if="false" class="notify-bar">
      <div>
        <el-tag type="info">项目风险项共计 10项, 其中HIGH 6项, MIDDLE 3项, LOW 1项</el-tag>
      </div>
      <div>
        <el-tag type="danger" class="high">其中HIGH 风险中, 已闭环50%(3项), 还有3项未闭环</el-tag>
      </div>
      <div>
        <el-tag type="warning" class="medium">MEDIUM 风险中, 已闭环66%(2项), 还有1项未闭环, 需相关责任人继续推进</el-tag>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table">
      <task-table :project="project" />
    </div>
  </div>
</template>

<script>
import TaskTable from './TaskTable'

export default {
  components: { TaskTable },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentStage: '阶段一', // 当前选中阶段值
      stageList: [{ stage: '阶段一' }, { stage: '阶段二' }] // 阶段列表
    }
  },
  methods: {
    // 处理阶段值的改变
    handleStageChange(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.notify-bar {
  div {
    margin-bottom: 10px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.table {
  margin: 10px 0;
}
</style>

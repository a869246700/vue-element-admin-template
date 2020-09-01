<template>
  <!-- 技术项目 -->
  <div class="technology-project">
    <!-- 通知栏 -->
    <div class="notify-bar">
      <div>
        <el-tag type="info">技术课题共计 X 项，代码量共 X kloc，其中测试验证结项 X 项，评审结项 X 项</el-tag>
      </div>
      <div>
        <el-tag type="danger" style="margin-right: 20px">其中有 X 项课题，遗漏率 > 0.5个/K，遗漏TOP有：课题1，课题2，课题3</el-tag>
        <el-tag type="success">有 X 项课题发现有非未知缺陷，其中TOP有：课题1，课题2，课题3</el-tag>
      </div>
    </div>

    <!-- 课题分析统计 -->
    <statistics-table :project="project" @topic-click="handleTopicClick" />

    <!-- 课题分析明细 -->
    <detail-table ref="detailRef" :project="project" />

    <topic-work-package-dialog
      ref="topWorkPackageRef"
      :table-data="topicWorkPackageData"
      :object="objectProject"
    />
  </div>
</template>

<script>
import StatisticsTable from './StatisticsTable'
import DetailTable from './DetailTable'
import TopicWorkPackageDialog from './TopicWorkPackageDialog'

import request from '@/services/post'

export default {
  components: {
    StatisticsTable,
    DetailTable,
    TopicWorkPackageDialog
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // project: undefined, // 项目线名称
      topicWorkPackageData: undefined, // 课题工作包统计
      objectProject: undefined // 点击的对象
    }
  },
  methods: {
    handleTopicClick(row) {
      this.objectProject = row
      this.getTechnologyTopicWorkPackageStaList(this.project, row.topic_name)
    },
    // 技术项目-课题工作包统计
    async getTechnologyTopicWorkPackageStaList(project, topic) {
      this.$refs.topWorkPackageRef.topic = topic
      this.$refs.topWorkPackageRef.isLoading = true
      this.$refs.topWorkPackageRef.dialogVisible = true
      const { data: res } = await request(
        '/api/projectEvolveSta/queryByTechnologyTopicWorkPackageSta',
        {
          method: 'GET',
          params: {
            project,
            topic
          }
        }
      )
      this.topicWorkPackageData = res
      this.$nextTick(() => {
        this.$refs.topWorkPackageRef.getList()
        this.$refs.topWorkPackageRef.isLoading = false
      })
    },
    // 技术项目-修改课题验收方式
    async updateTechnologyCheckMode(topic, value) {
      const values = {
        topic_name: topic,
        check_mode: value,
        project: this.project
      }
      const { data: res } = await request(
        '/api/projectEvolveSta/technologyTopicInfo/updateCheckMode',
        {
          method: 'POST',
          data: values
        }
      )
      console.log(res)
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

.card {
  margin-top: 10px;
}
</style>

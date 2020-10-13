<template>
  <div class="main">
    <el-card>
      <el-row :gutter="30">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 8 }"
          :xl="{ span: 8 }"
        >
          <card title="系统公告" :title-size="16" class="card">
            <template #buttons>
              <el-button type="primary" style="mini" @click="handleMoreClick">更多</el-button>
            </template>

            <el-collapse v-model="systemNotificationActive" accordion>
              <el-collapse-item
                v-for="(item, index) in systemNoticeThree"
                :key="index"
                :title="item.title"
                :name="String(index)"
              >
                <div v-for="(item2, index2) in item.contentList" :key="index2">
                  {{ item2 }}
                </div>
              </el-collapse-item>
            </el-collapse>
          </card>
        </el-col>

        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 8 }"
          :xl="{ span: 8 }"
        >
          <card title="案例待办" :title-size="16" class="card">
            <template #buttons>
              <el-button
                type="primary"
                style="mini"
                @click="handleCaseProcessClick"
              >处理</el-button>
            </template>

            <el-collapse v-model="systemNotificationActive" accordion>
              <el-collapse-item
                v-for="item in caseInfoThree"
                :key="item.id"
                :title="item.nowName"
                :name="String(index)"
              >
                {{ "案例内容：" + item.caseContent }}
                <br>
                {{ "当事人描述：" + item.eventDescribe }}
              </el-collapse-item>
            </el-collapse>
          </card>
        </el-col>

        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 8 }"
          :xl="{ span: 8 }"
        >
          <card title="问题待办" :title-size="16" class="card">
            <template #buttons>
              <el-button
                type="primary"
                style="mini"
                @click="handleQuestionProcessClick"
              >处理</el-button>
            </template>

            <el-collapse v-model="systemNotificationActive" accordion>
              <el-collapse-item
                v-for="(item, index) in questionInfoThree"
                :key="item.id"
                :title="item.project + '-' + (item.question.length > 10 ? item.question.substring(0, 10) + '...' : item.question)"
                :name="String(index)"
              >
                {{ "问题类型：" + item.caseContent }}
                <br>
                {{ "问题现象：" + item.eventDescribe }}
              </el-collapse-item>
            </el-collapse>
          </card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Card from '@/components/Card'

import request from '@/services/request'

export default {
  components: {
    Card
  },
  data() {
    return {
      systemNotificationActive: 0,
      caseUpcomingActive: '1',
      questionUpcomingActive: '1',
      systemNoticeThree: undefined,
      caseInfoThree: undefined,
      questionInfoThree: undefined
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getSystemNoticeThree()
      this.getCaseInfoThree()
      this.getQuestionInfoThree()
    },
    handleMoreClick() {
      this.$router.push('/manage/system_notice')
    },
    handleQuestionProcessClick() {
      this.$router.push('/manage/system_question')
    },
    handleCaseProcessClick() {
      this.$router.push('/beforeMenu/case/case_info_handle_list')
    },
    async getSystemNoticeThree() {
      const { data: res } = await request('/api/systemNotice/queryBySystemNoticeThree')
      this.systemNoticeThree = res
    },
    async getCaseInfoThree() {
      const { data: res } = await request('/api/caseInfoData/queryByCaseInfoThree')
      this.caseInfoThree = res
    },
    async getQuestionInfoThree() {
      const { data: res } = await request('/api/systemAutoProjectQuestion/handleQuestionList')
      this.questionInfoThree = res
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: calc(100vh - 84px);
  padding: 20px;
  background: #f0f2f5;

  .card {
    margin: 30px;
  }
}
</style>

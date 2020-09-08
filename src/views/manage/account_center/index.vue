<template>
  <div id="account-center">
    <el-card>
      <el-row :gutter="24">
        <!-- 个人信息 -->
        <el-col :span="8">
          <card title="个人信息" class="card">
            <div>
              <span>姓名：</span>
              <span>{{ currentUser.userCn }}</span>
            </div>
            <div>
              <span>工号：</span>
              <span>{{ currentUser.employeeId }}</span>
            </div>
            <div>
              <span>邮箱：</span>
              <span>{{ currentUser.email }}</span>
            </div>
            <div>
              <span>事业部：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.businessDep === undefined ? '' : qualificationsInfo.businessDep }}</span>
            </div>
            <div>
              <span>部门：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.department === undefined ? '' : qualificationsInfo.department }}</span>
            </div>
            <div>
              <span>专业组：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.groupName === undefined ? '' : qualificationsInfo.groupName }}</span>
            </div>
          </card>
        </el-col>
        <!-- 资质信息 -->
        <el-col :span="8">
          <card title="资质信息" class="card">
            <div>
              <span>当前资质：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.qualifications === undefined ? '无' : qualificationsInfo.qualifications }}</span>
            </div>

            <div>
              <span>资质计划：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.qualificationsPlan === undefined ? '无' : qualificationsInfo.qualificationsPlan }}</span>
            </div>

            <div>
              <span>目标资质：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.targetQualifications === undefined ? '无' : qualificationsInfo.targetQualifications }}</span>
            </div>

            <div>
              <span>资质条件（域）：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.realmExplain === undefined ? '无' : qualificationsInfo.realmExplain }}</span>
            </div>

            <div>
              <span>资质条件（产出）：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.projectProduce === undefined ? '无' : qualificationsInfo.projectProduce }}</span>
            </div>

            <div>
              <span>目前完成度：</span>
              <span>{{ qualificationsInfo === undefined || qualificationsInfo.produceRate === undefined ? '无' : qualificationsInfo.produceRate + '%' }}</span>
            </div>
          </card>
        </el-col>
        <!-- 系统信息 -->
        <el-col :span="8">
          <card title="系统信息" class="card">
            <div>
              <span>系统权限：</span>
              <span>{{ role.role === '' ? '普通用户' : role.role }}</span>
            </div>
            <div>
              <span>未读消息：</span>
              <span>{{ messageNum === undefined || messageNum.unread_num === undefined ? 0 : messageNum.unread_num }}</span>
            </div>
            <div>
              <span>发送消息：</span>
              <span>{{ messageNum === undefined || messageNum.send_num === undefined ? 0 : messageNum.send_num }}</span>
            </div>
            <div>
              <span>接收消息：</span>
              <span>{{ messageNum === undefined || messageNum.receiver_num === undefined ? 0 : messageNum.receiver_num }}</span>
            </div>
          </card>
        </el-col>
      </el-row>

      <card title="数据统计" :title-size="18">
        <chart height="400px" :option-rate="chartOptions" />
      </card>
    </el-card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Chart from '@/components/MyChart/Chart'
import request from '@/services/post'
import { mapGetters } from 'vuex'

export default {
  name: 'AccountCenter',
  components: {
    Card,
    Chart
  },
  data() {
    return {
      // currentUser: {}, // 当前用户
      qualificationsInfo: {}, // 资质信息
      role: {}, // 用户角色
      messageNum: {}, // 消息数量统计
      chartOptions: undefined // chart图表配置项
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.qualificationsGatherInfo()
      this.rolePerson()
      this.unreadNum()
      this.dataStatistics()
    },
    async qualificationsGatherInfo() {
      const { data: res } = await request('/api/userQualifications/userQualificationsGatherInfo', {
        method: 'GET'
      })
      this.qualificationsInfo = res
    },
    async rolePerson() {
      const { data: res } = await request('/api/authority/role/person', {
        method: 'GET'
      })
      this.role = res
    },
    async unreadNum() {
      const { data: res } = await request('/api/message/messageNum', {
        method: 'GET'
      })
      this.messageNum = res
    },
    async dataStatistics(values) {
      const { data: res } = await request(
        '/api/userQualifications/echarts/echartsPersonProduceRankingDate',
        {
          method: 'POST',
          data: values
        }
      )
      this.chartOptions = {
        title: {
          text: res.name
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: res.xCoordinate
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: res.echartsData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#account-center {
  font-size: 14px;
  .el-card {
    margin: 20px;
  }

  // 个人信息
  .el-col {
    div {
      margin-top: 0;
      margin-bottom: 1em;
      color: rgba(0, 0, 0, 0.65);

      span:nth-child(2) {
        margin-left: 5px;
      }
    }
  }
}
</style>

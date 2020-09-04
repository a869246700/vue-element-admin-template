<template>
  <div id="account-center">
    <el-card>
      <el-row :gutter="30">
        <!-- 个人信息 -->
        <el-col :span="8">
          <card title="个人信息" class="card">
            <div>
              <span>姓名：</span>
              <span>高宇</span>
            </div>
            <div>
              <span>工号：</span>
              <span>RI05259</span>
            </div>
            <div>
              <span>邮箱：</span>
              <span>gaoyu@ruijie.com.cn</span>
            </div>
            <div>
              <span>事业部：</span>
              <span>4</span>
            </div>
            <div>
              <span>部门：</span>
              <span>2</span>
            </div>
            <div>
              <span>专业组：</span>
              <span>3</span>
            </div>
          </card>
        </el-col>
        <!-- 资质信息 -->
        <el-col :span="8">
          <card title="资质信息" class="card">
            <div>
              <span>当前资质：</span>
              <span>无</span>
            </div>

            <div>
              <span>资质计划：</span>
              <span>无</span>
            </div>

            <div>
              <span>目标资质：</span>
              <span>无</span>
            </div>

            <div>
              <span>资质条件（域）：</span>
              <span>无</span>
            </div>

            <div>
              <span>资质条件（产出）：</span>
              <span>无</span>
            </div>

            <div>
              <span>目前完成度：</span>
              <span>0</span>
            </div>
          </card>
        </el-col>
        <!-- 系统信息 -->
        <el-col :span="8">
          <card title="系统信息" class="card">
            <div>
              <span>系统权限：</span>
              <span>项目运营管理员</span>
            </div>
            <div>
              <span>未读消息：</span>
              <span>0</span>
            </div>
            <div>
              <span>发送消息：</span>
              <span>0</span>
            </div>
            <div>
              <span>接收消息：</span>
              <span>0</span>
            </div>
          </card>
        </el-col>
      </el-row>

      <card title="数据统计" :title-size="18">
        <div style="height: 400px;">代填区域</div>
      </card>
    </el-card>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'AccountCenter',
  components: {
    Card
  },
  data() {
    return {
      msg: 'hello coderGoo'
    }
  }
}
</script>

<style lang="scss" scoped>
#account-center {
  font-size: 14px;
  .el-card {
    margin: 30px;
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

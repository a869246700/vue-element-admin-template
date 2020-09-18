<template>
  <el-row class="data-panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-progress">
          <svg-icon icon-class="clock" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>进度:{{ `[${progress.title}]` }}</div>
          <div>执行率：{{ (progress.exac_actual / progress.exac_plan) * 100 + '%' }}</div>
          <div>Pass率：{{ (progress.pass_actual / progress.pass_plan) * 100 + '%' }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-quality">
          <svg-icon icon-class="quality" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>质量:{{ `[${quality.title}]` }}</div>
          <div>目标：{{ quality.target + '个/K' }}</div>
          <div>当前质量：{{ quality.current+ '个/K' }}</div>
          <div>遗漏率：{{ quality.omiss_rate + '个/K' }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-cost">
          <svg-icon icon-class="cost" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>成本:{{ `[${cost.title}]` }}</div>
          <div>目标：{{ cost.target + 'D/K' }}</div>
          <div>当前使用：{{ cost.current+ '%' }}</div>
          <div>测试效率：{{ cost.test_rate + 'D/K' }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-risk">
          <svg-icon icon-class="risk" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>风险&问题:{{ `[${risk_question.title}]` }}</div>
          <div>总风险数：{{ risk_question.total + '个' }}</div>
          <div>已闭环：{{ risk_question.is_round + '个' }}</div>
          <div>未闭环：{{ risk_question.is_not_round + '个' }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      progress: {
        title: '总用例执行情况',
        exac_plan: 1000,
        exac_actual: 1000,
        pass_plan: 1000,
        pass_actual: 950
      },
      quality: {
        title: '标题暂无',
        target: 2.3,
        current: 1.96,
        omiss_rate: 0.05
      },
      cost: {
        title: '标题暂无',
        target: 2399,
        current: 51,
        test_rate: 1200
      },
      risk_question: {
        title: '标题暂无',
        total: 23,
        is_not_round: 13,
        is_round: 10
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.data-panel-group {
  margin-top: 18px;

  .data-panel-item {
    padding: 0 20px;
    margin-bottom: 32px;
  }

  .data-panel-wrapper {
    display: flex;
    align-items: center;
    height: 108px;
    background-color: #fff;

    &:hover {
      .panel-icon {
        color: #fff;
      }

      .icon-progress {
        background: #40c9c6;
      }

      .icon-quality {
        background: #36a3f7;
      }

      .icon-risk {
        background: #f4516c;
      }

      .icon-cost {
        background: #ffa502;
      }
    }

    .icon-progress {
      color: #40c9c6;
      border: 2px solid #40c9c6;
    }

    .icon-quality {
      color: #36a3f7;
      border: 2px solid #36a3f7;
    }

    .icon-risk {
      color: #f4516c;
      border: 2px solid #f4516c;
    }

    .icon-cost {
      color: #ffa502;
      border: 2px solid #ffa502;
    }

    .panel-icon {
      margin: 0 30px 0 20px;
      padding: 20px;
      border-radius: 6px;

      .card-panel-icon {
        font-size: 48px;
      }
    }

    .panel-data {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: bold;

      div {
        margin-bottom: 5px;
      }
    }
  }
}
</style>

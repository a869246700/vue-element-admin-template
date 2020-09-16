<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-progress">
          <svg-icon icon-class="clock" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <div>进度:{{ `[${progress.title}]` }}</div>
            <div>执行率：{{ (progress.exac_actual / progress.exac_plan) * 100 + '%' }}</div>
            <div>Pass率：{{ (progress.pass_actual / progress.pass_plan) * 100 + '%' }}</div>
          </div>
          <!-- <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-quality">
          <svg-icon icon-class="list" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <div>质量:{{ `[${quality.title}]` }}</div>
            <div>目标：{{ quality.target + '个/K' }}</div>
            <div>当前质量：{{ quality.current+ '个/K' }}</div>
            <div>遗漏率：{{ quality.omiss_rate + '个/K' }}</div>
          </div>
          <!-- <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-cost">
          <svg-icon icon-class="cost" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <div>成本:{{ `[${cost.title}]` }}</div>
            <div>目标：{{ cost.target + 'D/K' }}</div>
            <div>当前使用：{{ cost.current+ '%' }}</div>
            <div>测试效率：{{ cost.test_rate + 'D/K' }}</div>
          </div>
          <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-risk">
          <svg-icon icon-class="risk" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <div>风险&问题:{{ `[${risk_question.title}]` }}</div>
            <div>总风险数：{{ risk_question.total + '个' }}</div>
            <div>已闭环：{{ risk_question.is_round + '个' }}</div>
            <div>未闭环：{{ risk_question.is_not_round + '个' }}</div>
          </div>
          <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
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
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
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
        background: #34bfa3;
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
      color: #34bfa3;
      border: 2px solid #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 40px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 16px 26px 16px 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;

        & div {
          font-size: 14px;
          margin-bottom: 2px;
        }
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

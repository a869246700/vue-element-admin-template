<template>
  <el-row class="data-panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-progress">
          <svg-icon icon-class="clock" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>进度:{{ `[${data.progress_title || '标题暂无'}]` }}</div>
          <div>执行率：{{ (data.progress_exac ? data.progress_exac : 0) + '%' }}</div>
          <div>Pass率：{{ (data.progress_pass ? data.progress_pass : 0) + '%' }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-quality">
          <svg-icon icon-class="quality" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>质量:{{ `[${data.quality_title || '标题暂无'}]` }}</div>
          <div>目标：{{ (data.quality_target ? data.quality_target : 0) + '个/K' }}</div>
          <div>当前质量：{{ (data.quality_current ? data.quality_current : 0) + '个/K' }}</div>
          <div>遗漏率：{{ (data.quality_omiss_rate ? data.quality_omiss_rate : 0) + '个/K' }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-cost">
          <svg-icon icon-class="cost" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>成本:{{ `[${data.cost_title || '标题暂无'}]` }}</div>
          <div>目标：{{ (data.cost_target ? data.cost_target : 0) + 'D/K' }}</div>
          <div>当前使用：{{ (data.cost_current ? data.cost_current : 0) + '%' }}</div>
          <div>测试效率：{{ (data.cost_efficiency ? data.cost_efficiency : 0) + 'D/K' }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="data-panel-item">
      <div class="data-panel-wrapper">
        <div class="panel-icon icon-risk">
          <svg-icon icon-class="risk" class-name="card-panel-icon" />
        </div>

        <div class="panel-data">
          <div>风险&问题:{{ `[${data.risk_title || '标题暂无'}]` }}</div>
          <div>总风险数：{{ (data.risk_total ? data.risk_total : 0) + '个' }}</div>
          <div>已闭环：{{ (data.risk_isClosed ? data.risk_isClosed : 0) + '个' }}</div>
          <div>未闭环：{{ (data.risk_isNotClosed ? data.risk_isNotClosed : 0) + '个' }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    // 传递过来的面板数据
    data: {
      type: Object,
      default() {
        return {}
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

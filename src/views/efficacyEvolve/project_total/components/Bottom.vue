<template>
  <el-row :gutter="20" style="margin-top: 20px; height: 110px;">
    <el-col :span="7">
      <div class="flex" style="height: 40px;">
        <i class="el-icon-s-order icon" />
        <div>
          <div>{{ `${defect.package_defect[0]}个/k ~ ${defect.package_defect[1]}个/k` }}</div>
          <div style="margin-top: 5px;">工作包缺陷质量(实际/目标)</div>
        </div>
      </div>

      <div class="flex" style="margin-top: 30px; height: 40px;">
        <i class="el-icon-s-order icon" />
        <div>
          <div>{{ `${defect.omiss_bug_defect[0]}个/k ~ ${defect.omiss_bug_defect[1]}个/k` }}</div>
          <div style="margin-top: 5px;">遗留BUG缺陷质量(实际/目标)</div>
        </div>
      </div>
    </el-col>

    <el-col :span="9">
      <div class="flex" style="height: 40px;">
        <i class="iconfont icon-clock icon" />
        <div>
          <div>当前轮次 进度偏差率：{{ `${deviation.current.rate}%（delay ${deviation.current.day}D）` }}</div>
          <div
            style="margin-top: 5px;"
          >项目整体 进度偏差率：{{ `${deviation.total.rate}%（delay ${deviation.total.day}D）` }}</div>
        </div>
      </div>

      <div class="flex" style="margin-top: 30px; height: 40px;">
        <i class="el-icon-s-operation icon" />
        <div>
          <div>已偏差轮次 {{ `首轮(${deviationRound.sl_rate}% ${deviationRound.sl_day}D)` }}、{{ `准入(${deviationRound.zr_rate}% ${deviationRound.zr_day}D)` }}、{{ `次轮(${deviationRound.cl_rate}% ${deviationRound.cl_day}D)` }}</div>
        </div>
      </div>
    </el-col>

    <el-col :span="6">
      <div>项目风险结项情况</div>
      <div class="flex" style="margin-top: 20px; height: 40px;">
        <div class="flex" style="margin-right: 20px;">
          <i class="el-icon-warning icon" style="color: #ff3333" />
          <div>
            <div>10</div>
            <span>总风险项</span>
          </div>
        </div>
        <div class="flex" style="height: 40px;">
          <i class="el-icon-s-claim icon" style="color: #13ce66" />
          <div>
            <div>23</div>
            <span>已结项</span>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :span="1" class="flex enter">
      <el-button type="primary" icon="el-icon-right" circle />
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      defect: {
        package_defect: [0.96, 2.3],
        omiss_bug_defect: [1.3, 0.8]
      },
      deviation: {
        isShow: true,
        current: {
          rate: 0,
          day: 0
        },
        total: {
          rate: 30,
          day: 12
        }
      },
      deviationRound: {
        isShow: true,
        sl_rate: 10,
        sl_day: 1,
        zr_rate: 20,
        zr_day: 1,
        cl_rate: 30,
        cl_day: 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}

.icon {
  width: 30px;
  font-size: 24px;
}

.enter {
  height: 100%;
  justify-content: center;
}
</style>

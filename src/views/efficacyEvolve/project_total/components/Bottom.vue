<template>
  <el-row :gutter="20" style="margin-top: 20px; height: 110px;">
    <el-col :span="7">
      <div class="flex" style="height: 40px;">
        <i class="el-icon-s-order icon" />
        <div>
          <div>xx个/k ~ xx个/k</div>
          <div style="margin-top: 5px;">工作包缺陷质量(实际/目标)</div>
        </div>
      </div>

      <div class="flex" style="margin-top: 30px; height: 40px;">
        <i class="el-icon-s-order icon" />
        <div>
          <div>xx个/k ~ xx个/k</div>
          <div style="margin-top: 5px;">遗留BUG缺陷质量(实际/目标)</div>
        </div>
      </div>
    </el-col>

    <el-col :span="9">
      <div class="flex" style="height: 40px;">
        <i class="iconfont icon-clock icon" />
        <div>
          <div>当前轮次 进度偏差率：xx%（delay XD）</div>
          <div style="margin-top: 5px;">项目整体 进度偏差率：xx%（delay XD）</div>
        </div>
      </div>

      <div class="flex" style="margin-top: 30px; height: 40px;">
        <i class="el-icon-s-operation icon" />
        <div>
          <div>已偏差轮次 首轮(X% XD)、准入(X% XD)、次轮(X% XD)</div>
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

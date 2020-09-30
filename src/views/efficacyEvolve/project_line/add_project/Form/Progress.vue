<template>
  <div class="progress">
    <div class="implement">
      <div class="title">用例执行</div>
      <div class="content">
        <div class="content-item">
          执行映射
          <span class="remarks">(与测试管理系统下发用例的关系，未填写则默认为【首轮用例】)</span>

          <div class="form-item">
            <el-input v-model.trim="temp.zr_mapping" size="small" style="width: 200px" />
            <span class="segmentation" />
            <span class="fw600">准入测试</span>
            <span class="remarks">例如：【首轮用例】映射为“首轮执行”的用例归类</span>
          </div>

          <div class="form-item">
            <el-input v-model.trim="temp.sl_mapping" size="small" style="width: 200px" />
            <span class="segmentation" />
            <span class="fw600">首轮测试</span>
          </div>

          <div class="form-item">
            <el-input v-model.trim="temp.cl_mapping" size="small" style="width: 200px" />
            <span class="segmentation" />
            <span class="fw600">次轮测试</span>
          </div>

          <div class="form-item">
            <el-input v-model.trim="temp.slhg_mapping" size="small" style="width: 200px" />
            <span class="segmentation" />
            <span class="fw600">首轮回归</span>
          </div>

          <div class="form-item">
            <el-input v-model.trim="temp.clhg_mapping" size="small" style="width: 200px" />
            <span class="segmentation" />
            <span class="fw600">次轮回归</span>
          </div>
        </div>

        <div class="content-item">
          <div style="margin-bottom: 8px">计划明日执行</div>
          <div style="margin-left: 10px; font-size: 13px">
            默认：（总用例数 -
            已执行数）/（计划中剩余天数），如进度已超期，则默认明天执行为所有未执行数。
          </div>
        </div>

        <div class="content-item">
          <div style="margin-bottom: 8px">还需执行天数</div>
          <div style="margin-left: 10px; font-size: 13px">
            默认：通过效率进行计算
            <div style="margin-top: 8px; margin-left: 40px">
              当前执行效率 = （已执行总数） / （已执行天数），还需执行天数 = （剩余天数）/
              当前执行效率
            </div>
          </div>
        </div>

        <div class="content-item">
          <div style="margin-bottom: 8px">用例观测维度</div>
          <div style="margin-left: 10px; font-size: 13px">
            <el-checkbox-group v-model="temp.case_dimension">
              <el-checkbox label="芯片平台" />
              <el-checkbox label="用例属性" />
              <el-checkbox label="测试域" />
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>

    <div class="sepc">
      <div class="title">SPEC核验</div>
      <div class="content">按照当前模板获取 “测试管理平台” 的数据信息呈现;</div>
    </div>

    <div class="review">
      <div class="title">文档评审</div>
      <div class="content">按照当前模板获取 “PMS系统” 的数据信息呈现;</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp: {
        case_dimension: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  font-size: 15px;
  font-weight: normal;

  & > div:nth-child(-n + 2) {
    margin-bottom: 15px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .content {
    margin-top: 8px;
    padding: 10px;
    border: 1px solid #aaa;
  }

  .content-item {
    margin-bottom: 15px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .form-item {
    margin-top: 10px;

    .fw600 {
      font-weight: 600;
    }

    .segmentation {
      display: inline-block;
      width: 20px;
      height: 1px;
      vertical-align: middle;
      margin: 0 10px;
      border: 2px solid #2ed573;
    }
  }

  .remarks {
    margin-left: 10px;
    font-size: 13px;
    color: #aaa;
    font-weight: normal;
  }
}
</style>

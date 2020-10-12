<template>
  <el-form ref="formRef" :model="temp" :rules="rules" class="quality">
    <div class="form-container">
      <div class="form-item">
        <div class="title">工作包阶段对应关系</div>
        <el-form-item prop="work_package_stage_mapping">
          <el-button
            v-loading="butLoading"
            size="small"
            type="primary"
            @click="handleDownloadTemplateClick"
          >下载导入模板</el-button>
          <el-upload
            action="http://172.30.61.89:882/api/userQualificationsRealmReach/import"
            :file-list="temp.work_package_stage_mapping"
            :show-file-list="false"
            :on-success="handleSuccessUpload"
            :on-error="handleErrorUpload"
            class="inlineBlock"
            style="margin-left: 10px"
          >
            <el-button size="small" icon="el-icon-download">导入数据</el-button>
          </el-upload>
          <div class="tip">
            导入数据按照下表列顺序(不包含操作列)创建表格或点击上面按钮下载模版，目前仅支持xlsx和xls格式导入！
          </div>
        </el-form-item>
      </div>

      <div class="form-item">
        <div class="title">组件项目的遗漏时间</div>
        <el-form-item prop="component_project_omission">
          <el-input
            v-model.trim="temp.component_project_omission"
            size="small"
            placeholder="可选填"
            style="width: 200px"
          />
        </el-form-item>
      </div>

      <div class="form-item">
        <div class="title">质量缺陷</div>
        <div class="quality-defect el-form-item">
          <div>
            <!-- 缺陷质量目标&相关要素设置 -->
            <div style="font-size: 16px">缺陷质量目标&相关要素设置</div>
            <div style="margin-top: 5px; margin-left: 20px">
              <div style="margin-top: 5px">
                缺陷质量总目标：<el-input
                  v-model.trim="temp.defact_total"
                  size="mini"
                  style="width: 100px"
                />
                <span style="margin-left: 5px">个/Kloc</span>
              </div>

              <div>
                <div style="margin-top: 5px">
                  工作包质量目标：<el-input
                    v-model.trim="temp.workpackage_quality"
                    size="mini"
                    style="width: 100px"
                  />
                  <span style="margin-left: 5px">个/Kloc</span>
                </div>
                <div style="margin-left: 40px">
                  <div style="margin-top: 5px">
                    准入：<el-input
                      v-model.trim="temp.zr_workpackage_quality"
                      size="mini"
                      style="width: 100px"
                    />
                    <span style="margin-left: 5px">个/Kloc</span>
                  </div>
                  <div style="margin-top: 5px">
                    内测：<el-input
                      v-model.trim="temp.nc_workpackage_quality"
                      size="mini"
                      style="width: 100px"
                    />
                    <span style="margin-left: 5px">个/Kloc</span>
                  </div>
                </div>
              </div>

              <div style="margin-top: 5px">
                遗留BUG目标：<el-input
                  v-model.trim="temp.legacy_bug_target"
                  size="mini"
                  style="width: 100px"
                />
                <span style="margin-left: 5px">个/Kloc</span>
              </div>

              <div>
                <div style="margin-top: 5px">
                  遗漏BUG目标：<el-input
                    v-model.trim="temp.omission_bug_target"
                    size="mini"
                    style="width: 100px"
                  />
                  <span style="margin-left: 5px">个/Kloc</span>
                </div>
                <div style="margin-left: 40px">
                  <div style="margin-top: 5px">
                    工作包遗漏：<el-input
                      v-model.trim="temp.workpackage_omission"
                      size="mini"
                      style="width: 100px"
                    />
                    <span style="margin-left: 5px">个/Kloc</span>
                  </div>
                  <div style="margin-top: 5px">
                    遗留遗漏：<el-input
                      v-model.trim="temp.legacy_omission"
                      size="mini"
                      style="width: 100px"
                    />
                    <span style="margin-left: 5px">个/Kloc</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 缺陷质量预警 -->
            <div style="margin-top: 10px; font-size: 16px">缺陷质量预警</div>
            <div style="margin-top: 5px; margin-left: 20px">
              质量数据超出/低于目标数据
              <el-input v-model.trim="temp.defect_warning" size="mini" style="width: 60px" />
              %后，进行【标红】预警;
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import DownFiles from '@/vendor/ExportExcel'

export default {
  data() {
    return {
      butLoading: false,
      temp: {
        work_package_stage_mapping: undefined,
        component_project_omission: undefined
      },
      rules: {}
    }
  },
  methods: {
    validate() {
      let tag = false
      this.$refs.formRef.validate((valid) => {
        tag = valid
      })
      return tag
    },
    resetTemp() {
      this.temp = {
        ork_package_stage_mapping: undefined,
        component_project_omission: undefined
      }
    },
    handleDownloadTemplateClick() {
      const url = '/api/export/realmReachTemplate'
      const obj = {}
      const fileName = '专业域技能域达成列表.xls'
      DownFiles(url, obj, fileName, this)
    },
    handleErrorUpload(err) {
      console.log(err)
    },
    handleSuccessUpload(res) {
      if (res.error) {
        this.$message.error(res.error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.quality {
  font-size: 15px;
  font-weight: normal;

  .form-container {
    .form-item {
      margin-bottom: 25px;

      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
      }

      .el-form-item {
        padding: 10px;
        border: 1px solid #aaa;
        margin-top: 10px;
      }
    }
  }

  .el-form-item:nth-last-child(1) {
    margin-bottom: 0 !important;
  }
}
</style>

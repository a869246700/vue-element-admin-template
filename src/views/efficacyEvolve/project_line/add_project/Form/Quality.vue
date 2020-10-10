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
      this.$refs.formRef.validate(valid => {
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
  font-size: 14px;
  font-weight: normal;

  .form-container {
    padding: 10px;
    border: 1px solid #aaa;

    .form-item {
      &:nth-child(-n + 1) {
        margin-bottom: 30px;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
      }

      .el-form-item {
        margin-top: 10px;
      }
    }
  }

  .el-form-item:nth-last-child(1) {
    margin-bottom: 0!important;
  }
}
</style>

<template>
  <el-form ref="formRef" :model="temp" :rules="rules" class="technology">
    <div class="form-container">
      <div class="form-item">
        <div class="title">工作包课题对应关系</div>
        <el-form-item
          ref="workpackageTopicRef"
          prop="workpackage_topic_mapping"
          class="flex"
        >
          <el-button
            v-loading="butLoading"
            size="small"
            type="primary"
            @click="handleDownloadTemplateClick"
          >下载导入模板</el-button>
          <el-upload
            action="http://172.30.61.89:882/api/userQualificationsRealmReach/import"
            :file-list="temp.workpackage_topic_mapping"
            :show-file-list="false"
            :on-success="handleSuccessUpload"
            :on-error="handleErrorUpload"
            class="inlineBlock"
            style="margin-left: 10px"
          >
            <el-button size="small" icon="el-icon-download">导入数据</el-button>
          </el-upload>
          <div class="tip">导入数据按照下表列顺序(不包含操作列)创建表格或点击上面按钮下载模版，目前仅支持xlsx和xls格式导入！</div>
        </el-form-item>
      </div>
    </div>

    <div class="footer">
      <el-button type="primary" @click="handleSaveClick">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import request from '@/services/request'
import DownFiles from '@/vendor/ExportExcel'

export default {
  props: {
    project: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      butLoading: false,
      temp: {
        workpackage_topic_mapping: []
      },
      rules: {
        workpackage_topic_mapping: [
          {
            required: true,
            message: '请导入工作包课题对应关系',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 提供验证方法
    // 提供验证方法
    validate() {
      let tag = false
      this.$refs.formRef.validate(valid => {
        tag = valid
      })
      return tag
    },
    handleDownloadTemplateClick() {
      const url = '/api/export/realmReachTemplate'
      const obj = {}
      const fileName = '专业域技能域达成列表.xls'
      DownFiles(url, obj, fileName, this)
    },
    handleErrorUpload(err, file) {
      console.log(err)
    },
    handleSuccessUpload(res, file, fileList) {
      if (res.error) {
        this.$message.error(res.error)
      } else {
        this.temp.workpackage_topic_mapping = [file]
        this.$refs.workpackageTopicRef.clearValidate()
      }
    },
    // 保存数据
    async handleSaveClick() {
      this.temp.project = this.project
      const { data: res } = await request('/api/zcodergoo/addTechnologyModel', {
        method: 'POST',
        data: this.temp
      })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.technology {
  font-size: 14px;
  font-weight: normal;

  .form-container {
    padding: 10px;
    border: 1px solid #aaa;

    .form-item {

      .title {
        font-size: 16px;
        font-weight: 600;
      }

      .el-form-item {
        margin-top: 10px;
      }

      .tip {
        font-size: 13px;
        color: #aaa;
      }
    }

    .class-target {
      .label {
        display: inline-block;
        width: 70px;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>

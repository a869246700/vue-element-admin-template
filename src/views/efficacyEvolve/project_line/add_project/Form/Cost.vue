<template>
  <el-form ref="formRef" :model="temp" :rules="rules" class="cost">
    <div class="form-container">
      <div class="form-item">
        <div class="title">工作包对应域关系</div>
        <el-form-item ref="workpackageRealmRef" prop="workpackage_realm_mapping" class="flex">
          <el-button
            v-loading="butLoading"
            size="small"
            type="primary"
            @click="handleDownloadTemplateClick('workpackage')"
          >下载导入模板</el-button>
          <el-upload
            action="http://172.30.61.89:882/api/userQualificationsRealmReach/import"
            :file-list="temp.workpackage_realm_mapping"
            :show-file-list="false"
            :on-success="handleWorkpackageRealmSuccessUpload"
            :on-error="handleErrorUpload"
            class="inlineBlock"
            style="margin-left: 10px"
          >
            <el-button size="small" icon="el-icon-download">导入数据</el-button>
          </el-upload>
          <div class="tip">导入数据按照下表列顺序(不包含操作列)创建表格或点击上面按钮下载模版，目前仅支持xlsx和xls格式导入！</div>
        </el-form-item>
      </div>

      <div class="form-item">
        <div class="title">人员对应域关系</div>
        <el-form-item ref="peopleRealmRef" prop="people_realm_mapping">
          <el-button
            v-loading="butLoading"
            size="small"
            type="primary"
            @click="handleDownloadTemplateClick('people')"
          >下载导入模板</el-button>
          <el-upload
            action="http://172.30.61.89:882/api/userQualificationsRealmReach/import"
            :file-list="temp.people_realm_mapping"
            :show-file-list="false"
            :on-success="handlePeopleRealmSuccessUpload"
            :on-error="handleErrorUpload"
            class="inlineBlock"
            style="margin-left: 10px"
          >
            <el-button size="small" icon="el-icon-download">导入数据</el-button>
          </el-upload>
          <div class="tip">导入数据按照下表列顺序(不包含操作列)创建表格或点击上面按钮下载模版，目前仅支持xlsx和xls格式导入！</div>
        </el-form-item>
      </div>

      <div class="form-item">
        <div class="title">各大类目标</div>
        <el-form-item class="class-target">
          <div>
            <span class="label">技术项目</span>
            <el-input
              v-model.trim="temp.technology_project"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />

            <span class="label" style="margin-left: 30px">芯片项目</span>
            <el-input
              v-model.trim="temp.chip_project"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />
          </div>

          <div style="margin-top: 10px">
            <span class="label">主干</span>
            <el-input
              v-model.trim="temp.trunk"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />

            <span class="label" style="margin-left: 30px">组件项目</span>
            <el-input
              v-model.trim="temp.component_project"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />
          </div>
        </el-form-item>
      </div>

      <div class="form-item">
        <div class="title">告警值</div>
        <el-form-item class="class-target">
          <div>
            <span class="label">技术项目</span>
            <el-input
              v-model.trim="temp.technology_project_warning"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />

            <span class="label" style="margin-left: 30px">芯片项目</span>
            <el-input
              v-model.trim="temp.chip_project_warning"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />
          </div>

          <div style="margin-top: 10px">
            <span class="label">主干</span>
            <el-input
              v-model.trim="temp.trunk_warning"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />

            <span class="label" style="margin-left: 30px">组件项目</span>
            <el-input
              v-model.trim="temp.component_project_warning"
              size="small"
              placeholder="可选填"
              style="width: 200px"
            />
          </div>
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
        workpackage_realm_mapping: undefined,
        people_realm_mapping: undefined,
        // 各大类目标
        technology_project: undefined,
        chip_project: undefined,
        trunk: undefined,
        component_project: undefined,
        // 告警值
        technology_project_warning: undefined,
        chip_project_warning: undefined,
        trunk_warning: undefined,
        component_project_warning: undefined
      },
      rules: {
        workpackage_realm_mapping: [
          { required: true, message: '请传入工作包对应域关系', trigger: 'change' }
        ],
        people_realm_mapping: [
          { required: true, message: '请传入人员对应域关系', trigger: 'change' }
        ]
      }
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
        workpackage_realm_mapping: undefined,
        component_project_omission: undefined,
        technology_project: undefined,
        chip_project: undefined,
        trunk: undefined,
        component_project: undefined
      }
    },
    handleErrorUpload(err) {
      console.log(err)
    },
    // 工作包对应域关系上传成功
    handleWorkpackageRealmSuccessUpload(res, file, fileList) {
      if (res.error) {
        this.$message.error(res.error)
      } else {
        this.temp.workpackage_realm_mapping = [file]
        this.$refs.workpackageRealmRef.clearValidate()
      }
    },
    handlePeopleRealmSuccessUpload(res, file, fileList) {
      if (res.error) {
        this.$message.error(res.error)
      } else {
        this.temp.people_realm_mapping = [file]
        this.$refs.peopleRealmRef.clearValidate()
      }
    },
    handleDownloadTemplateClick(type) {
      if (type === 'workpackage') {
        console.log(1)
      } else if (type === 'people') {
        console.log(2)
      }

      const url = '/api/export/realmReachTemplate'
      const obj = {}
      const fileName = '专业域技能域达成列表.xls'
      DownFiles(url, obj, fileName, this)
    }
  }
}
</script>

<style lang="scss" scoped>
.cost {
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
}
</style>

<template>
  <el-form class="roject-report">
    <div class="form-container">
      项目报告推送
    </div>

    <div class="footer">
      <el-button type="primary" @click="handleSaveClick">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import request from '@/services/request'

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
      temp: {}
    }
  },
  methods: {
    resetTemp() {
      this.temp = {}
    },
    // 保存数据
    async handleSaveClick() {
      this.temp.project = this.project
      const { data: res } = await request('/api/zcodergoo/addProjectReportModel', {
        method: 'POST',
        data: this.temp
      })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.roject-report {
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

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>


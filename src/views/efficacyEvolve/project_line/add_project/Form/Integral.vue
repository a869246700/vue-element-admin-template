<template>
  <el-form class="integral">
    <div class="form-container">
      积分考核
    </div>

    <div class="footer">
      <el-button type="primary" @click="handleSaveClick">保存</el-button>
    </div>
  </el-form>
</template>

<script>
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
      console.log('保存数据')
    }
  }
}
</script>

<style lang="scss" scoped>
.integral {
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

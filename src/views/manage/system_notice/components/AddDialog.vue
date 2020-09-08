<template>
  <el-dialog title="新增系统公告" :visible.sync="dialogVisible" width="50%">
    <el-form
      ref="addFormRef"
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="110px"
      style="width: 60%; margin: 0 auto;"
    >
      <el-form-item label="公告标题：" prop="title">
        <el-input v-model.trim="temp.title" style="width: 100%;" placeholder="请输入公告标题" />
      </el-form-item>

      <el-form-item label="公告内容：" prop="content">
        <el-input
          v-model.trim="temp.content"
          :rows="4"
          type="textarea"
          placeholder="请输入公告内容："
          style="width: 100%;"
        />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleComfirmClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from '@/services/request'

export default {
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请填写公告标题', trigger: 'blur' }],
        content: [{ required: true, message: '请填写公告标题内容', trigger: 'blur' }]
      },
      temp: {
        title: undefined,
        content: undefined
      },
      dialogVisible: false
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        title: undefined,
        content: undefined
      }
    },
    async handleComfirmClick() {
      this.$refs.addFormRef.validate(async(valid) => {
        if (valid) {
          const res = await request('/api/systemNotice/add', {
            method: 'POST',
            data: this.temp
          })

          if (res && res !== undefined) {
            this.$message.success('添加成功')
          }
          this.$nextTick(() => {
            this.dialogVisible = false
          })
        }
      })
    }
  }
}
</script>

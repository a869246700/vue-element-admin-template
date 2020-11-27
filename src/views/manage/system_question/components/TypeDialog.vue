<template>
  <el-dialog title="新增问题规则" :visible.sync="dialogVisible" width="50%">
    <el-form
      ref="addFormRef"
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="110px"
      style="width: 60%; margin: 0 auto;"
    >
      <el-form-item
        v-for="item in formOptions"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      >
        <el-input v-model.trim="temp[item.prop]" :placeholder="item.ph" style="width: 100%;" />
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
        question: [{ required: true, message: '请输入问题', trigger: 'blur' }],
        according: [{ required: true, message: '请输入判断依据', trigger: 'blur' }]
      },
      temp: {
        question: undefined,
        according: undefined,
        cause: undefined,
        causeReplenish: undefined,
        otherReplenish: undefined,
        userName: undefined
      },
      dialogVisible: false,
      formOptions: [
        {
          label: '问题',
          prop: 'question',
          ph: '请输入问题'
        },
        {
          label: '判断依据',
          prop: 'according',
          ph: '请输入判断依据'
        },
        {
          label: '根因',
          prop: 'cause',
          ph: '请输入根因'
        },
        {
          label: '根因补充说明',
          prop: 'causeReplenish',
          ph: '请输入根因补充说明'
        },
        {
          label: '问题其他补充',
          prop: 'otherReplenish',
          ph: '请输入问题其他补充'
        },
        {
          label: '支撑人员',
          prop: 'userName',
          ph: '请输入支撑人员'
        }
      ]
    }
  },
  methods: {
    resetTemp() {
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields()
      })
    },
    // 确认添加
    handleComfirmClick() {
      this.$refs.addFormRef.validate(async(valid) => {
        if (valid) {
          const res = await request('/api/systemAutoProjectQuestion/addType', {
            method: 'POST',
            data: this.temp
          })

          if (res && res !== undefined) {
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
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

<style>
</style>

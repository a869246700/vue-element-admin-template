<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
    <el-form
      ref="editFormRef"
      :model="temp"
      :rules="rules"
      label-width="110px"
      style="margin: 0 50px;"
    >
      <el-form-item
        v-for="item in formOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      >
        <el-input
          v-if="item.prop === 'user_name'"
          v-model.trim="temp.user_name"
          size="small"
          placeholder="请输入人员名称"
          style="width: 100%"
        />
        <el-date-picker v-else v-model="temp[item.prop]" size="small" style="width: 100%" />
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
    const dateValid = (rules, value, callback) => {
      if (
        +new Date(this.temp.relegation_start_date) - +new Date(this.temp.relegation_end_date) >
        0
      ) {
        callback('开始时间应当在结束时间之前')
      } else {
        callback()
      }
    }

    return {
      dialogVisible: false,
      temp: {},
      rules: {
        user_name: [{ required: true, message: '请填写人员名称', trigger: 'blur' }],
        relegation_start_date: [
          {
            required: true,
            message: '请填写资质开始时间',
            trigger: 'change'
          },
          {
            validator: dateValid,
            trigger: 'change'
          }
        ],
        relegation_end_date: [
          {
            required: true,
            message: '请填写资质结束时间',
            trigger: 'change'
          },
          {
            validator: dateValid,
            trigger: 'change'
          }
        ]
      },
      formOptions: [
        {
          label: '人员名称',
          prop: 'user_name'
        },
        {
          label: '资质开始时间',
          prop: 'relegation_start_date'
        },
        {
          label: '资质结束时间',
          prop: 'relegation_end_date'
        }
      ]
    }
  },
  methods: {
    setTemp(row) {
      this.temp = Object.assign({}, row)
    },
    formatDate(timeStamp) {
      const time = new Date(timeStamp)
      const y = time.getFullYear()
      const m = time.getMonth() + 1
      const d = time.getDate()

      return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    add0(m) {
      return m < 10 ? '0' + m : m
    },
    handleComfirmClick() {
      this.$refs.editFormRef.validate(async(valid) => {
        if (valid) {
          const values = {
            id: this.temp.id,
            userName: this.temp.user_name,
            relegationStartDate: this.formatDate(this.temp.relegation_start_date),
            relegationEndDate: this.formatDate(this.temp.relegation_end_date)
          }
          const { data: res } = await request('ref="editFormRef"', {
            method: 'POST',
            data: values
          })

          if (res && res !== undefined) {
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style>
</style>

<template>
  <el-dialog title="修改文档等级" :visible.sync="dialogVisible" width="50%">
    <el-form ref="editFormRef" :model="temp" :rules="rules" label-width="110px">
      <el-form-item
        v-for="item in formOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        style="margin-left: 20%;"
      >
        <el-input
          v-if="item.prop === 'ci_name'"
          v-model.trim="temp.ci_name"
          size="small"
          :placeholder="item.ph"
          style="width: 60%"
        />

        <el-input-number
          v-else-if="item.prop === 'level'"
          v-model.number="temp.level"
          controls-position="right"
          :min="-1"
          :max="1"
          size="small"
          :placeholder="item.ph"
          style="width: 60%"
        />

        <el-select
          v-else-if="item.prop === 'type'"
          v-model="temp.type"
          filterable
          size="small"
          :placeholder="item.ph"
          style="width: 60%"
        >
          <el-option
            v-for="(option, index) in typeSelectOptions"
            :key="index"
            :value="option.value"
            :label="option.title"
          >
            <div class="flex">
              <span
                class="dot"
                :style="{ background: option.key !== 'all' ? '#52c41a' : '#1895ff' }"
              />
              <span>{{ option.title }}</span>
            </div>
          </el-option>
        </el-select>

        <el-input
          v-else
          v-model.trim="temp.cause"
          type="textarea"
          :rows="3"
          size="small"
          :placeholder="item.ph"
          style="width: 60%"
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
      dialogVisible: false,
      temp: {},
      rules: {
        ci_name: [{ required: true, message: '请输入文档名称！', trigger: 'blur' }],
        level: [{ required: true, message: '请输入文档等级！', trigger: 'blur' }],
        type: [{ required: true, message: '请选择文档类型！', trigger: 'change' }],
        cause: [{ required: true, message: '请输入定级原因！', trigger: 'blur' }]
      },
      typeSelectOptions: [
        {
          title: 'HLD',
          value: 'HLD',
          key: 'hld'
        },
        {
          title: '方案',
          value: '方案',
          key: 'scheme'
        },
        {
          title: '用例',
          value: '用例',
          key: 'case'
        }
      ],
      formOptions: [
        {
          label: '文档名称',
          prop: 'ci_name',
          ph: '请输入文档名称！'
        },
        {
          label: '文档等级',
          prop: 'level',
          ph: '请输入文档等级！'
        },
        {
          label: '文档类型',
          prop: 'type',
          ph: '请选择文档类型！'
        },
        {
          label: '定级原因',
          prop: 'cause',
          ph: '请输入定级原因！'
        }
      ]
    }
  },
  methods: {
    setTemp(record) {
      this.temp = Object.assign({}, record)
    },
    handleComfirmClick() {
      this.$refs.editFormRef.validate(async(valid) => {
        if (valid) {
          const values = {
            id: this.temp.id,
            level: this.temp.level,
            type: this.temp.type,
            projectName: this.temp.cause
          }

          const { data: res } = await request('/api/cafUserInfo/updateGradingInfo', {
            method: 'POST',
            data: values
          })
          if (res === 1) {
            this.$message.success('修改成功')
            this.$emit('reload')
          } else {
            this.$message.error('修改失败')
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

<style lang="scss" scoped>
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  border-radius: 50%;
}
</style>

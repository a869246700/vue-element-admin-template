<template>
  <el-dialog title="新增项目进度问题" :visible.sync="dialogVisible" width="50%">
    <el-form
      ref="addFormRef"
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="110px"
      style="width: 60%; margin: 0 auto;"
    >
      <el-form-item label="项目名称" prop="project">
        <el-select v-model="temp.project" size="small" style="width: 100%;" placeholder="请选择项目名称">
          <el-option label="12.4PL1" value="12.4PL1" />
          <el-option label="12.5PL1" value="12.5PL1" />
        </el-select>
      </el-form-item>

      <el-form-item label="问题" prop="question">
        <el-input v-model.trim="temp.question" style="width: 100%;" placeholder="请输入项目问题" />
      </el-form-item>

      <el-form-item label="问题类型" prop="questionType">
        <el-select
          v-model="temp.questionType"
          size="small"
          filterable
          style="width: 100%;"
          placeholder="请选择问题类型"
        >
          <el-option
            v-for="(item, index) in typeSelectList"
            :key="index"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="问题现象" prop="phenomenon">
        <el-input
          v-model.trim="temp.phenomenon"
          :rows="4"
          type="textarea"
          placeholder="请输入问题现象"
          style="width: 100%;"
        />
      </el-form-item>

      <el-form-item label="责任人" prop="userName">
        <el-select v-model="temp.userName" size="small" filterable style="width: 100%;" placeholder="请选择问题类型">
          <el-option
            v-for="(item, index) in personSelectList"
            :key="index"
            :label="item.title"
            :value="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="管理者" prop="manageName">
        <el-select
          v-model="temp.manageName"
          size="small"
          filterable
          style="width: 100%;"
          placeholder="请选择问题类型"
        >
          <el-option
            v-for="(item, index) in personSelectList"
            :key="index"
            :label="item.title"
            :value="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否跟催" prop="isUrge">
        <el-radio-group v-model="temp.isUrge">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="考核时间" prop="examineTime">
        <el-date-picker
          v-model="temp.examineTime"
          type="datetime"
          placeholder="请选择考核时间"
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
  props: {
    typeSelectList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      rules: {
        project: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
        question: [{ required: true, message: '请输入问题', trigger: 'blur' }],
        questionType: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
        phenomenon: [{ required: true, message: '请输入问题现象', trigger: 'blur' }],
        userName: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        manageName: [{ required: true, message: '请选择管理者', trigger: 'change' }],
        isUrge: [{ required: true, message: '请选择是否跟催', trigger: 'change' }],
        examineTime: [{ required: true, message: '请选择考核时间', trigger: 'change' }]
      },
      temp: {
        project: undefined,
        question: undefined,
        questionType: undefined,
        phenomenon: undefined,
        userName: undefined,
        manageName: undefined,
        isUrge: 0,
        examineTime: undefined
      },
      dialogVisible: false,
      personSelectList: []
    }
  },
  created() {
    this.getPersonList()
  },
  methods: {
    resetTemp() {
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields()
      })
    },
    async handleComfirmClick() {
      this.$refs.addFormRef.validate(async(valid) => {
        if (valid) {
          const res = await request('/api/systemAutoProjectQuestion/addInfo', {
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
    },
    // 查找人员
    async getPersonList() {
      const { data: res } = await request('/api/authority/user/listPlatformTestUserSelect')
      this.personSelectList = res.filter((e) => e.title)
    }
  }
}
</script>

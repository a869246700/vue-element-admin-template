<template>
  <!-- 修改资质表单，当前资质尚未完成，需要对应数据，和具体功能样式。 -->
  <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
    <el-form ref="editFormRef" :model="fieldsValue" :rules="rules" label-width="110px">
      <el-form-item
        v-for="item in formOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        style
      >
        <el-input
          v-if="item.prop === 'user_name'"
          v-model.trim="fieldsValue.user_name"
          size="small"
          placeholder="请输入人员名称"
          style="width: 300px"
        />

        <el-select
          v-if="item.prop === 'new_staff'"
          v-model="fieldsValue.new_staff"
          size="small"
          placeholder="请选择人员类型"
          style="width: 300px"
        >
          <el-option
            v-for="option in staffSelectOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <el-select
          v-if="item.prop === 'type'"
          v-model="fieldsValue.type"
          size="small"
          placeholder="请选择当前资质"
          style="width: 300px"
        >
          <el-option
            v-for="option in staffSelectOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <el-input
          v-if="item.prop === 'explain'"
          v-model.trim="fieldsValue.explain"
          type="textarea"
          size="small"
          rows="3"
          placeholder="请输入修改原因"
          style="width: 300px"
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
      temp: undefined,
      fieldsValue: {},
      rules: {
        user_name: [{ required: true, message: '请输入人员名称', trigger: 'blur' }],
        new_staff: [{ required: true, message: '请选择人员类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择当前资质', trigger: 'change' }],
        explain: [{ required: true, message: '请输入修改原因', trigger: 'blur' }]
      },
      formOptions: [
        {
          label: '人员名称',
          prop: 'user_name'
        },
        {
          label: '人员类型',
          prop: 'new_staff'
        },
        {
          label: '当前资质',
          prop: 'type'
        },
        {
          label: '修改原因',
          prop: 'explain'
        }
      ],
      staffSelectOptions: [
        {
          value: 0,
          label: '老员工'
        },
        {
          value: 1,
          label: '新员工-校招'
        },
        {
          value: 2,
          label: '新员工-社招'
        }
      ]
    }
  },
  methods: {
    setTemp(row) {
      console.log(row)
      this.temp = Object.assign({}, row)
      this.resetField()
      this.handleModalEditPlanVisible()
    },
    resetField() {
      this.fieldsValue = {
        user_name: this.temp.user_name,
        new_staff: this.temp.new_staff,
        type: this.temp.type,
        explain: ''
      }
    },
    handleComfirmClick() {
      this.$refs.editFormRef.validate(async(valid) => {
        if (valid) {
          if (
            this.temp.qualifications === this.fieldsValue.type[1] &&
            this.temp.qualifications_plan === this.fieldsValue.type[0]
          ) {
            this.$message.error('修改失败，您未更改当前资质！')
          }

          const value = {
            id: this.temp.id,
            userName: this.temp.user_name,
            qualifications: this.temp.qualifications,
            updateQualifications: this.fieldsValue.type[1],
            qualificationsPlan: this.temp.qualifications_plan,
            updateQualificationsPlan: this.fieldsValue.type[0],
            targetQualifications: this.temp.target_qualifications,
            relegationStartDate: this.temp.relegation_start_date,
            relegationEndDate: this.temp.relegation_end_date,
            newStaff: this.fieldsValue.new_staff,
            explain: this.fieldsValue.explain
          }

          console.log(value)
        }
      })
    },
    async handleModalEditPlanVisible() {
      const { data: res } = await request('/api/userQualifications/listSelectRulePlan', {
        params: {
          newStaff: this.temp.new_staff
        }
      })
      this.rulePlan = res
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

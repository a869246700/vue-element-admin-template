<template>
  <el-dialog :visible.sync="dialogVisible" title="修改数据" width="65%">
    <el-form ref="editFormRef" :model="temp">
      <table class="box-wrapper" border="0" cellpadding="0" cellspacing="0">
        <tbody>
          <tr class="row">
            <th>客户</th>
            <td>
              <el-form-item prop="customer" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.customer"
                  size="small"
                  placeholder="请输入客户!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>项目名称</th>
            <td>
              <el-form-item prop="project" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.project"
                  size="small"
                  placeholder="请输入项目名称!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>事业部归属</th>
            <td>
              <el-form-item prop="businessDep" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.businessDep"
                  size="small"
                  placeholder="请输入事业部归属!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>是否通过</th>
            <td>
              <el-form-item prop="isPass" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.isPass"
                  size="small"
                  placeholder="请输入是否通过!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>入围计划开始时间</th>
            <td>
              <el-form-item prop="planStartDate" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.planStartDate"
                  size="small"
                  placeholder="请输入入围计划开始时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>入围计划完成时间</th>
            <td>
              <el-form-item prop="planEndDate" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.planEndDate"
                  size="small"
                  placeholder="请输入入围计划完成时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>入围实际开始时间</th>
            <td>
              <el-form-item prop="actualStartDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.actualStartDate"
                  type="date"
                  placeholder="请输入入围实际开始时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>入围实际完成时间</th>
            <td>
              <el-form-item prop="actualEndDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.actualEndDate"
                  type="date"
                  placeholder="请输入入围实际完成时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>技术分排名</th>
            <td>
              <el-form-item prop="ranking" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.ranking"
                  type="date"
                  placeholder="请输入技术分排名!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>金额（亿）</th>
            <td>
              <el-form-item prop="money" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.money"
                  type="date"
                  placeholder="请输入金额（亿）!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>Fail原因</th>
            <td>
              <el-form-item prop="remarks" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.remarks"
                  type="textarea"
                  size="small"
                  placeholder="请输入Fail原因!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>Fail项</th>
            <td>
              <el-form-item prop="failTerm" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.failTerm"
                  type="textarea"
                  size="small"
                  placeholder="请输入Fail项!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>问题内部闭环</th>
            <td>
              <el-form-item prop="questionLoop" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.questionLoop"
                  type="textarea"
                  size="small"
                  placeholder="请输入问题内部闭环!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>备注</th>
            <td colspan="3">
              <el-form-item prop="remarks" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.remarks"
                  type="textarea"
                  size="small"
                  placeholder="请输入备注!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>
        </tbody>
      </table>
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
      temp: {
        project: '',
        customer: '',
        isPass: '',
        businessDep: '',
        planStartDate: '',
        planEndDate: '',
        actualStartDate: '',
        actualEnate: '',
        ranking: '',
        money: '',
        failCause: '',
        failTerm: '',
        questionLoop: '',
        remarks: ''
      }
    }
  },
  methods: {
    setTemp(row) {
      this.dialogVisible = true
      this.temp = {
        id: row.id,
        project: row.project,
        customer: row.customer,
        isPass: row.is_pass,
        businessDep: row.business_dep,
        planStartDate: row.plan_start_date,
        planEndDate: row.plan_end_date,
        actualStartDate: row.actual_start_date,
        actualEndDate: row.actual_end_date,
        ranking: row.ranking,
        money: row.money,
        failCause: row.fail_cause,
        failTerm: row.fail_term,
        questionLoop: row.questionLoop,
        remarks: row.remarksdD
      }
    },
    async handleComfirmClick() {
      try {
        const { data: res } = await request('/api/projectEvolveSta/updatePlatformSelectInfo', {
          method: 'POST',
          data: this.temp
        })

        if (res === 1) {
          this.$message.success('修改成功')
          this.$emit('reload')
        } else {
          this.$message.error('修改失败，请稍候再试或与管理员联系!')
        }

        this.$nextTick(() => {
          this.dialogVisible = false
        })
      } catch (err) {
        this.$nextTick(() => {
          this.dialogVisible = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog {
  overflow: hidden;
}

.box-wrapper {
  border: 1px solid #ddd;

  .row {
    th {
      background-color: #fafafa;
    }

    th,
    td {
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 16px 24px;

      &:nth-last-child(1) {
        border-right: transparent;
      }
    }
  }
}
</style>

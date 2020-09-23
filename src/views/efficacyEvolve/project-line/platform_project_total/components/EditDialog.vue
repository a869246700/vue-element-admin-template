<template>
  <el-dialog :visible.sync="dialogVisible" title="修改数据" width="80%">
    <el-form ref="editFormRef" :model="temp">
      <table class="box-wrapper" border="0" cellpadding="0" cellspacing="0">
        <tbody>
          <tr class="row">
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

            <th>重要关联</th>
            <td>
              <el-form-item prop="relevance" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.relevance"
                  size="small"
                  placeholder="请输入重要关联!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

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
            <th>变更记录</th>
            <td>
              <el-form-item prop="change" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.change"
                  type="textarea"
                  placeholder="请输入变更记录!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>试点兑现</th>
            <td>
              <el-form-item prop="pilotCash" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.pilotCash"
                  type="textarea"
                  placeholder="请输入试点兑现!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>简要原因</th>
            <td>
              <el-form-item prop="cause" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.cause"
                  type="textarea"
                  placeholder="请输入简要原因!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>当前进展</th>
            <td>
              <el-form-item prop="nowEvolve" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.nowEvolve"
                  type="textarea"
                  placeholder="请输入当前进展!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>转内测计划时间</th>
            <td>
              <el-form-item prop="testPlanDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.testPlanDate"
                  type="date"
                  placeholder="请输入转内测计划时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>转内测实际时间</th>
            <td>
              <el-form-item prop="testActualDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.testActualDate"
                  type="date"
                  placeholder="请输入转内测实际时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>试点计划发布时间</th>
            <td>
              <el-form-item prop="pilotPlanDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.pilotPlanDate"
                  type="date"
                  placeholder="请输入试点计划发布时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>试点实际发布时间</th>
            <td>
              <el-form-item prop="pilotActualDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.pilotActualDate"
                  type="date"
                  placeholder="请输入试点实际发布时间!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>代码量</th>
            <td>
              <el-form-item prop="code" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.code"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入代码量!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>整个项目效率</th>
            <td>
              <el-form-item prop="efficiencyProject" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.efficiencyProject"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入整个项目效率!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>本月项目效率</th>
            <td>
              <el-form-item prop="efficiencyMonth" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.efficiencyMonth"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入本月项目效率!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>自动化率</th>
            <td>
              <el-form-item prop="autoRate" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.autoRate"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入自动化率!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>回归周期</th>
            <td>
              <el-form-item prop="regressionPeriod" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.regressionPeriod"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入回归周期!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>覆盖率</th>
            <td>
              <el-form-item prop="coverRate" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.coverRate"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入覆盖率!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>内部质量全周期</th>
            <td>
              <el-form-item prop="qualityTotal" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.qualityTotal"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入内部质量全周期!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>内部质量准入+内测</th>
            <td>
              <el-form-item prop="qualityAdmittanceTest" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.qualityAdmittanceTest"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入内部质量准入+内测!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>内部质量内测</th>
            <td>
              <el-form-item prop="qualityTest" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.qualityTest"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入内部质量内测!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>内部质量遗留占比</th>
            <td>
              <el-form-item prop="qualityRatio" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.qualityRatio"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入内部质量遗留占比!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>事业部遗漏率</th>
            <td>
              <el-form-item prop="businessOmit" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.businessOmit"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入事业部遗漏率!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>内测遗留</th>
            <td>
              <el-form-item prop="testOmit" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.testOmit"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入内测遗留!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>外部故障率</th>
            <td>
              <el-form-item prop="faultRate" style="margin-bottom: 0px;">
                <el-input-number
                  v-model="temp.faultRate"
                  controls-position="right"
                  :min="0"
                  type="date"
                  placeholder="请输入外部故障率!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>PM</th>
            <td>
              <el-form-item prop="pm" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.pm"
                  size="small"
                  placeholder="请输入PM!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>PTM</th>
            <td>
              <el-form-item prop="ptm" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.ptm"
                  size="small"
                  placeholder="请输入PTM!"
                  style="width: 100%"
                />
              </el-form-item>
            </td>

            <th>备注</th>
            <td>
              <el-form-item prop="remarks" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.remarks"
                  type="textarea"
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
        relevance: '',
        customer: '',
        businessDep: '',
        change: '',
        pilotCash: '',
        cause: '',
        nowEvolve: '',
        testPlanDate: '',
        testActualDate: '',
        pilotPlanDate: '',
        pilotActualDate: '',
        code: '',
        efficiencyProject: '',
        efficiencyMonth: '',
        autoRate: '',
        regressionPeriod: '',
        coverRate: '',
        qualityTotal: '',
        qualityAdmittanceTest: '',
        qualityTest: '',
        qualityRatio: '',
        businessOmit: '',
        testOmit: '',
        faultRate: '',
        pm: '',
        ptm: '',
        remarks: ''
      }
    }
  },
  methods: {
    setTemp(row) {
      console.log(row)
      this.dialogVisible = true
      this.temp = {
        project: row.project,
        relevance: row.relevance,
        customer: row.customer,
        businessDep: row.business_dep,
        change: row.change,
        pilotCash: row.pilot_cash,
        cause: row.cause,
        nowEvolve: row.now_evolve,
        testPlanDate: row.test_plan_date,
        testActualDate: row.test_actual_date,
        pilotPlanDate: row.pilot_plan_date,
        pilotActualDate: row.pilot_actual_date,
        code: row.code,
        efficiencyProject: row.efficiency_project,
        efficiencyMonth: row.efficiency_month,
        autoRate: row.auto_rate,
        regressionPeriod: row.regression_period,
        coverRate: row.cover_rate,
        qualityTotal: row.quality_total,
        qualityAdmittanceTest: row.quality_admittance_test,
        qualityTest: row.quality_test,
        qualityRatio: row.quality_ratio,
        businessOmit: row.business_omit,
        testOmit: row.test_omit,
        faultRate: row.fault_rate,
        pm: row.pm,
        ptm: row.ptm,
        remarks: row.remarks
      }
    },
    async handleComfirmClick() {
      try {
        const { data: res } = await request('/api/projectEvolveSta/updatePlatformPromiseInfo', {
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

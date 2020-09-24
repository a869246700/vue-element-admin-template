<template>
  <el-dialog :visible.sync="dialogVisible" title="修改数据" width="65%">
    <el-form ref="editFormRef" :model="temp">
      <table class="box-wrapper" border="0" cellpadding="0" cellspacing="0">
        <tbody>
          <tr class="row">
            <th>项目名称</th>
            <td>
              <el-form-item prop="project" style="margin-bottom: 0px;">
                <el-input v-model.trim="temp.project" size="small" placeholder="请输入项目名称!" />
              </el-form-item>
            </td>

            <th>关联平台版本</th>
            <td>
              <el-form-item prop="version" style="margin-bottom: 0px;">
                <el-input v-model.trim="temp.version" size="small" placeholder="请输入关联平台版本!" />
              </el-form-item>
            </td>

            <th>关联产品</th>
            <td>
              <el-form-item prop="product" style="margin-bottom: 0px;">
                <el-input v-model.trim="temp.product" size="small" placeholder="请输入关联产品!" />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>事业部归属</th>
            <td>
              <el-form-item prop="businessDep" style="margin-bottom: 0px;">
                <el-input v-model.trim="temp.businessDep" size="small" placeholder="请输入事业部归属!" />
              </el-form-item>
            </td>

            <th>兑现情况</th>
            <td>
              <el-form-item prop="situation" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.situation"
                  type="textarea"
                  size="small"
                  placeholder="请输入兑现情况!"
                />
              </el-form-item>
            </td>

            <th>是否平台原因导致</th>
            <td>
              <el-form-item prop="isPlatformCause" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.isPlatformCause"
                  type="textarea"
                  size="small"
                  placeholder="请输入是否平台原因导致!"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>简要原因</th>
            <td>
              <el-form-item prop="briefCause" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.briefCause"
                  type="textarea"
                  size="small"
                  placeholder="请输入简要原因!"
                />
              </el-form-item>
            </td>

            <th>变更记录</th>
            <td>
              <el-form-item prop="change" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.change"
                  type="textarea"
                  size="small"
                  placeholder="请输入变更记录!"
                />
              </el-form-item>
            </td>

            <th>试点发布承诺时间</th>
            <td>
              <el-form-item prop="pilotPlanDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.pilotPlanDate"
                  type="date"
                  placeholder="请输入试点发布承诺时间!"
                />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>试点发布实际时间</th>
            <td>
              <el-form-item prop="pilotActualDate" style="margin-bottom: 0px;">
                <el-date-picker
                  v-model="temp.pilotActualDate"
                  type="date"
                  placeholder="请选择试点发布实际时间!"
                />
              </el-form-item>
            </td>

            <th>备注</th>
            <td>
              <el-form-item prop="remarks" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.remarks"
                  type="textarea"
                  size="small"
                  placeholder="请输入备注!"
                />
              </el-form-item>
            </td>

            <th>TR5</th>
            <td>
              <el-form-item prop="trs" style="margin-bottom: 0px;">
                <el-input v-model.trim="temp.trs" size="small" placeholder="请输入TR5!" />
              </el-form-item>
            </td>
          </tr>

          <tr class="row">
            <th>ADCP</th>
            <td>
              <el-form-item prop="adcp" style="margin-bottom: 0px;">
                <el-input v-model.trim="temp.adcp" size="small" placeholder="请输入ADCP!" />
              </el-form-item>
            </td>

            <th>进展摘要</th>
            <td colspan="3">
              <el-form-item prop="evolve" style="margin-bottom: 0px;">
                <el-input
                  v-model.trim="temp.evolve"
                  type="textarea"
                  size="small"
                  placeholder="请输入进展摘要!"
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
        version: '',
        product: '',
        businessDep: '',
        situation: '',
        isPlatformCause: '',
        briefCause: '',
        change: '',
        pilotPlanDate: '',
        pilotActualDate: '',
        remarks: '',
        trs: '',
        adcp: '',
        evolve: ''
      }
    }
  },
  methods: {
    setTemp(row) {
      this.dialogVisible = true
      this.temp = {
        id: row.id,
        project: row.project,
        version: row.version,
        product: row.product,
        businessDep: row.business_dep,
        situation: row.situation,
        isPlatformCause: row.version,
        briefCause: row.brief_cause,
        change: row.change,
        pilotPlanDate: row.pilot_plan_date,
        pilotActualDate: row.pilot_actual_date,
        remarks: row.remarks,
        trs: row.trs,
        adcp: row.adcp,
        evolve: row.evolve
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

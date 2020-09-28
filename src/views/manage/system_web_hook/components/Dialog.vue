<template>
  <el-dialog :title="statusMap[currentStatus]" :visible.sync="dialogVisible" width="40%">
    <el-form ref="formRef" :model="temp" :rules="rules" label-width="110px">
      <el-form-item prop="urlKey" label="Key" style="margin-left: 20%;">
        <el-input v-model.trim="temp.urlKey" placeholder="请输入企业微信群机器人key！" style="width: 70%" />
      </el-form-item>

      <el-form-item prop="title" label="标题" style="margin-left: 20%;">
        <el-input v-model.trim="temp.title" placeholder="请输入标题(群名或者说明之类的)！" style="width: 70%" />
      </el-form-item>

      <el-form-item prop="isPeriod" label="是否循环发送" style="margin-left: 20%;">
        <el-radio-group v-model="temp.isPeriod">
          <el-radio :label="1">单词</el-radio>
          <el-radio :label="2">循环</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="periodSelectHidden !== 'none'"
        prop="periodType"
        label="发送周期"
        style="margin-left: 20%;"
      >
        <el-radio-group v-model="temp.periodType">
          <el-radio label="天">天</el-radio>
          <el-radio label="周">周</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="periodSelectHidden !== 'none' || weekSelectHidden !== 'none'"
        prop="dateType"
        label="发送星期"
        style="margin-left: 20%;"
      >
        <el-select v-model="temp.dateType" placeholder="请选择发送星期！" style="width: 70%">
          <el-option key="monday" value="1" label="星期一" />
          <el-option key="tuesday" value="2" label="星期二" />
          <el-option key="wednesday" value="3" label="星期三" />
          <el-option key="thursday" value="4" label="星期四" />
          <el-option key="friday" value="5" label="星期五" />
          <el-option key="saturday" value="6" label="星期六" />
          <el-option key="sunday" value="7" label="星期天" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="periodSelectHidden === 'none'" prop="nextDate" label="发送日期" style="margin-left: 20%;">
        <el-date-picker
          v-model="temp.nextDate"
          type="date"
          placeholder="请输入发送日期！"
          style="width: 70%"
        />
      </el-form-item>

      <el-form-item prop="hourNum" label="发送小时" style="margin-left: 20%;">
        <el-time-select
          v-model="temp.hourNum"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:00'
          }"
          placeholder="请输入发送小时！"
          style="width: 70%"
        />
      </el-form-item>

      <el-form-item prop="content" label="发送内容" style="margin-left: 20%;">
        <el-input
          v-model.trim="temp.content"
          type="textarea"
          :rows="4"
          placeholder="请输入发送内容！"
          style="width: 70%"
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
export default {
  data() {
    return {
      dialogVisible: false,
      temp: {
        urlKey: '',
        title: '',
        isPeriod: '',
        periodType: '',
        dateType: '',
        nextDate: '',
        hourNum: '',
        content: ''
      },
      rules: {},
      weekSelectHidden: '',
      periodSelectHidden: '',
      currentStatus: 'edit',
      statusMap: {
        edit: '修改企业微信机器人信息',
        create: '新增企业微信机器人信息'
      }
    }
  },
  methods: {
    // 编辑按钮
    edit(row) {
      this.currentStatus = 'edit'
      this.isWeekOnChange(row.period_type)
      this.isPeriodOnChange(row.is_period)
      this.temp = {
        urlKey: row.url_key,
        title: row.title,
        isPeriod: row.is_period,
        periodType: row.period_type,
        dateType: row.date_type === undefined ? '1' : row.date_type,
        nextDate: row.next_date,
        hourNum: row.hour_num,
        content: row.content
      }
      console.log(this.weekSelectHidden, this.periodSelectHidden)

      this.dialogVisible = true
    },
    // 新增按钮
    create() {
      this.currentStatus = 'create'
      this.isWeekOnChange()
      this.isPeriodOnChange()
      console.log(this.weekSelectHidden, this.periodSelectHidden)

      this.resetTemp()
      this.dialogVisible = true
    },
    resetTemp() {
      this.temp = {
        urlKey: '',
        title: '',
        isPeriod: 1,
        periodType: '天',
        dateType: '1',
        nextDate: new Date(),
        hourNum: new Date().getHours() + 1 + ':00',
        content: ''
      }
    },
    handleComfirmClick() {
      console.log(this.temp)
    },
    isWeekOnChange(value) {
      this.weekSelectHidden = value === '周' ? false : 'none'
    },
    isPeriodOnChange(value) {
      this.periodSelectHidden = value === 2 ? false : 'none'
    }
  }
}
</script>

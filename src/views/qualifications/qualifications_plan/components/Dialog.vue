<template>
  <el-dialog :title="textMap[currentStatus]" :visible.sync="dialogVisible" width="40%">
    <el-form ref="formRef" :model="temp" label-width="100px" style="margin: 0 150px;">
      <el-form-item
        v-for="(item, index) in formOptions"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <el-select
          v-if="item.prop === 'userName'"
          v-model="temp.userName"
          filterable
          size="small"
          :disabled="currentStatus === 'edit'"
          :placeholder="item.ph"
          style="width: 250px;"
        >
          <el-option
            v-for="(option, index) in qualifications_man"
            :key="index"
            :value="option.value"
            :label="option.title"
          />
        </el-select>

        <el-cascader
          v-else-if="item.prop === 'realmType' && currentStatus === 'create'"
          v-model="temp.realmType"
          :options="treeRealm"
          style="width: 250px;"
          :placeholder="item.ph"
        />

        <el-input
          v-else-if="item.prop === 'realmType' && currentStatus === 'edit'"
          v-model="temp.realmType"
          size="small"
          disabled
          style="width: 250px;"
        />

        <div v-else-if="item.prop === 'planNum'">
          <el-input-number
            v-model.number="temp.planNum"
            controls-position="right"
            :min="1"
            :max="5"
            size="small"
            :placeholder="item.ph"
            style="width: 250px;"
          />
        </div>

        <el-date-picker
          v-else
          v-model="temp.realm"
          type="month"
          size="small"
          :placeholder="item.ph"
          style="width: 250px;"
        />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from '@/services/request'

export default {
  data() {
    return {
      dialogVisible: false,
      textMap: {
        create: '添加',
        edit: '编辑'
      },
      currentStatus: 'create',
      temp: {
        userName: undefined,
        realmType: undefined,
        planNum: undefined,
        realm: undefined
      },
      formOptions: [
        {
          label: '人员姓名',
          prop: 'userName',
          ph: '请输入人员姓名！'
        },
        {
          label: '类型选择',
          prop: 'realmType',
          ph: '请选择类型！'
        },
        {
          label: '计划等级',
          prop: 'planNum',
          ph: '请输入计划等级！'
        },
        {
          label: '计划达成日期',
          prop: 'year',
          ph: '请输入计划达成日期！'
        }
      ],
      rules: {},
      treeRealm: undefined,
      qualifications_man: undefined
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.queryTreeRealm()
      this.getPersonSelect()
    },
    resetTemp() {
      this.temp = {
        userName: undefined,
        realmType: undefined,
        realm: undefined,
        planNum: undefined
      }
    },
    handleConfirmClick() {
      if (this.currentStatus === 'create') {
        this.createData()
      } else {
        this.editData()
      }
    },
    edit(row) {
      this.dialogVisible = true
      this.currentStatus = 'edit'
      this.temp = {
        userName: row.user_name,
        nowNum: row.now_num,
        realmType: row.realm + ',' + row.realm_type,
        planNum: row.plan_num,
        realm: new Date(row.year + '-' + row.month)
      }
      this.edit
    },
    editData() {
      this.$refs.formRef.validate(async(valid) => {
        if (valid) {
          const { data: res } = await request('/api/userQualificationsPlan/update', {
            method: 'POST',
            data: this.temp
          })

          if (res === 1) {
            this.$message.success('修改成功')
            this.$emit('reload')
          } else {
            this.$message.error('修改失败，请稍候再试或与管理员联系！')
          }

          this.$nextTick(() => {
            this.dialogVisible = false
          })
        }
      })
    },
    create() {
      this.dialogVisible = true
      this.resetTemp()
      this.currentStatus = 'create'
    },
    createData() {
      this.$refs.formRef.validate(async(valid) => {
        if (valid) {
          const values = {
            userName: this.temp.userName,
            realmType: this.temp.realmType[0] + ',' + this.temp.realmType[1],
            planNum: this.temp.planNum,
            reaml: this.temp.realm
          }

          const { data: res } = await request('/api/userQualificationsPlan/add', {
            method: 'POST',
            data: values
          })

          if (res === 1) {
            this.$message.success('添加成功')
            this.$emit('reload')
          } else if (res === 3) {
            this.$message.error(
              `该人员已添加【${this.temp.realmType[0]}-${this.temp.realmType[1]}】类型，请勿重复添加！`
            )
          } else {
            this.$message.error('添加失败，请稍候再试或与管理员联系')
          }

          this.$nextTick(() => {
            this.dialogVisible = false
          })
        }
      })
    },
    async queryTreeRealm() {
      const { data: res } = await request('/api/userQualifications/listRealmSelect')
      this.treeRealm = res
    },
    async getPersonSelect() {
      const { data: res } = await request('/api/userQualifications/listPersonSelect')
      this.qualifications_man = res
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

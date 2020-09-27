<template>
  <el-dialog title="新增人员权限信息" :visible.sync="dialogVisible" width="40%">
    <el-form ref="formRef" :model="temp" :rules="rules" label-width="110px">
      <el-form-item prop="personId" label="人员工号/姓名" style="margin-left: 20%;">
        <el-select
          v-model="temp.personId"
          filterable
          clearable
          placeholder="请选择人员工号/姓名!"
          style="width: 70%"
        >
          <el-option
            v-for="(item, index) in userList"
            :key="index"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="roleId" label="角色选择" style="margin-left: 20%;">
        <el-select
          v-model="temp.roleId"
          filterable
          clearable
          placeholder="请选择角色选择!"
          style="width: 70%"
        >
          <el-option
            v-for="(item, index) in authorityList"
            :key="index"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
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
      userList: [], // 路由位置列表
      authorityList: [], // 权限选择列表
      temp: {
        personId: undefined,
        roleId: undefined
      },
      rules: {
        personId: [{ required: true, message: '请选择人员工号/姓名!', trigger: 'change' }],
        roleId: [{ required: true, message: '请选择角色选择!', trigger: 'change' }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getUserSelect()
      this.getRoleSelect()
    },
    resetTemp() {
      this.temp = {
        personId: undefined,
        roleId: undefined
      }

      this.$nextTick(() => {
        this.$refs.formRef.clearValidate()
      })
    },
    handleComfirmClick() {
      this.$refs.formRef.validate(async(valid) => {
        if (valid) {
          try {
            // 验证是否重复添加
            const { data: res } = await request('/api/authority/roleMan/queryRoleManRepeat', {
              method: 'POST',
              data: this.temp
            })

            if (res === 1) {
              this.$message.error('人员权限信息已存在，请勿重复添加!')
              return
            } else if (res === 2) {
              this.$message.error('人员权限信息添加失败，请再次尝试或者联系管理员')
              return
            }

            const { data: res2 } = await request('/api/authority/roleMan/add', {
              method: 'POST',
              data: this.temp
            })

            if (res2) {
              this.$message.success('添加成功')
              this.$emit('reload')
            } else {
              this.$message.error('人员权限信息添加失败，请再次尝试或者联系管理员')
            }
          } catch (e) {
            this.$message.error('角色信息添加失败，请再次尝试或者联系管理员！')
          }

          this.$nextTick(() => {
            this.dialogVisible = false
          })
        }
      })
    },
    async getRoleSelect() {
      const { data: res } = await request('/api/authority/role/listRoleSelect')
      this.authorityList = res
    },
    async getUserSelect() {
      const { data: res } = await request('/api/authority/user/listUserSelect')
      this.userList = res
    }
  }
}
</script>

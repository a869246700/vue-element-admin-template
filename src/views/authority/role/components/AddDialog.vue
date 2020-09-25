<template>
  <el-dialog title="新增角色信息" :visible.sync="dialogVisible" width="40%">
    <el-form ref="formRef" :model="temp" :rules="rules" label-width="110px">
      <el-form-item prop="roleCn" label="角色名称" style="margin-left: 20%;">
        <el-input v-model.trim="temp.roleCn" style="width: 70%" />
      </el-form-item>
      <el-form-item prop="roleEn" label="角色英文名称" style="margin-left: 20%;">
        <el-input v-model.trim="temp.roleEn" style="width: 70%" />
      </el-form-item>
      <el-form-item prop="routerSelectedList" label="路由选择" style="margin-left: 20%;">
        <el-cascader
          v-model="temp.routerSelectedList"
          :options="routerList"
          :props="props"
          :show-all-levels="false"
          style="width: 70%"
          @change="handleCheckChange"
        />
        <!-- <el-cascader
          :options="temp.routerSelectedList"
          :props="props"
          :show-all-levels="false"
          :filter-method="handleFilterNodes"
          filterable
          style="width: 70%"
          @change="handleCheckChange"
        />-->
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
      routerList: [],
      props: { multiple: true, label: 'title' },
      temp: {
        roleCn: undefined,
        roleEn: undefined,
        routerSelectedList: [],
        routerId: []
      },
      rules: {
        roleCn: [{ required: true, message: '请输入角色名称!', trigger: 'blur' }],
        roleEn: [{ required: true, message: '请输入角色英文名称!', trigger: 'blur' }],
        routerId: [{ required: true, message: '请选择路由!', trigger: 'change' }],
        routerSelectedList: [{ required: true, message: '请选择路由!', trigger: 'change' }]
      }
    }
  },
  created() {
    this.loadRouterList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        roleCn: undefined,
        roleEn: undefined,
        routerSelectedList: [],
        routerId: []
      }
    },
    handleFilterNodes(node, keyword) {
      if (node.text.includes(keyword)) {
        return true
      }
    },
    handleCheckChange(e) {
      const list = []
      if (e && e.length !== 0) {
        e.forEach((item) => {
          list.push(item[item.length - 1])
        })
      }
      this.temp.routerId = list
    },
    handleComfirmClick() {
      this.$refs.formRef.validate(async(valid) => {
        if (valid) {
          const params = {
            roleCn: this.temp.roleCn,
            roleEn: this.temp.roleEn,
            routerId: this.temp.routerId
          }
          const { data: res } = await request('/api/authority/role/add', {
            method: 'POST',
            data: params
          })
          if (res === 1) {
            this.$message.success('添加成功')
            this.$emit('reload')
          } else {
            this.$message.error('角色信息添加失败，请再次尝试或者联系管理员！')
          }

          this.$nextTick(() => {
            this.dialogVisible = false
          })
        }
      })
    },
    async loadRouterList() {
      const values = {}
      const { data: res } = await request('/api/router/listTreeSelect', {
        method: 'POST',
        data: values
      })
      this.routerList = res
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

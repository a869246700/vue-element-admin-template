<template>
  <el-dialog title="新增路由信息" :visible.sync="dialogVisible" width="40%">
    <el-form ref="formRef" :model="temp" :rules="rules" label-width="110px">
      <el-form-item prop="name" label="路由名称" style="margin-left: 20%;">
        <el-input v-model.trim="temp.name" placeholder="请输入路由名称!" style="width: 70%" />
      </el-form-item>
      <el-form-item prop="path" label="路由路径" style="margin-left: 20%;">
        <el-input v-model.trim="temp.path" placeholder="请输入路由路径!" style="width: 70%" />
      </el-form-item>
      <el-form-item prop="parentId" label="路由位置" style="margin-left: 20%;">
        <el-cascader
          v-model="temp.parentId"
          :options="routerList"
          :props="props"
          :show-all-levels="false"
          style="width: 70%"
          placeholder="请选择路由!"
        />
      </el-form-item>
      <el-form-item prop="def" label="权限选择" style="margin-left: 20%;">
        <el-select v-model="temp.def" filterable clearable placeholder="请选择权限!" style="width: 70%">
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
      routerList: [], // 路由位置列表
      authorityList: [], // 权限选择列表
      props: { label: 'title', checkStrictly: true },
      temp: {
        name: undefined,
        path: undefined,
        def: undefined,
        parentId: undefined
      },
      rules: {
        name: [{ required: true, message: '请输入路由名称!', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路由路径!', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择路由!', trigger: 'change' }],
        def: [{ required: true, message: '请选择权限!', trigger: 'change' }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadRouterList()
      this.getRoleSelect()
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        path: undefined,
        def: undefined,
        parentId: undefined
      }

      this.$nextTick(() => {
        this.$refs.formRef.clearValidate()
      })
    },
    handleComfirmClick() {
      this.$refs.formRef.validate(async(valid) => {
        if (valid) {
          const params = {
            name: this.temp.name,
            path: this.temp.path,
            def: this.temp.def,
            parentId: this.temp.parentId[this.temp.parentId.length - 1]
          }

          try {
            const { data: res } = await request('/api/router/addRouter', {
              method: 'POST',
              data: params
            })
            if (res === 1) {
              this.$message.success('添加成功')
              this.$emit('reload')
            } else {
              this.$message.error('角色信息添加失败，请再次尝试或者联系管理员！')
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
    async loadRouterList() {
      const { data: res } = await request('/api/router/listSelect')
      this.routerList = res
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

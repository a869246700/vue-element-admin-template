<template>
  <el-dialog title="新增系统意见" :visible.sync="dialogVisible" width="50%">
    <el-form
      ref="addFormRef"
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="110px"
      style="width: 60%; margin: 0 auto;"
    >
      <el-form-item label="意见类型：" prop="type">
        <el-select v-model="temp.type" placeholder="请选择意见类型!" style="width: 100%;">
          <el-option
            v-for="item in opinionOptions"
            :key="item.prop"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="关联菜单：" prop="routerId">
        <el-cascader
          ref="cascaderRef"
          v-model="temp.routerId"
          :options="routerList"
          :props="{ checkStrictly: true, label: 'title' }"
          :show-all-levels="false"
          placeholder
          style="width: 100%;"
          @change="handleRouterIdChange"
        />
      </el-form-item>

      <el-form-item label="意见标题：" prop="title">
        <el-input v-model.trim="temp.title" style="width: 100%;" placeholder="请输入意见标题" />
      </el-form-item>

      <el-form-item label="意见内容：" prop="content">
        <el-input
          v-model.trim="temp.content"
          :rows="4"
          type="textarea"
          placeholder="请输入意见内容"
          style="width: 100%;"
        />
      </el-form-item>

      <el-form-item label="是否公开：" prop="isOpen">
        <el-radio-group v-model="temp.isOpen">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
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
      rules: {
        type: [{ required: true, message: '请选择意见类型', trigger: 'change' }],
        title: [{ required: true, message: '请填写意见标题', trigger: 'blur' }],
        content: [{ required: true, message: '请填写意见内容', trigger: 'blur' }],
        isOpen: [{ required: true, message: '请选择是否公开', trigger: 'change' }]
      }, // 规则
      routerList: undefined,
      temp: {
        type: undefined,
        routerId: undefined,
        title: undefined,
        content: undefined,
        isOpen: '0'
      },
      opinionOptions: [
        {
          label: '布局样式',
          key: 'style',
          value: '布局样式'
        },
        {
          label: '页面操作',
          key: '页面操作',
          value: 'page'
        },
        {
          label: '数据准确',
          key: 'data',
          value: '数据准确'
        },
        {
          label: '缺少内容',
          key: 'content',
          value: '缺少内容'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getRouterSelect()
    },
    handleRouterIdChange() {
      console.log(this.$refs.cascaderRef.dropDownVisible = false)
    },
    handleComfirmClick() {
      this.$refs.addFormRef.validate(async(valid) => {
        if (valid) {
          const length = this.temp.routerId.length
          // 取倒一个
          this.temp.routerId = this.temp.routerId[length - 1]
          const res = await request('/api/systemFeedbackInfo/add', {
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
    resetTemp() {
      this.temp = {
        type: undefined,
        routerId: undefined,
        title: undefined,
        content: undefined,
        isOpen: '0'
      }
    },
    async getRouterSelect() {
      const { data: res } = await request('/api/router/listHelpTreeSelect', {
        method: 'POST',
        data: {}
      })
      this.routerList = res
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>

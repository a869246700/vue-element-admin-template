<template>
  <div class="project-longest-path">
    <!-- 甘特图 -->
    <gantt :tasks="dataSource" @edit="handleEditClick" />

    <!-- 添加对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataFormRef"
        :model="temp"
        label-position="right"
        label-width="110px"
        style="width: 60%; margin: 0 auto;"
      >
        <el-form-item label="名字" prop="technical_issues">
          <el-input v-model.trim="temp.text" placeholder="请输入名字" readonly style="width: 100%" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Gantt from '@/components/Gantt/index'

export default {
  components: {
    Gantt
  },
  data() {
    return {
      key: 0,
      dataSource: {
        data: [
          {
            id: 1,
            text: '测试1',
            start_date: '15-04-2020',
            personName: '张总',
            duration: 18,
            progress: 0.6
          },
          {
            id: 2,
            text: '测试2',
            start_date: '18-04-2020',
            personName: '李总',
            duration: 23,
            progress: 0.4
          },
          {
            id: 3,
            text: '测试2-1',
            start_date: '20-04-2020',
            personName: '赵总',
            duration: 22,
            progress: 0.4,
            parent: 2
          },
          {
            id: 4,
            text: '测试2-1',
            start_date: '22-04-2020',
            personName: '王总',
            duration: 20,
            progress: 0.4,
            parent: 2
          }
        ],
        link: [{ id: 1, source: 1, target: 2, type: '0' }]
      },
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '', // 当前 添加和修改对话框 的类型
      dialogFormVisible: false, // 控制添加和修改对话框的显示与隐藏
      temp: {
        id: undefined,
        text: undefined,
        start_date: undefined,
        personName: undefined,
        duration: undefined,
        progress: undefined
      }
    }
  },
  methods: {
    handleEditClick(id) {
      const row = this.dataSource.data.find((e) => e.id === parseInt(id))
      console.log(row)
      this.temp = Object.assign({}, row)
      // 显示编辑框
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // 清除原有的校验内容
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate()
      })
    },
    createData() {},
    updateData() {
      console.log()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

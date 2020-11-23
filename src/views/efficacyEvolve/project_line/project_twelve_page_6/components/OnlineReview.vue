<template>
  <!-- 资质审查 -->
  <card title="报备" class="qualification-review">
    <template #buttons>
      <el-button type="primary" size="small">导出报备设备</el-button>
      <el-button type="primary" size="small">下载导入模板</el-button>
      <el-button size="small" icon="el-icon-download">导入报备数据</el-button>
    </template>

    <!-- 操作栏 -->
    <el-form ref="formRef" :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="部门" prop="dept">
        <el-input
          v-model.trim="listQuery.dept"
          size="small"
          placeholder="请输入部门"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="专业组" prop="groupName">
        <el-input
          v-model.trim="listQuery.groupName"
          size="small"
          placeholder="请输入专业组"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="人员姓名" prop="userName">
        <el-input
          v-model.trim="listQuery.userName"
          size="small"
          placeholder="请输入人员姓名"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
        <el-button @click="handleResetClick">重置</el-button>
      </el-form-item>
    </el-form>

    <my-table v-loading="tableLoading" :table-data="list" :options="options" />
  </card>
</template>

<script>
import MyTable from '@/components/Table'
import Card from '@/components/Card'

import request from '@/services/request'

export default {
  components: {
    MyTable,
    Card
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listQuery: {
        groupName: '',
        userName: '',
        dept: ''
      },
      tableLoading: false,
      list: [],
      options: [
        {
          title: '人员姓名',
          dataIndex: 'user_name',
          key: 'user_name',
          width: 50
        },
        {
          title: '部门',
          dataIndex: 'department',
          key: 'department',
          width: 50
        },
        {
          title: '专业组',
          dataIndex: 'group_name',
          key: 'group_name',
          width: 50
        },
        {
          title: '评审-需求类',
          dataIndex: 'demand',
          key: 'demand',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return <div>-</div>
            }
            return <div>{text}</div>
          }
        },
        {
          title: '评审-设计类',
          dataIndex: 'design',
          key: 'design',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return <div>-</div>
            }
            return <div>{text}</div>
          }
        },
        {
          title: 'STP设计',
          dataIndex: 'stp',
          key: 'stp',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return <div>-</div>
            }
            return <div>{text}</div>
          }
        },
        {
          title: 'TP设计',
          dataIndex: 'tp',
          key: 'tp',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return <div>-</div>
            }
            return <div>{text}</div>
          }
        },
        {
          title: '手工执行',
          dataIndex: 'exe',
          key: 'exe',
          width: 50,
          render: (text, record) => {
            if (text === undefined || text === '') {
              return <div>-</div>
            }
            return <div>{text}</div>
          }
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    handleQueryClick() {
      this.getList()
      console.log(this.listQuery)
    },
    handleResetClick() {
      this.$refs.formRef.resetFields()
    },
    async getList() {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/querByQualificationsRemarksList', {
        method: 'GET',
        params: {
          ...this.listQuery,
          project: this.project
        }
      })
      this.list = res
      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.qualification-review ::v-deep .el-form-item {
  margin-left: 20px;
}
</style>

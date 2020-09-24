<template>
  <div class="user-total-qualified">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>部门：</span>
        <el-input
          v-model.trim="listQuery.dept"
          size="small"
          style="width: 150px;"
          placeholder="请输入部门"
        />
      </el-col>

      <el-col :span="6">
        <span>专业组：</span>
        <el-input
          v-model.trim="listQuery.groupName"
          size="small"
          style="width: 150px;"
          placeholder="请输入专业组"
        />
      </el-col>

      <el-col :span="6">
        <span>人员名称：</span>
        <el-input
          v-model.trim="listQuery.userName"
          size="small"
          style="width: 150px;"
          placeholder="请输入人员名称"
        />
      </el-col>

      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <el-popover placement="right-start" trigger="click">
          <div>
            <p>审查要求：</p>
            <p>1.需求评审：需要资质【模块设计一级】以上</p>
            <p>2.设计评审：需要资质【模块设计二级】以上</p>
            <p>3.TP：需要资质【模块设计二级】以上</p>
            <p>4.STP：需要资质【系统设计二级】以上</p>
            <p>5.bug：需通过【项目的准入考试】</p>
            <p>6.自动化：需要通过【RF自动化技能域5级考试】和【RF自动化规范考试】</p>
            <br>
            <p>不满足资质或考试未达成的处理情况：</p>
            <p>1.资质不满足：根据最新资质标准提升资质</p>
            <p>2.bug：</p>
            <p>&nbsp;&nbsp;需参加项目的准入考试，在12.x项目准入前会启动考试，参加通过考试后，后续项目无特殊情况可继承上一个项目的考试结果，不用再参加考试；</p>
            <p>&nbsp;&nbsp;下一个最新的可参加考试的项目为12.5PL1。有需要请联系PTTL报备，统一参加考试。</p>
            <p>3.自动化：</p>
            <p>&nbsp;&nbsp;RF自动化技能域5级考试找刘小艳报名参加研究院统一考试；</p>
            <p>
              &nbsp;&nbsp;RF自动化规范考试，需要先学习后直接考试，考试地址为：
              <a
                href="http://learning.ruijie.com.cn/course/detail.aspx?id=16363"
                target="_blank"
                style="color: #1895ff;"
              >http://learning.ruijie.com.cn/course/detail.aspx?id=16363</a>
            </p>
          </div>
          <el-button
            slot="reference"
            size="mini"
            style="font-size: 20px;"
            icon="el-icon-bell"
            circle
          />
        </el-popover>
      </div>

      <el-table
        v-loading="tableLoading"
        :data="showList"
        highlight-current-row
        border
        :header-cell-style="{ background: '#F5F7FA' }"
        style="width: 100%;"
      >
        <el-table-column
          v-for="item in tableOptions"
          :key="item.dataIndex"
          :label="item.title"
          :prop="item.key"
          :min-width="item.width"
          :fixed="item.fixed"
          :show-overflow-tooltip="item.sot"
        />
      </el-table>
    </el-card>

    <div v-if="total > pageInfo.pageSize" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableLoading: false,
      total: 0,
      list: [],
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      },
      listQuery: {
        dept: undefined,
        groupName: undefined,
        userName: undefined
      },
      tableOptions: [
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
          width: 80
        },
        {
          title: '专业组',
          dataIndex: 'group_name',
          key: 'group_name',
          width: 80
        },
        {
          title: '资质',
          dataIndex: 'qualifications',
          key: 'qualifications',
          width: 80
        },
        {
          title: '需求评审',
          dataIndex: 'demend_qualified',
          key: 'demend_qualified',
          width: 60
        },
        {
          title: '设计评审',
          dataIndex: 'design_qualified',
          key: 'design_qualified',
          width: 60
        },
        {
          title: 'TP',
          dataIndex: 'tp_qualified',
          key: 'tp_qualified',
          width: 60
        },
        {
          title: 'STP',
          dataIndex: 'stp_qualified',
          key: 'stp_qualified',
          width: 60
        },
        {
          title: 'BUG',
          dataIndex: 'bug_qualified',
          key: 'bug_qualified',
          width: 80
        },
        {
          title: '自动化',
          dataIndex: 'auto_qualified',
          key: 'auto_qualified',
          width: 80
        }
      ]
    }
  },
  computed: {
    showList() {
      const page = this.pageInfo.pageNum
      const limit = this.pageInfo.pageSize
      return this.list.slice((page - 1) * limit, page * limit)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList('', '', '')
    },
    resetListQuery() {
      this.listQuery = {
        dept: '',
        groupName: '',
        userName: ''
      }
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
    },
    handleResetClick() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10
      this.resetListQuery()
      this.getList('', '', '')
    },
    handleQueryClick() {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10
      const { dept, groupName, userName } = this.listQuery
      this.getList(dept, groupName, userName)
    },
    async getList(dept, groupName, userName) {
      this.tableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/queryByUserNowQualifiedInfo', {
        params: {
          dept,
          groupName,
          userName
        }
      })
      this.list = res
      this.total = res.length

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-total-qualified {
  padding: 20px;
  font-size: 14px;

  .el-row .el-col {
    display: flex;
    align-items: center;

    span {
      // 不换行
      white-space: nowrap;
      margin-right: 8px;
    }
  }
}
</style>


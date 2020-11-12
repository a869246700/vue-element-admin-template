<template>
  <el-card id="qualifications-rule-major-define">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>域名：</span>
        <el-input
          v-model.trim="listQuery.realmName"
          :disabled="deptDisabled"
          placeholder="请输入域名"
          size="small"
          class="operation-input"
        />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" @click="handleResetClick">重置</el-button>
      </el-col>
    </el-row>

    <div class="upload-desc">
      <el-upload
        class="upload-demo"
        action="api/userQualificationsRuleMajorDefine/import"
        :with-credentials="true"
        multiple
        :file-list="fileList"
        :on-error="handleErrorUpload"
      >
        <el-button size="small" type="primary" icon="el-icon-upload2">点击上传</el-button>
      </el-upload>

      <div style="margin-top: 20px">导入数据请按照下表列顺序创建表格，目前仅支持xlsx和xls格式导入！</div>
    </div>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{ background: '#f6f6f6', whiteSapce: 'normal' }"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
        :align="item.align"
      >
        <template #header>
          <div style="white-space: normal;">{{ item.title }}</div>
        </template>
        <template slot-scope="{row}">
          <div style="white-space: normal;">{{ row[item.dataIndex] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="total >= pageInfo.pageSize" class="pagination">
      <pagination
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import request from '@/services/request'
import { doQualificationsRuleMajorDefine } from '@/services/qualifications/qualifications'

export default {
  name: 'UserRealmExamInfo',
  components: { Pagination },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      list: [],
      total: 0,
      tableLoading: false,
      fileList: [],
      listQuery: {
        realmName: null
      },
      businessDisabled: false,
      deptDisabled: false,
      tableOptions: [
        {
          title: '专业域名称',
          dataIndex: 'realm_name',
          key: 'realm_name',
          width: 80
        },
        {
          title: '范围一级拆解',
          dataIndex: 'scope_one_disassemble',
          key: 'scope_one_disassemble',
          width: 100
        },
        {
          title: '范围二级拆解',
          dataIndex: 'scope_two_disassemble',
          key: 'scope_two_disassemble',
          width: 100
        },
        {
          title: '范围三级拆解',
          dataIndex: 'scope_three_disassemble',
          key: 'scope_three_disassemble',
          width: 100
        },
        {
          title: '知识点刷新时间',
          dataIndex: 'refresh_time',
          key: 'refresh_time',
          width: 100
        },
        {
          title: '是否为专业域5级考试内容',
          dataIndex: 'five_exam_content',
          key: 'five_exam_content',
          width: 100
        },
        {
          title: '是否为专业域4级考试内容',
          dataIndex: 'four_exam_content',
          key: 'four_exam_content',
          width: 100
        },
        {
          title: '是否为专业域3级答辩内容',
          dataIndex: 'three_reply_content',
          key: 'three_reply_content',
          width: 100
        },
        {
          title: '是否为专业域2级答辩内容',
          dataIndex: 'two_reply_content',
          key: 'two_reply_content',
          width: 100
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadList()
      this.queryIsShow()
    },
    handleErrorUpload(error, file, fileList) {
      try {
        this.fileList.push(file)
      } catch (err) {
        console.log(error)
      }
    },
    handleQueryClick() {
      this.resetPageInfo()
      this.queryList()
      this.queryIsShow()
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        realmName: null
      }
      this.init()
    },
    resetPageInfo() {
      this.pageInfo = {
        orderBy: null,
        pageSize: 10,
        pageNum: 1
      }
    },
    handlePageUpdate(e) {
      // 1. 修改分段器配置
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit

      this.queryList()
    },
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doQualificationsRuleMajorDefine(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsRuleMajorDefine(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async queryIsShow() {
      const { data: res } = await request('/api/userQualificationsAuthority/infoQueryIsShow', {
        method: 'POST'
      })
      this.businessDisabled = res.business
      this.deptDisabled = res.dept
    }
  }
}
</script>

<style lang="scss" scoped>
#qualifications-rule-major-define {
  margin: 20px;

  .upload-desc {
    margin-top: 20px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }

  .el-col {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    span {
      font-size: 14px;
    }

    .operation-input {
      flex: 1;
      margin-right: 20px;
    }
  }
}

.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  border-radius: 50%;
}
</style>

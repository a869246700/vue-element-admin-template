<template>
  <el-card id="qualifications-realm-reach">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>事业部：</span>
        <el-select
          v-model="listQuery.business"
          :disabled="businessDisabled"
          size="small"
          class="operation-input"
        >
          <el-option
            v-for="option in business"
            :key="option.key"
            :value="option.value"
            :label="option.label"
          >
            <div class="flex">
              <span
                class="dot"
                :style="{ background: option.key !== 'all' ? '#52c41a' : '#1895ff' }"
              />
              <span>{{ option.label }}</span>
            </div>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>部门：</span>
        <el-input
          v-model.trim="listQuery.dept"
          :disabled="deptDisabled"
          placeholder="请输入部门"
          size="small"
          class="operation-input"
        />
      </el-col>
      <el-col :span="6">
        <span>人员名称：</span>
        <el-input
          v-model.trim="listQuery.userName"
          placeholder="请输入人员名称"
          size="small"
          class="operation-input"
        />
      </el-col>
      <el-col :span="6">
        <span>域名：</span>
        <el-input
          v-model.trim="listQuery.realmName"
          placeholder="请输入域名"
          size="small"
          class="operation-input"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px;">
      <el-col :span="6">
        <span style="word-space: nowrap;">是否通过：</span>
        <el-select
          v-model="listQuery.isReach"
          :disabled="businessDisabled"
          size="small"
          class="operation-input"
        >
          <el-option
            v-for="option in reach"
            :key="option.key"
            :value="option.value"
            :label="option.label"
          >
            <div class="flex">
              <span
                class="dot"
                :style="{ background: option.key !== 'all' ? '#52c41a' : '#1895ff' }"
              />
              <span>{{ option.label }}</span>
            </div>
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
        <el-button size="small" style="margin-right: 10px;" @click="handleResetClick">重置</el-button>
        <el-upload
          v-loading="uploadLoading"
          action="http://172.30.61.89:882/api/userQualificationsRealmReach/import"
          :show-file-list="false"
          :limit="1"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccessUpload"
          :with-credentials="true"
          :file-list="fileList"
        >
          <el-button size="small" icon="el-icon-upload2" type="primary">导入数据</el-button>
        </el-upload>
      </el-col>
    </el-row>

    <div class="upload-desc">导入数据请按照下表列顺序创建表格，目前仅支持xlsx和xls格式导入！excel日期格式请选择文本格式，格式为YYYY-MM-DD，等级请填写为数字！导入的域名，请在资质规则定义中查看技能域和专业域定义，没有的域名是统计不到的！</div>

    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        :show-overflow-tooltip="item.prop !== 'action'"
      >
        <template slot-scope="{row}">
          <div v-if="item.prop === 'action' && row.is_reach === 0">
            <el-popconfirm title="您确定删除该域等级达成?" @onConfirm="handleDeleteClick(row)">
              <el-button slot="reference" type="danger" size="small" style="margin-right: 10px;">删除</el-button>
            </el-popconfirm>
            <el-popconfirm title="您确定通过该域等级达成?" @onConfirm="handleReachClick(row, 1)">
              <el-button slot="reference" type="success" size="small">通过</el-button>
            </el-popconfirm>
          </div>

          <div v-if="item.prop === 'action' && row.is_reach !== 0">
            <el-popconfirm title="您确定删除该域等级达成?" @onConfirm="handleDeleteClick(row)">
              <el-button slot="reference" type="danger" size="small" style="margin-right: 10px;">删除</el-button>
            </el-popconfirm>
            <el-popconfirm title="您确定退回该域等级达成?" @onConfirm="handleReachClick(row, 0)">
              <el-button slot="reference" type="warning" size="small">退回</el-button>
            </el-popconfirm>
          </div>
          <div v-else style="white-space: normal;">{{ row[item.prop] }}</div>
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
import { doQualificationsRealmReach } from '@/services/qualifications/qualifications'

export default {
  components: {
    Pagination
  },
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
      listQuery: {
        business: '',
        dept: '',
        userName: '',
        realmName: '',
        isReach: ''
      },
      businessDisabled: false,
      deptDisabled: false,
      fileList: [],
      uploadLoading: false,
      tableOptions: [
        {
          label: '人员姓名',
          prop: 'user_name',
          minWidth: '75'
        },
        {
          label: '事业部',
          prop: 'business_dep',
          minWidth: '120'
        },
        {
          label: '部门',
          prop: 'department',
          minWidth: '110'
        },
        {
          label: '专业组',
          prop: 'group_name',
          minWidth: '110'
        },
        {
          label: '域名',
          prop: 'realm_name',
          minWidth: '80'
        },
        {
          label: '域当前等级',
          prop: 'realm_level_now',
          minWidth: '80'
        },
        {
          label: '域目标等级',
          prop: 'realm_level_plan',
          minWidth: '80'
        },
        {
          label: '作品名称',
          prop: 'opus_name',
          minWidth: '160'
        },
        {
          label: '作品路径',
          prop: 'opus_path',
          minWidth: '200'
        },
        {
          label: '达成时间',
          prop: 'reach_date',
          minWidth: '80'
        },
        {
          label: '操作',
          prop: 'action',
          minWidth: '100'
        }
      ],
      business: [
        {
          label: '全部',
          value: '',
          key: 'all'
        },
        {
          label: 'SMB产品事业部',
          value: 'SMB产品事业部',
          key: 'smb'
        },
        {
          label: '路由器产品事业部',
          value: '路由器产品事业部',
          key: 'lu'
        },
        {
          label: '数据中心交换产品事业部',
          value: '数据中心交换产品事业部',
          key: 'wu'
        },
        {
          label: '研究院',
          value: '研究院',
          key: 'yan'
        },
        {
          label: '园区与城域网交换产品事业部',
          value: '园区与城域网交换产品事业部',
          key: 'yuan'
        },
        {
          label: '北京研发中心',
          value: '北京研发中心',
          key: 'bj'
        }
      ],
      reach: [
        {
          label: '全部',
          key: 'all',
          value: ''
        },
        {
          label: '通过',
          key: 'true',
          value: '1'
        },
        {
          label: '未通过',
          key: 'false',
          value: '0'
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
    handleQueryClick() {
      this.resetPageInfo()
      this.queryList()
    },
    handleResetClick() {
      this.resetPageInfo()
      this.listQuery = {
        business: '',
        dept: '',
        userName: '',
        realmName: '',
        isReach: ''
      }
      this.loadList()
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
    handleSuccessUpload(res, file, fileList) {
      if (res.error !== undefined) {
        this.$message.error('导入失败!' + res.error)
        fileList.response = '导入失败!' + res.error
        fileList.status = 'error'
        this.fileList = fileList
        this.uploadLoading = false
      }
    },
    handleBeforeUpload() {
      this.uploadLoading = true
    },
    async handleDeleteClick(row) {
      const values = {
        id: row.id
      }

      const { data: res } = await request('/api/userQualificationsRealmReach/delete', {
        method: 'DELETE',
        data: values
      })
      if (res) {
        this.$message.success('删除成功')
        this.loadList()
      } else {
        this.$message.error('删除失败')
      }
    },
    async handleReachClick(row, isReach) {
      const values = {
        id: row.id,
        isReach
      }

      const { data: res } = await request('/api/userQualificationsRealmReach/update', {
        method: 'POST',
        data: values
      })

      if (res) {
        this.$message.success('修改成功')
        this.loadList()
      } else {
        this.$message.error('修改失败')
      }
    },
    async queryList() {
      this.tableLoading = true
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      const { data: res } = await doQualificationsRealmReach(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsRealmReach(this.pageInfo)
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
#qualifications-realm-reach {
  margin: 20px;

  .upload-desc {
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, .65);
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

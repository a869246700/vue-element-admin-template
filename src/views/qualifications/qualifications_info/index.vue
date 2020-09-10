<template>
  <el-card id="qualifications-info">
    <el-row :gutter="20">
      <el-col :span="7">
        <span>事业部：</span>
        <el-select
          v-model="listQuery.business"
          size="small"
          :disabled="businessDisabled"
          style="width: 230px;"
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

      <el-col :span="5">
        <span>部门：</span>
        <el-input
          v-model.trim="listQuery.dept"
          size="small"
          :disabled="deptDisabled"
          placeholder="请输入部门"
          style="width: 150px;"
        />
      </el-col>

      <el-col :span="5">
        <span>人员名称：</span>
        <el-input
          v-model.trim="listQuery.userName"
          size="small"
          placeholder="请输入人员名称"
          style="width: 150px;"
        />
      </el-col>

      <el-col :span="4">
        <div class="buttons">
          <el-button type="primary" size="small" @click="handleQueryClick">查询</el-button>
          <el-button size="small" @click="handleResetClick">重置</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="tableLoading" :data="list" border style="margin-top: 20px;">
      <el-table-column
        v-for="item in tableOptions"
        :key="item.key"
        :label="item.label"
        :min-width="item.minWidth"
        :prop="item.prop"
        :fixed="item.fixed"
      >
        <template slot-scope="{row}">
          <span v-if="item.key !== 'action'">{{ row[item.prop] }}</span>

          <div v-else>
            <el-popconfirm title="您确定要修改时间？该操作不会记录之前达成情况！请慎重修改！" @onConfirm="handleEditDateClick(row)">
              <span slot="reference" class="action">修改时间</span>
            </el-popconfirm>

            <el-popconfirm
              title="您确定要修改资质？该操作不会记录之前达成情况！请慎重修改"
              @onConfirm="handleEditQualificationClick(row)"
            >
              <span slot="reference" class="action">修改资质</span>
            </el-popconfirm>

            <el-popconfirm
              :title="`您确定添加${row.user_name}默认达成该资质?`"
              @onConfirm="handleDefaultReachClick(row)"
            >
              <span slot="reference" class="action">默认达成</span>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <pagination
        v-if="total !== 0"
        :total="total"
        :page="pageInfo.pageNum"
        :limit="pageInfo.pageSize"
        :auto-scroll="false"
        @pagination="handlePageUpdate"
      />
    </div>

    <edit-date ref="editDateRef" />
    <edit-qualification ref="editQualificationRef" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import EditDate from './components/EditDate'
import EditQualification from './components/EditQualification'

import request from '@/services/request'
import { doQualificationsInfo } from '@/services/qualifications/qualifications'

export default {
  name: 'QualificationInfo',
  components: { Pagination, EditDate, EditQualification },
  data() {
    return {
      list: [],
      businessDisabled: false,
      deptDisabled: false,
      tableLoading: false,
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      listQuery: {
        business: '',
        dept: '',
        userName: ''
      },
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
      tableOptions: [
        {
          label: '人员姓名',
          prop: 'user_name',
          key: 'user_name',
          minWidth: '80'
        },
        {
          label: '事业部',
          prop: 'business_dep',
          key: 'business_dep',
          minWidth: '150'
        },
        {
          label: '部门',
          prop: 'department',
          key: 'department',
          minWidth: '120'
        },
        {
          label: '专业组',
          prop: 'group_name',
          key: 'group_name',
          minWidth: '120'
        },
        {
          label: '当前资质',
          prop: 'qualifications',
          key: 'qualifications',
          minWidth: '100'
        },
        {
          label: '资质计划',
          prop: 'qualifications_plan',
          key: 'qualifications_plan',
          minWidth: '75'
        },
        {
          label: '目标资质',
          prop: 'target_qualifications',
          key: 'target_qualifications',
          minWidth: '110'
        },
        {
          label: '开始时间',
          prop: 'relegation_start_date',
          key: 'relegation_start_date',
          minWidth: '80'
        },
        {
          label: '结束时间',
          prop: 'relegation_end_date',
          key: 'relegation_end_date',
          minWidth: '80'
        },
        {
          label: '操作',
          key: 'action',
          minWidth: '180',
          fixed: 'right'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadingList()
      this.queryIsShow()
    },
    // 修改日期
    handleEditDateClick(row) {
      this.$refs.editDateRef.setTemp(row)
      this.$refs.editDateRef.dialogVisible = true
    },
    // 修改资质
    handleEditQualificationClick(row) {
      this.$refs.editQualificationRef.setTemp(row)
      this.$refs.editQualificationRef.dialogVisible = true
    },
    // 默认达成
    handleDefaultReachClick(row) {},
    handleQueryClick() {
      this.pageInfo.pageNum = 1
      this.queryList()
    },
    handleResetClick() {
      this.listQuery = {
        business: '',
        dept: '',
        userName: ''
      }
      this.pageInfo.pageSize = 10
      this.pageInfo.pageNum = 1
      this.queryList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit

      this.queryList()
    },
    async loadingList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsInfo(this.pageInfo)
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
    },
    async queryList() {
      const params = {
        conditions: this.listQuery,
        ...this.pageInfo
      }
      this.tableLoading = true
      const { data: res } = await doQualificationsInfo(params)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#qualifications-info {
  margin: 20px;
  font-size: 14px;
}

.flex {
  display: flex;
  align-items: center;
}

.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  border-radius: 50%;
}

.action {
  color: #1895ff;
  padding: 0 8px;
  cursor: pointer;

  &:nth-child(-n + 2) {
    border-right: 1px solid #999;
  }
}
</style>

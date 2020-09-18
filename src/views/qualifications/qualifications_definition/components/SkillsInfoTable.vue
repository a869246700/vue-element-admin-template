<template>
  <div>
    <el-table
      v-loading="tableLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{ background: '#f6f6f6' }"
    >
      <el-table-column
        v-for="item in tableOptions"
        :key="item.key"
        :label="item.title"
        :prop="item.dataIndex"
        :min-width="item.width"
        :align="item.children ? 'center' : ''"
      >
        <template #header>
          <div style="white-space: normal;">{{ item.title }}</div>
        </template>
        <template slot-scope="{row}">
          <div style="white-space: normal;">{{ row[item.dataIndex] }}</div>
        </template>

        <template v-if="item.children">
          <el-table-column
            v-for="child in item.children"
            :key="child.key"
            :label="child.title"
            :prop="child.dataIndex"
            :min-width="child.width"
            :align="child.align"
          >
            <template #header>
              <div style="white-space: normal;">{{ child.title }}</div>
            </template>
            <template slot-scope="{row}">
              <div style="white-space: normal;">{{ row[child.dataIndex] }}</div>
            </template>
          </el-table-column>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'

import { doQualificationsRuleSkillsInfo } from '@/services/qualifications/qualifications'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableLoading: false,
      list: [],
      total: 0,
      tableOptions: [
        {
          title: '工程域',
          dataIndex: 'engineering_realm',
          key: 'engineering_realm'
        },
        {
          title: '域名',
          dataIndex: 'realm_type',
          key: 'realm_type'
        },
        {
          title: '五级（了解/基础）',
          dataIndex: 'five',
          key: 'five',
          children: [
            {
              title: '技能',
              dataIndex: 'five_skills',
              key: 'five_skills'
            },
            {
              title: '职责/技能要求',
              dataIndex: 'five_skills_requirement',
              key: 'five_skills_requirement'
            },
            {
              title: '验收标准',
              dataIndex: 'five_acceptance_criteria',
              key: 'five_acceptance_criteria'
            }
          ]
        },
        {
          title: '四级（应用/熟悉）',
          dataIndex: 'four',
          key: 'four',
          children: [
            {
              title: '技能',
              dataIndex: 'four_skills',
              key: 'four_skills'
            },
            {
              title: '职责/技能要求',
              dataIndex: 'four_skills_requirement',
              key: 'four_skills_requirement'
            },
            {
              title: '验收标准',
              dataIndex: 'four_acceptance_criteria',
              key: 'four_acceptance_criteria'
            }
          ]
        },
        {
          title: '三级（分析/精通）',
          dataIndex: 'three',
          key: 'three',
          children: [
            {
              title: '技能',
              dataIndex: 'three_skills',
              key: 'three_skills'
            },
            {
              title: '职责/技能要求',
              dataIndex: 'three_skills_requirement',
              key: 'three_skills_requirement'
            },
            {
              title: '验收标准',
              dataIndex: 'three_acceptance_criteria',
              key: 'three_acceptance_criteria'
            }
          ]
        },
        {
          title: '负责人',
          dataIndex: 'person',
          key: 'person'
        }
      ],
      pageInfo: {
        orderBy: null,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loadList()
    },
    handlePageUpdate(e) {
      this.pageInfo.pageNum = e.page
      this.pageInfo.pageSize = e.limit
      this.loadList()
    },
    async loadList() {
      this.tableLoading = true
      const { data: res } = await doQualificationsRuleSkillsInfo(this.pageInfo)
      this.list = res.list
      this.total = res.total

      this.$nextTick(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

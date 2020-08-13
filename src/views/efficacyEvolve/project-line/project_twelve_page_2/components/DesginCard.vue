<template>
  <card title="设计" class="desgin card">
    <template #buttons>
      <el-button type="primary" size="small">导出TP明细</el-button>
    </template>

    <template #content>
      <div class="notice-board">
        <el-row :gutter="24">
          <el-col
            v-for="(item, index) in desginNoticeList"
            :key="index"
            :span="24 / desginNoticeList.length"
          >
            <el-alert :title="item.content" :type="item.status" :closable="false" />
          </el-col>
        </el-row>
      </div>

      <div class="desgin-table">
        <div class="filter-container">
          <!-- select -->
          <el-select v-model="desginSelectVal" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="(item, index) in desginSelectOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>

        <!-- 表格 -->
        <el-table
          :data="desginTableData"
          border
          style="width: 100%"
          fit
          :header-cell-style="{'background-color': '#FAFAFA' }"
          highlight-current-row
        >
          <el-table-column prop="area" label="域" min-width="103" show-overflow-tooltip />
          <el-table-column
            v-for="(item, index) in desginTableTitleList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            align="center"
            show-overflow-tooltip
          />
        </el-table>
        <!-- 分段器 -->
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="20" />
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import Card from '@/components/Card/index'
// import request from '@/services/request'

// 导入 select 和 table 的配置项
import {
  desginCardSelectList,
  desginCardSelectDefaultList,
  desginCardTableTitleList
} from './options'

export default {
  components: {
    Card
  },
  data() {
    return {
      key: 1,
      desginNoticeList: [
        {
          content: '总计TP 44 个',
          status: 'info'
        },
        {
          content: '已完成TP 31 个',
          status: 'success'
        },
        {
          content: '计划用例 1379 个',
          status: 'warning'
        },
        {
          content: '实际用例 835 个',
          status: 'error'
        }
      ],
      desginSelectVal: desginCardSelectDefaultList, // select 选中项列表
      desginSelectOptions: desginCardSelectList, // select 的选项配置
      desginTableTitleList: desginCardTableTitleList.filter(
        (i) => desginCardSelectDefaultList.indexOf(i.label) >= 0
      ),
      desginTableData: [
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        },
        {
          area: 'test',
          atpcount: 100,
          btpcount: 100,
          ctpcount: 100,
          dtpcount: 100,
          etpcount: 100,
          ftpcount: 100,
          ttpcount: 100
        }
      ],
      desginTableCurrentPage: 1 // 当前页码
    }
  },
  computed: {
    desginTableList() {
      return this.desginTableData.slice(
        (this.desginTableCurrentPage - 1) * 10,
        this.desginTableCurrentPage * 10
      )
    }
  },
  watch: {
    // 设计卡片 select 的选中项改变
    desginSelectVal(valArr) {
      this.desginTableTitleList = desginCardTableTitleList.filter(
        (i) => valArr.indexOf(i.label) >= 0
      )
      this.key = this.key + 1
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

// desgin 设计
.desgin-table {
  margin-top: 20px;
}
</style>

<template>
  <!-- 工作包bug统计对话框 -->
  <el-dialog class="quality-outdialog" title="工作包bug统计" :visible.sync="dialogVisible" width="70%">
    <!-- 外层表格 -->
    <el-table v-loading="isLoading" :data="list" highlight-current-row border style="width: 100%">
      <el-table-column prop="work_package" label="工作包" width="180" fixed show-overflow-tooltip>
        <template #header>
          <div class="table-title">
            <span class="title">工作包</span>
            <el-popover ref="work_package" placement="bottom-end" :width="200" trigger="click">
              <el-input v-model.trim="listQuery.work_package" style="margin-bottom: 5px" />
              <div style="display: flex">
                <el-button
                  size="mini"
                  type="primary"
                  style="width: 50%"
                  @click="handleSearchClick('work_package')"
                >查询</el-button>

                <el-button
                  size="mini"
                  style="width: 50%"
                  @click="handleResetClick('work_package')"
                >重置</el-button>
              </div>

              <i slot="reference" class="el-icon-help table-title-icon" />
            </el-popover>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="code" label="代码量" width="75" fixed />

      <el-table-column prop="type" label="类型" width="85">
        <template #header>
          <div class="table-title">
            <span class="title">类型</span>
            <el-popover ref="type" placement="bottom-end" :width="200" trigger="click">
              <el-input v-model.trim="listQuery.type" style="margin-bottom: 5px" />
              <div style="display: flex">
                <el-button
                  size="mini"
                  type="primary"
                  style="width: 50%"
                  @click="handleSearchClick('type')"
                >查询</el-button>

                <el-button size="mini" style="width: 50%" @click="handleResetClick('type')">重置</el-button>
              </div>

              <i slot="reference" class="el-icon-help table-title-icon" />
            </el-popover>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="stage_name" label="阶段" width="75">
        <template #header>
          <div class="table-title">
            <span class="title">阶段</span>
            <el-popover ref="stage_name" placement="bottom-end" :width="200" trigger="click">
              <el-input v-model.trim="listQuery.stage_name" style="margin-bottom: 5px" />
              <div style="display: flex">
                <el-button
                  size="mini"
                  type="primary"
                  style="width: 50%"
                  @click="handleSearchClick('stage_name')"
                >查询</el-button>

                <el-button size="mini" style="width: 50%" @click="handleResetClick('stage_name')">重置</el-button>
              </div>

              <i slot="reference" class="el-icon-help table-title-icon" />
            </el-popover>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="user_name" label="开发负责人" width="103">
        <template #header>
          <div class="table-title">
            <span class="title">开发负责人</span>
            <el-popover ref="user_name" placement="bottom-end" :width="200" trigger="click">
              <el-input v-model.trim="listQuery.user_name" style="margin-bottom: 5px" />
              <div style="display: flex">
                <el-button
                  size="mini"
                  type="primary"
                  style="width: 50%"
                  @click="handleSearchClick('user_name')"
                >查询</el-button>

                <el-button size="mini" style="width: 50%" @click="handleResetClick('user_name')">重置</el-button>
              </div>

              <i slot="reference" class="el-icon-help table-title-icon" />
            </el-popover>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="ptgttm" label="测试负责人" width="103">
        <template #header>
          <div class="table-title">
            <span class="title">开发负责人</span>
            <el-popover ref="ptgttm" placement="bottom-end" :width="200" trigger="click">
              <el-input v-model.trim="listQuery.ptgttm" style="margin-bottom: 5px" />
              <div style="display: flex">
                <el-button
                  size="mini"
                  type="primary"
                  style="width: 50%"
                  @click="handleSearchClick('ptgttm')"
                >查询</el-button>

                <el-button size="mini" style="width: 50%" @click="handleResetClick('ptgttm')">重置</el-button>
              </div>

              <i slot="reference" class="el-icon-help table-title-icon" />
            </el-popover>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="all_num" label="整体产出" width="89" />
      <el-table-column prop="all_rate" label="整体缺陷" width="89" />

      <el-table-column label="集成" align="center">
        <el-table-column prop="jc_all_num" label="总计" width="70" />
        <el-table-column prop="jc_pi_num" label="平台测试" width="89" />
        <el-table-column prop="jc_pd_num" label="事业部测试" width="103" />
        <el-table-column prop="jc_rate" label="缺陷率" width="75" />
      </el-table-column>

      <el-table-column label="准入" align="center">
        <el-table-column prop="zr_all_num" label="总计" width="70" />
        <el-table-column prop="zr_pi_num" label="平台测试" width="89" />
        <el-table-column prop="zr_pd_num" label="事业部测试" width="103" />
        <el-table-column prop="zr_rate" label="缺陷率" width="75" />
      </el-table-column>

      <el-table-column label="首轮" align="center">
        <el-table-column prop="sl_all_num" label="总计" width="70" />
        <el-table-column prop="sl_pi_num" label="平台测试" width="89" />
        <el-table-column prop="sl_pd_num" label="事业部测试" width="103" />
        <el-table-column prop="sl_rate" label="缺陷率" width="75" />
      </el-table-column>

      <el-table-column label="次轮" align="center">
        <el-table-column prop="cl_all_num" label="总计" width="70" />
        <el-table-column prop="cl_pi_num" label="平台测试" width="89" />
        <el-table-column prop="cl_pd_num" label="事业部测试" width="103" />
        <el-table-column prop="cl_rate" label="缺陷率" width="75" />
      </el-table-column>

      <el-table-column label="回归" align="center">
        <el-table-column prop="hg_all_num" label="总计" width="70" />
        <el-table-column prop="hg_pi_num" label="平台测试" width="89" />
        <el-table-column prop="hg_pd_num" label="事业部测试" width="103" />
        <el-table-column prop="hg_rate" label="缺陷率" width="75" />
      </el-table-column>

      <el-table-column prop="omit_rate" label="遗漏率" width="80" />
    </el-table>
    <!-- 外层表格分段器 -->
    <pagination
      v-if="total>=pageSize"
      :total="total"
      :page="currentPage"
      :limit="pageSize"
      :auto-scroll="false"
      @pagination="handlePageUpdate"
    />

    <!-- 内层dialog -->
    <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerDialogVisible"
      append-to-body
    />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination/index'

export default {
  components: { Pagination },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false, // 加载中
      outDialogVisible: false, // 是否显示对话框
      innerDialogVisible: false, // 是否显示内对话框
      key: 1,
      pageSize: 10, // 每一页的内容大小
      currentPage: 1, // 当前页码
      listQuery: {
        work_package: undefined,
        type: undefined,
        stage_name: undefined,
        user_name: undefined,
        ptgttm: undefined
      },
      tableList: []
    }
  },
  computed: {
    list() {
      const currentPage = this.currentPage
      const pageSize = this.pageSize
      return this.tableList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    },
    total() {
      return this.tableList.length
    }
  },
  watch: {
    tableData(newV, oldV) {
      this.tableList = newV
    }
  },
  methods: {
    // 点击 popover 搜索
    handleSearchClick(key) {
      // 1. 隐藏popover
      this.closePopover(key)
      // 2. 执行搜索
      let list = this.tableData
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && this.listQuery[key]) {
          console.log(key)
          list = this.getList(key, list)
        }
      }
      console.log(list)
    },
    // 点击popover重置
    handleResetClick(key) {
      // 1. 重置输入框内容
      this.listQuery[key] = undefined

      // 2. 隐藏
      this.$nextTick(() => {
        this.closePopover(key)
      })
    },
    // 关闭 popover
    closePopover(key) {
      // 展示无法关闭
      this.$refs[key].doClose()
    },
    // 搜索
    getList(key, list) {
      const res = list.filter((e) => e[key].includes(this.listQuery[key]))
      return res
    },
    // 修改分页器
    handlePageUpdate(e) {
      this.currentPage = e.page
      this.pageSize = e.limit
    }
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  display: flex;
  justify-content: space-between;

  .title {
    flex: 1;
  }

  .table-title-icon {
    cursor: pointer;
  }

  .table-title-icon:hover {
    background-color: #d9d9d9;
  }
}
</style>

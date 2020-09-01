<template>
  <div class="quality">
    <card title="执行">
      <!-- BUG解决按钮 -->
      <template #buttons>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleExportPackageDetClick"
        >导出工作包明细</el-button>
        <el-button
          :loading="butLoading"
          type="primary"
          size="small"
          @click="handleExportPackStaClick"
        >工作包达标统计</el-button>
        <el-popover placement="bottom-end" :width="(146 * 7)" trigger="click">
          <el-table
            :data="bugSolve"
            border
            fit
            style="width: 100%;"
            :header-cell-style="{'background-color': '#FAFAFA' }"
          >
            <el-table-column
              v-for="item in bugSolveTableOptions"
              :key="item.key"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <div
                  v-if="item.prop !== 'user_type'"
                >{{ row[item.prop] | bugSolveFilter(item.source, row) }}</div>
                <span v-else>{{ row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button slot="reference" type="primary" size="small" style="margin-left: 10px;">BUG解决</el-button>
        </el-popover>
      </template>

      <!-- 主体区域 -->
      <template #content>
        <!-- 第一个表格区域 -->
        <div class="first-table">
          <div class="header">
            <!-- radio切换 -->
            <el-radio-group v-model="totalStageName" size="small" @change="handleTotalRadioChange">
              <el-radio-button
                v-for="(item, index) in totalStageNameList"
                :key="index"
                :label="item.stage"
              />
            </el-radio-group>

            <!-- select -->
            <el-select v-model="firstSelectVal" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in firstSelectOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <!-- 表格 -->
          <el-table
            v-loading="totalTableLoading"
            :data="qualityDefectList"
            style="width: 100%; margin-bottom: 30px;"
            border
            :header-cell-style="{'background-color': '#FAFAFA', color: '#666666' }"
            row-key="name"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            fit
            class="total-table table"
          >
            <el-table-column
              v-for="item in firstTableOptions"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              :fixed="item.fixed"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <span
                  :class="row.children || item.prop !== 'name' ? 'with-child' : 'without-child'"
                >{{ row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 第二个表格区域 -->
        <div class="second-table">
          <div class="header">
            <!-- radio切换 -->
            <el-radio-group v-model="zrStageName" size="small" @change="handleRadioChange">
              <el-radio-button
                v-for="(item, index) in zrStageNameList"
                :key="index"
                :label="item.stage_name"
              />
            </el-radio-group>

            <!-- select -->
            <el-select v-model="secondSelectVal" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in secondSelectOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <!-- 表格 -->
          <el-table
            v-loading="zrTableLoading"
            :data="qualityZrDefectList"
            style="width: 100%; margin-bottom: 10px; margin-top: 10px;"
            border
            :header-cell-style="{'background-color': '#FAFAFA' }"
            row-key="type"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            class="zr-table table"
          >
            <el-table-column prop="type" label="类型" fixed width="220" show-overflow-tooltip>
              <template slot-scope="{row}">
                <span
                  v-if="row.children"
                  class="with-child"
                  @click="handleTypeClcik(row)"
                >{{ row.type }}</span>
                <span v-else class="without-child" @click="handleTypeClcik(row)">{{ row.type }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="code" label="代码量" fixed min-width="70" />

            <el-table-column
              v-for="item in secondTableOptions"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
            />
          </el-table>
        </div>
      </template>
    </card>

    <!-- bug 明细 -->
    <quality-bug-detail-dialog
      ref="detailDialogRef"
      :table-data="qualityDefectWorkList"
      @close="handleDetailDialogClose"
    />

    <!-- 工作包 bug 进展 -->
    <quality-bug-package-dialog
      ref="packageDialogRef"
      :table-data="workPackageBugTableData"
      @work-package-click="handleWorkPackageClick"
    />
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import QualityBugDetailDialog from './components/QualityBugDetailDialog'
import QualityBugPackageDialog from './components/QualityBugPackageDialog'

import request from '@/services/request'
import DownFiles from '@/vendor/ExportExcel'

export default {
  filters: {
    bugSolveFilter(text, source, row) {
      return `${row[source]}  ->  ${text}`
    }
  },
  components: {
    QualityBugDetailDialog,
    QualityBugPackageDialog,
    Card
  },
  data() {
    return {
      key: 1,
      project: undefined, // 当前项目名
      tableType: ['sta', 'main', 'assembly'], // 请求的tableType
      bugSolve: [], // BUG解决的表格数据
      /* --- 整体 --- */
      totalTableLoading: false, // 是否加载中
      totalStageName: '整体',
      totalStageNameList: [{ stage: '整体' }, { stage: '主干' }, { stage: '组件' }],
      qualityDefectList: [], // table 数据
      firstSelectOptions: [
        '总缺陷',
        '总缺陷率',
        '准入BUG数',
        '准入缺陷',
        '首轮BUG数',
        '首轮缺陷',
        '次轮BUG数',
        '次轮缺陷',
        '回归BUG数',
        '回归缺陷',
        '集成BUG数',
        '事业部bug数',
        '事业部缺陷率',
        '遗漏个数',
        '遗漏率'
      ],
      firstSelectVal: [
        '总缺陷',
        '总缺陷率',
        '准入BUG数',
        '准入缺陷',
        '首轮BUG数',
        '首轮缺陷',
        '次轮BUG数',
        '次轮缺陷',
        '回归BUG数',
        '回归缺陷',
        '集成BUG数',
        '事业部bug数',
        '事业部缺陷率',
        '遗漏个数',
        '遗漏率'
      ],
      secondSelectOptions: [
        '测试提交',
        '总缺陷率',
        '新增工作包缺陷数',
        '新增工作包缺密度',
        '遗留BUG缺陷数',
        '遗留BUG缺陷密度',
        '遗漏个数',
        '遗漏率',
        '集成BUG数',
        '准入BUG数',
        '准入缺陷',
        '首轮BUG数',
        '首轮缺陷',
        '次轮BUG数',
        '次轮缺陷',
        '回归BUG数',
        '回归缺陷'
      ],
      secondSelectVal: [
        '测试提交',
        '总缺陷率',
        '新增工作包缺陷数',
        '新增工作包缺密度',
        '遗留BUG缺陷数',
        '遗留BUG缺陷密度',
        '遗漏个数',
        '遗漏率',
        '集成BUG数',
        '准入BUG数',
        '准入缺陷',
        '首轮BUG数',
        '首轮缺陷',
        '次轮BUG数',
        '次轮缺陷',
        '回归BUG数',
        '回归缺陷'
      ],
      /* --- 准入 --- */
      zrTableLoading: false,
      zrStageName: '阶段一',
      zrStageNameList: [{ stage: '阶段一' }, { stage: '阶段二' }],
      qualityZrDefectList: [], // 准入table 数据
      workPackageBugTableData: [],
      qualityDefectInfoList: [],
      qualityDefectWorkList: [], // bug 明细数据
      dialogControl: false,
      butLoading: false
    }
  },
  computed: {
    bugSolveTableOptions() {
      return [
        {
          prop: 'user_type',
          label: '板块',
          key: 'user_type',
          minWidth: 146
        },
        {
          prop: 'all_num',
          label: '总BUG数',
          key: 'all_num',
          minWidth: 146,
          source: 'all_num_old'
        },
        {
          prop: 'serious_num',
          label: '严重BUG数',
          key: 'serious_num',
          minWidth: 146,
          source: 'serious_num_old'
        },
        {
          prop: 'serious_rate',
          label: '严重率',
          key: 'serious_rate',
          minWidth: 146,
          source: 'serious_rate_old'
        },
        {
          prop: 'unsettled_num',
          label: '未决BUG数',
          key: 'unsettled_num',
          minWidth: 146,
          source: 'unsettled_num_old'
        },
        {
          prop: 'unsettled_rate',
          label: '未决率',
          key: 'unsettled_rate',
          minWidth: 146,
          source: 'unsettled_rate_old'
        },
        {
          prop: 'unsettled_serious_num',
          label: '未决严重bug数',
          key: 'unsettled_serious_num',
          minWidth: 146,
          source: 'unsettled_serious_num_old'
        },
        {
          prop: 'un_cbd_num',
          label: '未推进CBD数',
          key: 'un_cbd_num',
          minWidth: 146,
          source: 'un_cbd_num_old'
        }
      ]
    },
    firstTableOptions() {
      const list = [
        {
          prop: 'name',
          label: '类型',
          minWidth: '220',
          fixed: 'left'
        },
        {
          prop: 'code',
          label: '代码量',
          minWidth: '89',
          fixed: 'left'
        },
        {
          prop: 'all_num',
          label: '总缺陷',
          minWidth: 89
        },
        {
          prop: 'all_rate',
          label: '总缺陷率',
          minWidth: 89
        },
        {
          prop: 'zr_all_num',
          label: '准入BUG数',
          minWidth: 117
        },
        {
          prop: 'zr_all_rate',
          label: '准入缺陷',
          minWidth: 89
        },
        {
          prop: 'sl_all_num',
          label: '首轮BUG数',
          minWidth: 117
        },
        {
          prop: 'sl_all_rate',
          label: '首轮缺陷',
          minWidth: 89
        },
        {
          prop: 'cl_all_num',
          label: '次轮BUG数',
          minWidth: 117
        },
        {
          prop: 'cl_all_rate',
          label: '次轮缺陷',
          minWidth: 89
        },
        {
          prop: 'hg_all_num',
          label: '回归BUG数',
          minWidth: 117
        },
        {
          prop: 'hg_all_rate',
          label: '回归缺陷',
          minWidth: 89
        },
        {
          prop: 'jc_all_num',
          label: '集成BUG数',
          minWidth: 117
        },
        {
          prop: 'shi_all_num',
          label: '事业部bug数',
          minWidth: 117
        },
        {
          prop: 'shi_all_rate',
          label: '事业部缺陷率',
          minWidth: 117
        },
        {
          prop: 'omit_num',
          label: '遗漏个数',
          minWidth: 89
        },
        {
          prop: 'omit_rate',
          label: '遗漏率',
          minWidth: 75
        }
      ]
      return list.filter(
        (item) =>
          this.firstSelectVal.indexOf(item.label) >= 0 ||
          item.prop === 'name' ||
          item.prop === 'code'
      )
    },
    secondTableOptions() {
      const list = [
        {
          prop: 'all_num',
          label: '测试提交',
          minWidth: 77
        },
        {
          prop: 'all_rate',
          label: '总缺陷率',
          minWidth: 77
        },
        {
          prop: 'work_all_num',
          label: '新增工作包缺陷数',
          minWidth: 135
        },
        {
          prop: 'work_all_rate',
          label: '新增工作包缺陷密度',
          minWidth: 147
        },
        {
          prop: 'omit_all_num',
          label: '遗留BUG缺陷数',
          minWidth: 123
        },
        {
          prop: 'omit_all_rate',
          label: '遗留BUG缺陷密度',
          minWidth: 137
        },
        {
          prop: 'omit_num',
          label: '遗漏个数',
          minWidth: 77
        },
        {
          prop: 'omit_rate',
          label: '遗漏率',
          minWidth: 77
        },
        {
          prop: 'jc_all_num',
          label: '集成BUG数',
          minWidth: 97
        },
        {
          prop: 'zr_all_num',
          label: '准入BUG数',
          minWidth: 97
        },
        {
          prop: 'zr_all_rate',
          label: '准入缺陷',
          minWidth: 77
        },
        {
          prop: 'sl_all_num',
          label: '首轮BUG数',
          minWidth: 97
        },
        {
          prop: 'sl_all_rate',
          label: '首轮缺陷',
          minWidth: 77
        },
        {
          prop: 'cl_all_num',
          label: '次轮BUG数',
          minWidth: 97
        },
        {
          prop: 'cl_all_rate',
          label: '次轮缺陷',
          minWidth: 77
        },
        {
          prop: 'hg_all_num',
          label: '回归BUG数',
          minWidth: 97
        },
        {
          prop: 'hg_all_rate',
          label: '回归缺陷',
          minWidth: 77
        }
      ]
      return list.filter((item) => this.secondSelectVal.indexOf(item.label) >= 0)
    }
  },
  created() {
    this.project = this.$t(this.$route.matched[2].meta.title) // 获取项目名称
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.queryByQualityDefectList(this.project, 'sta', 'realm', '')
      this.queryByQualityZrDefectList(this.project, 'sta', 'type', this.zrStageName)
      this.queryByBugSolve(this.project)
      this.queryByProjectStage(this.project)
    },
    // 导出工作包明细
    handleExportPackageDetClick() {
      console.log('导出工作包明细')
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      const url = '/api/export/exeQualityWorkPackage'
      const obj = {
        conditions: {
          project: this.project,
          type: this.tableType[index]
        }
      }
      const fileName = this.project + '工作包bug产出统计.xls'
      DownFiles(url, obj, fileName, this)
    },
    // 导出工作包达标统计
    handleExportPackStaClick() {
      // console.log('导出工作包达标统计')
      this.$notify({
        title: '导出失败，功能未填写',
        message: 'Quality => handleExportPackStaClick()',
        type: 'error',
        duration: 3000
      })
    },
    // 对话框中工作包点击事件
    handleWorkPackageClick(row) {
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      this.dialogControl = true
      this.queryByQualityDefectInfoList(
        this.project,
        this.tableType[index],
        row.type.replace('-' + row.user_type, ''),
        row.user_type === undefined ? '' : row.user_type,
        '',
        this.zrStageName
      )
    },
    // 监听 bug明细对话框关闭，判断之前是否开启工作包bug对话框
    handleDetailDialogClose() {
      if (!this.dialogControl) {
        this.$refs.detailDialogRef.dialogVisible = false
      } else {
        this.$refs.detailDialogRef.dialogVisible = false
        const timer = setTimeout(() => {
          this.$refs.packageDialogRef.dialogVisible = true
          clearTimeout(timer)
        }, 100)
        this.dialogControl = false
      }
    },
    // 类型切换
    handleTotalRadioChange() {
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      this.queryByQualityDefectList(this.project, this.tableType[index], 'realm', '')
      this.queryByQualityZrDefectList(this.project, this.tableType[index], 'type', this.zrStageName)
    },
    // 阶段的切换
    handleRadioChange() {
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      this.queryByQualityZrDefectList(this.project, this.tableType[index], 'type', this.zrStageName)
    },
    // 点击类型显示 dialog
    handleTypeClcik(record) {
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      if (
        record.user_type === undefined &&
        (record.type === undefined ||
          record.type === '合计' ||
          record.type === '数据面' ||
          record.type === '控制面')
      ) {
        // 显示 工作包bug统计对话框
        this.queryByQualityDefectWorkList(
          this.project,
          this.tableType[index],
          record.type === undefined ? '合计' : record.type,
          this.zrStageName
        )
      } else {
        this.queryByQualityDefectInfoList(
          this.project,
          this.tableType[index],
          record.type.replace('-' + record.user_type, ''),
          record.user_type === undefined ? '' : record.user_type,
          '',
          this.zrStageName
        )
      }
    },
    // 质量-执行bug进展统计
    async queryByQualityDefectList(project, tableType, stageType, stageName) {
      this.totalTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/listProjectEvolveBugNewSta', {
        method: 'GET',
        params: {
          project,
          tableType,
          stageType,
          stageName
        }
      })
      this.qualityDefectList = res

      this.$nextTick(() => {
        this.totalTableLoading = false
      })
    },
    // 质量-执行bug进展统计
    async queryByQualityZrDefectList(project, tableType, stageType, stageName) {
      this.zrTableLoading = true
      const { data: res } = await request('/api/projectEvolveSta/listProjectEvolveBugTypeSta', {
        method: 'GET',
        params: {
          project,
          tableType,
          stageType,
          stageName
        }
      })
      if (res.length !== 0) {
        res[0].type = '合计'
      }
      this.qualityZrDefectList = res

      this.$nextTick(() => {
        this.zrTableLoading = false
      })
    },
    // 质量-执行bug工作包进展统计
    async queryByQualityDefectRealmList(project, tableType, type) {
      const { data: res } = await request('/api/projectEvolveSta/listProjectEvolveBugRealmSta', {
        method: 'GET',
        params: {
          project,
          tableType,
          type
        }
      })
      console.log(res)
    },
    // 质量-执行bug工作包进展统计
    async queryByQualityDefectWorkList(project, tableType, type, stageName) {
      // 1. 让对话框的 table 显示加载中
      this.$refs.packageDialogRef.dialogVisible = true
      this.$refs.detailDialogRef.dialogVisible = false
      this.$refs.packageDialogRef.isLoading = true

      const { data: res } = await request(
        '/api/projectEvolveSta/listProjectEvolveBugWorkPackageSta',
        {
          method: 'GET',
          params: {
            project,
            tableType,
            type,
            stageName
          }
        }
      )

      this.workPackageBugTableData = res
      // 2. 取消加载
      this.$nextTick(() => {
        this.$refs.packageDialogRef.getList()
        this.$refs.packageDialogRef.isLoading = false
      })
    },
    // 质量-执行bug明细
    async queryByQualityDefectInfoList(project, tableType, type, userType, workPackage, stageName) {
      this.$refs.detailDialogRef.dialogVisible = true
      const timer = setTimeout(() => {
        this.$refs.packageDialogRef.dialogVisible = false
        clearTimeout(timer)
      }, 100)

      this.$refs.detailDialogRef.isLoading = true
      const { data: res } = await request('/api/projectEvolveSta/listProjectEvolveBugInfo', {
        method: 'GET',
        params: {
          project,
          tableType,
          type,
          userType,
          workPackage,
          stageName
        }
      })

      this.qualityDefectWorkList = res
      this.$nextTick(() => {
        this.$refs.detailDialogRef.getList()
        this.$refs.detailDialogRef.isLoading = false
      })
    },
    // 质量-执行-BUG解决
    async queryByBugSolve(project) {
      const { data: res } = await request('/api/projectEvolveSta/listProjectBugSolveProcessSta', {
        methods: 'GET',
        params: {
          project,
          userTypeL: ''
        }
      })

      this.bugSolve = res
    },
    // 查询项目阶段
    async queryByProjectStage(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectStage', {
        method: 'GET',
        params: {
          project
        }
      })
      this.zrStageNameList = res
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.table {
  .without-child {
    padding-left: 25px;
  }
}

.zr-table {
  .without-child,
  .with-child {
    color: #1889ff;
    cursor: pointer;
  }
}
</style>

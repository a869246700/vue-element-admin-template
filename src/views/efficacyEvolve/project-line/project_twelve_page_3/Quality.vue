<template>
  <div class="quality">
    <card title="执行">
      <!-- 按钮 -->
      <template #buttons>
        <el-popover placement="bottom-end" :width="(146 * 7)" trigger="click">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="{'background-color': '#FAFAFA' }"
          >
            <el-table-column prop="date" label="板块" width="146" />
            <el-table-column prop="name" label="总BUG数" width="146" />
            <el-table-column prop="address" label="严重BUG数" width="146" />
            <el-table-column prop="name" label="未决BUG数" width="146" />
            <el-table-column prop="name" label="未决率" width="146" />
            <el-table-column prop="name" label="未决严重BUG数" width="146" />
            <el-table-column prop="name" label="未推进CBD数" width="146" />
          </el-table>
          <el-button slot="reference" type="primary" size="small">BUG解决</el-button>
        </el-popover>
      </template>

      <!-- 主体区域 -->
      <template #content>
        <!-- 第一个表格区域 -->
        <div class="first-table">
          <div class="container">
            <!-- radio切换 -->
            <el-radio-group v-model="totalStageName" size="small" @change="handleTotalRadioChange">
              <el-radio-button
                v-for="(item, index) in totalStageNameList"
                :key="index"
                :label="item.stage"
              />
            </el-radio-group>

            <!-- select -->
            <el-select v-model="totalSelectVaL" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in totalSelectOptions"
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
            :header-cell-style="{'background-color': '#FAFAFA' }"
            row-key="name"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            fit
            class="total-table table"
          >
            <el-table-column prop="name" label="类型" fixed width="220" show-overflow-tooltip>
              <template slot-scope="{row}">
                <span v-if="row.children" class="with-child">{{ row.name }}</span>
                <span v-else class="without-child">{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="代码量" fixed min-width="89" align="center" />
            <el-table-column
              v-for="(item, index) in totalTableTitleList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              align="center"
            />
          </el-table>
        </div>

        <!-- 第二个表格区域 -->
        <div class="second-table">
          <div class="container">
            <!-- radio切换 -->
            <el-radio-group v-model="zrStageName" size="small" @change="handleTotalRadioChange">
              <el-radio-button
                v-for="(item, index) in zrStageNameList"
                :key="index"
                :label="item.stage"
              />
            </el-radio-group>

            <!-- select -->
            <el-select v-model="zrSelectVal" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item, index) in zrSelectOptions"
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
                  @click="handleTypeClcik(row.type)"
                >{{ row.type }}</span>
                <span v-else class="without-child" @click="handleTypeClcik(row.type)">{{ row.type }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="code" label="代码量" fixed min-width="89" align="center" />
            <el-table-column
              v-for="(item, index) in zrTableTitleList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              align="center"
            />
          </el-table>
        </div>
      </template>
    </card>

    <!-- 工作包bug统计对话框 -->
    <out-dialog ref="dialogRef" :table-data="workPackageBugTableData" />
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import OutDialog from './components/OutDialog'

import request from '@/services/request'

// 导入配置项
import {
  executionCardSelectList,
  executionCardSelectDefaultList,
  tableOptions
} from './components/options'

export default {
  components: {
    OutDialog,
    Card
  },
  data() {
    return {
      key: 1,
      project: undefined, // 当前项目名
      tableType: ['sta', 'main', 'assembly'], // 请求的tableType
      tableData: [],
      /* --- 整体 --- */
      totalTableLoading: false, // 是否加载中
      totalStageName: '整体',
      totalStageNameList: [{ stage: '整体' }, { stage: '主干' }, { stage: '组件' }],
      qualityDefectList: [], // table 数据
      totalSelectVaL: executionCardSelectDefaultList, // 表格的 select 选中列表
      totalSelectOptions: executionCardSelectList, // 表格的 select 列表
      totalTableTitleList: tableOptions, // 表格的显示列表
      /* --- 准入 --- */
      zrTableLoading: false,
      zrStageName: '阶段一',
      zrStageNameList: [{ stage: '阶段一' }, { stage: '阶段二' }],
      qualityZrDefectList: [], // 准入table 数据
      zrSelectVal: executionCardSelectDefaultList,
      zrSelectOptions: executionCardSelectList,
      zrTableTitleList: tableOptions,
      workPackageBugTableData: []
    }
  },
  watch: {
    totalSelectVaL(valArr) {
      this.totalTableTitleList = tableOptions.filter((i) => valArr.indexOf(i.label) >= 0)
      this.key = this.key + 1
    },
    zrSelectVal(valArr) {
      this.zrTableTitleList = tableOptions.filter((i) => valArr.indexOf(i.label) >= 0)
      this.key = this.key + 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.project = this.$t(this.$route.matched[2].meta.title) // 获取项目名称
      this.queryByQualityDefectList(this.project, 'sta', 'realm', '')
      console.log(this.project, 'sta', 'type', this.zrStageName)
      this.queryByQualityZrDefectList(this.project, 'sta', 'type', this.zrStageName)
      this.queryByBugSolve(this.project)
      this.queryByProjectStage(this.project)
    },
    // 类型切换
    handleTotalRadioChange() {
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      this.queryByQualityDefectList(this.project, this.tableType[index], 'realm', '')
      this.queryByQualityZrDefectList(this.project, this.tableType[index], 'type', this.zrStageName)
    },
    // 阶段的切换
    handleRadioChange(name) {
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      this.queryByQualityDefectList(this.project, this.tableType[index], 'realm', '')
      this.queryByQualityZrDefectList(this.project, this.tableType[index], 'type', this.zrStageName)
    },
    // 点击类型显示 dialog
    handleTypeClcik(type) {
      // 1. 显示对话框
      this.$refs.dialogRef.outDialogVisible = true
      // 2. 显示 loadimg
      // 3. 查询数据
      const index = this.totalStageNameList.findIndex((e) => e.stage === this.totalStageName)
      this.queryByQualityDefectWorkList(this.project, this.tableType[index], type, this.zrStageName)
      // 4. 取消 loading
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
      this.$refs.dialogRef.isLoading = true

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
        this.$refs.dialogRef.isLoading = false
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

      console.log(res)
    },
    // 查询项目阶段
    async queryByProjectStage(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectStage', {
        method: 'GET',
        params: {
          project
        }
      })

      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
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

<template>
  <div class="component-project">
    <el-tabs v-model="active" tab-position="left">
      <el-tab-pane key="milestone" label="里程碑" name="milestone">
        <my-table :table-data="tableDataMap['milestone']" :options="tableOptionMap['milestone']" />
      </el-tab-pane>

      <el-tab-pane key="resource" label="资源统计" name="resource">
        <!-- <my-table :table-data="tableDataMap['resource']" :options="tableOptionMap['resource']" /> -->
        <filter-table
          is-pagination
          is-filter
          is-export-excel
          :table-data="tableDataMap['resource']"
          :options="tableOptionMap['resource']"
        />
      </el-tab-pane>

      <el-tab-pane key="bug" label="BUG统计" name="bug">
        <my-table :table-data="tableDataMap['bug']" :options="tableOptionMap['bug']" />
        <my-table :table-data="tableDataMap['bugWork']" :options="tableOptionMap['bugWork']" style="margin-top: 10px;" />
      </el-tab-pane>

      <el-tab-pane key="review" label="评审统计" name="review">
        <my-table :table-data="tableDataMap['review']" :options="tableOptionMap['review']" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyTable from '@/components/Table'

import request from '@/services/request'
import FilterTable from '@/components/Table/FilterTable.vue'

export default {
  components: {
    MyTable,
    FilterTable
  },
  props: {
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: 'milestone',
      // 表单数据表
      tableDataMap: {
        milestone: [],
        resource: [],
        bug: [],
        bugWork: [],
        review: []
      },
      // 表单配置表
      tableOptionMap: {
        milestone: [
          {
            title: '项目名称',
            prop: 'project',
            key: 'project',
            width: '25%'
          },
          {
            title: '代码量',
            prop: 'code',
            key: 'code',
            width: '15%'
          },
          {
            title: 'EC时间',
            prop: 'ec_date',
            key: 'ec_date',
            width: '15%'
          },
          {
            title: '转测试时间',
            prop: 'test_date',
            key: 'test_date',
            width: '15%'
          },
          {
            title: '发布时间',
            prop: 'on_date',
            key: 'on_date',
            width: '15%'
          },
          {
            title: '当前阶段',
            prop: 'now_stage',
            key: 'now_stage',
            width: '15%'
          }
        ],
        resource: [
          {
            label: '项目名称',
            prop: 'res_project_name',
            key: 'res_project_name',
            fixed: 'left',
            width: '20%'
          },
          {
            label: '代码量',
            prop: 'code',
            key: 'code',
            width: '10%',
            render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
          },
          {
            label: '总分配资源(人/日)',
            prop: 'total_target',
            key: 'total_target',
            width: '15%',
            render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
          },
          {
            label: '实际已用资源(人/日)',
            prop: 'total_time',
            key: 'total_time',
            width: '15%',
            render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
          },
          {
            label: '实际已用效率',
            prop: 'total_rate',
            key: 'total_rate',
            width: '10%',
            render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
          },
          {
            label: '需求',
            prop: 'demand',
            key: 'demand',
            width: '10%',
            children: [
              {
                label: '资源',
                prop: 'demand_time',
                key: 'demand_time',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                label: '效率',
                prop: 'demand_rate',
                key: 'demand_rate',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            label: '设计',
            prop: 'design',
            key: 'design',
            width: '10%',
            children: [
              {
                label: '资源',
                prop: 'jic_time',
                key: 'jic_time',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                label: '效率',
                prop: 'jic_rate',
                key: 'jic_rate',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            label: '测试',
            prop: 'test',
            key: 'test',
            width: '10%',
            children: [
              {
                label: '资源',
                prop: 'test_time',
                key: 'test_time',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                label: '效率',
                prop: 'test_rate',
                key: 'test_rate',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            label: '发布',
            prop: 'on',
            key: 'on',
            width: '10%',
            children: [
              {
                label: '资源',
                prop: 'on_time',
                key: 'on_time',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                label: '效率',
                prop: 'on_rate',
                key: 'on_rate',
                width: '5%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          }
        ],
        bug: [
          {
            title: '项目名称',
            prop: 'project',
            key: 'project',
            fixed: 'left',
            width: '20%'
          },
          {
            title: '代码量',
            prop: 'code',
            key: 'code',
            width: '20%'
          },
          {
            title: '总计',
            prop: 'total',
            key: 'total',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'total_num',
                key: 'total_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'total_rate',
                key: 'total_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '需求',
            prop: 'demand',
            key: 'demand',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'demand_num',
                key: 'demand_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'demand_rate',
                key: 'demand_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '设计',
            prop: 'design',
            key: 'design',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'jic_num',
                key: 'jic_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'jic_rate',
                key: 'jic_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '测试',
            prop: 'test',
            key: 'test',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'test_num',
                key: 'test_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'test_rate',
                key: 'test_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '发布',
            prop: 'on',
            key: 'on',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'on_num',
                key: 'on_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'on_rate',
                key: 'on_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          }
        ],
        bugWork: [
          {
            title: '项目名称',
            prop: 'operateSystem',
            key: 'operateSystem',
            width: '20%',
            fixed: 'left'
          },
          {
            title: '工作包',
            prop: 'work_package',
            key: 'work_package',
            width: '18%',
            fixed: 'left'
          },
          {
            title: '代码量',
            prop: 'code',
            key: 'code',
            width: '8%'
          },
          {
            title: '总计',
            prop: 'total',
            key: 'total',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'total_num',
                key: 'total_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'total_rate',
                key: 'total_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '需求',
            prop: 'demand',
            key: 'demand',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'demand_num',
                key: 'demand_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'demand_rate',
                key: 'demand_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '设计',
            prop: 'design',
            key: 'design',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'jic_num',
                key: 'jic_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'jic_rate',
                key: 'jic_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '测试',
            prop: 'test',
            key: 'test',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'test_num',
                key: 'test_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'test_rate',
                key: 'test_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          },
          {
            title: '发布',
            prop: 'on',
            key: 'on',
            width: '14%',
            children: [
              {
                title: '数量',
                prop: 'on_num',
                key: 'on_num',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              },
              {
                title: '缺陷率',
                prop: 'on_rate',
                key: 'on_rate',
                width: '7%',
                render: (text, row) => (text === undefined ? 0 : Math.round(text * 100) / 100)
              }
            ]
          }
        ],
        review: [
          {
            title: '项目名称',
            prop: 'project',
            key: 'project',
            width: 200,
            fixed: 'left'
          },
          {
            title: '工作包',
            prop: 'work_package',
            key: 'work_package',
            fixed: 'left',
            width: 100
          },
          {
            title: 'PTGTTM',
            prop: 'ptgttm',
            key: 'ptgttm',
            width: 100
          },
          {
            title: '代码量',
            prop: 'code',
            key: 'code',
            width: 100
          },
          {
            title: '评审总计',
            prop: 'all_num',
            key: 'all_num',
            width: 100
          },
          {
            title: '总计缺陷率',
            prop: 'all_rate',
            key: 'all_rate',
            width: 100
          },
          {
            title: '缺陷个数',
            prop: 'total_num',
            key: 'total_num',
            width: 100
          },
          {
            title: '缺陷率',
            prop: 'total_rate',
            key: 'total_rate',
            width: 100
          },
          {
            title: '需求缺陷',
            prop: 'demend_num',
            key: 'demend_num',
            width: 100
          },
          {
            title: '设计缺陷',
            prop: 'design_num',
            key: 'design_num',
            width: 100
          },
          {
            title: '软件意见个数',
            prop: 'software_num',
            key: 'software_num',
            width: 120
          },
          {
            title: '质量意见个数',
            prop: 'quality_num',
            key: 'quality_num',
            width: 120
          },
          {
            title: '可测试意见个数',
            prop: 'test_num',
            key: 'test_num',
            width: 120
          },
          {
            title: '设计与需求不一致个数',
            prop: 'design_no_num',
            key: 'design_no_num',
            width: 180
          },
          {
            title: '需求与原始需求不一致个数',
            prop: 'demend_no_num',
            key: 'demend_no_num',
            width: 200
          }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.queryByAssemblyDate(this.project)
      this.queryByAssemblySummary(this.project)
      this.queryByAssemblyBug(this.project)
      this.queryByAssemblyBugWork(this.project)
      this.queryByAssemblyReviewWorkPackage(this.project, '组件项目')
    },
    // 获取里程碑表单数据
    async queryByAssemblyDate(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByAssemblyDate', {
        params: {
          project
        }
      })
      this.tableDataMap.milestone = res
    },
    // 获取资源统计表单数据
    async queryByAssemblySummary(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByAssemblySummarySta', {
        params: {
          project
        }
      })
      this.tableDataMap.resource = res
    },
    // 获取BUG统计表单数据
    async queryByAssemblyBug(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByAssemblyBugSta', {
        params: {
          project
        }
      })
      this.tableDataMap.bug = res
    },
    // 获取BUG工作包数据
    async queryByAssemblyBugWork(project) {
      const { data: res } = await request('/api/projectEvolveSta/queryByAssemblyBugWorkSta', {
        params: {
          project
        }
      })
      this.tableDataMap.bugWork = res
    },
    // 获取评审统计表单数据
    async queryByAssemblyReviewWorkPackage(project, type) {
      const { data: res } = await request('/api/projectEvolveSta/queryByProjectReviewWorkPackage', {
        params: {
          project,
          type
        }
      })
      this.tableDataMap.review = res
    }
  }
}
</script>

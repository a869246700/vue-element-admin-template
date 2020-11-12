<template>
  <el-card id="add-project" style="margin: 20px">
    <transition name="page-fade" mode="out-in">
      <!-- baseinfo -->
      <el-form
        v-if="active === 0"
        ref="baseInfoFormRef"
        :model="temp"
        :rules="rules"
        label-position="right"
        class="base-info-page"
      >
        <el-row :gutter="20">
          <el-col :span="8" style="border-right: 1px solid #ccc">
            <div class="title">项目基础属性设置</div>
            <el-form-item label="项目名称" prop="project" style="margin-top: 10px">
              <el-input
                v-model.trim="temp.project"
                placeholder="请输入项目名称"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="项目类型" prop="type">
              <el-select v-model="temp.type" placeholder="请选择项目类型" style="width: 100%">
                <el-option key="single" label="单阶段" value="单阶段" />
                <el-option key="multiple" label="多阶段" value="多阶段" />
                <el-option key="maintain" label="维护阶段" value="维护阶段" />
              </el-select>
            </el-form-item>
            <el-form-item label="项目需求&业务目标简介" prop="project_demand">
              <el-input
                v-model.trim="temp.project_demand"
                type="textarea"
                :rows="5"
                placeholder="请输入项目需求&业务目标简介"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <div class="title">项目主要角色</div>
            <el-form-item label="项目PTM" prop="ptm" style="margin-top: 10px">
              <el-select
                ref="ptmDomRef"
                v-model="temp.ptm"
                filterable
                clearable
                placeholder="请输入项目PTM"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="项目PTGTTL" prop="ptgttl">
              <el-select
                v-model="temp.ptgttl"
                filterable
                clearable
                placeholder="请输入项目PTGTTL"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="项目PTTL" prop="pttl">
              <el-select
                v-model="temp.pttl"
                filterable
                clearable
                placeholder="请输入项目PTTL"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="项目PTGTTM" prop="ptgttm">
              <el-select
                v-model="temp.ptgttm"
                filterable
                clearable
                placeholder="请输入项目PTGTTM"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="authority">
            <div class="title">权限管理</div>
            <div>1. PTM拥有的权限。。。</div>
            <div>2. PTGTTL拥有的权限。。。</div>
            <div>3. PTTL拥有的权限。。。</div>
            <div>4. PTGTTM拥有的权限。。。</div>
            <div>5. PTTE拥有的权限。。。</div>
          </el-col>
        </el-row>
        <div class="milestone">

          <!-- 项目阶段里程碑 -->
          <el-table
            :key="tableKey"
            :data="milestoneList"
            border
            :header-cell-style="{ background: '#f6f6f6' }"
            style="width: 100%;margin-top:10px;"
          >
            <el-table-column
              v-if="isMutiStage"
              key="project"
              label="项目名"
              show-overflow-tooltip
              prop="project"
              min-width="100"
            >
              <template slot-scope="{row, $index}">
                <div v-if="$index === 0">{{ row.project }}</div>
                <el-input v-else-if="$index === 1" v-model.trim="row.project" />
                <el-input v-else-if="$index === 2" v-model.trim="row.project" />
                <!-- <el-input v-else-if="$index === 2" v-model.trim="row.project" :disabled="!milestoneList[1].project" /> -->
              </template>
            </el-table-column>

            <el-table-column key="planDate" label="计划启动时间" prop="planDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.planDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(undefined, row.demandDate)"
                  :disabled="!row.project"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="demandDate" label="需求启动时间" prop="demandDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.demandDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.planDate, row.designDate)"
                  :disabled="!row.planDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="designDate" label="设计启动时间" prop="designDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.designDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.demandDate, row.admittanceDate)"
                  :disabled="!row.demandDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="admittanceDate" label="准入启动时间" prop="admittanceDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.admittanceDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.designDate, row.testFirstDate)"
                  :disabled="!row.designDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="testFirstDate" label="首轮测试启动时间" prop="testFirstDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.testFirstDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.admittanceDate, row.testSecondDate)"
                  :disabled="!row.admittanceDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="testSecondDate" label="次轮测试启动时间" prop="testSecondDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.testSecondDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.testFirstDate, row.regressionDate)"
                  :disabled="!row.testFirstDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="regressionDate" label="首轮回归启动时间" prop="regressionDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.regressionDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.testSecondDate, row.regressionSecondDate)"
                  :disabled="!row.testSecondDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="regressionSecondDate" label="次轮回归启动时间" prop="regressionSecondDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.regressionSecondDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.regressionDate, row.onTrialDate)"
                  :disabled="!row.regressionDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="onTrialDate" label="试点启动时间" prop="onTrialDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.onTrialDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.regressionSecondDate, row.onTrialEndDate)"
                  :disabled="!row.regressionSecondDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>

            <el-table-column key="onTrialEndDate" label="试点结束时间" prop="onTrialEndDate" min-width="160">
              <template slot-scope="{row}">
                <el-date-picker
                  v-model="row.onTrialEndDate"
                  type="date"
                  :picker-options="calcDatePcikerOption(row.onTrialDate, undefined)"
                  :disabled="!row.onTrialDate"
                  :clearable="false"
                  class="inlineBlock"
                  style="width: 100%;"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="footer" style="padding-bottom: 10px;">
          <el-button type="primary" @click="handleSaveClick">保存</el-button>
        </div>

        <div class="footer">
          <el-button type="danger" @click="handleCancleClick">取消</el-button>
          <el-button type="primary" @click="handleNextClick">下一步</el-button>
        </div>
      </el-form>

      <!-- 模块选择页面 -->
      <div v-if="active === 1" class="model-select-page">
        <el-row :gutter="20">
          <el-col :span="4" class="model-menu-select">
            <div class="title">模块菜单管理</div>
            <div class="check-list">
              <span class="check">(勾选所需要的项目组件)</span>
              <div class="el-checkbox-group">
                <el-checkbox
                  v-for="(item, index) in checkSelectList"
                  :key="index"
                  v-model="item.checked"
                  :label="item.value"
                  @change="handleCheckboxChange(item, index)"
                >
                  {{ item.label }}
                </el-checkbox>
              </div>
            </div>
          </el-col>
          <el-col :span="20" class="model-menu-content">
            <el-tabs v-model="currentModel" tab-position="left">
              <el-tab-pane
                v-for="item in tabList"
                :key="item.value"
                :label="item.label"
                :name="item.value"
              >
                <tab-component :is="item.cName" :ref="item.ref" :project="temp.project" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <div class="footer">
          <el-button type="danger" @click="handleCancleClick">取消</el-button>
          <el-button type="info" @click="handlePreClick">上一步</el-button>
          <el-button type="success" @click="handleCompleteClick">完成</el-button>
        </div>
      </div>
    </transition>
  </el-card>
</template>

<script>
import request from '@/services/request'

import Progress from './Form/Progress'
import Quality from './Form/Quality'
import Cost from './Form/Cost'
import Risk from './Form/Risk'
import Task from './Form/Task'
import Technology from './Form/Technology'
import Integral from './Form/Integral'
import ProjectReport from './Form/ProjectReport'

export default {
  name: 'AddProject',
  components: { Progress, Quality, Cost, Risk, Task, Technology, Integral, ProjectReport },
  data() {
    return {
      active: 0,
      temp: {},
      rules: {
        project: [
          {
            required: true,
            message: '请填写项目名称',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请填写项目类型',
            trigger: 'change'
          }
        ],
        project_demand: [
          {
            required: true,
            message: '请填写项目需求&业务目标简介',
            trigger: 'blur'
          }
        ],
        ptm: [
          {
            required: true,
            message: '请填写PTM',
            trigger: 'change'
          }
        ],
        ptgttl: [
          {
            required: true,
            message: '请填写PTGTTL',
            trigger: 'change'
          }
        ],
        deviation: [
          {
            required: true,
            message: '请填写偏差率',
            trigger: 'blur'
          }
        ]
      },
      checkSelectList: [
        {
          value: '0',
          label: '进展管理',
          cName: 'Progress',
          ref: 'progressRef',
          checked: true
        },
        {
          value: '1',
          label: '质量管理',
          cName: 'Quality',
          ref: 'qualityRef',
          checked: true
        },
        {
          value: '2',
          label: '成本管理',
          cName: 'Cost',
          ref: 'costRef',
          checked: true
        },
        {
          value: '3',
          label: '风险管理',
          cName: 'Risk',
          ref: 'riskRef',
          checked: false
        },
        {
          value: '4',
          label: '测试任务',
          cName: 'Task',
          ref: 'taskRef',
          checked: false
        },
        {
          value: '5',
          label: '技术项目',
          cName: 'Technology',
          ref: 'technologyRef',
          checked: false
        },
        {
          value: '6',
          label: '积分考核',
          cName: 'Integral',
          ref: 'integralRef',
          checked: false
        },
        {
          value: '7',
          label: '项目报告推送',
          ref: 'projectReportRef',
          cName: 'ProjectReport',
          checked: false
        }
      ],
      currentModel: '0',
      userList: undefined, // 人员列表
      milestoneOptions: [
        {
          key: 'plan_start_date',
          label: '计划启动时间',
          prop: 'planStartDate'
        },
        {
          key: 'need_start_date',
          label: '需求启动时间',
          prop: 'needStartDate'
        },
        {
          key: 'desgin_start_date',
          label: '设计启动时间',
          prop: 'desginStartDate'
        },
        {
          key: 'zr_start_date',
          label: '准入启动时间',
          prop: 'zrStartDate'
        },
        {
          key: 'sl_start_date',
          label: '首轮测试启动时间',
          prop: 'slStartDate'
        },
        {
          key: 'cl_start_date',
          label: '次轮测试启动时间',
          prop: 'clStartDate'
        },
        {
          key: 'slhg_start_date',
          label: '首轮回归启动时间',
          prop: 'slhgStartDate'
        },
        {
          key: 'clhg_start_date',
          label: '次轮回归启动时间',
          prop: 'clhgStartDate'
        },
        {
          key: 'sd_start_date',
          label: '试点启动时间',
          prop: 'sdStartDate'
        },
        {
          key: 'sd_end_date',
          label: '试点结束时间',
          prop: 'sdEndDate'
        }
      ], // 里程碑表单头部
      milestoneFormTemp: {
        project: undefined,
        planDate: undefined,
        demandDate: undefined,
        designDate: undefined,
        admittanceDate: undefined,
        testFirstDate: undefined,
        testSecondDate: undefined,
        regressionDate: undefined,
        regressionSecondDate: undefined,
        onTrialDate: undefined,
        onTrialEndDate: undefined
      },
      milestoneList: [],
      tableKey: 0
    }
  },
  computed: {
    tabList() {
      return this.checkSelectList.filter((item) => item.checked)
    },
    isMutiStage() {
      return this.temp.type === '多阶段'
    }
  },
  watch: {
    // 观察项目类型是否为多阶段，如果为多阶段则
    'temp.type'(newV, oldV) {
      if (newV === '多阶段') {
        // 多阶段，默认3个、
        const temp1 = Object.assign({}, this.milestoneFormTemp)
        const temp2 = Object.assign({}, this.milestoneFormTemp)
        this.milestoneList.push(...[temp1, temp2])
      } else {
        // 单阶段或者维护阶段，判断里程碑数量
        if (this.milestoneList.length >= 1) {
          this.milestoneList = [this.milestoneList[0]]
        }
      }
    },
    // 观察项目名，里程碑第一个阶段的项目名为当前项目的项目名
    'temp.project'(newV, oldV) {
      this.milestoneList[0].project = newV
      this.tableKey++
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listUser()

      // 初始化里程碑
      const temp = Object.assign({}, this.milestoneFormTemp)
      this.milestoneList.push(temp)
    },
    // 点击添加里程碑数
    handleAddMilestoneClick() {
      if (this.temp.type === '2' && this.milestoneList.length < 3) {
        this.milestoneList.push({ ...this.milestoneFormTemp })
      }
    },
    // 计算 DatePicker 的选择范围
    calcDatePcikerOption(start, end) {
      if (start && end) {
        return {
          disabledDate: time => time.getTime() < +new Date(start) || time.getTime() > +new Date(end)
        }
      } else if (!start) {
        return {
          disabledDate: time => time.getTime() > +new Date(end)
        }
      } else if (!end) {
        return {
          disabledDate: time => time.getTime() < +new Date(start)
        }
      }
      return {}
    },
    handlePreClick() {
      this.active--
    },
    handleNextClick() {
      this.$refs.baseInfoFormRef.validate((valid) => {
        if (valid) {
          this.active++
        }
      })
    },
    // 校验里程碑时间是否填全
    validMileston() {
      const list = this.milestoneList
      const ptm = this.temp.ptm.split('-')
      let tempProject // 临时项目名

      for (const index in list) {
        const milestone = list[index]
        // 比较上一个项目名和当前行的项目名是否相同
        // 如果 相同则跳出
        if (tempProject && tempProject === milestone.project) {
          this.$message.error('填入的里程碑项目名相同，请检查！')
          return false
        }
        // 如果里程碑中，项目名不存在，则跳过
        if (!milestone.project || milestone.project === '') {
          continue
        }
        // 给临时项目名赋值
        tempProject = milestone.project

        for (const key in milestone) {
          // 如果填写了项目名，需要填写后面的全部
          if (key !== 'project' && !milestone[key]) {
            let message
            switch (key) {
              case 'planDate':
                message = '计划启动时间'
                break
              case 'demandDate':
                message = '需求启动时间'
                break
              case 'designDate':
                message = '设计启动时间'
                break
              case 'admittanceDate':
                message = '准入启动时间'
                break
              case 'testFirstDate':
                message = '首轮测试启动时间'
                break
              case 'testSecondDate':
                message = '次轮测试启动时间'
                break
              case 'regressionDate':
                message = '首轮回归启动时间'
                break
              case 'regressionSecondDate':
                message = '次轮回归启动时间'
                break
              case 'onTrialDate':
                message = '试点启动时间'
                break
              case 'onTrialEndDate':
                message = '试点结束时间'
                break
            }
            this.$message.error(`请填入项目名为${milestone['project']}的${message}！`)
            return false
          }
        }

        // 里程碑携带 ptm
        milestone.ptm = ptm.length === 1 ? ptm[0] : ptm[1]
      }
      return true
    },
    // 点击暂时保存
    handleSaveClick() {
      // 基础表单验证
      this.$refs.baseInfoFormRef.validate(async(valid) => {
        if (valid) {
          const validMileston = this.validMileston()
          // 里程碑表单验证
          if (!validMileston) {
            return false
          }

          // 过滤掉里程碑中项目名不存在的
          this.milestoneList = this.milestoneList.filter((item) => item.project)

          // 保存基本信息
          this.addRole()
          // 保存里程碑
          this.addDate()
          console.log('提交基本数据', this.temp)
          console.log('提交里程碑数据', this.milestoneList)
        }
      })
    },
    // 监听checkbox值改变
    handleCheckboxChange(item, index) {
      // 1. 如果 checkbox 的绑定项的 checked 修改为 false
      // 2. 判断 item.value 是不是与 currentModel 的值相等
      if (!item.checked && item.value === this.currentModel) {
        // 3. 判断是否在这个元素之前是否有checked为true的元素
        let temp = null
        for (const i in this.checkSelectList) {
          // 如果在此之前不存在，则不存在
          if (i >= index) {
            break
          }
          if (this.checkSelectList[i].checked) {
            temp = this.checkSelectList[i]
          }
        }
        // 如果在此之前找到checked为true,且是最后一个找到的，则将currentModel赋值为item.value
        if (temp) {
          this.currentModel = temp.value
        } else {
          this.currentModel = this.tabList.length > 0 ? this.tabList[0].value : '0'
        }
      } else if (item.checked && this.tabList.length === 1) {
        // 在勾选时，当所有checked都是false的情况下
        this.currentModel = item.value
      }
    },
    // 点击取消，确认取消按钮
    handleCancleClick() {
      this.$confirm('确定取消创建项目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      })
        .then(() => {
          // 1. 调用删除项目的接口
          // 2. 返回上一级
          this.$store.dispatch('tagsView/delView', this.$route)
          this.$router.go(-1)
        })
        .catch(() => {})
    },
    //  点击完成按钮
    async handleCompleteClick() {
      // 1.当前表单组件进行校验
      const existComponents = this.$refs

      for (const key in existComponents) {
        if (
          existComponents[key] &&
          existComponents[key].length !== 0 &&
          existComponents[key][0].validate
        ) {
          // 调用检测方法
          const result = existComponents[key][0].validate()
          // 没通过校验
          if (!result) {
            const failedCheck = this.checkSelectList.find((ele) => {
              return ele.ref === key
            })

            this.currentModel = failedCheck.value // 未通过的只想未通过
            return
          }
        }
      }

      // 2.每个表单组件进行取值
      this.handleSaveClick()
      for (const key in existComponents) {
        if (
          existComponents[key] &&
          existComponents[key].length !== 0 &&
          existComponents[key][0].handleSaveClick
        ) {
          // 调用保存方法
          existComponents[key][0].handleSaveClick()
        }
      }

      // 返回页面
      // this.$store.dispatch('tagsView/delView', this.$route)
      // this.$router.push('/efficacyEvolve/project_line/12x_project_test')
    },
    // 获取人员列表
    async listUser() {
      const { data: res } = await request('/api/authority/user/listPlatformTestUserSelect')
      this.userList = res
    },
    // 保存基本信息
    async addRole() {
      const { data: res } = await request('api/projectEvolveSta/projectInfo/addRole', {
        method: 'POST',
        data: this.temp
      })
      console.log(res)
    },
    // 保存里程碑信息
    async addDate() {
      const { data: res } = await request('api/projectEvolveSta/projectInfo/addDate', {
        method: 'POST',
        data: this.milestoneList
      })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
#add-project {
  .el-row {
    padding-bottom: 15px;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;

  .el-form-item:nth-child(n + 1) {
    width: 60%;
  }
  .el-form-item:nth-child(2n) {
    width: 40%;
  }
}

.title {
  font-size: 15px;
  color: #888;
  font-weight: 600;
}

.el-form-item {
  margin-bottom: 12px !important;
}

.authority {
  div {
    margin-top: 10px;
  }

  .title {
    font-size: 15px;
    color: #888;
    font-weight: 600;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  margin: 0 2px;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}

.page-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

.model-select-page {
  font-size: 15px;
  font-weight: 600;

  .model-menu-select {
    height: 100%;

    .title {
      font-size: 16px;
      color: #888;
    }

    .check-list {
      margin-top: 10px;
    }

    .check {
      display: inline-block;
      color: #000;
      margin-bottom: 10px;
    }

    .el-checkbox-group {
      padding-left: 15px;

      .el-checkbox {
        display: block;
      }
    }
  }

  .model-menu-content {
    border-left: 1px solid #ccc;
  }
}

// 里程碑
.milestone {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin: 0 2px;

  .flex {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

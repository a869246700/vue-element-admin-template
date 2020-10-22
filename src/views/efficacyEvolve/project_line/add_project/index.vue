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
          <el-col :span="10" style="border-right: 1px solid #ccc">
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
                <el-option key="single" label="单阶段" value="1" />
                <el-option key="multiple" label="多阶段" value="2" />
                <el-option key="maintain" label="维护阶段" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="项目需求&业务目标简介" prop="need">
              <el-input
                v-model.trim="temp.need"
                type="textarea"
                :rows="5"
                placeholder="请输入项目需求&业务目标简介"
              />
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <div class="title">项目主要角色</div>
            <el-form-item label="项目PTM" prop="ptm" style="margin-top: 10px">
              <el-input v-model.trim="temp.ptm" placeholder="请输入项目PTM" />
            </el-form-item>
            <el-form-item label="项目PTGTTL" prop="ptgttl">
              <el-input v-model.trim="temp.ptgttl" placeholder="请输入项目PTGTTL" />
            </el-form-item>
            <el-form-item label="项目PTTL" prop="pttl">
              <el-input v-model.trim="temp.pttl" placeholder />
            </el-form-item>
            <el-form-item label="项目PTGTTM" prop="ptgttm">
              <el-input v-model.trim="temp.ptgttm" placeholder />
            </el-form-item>
          </el-col>

          <el-col :span="7" class="authority">
            <div class="title">权限管理</div>
            <div>1. PTM拥有的权限。。。</div>
            <div>2. PTGTTL拥有的权限。。。</div>
            <div>3. PTTL拥有的权限。。。</div>
            <div>4. PTGTTM拥有的权限。。。</div>
            <div>5. PTTE拥有的权限。。。</div>
          </el-col>
        </el-row>
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
        need: [
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
            trigger: 'blur'
          }
        ],
        ptgttl: [
          {
            required: true,
            message: '请填写PTGTTL',
            trigger: 'blur'
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
      currentModel: '0'
    }
  },
  computed: {
    tabList() {
      return this.checkSelectList.filter((item) => item.checked)
    }
  },
  methods: {
    handlePreClick() {
      this.active--
    },
    handleNextClick() {
      if (this.active === 0) {
        this.$refs.baseInfoFormRef.validate((valid) => {
          if (valid) {
            this.active++
          }
        })
      }
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
      const params = {
        base: this.temp,
        progress:
          this.$refs.progressRef && this.$refs.progressRef.length !== 0
            ? this.$refs.progressRef[0].temp
            : null,
        quality:
          this.$refs.qualityRef && this.$refs.qualityRef.length !== 0
            ? this.$refs.qualityRef[0].temp
            : null,
        cost:
          this.$refs.costRef && this.$refs.costRef.length !== 0 ? this.$refs.costRef[0].temp : null,
        technology:
          this.$refs.technologyRef && this.$refs.technologyRef.length !== 0
            ? this.$refs.technologyRef[0].temp
            : null
      }
      console.log(params)

      // 返回页面
      // this.$store.dispatch('tagsView/delView', this.$route)
      // this.$router.push('/efficacyEvolve/project_line/12x_project_test')
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
  padding-top: 15px;
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
</style>

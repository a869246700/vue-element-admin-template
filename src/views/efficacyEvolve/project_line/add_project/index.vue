<template>
  <el-card id="add-project" style="margin: 20px">
    <el-form ref="addFormRef" :model="temp" :rules="rules" label-position="right">
      <transition name="page-fade" mode="out-in">
        <!-- baseinfo -->
        <div v-if="active === 0" class="base-info-page">
          <el-row :gutter="20">
            <el-col :span="12" style="border-right: 1px solid #ccc">
              <div class="title">项目基础属性设置</div>
              <el-form-item label="项目名称" prop="project" style="margin-top: 10px">
                <el-input
                  v-model.trim="temp.project"
                  size="small"
                  placeholder="请输入项目名称"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="项目类型" prop="type">
                <el-input v-model.trim="temp.type" size="small" placeholder="请输入项目类型" />
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

            <el-col :span="6">
              <div class="title">项目主要角色</div>
              <el-form-item label="项目PTM" prop="ptm" style="margin-top: 10px">
                <el-input v-model.trim="temp.ptm" size="small" placeholder="请输入项目PTM" />
              </el-form-item>
              <el-form-item label="项目PTGTTL" prop="ptgttl">
                <el-input v-model.trim="temp.ptgttl" size="small" placeholder="请输入项目PTGTTL" />
              </el-form-item>
              <el-form-item label="项目PTTL" prop="pttl">
                <el-input v-model.trim="temp.pttl" size="small" placeholder />
              </el-form-item>
              <el-form-item label="项目PTGTTM" prop="ptgttm">
                <el-input v-model.trim="temp.ptgttm" size="small" placeholder />
              </el-form-item>
            </el-col>

            <el-col :span="6" class="authority">
              <div class="title">权限管理</div>
              <div>1. PTM拥有的权限。。。</div>
              <div>2. PTGTTL拥有的权限。。。</div>
              <div>3. PTTL拥有的权限。。。</div>
              <div>4. PTGTTM拥有的权限。。。</div>
              <div>5. PTTE拥有的权限。。。</div>
            </el-col>
          </el-row>
          <div class="footer">
            <el-button type="primary" @click="handleNextClick">下一步</el-button>
          </div>
        </div>

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
                  >
                    {{ item.label }}
                  </el-checkbox>
                </div>
              </div>
            </el-col>
            <el-col :span="20" class="model-menu-content">
              <el-tabs v-model="currentModel" tab-position="left">
                <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label">
                  <tab-component :is="item.cName" />
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <div class="footer">
            <el-button type="primary" @click="handlePreClick">上一步</el-button>
            <el-button type="primary" @click="handleNextClick">下一步</el-button>
          </div>
        </div>
      </transition>
    </el-form>
  </el-card>
</template>

<script>
import Progress from './Form/Progress'
import Quality from './Form/Quality'
import Cost from './Form/Cost'

const rules = {
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
      trigger: 'blur'
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
}

export default {
  components: { Progress, Quality, Cost },
  data() {
    return {
      active: 1,
      temp: {},
      rules,
      checkSelectList: [
        {
          value: '0',
          label: '进展管理',
          cName: 'Progress',
          checked: true
        },
        {
          value: '1',
          label: '质量管理',
          cName: 'Quality',
          checked: true
        },
        {
          value: '2',
          label: '成本管理',
          cName: 'Cost',
          checked: true
        },
        {
          value: '3',
          label: '风险管理',
          cName: 'Risk',
          checked: false
        },
        {
          value: '4',
          label: '测试任务',
          cName: 'Task',
          checked: false
        },
        {
          value: '5',
          label: '技术项目',
          cName: 'Technology',
          checked: false
        },
        {
          value: '6',
          label: '积分考核',
          cName: 'Integral',
          checked: false
        },
        {
          value: '7',
          label: '项目报告推送',
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
      this.active++
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

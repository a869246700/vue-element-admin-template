<template>
  <el-card>
    <el-form ref="addFormRef" :model="temp" :rules="rules" label-position="right">
      <el-row :gutter="20" style="border-bottom: 1px solid #ccc; padding-bottom: 15px;">
        <el-col :span="10" style="border-right: 1px solid #ccc;">
          <div class="title">项目基础属性设置</div>
          <el-form-item label="项目名称" prop="project" style="margin-top: 10px;">
            <el-input
              v-model.trim="temp.project"
              size="small"
              placeholder="请输入项目名称"
              style="width: 100%;"
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

        <el-col :span="8">
          <div class="title">项目主要角色</div>
          <el-form-item label="项目PTM" prop="ptm" style="margin-top: 10px;">
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

        <el-col :span="6">待填写</el-col>
      </el-row>

      <div class="title" style="margin: 5px 0; display: flex; align-items: center;">
        <span style="margin-right: 10px;">项目承诺</span>
        <span>整个里程碑&计划</span>
        <el-form-item
          label="偏差率"
          prop="deviation"
          :inline-message="true"
          style="margin: 14px 10px; flex: 1;"
        >
          <el-input
            v-model.trim="temp.deviation"
            size="mini"
            placeholder="请填写偏差率"
            style="width: 120px;"
          />
        </el-form-item>
      </div>

      <div style="margin-top: 10px; display: flex; min-width: 1300px;">
        <div style="width: 450px;">
          <div class="title" style="margin-left:80px;">EC承诺</div>
          <div style="color: #000; margin-left: 80px; margin-top: 10px; font-size: 14px;">
            <span>计划启动时间</span>
            <span style="margin-left: 110px;">计划结束时间</span>
          </div>
          <div class="flex">
            <el-form-item
              v-for="(item, index) in ecPromiseOptions"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              style="margin-top: 10px;"
              :label-width="item.label ? '78px' : ''"
            >
              <el-date-picker
                v-model="temp[item.prop]"
                type="datetime"
                size="mini"
                style="width: 180px;"
              />
            </el-form-item>
          </div>
        </div>

        <div style="margin-left: 45px; width: 325px;">
          <div class="title">内测承诺</div>
          <div style="color: #000; margin-top: 10px; font-size: 14px;">
            <span>计划启动时间</span>
            <span style="margin-left: 110px;">计划结束时间</span>
          </div>

          <div class="flex">
            <el-form-item
              v-for="(item, index) in ncPromiseOptions"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              style="margin-top: 10px;"
            >
              <el-date-picker
                v-model="temp[item.prop]"
                type="datetime"
                size="mini"
                style="width: 180px;"
              />
            </el-form-item>
          </div>
        </div>

        <div style="margin-left: 90px; width: 325px;">
          <div class="title">内测实际</div>
          <div style="color: #000; margin-top: 10px; font-size: 14px;">
            <span>实际启动时间</span>
            <span style="margin-left: 110px;">实际结束时间</span>
          </div>

          <div class="flex">
            <el-form-item
              v-for="(item, index) in ncActualOptions"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              style="margin-top: 10px;"
            >
              <el-date-picker
                v-model="temp[item.prop]"
                type="datetime"
                size="mini"
                style="width: 180px;"
              />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <div class="footer">
      <el-button type="primary" @click="handleCreateClick">下一步</el-button>
    </div>
  </el-card>
</template>

<script>
const ZrValid = (rules, value, callback) => {
  callback()
}
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
  ],
  ec_zr_plan_start_date: [
    {
      required: true,
      message: '请选择计划启动时间',
      trigger: 'change'
    },
    {
      validator: ZrValid,
      trigger: 'change'
    }
  ],
  ec_zr_plan_end_date: [
    {
      required: true,
      message: '请选择计划结束时间',
      trigger: 'change'
    }
  ],
  ec_sl_plan_start_date: [
    {
      required: true,
      message: '请选择计划启动时间',
      trigger: 'change'
    }
  ],
  ec_sl_plan_end_date: [
    {
      required: true,
      message: '请选择计划结束时间',
      trigger: 'change'
    }
  ],
  ec_cl_plan_start_date: [
    {
      required: true,
      message: '请选择计划启动时间',
      trigger: 'change'
    }
  ],
  ec_cl_plan_end_date: [
    {
      required: true,
      message: '请选择计划结束时间',
      trigger: 'change'
    }
  ],
  ec_slhg_plan_start_date: [
    {
      required: true,
      message: '请选择计划启动时间',
      trigger: 'change'
    }
  ],
  ec_slhg_plan_end_date: [
    {
      required: true,
      message: '请选择计划结束时间',
      trigger: 'change'
    }
  ],
  ec_clhg_plan_start_date: [
    {
      required: true,
      message: '请选择计划启动时间',
      trigger: 'change'
    }
  ],
  ec_clhg_plan_end_date: [
    {
      required: true,
      message: '请选择计划结束时间',
      trigger: 'change'
    }
  ]
}

export default {
  data() {
    return {
      dialogVisible: true,
      temp: {},
      ecPromiseOptions: [
        {
          prop: 'ec_zr_plan_start_date',
          label: '准入测试'
        },
        {
          prop: 'ec_zr_plan_end_date'
        },
        {
          prop: 'ec_sl_plan_start_date',
          label: '首轮测试'
        },
        {
          prop: 'ec_sl_plan_end_date'
        },
        {
          prop: 'ec_cl_plan_start_date',
          label: '次轮测试'
        },
        {
          prop: 'ec_cl_plan_end_date'
        },
        {
          prop: 'ec_slhg_plan_start_date',
          label: '首轮回归'
        },
        {
          prop: 'ec_slhg_plan_end_date'
        },
        {
          prop: 'ec_clhg_plan_start_date',
          label: '次轮回归'
        },
        {
          prop: 'ec_clhg_plan_end_date'
        }
      ],
      ncPromiseOptions: [
        {
          prop: 'zr_plan_start_date'
        },
        {
          prop: 'zr_plan_end_date'
        },
        {
          prop: 'sl__plan_start_date'
        },
        {
          prop: 'sl_plan_end_date'
        },
        {
          prop: 'cl_plan_start_date'
        },
        {
          prop: 'cl_plan_end_date'
        },
        {
          prop: 'slhg_plan_start_date'
        },
        {
          prop: 'slhg_plan_end_date'
        },
        {
          prop: 'clhg_plan_start_date'
        },
        {
          prop: 'clhg_plan_end_date'
        }
      ],
      ncActualOptions: [
        {
          prop: 'zr_actual_start_date'
        },
        {
          prop: 'zr_actual_end_date'
        },
        {
          prop: 'sl_actual_start_date'
        },
        {
          prop: 'sl_actual_end_date'
        },
        {
          prop: 'cl_actual_start_date'
        },
        {
          prop: 'cl_actual_end_date'
        },
        {
          prop: 'slhg_actual_start_date'
        },
        {
          prop: 'slhg_actual_end_date'
        },
        {
          prop: 'clhg_actual_start_date'
        },
        {
          prop: 'clhg_actual_end_date'
        }
      ],
      rules
    }
  },
  methods: {
    resetTemp() {
      this.temp = {}
    },
    handleCreateClick() {
      console.log(this.temp)
    }
  }
}
</script>

<style lang="scss" scoped>
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

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

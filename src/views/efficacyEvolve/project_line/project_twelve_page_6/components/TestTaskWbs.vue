<template>
  <div class="risk-wbs">
    <h3>WBS区域</h3>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="treeList"
      style="width: 100%"
      row-key="id"
      :header-cell-style="{background: '#f6f6f6'}"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      fit
      border
    >
      <el-table-column :key="key" prop="name" label="任务名" min-width="220" show-overflow-tooltip>
        <template #header>
          <div class="task-name">
            <span>任务名</span>
            <el-popover placement="bottom" width="50" trigger="click">
              <div class="operation">
                <div @click="handleCreateClick()">新增</div>
              </div>
              <i slot="reference" class="el-icon-more" />
            </el-popover>
          </div>
        </template>

        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
          <el-popover placement="bottom" width="50" trigger="click">
            <div class="operation">
              <div @click="handleEditClick(row)">编辑</div>
              <div @click="handleCreateClick(row)">新增</div>
              <div @click="handleDeleteClick(row)">删除</div>
            </div>
            <i slot="reference" class="el-icon-more operation-icon" />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="principal" label="负责人" min-width="100" show-overflow-tooltip>
        <template slot-scope="{row}">
          <div class="principal">
            <img :src="`http://oa.ruijie.com.cn/ImgUser/${row.userInfo.userEn}.jpg`">
            <span class="principal-desc">{{ row | principalFilter }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-for="item in tableOptions"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
      >
        <template slot-scope="{row}">
          <span
            v-if="item.prop === 'planStartDate' || item.prop === 'planEndDate'"
          >{{ new Date(row[item.prop]) | parseTime('{y}-{m}-{d}') }}</span>

          <div v-else-if="item.prop === 'priority'">
            <el-tag
              :type="Number(row[item.prop]) === 1 ? 'danger' : Number(row[item.prop]) === 2 ? 'warning' : 'success'"
              effect="dark"
            >
              {{ row[item.prop] | priorityFilter }}
            </el-tag>
          </div>

          <span v-else-if="item.prop === 'progress' || item.prop === 'deviation'">{{ row[item.prop] && row[item.prop] + '%' }}</span>

          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form
        ref="dataFormRef"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="120px"
        style="width: 60%; margin: 0 auto;"
      >
        <el-form-item label="任务名" prop="name">
          <el-input v-model.trim="temp.name" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="负责人" prop="principal">
          <el-select
            v-model="temp.principal"
            filterable
            clearable
            placeholder="请输入主要负责人"
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

        <el-form-item label="次要负责人" prop="secondary">
          <el-select
            v-model="temp.secondary"
            filterable
            clearable
            placeholder="请输入次要负责人"
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

        <el-form-item label="计划开始时间" prop="planStartDate">
          <el-date-picker
            :key="key"
            v-model="temp.planStartDate"
            type="date"
            placeholder="选择开始日期"
            :default-value="defaultDate"
            :picker-options="startPickerOption"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="计划结束时间" prop="planEndDate">
          <el-date-picker
            :key="key"
            v-model="temp.planEndDate"
            type="date"
            placeholder="选择结束日期"
            :default-value="defaultDate"
            :picker-options="endPickerOption"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
          <el-select v-model="temp.priority" placeholder="请选择优先级" style="width: 100%">
            <el-option
              v-for="(item, index) in prioritySelectOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
              <div class="select-item">
                <i class="dot" :style="{ background: item.bg }" />
                <span>{{ item.label }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="dialogStatus === 'update'" label="进度" prop="progress">
          <el-select v-model="temp.progress" placeholder="请选择进度" style="width: 100%">
            <el-option
              v-for="(item, index) in progressSelectOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="偏差" prop="deviation">
          <el-input-number v-model="temp.deviation" :min="0" :max="100" style="width: 100%" />
        </el-form-item>

        <el-form-item label="任务描述" prop="remark">
          <el-input v-model.trim="temp.remark" type="textarea" autosize style="width: 100%" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/services/request'
import { parseTime, toTree } from '@/utils'

export default {
  filters: {
    principalFilter(row) {
      return row.position ? row.principal + '-' + row.position : row.principal
    },
    priorityFilter(value) {
      switch (Number(value)) {
        case 1:
          return 'High'
        case 2:
          return 'Medium'
        case 3:
          return 'Low'
      }
    },
    parseTime
  },
  props: {
    project: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      key: 0,
      listLoading: false, // 是否在加载
      treeList: [],
      arrayList: [],
      tableOptions: [
        {
          prop: 'planStartDate',
          label: '计划开始时间',
          minWidth: '140'
        },
        {
          prop: 'planEndDate',
          label: '计划结束时间',
          minWidth: '140'
        },
        {
          prop: 'priority',
          label: '优先级',
          minWidth: '80'
        },
        {
          prop: 'progress',
          label: '进度',
          minWidth: '80'
        },
        {
          prop: 'deviation',
          label: '偏差',
          minWidth: '80'
        },
        {
          prop: 'remark',
          label: '备注',
          minWidth: '160'
        }
      ], // 表单列配置
      temp: {
        id: undefined,
        name: undefined, // 任务名称
        principal: undefined, // 责任人
        planStartDate: undefined, // 计划开始时间
        planEndDate: undefined, // 计划结束时间
        priority: undefined, // 优先级
        progress: 0, // 进度
        deviation: undefined, // 偏差
        remark: undefined // 备注
      }, // 添加和编辑的临时变量
      textMap: {
        update: '编辑',
        create: '添加'
      }, // 对话框的标题
      dialogStatus: '', // 对话框的状态
      dialogVisible: false, // 编辑对话框的显示与隐藏
      // 优先级 select 配置项
      prioritySelectOptions: [
        { label: 'High', value: 1, bg: 'red' },
        { label: 'Medium', value: 2, bg: 'orange' },
        { label: 'Low', value: 3, bg: 'green' }
      ],
      progressSelectOptions: [
        { label: '0%', value: 0 },
        { label: '10%', value: 10 },
        { label: '20%', value: 20 },
        { label: '30%', value: 30 },
        { label: '40%', value: 40 },
        { label: '50%', value: 50 },
        { label: '60%', value: 60 },
        { label: '70%', value: 70 },
        { label: '80%', value: 80 },
        { label: '90%', value: 90 },
        { label: '100%', value: 100 }
      ],
      startPickerOption: undefined,
      endPickerOption: undefined,
      defaultDate: undefined,
      userList: [] // 用户列表，用于新增修改任务
    }
  },
  computed: {
    rules() {
      // 开始时间校验
      const validateStartDate = (rule, value, callback) => {
        if (this.temp.planEndDate) {
          const start = +new Date(value)
          const end = +new Date(this.temp.planEndDate)

          start > end ? callback(new Error('开始时间必须小于结束时间')) : callback()
        } else {
          callback()
        }
      }
      // 结束时间校验
      const validateEndDate = (rule, value, callback) => {
        if (this.temp.planStartDate) {
          const start = +new Date(this.temp.planStartDate)
          const end = +new Date(value)

          start > end ? callback(new Error('开始时间必须小于结束时间')) : callback()
        } else {
          callback()
        }
      }

      return {
        name: [{ required: true, message: '请填写任务名', trigger: 'blur' }],
        principal: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
        planStartDate: [
          { required: true, message: '请选择计划开始时间', trigger: 'change' },
          { validator: validateStartDate, trigger: 'change' }
        ],
        planEndDate: [
          { required: true, message: '请选择计划结束时间', trigger: 'change' },
          { validator: validateEndDate, trigger: 'change' }
        ],
        priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
        progress: [{ required: true, message: '请选择进展度', trigger: 'change' }],
        deviation: [{ required: true, message: '请填写偏差', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getWbsTaskList()
      this.getUserList()
    },
    // 点击编辑按钮
    handleEditClick(row) {
      // 显示编辑对话框
      this.dialogStatus = 'update'
      this.dialogVisible = true

      this.temp = Object.assign({}, row) // 复制对象
      // 如果有父节点，则控制编辑时间范围为父任务时间范围内
      if (row.parent || row.parent !== 0) {
        // 查询否节点
        const parentNode = this.arrayList.find(e => e.id === row.parent)
        this.setDatePickerOption(parentNode.planStartDate, parentNode.planEndDate)
      } else {
        // 如果没有，则判断是否有子节点，无则重置
        const children = this.arrayList.filter(e => e.parent === row.id)
        if (children.length === 0) {
          // console.log('重置')
          this.resetDatePickerOption()
        } else {
          // console.log('根据子任务的最小开始日期和最大结束日期设置')
          // 获取最小开始日期和最大结束日期
          let minStart
          let maxEnd
          children.forEach(item => {
            if (minStart && maxEnd) {
              // 进行判断大小
              minStart = minStart > item.planStartDate ? item.planStartDate : minStart
              maxEnd = maxEnd < item.planEndDate ? item.planEndDate : maxEnd
            } else {
              minStart = item.planStartDate
              maxEnd = item.planEndDate
            }
          })
          // 最大开始不得大于minStart
          // 最小结束不得小于maxEnd
          // console.log('min:', minStart, 'max', maxEnd)
          // 最终进行设置时间选择器
          this.startPickerOption = {
            disabledDate: (time) => {
              return time.getTime() > this.toDate(minStart)
            }
          }

          this.endPickerOption = {
            disabledDate: (time) => {
              return time.getTime() < this.toDate(maxEnd)
            }
          }
        }
        this.defaultDate = row.planStartDate
      }
      // 格式化时间
      this.temp.createTime = this.toDate(this.temp.createTime)
      this.temp.planStartDate = this.toDate(this.temp.planStartDate)
      this.temp.planEndDate = this.toDate(this.temp.planEndDate)
      this.temp.actualStartDate = this.toDate(this.temp.actualStartDate)
      this.temp.actualEndDate = this.toDate(this.temp.actualEndDate)
      this.temp.progress = Number(this.temp.progress)
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate() // 清除原有的校验内容
      })
    },
    // 进行真正的修改数据
    updateData() {
      // 1. 表单校验
      this.$refs.dataFormRef.validate(async(valid) => {
        if (valid) {
          // 1. 进行请求
          const { data: res } = await request('/api/projectTestTask/updateTestTask', {
            method: 'POST',
            data: this.temp
          })

          // 2. 提示修改成功
          if (res === 1) {
            this.$message.success('修改成功')
            // 重新获取页面
            this.$emit('reload')
            this.getWbsTaskList()
          } else {
            this.$message.error('修改失败')
          }

          this.$nextTick(() => {
            // 4. 隐藏添加窗口
            this.dialogVisible = false
          })
        }
      })
    },
    // 点击添加按钮
    handleCreateClick(row) {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.resetDatePickerOption()

      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate() // 清除原有的校验内容
      })

      if (row) {
        this.setDatePickerOption(row.planStartDate, row.planEndDate)
        this.temp.parent = row.id
        this.temp.path = row.path
      } else {
        this.defaultDate = new Date()
        this.temp.parent = 0
        this.temp.path = ''
      }
      this.temp.project = this.project
    },
    // 进行真正的添加数据
    createData() {
      // 1. 表单校验
      this.$refs.dataFormRef.validate(async(valid) => {
        if (valid) {
          // 增加创建人和创建时间
          this.temp.createName = this.$store.state.user.name
          this.temp.createTime = new Date()
          // 设置任务类型
          this.temp.type = '任务类型一'

          const { data: res } = await request('/api/projectTestTask/insertTestTask', {
            method: 'POST',
            data: this.temp
          })

          if (res === 1) {
            this.$message.success('添加成功')
            this.$emit('reload')
            // 重新获取页面
            this.getWbsTaskList()
          } else {
            this.$message.error('添加失败')
          }
          this.$nextTick(() => {
            this.dialogVisible = false
          })
        }
      })
    },
    // 点击删除
    async handleDeleteClick(row) {
      this.$confirm('删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { data: res } = await request('/api/projectTestTask/deleteTestTask', {
            params: {
              id: row.id
            }
          })
          if (res === 0) {
            this.$message.error('删除失败, 存在子任务!')
          } else {
            this.$message.success('删除成功')
            // 重新加载页面
            this.getWbsTaskList()
            this.$emit('reload') // 提示WBS重新加载
          }
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    // 设置时间选择器格式
    setDatePickerOption(start, end) {
      const startTime = +new Date(start) - 86400000
      const endTime = +new Date(end)
      const option = {
        disabledDate: (time) => {
          return time.getTime() < startTime || time.getTime() > endTime
        }
      }
      this.startPickerOption = option
      this.endPickerOption = option
      this.defaultDate = new Date(start)
    },
    toDate(dataStr) {
      return new Date(dataStr)
    },
    // 重置datePickerOption
    resetDatePickerOption() {
      this.startPickerOption = undefined
      this.endPickerOption = undefined
      this.key++
    },
    // 重置 temp
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        principal: undefined,
        planStartDate: undefined,
        planEndDate: undefined,
        priority: undefined,
        progress: 0,
        deviation: undefined,
        remark: undefined,
        path: undefined,
        parent: undefined
      }
    },
    // 获取WBS列表
    async getWbsTaskList() {
      this.listLoading = true
      const { data: res } = await request('/api/projectTestTask/listTestTask', {
        params: {
          project: this.project
        }
      })
      this.arrayList = res
      this.treeList = toTree(res)

      this.$nextTick(() => {
        this.listLoading = false
      })
    },
    // 获取人员列表
    async getUserList() {
      const { data: res } = await request('/api/authority/user/listPlatformTestUserSelect')
      this.userList = res
    }
  }
}
</script>

<style lang="scss" scoped>
.popover {
  padding: 0px !important;
}

.task-name {
  display: flex;
  justify-content: space-between;
}

.operation {
  > div {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: #f6f6f6;
    }
  }
}

.operation-icon {
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
}

.principal {
  display: flex;
  align-items: center;

  img {
    width: 18px;
    border-radius: 50%;
    margin-right: 8px;
  }
}

// 选择器
.select-item {
  display: flex;
  align-items: center;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 8px;
  }
}
</style>

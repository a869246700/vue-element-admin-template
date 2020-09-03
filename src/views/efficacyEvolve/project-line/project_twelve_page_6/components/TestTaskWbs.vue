<template>
  <div class="risk-wbs">
    <h3>WBS区域</h3>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      row-key="id"
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
              <div @click="handleCreateClick(row.id)">新增</div>
              <div @click="handleDeleteClick(row)">删除</div>
            </div>
            <i slot="reference" class="el-icon-more operation-icon" />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="principal" label="负责人" min-width="130" show-overflow-tooltip>
        <template slot-scope="{row}">
          <div class="principal">
            <img src="http://oa.ruijie.com.cn/ImgUser/lujiwei.jpg">
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
            v-if="item.prop === 'plan_start_date' || item.prop === 'plan_end_date'"
          >{{ row[item.prop] | parseTime }}</span>

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
          <el-input v-model.trim="temp.principal" style="width: 100%" clearable />
        </el-form-item>

        <el-form-item label="计划开始时间" prop="plan_start_date">
          <el-date-picker
            v-model="temp.plan_start_date"
            type="datetime"
            placeholder="选择开始日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="计划结束时间" prop="plan_end_date">
          <el-date-picker
            v-model="temp.plan_end_date"
            type="datetime"
            placeholder="选择结束日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
          <el-select v-model="temp.priority" placeholder="请选择优先级" style="width: 100%">
            <el-option
              v-for="(item, index) in prioritySelectOptions"
              :key="index"
              :label="item.label"
              :value="item.label"
            >
              <div class="select-item">
                <i class="dot" :style="{ background: item.bg }" />
                <span>{{ item.label }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="进度" prop="progress">
          <el-select v-model="temp.progress" placeholder="请选择进度" style="width: 100%">
            <el-option
              v-for="(item, index) in progressSelectOptions"
              :key="index"
              :label="item.label"
              :value="item.label"
            >
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="偏差" prop="deviation">
          <el-input v-model.trim="temp.deviation" style="width: 100%" clearable />
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
import { parseTime } from '@/utils'
import { wbsTableOptions } from './options'

export default {
  filters: {
    principalFilter(row) {
      return row.position ? row.principal + '-' + row.position : row.principal
    },
    parseTime
  },
  data() {
    return {
      key: 0,
      listLoading: false, // 是否在加载
      list: [
        {
          id: 1, // id
          name: '任务一',
          principal: '高宇', // 负责人
          position: '前端', // 职位
          plan_start_date: new Date(2020, 8, 15), // 计划开始时间
          plan_end_date: new Date(2020, 8, 20), // 计划结束时间
          priority: undefined, // 优先级
          progress: undefined, // 进度
          deviation: undefined, // 偏差
          remark: undefined, // 备注
          children: [
            {
              id: 11,
              name: '任务11',
              principal: '高宇', // 负责人
              position: '前端', // 职位
              plan_start_date: new Date(2020, 8, 15), // 计划开始时间
              plan_end_date: new Date(2020, 8, 20), // 计划结束时间
              priority: undefined, // 优先级
              progress: undefined, // 进度
              deviation: undefined, // 偏差
              remark: undefined, // 备注
              parent_id: 1
              // children: []
            }
          ]
        }
      ], // 表单数据
      tableOptions: wbsTableOptions, // 表单列配置
      temp: {
        id: undefined,
        name: undefined, // 任务名称
        principal: undefined, // 责任人
        plan_start_date: undefined, // 计划开始时间
        plan_end_date: undefined, // 计划结束时间
        priority: undefined, // 优先级
        progress: undefined, // 进度
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
        { label: '10%', value: 1 },
        { label: '20%', value: 2 },
        { label: '30%', value: 3 },
        { label: '40%', value: 4 },
        { label: '50%', value: 5 },
        { label: '60%', value: 6 },
        { label: '70%', value: 7 },
        { label: '80%', value: 8 },
        { label: '90%', value: 9 },
        { label: '100%', value: 10 }
      ],
      pNode: undefined
    }
  },
  computed: {
    rules() {
      // 开始时间校验
      const validateStartDate = (rule, value, callback) => {
        if (this.temp.plan_end_date) {
          const start = +new Date(value)
          const end = +new Date(this.temp.plan_end_date)

          start > end ? callback(new Error('开始时间必须小于结束时间')) : callback()
        } else {
          callback()
        }
      }
      // 结束时间校验
      const validateEndDate = (rule, value, callback) => {
        if (this.temp.plan_start_date) {
          const start = +new Date(this.temp.plan_start_date)
          const end = +new Date(value)

          start > end ? callback(new Error('开始时间必须小于结束时间')) : callback()
        } else {
          callback()
        }
      }

      return {
        name: [{ required: true, message: '请填写任务名', trigger: 'blur' }],
        principal: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
        plan_start_date: [
          { required: true, message: '请选择计划开始时间', trigger: 'change' },
          { validator: validateStartDate, trigger: 'change' }
        ],
        plan_end_date: [
          { required: true, message: '请选择计划结束时间', trigger: 'change' },
          { validator: validateEndDate, trigger: 'change' }
        ],
        priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
        progress: [{ required: true, message: '请选择进展度', trigger: 'change' }],
        deviation: [{ required: true, message: '请填写偏差', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 点击编辑按钮
    handleEditClick(row) {
      this.temp = Object.assign({}, row) // 复制对象
      // 显示编辑对话框
      this.dialogStatus = 'edit'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate() // 清除原有的校验内容
      })
    },
    // 进行真正的修改数据
    updateData() {
      // 1. 表单校验
      this.$refs.dataFormRef.validate((valid) => {
        if (valid) {
          // 1. 根据 id 找到下标值
          this.findParentNode(this.list, this.temp.id)
          const parentNode = this.pNode
          const index = parentNode.findIndex((e) => e.id === this.temp.id)
          // 2. 进行数据修改
          parentNode.splice(index, 1, this.temp)
          // 3. 提示修改成功
          this.$notify({
            title: '成功',
            message: '修改数据成功',
            type: 'success',
            duration: 2000
          })
          // 4. 隐藏添加窗口
          this.dialogVisible = false
        }
      })
    },
    // 点击添加按钮
    handleCreateClick(parentId) {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate() // 清除原有的校验内容
      })

      this.temp.parent_id = parentId
    },
    // 进行真正的添加数据
    createData() {
      // 1. 表单校验
      this.$refs.dataFormRef.validate((valid) => {
        if (valid) {
          // 模拟 id
          this.temp.id = parseInt(Math.random() * 10000000)
          // 如果没有 parent
          if (!this.temp.parent_id) {
            // 添加数据
            this.list.push(this.temp)
            // 隐藏添加窗口
            this.dialogVisible = false
          } else {
            // 如果有 parent
            this.findNode(this.list, this.temp.parent_id)

            const parentNode = this.pNode
            // // 如果是第一个子元素，则初始化 children
            if (parentNode.children === undefined || !parentNode.children) {
              this.$set(parentNode, 'children', [this.temp])
            } else {
              parentNode.children.push(this.temp)
            }
            // 隐藏添加窗口
            this.dialogVisible = false
          }
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
        .then(() => {
          this.findParentNode(this.list, row.id)
          const parentNode = this.pNode
          const index = parentNode.findIndex((e) => e.id === row.id)
          parentNode.splice(index, 1)
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('已取消')
        })
    },
    // 重置 temp
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        principal: undefined,
        plan_start_date: undefined,
        plan_end_date: undefined,
        priority: undefined,
        progress: undefined,
        deviation: undefined,
        remark: undefined
      }
    },
    findParentNode(list, id) {
      const index = list.findIndex((e) => e.id === id)

      if (index !== -1) {
        // 找到, 直接返回
        this.pNode = list
      } else {
        // 没有找到, 判断是否有children,进行递归查找
        for (const item of list) {
          if (item.children && item.children.length !== 0) {
            this.findParentNode(item.children, id)
          }
        }
      }
    },
    findNode(list, id) {
      // 1. 第一次先循环一次，判断第一阶是否就存在
      const node = list.find((e) => e.id === id)

      if (node) {
        // 找到, 直接返回
        this.pNode = node
      } else {
        // 如果长度不为0
        for (const item of list) {
          if (item.children) {
            this.findNode(item.children, id)
          }
        }
      }
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

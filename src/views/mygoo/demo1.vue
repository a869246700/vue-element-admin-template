<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      ref="tableRef"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- ID -->
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <!-- name -->
      <el-table-column align="center" label="Name" width="200">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <!-- total -->
      <el-table-column align="center" label="Total" width="100">
        <template slot-scope="{row}">
          <span>{{ row.total }}</span>
        </template>
      </el-table-column>

      <!-- realTotal -->
      <el-table-column align="center" label="realTotal" width="100">
        <template slot-scope="{row}">
          <span>{{ row.realTotal }}</span>
        </template>
      </el-table-column>

      <!-- brief -->
      <el-table-column align="center" label="pass-rate">
        <template slot-scope="{row}">
          <span>{{ (row.realTotal * 100 / row.total).toFixed(2) + '%' }}</span>
        </template>
      </el-table-column>

      <!-- operation -->
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleClickEdit(row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleClickDelete(row.id)"
          >删除</el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-share"
            @click="handleClickShare(row)"
          >分享</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <el-dialog ref="editDialogRef" title="编辑" :visible.sync="editDialogVisible">
      <el-form label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID">{{ temp.id }}</el-form-item>
        <el-form-item label="Name" required>
          <el-input v-model="temp.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: 'test1', total: 300, realTotal: 200 },
        { id: 2, name: 'test2', total: 200, realTotal: 160 },
        { id: 3, name: 'test3', total: 250, realTotal: 200 },
        { id: 4, name: 'test4', total: 333, realTotal: 300 },
        { id: 5, name: 'test5', total: 400, realTotal: 350 },
        { id: 6, name: 'test6', total: 120, realTotal: 100 },
        { id: 7, name: 'test7', total: 188, realTotal: 170 },
        { id: 8, name: 'test8', total: 190, realTotal: 188 },
        { id: 9, name: 'test9', total: 425, realTotal: 388 },
        { id: 10, name: 'test10', total: 100, realTotal: 100 }
      ],
      editDialogVisible: false,
      temp: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
    handleClickEdit(id) {
      this.editDialogVisible = true
      this.temp = this.list.find((item) => item.id === id)
    },
    handleClickDelete(id) {
      console.log(id)
    },
    handleClickShare(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

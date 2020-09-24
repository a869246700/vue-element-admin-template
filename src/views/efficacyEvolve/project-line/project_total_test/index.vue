<template>
  <el-card id="project-total" title="在行项目信息看板">
    <div slot="header" class="header">
      <el-radio-group v-model="panelActive">
        <el-radio-button label="0">在行项目信息看板</el-radio-button>
        <el-radio-button label="1">历史项目信息看板</el-radio-button>
      </el-radio-group>

      <div style="display: flex; align-items: center;">
        <div>
          <i class="el-icon-plus" style="font-size: 24px;" />
        </div>

        <div class="panel-select">
          <div
            :class="sizeActive === '0' ? 'active' : ''"
            class="panel-select-icon"
            style="border-right: 1px solid #d3d3d3;"
            @click="handleSizeChange(0)"
          >
            <svg-icon icon-class="list" class="icon" />
          </div>
          <div
            :class="sizeActive === '1' ? 'active' : ''"
            class="panel-select-icon"
            @click="handleSizeChange(1)"
          >
            <svg-icon icon-class="component" class="icon" />
          </div>
        </div>
      </div>
    </div>

    <div class="project-item-wrapper">
      <transition name="fade" mode="out-in">
        <div v-if="panelSize" key="normal" class="normal-project-item">
          <normal-panel />
        </div>

        <div v-else key="simple" class="small-project-item">
          <simple-panel />
        </div>
      </transition>
    </div>
  </el-card>
</template>

<script>
import NormalPanel from './components/NormalPanel'
import SimplePanel from './components/SimplePanel'

export default {
  name: 'ProjectTotal',
  components: {
    NormalPanel,
    SimplePanel
  },
  data() {
    return {
      panelActive: '0', // 在行看板 和 历史看板切换
      sizeActive: '1' // 简易面板和常规面板切换
    }
  },
  computed: {
    panelSize() {
      return this.sizeActive === '0'
    }
  },
  watch: {
    panelActive(newV, oldV) {
      console.log(newV)
    }
  },
  methods: {
    handleAddClick() {
      this.$router.push('/efficacyEvolve/project_line/add_project')
    },
    handleSizeChange(flag) {
      this.sizeActive = String(flag)
    }
  }
}
</script>

<style lang="scss" scoped>
#project-total {
  font-size: 14px;
  margin: 20px;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .panel-select {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #d3d3d3;
    margin-left: 10px;

    .panel-select-icon {
      box-sizing: border-box;
      padding: 6px;

      .icon {
        height: 20px;
        width: 20px;
      }
    }

    & .active {
      color: #1890ff;
      // border: 1px solid #d3d3d3;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

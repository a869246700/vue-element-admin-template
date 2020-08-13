<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper notice">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            class
            data-icon="bell"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"
            />
          </svg>
        </div>
        <el-dropdown-menu slot="dropdown">
          <div class="message-box">
            <!-- 消息盒子 -->
            <div class="top-bar">
              <div class="container">
                <span>消息</span>
              </div>
            </div>
            <div class="top-content">
              <!-- 消息列表 -->
              <div v-if="true" class="notice-list-onfound">
                <div>
                  <img src="http://172.30.61.89:882/assets/message/message.svg">
                  <div>您已读完所有消息</div>
                </div>
              </div>
              <!-- 消息列表 -->
              <div v-else class="notice-list">消息列表</div>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <img
            v-show="isAvatarExist"
            :src="avatar"
            class="user-avatar"
            @load="avatarLoad"
          >
          <img v-show="!isAvatarExist" src="http://172.30.61.89:882/assets/avatar/user.png" class="user-avatar">
          <span class="user-name">{{ currentUser.userCn }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item divided>系统帮助</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

import { queryCurrent } from '@/services/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      currentUser: {},
      isAvatarExist: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device']),
    avatar() {
      const url = `http://oa.ruijie.com.cn/ImgUser/${this.currentUser.userEn}.jpg`
      return this.currentUser.userEn ? url : ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async getUserInfo() {
      const { data: res } = await queryCurrent()

      this.currentUser = res
    },
    avatarLoad() {
      this.isAvatarExist = true
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        cursor: pointer;
        font-size: 14px;

        .user-avatar {
          width: 24px;
          height: 100%;
          margin-right: 8px;
          border-radius: 10px;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.notice {
  padding: 4px;
}

.message-box {
  width: 336px;
  font-size: 14px;

  .top-bar {
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #e8e8e8;

    span {
      color: #1890ff;
      padding: 12px 16px;
      border-bottom: 2px solid #1890ff;
    }
  }

  .top-content {
    height: 274px;

    .notice-list-onfound {
      text-align: center;
      padding: 73px 0 88px 0;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>

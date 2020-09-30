<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model.trim="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model.trim="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>账号 : 研究院账号</span>
          <span>密码 : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">测试账号 : lujiwei</span>
          <span>密码 : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">Or connect with</el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      const charReg = /[a-zA-z]/gis
      const numberReg = /[0-9]/gis

      if (value.length < 6 || !charReg.test(value) || !numberReg.test(value)) {
        callback(new Error('请使用大于6位，并至少包含1个数字与字母混合的密码，以提高安全性，谢谢'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'lujiwei',
        password: 'admin123'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              // setValue('user', 'eyzaIsgytIsFsiEUGQTGW7fIEmM6XFoFpp12Z8vTeWODZ1I7z8rqL0uUA8%2Fld5G%2BpZ0UUdSluDLqhcdlghG5v4ylvTioGlQzOsW%2B54SmfH%2BVdX1d5pjrmxAwnFqdzYJBqBcCq0yPUjU51G2Qiz0NdEkSshAVGvhLWRrsEm3ab3ksnST4FV1xVU1%2BzkRIEOcd0a0EzuM3%2BprzR4MBwg2RQRfd6dXSBbEOJgCmEc6nILc4473ZSXtPiglF42RyF4FOEkYfZk6bIfG0La5FPKTEImRQ3tNsg%2BOkg2dSO8%2FK6i%2BuA2shCPi2n4xhVaoiHw394%2BlDP7geqxMQKxZQBZ65zX2gSMcz0wC49J307FOSlPQSRh9mTpsh8R3Q9miaLxMfi4cx5Myi2WPeU0Xn6qB3y0IGJXjv%2B5fJsfmUX3MyNdloYWJmi5AGEpgUz1y8SFcbDm1I06J3M94JnBPUgDNDzXrXUnvA%2Bt9q4nqSwEAiZ3j0b3RycAqJsmy%2FLEAZl2KbYEmoVvdEHDN14hJ12%2B7oNjLNc14Elg%2F6Fj9%2B%2FFJfMHSKzDjHEQcGaYgrLr38GrZN5hjK0YrwOXoXZbCjomUaDcX9p47yVHrica6ZiKfjF1K97k0Q2aZHiSKENJ177laH0DczxjFl1a3eAyB5rpinKfQk22BxHcyYX0gEZefJ3MEtDEZRqwVX5tSF736Jryj3rpDkrYrdDjs5BAyVSEYvL1vpbuf%2BucXKf6luNcNDXBDzNIqpKRd9wPBA9lttI5u%2BSXc2v7%2BvYDNlGSmv2SMpyiVh76YuoxzbzFnrVVpmJRDGY3a5jun6sq47gK%2BLs4yp3De9flfzJBrJpU%2Bbt3Km5Dq%2FKo8ruQcdavabg4te8DSIsUtlGPEY1F51dB5vrgGJJs%2FfLKacim34kf2dR74%2Fshx%2FDTyggfLRODnw0P%2FFRMndUiZjU7ti%2Bvkd%2F3ViwMOOMwlGzSaYHw77hL2OgTNXmZD23Cs3z4GiozilnBjtWPUd88oTZZYhrS3oO8HVnvAJGOCCp%2Fgh3uq9XLjjcIXQVCYzYcyoi4%2FeopshBELyl7QjnUZiSawHj3lEnrhJNMrxvInpVqQJijHbSixVESNpcuD1BNMTi3Bzt6%2FANA2JGnbzXbCiH9ai7YGTnFq1CRRBcpa6tOkSrk4%3D')
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import i18n from '@/utils/i18n'

// 引入 iconfont
import '@/assets/iconfont/iconfont.css'

// 引入 wl-gantt
import WlGantt from 'wl-gantt'
Vue.use(WlGantt)

// 引入 AFTableColumn
// import AFTableColumn from 'af-table-column'
// // 定义字体比例
// const fontRate = {
//   CHAR_RATE: 1.2, // 汉字比率
//   NUM_RATE: 1.2, // 数字
//   OTHER_RATE: 1.2 // 除汉字和数字以外的字符的比率
// }
// const fontSize = 16
// Vue.use(AFTableColumn, { fontRate, fontSize })

import * as filters from './filters' // global filters

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

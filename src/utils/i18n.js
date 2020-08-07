import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 语言
import CN from '@/locales/zh-CN'
import US from '@/locales/en-US'

// 挂载全局对象
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'CN',
  messages: {
    CN,
    US
  }
})

export default i18n

export function generateTitle(title) {
  const hasKey = this.$te(title)
  if (hasKey) {
    const translatedTitle = this.$t(title)

    return translatedTitle
  }
  return title
}

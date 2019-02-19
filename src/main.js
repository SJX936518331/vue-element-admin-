import Vue from 'vue'
import Cookies from 'js-cookie'
import {
  Message
} from 'element-ui'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import * as filters from './filters' // global filters
import axios from '@/utils/request'
// import axios from 'axios'
import url from './api/url'
import {
  getToken,
  removeToken
} from '@/utils/auth'
// axios.defaults.baseURL = 'http://192.168.50.179:8080/api/'
Vue.prototype.URL = url
Vue.prototype.$http = axios
Vue.prototype.$Message = Message
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
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

// axios.interceptors.response.use(config => {
//   if (config.headers['X-Token']) {
//     console.log('头部有token')
//   } else {
//     router.replace({
//       path: '/login',
//       query: {
//         redirect: router.currentRoute.fullPath
//       }
//     })
//   }
//   return config
// }, error => {
//   return Promise.reject(error.response.data) // 返回接口返回的错误信息
// })

import {
  loginByUsername,
  logout,
  getUserInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

import md5 from 'js-md5'
import Cookies from 'js-cookie'
import {
  Message
} from 'element-ui'
import axios from 'axios'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // SET_USERNAME: (state, username) => {
    //   state.username = username
    // },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      const password = md5(userInfo.password)
      return new Promise((resolve, reject) => {
        loginByUsername(username, password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // LoginByUsername({
    //   commit
    // }, userInfo) {
    //   const username = userInfo.username.trim()
    //   const password = md5(userInfo.password)
    //   return new Promise((resolve, reject) => {
    //     loginByUsername(username, password).then(response => {
    //       alert('进去了')
    //       if (response.data.errmsg == null) {
    //         Message.success('登录成功')
    //         console.log('登录成功', response.data)
    //       } else {
    //         console.log('进去了')
    //         Message.error(response.data.errmsg)
    //         console.log('登录失败', response.data)
    //       }
    //       const data = response.data
    //       Cookies.set('Token', data.data.authentication) // 登录成功后将token存储在cookie之中
    //       commit('SET_TOKEN', data.data.authentication)
    //       commit('SET_USERNAME', username)
    //       setToken(data.data.authentication)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //       console.log('出现大问题了')
    //     })
    //   })
    // },
    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          console.log('data', data)
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          // axios.get('' + this.URL.url + '/api/role/list')
          //   .then(
          //     response => {
          //       console.log('请求成功', response.data)
          //       if (response.data.errmsg == null) {
          //         this.$Message.success('获取角色成功')
          //       } else {
          //         this.$Message.error(response.data.errmsg)
          //         console.log('获取角色失败', response.data.errmsg)
          //       }
          //     },
          //     response => {
          //       console.log('请求失败')
          //       this.$Message.error('系统出错')
          //     }
          //   )
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          sessionStorage.removeItem('token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        // sessionStorage.removeItem('token')
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit,
      dispatch
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user

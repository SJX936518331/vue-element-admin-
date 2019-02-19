import {
  param2Obj
} from '@/utils'

import {
  getToken
} from '@/utils/auth'
import axios from '@/utils/request'
import path from '@/api/url'
import {
  Message
} from 'element-ui'

// axios.get('' + path.url + '/api/admin/list?pageNum=1&pageSize=20')
//   .then(
//     response => {
//       console.log('请求成功', response.data)
//       if (response.data.errmsg == null) {
//         Message.success('获取管理员成功')
//       } else {
//         Message.error(response.data.errmsg)
//         console.log('获取管理员失败', response.data.errmsg)
//       }
//     },
//     response => {
//       console.log('请求失败')
//       Message.error('系统出错')
//     }
//   )
const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  guest: {
    roles: ['guest'],
    token: 'guest',
    introduction: '我是普通管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '普通管理员'
  }
}

// const userMap = {}
export default {
  loginByUsername: config => {
    const {
      username
    } = JSON.parse(config.body)
    axios.get('' + path.url + '/api/role/list?pageNum=1&pageSize=20')
      .then(
        response => {
          console.log('请求成功', response.data)
          if (response.data.errmsg == null) {
            Message.success('获取角色成功')
            var data = response.data.data.list
            for (var i = 0; i < data.length; i++) {
              var obj = {}
              obj['roles'] = [data[i].name]
              obj['token'] = data[i].name
              obj['introduction'] = data[i].description
              obj['avatar'] = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
              obj['name'] = data[i].description
              userMap['' + data[i].name + ''] = obj
              if (data[i].name === username) {
                console.log('userMap的值', userMap[username])
                localStorage.setItem('userMap', JSON.stringify(userMap[username]))
                // return userMap[username]
              }
            }
            console.log('userMap--------', userMap)
          } else {
            // Message.error(response.data.errmsg)
            console.log('获取角色失败', response.data.errmsg)
            // localStorage.removeItem('userMap')
          }
        },
        response => {
          console.log('请求失败')
          Message.error('系统出错')
        }
      )
    const um = JSON.parse(localStorage.getItem('userMap'))
    console.log('userMap的值111111111', um)
    return um
    // return userMap[username]
  },
  getUserInfo: config => {
    const {
      token
    } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}

import request from '@/utils/request'
import path from './url'
import QS from 'qs'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

// export function loginByUsername(username, password) {
//   const data = QS.stringify({
//     username,
//     password
//   })
//   return request({
//     url: '' + path.url + '/api/adminRoot/login',
//     method: 'post',
//     data
//   })
// }

export function logout1() {
  return request({
    url: '' + path.url + '/api/adminRoot/logout',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

// export function getUserInfo() {
//   return request({
//     url: '' + path.url + '/api/admin/member/list',
//     method: 'get'
//   })
// }

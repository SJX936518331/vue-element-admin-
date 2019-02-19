import request from '@/utils/request'
import ImgPath from './url'
// 图片上传
export function uploadImg(params) {
  var imgPath = ImgPath.url
  return request({
    url: '' + imgPath + '/api/common/fileUtils/upload',
    method: 'post',
    data: params

  })
}

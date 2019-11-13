import request from '../utils/request'

// 图表统计
export function chartStatistics (data) {
  return request({
    url: '/api/chart/cartogram',
    method: 'GET',
    params: data
  })
}

// 人数统计
export function peopleCounting (data) {
  return request({
    url: '/api/chart/members',
    method: 'GET',
    params: data
  })
}

// 获取（教练、运动员）信息
export function memberMessage (data) {
  return request({
    url: '/api/member/members',
    method: 'GET',
    params: data
  })
}
//添加新成员
export function addMember (params) {
  return request({
    url: '/api/member',
    method: 'POST',
    data:params
  })
}
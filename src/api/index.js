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

// 运动员排行
export function rank (data) {
  return request({
    url: '/api/chart/rank',
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

// 获取所有教练姓名
export function trainersName (data) {
  return request({
    url: '/api/member/trainers',
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

//重置密码
export function resetPass (params) {
  return request({
    url: '/api/user/password/reset',
    method: 'PUT',
    data:params
  })
}


//修改信息
export function editMember (params) {
  return request({
    url: '/api/member',
    method: 'PUT',
    data:params
  })
}

//删除（批量删）
export function delMember (params) {
  return request({
    url: '/api/member',
    method: 'DELETE',
    data:params
  })
}
//修改密码
export function editPass (params) {
  return request({
    url: '/api/user/password',
    method: 'PUT',
    data:params
  })
}
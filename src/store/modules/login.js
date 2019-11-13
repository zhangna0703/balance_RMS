// import { getUseInfo } from '@/api/index'

const state = {
  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
}
const mutations = {
  updataState (state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }
  },
  // 修改token，并将token存入localStorage
  // changeLogin (state, user) {
  //   console.log(state, user)
  //     state.Authorization = user.Authorization;
  //     localStorage.setItem('Authorization', user.Authorization);
  //   }
}

const actions = {
  changeLogin ({ commit }, payload) {
    console.log(payload)
      state.Authorization = payload.Authorization;
      localStorage.setItem('Authorization', payload.Authorization);
    }
  // 获取用户信息
  // async getInfo ({ commit }, payload) {
  //   let result = await getUseInfo()
  //   console.log(result, '111')
  //   return result.code
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

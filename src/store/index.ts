import { createStore } from 'vuex'

const defaultState = {
  count: 0
}
// 新建store 实例
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    count(state: typeof defaultState) {
      return state.count
    }
  }
})

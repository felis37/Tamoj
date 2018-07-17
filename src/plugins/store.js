import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    identityData: {}
  },
  mutations: {
    SET_IDENTITY_DATA: (state, data) => state.identityData = data
  },
  actions: {

  }
})

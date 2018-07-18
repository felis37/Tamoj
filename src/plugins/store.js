import Vue from 'vue'
import Vuex from 'vuex'
import myFirestore from '@/modules/firestore'

Vue.use(Vuex)



export default new Vuex.Store({
	state: {
		identityData: {},
		identityProfiles: []
	},
	mutations: {
		watchIdentityProfiles: (state, data) => (state.identityProfiles = data),
		SET_IDENTITY_DATA: (state, data) => (state.identityData = data)
	},
	actions: {}
})
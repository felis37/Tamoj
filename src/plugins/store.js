import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		login: {},
		loginProfiles: [],
		loginProfilesLoaded: 0,
		currentLoginProfile: null,
		currentLoginProfileLoaded: null
	},
	mutations: {
		setLogin: (state, data) => state.login = data,
		setLoginProfilesLoaded: (state, data) =>
			data === 0
				? (state.loginProfilesLoaded = data)
				: (state.loginProfilesLoaded = state.loginProfilesLoaded + data),
		setCurrentLoginProfileLoaded: (state, data) => state.currentLoginProfile = data,
		...firebaseMutations
	},
	actions: {
		setLoginProfileRef: firebaseAction(
			async ({ bindFirebaseRef, commit, state }, ref) => {
				await bindFirebaseRef(`loginProfiles.${state.loginProfiles.length}`, ref)
				commit('setLoginProfilesLoaded', 1)
			}
		),
		setCurrentLoginProfileRef: firebaseAction(
			async ({ bindFirebaseRef, commit }, ref) => {
				await bindFirebaseRef('currentLoginProfile', ref)
				commit('setCurrentLoginProfileLoaded', true)
			}
		)
	}
})

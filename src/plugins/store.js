import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		auth: {},
		login: {},
		loginProfiles: [],
		loginProfilesLoaded: 0,
		currentLoginProfileOfLoginProfiles: 0,
		primaryLoginProfile: {},
		primaryLoginProfileLoaded: null
	},
	mutations: {
		setLogin: (state, data) => state.login = data,
		setLoginProfilesLoaded: (state, data) => data === 0 ? (state.loginProfilesLoaded = data) : (state.loginProfilesLoaded = state.loginProfilesLoaded + data),
		setPrimaryLoginProfileLoaded: (state, data) => state.primaryLoginProfileLoaded = data,
		setAuth: (state, data) => state.auth = data,
		setCurrentLoginProfileOfLoginProfiles: (state, data) => state.currentLoginProfileOfLoginProfiles = data,
		...firebaseMutations
	},
	actions: {
		setLoginProfilesRefs: firebaseAction(
			async ({ bindFirebaseRef, commit, state }, refs) => {
				for (let i = 0; i < refs.length; i++) {
					await bindFirebaseRef(`loginProfiles.${state.loginProfiles.length}`, refs[i])
					commit('setLoginProfilesLoaded', 1)
				}
			}
		),
		setPrimaryLoginProfileRef: firebaseAction(
			async ({ bindFirebaseRef, commit }, ref) => {
				await bindFirebaseRef('primaryLoginProfile', ref)
				commit('setPrimaryLoginProfileLoaded', true)
			}
		)
	}
})

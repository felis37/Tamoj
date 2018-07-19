import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { resolve } from 'url';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		identityProfiles: [],
		identityProfilesLoaded: null,
		identityLeaderMemberships: [],
		identityLeaderMembershipsLoaded: null
	},
	mutations: {
		SET_IDENTITY_DATA: (state, data) => state.identityData = data,
		...firebaseMutations,
		setIdentityProfilesLoaded: (state, data) => state.identityProfilesLoaded = data,
		setIdentityLeaderMembershipsLoaded: (state, data) => state.identityLeaderMembershipsLoaded = data
	},
	actions: {
		setIdentityProfilesRef: firebaseAction(({ bindFirebaseRef, commit }, ref) => {
			bindFirebaseRef('identityProfiles', ref).then(() => {
				commit('setIdentityProfilesLoaded', true)
			})
		}),
		setIdentityLeaderMembershipsRef: firebaseAction(({ bindFirebaseRef, commit }, ref) => {
			bindFirebaseRef('identityLeaderMemberships', ref).then(() => {
				commit('setIdentityLeaderMembershipsLoaded', true)
			})
		})
	}
})
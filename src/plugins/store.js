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
		setIdentityProfilesRef: firebaseAction(async ({ bindFirebaseRef }, ref) => {
			await setTimeout(alert('hi'), 8000)
			/*return new Promise((resolve, reject) => {
				setTimeout(resolve('horse'), 80000)
			})*/

			/*bindFirebaseRef('identityProfiles', ref).then(() => {
				return true
			})*/
		}),
		async test(context, data) {

		},
		setIdentityLeaderMembershipsRef: firebaseAction(async ({ bindFirebaseRef }, ref) => {
			bindFirebaseRef('identityLeaderMemberships', ref).then(() => {
				return true
			})
		})
	}
})
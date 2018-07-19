import Vue from 'vue'
import Router from 'vue-router'
import { auth, firestore } from '@/plugins/firebase'
import store from '@/plugins/store'

//Head views
import Landing from '@/views/Landing.vue'
import Leader from '@/views/Leader.vue'
import Profile from '@/views/Profile.vue'

//Landing subviews
import About from '@/views/Landing/About.vue'
import SignIn from '@/views/Landing/SignIn.vue'
import SignOut from '@/views/Landing/SignOut.vue'

//Admin subviews
import Attendance from '@/views/Leader/Attendance.vue'

//Profile subviews
import Memberships from '@/views/Profile/Memberships.vue'
import Details from '@/views/Profile/Details.vue'
import Events from '@/views/Profile/Events.vue'

Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: '*',
			redirect: { name: 'SignIn' }
		},
		{
			path: '/',
			redirect: { name: 'SignIn' },
			name: 'Landing',
			component: Landing,
			children: [
				{
					path: 'about',
					name: 'About',
					component: About
				},
				{
					path: 'sign-in',
					name: 'SignIn',
					component: SignIn
				},
				{
					path: 'sign-out',
					name: 'SignOut',
					component: SignOut
				}
			]
		},
		{
			path: '/leader',
			redirect: { name: 'Attendance' },
			name: 'Leader',
			component: Leader,
			children: [
				{
					path: 'attendance',
					name: 'Attendance',
					component: Attendance,
					meta: { permission: 'Leader' }
				}
			]
		},
		{
			path: '/profile',
			redirect: { name: 'Details' },
			name: 'Profile',
			component: Profile,
			children: [
				{
					path: 'memberships',
					name: 'Memberships',
					component: Memberships,
					meta: { permission: 'Profile' }
				},
				{
					path: 'details',
					name: 'Details',
					component: Details,
					meta: { permission: 'Profile' }
				},
				{
					path: 'events',
					name: 'Events',
					component: Events,
					meta: { permission: 'Profile' }
				}
			]
		}
	]
})

router.beforeEach(async (to, from, next) => {
	const viewPermission = to.meta.permission
	const identityAuthenticated = auth.currentUser != null

	if (!identityAuthenticated) {
		if (viewPermission) {
			next({
				name: 'SignIn',
				params: { targetPath: to.fullPath, targetPermission: viewPermission }
			})
		} else {
			next()
		}
	} else {
		if (
			(!viewPermission && to.name !== 'SignIn') ||
			(viewPermission && viewPermission === from.meta.permission)
		) {
			next()
		} else {
			const identityProfilesRef = firestore.collection('profiles').where(`permissions.rw.${auth.currentUser.uid}`, '==', true)
			const identityLeaderMembershipsRef = firestore.collection('memberships').where(`permissions.r.${auth.currentUser.uid}`, '==', true)

			store.watch(state => state.identityProfilesLoaded, (oldValue, newValue) => {
				if (newValue) {
					console.log(store.state.identityProfiles[0].general.details.givenName)
				}
			})

			await store.dispatch('setIdentityProfilesRef', identityProfilesRef)
			await store.dispatch('setIdentityLeaderMembershipsRef', identityLeaderMembershipsRef)

			let permissions = []
			
			if (store.state.identityLeaderMemberships.size > 0) {
				permissions.push('Leader')
			}

			if (store.state.identityProfiles.size > 0) {
				permissions.push('Profile')
			}

			console.log(permissions)

			if (to.name === 'SignIn' && permissions) {
				next({ name: permissions[0] })
			} else if (permissions.includes(viewPermission)) {
				next()
			} else if (permissions.includes('Profile')) {
				next({ name: 'Profile' })
			} else {
				next(new Error('Can not navigate due to no permissions!'))
			}
		}
	}
})

export default router

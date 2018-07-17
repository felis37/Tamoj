import Vue from 'vue'
import Router from 'vue-router'
import {
	authenticated,
	getIdentityData
} from '@/modules/identity'

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
			props: true,
			children: [
				{
					path: 'about',
					name: 'About',
					component: About,
					props: true
				},
				{
					path: 'sign-in',
					name: 'SignIn',
					component: SignIn,
					props: true
				},
				{
					path: 'sign-out',
					name: 'SignOut',
					component: SignOut,
					props: true
				}
			]
		},
		{
			path: '/leader',
			redirect: { name: 'Attendance' },
			name: 'Leader',
			component: Leader,
			props: true,
			children: [
				{
					path: 'attendance',
					name: 'Attendance',
					component: Attendance,
					meta: { permission: 'Leader' },
					props: true
				}
			]
		},
		{
			path: '/profile',
			redirect: { name: 'Details' },
			name: 'Profile',
			component: Profile,
			props: true,
			children: [
				{
					path: 'memberships',
					name: 'Memberships',
					component: Memberships,
					meta: { permission: 'Profile' },
					props: true
				},
				{
					path: 'details',
					name: 'Details',
					component: Details,
					meta: { permission: 'Profile' },
					props: true
				},
				{
					path: 'events',
					name: 'Events',
					component: Events,
					meta: { permission: 'Profile' },
					props: true
				}
			]
		}
	]
})

router.beforeEach(async (to, from, next) => {	
	const viewPermission = to.meta.permission
	const identityAuthenticated = authenticated()

	console.log(next)

	if (!identityAuthenticated) {
		if (viewPermission) {
			next({ name: 'SignIn', props: { target: to.fullPath } })
		} else {
			next()
		}
	} else {
		if (!viewPermission && to.name !== 'SignIn') {
			next()
		} else if (viewPermission) {
			if (viewPermission === from.meta.permission) {
				next()
			} else {
				let identityData = await getIdentityData()
				if (viewPermission === 'Leader' && identityData.leaderPermission) {
					next({
						props: {
							profilePermission: identityData.profilePermission,
							identityMetadata: identityData.identityMetadata, 
							leaderDocs: identityData.leaderDocs 
						}
					})
				} else if (identityData.profilePermission) {
					if (viewPermission === 'Profile') {
						next({
							props: {
								leaderPermission: identityData.leaderPermission,
								identityMetadata: identityData.identityMetadata,
								profileDocs: identityData.profileDocs
							}
						})
					} else {
						next({ 
							name: 'Profile',
							props: {
								leaderPermission: identityData.leaderPermission,
								identityMetadata: identityData.identityMetadata,
								profileDocs: identityData.profileDocs
							}
						})
					}
				} else {
					next(new Error('No permissions!'))
				}
			}
		} else {
			let identityData = await getIdentityData()
			if (identityData.leaderPermission) {
				next({
					name: 'Attendance',
					props: {
						leaderPermission: identityData.leaderPermission,
						identityMetadata: identityData.identityMetadata,
						profileDocs: identityData.profileDocs
					}
				})
			} else if (identityData.profilePermission) {
				next({
					name: 'Details',
					props: { 
						profilePermission: identityData.profilePermission,
						identityMetadata: identityData.identityMetadata, 
						leaderDocs: identityData.leaderDocs 
					}
				})
			} else {
				next(new Error('No permissions!'))
			}
		}
	}
})

export default router

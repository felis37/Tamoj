import Vue from 'vue'
import Router from 'vue-router'
import {
	getAuthenticated,
	getAuthenticatedInitialRedirect,
	getHasViewPermission
} from '@/modules/identity'

//Top views
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
					meta: {
						auth: 'Leader'
					}
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
					meta: {
						auth: 'Profile'
					}
				},
				{
					path: 'details',
					name: 'Details',
					component: Details,
					meta: {
						auth: 'Profile'
					}
				},
				{
					path: 'events',
					name: 'Events',
					component: Events,
					meta: {
						auth: 'Profile'
					}
				}
			]
		}
	]
})

router.beforeEach(async (to, from, next) => {
	const viewRequiresAccess = to.meta.auth != null
	const identityAuthenticated = getAuthenticated()

	if (!identityAuthenticated) {
		if (viewRequiresAccess) {
			next({ name: 'SignIn', params: { target: to.fullPath } })
		} else {
			next()
		}
	} else {
		if (!viewRequiresAccess && to.name !== 'SignIn') {
			next()
		} else if (
			viewRequiresAccess &&
			(await getHasViewPermission(to.meta.auth))
		) {
			next()
		} else {
			next({ name: await getAuthenticatedInitialRedirect() })
		}
	}
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/plugins/store'
import login from '@/modules/login'

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
	const identityAuthenticated = store.state.auth.uid

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
			const loginData = await login.getLogin()
			let permissions = []

			if (Object.keys(loginData.groupLeader).length) {
				permissions.push('Leader')
			}

			if (Object.keys(loginData.profiles).length) {
				permissions.push('Profile')
			}

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

import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/plugins/firebase'

//Top views
import Landing from '@/views/Landing.vue'
import Admin from '@/views/Admin.vue'
import Profile from '@/views/Profile.vue'

//Landing subviews
import About from '@/views/Landing/About.vue'
import SignIn from '@/views/Landing/SignIn.vue'
import SignOut from '@/views/Landing/SignOut.vue'

//Admin subviews
import Attendance from '@/views/Admin/Attendance.vue'

//Profile subviews
import Memberships from '@/views/Profile/Memberships.vue'
import Details from '@/views/Profile/Details.vue'
import Events from '@/views/Profile/Events.vue'

Vue.use(Router)

let router = new Router({
  routes: [
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
      path: '/admin',
      redirect: '/admin/attendance',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'attendance',
          name: 'Attendance',
          component: Attendance,
          meta: {
            accessModules: ['admin']
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
            accessModules: ['profile']
          }
        },
        {
          path: 'details',
          name: 'Details',
          component: Details,
          meta: {
            accessModules: ['profile']
          }
        },
        {
          path: 'events',
          name: 'Events',
          component: Events,
          meta: {
            accessModules: ['profile']
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let viewAccessModules = to.meta.accessModules
  let userAccessModules = (auth.currentUser) ? ['admin', 'profile'] : undefined //Get from metadata
  let viewRequiresAccess = (viewAccessModules == null || viewAccessModules.length == 0) ? false : true
  let userHasAccessSomewhere = (userAccessModules == null || userAccessModules.length == 0) ? false: true

  if (!userHasAccessSomewhere) {
    if (viewRequiresAccess) {
      next({name: 'SignIn', params: { target: to.fullPath }})
    } else {
      next()
    }
  } else {
    if (!viewRequiresAccess && to.name !== 'SignIn') {
      next()
    } else if (viewRequiresAccess && viewAccessModules.some(r => userAccessModules.includes(r))) {
      next()
    } else {
      next({name: userAccessModules[0]})
    }
  }
})

export default router
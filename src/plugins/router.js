import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/plugins/firebase'

//General views
import NotFound from '@/views/NotFound.vue'
import About from '@/views/About.vue'
import SignIn from '@/views/SignIn.vue'
import SignOut from '@/views/SignOut.vue'
import Admin from '@/views/Admin.vue'
import Profile from '@/views/Profile.vue'

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
      path: '*',
      redirect: '/404'
    },
    {
      path: '/',
      redirect: '/sign-in'
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      props: true
    },
    {
      path: '/sign-out',
      name: 'signOut',
      component: SignOut
    },
    {
      path: '/admin',
      redirect: '/admin/attendance',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'attendance',
          name: 'attendance',
          component: Attendance,
          meta: {
            accessModules: ['admin']
          }
        }
      ]
    },
    {
      path: '/profile',
      redirect: '/profile/details',
      name: 'profile',
      component: Profile,
      children: [
        {
          path: 'memberships',
          name: 'memberships',
          component: Memberships,
          meta: {
            accessModules: ['profile']
          }
        },
        {
          path: 'details',
          name: 'details',
          component: Details,
          meta: {
            accessModules: ['profile']
          }
        },
        {
          path: 'events',
          name: 'events',
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
      next({name: 'signIn', params: { target: to.fullPath }})
    } else {
      next()
    }
  } else {
    if (!viewRequiresAccess && to.path !== '/sign-in') {
      next()
    } else if (viewRequiresAccess && viewAccessModules.some(r => userAccessModules.includes(r))) {
      next()
    } else {
      next('/' + userAccessModules[0])
    }
  }
})

export default router
import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VTabs,
  VToolbar,
  VMenu,
  VDivider,
  VOverflowBtn,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VTabs,
    VToolbar,
    VMenu,
    VDivider,
    VOverflowBtn,
    transitions
  },
})
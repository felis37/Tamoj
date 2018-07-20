import '@babel/polyfill'
import Vue from 'vue'
import '@/plugins/vuetify'
import App from '@/App.vue'
import router from '@/plugins/router'
import store from '@/plugins/store'
import '@/plugins/registerServiceWorker'
import { auth } from '@/plugins/firebase'

Vue.config.productionTip = false

let app

auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('setAuth', user)
	}
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
})

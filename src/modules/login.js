import store from '@/plugins/store'
import firestoreRefs from '@/modules/firestoreRefs'

const getLogin = async () => {
	const loginRef = firestoreRefs.getRef('login')
	const loginData = (await loginRef.get()).data()

	store.commit('setLogin', loginData)
	return loginData
}

export default {
	getLogin
}

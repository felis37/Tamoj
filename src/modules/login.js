import { auth, firestore } from '@/plugins/firebase'
import store from '@/plugins/store'

const getLogin = async () => {
	const loginDoc = await firestore
		.collection('logins')
		.doc(auth.currentUser.uid)
		.get()
	store.commit('setLogin', loginDoc.data())
	return loginDoc
}

export default {
	getLogin
}

import { auth, firestore } from '@/plugins/firebase'
import store from '@/plugins/store'

auth.onAuthStateChanged(user => {
	if (user) {
		console.log('here2')
		const uid = auth.currentUser.uid

		const identityProfiles = firestore
			.collection('profiles')
			.where(`permissions.rw.${uid}`, '==', true)

		identityProfiles.onSnapshot(docs => {
			const newDocs = []
			docs.forEach(doc => {
				newDocs.push({ id: doc.id, ...doc.data() })
			})
			console.log(newDocs)
			console.log(store.commit('watchIdentityProfiles', newDocs))
		})
	}
})

export default {}

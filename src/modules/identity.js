import { auth, firestore } from '@/plugins/firebase'

const getAuthenticatedInitialRedirect = async (uid = null) => {
	if (uid == null) {
		uid = auth.currentUser.uid
	}
	let leaderMemberships = await firestore
		.collection('memberships')
		.where(`permissions.r.${uid}`, '==', true)
		.where('role', '==', 'leader')
		.get()
	if (leaderMemberships.size) {
		return 'Leader'
	} else {
		let profiles = await firestore
			.collection('profiles')
			.where(`permissions.rw.${uid}`, '==', true)
			.get()
		if (profiles.size) {
			return 'Profile'
		} else {
			return null
		}
	}
}

const getLeaderPermission = async (uid = null) => {
	if (uid == null) {
		uid = auth.currentUser.uid
	}
	let leaderMemberships = await firestore
		.collection('memberships')
		.where(`permissions.r.${uid}`, '==', true)
		.where('role', '==', 'leader')
		.get()
	return leaderMemberships.size > 0
}

const getProfilePermission = async (uid = null) => {
	if (uid == null) {
		uid = auth.currentUser.uid
	}
	let profiles = await firestore
		.collection('profiles')
		.where(`permissions.rw.${uid}`, '==', true)
		.get()
	return profiles.size > 0
}

export {
	getAuthenticatedInitialRedirect,
	getLeaderPermission,
	getProfilePermission
}

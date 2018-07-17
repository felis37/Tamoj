import { auth, firestore } from '@/plugins/firebase'

const getAuthenticated = () => {
	return auth.currentUser != null
}

const getAuthenticatedInitialRedirect = async () => {
	let uid = auth.currentUser.uid
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

const getHasLeaderPermission = async (uid = null) => {
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

const getHasProfilePermission = async (uid = null) => {
	if (uid == null) {
		uid = auth.currentUser.uid
	}
	let profiles = await firestore
		.collection('profiles')
		.where(`permissions.rw.${uid}`, '==', true)
		.get()
	return profiles.size > 0
}

const getHasViewPermission = async view => {
	if (view === 'Leader') {
		return getHasLeaderPermission()
	} else if (view === 'Profile') {
		return getHasProfilePermission()
	}
}

export {
	getAuthenticated,
	getAuthenticatedInitialRedirect,
	getHasLeaderPermission,
	getHasProfilePermission,
	getHasViewPermission
}

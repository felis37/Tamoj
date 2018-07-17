import { auth, firestore } from '@/plugins/firebase'

const authenticated = () => {
	return auth.currentUser != null
}

const getIdentityData = async() => {
	let response = {}
	let uid = auth.currentUser.uid
	
	let leaderDocs = await firestore.collection('memberships').where(`permissions.r.${uid}`, '==', true).where('role', '==', 'leader').get()
	let profileDocs = await firestore.collection('profiles').where(`permissions.rw.${uid}`, '==', true).get()
	
	response['leaderPermission'] = leaderDocs.size > 0
	response['profilePermission'] = profileDocs.size > 0
	response['leaderDocs'] = leaderDocs
	response['profileDocs'] = profileDocs
	
	leaderDocs.forEach(leaderDoc => {
		profileDocs.forEach(profileDoc => {
			if (leaderDoc.data().profile.id === profileDoc.id) {
				let profileData = profileDoc.data()
				response['identityMetadata'] = { 
					'displayName': `${profileData.details.general.givenName} ${profileData.details.general.familyName}`,
					'profilePicUrl': profileData.details.general.avatar
				}
				return response
			}
		})
	})
	let profileData = profileDocs.docs[0].data()
	response['identityMetadata'] = {
		'displayName': `${profileData.details.general.givenName} ${profileData.details.general.familyName}`,
		'profilePicUrl': profileData.details.general.avatar
	}
	return response
}

export {
	authenticated,
	getIdentityData
}

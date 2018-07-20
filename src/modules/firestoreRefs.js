import { firestore } from '@/plugins/firebase'
import store from '@/plugins/store'

const getRef = (firestoreRefName) => {
    const uid = store.state.auth.uid

    switch(firestoreRefName) {
        case 'login':
            return firestore.collection('logins').doc(uid)
        case 'loginProfiles':
            const result = []
            const loginProfiles = Object.keys(store.state.login.profiles)
            loginProfiles.forEach(loginProfile => {
                result.push(firestore.collection('profiles').doc(loginProfile))
            })
            return result
        case 'primaryLoginProfile':
            const login = store.state.login
            return firestore.collection('profiles').doc((login.is) ? login.is : Object.keys(login.profiles)[0])
    }
}

export default {
    getRef
}
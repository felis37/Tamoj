import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const config = {
	apiKey: 'AIzaSyDmp2YjJFZw4Z8CrxMfPmr0BXSFg3JmDZE',
	authDomain: 'tamoj-d8e1b.firebaseapp.com',
	databaseURL: 'https://tamoj-d8e1b.firebaseio.com',
	projectId: 'tamoj-d8e1b',
	storageBucket: 'tamoj-d8e1b.appspot.com',
	messagingSenderId: '337607110357'
}

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const auth = firebase.auth()
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
const functions = firebase.functions()

export { firebase, auth, firestore, functions }

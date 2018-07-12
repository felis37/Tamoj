const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const axios = require('axios')

//NEEDS AUTH!!!

const form = express()
const api = express()

form.use(cors({ origin: true }))
api.use(cors({ origin: true }))

form.get('/profile', (request, response) => {
	response.send('Profilformdata hämtad!')
})

form.post('/profile', (request, response) => {
	response.send('Profildata uppladdad!')
})

api.get('/test', (request, response) => {
	response.send('Testar Api!')
})

const scoutnetForm = functions.https.onRequest(form)
const scoutnetApi = functions.https.onRequest(api)

module.exports = {
	scoutnetForm,
	scoutnetApi
}


/*
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!')
})
*/
const functions = require('firebase-functions')

const authenticateScoutnetRequest = user => {
	return new Promise((resolve, reject) => {
		if (typeof user === 'undefined') {
			reject(new functions.https.HttpsError(401, 'NO_AUTHENTICATION'))
		} else {
			resolve(true)
		}
	}).then(result => {
		return 'User is authenticated!'
	})

	/*
	if (typeof user === 'undefined') {
		throw new functions.https.HttpsError(401, 'NO_AUTHENTICATION')
	} else {
		return new Promise((resolve, reject) => {
			return setTimeout(resolve('User is authenticated!'), 1000)
		})
			.then(result => {
				return result
			})
			.catch(err => {
				reject(new functions.https.HttpsError(err.code, err.message))
			})
	}
	*/
}

exports.test = functions.https.onCall((data, context) => {
	return authenticateScoutnetRequest(context.user)
		.then(result => {
			console.log('here8')
			return result
		})
		.catch(err => {
			console.log('here9')
			throw new functions.https.HttpsError(err.code, err.message)
		})
})

//SCRAP!
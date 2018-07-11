const formValuesGetMap = {
    newsletter: 'profile[newsletter]',
    memberMagazine: 'profile[product_subscription_8]'
}

const formValuesSetMap = {
    first_name: 'profile[first_name]',
    last_name: 'profile[last_name]',
    ssno: 'profile[ssno]',
    sex: 'profile[sex]',
    newsletter: 'profile[newsletter]',
    memberMagazine: 'profile[product_subscription_8]',
    address_1: 'address[address_line1]',
    postcode: 'address[zip_code]',
    town: 'address[zip_name]',
    email: ['new_email_1', 'new_email_2'],
    contact_mobile_phone: 'contact_details[1][1537116]',
    contact_mothers_name: 'contact_details[14][0]',
    contact_email_mum: 'contact_details[33][0]',
    contact_mobile_mum: 'contact_details[38][0]',
    contact_fathers_name: 'contact_details[16][0]',
    contact_email_dad: 'contact_details[34][0]',
    contact_mobile_dad: 'contact_details[39][0]',
    currentPassword: 'password[old_password]',
    newPassword: ['password[password]', 'password[password2]']
}

const formPages = {
    profile: {},
    email: {},
    address: {},
    password: {}
}

const formPageMap = {
    profile: [
        'first_name',
        'last_name',
        'ssno',
        'sex',
        'newsletter',
        'memberMagazine',
        'contact_mobile_phone',
        'contact_mothers_name',
        'contact_email_mum',
        'contact_mobile_mum',
        'contact_fathers_name',
        'contact_email_dad',
        'contact_mobile_dad'
    ],
    email: [
        'email'
    ],
    address: [
        'address_1',
        'postcode',
        'town'
    ],
    password: [
        'currentPassword',
        'newPassword'
    ]
}

function getScoutnetFormValueProcessObject(dataElement) {
    function getFormRequestDataObject(dataElement) {
        let result = formPages
        Object.keys(formPageMap).forEach(formPage => {
            Object.keys(dataElement).forEach(valueKey => {
                if (formPageMap[formPage].includes(valueKey)) {
                    result[formPage][valueKey] = dataElement[valueKey]
                }
            })
        })
        Object.keys(result).forEach(key => {
            if (Object.keys(result[key]).length === 0 && result[key].constructor === Object) {
                delete result[key]
            }
        })
        return result
    }
    
    let result = {}
    if (Array.isArray(dataElement)) {
        dataElement.forEach(item => {
            if (formValuesGetMap.hasOwnProperty(item)) {
                result[item] = {
                    name: formValuesGetMap[item],
                    value: null
                }
            }
        })
        return getFormRequestDataObject(result)
    } else {
        Object.keys(dataElement).forEach(key => {
            if (formValuesSetMap.hasOwnProperty(key)) {
                if (Array.isArray(formValuesSetMap[key])) {
                    let multiObject = []
                    formValuesSetMap[key].forEach(item => {
                        multiObject.push({
                            name: item,
                            value: dataElement[key]
                        })
                    })
                    result[key] = multiObject
                } else {
                    result[key] = { 
                        name: formValuesSetMap[key],
                        value: dataElement[key] 
                    }
                }
            }
        })
        return getFormRequestDataObject(result)
    }
}

function getFromForm(form, values) {
    console.log('---------------------------------------')
    console.log('A request to get from form ' + form + ' was made!')
    console.log('Passed form data: ' + JSON.stringify(values))
    console.log('---------------------------------------')
}

function setToForm(form, values) {
    console.log('---------------------------------------')
    console.log('A request to set to form ' + form + ' was made!')
    console.log('Passed form data: ' + JSON.stringify(values))
    console.log('---------------------------------------')
}

function getFromApi(values) {
    console.log('A request to get from API was made!')
    console.log('Passed request data: ' + values)
    console.log('---------------------------------------')
}

function getValues(keyArray) {
    function getValueKeysNotInFormValuesGetMap(inputValueKeys) {
        return inputValueKeys.filter(el => {
            return Object.keys(formValuesGetMap).indexOf(el) < 0
        })
    }
    
    let formProcessObject = getScoutnetFormValueProcessObject(keyArray)
    if (Object.keys(formProcessObject).length === 0 && formProcessObject.constructor === Object) {
        let getFromApiResult = getFromApi(keyArray)
    } else {
        let getFromFormResult = []
        Object.keys(formProcessObject).forEach(form => {
            getFromFormResult.push(getFromForm(form, formProcessObject[form]))
        })
        let getFromApiResult = getFromApi(getValueKeysNotInFormValuesGetMap(keyArray))
    }
    //Process result
}

function setValues(keyValueObject) {
    let formProcessObject = getScoutnetFormValueProcessObject(keyValueObject)
    let setToFormResult = []
    Object.keys(formProcessObject).forEach(form => {
        setToFormResult.push(setToForm(form, formProcessObject[form]))
    })
    //Process result
}

export {
    getValue,
    getValues,
    setValue,
    setValues
}
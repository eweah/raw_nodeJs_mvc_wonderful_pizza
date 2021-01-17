

// string manipulation functions
const trim = string => string.trim()

const checkLength = string => string.trim().length > 0? true: false

const checkType = string => typeof(string) === 'string' ? true: false 

const checkString = string => checkType(trim(string)) && checkLength(string) ? trim(string): false

const formatPhone = phone => checkString(phone)? phone.split('-').join(''): false

const numberized = phone => formatPhone(phone) ? parseInt(formatPhone(phone)) : false

const checkPhone = phone => numberized(phone)? typeof(numberized(phone)) ==='number'? formatPhone(phone): false: false

// const checkPhone = phone => numberized(phone)? typeof(numberized(phone)) ==='number' && formatPhone(phone).length === 10? formatPhone(phone): false: false
const isAgreed = bool => typeof(bool) === 'boolean' && bool === true? true: false

module.exports = (() => {
    const puCheck = data => {
        // Check that all required fields are filled out
        const firstname = checkString(data.payload.firstname)
        const lastname = checkString(data.payload.lastname)
        const username = checkString(data.payload.username)
        const nickname = checkString(data.payload.nickname)
        const password = checkString(data.payload.password)
        const email = checkString(data.payload.email)
        const phone = checkPhone(data.payload.phone)
        const tosAgreement = isAgreed(data.payload.tosAgreement)
      
        const isDataOk = firstname && lastname && nickname && phone && password && username && email && tosAgreement
      
        return {
            firstname,
            lastname,
            password,
            username,
            email,
            phone,
            nickname,
            tosAgreement,
            isDataOk
        }

    }

    uiCheck = data => {
        // Check that all required fields are filled out 

        const firstname =
            typeof data.payload.firstname == 'string' && data.payload.firstname.trim().length > 0 ?
            data.payload.firstname.trim() :
            false;
        const lastname =
            typeof data.payload.lastname == 'string' && data.payload.lastname.trim().length > 0 ?
            data.payload.lastname.trim() :
            false;

        const username =
            typeof data.payload.username == 'string' && data.payload.username.trim().length > 0 ?
            data.payload.username.trim() :
            false;
            const nickname =
            typeof data.payload.nickname == 'string' && data.payload.nickname.trim().length > 0 ?
            data.payload.nickname.trim() :
            false;
        const email =
            typeof data.payload.email == 'string' && data.payload.email.trim().length > 0 ?
            data.payload.email.trim() :
            false;
        const phone =
            typeof data.payload.phone == 'string' && data.payload.phone.trim().length == 10 ?
            data.payload.phone.trim() :
            false;
        const password =
            typeof data.payload.password == 'string' && data.payload.password.trim().length > 0 ?
            data.payload.password.trim() :
            false;
        let street, city, state, country, zipCode
        if (data.payload.address) {
            street =
                typeof data.payload.address.street == 'string' && data.payload.address.street.trim().length > 0 ?
                data.payload.address.street.trim() :
                false;
            city =
                typeof data.payload.address.city == 'string' && data.payload.address.city.trim().length > 0 ?
                data.payload.address.city.trim() :
                false;
            state =
                typeof data.payload.address.state == 'string' && data.payload.address.state.trim().length > 0 ?
                data.payload.address.state.trim() :
                false;
            country =
                typeof data.payload.address.country == 'string' && data.payload.address.country.trim().length > 0 ?
                data.payload.address.country.trim() :
                false;
            zipCode =
                typeof data.payload.address.zipCode == 'string' && data.payload.address.zipCode.trim().length > 0 ?
                data.payload.address.zipCode.trim() :
                false;
        }

        const isDataOk = firstname || lastname || password || username || email
        return {
            firstname,
            lastname,
            password,
            username,
            email,
            phone,
            nickname,
            street,
            city,
            state,
            country,
            zipCode,
            isDataOk
        }

    }



    return {
        puCheck,
        uiCheck
    }
})()
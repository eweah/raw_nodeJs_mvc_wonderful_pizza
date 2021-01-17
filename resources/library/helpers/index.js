'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Helpers
 * @kind class
 * 
 * @extends Base
 * 
 * @requires Base
 * @requires Env
 * 
 * @classdesc Helpers class for providing helpers methods to views, models, controllers, and others
 * 
 */
const Env = require('../../../config/env/.env')
const Base = require('../../../config/base')


class Helpers extends Base {
    constructor() {
        super()
        this.error = {}
        // auto bind methods
        this.autobind(Helpers)
    }

     /**
     * @name objectCopy
     * @function
     *
     * @param {Object} obj the object whose deep copy to be made
     *  
     * @description makes a deep copy of an object 
     * @return {Object} copy, the copy of the original object
     * 
     */
    objectCopy(obj) {
        const copy = Object.create(Object.getPrototypeOf(obj));
        const propNames = Object.getOwnPropertyNames(obj);
        propNames.forEach(name => {
            const desc = Object.getOwnPropertyDescriptor(obj, name);
            Object.defineProperty(copy, name, desc);
        });
        return copy;
    };

    /**
     * @name isArray
     * @function
     *
     * @param {Object} obj the object to check
     *  
     * @description checks if the object is an array 
     * @return {Boolean} true if the object is an array; false otherwise
     * 
     */

    isArray(obj) {
        try {
            if (Array.isArray(obj)) {
                return true
            } else {
                return false
            }
        } catch (er) {
            return false
        }
    }

     /**
     * @name isArrayLength
     * @function
     *
     * @param {Object} obj the object to check
     *  
     * @description checks if the object is an array and the has a non-zero length
     * @return {Boolean} true if the object is an array and has a non-zero length; false otherwise
     * 
     */
    isArrayLength(obj) {
        try {
            if (this.isArray(obj) && obj.length > 0) {
                return true
            } else {
                return false
            }
        } catch (er) {
            return false
        }
    }

     /**
     * @name makeArray
     * @function
     *
     * @param {Array} arr the object to check
     *  
     * @description checks if the object is an array. It not it puts it in an empty array
     * @return {Array} the array object the object
     * 
     */
    makeArray(arr = []) {
        const arrayObject = []
        arrayObject.push(arr)
        return this.isArray(arr) ? arr : arrayObject
    }
    /**
     * @name parseJSON
     * @function
     *
     * @param {String} string the string to parse
     *  
     * @description JSON parses a string
     * @return {Object} the JSON.parsed object
     * 
     */
    parseJSON(string) {
        try {
            return JSON.parse(string)
        } catch (error) {
            return {}
        }
    }

     /**
     * @name jString
     * @function
     *
     * @param {String} string the string to JSON stringify
     *  
     * @description JSON stringifies a string
     * @return {Object} the JSON.stringified object
     * 
     */
    jString(string) {
        try {
            return JSON.stringify(string) //, replacer, key, value, space)
        } catch (error) {
            return {}
        }
    }

     /**
     * @name hash
     * @function
     *
     * @param {String} string the string to hash
     *  
     * @description hashes a string 
     * @return {String} the hashed string
     * 
     */
    hash(string) {
        if (typeof string == 'string' && string.trim().length > 0) {
            const hash = require('crypto').createHmac(Env.PASSWORD._HASH._METHOD, Env.PASSWORD._HASH._SECRET).update(string).digest('hex');
            return hash;
        } else {
            return false;
        }

    };

    /**
     * @name createRandomString
     * @function
     *
     * @param {String} string the string to hash
     *  
     * @description creates a string of random alpha numeric characters for a given string length
     * @return {String} the random string
     * 
     */

    createRandomString(stringLength) {
        stringLength = typeof stringLength == 'number' && stringLength > 0 ? stringLength : false;

        if (stringLength) {
            // Define all the possible characters  that could go in a string.
            const possibleCharacters = 'abcdefghklmnopqrstxvwyz0123456789ABCEFGHKLMNOPQRSTVWXYZ';
            // star the final string
            let string = '';
            for (let i = 0; i < stringLength; i++) {
                //  Get a random character from the possibleCharacters string
                let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
                //  Append this character  to the final string
                string += randomCharacter;
            }
            // return final string
            return string;
        } else {
            return false;
        }
    };

     /**
     * @name getRandomInt
     * @function
     *
     * @param {Number} min the minimum value of the random number to generate
     * @param {Number} max the maximum value of the random number to generate
     *  
     * @description generates a random number from a minimum value and maximum value
     * 
     * @return {String} the random number
     * 
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * @name generateOrderNumberFirstSet
     * @function
     *  
     * @description generates the first set of number of the first part of the order number
     * 
     * @return {String} the first set of number: 3 numbers
     * 
     */
    generateOrderNumberFirstSet() {
        let first = this.getRandomInt(0, 999)
        let fzeros = ''
        if (first.toString().length < 3) {
            let diff = 3 - first.toString().length

            while (fzeros.length < diff) {
                fzeros += '0'
            }

        }
        return `${this.randomLetterGen()}${fzeros}${first.toString()}`
    }

     /**
     * @name generateOrderNumberSecondSet
     * @function
     *  
     * @description generates the second set of number of the second part of the order number
     * 
     * @return {String} the second set of number: 7 numbers
     * 
     */
    generateOrderNumberSecondSet() {
        let second = this.getRandomInt(0, 9999999)
        let szeros = ''
        if (second.toString().length < 7) {
            let diff = 7 - second.toString().length

            while (szeros.length < diff) {
                szeros += '0'
            }
        }
        return `${this.randomLetterGen()}${szeros}${second.toString()}`
    }
     /**
     * @name generateOrderNumberThirdSet
     * @function
     *  
     * @description generates the third set of number of the third part (or last part) of the order number
     * 
     * @return {String} the third set of number: 10 numbers
     * 
     */
    generateOrderNumberThirdSet() {
        let third = this.getRandomInt(0, 9999999999)
        let tzeros = ''
        if (third.toString().length < 10) {
            let diff = 7 - third.toString().length

            while (tzeros.length < diff) {
                tzeros += '0'
            }

        }
        return `${this.randomLetterGen()}${tzeros}${third.toString()}`
    }

    /**
     * @name generateOrderNumber
     * @function
     *  
     * @description generates order numbers
     * 
     * @return {String} the generated order number
     * 
     */
    generateOrderNumber() {
        const sfinal = this.generateOrderNumberSecondSet()
        const ffinal = this.generateOrderNumberFirstSet()
        const tfinal = this.generateOrderNumberThirdSet()
        const final = `ORDER# ${ffinal}-${sfinal}-${tfinal}`
        return final
    }

    /**
     * @name orderPrice
     * @function
     * 
     * @param {Array} products the order products list
     * 
     * @description calculates order total prices
     * 
     * @return {String} the order total price
     * 
     */
    orderPrice(products = []) {
        if (products && products.length > 0) {
            const subtotal = products
                .map(datum => parseFloat(datum.pricing.subtotal.substring(1)))
                .reduce((x, y) => x + y, 0)

            // const quantity = this.products
            //   .map(datum => parseInt(datum.pricing.quantity))
            //   .reduce((x, y) => x + y, 0)

            const taxing = 0.07 * subtotal
            // const taxed = taxing.toFixed(2)

            const totaling = taxing + subtotal
            const total = totaling.toFixed(2)
            return total
        } else {
            return '0.00'
        }
    }
    /**
     * @name pluralize
     * @function
     * 
     * @param {String} item the item name
     * @param {Number} quantity the item quantity
     * 
     * @description builds the plural forms for regular words
     * 
     * @return {String} return the words either singular or plural
     * 
     */
    pluralize(item, quantity) {
        return (quantity > 1 ? `${item}s` : `${item}`)
    };

    /**
     * @name run
     * @function
     * 
     * @param {String} commands the bash command to run
     * @param {Object} options the options for the bash command
     * @param {Function} fn the callback function
     * 
     * @description sends emails, sms; processes payments, and executes schedules, and much more ...
     * 
     * @return {Function} function that executes the chil_process command
     * 
     */

    async run(commands = 'ls -las', options = {}, fn = () => {}) {
        return require('child_process').exec(commands, options, fn);
    }


      /**
     * @name maxString
     * @function
     * 
     * @param {String} a the string
     * 
     * @description sorts at string 
     * @return {Function} the sorted string
     * 
     */

    maxString(a) {
        return [...a].sort().pop()
    }

     /**
     * @name randomLetterGen
     * @function
     * 
     * @description generates a random letter from A to Z 
     * @return {String} the random letter
     * 
     */
    randomLetterGen() {
        const min = 'A'.charCodeAt()
        const max = 'Z'.charCodeAt()
        return String.fromCharCode(Math.floor(Math.random() * (1 + max - min)) + min)
    }

    /**
     * @name getRandomFileNames
     * @function
     * 
     * @param {String} fileExtension the file extension name
     * 
     * @description generates a random file name
     * 
     * @return {String} the generated file name
     * 
     */
    getRandomFileNames(fileExtension = '') {
        const NAME_LENGTH = 12
        let namePart = new Array(NAME_LENGTH)
        for (let i = 0; i < NAME_LENGTH; i++) {
            namePart[i] = randomLetterGen()
        }
        return namePart.join('') + fileExtension
    }

    

     /**
     * @name formFieldRegexes
     * @function
     * 
     * @description stores all the form field regexes
     * 
     * @return {Object} all the form field regexes
     * 
     */
    formFieldRegexes() {
        return {
            phone: /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm,
            password: /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$/gm,
            passwordConfirmation: /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$/gm,
            firstname: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
            lastname: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
            username: /^[A-Za-z.'\-].{0,25}\S*$/gm,
            nickname: /^[A-Za-z.'\-].{0,25}\S*$/gm,
            email: /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm,
            subject: /^([a-zA-Z0-9_.\ -?!]).{0,100}$/gm,
            email1: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm,
            // Amex Card 
            amexNumber: /^3[47][0-9]{2}([\- ]?)[0-9]{6}([\- ]?)[0-9]{5}$/gm,
            amexSecurityCode: /^[0-9]{4}$/gm,
            amexNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
            amexExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
            // Visa Card 
            visaNumber: /^(?:4000)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/gm,
            visaSecurityCode: /^[0-9]{3}$/gm,
            visaNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
            visaExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
            // Master Card
            masterNumber: /^(?:5100)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/gm,
            masterSecurityCode: /^[0-9]{3}$/gm,
            masterNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
            masterExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
            // Discover
            discoverNumber: /^(?:6011)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/gm,
            discoverSecurityCode: /^[0-9]{3}$/gm,
            discoverNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/gm,
            discoverExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,


            // Zip Code 
            zip: '',
            // city 
            city: '',
            // State
            state: '',
            // Country
            country: /^USA$/gm
        }
    }
     /**
     * @name isRegexValid
     * @function
     * 
     * @param {RegExp} regex the regest to be tested against a string
     * @param {String} input the string to be tested against the regex
     * 
     * @description tests a string against a regex
     * 
     * @return {Boolean} the test result: true of the the matches the regex; false otherwise
     * 
     */
    isRegexValid(regex, input) {
        return regex.test(input)
    }

    /**
     * @name validate
     * @function
     * 
     * @param {String} fieldName  the string to be tested against the regex
     * 
     * @description validates a form field input value against a regex
     * 
     * @return {Boolean} the test result: true of the the matches the regex; false otherwise
     * 
     */
    validate(fieldName){
       return  this.isRegexValid(this.formFieldRegexes()[fieldName], fieldName)
    }

     /**
     * @name validatePhone
     * @function
     * 
     * @param {String} phone the phone number 
     * 
     * @description tests the phone number string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the phone number string matches the regex; false otherwise
     * 
     */
    validatePhone(phone) //{return this.validate(phone)}
       { return this.isRegexValid(this.formFieldRegexes().phone, phone)}
     /**
     * @name validateFirstname
     * @function
     * 
     * @param {String} firstname the first name 
     * 
     * @description tests the first name string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the first name string matches the regex; false otherwise
     * 
     */
    validateFirstname(firstname) //{return this.validate(firstname)}
    { return this.isRegexValid(this.formFieldRegexes().firstname, firstname)}
    //}

    /**
     * @name validateLastname
     * @function
     * 
     * @param {String} lastname the last name 
     * 
     * @description tests the last name string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the last name string matches the regex; false otherwise
     * 
     */
    validateLastname(lastname) //{return this.validate(lastname)}
        {return this.isRegexValid(this.formFieldRegexes().lastname, lastname)}
    // }

    /**
     * @name validateEmail
     * @function
     * 
     * @param {String} email the email 
     * 
     * @description tests the email string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the email string matches the regex; false otherwise
     * 
     */
    validateEmail(email) //{return this.validate(email)}
      {return this.isRegexValid(this.formFieldRegexes().email, email)}
    // }

    /**
     * @name validateUsername
     * @function
     * 
     * @param {String} username the username 
     * 
     * @description tests the username string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the username string matches the regex; false otherwise
     * 
     */
    validateUsername(username) ///{return this.validate(username)} //{
       { return this.isRegexValid(this.formFieldRegexes().username, username)}
    // }

    /**
     * @name validatePassword
     * @function
     * 
     * @param {String} password the password 
     * 
     * @description tests the password string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the password string matches the regex; false otherwise
     * 
     */
    validatePassword(password) //{return this.validate(password)} //{
        {return this.isRegexValid(this.formFieldRegexes().password, password)}
    // }

    /**
     * @name validateNickname
     * @function
     * 
     * @param {String} nickname the nickname 
     * 
     * @description tests the nickname string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the nickname string matches the regex; false otherwise
     * 
     */
    validateNickname(nickname) //{return this.validate(nickname)}//{
        {return this.isRegexValid(this.formFieldRegexes().nickname, nickname)}
    // }

    /**
     * @name validateSubject
     * @function
     * 
     * @param {String} subject the contact us message subject 
     * 
     * @description tests the contact us message subject string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the contact us message subject string matches the regex; false otherwise
     * 
     */
    validateSubject(subject) ///{return this.validate(subject)}//{
     { return this.isRegexValid(this.formFieldRegexes().subject, subject)}
    // }
    // Payment 

    // Amex Card

    /**
     * @name validateAmexNumber
     * @function
     * 
     * @param {String}  amexNumber the American Express card number 
     * 
     * @description tests the American Express card number string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the American Express card number string matches the regex; false otherwise
     * 
     */
    validateAmexNumber(amexNumber) //{return this.validate(amexNumber)}//{
        {return this.isRegexValid(this.formFieldRegexes().amexNumber, amexNumber)}
    // }

    /**
     * @name validateAmexExpirationDate
     * @function
     * 
     * @param {String} amexExpirationDate the American Express card expiration date 
     * 
     * @description tests the American Express card expiration date string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the American Express card expiration date string matches the regex; false otherwise
     * 
     */
    validateAmexExpirationDate(amexExpirationDate)
       { return this.isRegexValid(this.formFieldRegexes().amexExpirationDate, amexExpirationDate)}


    /**
     * @name validateAmexNameOnCard
     * @function
     * 
     * @param {String} amexNameOnCard the name on the American Express card 
     * 
     * @description tests the name on the American Express card string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the name on the American Express card string matches the regex; false otherwise
     * 
     */
    validateAmexNameOnCard(amexNameOnCard) //{return this.validate(amexNameOnCard)}
     {return this.isRegexValid(this.formFieldRegexes().amexNameOnCard, amexNameOnCard)}

    /**
     * @name validateAmexSecurityCode
     * @function
     * 
     * @param {String} amexSecurityCode the American Express card 
     * 
     * @description tests the American Express card string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the American Express card string matches the regex; false otherwise
     * 
     */
    validateAmexSecurityCode(amexSecurityCode) 
 {return this.isRegexValid(this.formFieldRegexes().amexSecurityCode, amexSecurityCode)}


    // Visa Card 
    /**
     * @name validateVisaNumber
     * @function
     * 
     * @param {String} visaNumber the Visa Card number 
     * 
     * @description tests the Visa Card number string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Visa Card number string matches the regex; false otherwise
     * 
     */
    validateVisaNumber(visaNumber) {return this.validate(visaNumber)}//{
    //     return this.isRegexValid(this.formFieldRegexes().visaNumber, visaNumber)
    // }
    /**
     * @name validateVisaExpirationDate
     * @function
     * 
     * @param {String} visaExpirationDate the Visa Card expiration date
     * 
     * @description tests the Visa Card expiration datestring against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Visa Card expiration datestring matches the regex; false otherwise
     * 
     */
    validateVisaExpirationDate(visaExpirationDate) {return this.validate(visaExpirationDate)}// {
    //     return this.isRegexValid(this.formFieldRegexes().visaExpirationDate, visaExpirationDate)
    // }
    /**
     * @name validateVisaNameOnCard
     * @function
     * 
     * @param {String} visaNameOnCard the name of Visa Card 
     * 
     * @description tests the name of Visa Card string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the name of Visa Card string matches the regex; false otherwise
     * 
     */
    validateVisaNameOnCard(visaNameOnCard){return this.validate(visaNameOnCard)}// {
    //     return this.isRegexValid(this.formFieldRegexes().visaNameOnCard, visaNameOnCard)
    // }

    /**
     * @name validateVisaSecurityCode
     * @function
     * 
     * @param {String} visaSecurityCode the Visa Card security code 
     * 
     * @description tests the Visa Card security code string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Visa Card security code string matches the regex; false otherwise
     * 
     */
    validateVisaSecurityCode(visaSecurityCode) {return this.validate(visaSecurityCode)}//{
    //     return this.isRegexValid(this.formFieldRegexes().visaSecurityCode, visaSecurityCode)
    // }

    // Master Card
    /**
     * @name validateMasterNumber
     * @function
     * 
     * @param {String} masterNumber the Master card number 
     * 
     * @description tests the Master card number string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Master card number string matches the regex; false otherwise
     * 
     */
    validateMasterNumber(masterNumber){return this.validate(masterNumber)}// {
    //     return this.isRegexValid(this.formFieldRegexes().masterNumber, masterNumber)
    // }

    /**
     * @name validateMasterExpirationDate
     * @function
     * 
     * @param {String} masterExpirationDate the Master card expiration date 
     * 
     * @description tests the Master card expiration date string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Master card expiration date string matches the regex; false otherwise
     * 
     */
    validateMasterExpirationDate(masterExpirationDate){return this.validate(masterExpirationDate)}// {
    //     return this.isRegexValid(this.formFieldRegexes().masterExpirationDate, masterExpirationDate)
    // }

    /**
     * @name validateMasterNameOnCard
     * @function
     * 
     * @param {String} masterNameOnCard the name of Master card 
     * 
     * @description tests the name of Master card string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the name of Master card string matches the regex; false otherwise
     * 
     */
    validateMasterNameOnCard(masterNameOnCard) {return this.validate(masterNameOnCard)} //{
    //     return this.isRegexValid(this.formFieldRegexes().masterNameOnCard, masterNameOnCard)
    // }

    /**
     * @name validateMasterSecurityCode
     * @function
     * 
     * @param {String} masterSecurityCode the Master card security code 
     * 
     * @description tests the Master card security code string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Master card security code string matches the regex; false otherwise
     * 
     */
    validateMasterSecurityCode(masterSecurityCode) {return this.validate(masterSecurityCode)}//{
    //     return this.isRegexValid(this.formFieldRegexes().masterSecurityCode, masterSecurityCode)
    // }

    // Discover Card 

    /**
     * @name validateDiscoverNumber
     * @function
     * 
     * @param {String} discoverNumber the Discover card number 
     * 
     * @description tests the Discover card number string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Discover card number string matches the regex; false otherwise
     * 
     */
    validateDiscoverNumber(discoverNumber) {return this.validate(discoverNumber)}//{
    //     return this.isRegexValid(this.formFieldRegexes().discoverNumber, discoverNumber)
    // }

    /**
     * @name validateDiscoverExpirationDate
     * @function
     * 
     * @param {String} discoverExpirationDate the Discover card expiration date 
     * 
     * @description tests the Discover card expiration date string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Discover card expiration date string matches the regex; false otherwise
     * 
     */
    validateDiscoverExpirationDate(discoverExpirationDate) {return this.validate(discoverExpirationDate)}// {
    //     return this.isRegexValid(this.formFieldRegexes().discoverExpirationDate, discoverExpirationDate)
    // }
    /**
     * @name validateDiscoverNameOnCard
     * @function
     * 
     * @param {String} discoverNameOnCard the name on Discover card 
     * 
     * @description tests the name on Discover card string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the name on Discover card string matches the regex; false otherwise
     * 
     */
    validateDiscoverNameOnCard(discoverNameOnCard) {return this.validate(discoverNameOnCard)}//{
    //     return this.isRegexValid(this.formFieldRegexes().discoverNameOnCard, discoverNameOnCard)
    // }

    /**
     * @name validateDiscoverSecurityCode
     * @function
     * 
     * @param {String} discoverSecurityCode the Discover card security code 
     * 
     * @description tests the Discover card security code string against its corresponding form field regex
     * 
     * @return {Boolean} the test result: true if the Discover card security code string matches the regex; false otherwise
     * 
     */
    validateDiscoverSecurityCode(discoverSecurityCode) {return this.validate(discoverSecurityCode)}//{
    //     return this.isRegexValid(this.formFieldRegexes().discoverSecurityCode, discoverSecurityCode)
    // }

    /**
     * @name validateCountry
     * @function
     * 
     * @param {String} country the country name 
     * 
     * @description tests the country name string against its corresponding form field regex
     * @return {Boolean} the test result: true if the country name string matches the regex; false otherwise
     * 
     */
    validateCountry(country) {return this.validate(country)}//{
    //     return this.isRegexValid(this.formFieldRegexes().country, country)
    // }

    /**
     * @name validateInputData
     * @function
     * 
     * @param {Object} data the request payload
     * 
     * @description tests each form field value against its corresponding regex
     * @return {Object} emitter, emit an invalid event upon test fail
     * 
     */
    validateInputData(data = {}) {
        if (data && data.payload) {
            for (let payload in data.payload) {
                const firstLetter = payload.slice(-payload.length, 1).toLocaleUpperCase()
                const rest = payload.slice(1, payload.length)
                const string = `${firstLetter}${rest}`
                const method = `validate`.concat(string)
                    if (this[method] !== undefined) {
                        if (!this[method](data.payload[payload])) {
                            //handle errors
                            this.error[`${payload}`] = `Invalid ${payload}`
                            this.emit('invalid', this.error)
                            this.error = {}
                            break
                        }
                    }
                    // console.log('this[method]',this[method](data.payload[payload]))
            }
        }
    //   const getReg =  (fieldName) => this.isRegexValid(this.formFieldRegexes() 
    // console.log(this.validateFirstname('firstname'))
    }


}
// Export Helpers
module.exports = Helpers



'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module ENV
 * @kind class
 * 
 * @extends Resources
 * 
 * @requires Resources
 * @requires env
 * 
 * @classdesc Specific environment variables
 * 
 */
const Resources = require('../../resources')

const env = require('./.env')
class ENV extends Resources {
    constructor() {
        super()

    }

    /**
     * @name STWILIO (static)
     * @function 
     *
     * @description sets stwilio environment variable
     * @return {Object} TWILIO 
     * 
     */
    static TWILIO() {
        return env.TWILIO
    }

    /**
     * @name MAILGUN (static)
     * @function 
     *
     * @description sets mailgun environment variable
     * @return {Object} MAILGUN
     * 
     */
    static MAILGUN() {
        return env.MAILGUN
    }

    /**
     * @name STRIPE (static)
     * @function
     *
     * @description sets strip environment variable
     * @return {Object} STRIPE
     * 
     */
    static STRIPE() {
        return env.STRIPE
    }

    /**
     * @name PASSWORD (static)
     * @function 
     *
     * @description sets password environment variable
     * @return {Object} PASSWORD
     * 
     */
    static PASSWORD() {
        return env.PASSWORD
    }

    /**
     * @name smsKeys
     * @function
     *
     * @description sets twilio environment variable
     * @return {Object} STWILIO
     * 
     */
    smsKeys() {
        return env.TWILIO
    }

    /**
     * @name mailKeys
     * @function
     *
     * @description sets mailgun environment variable
     * @return {Object}  MAILGUN
     * 
     */
    mailKeys() {
        return env.MAILGUN
    }

    /**
     * @name paymentKeys
     * @function
     *
     * @description sets stripe environment variable
     * @return {Object} STRIPE
     * 
     */
    paymentKeys() {
        return env.STRIPE
    }

    /**
     * @name password
     * @function
     *
     * @description sets password environment variable
     * @return {Object} PASSWORD
     * 
     */
    password() {
        return env.PASSWORD
    }
}
// Export ENV
module.exports = ENV
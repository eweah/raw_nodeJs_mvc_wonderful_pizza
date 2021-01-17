'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module UsersControllerUtils
 * @kind class
 * 
 * @extends HTTPController
 * 
 * @requires HTTPController
 * 
 * @classdesc Resourceful controller for interacting with users
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */


const HTTPController = require('../../../HTTP')

const checks = require('./checkers')
class UsersControllerUtils extends HTTPController {
    constructor() {
        super()
        // errors
        this.errors = []
        // sessions
        this.sessions = []
        // success 
        this.successes = []

        this.autobind(UsersControllerUtils)
    }

    /**
     * @name onPrepareUserToShow
     * @function
     * 
     * @param {Object}  order the customer's order
     * @param {Function}  fn call back function
     *
     * @description gets and return the authenticated custoemr or user
     * @return {Function} fn the callback function with the authenticated customer or user or with an error message
     * 
     */

    async onPrepareUserToShow(fn) {
        return  await this.authCheck() ?  fn(200, await this.auth()) : fn(200,{error: 'Unauthorized'})
    }

    /**
     * @name upadateUser
     * @function
     * 
     * @param {String}  phone the authenticated customer's or user's phone number
     * @param {Object}  user the authenticated customer or user
     *
     * @description updates the authenticated customer or user
     * @return does not return anything
     * 
     */

    async upadateUser(phone, user) {
        await this.fileUpdate(`users/${phone}.json`, user)
    }

    /**
     * @name setUserToUpdate
     * @function
     * 
     * @param {Object}  _check_data the authenticated customer's or user's object containing data to update
     * @param {Object}  user the authenticated customer or user
     *
     * @description sets up the authenticated customer or user for updating
     * @return {Object}  user the authenticated customer or user
     * 
     */

    async setUserToUpdate(_check_data) {
        const date = new Date
        const user = await this.auth()
        if (_check_data.firstname) user.firstname = _check_data.firstname;
        if (_check_data.lastname) user.lastname = _check_data.lastname;
        if (_check_data.username) user.username = _check_data.username;
        if (_check_data.email) user.email = _check_data.email;
        if (_check_data.nickname) user.nickname = _check_data.nickname;
        if (_check_data.password) user.password = this.hash(_check_data.password);
        user.updated_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        return user
    }

    /**
     * @name userToUpdate
     * @function
     * 
     * @param {Object}  _check_data the authenticated customer's or user's object containing data to update
     *
     * @description updates the authenticated customer or user 
     * @return {Function} fn the call back with the updated  authenticated customer or user
     * 
     */
    async userToUpdate(_check_data) {
        if (await this.authCheck()) {
            const user = await this.setUserToUpdate(_check_data)
            this.upadateUser(_check_data.phone, user)
            return this.fn(200, {
                message: 'Account updated',
                user
            })
        } else {
            return fn(200, {
                error: 'Unauthorized'
            })
        }
    }

    /**
     * @name onPrepareUserToUpdate
     * @function
     *
     * @description prepares and updates the authenticated customer or user 
     * @return {Function} fn the call back with error on updating object
     * 
     */
    async onPrepareUserToUpdate() {
        return await this.authCheck() ?
            checks.uiCheck(this.data).isDataOk ?
            this.userToUpdate(checks.uiCheck(this.data)) :
            this.fn(200, {
                error: 'Limited rights'
            }) :
            this.fn(200, {
                error: 'unauthorized'
            })
    }
    /**
     * @name deleteUserTokens
     * @function
     * 
     * @param {Array} tokens the authenticated customer's or user's tokens
     * @param {String} phone then authenticated customer's or user's  phone
     * 
     * @description deletes and removes all the authenticated customer's  or user's tokens 
     * @return does not return anything
     * 
     */
    async deleteUserTokens(tokens = [], phone = '') {
        if (tokens && tokens.length > 0) {
            for (let token of tokens) {
                const aToken = await this.fileRead(`tokens/${token}.json`)
                    .then(JSON.parse)
                if (aToken && aToken.phone === phone) {
                    await this.fileDelete(`tokens/${token}.json`)
                }
            }
        }
    }
    /**
     * @name deleteUserTokens
     * @function
     * 
     * @param {Array} cart the authenticated customer's or user's cart
     * 
     * @description deletes and removes all the authenticated customer's  or user's cart items
     * @return does not return anything
     * 
     */
    async deleteUserCartItems(cart = []) {
        if (cart && cart.length > 0) {
            for (let item of cart) {
                await this.fileDelete(`carts/users/${item}.json`)
            }
        }
    }
    /**
     * @name deleteUserTokens
     * @function
     * 
     * @param {String} phone then authenticated customer's or user's  phone
     * 
     * @description deletes and removes all the authenticated customer's  or user's phone number
     * @return does not return anything
     * 
     */
    async deleteUser(phone) {
        await this.fileDelete(`users/${phone}.json`)
    }
    /**
     * @name deletionOnFailError
     * @function
     * 
     * 
     * @description deletion failure error
     * @return fn, the callaback with the deletion failure object
     * 
     */
    deletionOnFailError() {
        this.errors.push({
            unknown: `Error deleting your account.`
        })
        const errors = this.errors
        this.errors = []
        return this.fn(200, {
            errors
        })

    }
    /**
     * @name deletionUnauthorizedError
     * @function
     * 
     * 
     * @description deletion unauthorized error
     * @return fn, the callaback with the unauthorized deletiion error object
     * 
     */
    deletionUnauthorizedError() {
        // handle error
        this.errors.push({
            unknown: `unauthorized'`
        })
        const errors = this.errors
        this.errors = []
        return this.fn(200, {
            errors
        })
        return
    }

    /**
     * @name userToDelete
     * @function
     * 
     * 
     * @description gets the user to delete and delete user
     * @return fn, the callaback with the success message upong successfull deletion
     * 
     */
    async userToDelete() {
        const tokens = await this.all(`tokens`)
        const user = await this.auth()
        this.deleteUserTokens(tokens, user.phone)
        this.deleteUserCartItems(user.cart)
        this.deleteUser(user.phone)
        return this.fn(200, {
            ok: 'user deleted'
        })
    }

    /**
     * @name onPrepareUserToDestroy
     * @function
     * 
     * 
     * @description prepares and delete the customer or user to destroy
     * @return does not return anything
     * 
     */
    async onPrepareUserToDestroy() {
        if (await this.authCheck()) {
            try {
                this.userToDelete()
            } catch (error) {
                this.deletionOnFailError()
            }
        } else {
            this.deletionUnauthorizedError()
        }
    }

    /**
     * @name theUserObject
     * @function
     * 
     * 
     * @description builds  the customer or user to register
     * @return {Object} userObject the user to register object
     * @return {String} userObject the user to register object hashed password
     * 
     */

    async theUserObject() {
        const codeString = `${this.data.payload.username}${this.data.payload.phone}${this.data.payload.username}`
        const hashedPassword = this.hash(this.data.payload.password)
        const date = new Date
        const userObject = {
            firstname: this.data.payload.firstname,
            lastname: this.data.payload.lastname,
            username: this.data.payload.username,
            email: this.data.payload.email,
            phone: this.data.payload.phone.split('-').join(''),
            active: false,
            is_admin: false,
            nickname: this.data.payload.nickname,
            aToken: this.hash(codeString),
            password: hashedPassword,
            tosAgreement: true,
            created_at: `${date.toDateString()} ${date.toLocaleTimeString()}`,
            updated_at: `${date.toDateString()} ${date.toLocaleTimeString()}`
        };

        // Create user's account if it does not exist
        // Create user's account if it does not exist
        await this.fileCreate(`users/${this.data.payload.phone.split('-').join('')}.json`, userObject)
        // Send email verification link
        return {
            hashedPassword,
            userObject
        }
    }

    /**
     * @name hashPasswordOnFailError
     * @function
     * 
     * @description create the error message object on password has failure
     * @return {Function} fn, the callback function with the error message object
     * 
     */

    hashPasswordOnFailError(fn) {
        //handle errors
        this.errors.push({
            unknown: `Could not hash user's password.`
        })
        const errors = this.errors
        this.errors = []
        return fn(200, {
            errors
        })
    }
    /**
     * @name registrationOnSuccessMessage
     * @function
     * 
     * @param {Object} userObject the newly created user object
     * @description create the success message object upon registration success
     * @return {Function} fn, the callback function with the success message object
     * 
     */
    registrationOnSuccessMessage(userObject = {}) {
        this.successes.push({
            registration: ` Registered successfully!`,
            user: userObject
        })
        const successes = this.successes
        this.successes = []
        return this.fn(200,successes)
    }
    /**
     * @name hashedPassword
     * @function
     * 
     * @description get the user's hased password from the theUserObject
     * @return {String} password.hasedPassword the new created hasded password of the user
     * 
     */
    async hashedPassword() {
        const password = await this.theUserObject()
        return password.hashedPassword
    }

    /**
     * @name getUserObject
     * @function
     * 
     * @description get the user's hased password from the theUserObject
     * @return {Object} user.userObject the newly created  user
     * 
     */
    async getUserObject(fn) {
        const user = await this.theUserObject(fn)
        return user.userObject
    }

    /**
     * @name userToRegister
     * @function
     * 
     * @description create the newly build user object upon successful hashing password
     * @return does not result anything
     * 
     */
    async userToRegister(fn = () => {}) {
        if (await this.hashedPassword()) {
            await this.theUserObject(fn)
            this.registrationOnSuccessMessage(await this.getUserObject(fn))
        } else {
            this.hashPasswordOnFailError(fn)
        }
    }


    /**
     * @name validateUserToRegister
     * @function
     * 
     * @description checks, verifies, and validate data for the new user to be created or to be stored 
     * @return does not return anything
     * 
     */
    async validateUserToRegister() {

        // handler error
        this.on('invalid', message => {
            this.errors = []
            this.errors.push(message)
        })
        // validate input data
        this.validateInputData(this.data)

    }

    /**
     * @name registerUser
     * @function
     * 
     * @description registers (creates or stores) the new build customer or user
     * @return does not return  anything
     * 
     */
    
    async registerUser() {
        this.fileRead(`users/${this.data.payload.phone.split('-').join('')}.json`)
            .then(() => {
                //handle errors
                this.errors.push({
                    phone: `A user with that phone number already exists.`
                })
                const errors = this.errors
                this.errors = []
                this.fn(200, {
                    errors
                })
                return
            })
            .catch(async () => {
                this.userToRegister()
               
            })
    }

    /**
     * @name checkCheckersData
     * @function
     * 
     * @description checks, verifies, and validate new user to be created data
     * @return {Boolean} true or false
     * 
     */

    checkCheckersData() {
        if (checks.puCheck(this.data).isDataOk) {
            return true
        } else {
            return false
        }
    }

    /**
     * @name handleErrorOnFail
     * @function
     * 
     * @description create the error message object upon customer or user registration failure
     * @return {Function} fn, the callback function with the error message object
     * 
     */
    handleErrorOnFail(fn) {
        // handle error
        this.errors.push({
            empty: `One or more of the requirements is either missing or invalid.`
        })
        const errors = this.errors
        this.errors = []
        return fn(200, {
            errors
        })
    }

    /**
     * @name validateAndRegisterUser
     * @function
     * 
     * @description validate the customer or user to register data and registers the customer or user
     * @return does not return anything
     * 
     */
    validateAndRegisterUser(fn) {
        this.validateUserToRegister()
        if (this.errors[0] === undefined) {
            this.registerUser(fn)
        } else {
            const errors = this.errors
            this.errors = []
            return fn(200, {
                errors
            })
          
        }
    }

    /**
     * @name onPrepareUserToRegister
     * @function
     * 
     * @description prepates the customer or user to register data and registers the customer or user
     * @return does not return anything
     * 
     */
    async onPrepareUserToRegister(fn) {
        if (this.checkCheckersData()) {
            this.validateAndRegisterUser(fn)
        } else {
            this.handleErrorOnFail(fn)
        }
    }
}

module.exports = UsersControllerUtils

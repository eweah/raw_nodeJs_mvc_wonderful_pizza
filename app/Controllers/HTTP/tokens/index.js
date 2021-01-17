'use strict'



/**
 * Resourceful controller for interacting with tokens
 */

/** 
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 *
 */


// Requires The HTTPController class

const TokensControllerUtils = require('./utils')

class TokensController extends TokensControllerUtils {
    constructor() {
        
        super()
        // errors
        this.errors = []
        // sessions
        this.sessions = []
        // bind methods to this class
        this.autobind(TokensController)
       

    }


    /**
     * gets all tokens
     * GET api/tokens/all 
     * Requires: none
     *
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     */

    index (data, fn, req, res) {}


    /**
     * posts a token
     * POST api/tokens/add 
     * 
     * Required data: 
     *   1. phone
     *   2. password
     * Options: none
     *
     * @param {Request} data  the  request object data
     * @param {Response} fn  the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware(optional)
     * 
     */

    async store(data, fn, req, res) {
        this.setMethod(data, fn, 'post')
        this.onTokenToStore()
        this.requested(data.payload)
    }


    /**
     * gets a token
     * GET api/tokens/edit 
     * 
     * Required data: id (token.id)
     * Options: none
     *
     * @param {Request} data  the request object data
     * @param {Response} fn  the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware(optional)
     * 
     */
    async show (data, fn, req, res) {
        // Set method to GET
        this.setMethod(data, fn, 'get')
        this.onTokenToShow(data, fn)
        
    }


    /**
     * updates a token
     * PUT api/tokens/edit 
     * 
     * Required data: id (token.id)
     * Options: none
     *
     * @param {Request} data the request object data
     * @param {Response} fn  the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware(optional)
     * 
     */
    async update  (data, fn, req, res) {
        // Set method to PUT
        this.setMethod(data, fn, 'put')
        // Check for data payload
         this.onTokenToUpdate(data,fn)
    };

    /**
     * delete a token
     * DELETE api/tokens/edit 
     * 
     * Required data: id (token.id)
     * Options: none
     *
     * @param {Request} data the request object data
     * @param {Response} fn  the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware(optional)
     * 
     */
    async destroy(data, fn, req, res) {

        //Set method to DELETE
        this.setMethod(data, fn, 'delete')

        // check data payload
        if (!data._id || !data._password) {
            // handle error
            this.errors.push({
                unknown: 'Missing phone and/or passowrd or invalid phone and/or password'
            })
            const errors = this.errors
            this.errors = []
            fn(200, {
                errors
            })
            return
        }
        try {
            // get token
            const token = await this.fileRead(`tokens/${data._id}.json`)
                .then(JSON.parse)

                // handle error
                .catch(error => {
                    this.errors.push({
                        unknown: 'Credentials not found'
                    })
                    const errors = this.errors
                    this.errors = []
                    fn(200, {
                        errors
                    })
                    return
                })
            if (!token) return
            // get user from token data
            const user = await this.fileRead(`users/${token.phone}.json`)
                .then(JSON.parse)
                // handler error
                .catch(error => {
                    this.errors.push({
                        phone: 'Unrecognized phone number'
                    })
                    const errors = this.errors
                    this.errors = []
                    fn(200, {
                        errors
                    })
                })
            if (!user) return

            // hash incoming password
            const hashedPassword = this.hash(data._password)

            // check credentials
            if (user.phone === token.phone && user.password === hashedPassword) {

                // delete token
                await this.fileDelete(`tokens/${data._id}.json`)
                return fn(200, {
                    message: 'token deleted',
                    token
                })
            } else {
                // handler error
                this.errors.push({
                    unknown: 'Unauthorized'
                })
                const errors = this.errors
                this.errors = []
                fn(200, {
                    errors
                })
            }

        } catch (er) {
            // handle error
            this.errors.push({
                unknown: 'Error logging you out'
            })
            const errors = this.errors
            this.errors = []
            fn(200, {
                errors
            })
        }

    };
    /**
     * prepares the token to be updated
     * 
     * Required data: id (token.id)
     * Options: none
     *
     * @param {Request} data the request object data
     * @param {Response} fn  the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware(optional)
     * 
     */
    
    /**
     * prepares the token to be stored
     * 
     * Required data: id (token.id)
     * Options: none
     *
     * @param {Request} data the request object data
     * @param {Response} fn  the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware(optional)
     * 
     */
  

}
// Export the TokensController class
module.exports = TokensController

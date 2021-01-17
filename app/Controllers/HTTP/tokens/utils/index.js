'use strict'
const HTTPController = require('../../../HTTP')

class TokensControllerUtils extends HTTPController {
    constructor() {
        super()
        this.autobind(TokensControllerUtils)
    }

    tokenStoreOnFailError() {
        // handle errors
        this.errors.push({
            unknown: 'Error logging you in'
        })
        const errors = this.errors
        this.errors = []
        this.fn(200,{
            errors
        })
    }
    storeToken() {
        try {
            this.prepareToken()
        } catch (er) {
            this.tokenStoreOnFailError()
        }
    }
    onTokenToStore() {
        this.storeToken()
    }
    async getToken(data = {}, fn = () => {}){
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
    // return response
    return fn(200, token)
    }
    getTokenOnFailError(fn = () => {}){
        // handle error
        this.errors.push({
            unknown: 'Unauthorized'
        })
        const errors = this.errors
        this.errors = []
        fn(200, {
            errors
        })
    }
    async onTokenToShow(data, fn) {
        try {
            this.getToken(data, fn)
        } catch(err) {
         this.getTokenOnFailError(fn)
        }

    }

    async tokenToUpdate(data, fn, req, res) {
        // get token
        const token = await this.fileRead(`tokens/${data._id}.json`)
            .then(JSON.parse)
            //handle error
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
        // check token expiration
        if (token.expires > Date.now()) {

            // get user from token data
            const user = await this.fileRead(`users/${token.phone}.json`)
                .then(JSON.parse)
                // handle error
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
            const hashedPassword = this.hash(data._password);
            // check credentials
            if (user.phone === token.phone && hashedPassword === user.password) {
                try {
                    // Set the expiration an hour from now
                    token.expires = Date.now() + 1000 * 60 * 60;
                    await this.fileUpdate(`tokens/${data._id}.json`, token)
                    this.sessions.push({
                        success: 'Session  expiration extended successfully..'
                    })
                    const sessions = this.sessions
                    this.sessions = []
                    // return success (updated) session data
                    fn(200, {
                        sessions
                    })

                } catch (er) {
                    // handle errors
                    this.sessions.push({
                        error: 'Could not extend session expiration time.'
                    })
                    const sessions = this.sessions
                    this.sessions = []
                    fn(200, {
                        sessions
                    })
                }
            } else {
                // handle error
                this.errors.push({
                    unknown: 'Unauthorized'
                })
                const errors = this.errors
                this.errors = []
                fn(200, {
                    errors
                })
            }
        } else {
            // handle error
            this.sessions.push({
                error: 'Session has already expired and cannot be extended.'
            })
            const sessions = this.sessions
            this.sessions = []
            fn(200, {
                sessions
            })

        }
    }
    // async tokenToUpdate(data, fn, req, res) {
    //      const user = await this.auth()
    //         // hash incoming password
    //         const hashedPassword = this.hash(data._password);
    //         // check credentials
    //         if (user.phone === token.phone && hashedPassword === user.password) {
    //             try {
    //                 // Set the expiration an hour from now
    //                 token.expires = Date.now() + 1000 * 60 * 60;
    //                 await this.fileUpdate(`tokens/${data._id}.json`, token)
    //                 this.sessions.push({
    //                     success: 'Session  expiration extended successfully..'
    //                 })
    //                 const sessions = this.sessions
    //                 this.sessions = []
    //                 // return success (updated) session data
    //                 fn(200, {
    //                     sessions
    //                 })

    //             } catch (er) {
    //                 // handle errors
    //                 this.sessions.push({
    //                     error: 'Could not extend session expiration time.'
    //                 })
    //                 const sessions = this.sessions
    //                 this.sessions = []
    //                 fn(200, {
    //                     sessions
    //                 })
    //             }
    //         } else {
    //             // handle error
    //             this.errors.push({
    //                 unknown: 'Unauthorized'
    //             })
    //             const errors = this.errors
    //             this.errors = []
    //             fn(200, {
    //                 errors
    //             })
    //         }
        
    // }
    tokenMissingDataOnFailError(data = {}, fn = () => {}){
        if (!data._id || !data._extend || !data._password) {
            // handle error
            this.errors.push({
                unknown: 'Missing phone and/or passowrd or invalid phone and/or password'
            })
            const errors = this.errors
            this.errors = []
            fn(200, {
                errors
            })
        }

    }
    tokenUpdateAuthorizationOnFailError(fn = () => {}){
         // handle error
         this.errors.push({
            unknown: 'Unauthorized'
        })
        const errors = this.errors
        this.errors = []
        fn(200, {
            errors
        })
    }
    updateToken(data = {}, fn = () => {}){
        try {
            // update token
            this.tokenToUpdate(data, fn)
        } catch (er) {
           this.tokenUpdateAuthorizationOnFailError(fn)
        }
    }
    async onTokenToUpdate(data = {}, fn = () => {}){
        this.tokenMissingDataOnFailError(data, fn)
        this.updateToken(data, fn)
    }
   
    async prepareToken () {
        // get user from phone and password data
        const user = await this.fileRead(`users/${this.data._phone.split('-').join('')}.json`)
            .then(JSON.parse)
            // handle error
            .catch(error => {
                this.errors.push({
                    phone: 'Unrecognized phone number'
                })
                const errors = this.errors
                this.errors = []
                this.fn(200, {
                    errors
                })
            })
        if (!user) return
        // hash incoming password
        const hashedPassword = this.hash(this.data._password);

        // check credentials
        if (hashedPassword === user.password) {
            // If valid create a new token with a random name.
            // Set expiration date one hour in the future
            const tokenId = this.createRandomString(30);
            const expires = Date.now() + 1000 * 60 * 60 * 3;
            // build the token object
            const tokenObject = {
                id: tokenId,
                phone: this.data._phone,
                expires: expires,
            };
            // store the token object
            await this.fileCreate(`tokens/${tokenId}.json`, tokenObject)
            // return token object response
            // this.transformInit(tokenObject)
            // this.fsCreate(`tokens/${tokenId}.json`)

            this.userHasLoggedIn({user, tokenObject})
            this.fn(200, tokenObject)
            this.errors = []
        } else {
            // handle error
            this.errors.push({
                password: 'Incorrect password'
            })
            const errors = this.errors
            this.errors = []
            this.fn(200, {
                errors
            })

        }
    }
}

module.exports = TokensControllerUtils
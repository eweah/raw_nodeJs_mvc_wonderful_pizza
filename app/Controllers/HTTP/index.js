'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module HTTPController
 * @kind class
 * @extends Controller
 * 
 * @classdesc Resourceful controller for interacting with request
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */

const Controller = require('../../Controllers')
class HTTPController extends Controller {
     constructor() {
        super()
        this.data = {}
        this.fn = () => {}  
 
        // auto bind methods
        this.autobind(HTTPController)
        
    }
     /**
     * @name setMethod
     * @function
     * 
     * @param {Object}   data the request object data 
     * @param {Function}  fn the response function 
     * @param {String} method the HTTP method
     *
     * @description verifies and set all request objects and all callback response functions
     * @return {Class} this class 
     * 
     */
    setMethod(data, fn, method = 'get') {
        if (['post', 'get', 'put', 'delete'].indexOf(data.method) > -1) {
    
            data.method = method;
            let id, token, phone, password, extend
            if(data.payload && data.payload.id) id = data.payload.id
            if(data.payload && data.payload.password) password = data.payload.password
            if(data.payload && data.payload.extend) extend = data.payload.extend
            if(data.payload && data.payload.phone) phone = data.payload.phone
            if(data.headers && data.headers.token) token = data.headers.token
           

            if (extend && typeof extend === 'boolean' && extend === true) data._extend = extend
            if (id && typeof(id) === 'string' && id.trim().length === 30) data._id = id.trim()
            if (password && typeof password.trim() === 'string') data._password = password.trim()
            if (token && typeof(token) === 'string' && token.trim().length === 30) data._token = token.trim()
            if (phone && typeof(phone) === 'string' && phone.trim().split('-').join('').length === 10) data._phone = phone.trim().split('-').join('')

            // if (data.payload.extend && typeof data.payload.extend === 'boolean' && data.payload.extend === true) data._extend = data.payload.extend
            // if (data.payload.id && typeof(data.payload.id) === 'string' && data.payload.id.trim().length === 30) data._id = data.payload.id.trim()
            // if (data.payload.password && typeof data.payload.password.trim() === 'string') data._password = data.payload.password.trim()
            // if (data.headers.token && typeof(data.headers.token) === 'string' && data.headers.token.trim().length === 30) data._token = data.headers.token.trim()
            // if (data.payload.phone && typeof(data.payload.phone) === 'string' && data.payload.phone.trim().split('-').join('').length === 10) data._data.payload.phone = data.payload.phone.trim().split('-').join('')
            
           this.data = data
           this.fn = fn
       
        } else {
            return fn(200, {error: 'only get, post, put, delete methods are allowed'});
        }

        return this
    }
     /**
     * @name verifyToken
     * @function
     *
     * @description check and verifies authorization for the authenticated customer or user
     * @return {Boolean} true or false
     * 
     */
    async verifyToken() {
        if (!this.data) return false
        if (!this.data.payload) return false
        if (!this.data._token) {
            return false
        } else {
            if (this.data._token) {
                try {
                    const token = await this.fileRead(`tokens/${this.data._token}.json`).then(JSON.parse)
                    if (!token) return false
                    if (token && token.expires > Date.now() && token.phone) {
                        try {
                            const user = await this.fileRead(`users/${token.phone}.json`).then(JSON.parse)
                            if (!user) return false
                            if (user) {
                                if (user.phone !== token.phone) return false
                                if (token.phone === user.phone) {
                                    return true
                                } else {
                                    return false
                                }
                            } else {
                                return false
                            }
                        } catch (error) {
                            return false
                        }
                    } else {
                        return false
                    }

                } catch (error) {
                    return false
                }
            } else {
                return false
            }
        }
    }
     /**
     * @name authUser
     * @function
     *
     * @description gets and set the authenticated customer's or user's details including all tokens, all orders, and all  *              cart items
     * @return {Object} authUserDetails the authenticated customer's or user's details
     * 
     */
    async authUser(){
        const user = await this.auth()
        const cartItems = await this.authCartItems()
        const orders = await this.authOrders()
        const tokens = await this.authTokens()
        const authUserDetails = {
             user, 
             tokens, 
             orders, 
             cart: cartItems
        }
        return authUserDetails
    }

    /**
     * @name authCartItems
     * @function
     *
     * @description gets and set the authenticated customer's or user's cart items
     * @return {Object} authCart the authenticated customer's or user's cart
     * 
     */
    async authCartItems(){
        if(this.authCheck()){
            const user = await this.auth()
          
            this.authCart = []
            if(user.cart && user.cart.length > 0){
                for (let item of user.cart){
                    let product =  await this.fileRead(`carts/users/${item}.json`).then(JSON.parse)
                    this.authCart.push(product)
                }
            }
            return this.authCart
        }
        return this
    }
    
    /**
     * @name authOrders
     * @function
     *
     * @description gets and set the authenticated customer's or user's orders
     * @return {Object} this.orderProducts the authenticated customer's or user's orders
     * 
     */
    async authOrders(){
      
        if(this.authCheck()){
            const user = await this.auth()
          
            this.orderProducts = []
            if(user.orders && user.orders.length > 0){
                for (let item of user.orders){
                    let product =  await this.fileRead(`orders/${item}.json`).then(JSON.parse)
                    this.orderProducts.push(product)
                }
            }
            return this.orderProducts
        }
        return this
    }

     /**
     * @name authTokens
     * @function
     *
     * @description gets and set the authenticated customer's or user's tokens
     * @return {Object} this.authStoredTokens the authenticated customer's or user's tokens
     * 
     */

    async authTokens(){
        if(this.authCheck()){
            const tokens = await this.all('tokens')
            const user = await this.auth()
                 this.authStoredTokens = []
            for (let token of tokens){
                let aToken =  await this.fileRead(`tokens/${token}.json`).then(JSON.parse)
                if(aToken.phone === user.phone) this.authStoredTokens.push(aToken)
            }
             return this.authStoredTokens
        }
        return this
    }

     /**
     * @name auth
     * @function
     *
     * @description gets and sets the authenticated custome or user
     * @return {Object} this.authenticated the authenticated customer or user
     * 
     */
    async auth() {
        if(this.verifyToken()){
            // get the phone number from the token id
        const phone = await this.fileRead(`tokens/${this.data._token}.json`).then(data => JSON.parse(data).phone)
        // get the user from the token phone number
        this.authenticated = await this.fileRead(`users/${phone}.json`).then(JSON.parse)
        this.shipping = {}
           try{
            const orderRecords = await this.fileRead(`shippings/${phone}.json`).then(JSON.parse)
            if(orderRecords){
               this.authenticated.records = orderRecords
            }
           }catch(err){
            this.authenticated.records = null
           }
         return this.authenticated
        }else{
            return null
        }
    }
   
   
    /**
     * @name authCheck
     * @function
     *
     * @description checks and verifies for the presence of an authenticated customer or user
     * @return {Boolean} true or false
     * 
     */
    async authCheck(){
       const isTokenVerified = this.verifyToken()
        if(isTokenVerified){
            const user = await this.auth()
            if(user === null) return false
            return true
        }else{
            return false
        }
    
    }


}
// Export HTTPController
module.exports = HTTPController
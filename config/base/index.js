'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Base
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Base class for the whole system. The main and only ancestor of all the classes of the whole system (the entire back end code base)
 * 
 * @typedef {Object}  className the request object data 
 * @typedef {Response} response the response function 
 * @typedef {Request}  user the request object or middleware
 * @typedef {Request} account the response object or middleware
 * @typedef {Request} request the response object or middleware
 * 
 */


class Base extends require('stream').Transform {
    constructor() {
        super({objectMode: true})
        // auto bind methods
        this.autobind(Base)
    }
 
    /**
     * @name autobinder
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     * 
     * @description auto sets and auto binds every and all methods for the corresponding class (except the constructor)
     * @return does not return anything
     * 
     */

     autobinder(className = {}){
        for(let method of Object.getOwnPropertyNames(className.prototype)){
          if(typeof(this[method]) === 'function' && method !=='constructor'){
              this[method] = this[method].bind(this)
          }
        }
    }
    /**
     * @name autobind
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     * 
     * @description auto mounts and auto binds every and all methods for the corresponding class including itself(it self mounts and self binds)
     * @return does not return anything
     * 
     */
   autobind(className = {}){
        this.autobinder = this.autobinder.bind(this)
        this.autobinder(className)
    }

    _transform(chunk, encoding, fn){
        this.push(chunk.toString())
        fn()
    }
    _flush(chunk, enconding,fn){
        this.push(chunk.toString())
        fn()
    }
      
    /**
     * @name userHasLoggedIn
     * @function
     *
     * @param {Object} user the customer or user object
     * 
     * @description emits  'user-has-logged-in' event
     * @return does not return anything
     * 
     */
    userHasLoggedIn(user){
        this.emit('user-has-logged-in', user)
    }

    /**
     * @name userHasLoggedOut
     * @function
     *
     * @param {Object} user the customer or user object
     * 
     * @description emits  'user-has-logged-out' event
     * @return does not return anything
     * 
     */
    userHasLoggedOut(user){
        this.emit('user-has-logged-out', user)
    }

    /**
     * @name guestHasPlacedAnOrder
     * @function
     *
     * @param {Object} order the guest customer's order object or guest user's order object
     * 
     * @description emits  'guest-has-placed-an-order' event
     * @return does not return anything
     * 
     */
    guestHasPlacedAnOrder(order){
        this.emit('guest-has-placed-an-order', order)
    }

     /**
     * @name userHasPlacedAnOrder
     * @function
     *
     * @param {Object} order the authenticated customer's order object or authenticated user's order object
     * 
     * @description emits  'user-has-placed-an-order' event
     * @return does not return anything
     * 
     */
    userHasPlacedAnOrder(order){
        this.emit('user-has-placed-an-order', order)
    }

     /**
     * @name userHasRegistered
     * @function
     *
     * @param {Object} user the newly registered customer object or newly registered user object
     * 
     * @description emits  'user-has-registered' event
     * @return does not return anything
     * 
     */
    userHasRegistered(user){
        this.emit('user-has-registered', user)
    }

    /**
     * @name userHasUpdatedAccountDetails
     * @function
     *
     * @param {Object} account the authenticated customer's account details object or authenticated user's account details object
     * 
     * @description emits  'user-has-updated-account-details' event
     * @return does not return anything
     * 
     */
    userHasUpdatedAccountDetails(account){
        this.emit('user-has-updated-account-details', account)
    }
    /**
     * @name userHasDeletedAccount
     * @function
     *
     * @param {Object} user the authenticated customer  object or authenticated user object
     * 
     * @description emits  'user-has-deleted-account' event
     * @return does not return anything
     * 
     */
    userHasDeletedAccount(user){
        this.emit('user-has-deleted-account', user)
    }

    /**
     * @name requested
     * @function
     *
     * @param {Request|Object} request the object 
     * 
     * @description emits  'requested' event
     * @return does not return anything
     * 
     */
    requested(request){
        this.emit('requested', request)
    }

    /**
     * @name responded
     * @function
     *
     * @param {Response|Object} response the object 
     * 
     * @description emits  'responded' event
     * @return does not return anything
     * 
     */
    responded(response){
        this.emit('responded', response)
    }
}

// Export Base
module.exports = Base

'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module UsersController
 * @kind class
 * 
 * @extends UsersControllerUtils
 * 
 * @requires UsersControllerUtils
 * 
 * @classdesc Resourceful controller for interacting with users
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */


const UsersControllerUtils = require('./utils')

class UsersController extends UsersControllerUtils {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
        this.errors = []
        // sessions
        this.sessions = []
        // success 
        this.successes = []

        // auto bind methods
        this.autobind(UsersController)
    };

    /**
     * @name index
     * @function
     * 
     * @method HTTP GET
     * @endpoint api/users/all
     * @url api/users/all
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and gets users
     * @return does not return anything
     * 
     */

    index(data, fn, req, res) {
        if (['post', 'get', 'put', 'delete'].indexOf(data.method) > -1) {
            data.method = 'get'
        } else {
            return fn(405);
        }
    }

    /**
     * @name store
     * @function 
     * 
     * @method HTTP POST
     * @endpoint api/users/add
     * @url api/users/add
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and creates (or stores) user
     * @return does not return anything
     * 
     */
    async store(data, fn, req, res) {
        this.setMethod(data, fn, 'post')
        this.onPrepareUserToRegister(fn)
    };

    /**
     * @name show
     * @function
     * 
     * @method HTTP GET
     * @endpoint api/users/order
     * @url api/users/order
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and gets the authenticated customer (or user)
     * @return does not return anything
     * 
     */
    async show(data, fn, req, res) {
        this.setMethod(data, fn, 'get')
        this.onPrepareUserToShow(fn)

    };


    /**
     * @name update
     * @function
     * 
     * @method HTTP PUT
     * @endpoint api/users/edit
     * @url api/users/edit
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and updated (or edit) the authenticated customer or user 
     * @return does not return anything
     * 
     */

    async update(data, fn, req, res) {
        this.setMethod(data, fn, 'put')
        this.onPrepareUserToUpdate()
    };

    /**
     * @name destroy
     * @function
     * 
     * @method HTTP DELETE
     * @endpoint api/orders/remove
     * @url api/orders/remove
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and deletes (or removes) the authenticated customer user
     * @return does not return anything
     * 
     */
    async destroy(data, fn, req, res) {
        this.setMethod(data, fn, 'delete')
        this.onPrepareUserToDestroy()
    };
}
// Exports the UsersController
module.exports = UsersController
'use strict';

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module OrdersController
 * @kind class
 * @extends OrdersControllerUtils
 * @requires OrdersControllerUtils
 * @classdesc Resourceful controller for interacting with orders
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */

const OrdersControllerUtils = require('./utils')

class OrdersController extends OrdersControllerUtils {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
        
        // auto bind methods
        this.autobind(OrdersController) 

        this.cartItems = []

     
 
    }

    /**
     * @name index
     * @function
     * 
     * @method HTTP GET
     * @endpoint api/orders/all
     * @url api/orders/all
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and gets user's cart items
     * @return does not return anything
     * 
     */
    async index(data, fn, req, res) {
        this.setMethod(data, fn, 'get')
        this.onGetUserCartItems(fn)
    }

    /**
     * @name orderIndex
     * @function
     * 
     * @method HTTP GET
     * @endpoint api/orders/auth/orders
     * @url api/orders/auth/orders
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and gets all authenticated user's orders
     * @return authenticated user's orders
     * 
     */
        async orderIndex(data, fn, req, res) {
            this.setMethod(data, fn, 'get')
            if(await this.authCheck()){
                const user = await this.auth()
                this.orderProducts = []
                if(user.orders && user.orders.length > 0){
                    for (let item of user.orders){
                        let product =  await this.fileRead(`orders/${item}.json`).then(JSON.parse)
                        this.orderProducts.push(product)
                    }
                }
                return fn(200, this.orderProducts)
              
            }else{
                return fn(200,{user: 'no auth'})
            }
        }
        

    /**
     * @name store
     * @function 
     * 
     * @method HTTP POST
     * @endpoint api/orders/auth/orders
     * @url api/orders/auth/orders
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and store the authenticated user's order
     * @return does not return anything
     * 
     */
   
    async store(data, fn, req, res) {
        this.setMethod(data, fn, 'post')
        this.onPrepareAuthCart()
    };


    /**
     * @name authPlaceOrder
     * @function
     * 
     * @method HTTP POST
     * @endpoint api/orders/auth/order
     * @url api/orders/auth/order
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and places (makes the purchase) the authenticated user's order
     * @return does not return anything
     * 
     */

    authPlaceOrder(data, fn, req, res) {
        this.setMethod(data, fn, 'post')
        this.onPrepareAuthOrder()
    }

     /**
     * @name guestOrderPlace
     * @function
     * 
     * @method HTTP POST
     * @endpoint api/orders/guest/add
     * @url api/orders/guest/add
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and places (makes the purchase) the guest user's order
     * @return does not return anything
     * 
     */
    guestOrderPlace(data, fn, req, res) {
        this.setMethod(data, fn, 'post')
        this.onPrepareGuestOrder()
        // if(!data._token || data._token === undefined){
            
        // }
    };

     /**
     * @name show
     * @function
     * 
     * @method HTTP GET
     * @endpoint api/orders/order
     * @url api/orders/order
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and gets the authenticated user's order
     * @return does not return anything
     * 
     */
   
    async show(data, fn, req, res) {
        this.setMethod(data, fn)
        this.onGetUserOrder()
    };

    /**
     * @name update
     * @function
     * 
     * @method HTTP PUT
     * @endpoint api/orders/edit
     * @url api/orders/edit
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data and updated (or edit) the authenticated user's cart
     * @return does not return anything
     * 
     */

    async update(data, fn, req, res) {
        this.setMethod(data, fn, 'put')
        this.onUpdateCartItem()
        this.once('order-updated', data => {
         return fn(200,{data})
        })
        this.once('error-updating-item', error => {
           return fn(200, {error})
        })
        this.once('order-was-not-found', error =>{
           return fn(200, {error})
        })
        this.once('unauthorized', error =>{
           return fn(200, {error})
        })
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
     * @description sets data and deletes (or removes) the authenticated user's cart item
     * @return does not return anything
     * 
     */

    async destroy(data, fn) {
        this.setMethod(data, fn, 'delete')
        this.onRemoveItemFromUserCart()
    };

     /**
     * @name contact
     * @function
     * 
     * @method HTTP POST
     * @endpoint api/orders/contact
     * @url api/orders/contact
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets data then emails customer and sends sms notification to customer
     * @return does not return anything
     * 
     */
    async contact(data, fn, req, res){
        this.setMethod(data, fn, 'post')
        this.onCustomerContact()
    }
}

module.exports = OrdersController;


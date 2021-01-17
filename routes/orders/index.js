'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module orderRouter
 * @kind Object
 *  
 * @requires OrdersController
 *
 * @classdesc index for all orders API routes
 * 
 */
const OrdersController = require('../../app/Controllers/HTTP/orders')

const orderRouter = {
    'orders': new OrdersController().orderIndex,
    'index': new OrdersController().index,
    'order': new OrdersController().show,
    'store': new OrdersController().store,
    'authPlaceOrder': new OrdersController().authPlaceOrder,
    'update': new OrdersController().update,
    'remove': new OrdersController().destroy,
    'contact': new OrdersController().contact,
    'guestOrderPlace': new OrdersController().guestOrderPlace,
    'guestCartItemAdd': new OrdersController().guestCartItemAdd
}

// Export orderRouter
module.exports = orderRouter
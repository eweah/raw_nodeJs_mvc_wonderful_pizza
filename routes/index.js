'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Routes
 * @kind Object
 * 
 * 
 * @requires UsersController
 * @requires DefaultController
 * @requires OrdersController
 * @requires TokensController
 * 
 * @classdesc index for all routes
 * 
 */

 
module.exports = {

    // users routes
    'api/users/all': require('./users')['index'],
    'api/users/user': require('./users')['user'],
    'api/users/edit': require('./users')['update'],
    'api/users/remove': require('./users')['remove'],
    'api/users/add': require('./users')['store'],
    'test': require('./users')['test'],

    // tokens routes
    'api/tokens/all': require('./tokens')['index'],
    'api/tokens/token': require('./tokens')['token'],
    'api/tokens/edit': require('./tokens')['update'],
    'api/tokens/remove': require('./tokens')['remove'],
    'api/tokens/add': require('./tokens')['store'],

    // orders routes
    'api/orders/all': require('./orders')['index'],
    'api/orders/order': require('./orders')['order'],
    'api/orders/edit': require('./orders')['update'],
    'api/orders/remove': require('./orders')['remove'],
    'api/orders/add': require('./orders')['store'],
    'api/orders/auth/order': require('./orders')['authPlaceOrder'],
    'api/orders/auth/orders': require('./orders')['orders'],

   
    'api/orders/guest/add': require('./orders')['guestOrderPlace'],
    'api/orders/guest/cart/add': require('./orders')['guestCartItemAdd'],
    'api/orders/contact': require('./orders')['contact'],

    // default routes
   
    '': require('./default')['home'],
    notfound: require('./default')['notfound'],
    favicon: require('./default')['favicon'],
    public: require('./default')['public'],
    login: require('./default')['login'],
    contact: require('./default')['contact'],
    about: require('./default')['about'],
    menu: require('./default')['menu'],
    pizza: require('./default')['pizza'],
    login: require('./default')['login'],
    signup: require('./default')['signup'],
    account: require('./default')['account'],
    dashboard: require('./default')['dashboard'],
    order: require('./default')['order'],
    payment: require('./default')['payment'],
    review: require('./default')['review'],
    feedback: require('./default')['feedback'],
    shipping: require('./default')['shipping'],
    cart: require('./default')['cart']

}
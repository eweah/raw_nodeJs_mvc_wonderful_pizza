'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module defaultRouter
 * @kind Object
 *  
 * @requires DefaultController
 *
 * @classdesc index for all default routes including all pages
 * 
 */
const DefaultsController = require('../../app/Controllers/HTTP/default')
    // const DefaultController = new DefaultsController()

const defaultRouter = {
    home: new DefaultsController().home,
    notfound: new DefaultsController().notFound,
    public: new DefaultsController().public,
    home: new DefaultsController().home,
    // create: new DefaultsController().accountCreate,
    // place: new DefaultsController().orderPlace,
    login: new DefaultsController().login,
    contact: new DefaultsController().contact,
    about: new DefaultsController().about,
    menu: new DefaultsController().menu,
    pizza: new DefaultsController().pizza,
    login: new DefaultsController().login,
    // logout: new DefaultsController().logout,
    account: new DefaultsController().account,
    dashboard: new DefaultsController().dashboard,
    order: new DefaultsController().order,
    payment: new DefaultsController().payment,
    review: new DefaultsController().review,
    feedback: new DefaultsController().feedback,
    shipping: new DefaultsController().shipping,
    signup: new DefaultsController().signup,
    cart: new DefaultsController().usercart
}

module.exports = defaultRouter
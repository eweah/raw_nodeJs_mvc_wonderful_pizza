'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module userRouter
 * @kind Object
 *  
 * @requires UsersController
 *
 * @classdesc index for all users API routes
 * 
 */

const UsersController = require('../../app/Controllers/HTTP/users')

const userRouter = {
    'index': new UsersController().index,
    'user': new UsersController().show,
    'store': new UsersController().store,
    'create': new UsersController().create,
    'update': new UsersController().update,
    'remove': new UsersController().destroy
}

// Export userRouter

module.exports = userRouter
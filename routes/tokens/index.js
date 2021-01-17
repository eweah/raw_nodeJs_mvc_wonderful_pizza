'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module tokenRouter
 * @kind Object
 *  
 * @requires TokensController
 *
 * @classdesc index for all tokens API routes
 * 
 */

const TokensController = require('../../app/Controllers/HTTP/tokens')

const tokenRouter = {
    'index': new TokensController().index,
    'token': new TokensController().show,
    'store': new TokensController().store,
    'update': new TokensController().update,
    'remove': new TokensController().destroy
}
// Export tokenRouter
module.exports = tokenRouter
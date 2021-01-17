'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Model
 * @kind class
 * @extends BaseController
 * 
 * @classdesc Resourceful Model for interacting with requests and responses
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 */

const BaseController = require('../../config/mvc/controller')

class Model extends BaseController {
    constructor() {
        super()

    }
}
// Export Model
module.exports = Model

'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module TCPController
 * @kind class
 * @extends HTTPController
 * 
 * @classdesc Resourceful controller for interacting with request
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */


const HTTPController = require('../HTTP')

class TCPController extends HTTPController {
    constructor() {
        super()
    }
}

// Export TCPController
module.exports = TCPController
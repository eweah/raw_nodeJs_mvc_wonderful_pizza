'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Controller
 * @kind class
 * @extends DataModel
 * 
 * @classdesc Resourceful controller for interacting with requests and responses
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 */

const DataModel = require('../Models/fileSystem')

class Controller extends DataModel {
    constructor() {
        super()
    }
}
// Export Controller
module.exports = Controller
'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Library
 * @kind class
 * 
 * @extends Storage
 * 
 * @requires Storage
 * 
 * @classdesc Library class for library features to the views, models, controllers, and others
 * 
 */
const Storage = require('../storage')

class Library extends  Storage {
    constructor() {
        super()
    }
  
}
// Export Library

module.exports = Library
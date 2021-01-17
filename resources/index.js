'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Library
 * @kind class
 * 
 * @extends Resource
 * 
 * @requires Resource
 * 
 * @classdesc Main class for all resources of the system
 * 
 */

const Library = require('../resources/library')
class Resource extends Library {
    constructor() {
        super()
    }
    
}

// Export Resource

module.exports = Resource
'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module MVC
 * @kind class
 * 
 * @extends Config
 * 
 * @requires Config
 * 
 * @classdesc Model View Controller (MVC) base class for parenting all the controllers, all the models, and all the views
 * 
 */


const Config = require('./../')

class MVC extends Config {
    constructor() {
        super()
    }
    
}
// Export MVC
module.exports = MVC

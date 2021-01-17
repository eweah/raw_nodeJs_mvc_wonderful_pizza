'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Controller
 * @kind class
 * 
 * @extends View
 * @requires View
 * 
 * @classdesc Base Controller class for the Model-View-Controller (for the models, views, and controllers)
 * 
 */
const View = require('../view')
class Controller extends View {
    constructor() {
        super()
    }

}
// Export Controller
module.exports = Controller
'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @requires aside
* @requires content
* @requires footer
* @requires header 
* @requires image 
* @requires navbar 
* @requires row

* @description  holds the shadow DOM  styling string
* 
* @return {String} the shadow DOM  styling string
* 
*/
import aside from './aside.js'
import content from './content.js'
import footer from './footer.js'
import header from './header.js'
import image from './image.js'
import main from './main.js'
import navbar from './navbar.js'
import row from './row.js'
export default () => {
    return `
     <style>
     ${header()}

    /* Style the top navigation bar */
    
    ${navbar()}
    
    /* Column container */

    ${row()}
    
    /* Create two unequal columns that sits next to each other */
    
    
    /* Sidebar/left column */
    
    ${aside()}
    
    /* Main column */

    ${main()}
    
    /* Fake image, just for this example */
    
    ${image()}
    
    /* Footer */
    
    ${footer()}
    
     </style>
    `
}
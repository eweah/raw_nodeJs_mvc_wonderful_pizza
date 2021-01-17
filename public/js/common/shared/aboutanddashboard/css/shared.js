'use strict'
 /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires aside
   * @requires content
   * @requires main
   * @requires row 
   * @requires header
   * @requires slide_down_animation
   * @requires slide_left_animation
   * @requires slide_right_animation
   * @requires slide_up_animation
   * @requires topping
   * 
   * @description  holds the shadow DOM styling string
   * 
   * @return {String} the shadow DOM styling string
   * 
   */
import aside from './aside.js'
import content from './content.js'
// import footer from './footer.js'
import main from './main.js'
// import navbar from './navbar.js'
import row from './row.js'
import header from './header.js'
import image from './image.js'
import slide_down_animation from './slide_down_animation.js'
import slide_up_animation from './slide_up_animation.js'
import slide_left_animation from './slide_left_animation.js'
import slide_right_animation from './slide_right_animation.js'
import topping from './topping.js'
export default () => {
    return `
    <style>
    ${header()}

    /* Style the top navigation bar */
    
    /* Column container */
    
    ${row()}
    
    /* Create two unequal columns that sits next to each other */
    
    
    /* Sidebar/left column */
    
    ${aside()}
    
    /* Main column */
    ${content()}
   ${main()}
    
    /* Fake image, just for this example */
    
    ${image()}
    ${slide_right_animation()}
    ${topping()}
    
    /* Footer */
    </style>
    `
}
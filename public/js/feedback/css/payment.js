'use strict'
/**
* @name  anonymous (no name)
* @function
*
* @requires aside
* @requires footer 
* @requires form 
* @requires header 
* @requires image 
* @requires main 
* @requires row 
* @requires navbar 

* @description  holds the shadow DOM styling string
* 
* @return {String} the shadow DOM styling string
* 
*/
import aside from './aside.js'
import footer from './footer.js'
import form from './form.js'
import header from './header.js'
import image from './image.js'
import main from './main.js'
import row from './row.js'
import navbar from './navbar.js'
export default () => {
    return `
  <style>
  ${header()}
   
  /* Column container */
  

  ${row()}
  
  /* .row {
      display: flex;
      flex-wrap: wrap;
  } */
  
  
  /* Create two unequal columns that sits next to each other */
  
  
  /* Sidebar/left column */
  

  ${aside()}
  
  /* Main column */
  

  ${main()}

  ${form()}
  
  /* Fake image, just for this example */
  

  ${image()}
  
  /* Footer */
  
  </style>
    `

}
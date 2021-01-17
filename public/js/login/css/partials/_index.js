'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM index styling string
* 
* @return {String} the shadow DOM index styling string
* 
*/
import _aside from './_aside.js'
import _form from './_form.js'
import _header from  './_header.js'
import _image from './_image.js'
import _main from './_main.js'

import _row from './_row.js'
export default () => {
    return `
   <style>
   ${_header()}
   /* Column container */
   ${_row()}

   /* .row {
       display: flex;
       flex-wrap: wrap;
   } */
   
   /* Create two unequal columns that sits next to each other */

   /* Sidebar/left column */
   
   ${_aside()}
   
   /* Main column */
   

   ${_main()}

   ${_form()}
   
   /* Fake image, just for this example */

   ${_image()}
   
   </style>
    `
}
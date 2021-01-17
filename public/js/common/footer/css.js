'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM styling string
* 
* @return {String} the shadow DOM styling string
* 
*/
import chatcss from './chatcss.js'
export default () => {
    return `
     <style>
     /* Footer */

     .footer {
         padding: 5px;
         text-align: center;
         background: #ddd;
         position: fixed;
         bottom: 0;
         left: 0;
         right: 0;
         margin-top: 30px;

     }
     a:link {
         text-decoration: none;
     }
     
     
     /* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
     
     @media screen and (max-width: 400px) {
         .row,
         .navbar {
             flex-direction: column;
         }
     }
     ${chatcss()}
     </style>
    `
}
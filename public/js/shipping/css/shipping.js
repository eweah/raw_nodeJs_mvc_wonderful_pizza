'use strict'
import aside from './aside.js'
import footer from './footer.js'
import forms from './forms.js'
import header from './header.js'
import image from './image.js'
import main from './main.js'
import row from './row.js'
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
    ${forms()}

    ${main()}
    
    /* Fake image, just for this example */
    

    ${image()}
    
    /* Footer */
    
    </style>
    `
}
'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM header styling string
* 
* @return {String} the shadow DOM header styling string
* 
*/
export default () => {
    return `
    * {
        box-sizing: border-box;
    }
    
    html {
        box-sizing: border-box;
    }
    
    /* Style the body */
    
    body {
        font-family: Arial;
        margin: 0;
    }

    `
}
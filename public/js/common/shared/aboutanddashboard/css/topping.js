'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM topping styling string
* 
* @return {String} the shadow DOM topping styling string
* 
*/
export default () => {
    return `
      ul.no-bullets{
        list-style-type: none; /* Remove bullets */
        padding: 0; /* Remove padding */
        margin: 0; /* Remove margins */
      }
    `
}
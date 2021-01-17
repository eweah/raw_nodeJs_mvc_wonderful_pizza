'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM aside styling string
* 
* @return {String} the shadow DOM aside styling string
* 
*/
export default () => {
    return `/* Sidebar/left column */

    .side {
        -ms-flex: 30%;
        /* IE10 */
        flex: 30%;
        background-color: #f1f1f1;
        padding: 20px;
        margin-bottom: 80px;
    }
    ul.no-bullets{
        list-style-type: none; /* Remove bullets */
        padding: 0; /* Remove padding */
        margin: 0; /* Remove margins */
      }
    `
}
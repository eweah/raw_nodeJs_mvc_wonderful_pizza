'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM main styling string
* 
* @return {String} the shadow DOM main styling string
* 
*/
export default () => {
    return `/* Main column */

    @import './content.css';
    .main {
        -ms-flex: 70%;
        /* IE10 */
        flex: 70%;
        background-color: white;
        padding: 20px;
        margin-bottom: 70px;
    }
    `
}
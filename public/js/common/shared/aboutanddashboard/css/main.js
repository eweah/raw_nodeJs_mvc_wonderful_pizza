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
    .main {
        -ms-flex: 70%;
        /* IE10 */
        flex: 70%;
        background-color: white;
        padding: 20px;
    }`
}
'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow row styling string
   * 
   * @return {String} the shadow row styling string 
   * 
   */
export default () => {
    return `
    /* Column container */

    .row {
        display: -ms-flexbox;
        /* IE10 */
        display: flex;
        -ms-flex-wrap: wrap;
        /* IE10 */
        flex-wrap: wrap;
    }`
}
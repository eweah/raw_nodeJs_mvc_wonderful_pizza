'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM billing check box HTML string
   * 
   * @return {String} the shadow DOM billing check box HTML string 
   * 
   */
export default () => {
    return `
    <div>
    <label for="billing-checkbox">Same as shipping address:</label>
    <input type="checkbox" id="billing-checkbox" autocomplete="off">
</div>`
}
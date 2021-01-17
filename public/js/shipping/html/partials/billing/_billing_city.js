'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM billing city HTML string
   * 
   * @return {String} the shadow DOM billing city HTML string 
   * 
   */
export default () => {
    return `
    <div>
    <label for="billing-city" class="billing-label disabled-label">City: </label>
    <input id="billing-city" name="billing_city" type="text" minlength="2" maxlength="50" required pattern="^[A-Za-z0-9_.', -]{3,75}$" placeholder="City">
    <span></span>
</div>`
}
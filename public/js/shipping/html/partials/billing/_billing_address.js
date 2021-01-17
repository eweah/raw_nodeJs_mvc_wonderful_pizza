'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM billing address HTML string
   * 
   * @return {String} the shadow DOM billing address HTML string 
   * 
   */
export default () => {
    return `
    <div class="billing-label disabled-label">
    <label for="billing-address" class="billing-label disabled-label">Street Address: </label>
    <input id="billing-address" name="billing_address" type="text" minlength="2" maxlength="50" required pattern="^[A-Za-z0-9_.', -]{3,75}$" placeholder="Address">
    <span class="error" aria-live="polite"></span>
</div>`
}
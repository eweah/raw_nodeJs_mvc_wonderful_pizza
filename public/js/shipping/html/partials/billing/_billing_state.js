'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM billing state HTML string
   * 
   * @return {String} the shadow DOM billing state HTML string 
   * 
   */
export default () => {
    return ` <div>
    <label for="billing-state" class="billing-label disabled-label">State: </label>
    <select id="billing-state" name="billing_state" required class="billing-state-selector"></select>
    <span class="error" aria-live="polite"></span>
</div>`
}
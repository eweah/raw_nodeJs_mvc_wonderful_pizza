'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM billing billing zip code HTML string
   * 
   * @return {String} the shadow DOM billing billing zip code HTML string 
   * 
   */
export default () => {
    return ` <div>
    <label for="billing-zip" class="billing-label disabled-label">Zip/postal code: </label>
    <input id="billing-zip" name="billing_zip" type="text" minlength="5" maxlength="10" required pattern="^[0-9]{5}(?:[\-][0-9]{4})?$" placeholder="5-dig Zip/postal code : ######">
    <span class="error" aria-live="polite"></span>
    <span id="billingZip-error" aria-live="polite"></span>
</div>`
}
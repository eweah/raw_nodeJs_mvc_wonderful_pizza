'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM billing phone HTML string
   * 
   * @return {String} the shadow DOM billing phone HTML string 
   * 
   */
export default () => {
    return `<div>
    <label for="billing-phone" class="billing-label disabled-label">Phone (USA): </label>
    <input type="tel" pattern="^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$" name="billing_phone" id="billing-phone" placeholder="10-digit phone: ###-###-####" minlength="10" maxlength="13" required>
    <span class="error" aria-live="polite"></span>
    <span id="billing-phone-error"></span>
</div>`
}
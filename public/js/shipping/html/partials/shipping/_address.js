'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM address HTML string
   * 
   * @return {String} the shadow DOM address HTML string 
   * 
   */
export default () => {
    return `
    <div>
    <label for="address">Street Address: </label>
    <input id="address" name="address" type="text" minlength="5" maxlength="75" required pattern="^[A-Za-z0-9_.', -]{3,75}$" placeholder="Street address">
    <span class="error" aria-live="polite"></span>
    <span  id="address-error" aria-live="polite"></span>
</div>`
}
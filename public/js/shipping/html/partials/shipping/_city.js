'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM city HTML string
   * 
   * @return {String} the shadow DOM city HTML string 
   * 
   */
export default () => {
    return `<div>
    <label for="city">City: </label>
    <input id="city" name="city" type="text" minlength="3" maxlength="75" required pattern="^[A-Za-z0-9_.', -]{3,75}$" placeholder="City">
    <span class="error" aria-live="polite"></span>
    <span id="city-error"></span>
</div>`
}
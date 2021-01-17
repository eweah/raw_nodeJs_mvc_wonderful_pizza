'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM phone HTML string
   * 
   * @return {String} the shadow DOM phone HTML string 
   * 
   */
export default () => {
    return `
    <div>
    <label for="phone">Phone (USA): </label>
    <input type="tel" pattern="^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$" name="phone" id="phone" placeholder="10-digt Phone number: ###-###-####" minlength="10" maxlength="13" required>
    <span class="error" aria-live="polite"></span>
    
    <span id="phone-error"></span>
</div>`
}
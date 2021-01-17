'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM phone HTML string
   * 
   * @return {String} the shadow DOM phone HTML string 
   * 
   */
export default () => {
    return `
    <div class="phone">
    <div>
        <label for="phone">Phone: </label>
        <input id="phone" name="phone" type="tel"
        minlength="10" maxlength="13" required placeholder="number format  ###-###-####"
        autocomplete="on" pattern="^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$"/>
        <span class="error" aria-live="polite"></span>
        <span id="phone-error" aria-live="polite"></span>
    </div>
</div>`
}
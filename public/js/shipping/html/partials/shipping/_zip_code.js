'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM zip code HTML string
   * 
   * @return {String} the shadow DOM zip code HTML string 
   * 
   */
export default () => {
    return `
    <div>
        <label for="zip">Zip/postal code: </label>
        <input id="zip" name="zip" type="text" minlength="5" maxlength="10" required pattern="^[0-9]{5}(?:[\-][0-9]{4})?$" placeholder="5-digt Zip/postal code: #####">
        <span class="error" aria-live="polite"></span>
        <span id="zip-error"></span>
    </div>`
}
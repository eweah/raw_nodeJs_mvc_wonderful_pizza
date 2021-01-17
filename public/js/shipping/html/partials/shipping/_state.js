'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM state HTML string
   * 
   * @return {String} the shadow DOM state HTML string 
   * 
   */
export default () => {
    return `<div>
    <label for="state">State: </label>
    <select id="state" name="state" required></select>
    <span class="error" aria-live="polite"></span>
    
    <span id="state-error"></span>
</div>`
}
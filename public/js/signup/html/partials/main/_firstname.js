'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM firstname HTML string
   * 
   * @return {String} the shadow DOM firstname HTML string 
   * 
   */
export default () => {
    return `
    <div class="firstname">
    <div>
        <label for="firstname">First name: </label>
        <input id="firstname" name="firstname" type="text" minlength="2" maxlength="25"   placeholder="First name" required pattern="^[A-Z][A-Za-z.'\-].{0,25}$"/>
        <span class="error" aria-live="polite"></span>
        <span id="firstname-error" aria-live="polite"></span>
    </div>
</div>`
}
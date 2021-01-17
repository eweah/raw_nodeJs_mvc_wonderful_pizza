'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM lastname HTML string
   * 
   * @return {String} the shadow DOM lastname HTML string 
   * 
   */
export default () => {
    return `
    <div class="personal">
    <label for="lastname">Last Name: </label>
    <input id="lastname" name="lastname" type="text" minlength="3" maxlength="75" required  placeholder="Last Name ..." >
    <span class="error" aria-live="polite"></span>
    <span id="lastname-error"></span>
</div>`
}
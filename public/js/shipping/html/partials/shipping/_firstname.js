'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM firstname HTML string
   * 
   * @return {String} the shadow DOM firstname HTML string 
   * 
   */
export default () => {
    return `
    <div class="personal">
    <label for="firstname">First Name: </label>
    <input id="firstname" name="firstname" type="text" minlength="3" maxlength="75" required  placeholder="First Name ..." >
    <span class="error" aria-live="polite"></span>
    <span id="firstname-error"></span>
</div>`
}
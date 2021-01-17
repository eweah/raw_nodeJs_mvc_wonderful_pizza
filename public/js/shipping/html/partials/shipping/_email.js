'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM email HTML string
   * 
   * @return {String} the shadow DOM email HTML string 
   * 
   */
export default () => {
    return `
    <div class="personal">
    <label for="email">Email: </label>
    <input id="email" name="email" type="email" minlength="4" maxlength="100" required  placeholder="Email address ..." pattern="^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$">
    <span class="error" aria-live="polite"></span>
    <span id="email-error"></span>
</div>`
}
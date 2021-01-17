'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM email HTML string
   * 
   * @return {String} the shadow DOM email HTML string 
   * 
   */
export default () => {
    return `
    <div class="email">
    <div>
        <label for="email">Email address: </label>
        <input id="email" name="email" type="email" minlength="5" maxlength="100" placeholder="Email address"  required
            autocomplete="on" pattern="^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$"/><span class="error" aria-live="polite"></span>
            <span id="email-error" aria-live="polite"></span>
    </div>
</div>`
}
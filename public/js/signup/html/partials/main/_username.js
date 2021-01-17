'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM username HTML string
   * 
   * @return {String} the shadow DOM username HTML string 
   * 
   */
export default () => {
    return `
    <div class="username">
    <div>
        <label for="username">Username: </label><input id="username" name="username" type="text" minlength="2" maxlength="25" required placeholder="Choose a username" autocomplete="off" pattern="^[A-Za-z.'\-].{0,25}\S*$" />
        <span class="error" aria-live="polite"></span>
        <span id="username-error" aria-live="polite"></span>
    </div>
</div>`
}
'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM lastname HTML string
   * 
   * @return {String} the shadow DOM  HTML string 
   * 
   */
export default () => {
    return `
    <div class="lastname">
    <div>
        <label for="lastname">Last name: </label><input id="lastname" name="lastname" type="text" minlength="2" maxlength="25" required pattern="^[A-Z][A-Za-z.'\-].{0,25}$" placeholder="Last name" autocomplete="on" />
        <span class="error" aria-live="polite"></span>
        <span id="lastname-error" aria-live="polite"></span>
    </div>
</div>
    `
}
'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM password confirmation HTML string
   * 
   * @return {String} the shadow DOM password confirmation HTML string 
   * 
   */
export default () => {
    return `
    <div class="password-confirmation">
    <div>
        <label for="password-confirmation">Password again: </label>
        <input type="password" id="password-confirmation" name="password_confirmation" minlength="8" maxlength="15" placeholder="Enter password again" autocomplete="off" required  pattern="^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$"
        />
        <span class="error" aria-live="polite"></span>
        <span id="password-confirmation-error" aria-live="polite"></span>
    </div>
</div>`
}
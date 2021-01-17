'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * 
   * @description holds the shadow DOM password HTML string
   * 
   * @return {String} the shadow DOM password HTML string 
   * 
   */
export default () => {
    return `
     <div class="password">
    <div>
        <label for="password">Password: </label>
        <input type="password" id="password" name="password" minlength="8" maxlength="15"
            placeholder="Enter your password" autocomplete="off" required />
        <span class="error" aria-live="polite"></span>
        <span id="password-error"></span>
    </div>
</div>`
}
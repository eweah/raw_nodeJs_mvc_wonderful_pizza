'use strict'
  /**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM username HTML string
   * 
   * @return {String} the shadow DOM username HTML string 
   * 
   */
export default () => {
    return ` 
     <div class="phone">
    <div>
        <label for="phone">Phone Number: </label>
        <input id="phone" name="phone" type="tel"
            minlength="10" maxlength="13" required placeholder="number format  ###-###-####"
            autocomplete="on" pattern="^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$"/>
            <span class="error" aria-live="polite">
            </span><span id="phone-error"></>
    </div>
</div>`
}
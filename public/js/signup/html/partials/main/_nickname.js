'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM nickname HTML string
   * 
   * @return {String} the shadow DOM nickname HTML string 
   * 
   */
export default () => {
    return ` 
    <div class="nickname">
    <div>
        <label for="nickname">Nickname: </label><input id="nickname" name="nickname" type="tel" minlength="2" maxlength="50" required placeholder="nickname" autocomplete="off" pattern="^[A-Za-z.'\-].{0,25}\S*$" />
        <span class="error" aria-live="polite"></span>
        <span id="nickname-error" aria-live="polite"></span>
    </div>
</div>`
}
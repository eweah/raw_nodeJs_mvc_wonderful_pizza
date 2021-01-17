'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM billing country HTML string
   * 
   * @return {String} the shadow DOM billing country HTML string 
   * 
   */
export default () => {
    return `
    <div>
    <label for="country">Country: </label>
    <input id="billing-country" name="country" type="text" minlength="2" maxlength="50" required pattern="^USA$" placeholder="USA" value="USA"  readonly="readonly">
    <span class="error" aria-live="polite"></span>
</div>`
}
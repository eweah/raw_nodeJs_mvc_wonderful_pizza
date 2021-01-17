'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * 
   * @description holds the shadow DOM action button HTML string
   * 
   * @return {String} the shadow DOM action button HTML string 
   * 
   */
export default () => {
    return `
     <fieldset class="submission">
    <div class="form-state">
        <div class="submit"><button id="submit" class="submit">Login</button></div>
        <div class="reset"><button id="reset" class="reset" type="reset">Clear </button></div>
        <div class="exit"><button id="exit" class="exit">Exit</button></div>
    </div>
</fieldset>`
}
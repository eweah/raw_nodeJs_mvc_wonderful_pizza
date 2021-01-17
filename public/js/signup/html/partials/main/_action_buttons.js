'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM action buttons HTML string
   * 
   * @return {String} the shadow DOM action buttons HTML string 
   * 
   */
export default () => {
    return `
    <div class="form-state">
    <div class="submit"><button id="submit" type="submit">Submit</button></div>
    <div class="reset"><button id="reset" type="reset">Clear</button></div>
    <div class="exit"><button id="exit">Exit</button></div>
</div>`
}
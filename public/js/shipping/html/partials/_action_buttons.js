'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM action buttons HTML string
   * 
   * @return {String} the shadow DOM action buttons HTML string 
   * 
   */
export default () => {
    return `
    <div class="form-state">
    <div class="submit">
        <button id="submit">Submit form</button>
    </div>
    <div class="reset">
        <button id="reset">Clear form</button>
    </div>
    <div class="exit">
        <button id="exit">Exit form</button>
    </div>
</div>`
}
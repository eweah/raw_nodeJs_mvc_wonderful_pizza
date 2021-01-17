'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM agreements HTML string
   * 
   * @return {String} the shadow DOM agreements HTML string 
   * 
   */
export default () => {
    return `
    <div class="agreement">
    <div>
        <label for="agreement">I agree to the <a href="/terms">terms</a> and <a
                href="/conditions">conditions</a> :
            <input id="agreement" name="tosAgreement" type="checkbox" required /><span></span>
        </label>
    </div>
</div>`
}
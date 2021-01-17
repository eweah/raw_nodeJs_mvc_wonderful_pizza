'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM American Express card code HMTL string
* 
* @return {String} the shadow DOM American Express card code HMTL string
* 
*/
export default () => {
    return `
    <div class="security-code amex-card-code" id="amex-card-code">
    <div>
        <label for="amex-security-code'" class="security-code">Security Code: <small
                style="color:blue" id="asc">4 digits in the front</small> </label>
        <input type="text" id="amex-security-code" name="amexsecuritycode'" minlength="4" maxlength="4" placeholder="####" autocomplete="off" required pattern="^[0-9]{4}$" />
        <span class="error" aria-live="polite"></span>
    </div>
</div>`
}
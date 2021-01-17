'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM American Express card number HMTL string
* 
* @return {String} the shadow DOM American Express card number HMTL string
* 
*/
export default () => {
    return `
    <div class="card-number amex-card-number" id="amex-card-number">
    <div>
        <label for="amex-number" class="card-number">Card Number: </label><input id="amex-number" name="amexnumber" type="text" minlength="15" maxlength="17" placeholder="####-######-#####"  pattern="^3[47][0-9]{2}([\- ]?)[0-9]{6}[0-9]{5}$"
            required autocomplete="on" /><span class="error" aria-live="polite"></span>
    </div>
</div>`
}
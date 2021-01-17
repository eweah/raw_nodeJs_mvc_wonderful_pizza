'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM card type HMTL string
* 
* @return {String} the shadow DOM card type HMTL string
* 
*/
export default () => {
    return ` <div class="card-type"> <div>
        <label for="card">
            <span>Card type:</span>
        </label>
        <select id="card-type" name="usercard">
        <option value="nothing">Select Card</option>
            <option value="visa" id="visa">Visa</option>
            <option value="master" id="master">Master</option>
            <option value="discover" id="discover">Discover</option>
            <option value="amex" id="amex">American Express</option>
        </select>
        <span class="error" aria-live="polite"></span>
    </div>
</div>`
}
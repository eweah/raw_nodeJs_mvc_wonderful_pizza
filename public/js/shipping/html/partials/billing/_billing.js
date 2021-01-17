'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires _billing_address
   * @requires _billing_city
   * @requires _billing_country
   * @requires _billing_phone
   * @requires _billing_zip_code
   * @requires _firstname
   * @requires _check_box
   * 
   * @description holds the shadow DOM billing HTML string
   * 
   * @return {String} the shadow DOM billing HTML string 
   * 
   */
import _billing_address from './_billing_address.js'
import _billing_city from './_billing_city.js'
import _billing_country from './_billing_country.js'
import _billing_phone from './_billing_phone.js'
import _billing_state from  './_billing_state.js'
import _billing_zip_code from './_billing_zip_code.js'
import _check_box from './_check_box.js'
export default () => {
    return `
     <section class="billing">
    <fieldset id="billing">
        <legend>Billing Address</legend>
        <h4 style="text-align: center">
            ${_check_box()}
        </h4>
        <div class="billing-details ">
            <div class="basic">
                ${_billing_address()}
                ${_billing_city()}
            </div>
            <div class="account">
               ${_billing_state()}
                ${_billing_country()}
            </div>
            <div class="details">
               ${_billing_zip_code()}
                ${_billing_phone()}
            </div>
        </div>
    </fieldset>
</section>`
}
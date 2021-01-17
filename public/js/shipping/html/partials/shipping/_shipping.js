'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires _address
   * @requires _city
   * @requires _country
   * @requires _phone
   * @requires _zip_code
   * @requires _firstname
   * @requires _lastname
   * @requires _email
   * 
   * @description holds the shadow DOM shipping HTML string
   * 
   * @return {String} the shadow DOM shipping HTML string 
   * 
   */
import _address from './_address.js'
import _city from './_city.js'
import _country from './_country.js'
import _phone from './_phone.js'
import _state from './_state.js'
import _zip_code from './_zip_code.js'
import _firstname from './_firstname.js'
import _lastname from './_lastname.js'
import _email from './_email.js'

export default () => {
    return `
    <section class="shipping">
    <fieldset id="shipping">
        <legend>Shipping Address</legend>
        <!--- BILLING DETAILS --->
        <div class="shipping-details">
            <div class="basic">
              ${_firstname()}
                ${_address()}
                ${_city()}
            </div>
            <div class="account">
               ${_lastname()}
                ${_state()}
                ${_country()}
            </div>
            <div class="details">
                <!-- <div>
<label for="zip">Zip/postal code: </label>
<input id="zip" name="zip" type="text" minlength="2" maxlength="50" required  pattern="^[0-9]{5}(?:-[0-9]{4})?$"placeholder="Zip/postal code">
 <span class="error" aria-live="polite"></span>
 <div id="error"></div>
</div> -->  ${_email()}
                ${_zip_code()}
                ${_phone()}
            </div>
        </div>
    </fieldset>
</section>`
}
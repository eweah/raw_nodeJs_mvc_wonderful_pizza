'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires _action_buttons
   * @requires _shipping
   * @requires _billing
   * 
   * @description holds the shadow DOM main HTML string
   * 
   * @return {String} the shadow DOM main HTML string 
   * 
   */
import _action_buttons from './partials/_action_buttons.js'
import _shipping from './partials/shipping/_shipping.js'
import _billing from './partials/billing/_billing.js'

export default () => {
    return `
    <div class="main">
    <!-- <h1 style="text-align: center;">Shipping</h1> -->
    <!-- <h1 style="text-align: center;">Shipping</h1> -->
    <form id="shipping" class="shipping-address-form">
        <h1 style="text-align: center;">Shipping</h1>
        ${_shipping()}
        ${_billing()}
        <br>
     <!-- billing -->
        <fieldset class="submission">
            ${_action_buttons()}
        </fieldset>
    </form>

</div>`
}
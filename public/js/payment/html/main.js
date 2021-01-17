'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @requires _card_type
* @requires _action_buttons
* @requires _agreements
* @requires _amex_card_code
* @requires _amex_card_number
* @requires _expiration_date
* @requires _name_on_card
* @requires _cards_code
* @requires _cards_number

* @description  holds the shadow DOM main HMTL string
* 
* @return {String} the shadow DOM main HMTL string
* 
*/
import _card_type from './partials/_cart_type.js'
import _action_buttons from './partials/_action_buttons.js'
import _agreements from './partials/_agreements.js'
import _amex_card_code from './partials/_amex_card_code.js'
import _amex_card_number from './partials/_amex_card_number.js'
// import _card_type from './partials/_cart_type.js'
import _expiration_date from './partials/_expiration_date.js'
import _name_on_card from './partials/_name_on_card.js'
import _cards_code from './partials/_cards_code.js'
import _cards_number from './partials/_cards_number.js'

export default () => {
    return `
    <div class="main">
    <form id="payment-form">
        <section>
            <h1 style="text-align: center;">Payment</h1>
            <fieldset>
                <legend>Payment Details</legend>
                <p>Required fields are labeled with "required".</p>
                <hr />
                <br /><br />
                <div class="account-details">
                    <!-- only letters -->
                   ${_card_type()}

                    ${_cards_number()}
                    ${_expiration_date()}
                   ${_cards_code()}

                    ${_name_on_card()}

                   ${_agreements()}
                </div>
            </fieldset>
        </section>
        ${_action_buttons()}
    </form>

</div>`
}
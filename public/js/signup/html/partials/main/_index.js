'use strict'

/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * @requires _firstname
   * @requires _lastname
   * @requires _email
   * @requires _username
   * @requires _password
   * @requires _password_confirmation
   * @requires _phone
   * @requires _nickname
   * @requires _agreement
   * @requires _action_buttons
   * 

   * @description holds the shadow DOM  HTML string
   * 
   * @return {String} the shadow DOM  HTML string 
   * 
   */
import _firstname from './_firstname.js'
import _lastname from './_lastname.js'
import _email from './_email.js'
import _username from './_username.js'
import _password from './_password.js'
import _password_confirmation from './_password_confirmation.js'
import _phone from './_phone.js'
import _nickname from './_nickname.js'
import _agreement from './_agreement.js'
import _action_buttons from './_action_buttons.js'
export default () => {
    return `
    <div class="main">
    <form id="registration_form"">
    <section>
        <h1 style="text-align: center;" id="signup">Sign Up</h1>
        <fieldset>
            <legend>Account Details</legend>
            <p id="notification">Required fields are labeled with "required".</p>
            <hr />
            <br /><br />
            <div class="account-details">
                <!-- only letters -->
                 ${_firstname()}
                <!-- only letters -->
                ${_lastname()}
                <!-- Valid email address  -->
                ${_email()}
                <!-- Letters, numbers, dash, and underscore-->
                ${_username()}
                <!-- between 7 and 20 characters made up of at least an upper case letter, lower case letter and a number -->
               ${_password()}
                <!-- between 7 and 20 characters made up of at least an upper case letter, lower case letter and a number -->
               ${_password_confirmation()}
                <!--- USA numbers only (formatting) -->
               ${_phone()}
                <!-- Letters, numbers, dash,and underscore-->
               ${_nickname()}
                 ${_agreement()}
            </div>
        </fieldset>
    </section>
    <fieldset>
      ${_action_buttons()}
    </fieldset>
</form>

</div>
`
}
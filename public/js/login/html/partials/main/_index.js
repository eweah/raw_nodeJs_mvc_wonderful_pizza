'use strict'

   /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires _action_button
   * @requires _password
   * @requires _username
   * 
   * @description holds the shadow DOM index HTML string
   * 
   * @return {String} the shadow DOM index HTML string 
   * 
   */
import _action_buttons from  './_action_button.js'
import _password from './_password.js'
import _username from './_username.js'

export default () => {
    return `
    <div class="main">
    <form id="login_form" class="login-form">
        <h1 style="text-align: center;">Login</h1>
        <section class="container">
            <!-- <h1 style="text-align: center;">Sign Up</h1> -->
            <fieldset class="account">
                <legend class="account-legend">Login</legend>
                <p class="account-requirements">Required fields are labeled with "required".</p>
                <hr>
                <div class="account-details">
                    <!-- Letters, numbers, dash, and underscore-->
                  ${_username()}
                    <!-- between 7 and 20 characters made up of at least an upper case letter, lower case letter and a number -->
                   ${_password()}

                </div>
            </fieldset>
           ${_action_buttons()}
        </section>
        <span id="unknown-error"></span>
    </form>
</div>`
}

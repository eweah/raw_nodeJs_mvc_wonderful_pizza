'use strict'
   /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import css from './css.js'
export default () => {
    return ` <div class="wrapper">
    <img src="../../../public/images/menu/schicken.jpg" alt="Chicken!Chicken!Chicken!" style="width:100%;">

    <div class="container content">
        <form action="" id="contact-form">
            <div class="name">
                <div class="firstname">
                    <label for="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname" minlength="2" maxlength="25" placeholder="First name.." required pattern="^[A-Z][A-Za-z.'\-].{0,25}$" autocomplete="on" />
                    <span class="error" aria-live="polite"></span>
                    <span id="firstname-error" aria-live="polite"></span>
                </div>
                <div class="lastname">
                    <label for="lastname">Last Name</label>
                    <input type="text" id="lastname" name="firstname" name="firstname" minlength="2" maxlength="75" placeholder="Last name.."  required pattern="^[A-Z][A-Za-z.'\-].{0,25}$" placeholder="Last name" autocomplete="on" />
                    <span class="error" aria-live="polite"></span>
                    <span id="lastname-error" aria-live="polite"></span>
                </div>
            </div>
            <div class="contact">
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" name="firstname" minlength="4" maxlength="100"  placeholder="Email address.." required
                    autocomplete="on" pattern="^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$"/><span class="error" aria-live="polite"></span>
                    <span id="email-error" aria-live="polite"></span>
                </div>
                <div class="phone">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" name="firstname" minlength="10" maxlength="15"  placeholder="Phone number.." required placeholder="number format  ###-###-####"
                    autocomplete="on" pattern="^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$"/>
                    <span class="error" aria-live="polite"></span>
                    <span id="phone-error" aria-live="polite"></span>
                </div>
            </div>
            <div class="contact-message">
                <div class="subject">
                    <label for="subject">Subject</label>
                    <input type="tel" id="subject" name="subject" minlength="1" maxlength="100" placeholder="Message subject.." required pattern="^([a-zA-Z0-9_.\ -?!]).{0,100}$" autocomplete="on" />
                    <span class="error" aria-live="polite"></span>
                    <span id="lastname-error" aria-live="polite"></span>
                </div>
                <div class="message">
                    <label for="message">Message </label>
                    <textarea id="message" name="message" minlength="20" maxlength="2000" placeholder="Write something.." style="height:auto" rows=10 required></textarea>
                    <span class="error" aria-live="polite"></span>
                </div>
            </div>
            <div class="actions">
                <div class="send">
                    <input type="submit" value="Submit" id="submit">
                </div>
                <div class="clear">
                    <input type="reset" value="Clear" id="clear">
                </div>
                <div class="exit">
                    <input type="button" value="Exit" id="exit">
                </div>
            </div>
        </form>
    </div>

</div>
    ${css()}
    `
}
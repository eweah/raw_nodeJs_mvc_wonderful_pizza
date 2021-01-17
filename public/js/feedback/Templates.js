'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Templates
 * @kind class
 * 
 * @extends Validator
 * 
 * @requires Validator
 * 
 * @classdesc Templates class for the order page
 * 
 **/
import Validator from "../common/Validator.js";

class Templates extends Validator {
  constructor() {
    super();
    // element created
  }

  /**
    * @name actionBtns
    * @function
    * 
    * @description sets action buttons HTML string
    * 
    * @return {String} action buttons HTML string
    * 
    */
  actionBtns = () => ` 
  <div class="form-state">
  <div class="submit"><button id="submit">Submit form</button></div>
  <div class="reset"><button id="reset">Clear form</button></div>
  <div class="exit"><button id="exit">Exit form</button></div>
  </div>`

   /**
    * @name formAgreement
    * @function
    * 
    * @description sets form agreements HTML string
    * 
    * @return {String} form agreements HTML string
    * 
    */
  formAgreement = () => ` 
   <div>
  <label for="agreement">I agree to the <a href="/terms">terms</a> and <a
          href="/conditions">conditions</a> :
      <input id="agreement" name="tosAgreement" type="checkbox" required /><span></span>
  </label>
</div>`

 /**
    * @name formActionButtom
    * @function
    * 
    * @description sets form action buttons HTML string
    * 
    * @return {String} form action buttons HTML string
    * 
    */
  formActionButtom = () => `
  <div class="form-state">
  <div class="submit"><button id="submit">Submit form</button></div>
  <div class="reset"><button id="reset">Clear form</button></div>
  <div class="exit"><button id="exit">Exit form</button></div>
</div>`

 /**
    * @name amexNumber
    * @function
    * 
    * @description sets American Express card number HTML string
    * 
    * @return {String} American Express card number HTML string
    * 
    */
  amexNumber = () => `<div>
  <label for="amex-number" class="amex-number">Card Number: </label>
  <input id="amex-number" name="amexcardnumber" type="text" minlength="15" maxlength="17" placeholder="####-######-#####"  pattern="^3[47][0-9]{2}([\- ]?)[0-9]{6}([\- ]?)[0-9]{5}$"
      required autocomplete="on" />
      <span class="error" aria-live="polite"></span>
</div>
`
 /**
    * @name amexCode
    * @function
    * 
    * @description sets American Express card code HTML string
    * 
    * @return {String} American Express card code HTML string
    * 
    */
  amexCode = () => `<div>
<label for="amex-security-code" class="amex-security-code">Security Code: <small
        style="color:blue" id="asc">4 digits in the front</small> </label>
<input type="text" id="amex-security-code" name="amexsecuritycode'" minlength="4" maxlength="4" placeholder="####" autocomplete="off" required pattern="^[0-9]{4}$" />
<span class="error" aria-live="polite"></span>
</div>`

/**
    * @name amexExpiration
    * @function
    * 
    * @description sets American Express card expiration date HTML string
    * 
    * @return {String} American Express card expiration date HTML string
    * 
    */
  amexExpiration = () => `<div>
<label for="expiration" class="expiration">Expiration Date: </label>
<input type="text" id="amex-expiration" name="amexexpiration" minlength="7" maxlength="7" placeholder="mm/yyyy" autocomplete="off" required pattern="^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$" />
<span class="error" aria-live="polite"></span>
</div>`

/**
    * @name amexNameOnCard
    * @function
    * 
    * @description sets name of American Express card HTML string
    * 
    * @return {String} name of American Express card HTML string
    * 
    */
  amexNameOnCard = () => `<div>
<label for="nameoncard">Name on card: </label><input id="amex-name-on-card" name="amexnameoncard" type="text" minlength="2" maxlength="50" required  placeholder="Name exactly as it appears on card." pattern="^[A-Z][A-Za-z.'\-].{0,25}$"
    autocomplete="off" /><span></span>
</div>`

 /**
    * @name visaNumber
    * @function
    * 
    * @description sets Vida card number HTML string
    * 
    * @return {String} Vida card number HTML string
    * 
    */
  visaNumber = () => `<div>
<label for="visa-number" class="visa-number">Card Number: </label><input id="visa-number" name="visacardnumber" type="text" minlength="16" maxlength="19" placeholder="####-####-####-####" 
pattern="^(?:4000)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$" required autocomplete="on" /><span class="error" aria-live="polite"></span>
</div>`

  /**
    * @name visaCode
    * @function
    * 
    * @description sets Vida card code HTML string
    * 
    * @return {String} Vida card code HTML string
    * 
    */
  visaCode = () => `
<div>
<label for="visa-security-code" class="visa-security-code">Security Code: <small
        style="color:blue" id="osc">3 digits in the back</small> </label>
<input type="text" id="visa-security-code" name="visasecuritycode'" minlength="3" maxlength="3" placeholder="###" autocomplete="off" pattern="^[0-9]{3}$" required  />
<span class="error" aria-live="polite"></span>
</div>`

/**
    * @name visaExpiration
    * @function
    * 
    * @description sets Vida card expiration date HTML string
    * 
    * @return {String} Vida card expiration date HTML string
    * 
    */
  visaExpiration = () => `
<div>
<label for="expiration" class="expiration">Expiration Date: </label>
<input type="text" id="visa-expiration" name="visaexpiration" minlength="7" maxlength="7" placeholder="mm/yyyy" autocomplete="off" required pattern="^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$"/>
<span class="error" aria-live="polite"></span>
</div>`

/**
    * @name visaNameOnCard
    * @function
    * 
    * @description sets name Vida card HTML string
    * 
    * @return {String} name Vida card HTML string
    * 
    */

  visaNameOnCard = () => `  
<div>
<label for="nameoncard">Name on card: </label><input id="visa-name-on-card" name="visanameoncard" type="text" minlength="2" maxlength="50" required  placeholder="Name exactly as it appears on card." pattern="^[A-Z][A-Za-z.'\-].{0,25}$"
    autocomplete="off" /><span></span>
</div>`

/**
    * @name masterNumber
    * @function
    * 
    * @description sets Master card number HTML string
    * 
    * @return {String} Master card number HTML string
    * 
    */
  masterNumber = () => `<div>
<label for="master-number" class="master-number">Card Number: </label><input id="master-number" name="mastercardnumber" type="text" minlength="16" maxlength="19" placeholder="####-####-####-####" pattern="^(?:5100)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$"
    required autocomplete="on" /><span class="error" aria-live="polite"></span>
</div>`

/**
    * @name masterCode
    * @function
    * 
    * @description sets Master card code HTML string
    * 
    * @return {String} Master card code HTML string
    * 
    */
  masterCode = () => `
<div>
<label for="master-security-code" class="master-security-code">Security Code: <small
        style="color:blue" id="osc">3 digits in the back</small> </label>
<input type="text" id="master-security-code" name="mastersecuritycode'" minlength="3" maxlength="3" placeholder="###" autocomplete="off" required pattern="^[0-9]{3}$" />
<span class="error" aria-live="polite"></span>
</div>`

/**
    * @name masterExpiration
    * @function
    * 
    * @description sets Master card expiration date HTML string
    * 
    * @return {String} Master card expiration date HTML string
    * 
    */
  masterExpiration = () => `
<div>
<label for="expiration" class="expiration">Expiration Date: </label>
<input type="text" id="master-expiration" name="masterexpiration" minlength="7" maxlength="7" placeholder="mm/yyyy" autocomplete="off" required pattern="^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$"/>
<span class="error" aria-live="polite"></span>
</div>`

  /**
    * @name masterNameOnCard
    * @function
    * 
    * @description sets name on Master card HTML string
    * 
    * @return {String} name on Master card HTML string
    * 
    */
  masterNameOnCard = () => `  
<div>
<label for="nameoncard">Name on card: </label><input id="master-name-on-card" name="masternameoncard" type="text" minlength="2" maxlength="50" required  placeholder="Name exactly as it appears on card." pattern="^[A-Z][A-Za-z.'\-].{0,25}$"
    autocomplete="off" /><span></span>
</div>`

/**
    * @name discoverNumber
    * @function
    * 
    * @description sets Discover card number HTML string
    * 
    * @return {String} Discover card number HTML string
    * 
    */
  discoverNumber = () => `<div>
<label for="discover-number" class="discover-number">Card Number: </label><input id="discover-number" name="discovercardnumber" type="text" minlength="16" maxlength="19" placeholder="####-####-####-####" pattern="^(?:6011)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$"
    required autocomplete="on" /><span class="error" aria-live="polite"></span>
</div>`

 /**
    * @name discoverCode
    * @function
    * 
    * @description sets Discover card code HTML string
    * 
    * @return {String} Discover card code HTML string
    * 
    */
  discoverCode = () => `
<div>
<label for="discover-security-code" class="discover-security-code">Security Code: <small
        style="color:blue" id="osc">3 digits in the back</small> </label>
<input type="text" id="discover-security-code" name="discoversecuritycode'" minlength="3" maxlength="3" placeholder="###" autocomplete="off" required pattern="^[0-9]{3}$" />
<span class="error" aria-live="polite"></span>
</div>`

/**
    * @name discoverExpiration
    * @function
    * 
    * @description sets Discover card expiration date HTML string
    * 
    * @return {String} Discover card expiration date HTML string
    * 
    */
  discoverExpiration = () => `
<div>
<label for="expiration" class="expiration">Expiration Date: </label>
<input type="text" id="discover-expiration" name="discoverexpiration" minlength="7" maxlength="7" placeholder="mm/yyyy" autocomplete="off" required pattern="^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$" />
<span class="error" aria-live="polite"></span>
</div>`

/**
    * @name discoverNameOnCard
    * @function
    * 
    * @description sets name on Discover card HTML string
    * 
    * @return {String} name on Discover card HTML string
    * 
    */
  discoverNameOnCard = () => `  
<div>
<label for="nameoncard">Name on card: </label><input id="discover-name-on-card" name="discovernameoncard" type="text" minlength="2" maxlength="50" required  placeholder="Name exactly as it appears on card." pattern="^[A-Z][A-Za-z.'\-].{0,25}$"
    autocomplete="off" /><span></span>
</div>`


    /**
     * @name connectedCallback (element's life cycle)
     * @function
     * 
     * @description browser calls this method when the element is added or mounted to the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
    connectedCallback() {}

    /**
     * @name disconnectedCallback (element's life cycle)
     * @function 
     * 
     * @description browser calls this method when the element is removed or disconnect from the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
	  disconnectedCallback() {}

	  /**
     * @name observedAttributes (element's life cycle)
     * @function
     * 
     * @description array of attribute names to monitor for changes
     * 
     * @return does not return anything
     * 
     */
	  static get observedAttributes() {return []}

	  /**
     * @name attributeChangedCallback (element's life cycle)
     * @function
     * 
     * @description called when one of attributes listed above is modified (the attributes listed in the array returned by the observedAttribues method above)
     * 
     * @return does not return anything
     * 
     */

	  attributeChangedCallback(name, oldValue, newValue) {}

	  /**
     * @name adoptedCallback (element's life cycle)
     * @function
     * 
     * @description called when the element is moved to a new document
     * 
     * @return does not return anything
     * 
     */
	  adoptedCallback() {}
}
customElements.define("app-card-templates", Templates);
export default Templates
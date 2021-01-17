'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module FormElement
 * @kind class
 * 
 * @extends BaseElement
 * 
 * @requires BaseElement
 * 
 * @classdesc FormElement class for all forms
 * 
 */

import PizzaElement from '../menu/pizza/PizzaElement.js'
class FormElement extends PizzaElement {
  constructor() {
    super();

    // auto bind methods 
    this.autobind(FormElement)
    // element created
  }
 
   /**
    * @name formField 
    * @function
    * 
    * @description gets form fields by id
    * 
    * @return {HTMLElement} the HTML element
    * 
    */
   formField(fieldId) {
       return this.shadowRoot.getElementById(fieldId)
   }
   /**
    * @name formField 
    * @function
    * 
    * @description sets default form field validation error messages
    * 
    * @return {Object} default form field validation error message object
    * 
    */
   validity() {
       return {
           value: 'Darling, this field cannot be blink.',
           type: 'must be  a text or a number',
           minlength: 'Darling, this is too short.',
           maxlength: 'Darling, this is too long.',
           pattern: 'Darling, this is not the right formatting.',
           badinput: 'I will not accept this, darling.'
       }
   }
   
   /**
    * @name showFormFieldNameError 
    * @function
    * 
    * @param {String} field the form field id
    * @param {Object} options form field error messages
    * 
    * @description sets default form field validation error messages
    * 
    * @return does not return anything
    * 
    */
   showFormFieldNameError(field, options = this.validity()) {
       if (field.validity.valueMissing) {
           field.setCustomValidity(options.value);
       } else if (field.validity.typeMismatch) {
           field.setCustomValidity(options.type);
       } else if (field.validity.tooShort) {
           field.setCustomValidity(options.minlength)
       } else if (field.validity.tooLong) {
           field.setCustomValidity(options.maxlength)
       } else if (field.validity.patternMismatch) {
           field.setCustomValidity(options.pattern)
       } else if (field.validity.badInput) {
           field.setCustomValidity(options.input)
       }
   }
   /**
    * @name formFieldOnChange
    * @function
    * 
    * @param {String} field the form field id
    * 
    * @description checks validity and report validity for form field upon change event
    * 
    * @return does not return anything
    * 
    */
   formFieldOnChange(field) {
       field.addEventListener('change', () => {
           field.setCustomValidity('')
           field.checkValidity()
           field.reportValidity()
       })
   }

   /**
    * @name formFieldOnInvalid
    * @function
    * 
    * @param {String} field the form field id
    * @param {Object} options form field error messages
    * 
    * @description checks validity and shows form field error messages upon invalid event
    * 
    * @return does not return anything
    * 
    */

   formFieldOnInvalid(field, options = this.validity()) {
       field.addEventListener('invalid', () => {
           if (!field.validity.valid) {
               this.showFormFieldNameError(field, options)
           }
       })
   }
   /**
    * @name validate
    * @function
    * 
    * @param {String} field the form field id
    * @param {Object} options form field error messages
    * 
    * @description validates form fields
    * 
    * @return does not return anything
    * 
    */
   validate(field, options = this.validity()) {
       if (options) {
           this.showFormFieldNameError(field, options)
       } else {
           this.showFormFieldNameError(field)
       }
       // this.showFormFieldNameError(field, options)
       this.formFieldOnChange(field)
       this.formFieldOnInvalid(field, options)
   }

    /**
    * @name formAssociated
    * @function
    * 
    * @description associates or makes an element a form type HTML element
    * 
    * @return {Boolean} true
    * 
    */
   static get formAssociated() {return true}

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
customElements.define("form-element",  FormElement)
export default FormElement
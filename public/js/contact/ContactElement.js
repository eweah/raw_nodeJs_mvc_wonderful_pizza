'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module ContactElement
 * @kind class
 * 
 * @extends Validator
 * 
 * @requires Validator
 * 
 * @classdesc ContactElement class for the account page
 * 
 */
import Validator from '../common/Validator.js';
class ContactElement extends Validator {
  constructor() {
    super();
    // element created
  }
 /**
  * @name onInit
  * @function
  * 
  * @description set initial value for the contact form fields and validate contact form
  * 
  * @return {Promise} nothing upon successfull fulfillment
  * 
  */

 async onInit(){
  this.firstname = this.formField('firstname')
  this.lastname = this.formField('lastname')
  this.email = this.formField('email')
  this.phone = this.formField('phone')
  this.subject = this.formField('subject')
  this.message = this.formField('message')
  this.contactForm = this.formField('contact-form')
 if(this.authCheck()){
   const user = await this.authUser()
   this.firstname.setAttribute('value', user.firstname)
   this.lastname.setAttribute('value', user.lastname)
   this.phone.setAttribute('value', user.phone)
   this.email.setAttribute('value', user.email)
 }
 this.validateContactForm()
}

// contact form handler 

contactFormHandler(){
  this.contactForm.addEventListener('submit', event =>{
    event.preventDefault()
    const contactDetails = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      phone: this.phone.value,
      subject: this.subject.value,
      message: this.message.value
    }
    // console.log(contactDetails)
    this.contact(contactDetails)
    .then(response => {
      if(response.success){
        this.firstname.value = ''
        this.lastname.value = ''
        this.email.value = ''
        this.phone.value = ''
        this.subject.value = ''
        this.message.value = ''
      }
    })
    .catch(error => console.log('sorry'))
 
  })
  this.formField('exit').addEventListener('click', event =>{
    window.location.href = 'http://wonderfulpizza.devoutprogrammer.com/menu'
})
}

init(){
  this.onInit()
  this.contactFormHandler()
}
 
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
customElements.define("contact-element", ContactElement);
export default ContactElement
'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Feedback
 * @kind class
 * 
 * @extends FeedbackElement
 * 
 * @requires FeedbackElement
 * @requires html 
 * @requires feedbackDefaultSettings
 * 
 * @classdesc Feedback class for the Feedback page
 * 
 **/
import FeedbackElement from './FeedbackElement.js'
import html from './html/html.js'
import feedbackDefaultSettings from './defaultSettings.js'

class Feedback extends FeedbackElement {
  constructor() {
    super();
    
    // auto bind methods 
    this.autobind(Feedback)
    this.attachShadow({
      mode: 'open'
    })
    // Place any children the element creates into its shadow root.
    this.shadowRoot.innerHTML = html()
   
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
// define app-feedback element
customElements.define("app-feedback", Feedback);
// set feedback default settings
feedbackDefaultSettings()

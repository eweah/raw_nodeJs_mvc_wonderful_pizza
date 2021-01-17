'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module About
 * @kind class
 * 
 * @extends AboutElement
 * 
 * @requires AboutElement
 * @requires html
 * @requires aboutDefaultSettings
 * 
 * @classdesc About class for the about page
 * 
 */
import AboutElement from './AboutElement.js'
import html from './html.js'
import aboutDefaultSettings from './defaultSettings.js'

class About extends AboutElement {
  constructor() {
    super();
    // element created
    this.attachShadow({
      mode: 'open'
    })
    this.shadowRoot.innerHTML = html()
  }

  /**
   * @name connectedCallback (element's life cycle)
   * @function
   * 
   * @description browser calls this method when the element is added or mounted to the  document or DOM
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
  static get observedAttributes() {
    return ['name', 'small', 'medium', 'large', 'xlarge']
  }

  /**
   * @name attributeChangedCallback (element's life cycle)
   * @function
   * 
   * @description called when one of attributes listed above is modified (the attributes listed in the array returned by the observedAttribues method above)
   * 
   * @return does not return anything
   * 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
    if (this.hasAttribute('name')) {
      this.aboutTypes.push(this.getAttribute('name').toLowerCase())
      this.onAboutElementNaming()
    }
  }

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

// Define app-about element
customElements.define("app-about", About)
// set about default settings
aboutDefaultSettings()

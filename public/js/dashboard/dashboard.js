'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Dashboard
 * @kind class
 * 
 * @extends DashboardElement
 * 
 * @requires DashboardElement
 * @requires html 
 * @requires dashboardDefaultSettings
 * 
 * @classdesc Dashboard class for the dashboard page
 * 
 */

import DashboardElement from './DasboardElement.js'
import html from './html.js'
import dashboardDefaultSettings from './defaultSettings.js'

class Dashboard extends DashboardElement {
  constructor() {
    super();
    // element created
    this.attachShadow({mode: 'open'})
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
    connectedCallback() {this.init()}

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
        this.dashboardTypes.push(this.getAttribute('name').toLowerCase())
        this.onDashboardElementNaming()
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
// define user-dashboard element
customElements.define("user-dashboard", Dashboard);
// set dashboard default settings
dashboardDefaultSettings()

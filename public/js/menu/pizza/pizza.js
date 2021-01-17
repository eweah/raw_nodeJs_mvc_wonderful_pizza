'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Pizza
 * @kind class
 * 
 * @extends PizzaElement
 * 
 * @requires PizzaElement
 * @requires html
 * @requires menuDefaultSettings
 * 
 * @classdesc Pizza class for the menu page
 * 
 */
import html from './html.js'
import PizzaElement from './PizzaElement.js'
import menuDefaultSettings from './defaultSettings.js'
// Element class
class Pizza extends PizzaElement {
    constructor() {
        super()

        // auto bind methods
        this.autobind(Pizza)
        // Create your shadow root in the constructor.
        this.attachShadow({
            mode: 'open'
        })
        // Place any children the element creates into its shadow root.
        // Create a shadow root to encapsulate styles.
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
    connectedCallback() {
        this.init()
    }
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
        if (this.hasAttribute('name')) {
            // add to the this.pizzas array for each <menu-pizza></menu-pizza> added to the dom
            this.pizzas.push(this.getAttribute('name').toLowerCase())
            this.onElementNaming()
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
// Define Element
menuDefaultSettings()
customElements.define('menu-pizza', Pizza)
// set menu default settings


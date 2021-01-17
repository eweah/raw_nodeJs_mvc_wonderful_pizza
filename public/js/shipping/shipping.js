'use strict';
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Shipping
 * @kind class
 * 
 * @extends ShippingElement
 * 
 * @requires ShippingElement
 * @requires html
 * @requires shipping
 * 
 * @classdesc Shipping class for handling all shapping objects and activities
 * 
 */
import ShippingElement from './ShippingElement.js';
import html from './html/html.js';
import shippingDefaultSettings from './defaultSettings.js'

class Shipping extends ShippingElement {
	constructor() {
		super();
		// element created
		this.attachShadow({
			mode: 'open',
		});
		this.shadowRoot.innerHTML = html();
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
// set shipping default settings
shippingDefaultSettings()
// define app-shipping element
customElements.define('app-shipping', Shipping);

'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Order
 * @kind class
 * 
 * @extends OrderElement
 * 
 * @requires OrderElement
 * @requires html
 * @requires orderDefaultSettings
 * 
 * @classdesc Order class for the order page
 * 
 **/
import OrderElement from './OrderElement.js'
import html from './html.js'
import orderDefaultSettings from './defaultSettings.js'

class Order extends OrderElement {
    // class Order extends HTMLElement {
    constructor() {
        super();

        // auto bind methods
        this.autobind(Order)
        this.attachShadow({
            mode: 'open'
        })
        // element created
        this.shadowRoot.innerHTML = html()
        this.offlineOrders = []
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

    async connectedCallback() {
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
    static get observedAttributes() {
        return []
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
// define user-order element
customElements.define("user-order", Order);

// set order default settings
orderDefaultSettings()

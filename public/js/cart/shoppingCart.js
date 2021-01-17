'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module ShoppingCart
 * @kind class
 * 
 * @extends ShoppingCartElement
 * 
 * @requires ShoppingCartElement
 * @requires html
 * @requires cartDefaultSettings
 * 
 * @classdesc ShoppingCart class for the cart page
 * 
 */
import ShoppingCartElement from './ShoppingCartElement.js'
import html from './html.js'
import cartDefaultSettings from './defaultSettings.js'
class ShoppingCart extends ShoppingCartElement {
    // class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        // auto bind methods 
        this.autobind(ShoppingCart)

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
// define shopping-cart element
customElements.define("shopping-cart", ShoppingCart);

// set cart default setting
cartDefaultSettings()

'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Page
 * @kind class
 * 
 * @extends PageElement
 * 
 * @requires PageElement
 * @requires html
 * 
 * @classdesc Page class for the order page
 * 
 **/
import PageElement from './PageElement.js'
import html from './html/index.js'
// Element class
class Page extends PageElement {
    constructor() {
            super()

            // auto bind class 
            this.autobind(Page)
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.innerHTML = html()
            this.sidebar = this.shadowRoot.getElementById('side')
            this.main = this.shadowRoot.getElementById('main')
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
    static get observedAttributes() {
        return ['class', 'type', 'image', 'nosidebar', 'nomain']
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
        if (name === 'nosidebar') {
            this.sidebar.style.display = 'none'
        }
        if (name === 'nomain') {
            this.main.style.display = 'none'
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
customElements.define('app-page', Page)
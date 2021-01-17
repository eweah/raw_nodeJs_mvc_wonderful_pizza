'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Login
 * @kind class
 * 
 * @extends LoginElement
 * 
 * @requires LoginElement
 * @requires shadowRoot
 * @requires defaultSettings
 * 
 * @classdesc Login class for the login page
 * 
 */
import LoginElement from './LoginElement.js'
import shadowroot from './html/index.js'
import loginDefaultSettings from './defaultSettings.js'
// Element class
class Login extends LoginElement {
    constructor() {
        super()

        // auto bind methods 
        this.autobind(Login)

        this.attachShadow({
            mode: 'open'
        })
        this.shadowRoot.innerHTML = shadowroot()
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
// Define Element
customElements.define('app-login', Login)
// set default settings
loginDefaultSettings()

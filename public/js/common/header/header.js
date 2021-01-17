'use strict'
import BaseHeader from './BaseHeader.js'
import html from './html.js'
// Element class
class Header extends  BaseHeader {
    constructor() {
            super()
            this.autobind(Header)
                // Create your shadow root in the constructor.
            this.attachShadow({ mode: 'open' })
                // Place any children the element creates into its shadow root.
                // Create a shadow root to encapsulate styles.
            this.shadowRoot.innerHTML =  html()
            
            this.notificationContainer = this.shadowRoot.querySelector('.notifications')
            this.notificationBtn = this.shadowRoot.getElementById('notification')
            this.headerTile = this.shadowRoot.getElementById('title')
            this.headerTitleText = this.shadowRoot.getElementById('title-text')
        }
        // Should return  an array containing the names of the attributes you want to observe
        // static get observedAttributes() {
        //         return ['attr1', 'attr2', 'attr3']
        //     }
        // When the element is mounted to the DOM (light DOM)
        // Invoked when the custom element is first connected to the document's DOM
   
     
    connectedCallback() {
    this.forceLogout()
    this.pages()
    this.onCartItemAddNotification()
    this.onCartItemRemoveNotification()
    this.onCartItemUpdateNotification()
    this.onOrderReviewUpdateNotification()
    
    }
        // When element is umounted to the DOM (light DOM)
        //  Invoked when the custom element is disconnected from the document's DOM.
        // disconnectedCallback() {}
        //Invoked when the custom element is moved to a new document.
        // adoptedCallback() {}
        // Invoked when one of the custom element's attributes is added, removed, or changed.
        // attributeChangedCallback(name, oldValue, newValue) {}
}

// Define Element
customElements.define('app-header', Header)

// Some extra stuff
// Dispatch events in response to internal component activity.
// Do not dispatch events in response to the host setting a property(downward data flow).
// const myElementEvent = new Event('main-header', { bubbles: true, disposed: true, cancelable: false })
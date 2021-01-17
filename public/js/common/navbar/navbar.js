'use strict'
import NavbarElement from './NavbarElement.js'
import html from './html.js'
// Element class
class Navbar extends NavbarElement {
    constructor() {
        super()
        this.autobind(Navbar)
        // Create your shadow root in the constructor.
        this.attachShadow({
            mode: 'open'
        })
        // Place any children the element creates into its shadow root.

        // Create a shadow root to encapsulate styles.
        this.shadowRoot.innerHTML = html()
        this.cart = this.shadowRoot.getElementById('cart')
        this.price = this.shadowRoot.getElementById('price')
        this.icon = this.shadowRoot.getElementById('icon')
        this.cart = this.shadowRoot.getElementById('cart')
        this.badge = this.shadowRoot.getElementById('badge')
        this.equal = this.shadowRoot.getElementById('equal')
        // this.navbar = this.shadowRoot.getElementById("navbar")
    }

    connectedCallback() {
        this.forceLogout()
        this.navigation()
        this.logout()
        this.paymentProcess()
        this.hideCartDetails()
        this.isUserLoggedIn()
        window.addEventListener('user-has-logged-in', event => {
            this.isUserLoggedIn()
        })

        if (this.authCheck()) {
            this.realTimeSubtotal()
            this.addCartChannel.onmessage = event => this.realTimeSubtotal()
            this.updateCartChannel.onmessage = event => this.realTimeSubtotal()
            this.removeCartChannel.onmessage = event => this.realTimeSubtotal()
        } else {
            this.onGuestLoadCartItems()
            this.onGuestAddItemToCart()
            this.onGuestUpdateCartItem()
            this.onGuestRemoveCartItem()
        }

        this.cart.addEventListener('mouseenter', event => {
            this.cart.style.backgroundColor = 'bisque'
            this.badge.style.backgroundColor = 'green'
        })
        this.cart.addEventListener('mouseleave', event => {
            this.cart.style.backgroundColor = 'orange'
            this.badge.style.backgroundColor = 'red'
        })
        
    }
    // When element is umounted to the DOM (light DOM)
    //  Invoked when the custom element is disconnected from the document's DOM.
    disconnectedCallback() {

    }
    //Invoked when the custom element is moved to a new document.
    adoptedCallback() {
        console.log('moved')
    }
    // Invoked when one of the custom element's attributes is added, removed, or changed.
    // attributeChangedCallback(name, oldValue, newValue) {}
}

// Define Element
customElements.define('app-navbar', Navbar)
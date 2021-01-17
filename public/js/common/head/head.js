'use strict'
'use strict'
// Element class
class Head extends HTMLElement {
    constructor() {
            super()
                // Create shadow root in the constructor.
            this.attachShadow({ mode: 'open' })
                // Place any children the element creates into its shadow root.
                // Create a shadow root to encapsulate styles.
            this.shadowRoot.innerHTML = `
            <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="description" content="Back to the basics">
    <meta name="keywords" content="HTML, CSS,JavaScript, NodeJs">
    <meta name="author" content="The Devout Programmer">
    <script src="./assets/js/common/header/header.js" defer type="module"></script>
    <script src="./assets/js/common/navbar/navbar.js" defer type="module"></script>
    <script src="./assets/js/common/footer/footer.js" defer type="module"></script>
    <link rel="stylesheet" href="./assets/css/common/head.css">
                `
        }
        // Should return  an array containing the names of the attributes you want to observe
        // static get observedAttributes() {
        //         return ['attr1', 'attr2', 'attr3']
        //     }
        // When the element is mounted to the DOM (light DOM)
        // Invoked when the custom element is first connected to the document's DOM
        // connectedCallback() {}
        // When element is umounted to the DOM (light DOM)
        //  Invoked when the custom element is disconnected from the document's DOM.
        // disconnectedCallback() {}
        //Invoked when the custom element is moved to a new document.
        // adoptedCallback() {}
        // Invoked when one of the custom element's attributes is added, removed, or changed.
        // attributeChangedCallback(name, oldValue, newValue) {}
}

// Define Element
customElements.define('app-head', Head)
    // Some extra stuff
    // Dispatch events in response to internal component activity.
    // Do not dispatch events in response to the host setting a property(downward data flow).
    // const myElementEvent = new Event('app-head', { bubbles: true, disposed: true, cancelable: false })
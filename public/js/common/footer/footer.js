'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Footer
 * @kind class
 * 
 * @extends Validator
 * 
 * @requires Validator
 * @requires html
 * 
 * @classdesc Footer class for all pages
 * 
 */
import html from './html.js'
import Validator from '../Validator.js'
// Element class
class Footer extends Validator {
    constructor() {
        super()

       // auto bind methods 
       this.autobind(Footer)
        this.attachShadow({
            mode: 'open'
        })
        this.shadowRoot.innerHTML = html()
    }
 
    /**
     * @name openForm
     * @function
     * 
     * @description opens the footer's chat form
	
     * @return does not return anything
     * 
     */
    openForm() {
        this.shadowRoot.getElementById('chat-container').style.display = 'block'
    }
    /**
     * @name closeForm
     * @function
     * 
     * @description closes the footer's chat form
	
     * @return does not return anything
     * 
     */
    
    closeForm() {
        this.shadowRoot.getElementById('chat-container').style.display = 'none'
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
    
        // console.log(this.rtc)
        this.channel  = new BroadcastChannel('public_chat')
        this.subscription = new BroadcastChannel('public_chat')
        this.chatForm = this.shadowRoot.getElementById('message-container')
        this.chatMessage = this.shadowRoot.getElementById('chat-message')
        // this.chatMessage.addEventListener('keyup', event => {
        //     event.preventDefault()
        //     if(event.keyCode === 13){
        //         event.preventDefault()
        //         this.chatForm.submit()
        //         event.preventDefault()
        //     }
        // })
        this.chatMessages = this.shadowRoot.getElementById('app')
        this.subscription.onmessage = event => {
            event.preventDefault()
             const ul = document.createElement('ul')
             const li = document.createElement('li')
             li.innerHTML = `${event.data}`
             ul.appendChild(li)
             this.chatMessages.appendChild(ul)
        }
        // const socket = new WebSocket('ws://localhost:3000/chat')
        // console.log(socket)
        // socket.addEventListener('open', event =>{
        //     console.log('Open')
        // })
        // socket.onopen = event =>{
        //     console.log('open', event)
        //     socket.send({message:'hey'})
        // }
        
        // socket.onmessage = event =>{
        //     console.log('on message event', event)
        // }

        // this.chatForm.addEventListener('submit', event => {
        //     event.preventDefault()
        //     // if(this.chatForm.msg){
        //     //     this.channel.postMessage(this.chatForm.msg.value)
        //     //     this.chatForm.msg.value = ''
        //     // }
            
        //     //  this.chatnow({name: 'ericson'})
        //     //  .then(response =>{
        //     //      console.log(response.chat)
        //     //  })
        //     //  .catch(console.error)
           
        //     // socket.addEventListener('open', event =>{
        //     //     event.preventDefault()
        //     //     console.log('open')
        //     //     socket.send({message: 'Hello World'})
        //     // })
        //     // socket.addEventListener('message', event =>{
        //     //     console.log(event.data)
        //     // })
            
           
        
        // })
        // this.chat = this.shadowRoot.getElementById('chat')
        // this.close = this.shadowRoot.getElementById('close')
        // this.chat.addEventListener('click', event => {
        //     this.openForm()
    
        // })
        // this.close.addEventListener('click', event => {
        //     this.closeForm()
        // })
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

// Define Element
customElements.define('app-footer', Footer)
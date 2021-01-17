'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module FeedbackElement
 * @kind class
 * 
 * @extends Templates
 * 
 * @requires Templates
 * 
 * @classdesc FeedbackElement class for the order page
 * 
 **/

import Templates from './Templates.js';
class FeedbackElement extends Templates {
  constructor() {
    super();
    
    // auto bind methods 

    this.autobind(FeedbackElement)
  }

  /**
    * @name submitBtn
    * @function
    * 
    * @description gets the shadow DOM element which has id 'submit'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'submit'
    * 
    */
  submitBtn = () => this.formField('submit')

  /**
    * @name agreement
    * @function
    * 
    * @description gets the shadow DOM element which has id 'agreement'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'agreement'
    * 
    */
  agreement = () => this.formField('agreement')
  // amexNumber = () => this.formField('amex-number')

  /**
    * @name expiration
    * @function
    * 
    * @description gets the shadow DOM element which has id 'expiration'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'expiration'
    * 
    */
  expiration = () => this.formField('expiration')

  /**
    * @name nameoncard
    * @function
    * 
    * @description gets the shadow DOM element which has id 'nameoncard'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'nameoncard'
    * 
    */
  nameoncard = () => this.formField('nameoncard')


  /**
    * @name card
    * @function
    * 
    * @description gets the shadow DOM element which has id 'card-type'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'card-type'
    * 
    */
  card = () => this.formField('card-type')

  /**
    * @name paymentForm
    * @function
    * 
    * @description gets the shadow DOM element which has id 'payment-form'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'payment-form'
    * 
    */
  paymentForm = () => this.formField('payment-form')

  /**
    * @name cardsNumber
    * @function
    * 
    * @description gets the shadow DOM element which has id 'cards-number'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'cards-number'
    * 
    */
  cardsNumber = () => this.formField('cards-number')

  /**
    * @name cardsCode
    * @function
    * 
    * @description gets the shadow DOM element which has id 'cards-code'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'cards-code'
    * 
    */
  cardsCode = () => this.formField('cards-code')

/**
    * @name expirationDate
    * @function
    * 
    * @description gets the shadow DOM element which has id 'card-expiration-date'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'card-expiration-date'
    * 
    */
  expirationDate = () => this.formField('card-expiration-date')

/**
    * @name actionButtons
    * @function
    * 
    * @description gets the shadow DOM element which has id 'action-buttons'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'action-buttons'
    * 
    */
  actionButtons = () => this.formField('action-buttons')

  /**
    * @name agreements
    * @function
    * 
    * @description gets the shadow DOM element which has id 'agreements'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'agreements'
    * 
    */
  agreements = () => this.formField('agreements')

  /**
    * @name namedOnCard
    * @function
    * 
    * @description gets the shadow DOM element which has id 'name-on-card'
    * 
    * @return {HTMLElement} the shadow DOM element with id 'name-on-card'
    * 
    */
  namedOnCard = () => this.formField('name-on-card')


  /**
    * @name amexSelected
    * @function
    * 
    * @description sets American Express card attributes upon its selection
    * 
    * @return does not retur anuything
    * 
    */

amexSelected(){
  const amex_regex = '^3[47][0-9]{2}([\- ]?)[0-9]{6}[0-9]{5}$'
        this.cardsNumber().innerHTML = ''
        this.cardsCode().innerHTML = ''
        this.expirationDate().innerHTML = ''
        this.namedOnCard().innerHTML = ''
        this.agreements().innerHTML = ''
        this.actionButtons().innerHTML = ''

        this.cardsNumber().innerHTML = this.amexNumber()
        this.cardsCode().innerHTML = this.amexCode()

        this.expirationDate().innerHTML = this.amexExpiration()
        this.namedOnCard().innerHTML = this.amexNameOnCard()
        this.agreements().innerHTML = this.formAgreement()
        this.actionButtons().innerHTML = this.actionBtns()

        this.selectedCartNumber = this.formField('amex-number')
        this.selectedCartCode = this.formField('amex-security-code')
        this.selectedExpiration = this.formField('amex-expiration')
        this.selectedNameOnCard = this.formField('amex-name-on-card')
        this.selectedAgreement = this.formField('agreement')
        // console.log('in amexSelected', this.selectedCartNumber)

      this.validateAmexCardNumber()
      // this.validateCardExpirationDate()
      // this.validateDiscoverExpirationDate()
      this.validateAmexExpirationDate()
      this.validateAmexCardSecurityCode()
      // this.validateNameOnCard()
      this.validateAmexNameOnCard()
      this.formatAmexCardNumber()
      this.validateAmexPaymentAgreements()
        // this.selectedCard = 'amex'
        // console.log(this)
}
 /**
    * @name visaSelected
    * @function
    * 
    * @description sets Visa card attributes upon its selection
    * 
    * @return does not return anuything
    * 
    */
visaSelected(){
 // const visa_regex = '^(?:4000)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$'
 this.cardsNumber().innerHTML = ''
 this.cardsCode().innerHTML = ''
 this.expirationDate().innerHTML = ''
 this.namedOnCard().innerHTML = ''
 this.agreements().innerHTML = ''
 this.actionButtons().innerHTML = ''

 this.cardsNumber().innerHTML = this.visaNumber()
 this.cardsCode().innerHTML = this.visaCode()

 this.expirationDate().innerHTML = this.visaExpiration()
 this.namedOnCard().innerHTML = this.visaNameOnCard()
 this.agreements().innerHTML = this.formAgreement()
 this.actionButtons().innerHTML = this.actionBtns()

 this.selectedCartNumber = this.formField('visa-number')
 this.selectedCartCode = this.formField('visa-security-code')
 this.selectedExpiration = this.formField('visa-expiration')
 this.selectedNameOnCard = this.formField('visa-name-on-card')
 this.selectedAgreement = this.formField('agreement')
 this.validateVisaCardNumber()
 this.validateVisaExpirationDate()
 this.validateVisaCardSecurityCode()
 this.validateVisaNameOnCard()
 this.formatVisaCardNumber()
 this.validateVisaPaymentAgreements()
//  this.validateAgreements()
 // this.selectedCard = 'visa'
 // console.log(this)
 // console.log(this.cardsNumber())


}

  /**
    * @name masterSelected
    * @function
    * 
    * @description sets Master card attributes upon its selection
    * 
    * @return does not return anuything
    * 
    */
masterSelected(){
  const master_regex = '^(?:5100)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$'
  this.cardsNumber().innerHTML = ''
  this.cardsCode().innerHTML = ''
  this.expirationDate().innerHTML = ''
  this.namedOnCard().innerHTML = ''
  this.agreements().innerHTML = ''
  this.actionButtons().innerHTML = ''

  this.cardsNumber().innerHTML = this.masterNumber()
  this.cardsCode().innerHTML = this.masterCode()

  this.expirationDate().innerHTML = this.masterExpiration()
  this.namedOnCard().innerHTML = this.masterNameOnCard()
  this.agreements().innerHTML = this.formAgreement()
  this.actionButtons().innerHTML = this.actionBtns()
  // this.masterCardNumber = this.formField('master-number')
  // this.masterSecurityCode = this.formField('master-security-code')

  this.selectedCartNumber = this.formField('master-number')
  this.selectedCartCode = this.formField('master-security-code')
  this.selectedExpiration = this.formField('master-expiration')
  this.selectedNameOnCard = this.formField('master-name-on-card')
  this.selectedAgreement = this.formField('agreement')

 this.validateMasterCardNumber()
//  this.validateCardExpirationDate()
 this.validateMasterExpirationDate()
 this.validateMasterCardSecurityCode()
 this.validateMasterNameOnCard()
//  this.validateNameOnCard()
 this.formatMasterCardNumber()
 this.validateMasterPaymentAgreements()
//  this.validateAgreements()
  // this.selectedCard = 'master'

  // console.log(this)
}

 /**
    * @name discoverSelected
    * @function
    * 
    * @description sets Discover card attributes upon its selection
    * 
    * @return does not return anuything
    * 
    */
discoverSelected(){
  const discover_regex = '^(?:6011)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$'
  this.cardsNumber().innerHTML = ''
  this.cardsCode().innerHTML = ''
  this.expirationDate().innerHTML = ''
  this.namedOnCard().innerHTML = ''
  this.agreements().innerHTML = ''
  this.actionButtons().innerHTML = ''

  this.cardsNumber().innerHTML = this.discoverNumber()
  this.cardsCode().innerHTML = this.discoverCode()
  this.expirationDate().innerHTML = this.discoverExpiration()
  this.namedOnCard().innerHTML = this.discoverNameOnCard()
  this.agreements().innerHTML = this.formAgreement()
  this.actionButtons().innerHTML = this.actionBtns()
  // this.discoverCardNumber = this.formField('discover-number')
  // this.discoverSecurityCode = this.formField('discover-security-code')
  // console.log(this.discoverCardNumber, this.discoverSecurityCode)

  this.selectedCartNumber = this.formField('discover-number')
  this.selectedCartCode = this.formField('discover-security-code')
  this.selectedExpiration = this.formField('discover-expiration')
  this.selectedNameOnCard = this.formField('discover-name-on-card')
  this.selectedAgreement = this.formField('agreement')

  this.validateDiscoverCardNumber()
  this.validateDiscoverExpirationDate()
  this.validateDiscoverCardSecurityCode()
  this.validateDiscoverNameOnCard()
  this.formatDiscoverCardNumber()
  this.validateDiscoverPaymentAgreements()
  // this.selectedCard = 'discover'
  // console.log(this)
}

 /**
    * @name noCardSelected
    * @function
    * 
    * @description sets default attributes upon card selection when no card is selected
    * 
    * @return does not return anuything
    * 
    */
noCardSelected(){
 // const visa_regex = '^(?:4000)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$'
 this.cardsNumber().innerHTML = ''
 this.cardsCode().innerHTML = ''
 this.expirationDate().innerHTML = ''
 this.namedOnCard().innerHTML = ''
 this.agreements().innerHTML = ''
 this.actionButtons().innerHTML = ''
 // this.visaCardNumber = this.formField('visa-number')
 // this.visaSecurityCode = this.formField('visa-security-code')
 // console.log(this.amexCardNumber, this.amexSecurityCode)

 // this.selectedCartNumber = this.cardsNumber()
 // this.selectedCartCode = this.cardsCode()
 // console.log(this)
}

 /**
    * @name selected
    * @function
    * 
    * @description selects the corresponding card upon card selection
    * 
    * @return does not return anuything
    * 
    */
selectCard(event){
  const cardType = event.currentTarget.value
  if (cardType === 'amex') {
    this.amexSelected()
  } else if (cardType === 'visa') {
    this.visaSelected()
  } else if (cardType === 'master') {
    this.masterSelected()
  } else if (cardType === 'discover') {
    this.discoverSelected()
  } else if (cardType === 'nothing') {
    this.noCardSelected()
  }
}

 /**
    * @name initalizeCardVariables
    * @function
    * 
    * @description sets selected card variables upon selection
    * 
    * @return does not return anuything
    * 
    */
initalizeCardVariables(event){
  this.selectedCartNumber
  this.selectedCartCode
  this.selectedExpiration
  this.selectedNameOnCard
  this.selectedAgreement
  this.selectedCard = event.currentTarget.value
}
// Validation 

// card number (non-amex)
// visa 


 /**
    * @name onSelectCard
    * @function
    * 
    * @description choses the appropriate card upon selection
    * 
    * @return does not return anuything
    * 
    */
onSelectCard = () => {
  this.card().addEventListener('change', event => {
    this.initalizeCardVariables(event)
    this.selectCard(event)
    // console.log('amex number', this.amexNumber())
  })

}



 /**
    * @name onAguestHasPlacedAnOrder
    * @function
    * 
    * @description cleans up indexedDB store after a guess user places an order successfully
    * 
    * @return does not return anuything
    * 
    */
onAguestHasPlacedAnOrder(){
this.addEventListener('a-guest-has-placed-an-order', event => {

  const feedback = () => window.location.href = 'http://localhost:3000/feedback'
  const cleanup = () => {
    const orderStore = this.store('orders', 'readwrite')
    const cart = this.store('carts', 'readwrite')

    const cleanupCartRequest = cart.clear()
    cleanupCartRequest.onerror = event => {
      console.log('Error cleaning up cart store')
    }
    cleanupCartRequest.onsuccess = event => {
      console.log('Cart store cleaned up')
    }

    const cleanupOrderRequest = orderStore.clear()

    cleanupOrderRequest.onerror = event => {
      console.log('Error cleaning up order store')
    }
    cleanupOrderRequest.onsuccess = event => {
      console.log('Order store cleaned up')
    }
  }
  setTimeout(cleanup, 95)
  setTimeout(feedback, 100)

})
}
/**
    * @name onAuthHasPlacedAndOrder
    * @function
    * 
    * @description cleans up indexedDB store after an authenticated user places an order successfully
    * 
    * @return does not return anuything
    * 
    */
onAuthHasPlacedAndOrder(){
 this.addEventListener('auth-user-has-placed-an-order', event => {

    const feedback = () => window.location.href = 'http://localhost:3000/feedback'
    const cleanup = () => {
      const orderStore = this.store('orders', 'readwrite')
      const cart = this.store('carts', 'readwrite')

      const cleanupCartRequest = cart.clear()
      cleanupCartRequest.onerror = event => {
        console.log('Error cleaning up cart store')
      }
      cleanupCartRequest.onsuccess = event => {
        console.log('Cart store cleaned up')
      }

      const cleanupOrderRequest = orderStore.clear()

      cleanupOrderRequest.onerror = event => {
        console.log('Error cleaning up order store')
      }
      cleanupOrderRequest.onsuccess = event => {
        console.log('Order store cleaned up')
      }
    }
    setTimeout(cleanup, 95)
    setTimeout(feedback, 100)

  },{once: true})
}
/**
    * @name onPaymentFormSubmitted
    * @function
    * 
    * @description places the order when the payment form is submitted
    * 
    * @return does not return anuything
    * 
    */
onPaymentFormSubmitted(){
this.counter = 0
this.paymentForm().addEventListener('submit', async event => {
  event.preventDefault()
  // auth user
  const auth = await this.authUser()
  const orders = await this.authOrders()
  if(this.authCheck()){
    if (auth) {
      const order = {}
      const card = {
        number: this.selectedCartNumber.value,
        code: this.selectedCartCode.value,
        expiration: this.selectedExpiration.value,
        name: this.selectedNameOnCard.value,
        tosAgrement: this.selectedAgreement.value,
        type: this.selectedCard
      }
      const date = new Date();
      order.created_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
      order.updated_at = `${date.toDateString()} ${date.toLocaleTimeString()}`

      const cart = this.store('carts', 'readwrite')
      const request = cart.getAll()
      request.onerror = event => {
        console.log('ERROR')
      }
      request.onsuccess = event => {
        const data = event.target.result

        order.user = data[0].user
        order.card = card
        orders.forEach(datum => {
          datum.placed = true
        })
        order.cart = orders
        console.log('order', orders)
        console.log('data', data)
        this.onAuthPlacedOrder(order)
        .then(response => {
          // this.dispatchEvent(this.events('auth-user-has-placed-an-order'))
        
  
          window.location.reload()
        })
        .catch(error => console.log('error', error))
        this.dispatchEvent(this.events('auth-user-has-placed-an-order'))
         this.clearAuthCartChannel.postMessage(order)
      }

    }
  }else{
    //'api/orders/auth/order'
  this.counter += 1
  const orderStore = this.store('orders', 'readwrite')
  const cart = this.store('carts', 'readwrite')
  const order = {}

  const request = cart.getAll()
  request.onerror = event => {
    console.log('ERROR')
  }
  request.onsuccess = event => {
    const data = event.target.result
    // console.log(data)
    const card = {
      number: this.selectedCartNumber.value,
      code: this.selectedCartCode.value,
      expiration: this.selectedExpiration.value,
      name: this.selectedNameOnCard.value,
      tosAgrement: this.selectedAgreement.value,
      type: this.selectedCard
    }

    order.user = data[0].user
    order.card = card

    console.log('order', order)
    const orders = this.store('orders', 'readwrite')
    const ordersRequest = orders.getAll()

    ordersRequest.onerror = event => {
      console.log('ERROR GET ORDERS')
    }
    ordersRequest.onsuccess = event => {
      const orderData = event.target.result
      console.log('order data before', orderData)
      orderData.forEach(datum => {
        datum.placed = true
      })
      order.cart = orderData
      console.log('order.cart', order.cart)
      console.log('order', order)
      this.onGuestPlacedOrder(order)
        .then(response => {
          console.log(response)
          console.log('order', data)
        })
        .catch(console.error)

    }
  }
  this.dispatchEvent(this.events('a-guest-has-placed-an-order'))
  }
  

},{once: true})
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
customElements.define("feedback-element", FeedbackElement);
export default FeedbackElement
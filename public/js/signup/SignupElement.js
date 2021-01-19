'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module SignupElement
 * @kind class
 * 
 * @extends Validator
 * 
 * @requires Validator
 * 
 * @classdesc class for interating with user signup
 * 
 */
import Validator from '../common/Validator.js'

class SignupElement extends Validator {
    constructor() {
        super();
        // element created
    }

    setVariables(){
        this.phone = this.shadowRoot.getElementById('phone')
        this.firstname = this.shadowRoot.getElementById('firstname')
        this.lastname = this.shadowRoot.getElementById('lastname')
        this.username = this.shadowRoot.getElementById('username')
        this.nickname = this.shadowRoot.getElementById('nickname')
        this.password = this.shadowRoot.getElementById('password')
        this.passwordConfirmation = this.shadowRoot.getElementById('password-confirmation')
    }
    	/**
     * @name onRegistrationSuccessNotification
     * @function
     * 
     * @description sets registration success notifcation
     * 
     * @return does not return anything
     * 
     */
onRegistrationSuccessNotification(){
    setTimeout(this.showNotification, 1000)
   }
     /**
        * @name alternate
        * @function
        * 
        * @description alternates notification
        * 
        * @return does not return anything
        * 
        */
   alternate(){
       this.onRegistrationSuccessNotification()
       this.onClearRegistrationSuccessNotification()
   }
      /**
        * @name blinkNotification
        * @function
        * 
        * @description blink notifcation
        * 
        * @return does not return anything
        * 
        */
   // blinkNotification(){
   //  setInterval(this.showNotification, 1000)
   // }
   
   /**
        * @name hideNotification
        * @function
        * 
        * @description hide notification
        * 
        * @return does not return anything
        * 
        */
   // hideNotification(){
   //     const notification = this.shadowRoot.getElementById('notification')
   //     notification.innerHTML = notification.innerHTML
   // }
   /**
        * @name showNotification
        * @function
        * 
        * @description show notification
        * 
        * @return does not return anything
        * 
        */
   // showNotification(){
   //     const notification = this.shadowRoot.getElementById('notification')
   //     notification.innerHTML = `You have registered`
   //     notification.style.color = 'teal'
   //     notification.style.fontSize = '30px'
   //     notification.style.fontWeight = 'bold'
   //     setTimeout(this.hideNotification, 500)
   // }
   /**
        * @name onClearRegistrationSuccessNotification
        * @function
        * 
        * @description clears registration success notifcation
        * 
        * @return does not return anything
        * 
        */
   onClearRegistrationSuccessNotification(){
       setTimeout(this.hideNotification, 500)
   }
   
   /**
        * @name blinkNotification
        * @function
        * 
        * @description blink notifcation
        * 
        * @return does not return anything
        * 
        */
   blinkNotification = () =>{
   setInterval(this.showNotification, 2000)
   }
   /**
        * @name clearNotification
        * @function
        * 
        * @description clearns notifcation
        * 
        * @return does not return anything
        * 
        */
   // clearNotification(){
   // }
      /**
        * @name hideNotification
        * @function
        * 
        * @description hides notifcation
        * 
        * @return does not return anything
        * 
        */
   hideNotification = () =>{
          const notification = this.shadowRoot.getElementById('signup')
          notification.innerHTML = `<h4 style="text-align: center;" id="signup">You have registered!</h4>`
          notification.style.color = 'teal'
      }
   
   /**
        * @name showNotification
        * @function
        * 
        * @description shows notifcation
        * 
        * @return does not return anything
        * 
        */
   showNotification = () =>{
          const notification = this.shadowRoot.getElementById('signup')
       //    notification.innerHTML = `${success.registration}`
       notification.innerHTML = ` <h4 style="text-align: center;" id="signup">Congratulation!</h4>`
          notification.style.color = 'teal'
          setTimeout(this.hideNotification, 1000)
      }
    clearSpecialtyToppings(elementId) {
        while (this.formField(elementId).firstChild) {
          this.formField(elementId).removeChild(this.formField(elementId).firstChild)
        }
      }
    
      addSpecialtyToppings(toppings = [], elementId) {
        if (Array.isArray(toppings)) {
          if (this.formField(elementId).hasChildNodes()) {
            this.clearSpecialtyToppings(elementId)
            for (let topping of toppings) {
              let li = document.createElement('li')
              li.innerHTML = `${topping}`
              li.style.fontSize = '15px'
              this.formField(elementId).appendChild(li)
            }
          } else {
            for (let topping of toppings) {
              let li = document.createElement('li')
              li.innerHTML = `${topping}`
              li.style.fontSize = '15px'
              this.formField(elementId).appendChild(li)
            }
          }
    
        }
      }
       dailySpecialty() {
        let counter = 0
        setInterval(() => {
          let types = []
    
          for (let type in this.types) {
            types.push(type)
          }
          this.pizzas = types
    
    
          let pizzaName = this.types[`${types[counter]}`].name.toUpperCase()
          let pizzaImageName = this.types[`${types[counter]}`].name
          this.formField('specialty-name').innerHTML = `Pizza of the week: ${pizzaName}`
          let pizzaImage
          if (pizzaImageName === 'wês') {
            this.formField('image').src = `../../../../public/images/menu/wes.jpg`
            this.formField('image-link').setAttribute('href', 'pizza')
            pizzaImage = `../../../../public/images/menu/swes.jpg`
          } else {
            this.formField('image').src = `../../../../public/images/menu/${pizzaImageName}.jpg`
            this.formField('image-link').setAttribute('href', `pizza`)
            pizzaImage = `../../../../public/images/menu/s${pizzaImageName}.jpg`
          }
    
          // small price
          let smallPrice = this.types[`${types[counter]}`].sizes[0].price
          let reducedSmallPrice = parseFloat(smallPrice) - (0.75 * parseFloat(smallPrice))
          this.formField('small-reduced-price').innerHTML = `$${reducedSmallPrice.toFixed(2)}`
          this.formField('small-price').innerHTML = `$${smallPrice}`
    
          // medium price
          let mediumPrice = this.types[`${types[counter]}`].sizes[1].price
          let reducedmediumPrice = parseFloat(mediumPrice) - (0.75 * parseFloat(mediumPrice))
          this.formField('medium-reduced-price').innerHTML = `$${reducedmediumPrice.toFixed(2)}`
          this.formField('medium-price').innerHTML = `$${mediumPrice}`
    
          // large price
          let largePrice = this.types[`${types[counter]}`].sizes[2].price
          let reducedlargePrice = parseFloat(largePrice) - (0.75 * parseFloat(largePrice))
          this.formField('large-reduced-price').innerHTML = `$${reducedlargePrice.toFixed(2)}`
          this.formField('large-price').innerHTML = `$${largePrice}`
    
          // xlarge price
          let xlargePrice = this.types[`${types[counter]}`].sizes[3].price
          let reducedxlargePrice = parseFloat(xlargePrice) - (0.75 * parseFloat(xlargePrice))
          this.formField('xlarge-reduced-price').innerHTML = `$${reducedxlargePrice.toFixed(2)}`
          this.formField('xlarge-price').innerHTML = `$${xlargePrice}`
    
          let data = {
            type: this.types[`${types[counter]}`].name,
            name: `${this.types[`${types[counter]}`].name.toUpperCase()}, today's Specialty!`,
            image: pizzaImage,
            alt: this.types[`${types[counter]}`].name,
            details: this.pizzaInfoDetails(this.types[`${types[counter]}`].name)
          }
    
          data.toppings = {}
          data.toppings.toppings = this.types[`${types[counter]}`].toppings
          data.toppings.sizes = this.types[`${types[counter]}`].sizes
          data.toppings.reducedPrices = []
          let small = {
            size: 'small',
            price: reducedSmallPrice.toFixed(2)
          }
          let medium = {
            size: 'medium',
            price: reducedmediumPrice.toFixed(2)
          }
          let large = {
            size: 'large',
            price: reducedlargePrice.toFixed(2)
          }
          let xlarge = {
            size: 'xlarge',
            price: reducedxlargePrice.toFixed(2)
          }
          data.toppings.reducedPrices[0] = small
          data.toppings.reducedPrices[1] = medium
          data.toppings.reducedPrices[2] = large
          data.toppings.reducedPrices[3] = xlarge
          data.onSell = true
    
          window.localStorage.setItem('pizza', JSON.stringify(data))
          this.sendRouteDataChanel.postMessage(data)
    
          this.dispatchEvent(new CustomEvent('daily-specialty', {
            detail: this.types[`${types[counter]}`].toppings
          }))
    
          counter++
          if (counter === types.length) {
            counter = 0
          }
        }, 1000 * 60 * 60 * 24)
      }
    
      specialtyScheduler() {
        this.dailySpecialty()
        this.addEventListener('daily-specialty', event => {
          this.addSpecialtyToppings(event.detail, 'toppings')
        })
      }
      registrationHandler(){
        const register = this.shadowRoot.getElementById('registration_form')
        // console.log(register.firstname.value)
        register.addEventListener('submit', event => {
            event.preventDefault()
            const url = 'https://rawnodejs.com/api/users/add'
            const user = {
                firstname: register.firstname.value,
                lastname: register.lastname.value,
                username: register.username.value,
                email: register.email.value,
                phone: register.phone.value,
                password: register.password.value,
                password_confirmation: register.password_confirmation.value,
                nickname: register.nickname.value,
                tosAgreement: true
            }
   
    this.register(url, user)
            .then(response => {
                console.log('response[0]', response[0])
                const firstnameError = this.formField('firstname-error')
                const phoneError = this.formField('phone-error')
                const lastnameError = this.formField('lastname-error')
                const usernameError = this.formField('username-error')
                const emailError = this.formField('email-error')
                const passwordError = this.formField('password-error')
                const nicknameError = this.formField('nickname-error')
             if(response.errors){
                 for(let error of response.errors){
                  
                     if(error.firstname){
                         firstnameError.innerHTML = `${error.firstname}`
                         firstnameError.style.color = 'red'
                     }
                     if(error.phone){
                        phoneError.innerHTML = `${error.phone}`
                        phoneError.style.color = 'red'
                    }
                     if(error.lastname){
                        lastnameError.innerHTML = `${error.lastname}`
                        lastnameError.style.color = 'red'
                    }
                    if(error.username){
                        usernameError.innerHTML = `${error.username}`
                        usernameError.style.color = 'red'
                    }
                    if(error.email){
                        emailError.innerHTML = `${error.email}`
                        emailError.style.color = 'red'
                      
                    }
                    if(error.password){
                        passwordError.innerHTML = `${error.password}`
                        passwordError.style.color = 'red'
                      
                    }
                    if(error.nickname){
                        nicknameError.innerHTML = `${error.nickname}`
                        nicknameError.style.color = 'red'
                    }
                    return
                 }
             }
             if(response[0].registration){
                 console.log('response.success', response)
               // for( let success of response.successes){
                    //if(success.registration){
                        //window.location.reload()
                        this.blinkNotification()
                        firstnameError.innerHTML = ``
                        phoneError.innerHTML = ``
                        lastnameError.innerHTML = ``
                        usernameError.innerHTML = ``
                        emailError.innerHTML = ``
                        passwordError.innerHTML = ``
                        nicknameError.innerHTML = ``
                        register.firstname.value = ''
                        register.lastname.value = ''
                        register.username.value = ''
                        register.email.value = ''
                        register.phone.value = ''
                        register.password.value = ''
                        register.password_confirmation.value = ''
                        register.nickname.value = ''
                    //}
               // }
             }
            })
            .catch(console.log)
          
        })
      }

      init(){
        this.setVariables()
        this.specialtyScheduler() 
        this.validateSignupForm()
        this.validatePhone()
        this.registrationHandler()

        this.formField('exit').addEventListener('click', event =>{
            window.location.href = 'https://rawnodejs.com/menu'
        })
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
customElements.define("signup-element", SignupElement);

export default SignupElement
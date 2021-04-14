'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module LoginElement
 * @kind class
 * 
 * @extends Validator
 * 
 * @requires Validator
 * 
 * @classdesc ContactElement class for the account page
 * 
 */

import Validator from '../common/Validator.js'
class LoginElement extends Validator {
  constructor() {
    super();
    // element created
    this.dailyType = []
    this.weeklyType = []
  }
  /**
   * @name showFormPhoneError
   * @function
   * 
   * 
   * @description sets phone  field validation error messages
   * 
   * @return does not return anything
   * 
   */
  showFormPhoneError() {
    if (this.phone.validity.valueMissing) {
      this.phone.setCustomValidity('I am expecting a phone number, darling.');
    } else if (this.phone.validity.typeMismatch) {
      this.phone.setCustomValidity('phone number must numbers only');
    } else if (this.phone.validity.tooShort) {
      this.phone.setCustomValidity(`This is too short! Must at least ${this.phone.minLength} long.`)
    } else if (this.phone.validity.tooLong) {
      this.phone.setCustomValidity(`This is too Lon! Must not be more than ${this.phone.maxLength} long.`)
    } else if (this.phone.validity.patternMismatch) {
      this.phone.setCustomValidity('Please use correct formatting. Something like 801-634-998')
    } else if (this.phone.validity.badInput) {
      this.phone.setCustomValidity('This is just a wrong input for a phone number')
    }
  }

  //Password
  /**
   * @name showFormPasswordError
   * @function
   * 
   * 
   * @description sets password field validation error messages
   * 
   * @return does not return anything
   * 
   */
  showFormPasswordError() {
    if (this.password.validity.valueMissing) {
      this.password.setCustomValidity('I am expecting a password, darling.');
    } else if (this.password.validity.typeMismatch) {
      this.password.setCustomValidity('Password must be numbers, letters, dash, hyphens, and special characters only');
    } else if (this.password.validity.tooShort) {
      this.password.setCustomValidity(`This is too short! Must at least ${this.password.minLength} characters long.`)
    } else if (this.password.validity.tooLong) {
      this.password.setCustomValidity(`This is too Lon! Must not be more than ${this.password.maxLength} characters long.`)
    } else if (this.password.validity.patternMismatch) {
      this.password.setCustomValidity('Password must have at least one upper case letter, one lover case letter, a number, and a special character')
    } else if (this.password.validity.badInput) {
      this.password.setCustomValidity('This is just a wrong input for a password')
    }
  }
  loginFormValidation() {
    const loginForm = this.shadowRoot.getElementById('login_form')

    this.phone.addEventListener('change', event => {
      this.phone.setCustomValidity('')
      this.phone.checkValidity()
      this.phone.reportValidity()
    })

    this.phone.addEventListener('invalid', event => {
      if (!this.phone.validity.valid) {
        this.showFormPhoneError()
      }
    })
    this.phone.addEventListener('keyup', event => {
      if (this.phone.value.trim().length <= 8) {
        this.phone.value = this.phone.value.replace(/(\d{3})\-?/g, '$1-');
      } else {
        this.phone.value = this.phone.value.replace(/(\d{4})\-?/g, '$1');
      }
    })


    this.password.addEventListener('change', event => {
      this.password.setCustomValidity('')
      this.password.checkValidity()
      this.password.reportValidity()
    })

    this.password.addEventListener('invalid', event => {
      if (!this.password.validity.valid) {
        this.showFormPasswordError()
      }
    })
  }
  onSubmitLoginForm() {
    const loginForm = this.shadowRoot.getElementById('login_form')
    loginForm.addEventListener('submit', event => {

      //console.log(this.token)
      event.preventDefault()
      const inputPhone = loginForm.phone.value.trim().split('-').join('').trim()
      const loginData = {
        phone: inputPhone,
        password: loginForm.password.value
      }
      const url = 'https://wonderfulpizza.devoutprogrammer.com/api/tokens/add'
      this.login(url, loginData)
        .then(response => {
          console.log(response)
          if (response.errors) {
            if (response.errors.length > 0) {
              response.errors.forEach(error => {
                if (error.phone) {
                  this.phoneError.innerHTML = error.phone
                  this.phoneError.style.color = 'red'
                  this.phoneError.style.textAlign = 'center'
                }
                if (error.password) {
                  this.passwordError.innerHTML = error.password
                  this.passwordError.style.color = 'red'
                  this.passwordError.style.textAlign = 'center'
                }
                if (error.unknown) {
                  this.unknownError.innerHTML = error.unknown
                  this.unknownError.style.color = 'red'
                  this.unknownError.style.textAlign = 'center'
                }
              })
            }

            return
          } else if (response.sessions) {
            if (response.sessions.length > 0) {
              response.sessions.forEach(session => {
                if (session.error) {
                  this.unknownError.innerHTML = session.error
                  this.unknownError.style.color = 'red'
                  this.unknownError.style.textAlign = 'center'
                }
              })
            }
            return
          } else {
            const userHasLoggedIn = new CustomEvent('user-has-logged-in', {
              detail: response,
              bubbles: true,
              composed: true
            })
            window.localStorage.setItem('window number', JSON.stringify(response))
            //  window.sessionStorage.setItem('window number', JSON.stringify(response))
            window.dispatchEvent(userHasLoggedIn)
            window.location = '/dashboard'
          }

        })
        .catch(error => console.log('logged in failed', error))
    })

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

  weeklySpecialty() {
    let counter = 0
    setInterval(() => {
      let types = []

      for (let type in this.types) {
        types.push(type)
      }
      this.pizzas = types

      let pizzaName = this.types[`${types[counter]}`].name.toUpperCase()
      let pizzaImageName = this.types[`${types[counter]}`].name
      this.formField('left-specialty-name').innerHTML = `Pizza of the week: ${pizzaName}`
      let pizzaImage
      if (pizzaImageName === 'wês') {
        this.formField('left-image').src = `../../../../public/images/menu/wes.jpg`
        this.formField('left-image-link').setAttribute('href', 'pizza')
        pizzaImage = `../../../../public/images/menu/swes.jpg`
      } else {
        this.formField('left-image').src = `../../../../public/images/menu/${pizzaImageName}.jpg`
        this.formField('left-image-link').setAttribute('href', `pizza`)
        pizzaImage = `../../../../public/images/menu/s${pizzaImageName}.jpg`
      }


      // small price
      let smallPrice = this.types[`${types[counter]}`].sizes[0].price
      let reducedSmallPrice = parseFloat(smallPrice) - (0.50 * parseFloat(smallPrice))
      // console.log(smallPrice, reducedSmallPrice.toFixed(2))
      this.formField('left-small-reduced-price').innerHTML = `$${reducedSmallPrice.toFixed(2)}`
      this.formField('left-small-price').innerHTML = `$${smallPrice}`

      // medium price
      let mediumPrice = this.types[`${types[counter]}`].sizes[1].price
      let reducedmediumPrice = parseFloat(mediumPrice) - (0.50 * parseFloat(mediumPrice))
      // console.log(mediumPrice, reducedmediumPrice.toFixed(2))
      this.formField('left-medium-reduced-price').innerHTML = `$${reducedmediumPrice.toFixed(2)}`
      this.formField('left-medium-price').innerHTML = `$${mediumPrice}`

      // large price
      let largePrice = this.types[`${types[counter]}`].sizes[2].price
      let reducedlargePrice = parseFloat(largePrice) - (0.50 * parseFloat(largePrice))
      // console.log(largePrice, reducedlargePrice.toFixed(2))
      this.formField('left-large-reduced-price').innerHTML = `$${reducedlargePrice.toFixed(2)}`
      this.formField('left-large-price').innerHTML = `$${largePrice}`

      // xlarge price
      let xlargePrice = this.types[`${types[counter]}`].sizes[3].price
      let reducedxlargePrice = parseFloat(xlargePrice) - (0.50 * parseFloat(xlargePrice))
      // console.log(xlargePrice, reducedxlargePrice.toFixed(2))
      this.formField('left-xlarge-reduced-price').innerHTML = `$${reducedxlargePrice.toFixed(2)}`
      this.formField('left-xlarge-price').innerHTML = `$${xlargePrice}`

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

      this.dispatchEvent(new CustomEvent('weekly-specialty', {
        detail: this.types[`${types[counter]}`].toppings
      }))

      counter++
      if (counter === types.length) {
        counter = 0
      }
    }, 1000 * 60 * 60 * 24 * 7)
  }
  //    }, 1000 * 60 * 60 * 24)
  //}
  onAddDailyItemToCart(type){
    this.addBtn = this.formField('add-btn')
    this.addForm = this.formField('options-form')
    this.addForm.style.display = 'none'
    this.doneBtn = this.formField('done')
    this.ads = this.formField('off-reduced-price')
    this.ads.style.display =  'block'
    this.addBtn.style.display = 'block'
    this.quantity = this.formField('quantity')
    this.size = this.formField('size')
    console.log(this.dailyType)
   
  
    this.addBtn.addEventListener('click', event => {
       this.addForm.style.display = 'flex'
       this.addBtn.style.display = 'none'
       this.doneBtn.style.display = 'block'
       this.ads.style.display = 'none'
    })
    this.doneBtn.addEventListener('click', event => {
        this.addForm.style.display = 'none'
        this.doneBtn.style.display = 'none'
        this.addBtn.style.display = 'flex'
        this.ads.style.display = 'flex'
        
     })
     this.addForm.addEventListener('submit',event =>{
       event.preventDefault()
       if(this.quantity.value === '') return
       const store = this.store('orders', 'readwrite')
   
       const data = {
                type: type.name,
                size: this.size.value,
                quantity: parseInt(this.quantity.value),
                placed: false,
                onSell: true, 
                specialty: 'daily'
            }
            //types = []
       if (this.authCheck()) {
           this.addToAuthCart(data)
           
       } else {
           // this.addToGuestCart(data)
           // Using indexedDB
           const order = this.select(data.type, data.size, data.quantity, false)
           const request = store.add(order)
           request.onerror = event => {
               console.log('Error adding')
           }
           request.onsuccess = event => {
               const justAdded = store.get(event.target.result)
               justAdded.onerror = event => {
                   console.log('Error fetching just added')
               }
               justAdded.onsuccess = event => {
                   const types = this.storage().types
                   this.addCartChannel.postMessage({
                       order,
                       types
                   }, {
                       once: true
                   })
               }
           }

       }
     })
}
  dailySpecialty() {
    let counter = 0
    // const leftName = this.formField('left-specialty-name')
    setInterval(() => {
      let types = []

      for (let type in this.types) {
        types.push(type)
      }
      this.pizzas = types


      // console.log(types[counter])
      let pizzaName = this.types[`${types[counter]}`].name.toUpperCase()
      let pizzaImageName = this.types[`${types[counter]}`].name
      this.formField('right-specialty-name').innerHTML = `Pizza of the week: ${pizzaName}`
      let pizzaImage
      if (pizzaImageName === 'wês') {
        this.formField('right-image').src = `../../../../public/images/menu/wes.jpg`
        this.formField('right-image-link').setAttribute('href', 'pizza')
        pizzaImage = `../../../../public/images/menu/swes.jpg`
      } else {
        this.formField('right-image').src = `../../../../public/images/menu/${pizzaImageName}.jpg`
        this.formField('right-image-link').setAttribute('href', `pizza`)
        pizzaImage = `../../../../public/images/menu/s${pizzaImageName}.jpg`
      }


      // small price
      let smallPrice = this.types[`${types[counter]}`].sizes[0].price
      let reducedSmallPrice = parseFloat(smallPrice) - (0.75 * parseFloat(smallPrice))
      // console.log(smallPrice, reducedSmallPrice.toFixed(2))
      this.formField('right-small-reduced-price').innerHTML = `$${reducedSmallPrice.toFixed(2)}`
      this.formField('right-small-price').innerHTML = `$${smallPrice}`

      // medium price
      let mediumPrice = this.types[`${types[counter]}`].sizes[1].price
      let reducedmediumPrice = parseFloat(mediumPrice) - (0.75 * parseFloat(mediumPrice))
      // console.log(mediumPrice, reducedmediumPrice.toFixed(2))
      this.formField('right-medium-reduced-price').innerHTML = `$${reducedmediumPrice.toFixed(2)}`
      this.formField('right-medium-price').innerHTML = `$${mediumPrice}`

      // large price
      let largePrice = this.types[`${types[counter]}`].sizes[2].price
      let reducedlargePrice = parseFloat(largePrice) - (0.75 * parseFloat(largePrice))
      // console.log(largePrice, reducedlargePrice.toFixed(2))
      this.formField('right-large-reduced-price').innerHTML = `$${reducedlargePrice.toFixed(2)}`
      this.formField('right-large-price').innerHTML = `$${largePrice}`

      // xlarge price
      let xlargePrice = this.types[`${types[counter]}`].sizes[3].price
      let reducedxlargePrice = parseFloat(xlargePrice) - (0.75 * parseFloat(xlargePrice))
      // console.log(xlargePrice, reducedxlargePrice.toFixed(2))
      this.formField('right-xlarge-reduced-price').innerHTML = `$${reducedxlargePrice.toFixed(2)}`
      this.formField('right-xlarge-price').innerHTML = `$${xlargePrice}`

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
        detail: {data: this.types[`${types[counter]}`].toppings, other: this.types[`${types[counter]}`]}
      }))
      this.dailyType = this.types[`${types[counter]}`].name

      counter++
      if (counter === types.length) {
        counter = 0
      }

      
    }, 5000 )
  }

  specialtyScheduler() {
    this.weeklySpecialty()
    this.dailySpecialty()

    this.addEventListener('daily-specialty', event => {
      this.addSpecialtyToppings(event.detail.data, 'right-toppings')
      // this.onAddDailyItemToCart(event.detail.other)
    })
    this.addEventListener('weekly-specialty', event => {
      this.addSpecialtyToppings(event.detail.data, 'left-toppings')
    })
  }
  loginHandler() {
    this.loginFormValidation()
    this.onSubmitLoginForm()

    window.addEventListener('user-has-logged-in', event => {
      console.log('user-has-logged-in event from login.js', event)
    })
    this.formField('exit').addEventListener('click', event => {
      window.location.href = 'https://wonderfulpizza.devoutprogrammer.com/menu'
    })
  }
  setVariables() {
    this.phone = this.shadowRoot.getElementById('phone')
    this.password = this.shadowRoot.getElementById('password')
    this.phoneError = this.shadowRoot.getElementById('phone-error')
    this.passwordError = this.shadowRoot.getElementById('password-error')
    this.unknownError = this.shadowRoot.getElementById('unknown-error')
  }

  init() {
    this.setVariables()
    this.specialtyScheduler()
    this.loginHandler()
    this.onAddDailyItemToCart(this.dailyType)
  
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
   * @description browser calls this method when the element is removed or disconnect  from the document or DOM
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
customElements.define("login-element", LoginElement);

export default LoginElement

'use strict'
import Common from '../Common.js'
class NavbarElement extends Common {
  constructor() {
    super();
    this.autobind(NavbarElement)
    // element created
    this.orders = []

    // Creates or opens the application indexeDB database (the front end database)
    this.createDatabase('Wonderfull Pizza', 1, this.dbInitiatioinOptions())
  }
  isUserLoggedIn() {
    if (this.authCheck()) {
        this.authUser()
            .then(auth => {
              const placeOrder = this.shadowRoot.getElementById('place-order')
              const parsedURL = new URL(this.baseURI)
              const path = parsedURL.pathname
                const user = this.shadowRoot.querySelector('a.user')
                // const dashboard = this.shadowRoot.querySelector('a.dashboard')
                const dashboard = this.shadowRoot.getElementById('dashboard')
                const shipping = this.shadowRoot.querySelector('a.shipping')
                const billing = this.shadowRoot.querySelector('a.billing')
                const login = this.shadowRoot.querySelector('a.login')
                const logout = this.shadowRoot.querySelector('a.logout')
                const signup = this.shadowRoot.querySelector('a.signup')
                const payment = this.shadowRoot.querySelector('a.payment')
                user.innerHTML = `${auth.firstname} ${auth.lastname}`
                user.style.color = 'teal'
                user.style.display = 'inline'
                if(path !== '/cart' && path !=='/shipping' && path !== '/payment' && path !=='/review' && path !=='/feedback'){
                  logout.style.display = 'inline'
                  logout.style.color = 'red'
                  login.style.display = 'none'
                  signup.style.display = 'none'
                  dashboard.style.display = 'inline'
                  payment.style.display = 'none'
                }
            })
    } else {
        this.showCartDetails()
    }
}
logout() {
    if (!this.authCheck()) {
        return
    }
    const logoutLink = this.shadowRoot.querySelector('a.logout')
    logoutLink.addEventListener('click', event => {
        window.localStorage.removeItem('window number')
    })
    this.hideCartDetails()
}
hideCartDetails() {
  // icon.style.display = "none"
  this.cart.style.display = "none"
  this.badge.style.display = "none"
  this.price.style.display = "none"
  this.equal.style.display = "none"

}
showCartDetails() {
  // icon.style.display = "block"
  this.cart.style.display = "block"
  this.badge.style.display = "block"
  this.price.style.display = "block"
  this.equal.style.display = "block"

}


navbarItems(display) {
  const navbarItems = this.shadowRoot.querySelectorAll('a.about, a.order, a.contact, a.home, a.signup, a.login, a.dash, a.logout')
  navbarItems.forEach(item => item.style.display = display)
}
showHideNavbarItems(display1, display2) {
  if (this.authCheck()) {
      this.isLoggedInnavbarItems(display1)
  } else {
      this.navbarItems(display2)
  }
}
isLoggedInnavbarItems(display) {
  const navbarItems = this.shadowRoot.querySelectorAll('a.about, a.order, a.contact, a.home, a.signup, a.login, a.logout, a.dashboard')
  navbarItems.forEach(item => item.style.display = display)
}

paymentProcess() {
  const placeOrder = this.shadowRoot.getElementById('place-order')
  const parsedURL = new URL(this.baseURI)
  const path = parsedURL.pathname

  if (path === '/cart') {
      this.navbarItems('none')
      placeOrder.style.display = 'inline-block'
  }
  if (path === '/shipping') {
      this.navbarItems('none')
      // placeOrder.innerHTML = `PAYMENT METHOD NEXT `
      placeOrder.innerHTML = `ORDER REVIEW NEXT `
      placeOrder.style.display = 'inline-block'
      
      // placeOrder.setAttribute('href', 'https://rawnodejs.com/review')
      

  }
  if (path === '/payment') {
      this.navbarItems('none')
      // placeOrder.innerHTML = `ORDER REVIEW NEXT `
      placeOrder.innerHTML = `PAY AMOUNT`
      placeOrder.style.display = 'inline-block'
      placeOrder.setAttribute('href', 'https://rawnodejs.com/feedback')
     
  }
  if (path === '/review') {
      this.navbarItems('none')
      placeOrder.innerHTML = `PAYMENT METHOD NEXT`
      placeOrder.style.display = 'inline-block'
      placeOrder.setAttribute('href', 'https://rawnodejs.com/payment')
  }
  if (path === '/feedback') {
      this.navbarItems('none')
      placeOrder.innerHTML = `ORDER SUCESSFULLY COMPLETED!`
      placeOrder.style.display = 'inline-block'
      placeOrder.style.color = 'teal'
      placeOrder.setAttribute('href', 'https://rawnodejs.com/menu')
  }

}
async realTimeSubtotal() {
  if (this.authCheck()) {
      await this.authOrders()
          .then(data => {
              if (data && data.length > 0) {
                  this.showCartDetails()
                  // console.log(data)
                  this.badge.innerHTML = data.length
                  // console.log('data length', data.length)
                  const subtotal = data
                  .map(datum => parseFloat(parseFloat(datum.pricing.subtotal
                  .slice(1, datum.pricing.subtotal.length))))
                  .reduce((x, y) => x + y, 0)
                  .toFixed(2)
                  this.price.innerHTML = `\$${subtotal}`
                  // console.log('subtotal', subtotal)
              } else {
                  this.hideCartDetails()
              }
          })
          .catch(error => console.log('no order found', error))
  }
}
onGuestLoadCartItems() {
 window.addEventListener('load', event => {
      try{
        const store = this.store('orders', 'readwrite')
        
        const request = store.getAll()
        request.onerror = event => {
            console.log('could not get orders')
        }
        request.onsuccess = event => {
            const data = request.result
            if (data && data.length > 0) {
                this.showCartDetails()
                this.badge.innerHTML = data.length
                const subtotal = data.map(datum => parseFloat(parseFloat(datum.pricing.subtotal
                    .slice(1, datum.pricing.subtotal.length)))).reduce((x, y) => x + y, 0).toFixed(2)
                this.price.innerHTML = `\$${subtotal}`
            } else {
                this.hideCartDetails()
            }
  
        }
      }catch(error){
      
        const store = this.store('orders', 'readwrite')
        const request = store.getAll()
        request.onerror = event => {
            console.log('could not get orders')
        }
        request.onsuccess = event => {
            const data = request.result
            if (data && data.length > 0) {
                this.showCartDetails()
                this.badge.innerHTML = data.length
                const subtotal = data.map(datum => parseFloat(parseFloat(datum.pricing.subtotal
                    .slice(1, datum.pricing.subtotal.length)))).reduce((x, y) => x + y, 0).toFixed(2)
                this.price.innerHTML = `\$${subtotal}`
            } else {
                this.hideCartDetails()
            }
  
        }
        window.location.reload()
      }
  
  })

}
onAuthAddItemToCart() {
  return  this.addCartChannel.onmessage = events => {
    console.log('events', events)
       const store = this.store('orders', 'readwrite')
       const request = store.getAll()
       request.onerror = event => {
           console.log('could not get orders')
       }
       request.onsuccess = event => {
           const data = request.result
           const posted = events.data.order
           if (data.length === 1) {
               this.showCartDetails()
           }
           if (posted && posted.pricing && data && data.length > 0) {
               if (data.length !== 1) {
                   data.pop()
                   data.push(posted)
               }
               this.showCartDetails()
               this.badge.innerHTML = data.length
               const subtotal = data.map(datum => parseFloat(parseFloat(datum.pricing.subtotal
                   .slice(1, datum.pricing.subtotal.length)))).reduce((x, y) => x + y, 0).toFixed(2)
               this.price.innerHTML = `\$${subtotal}`
           } else {
               this.hideCartDetails()
           }
 
       }
   
   }
 }
onGuestAddItemToCart() {
 return  this.addCartChannel.onmessage = events => {
      const store = this.store('orders', 'readwrite')
      const request = store.getAll()
      request.onerror = event => {
          console.log('could not get orders')
      }
      request.onsuccess = event => {
          const data = request.result
          const posted = events.data.order
          if (data.length === 1) {
              this.showCartDetails()
          }
          if (posted && posted.pricing && data && data.length > 0) {
              if (data.length !== 1) {
                  data.pop()
                  data.push(posted)
              }
              this.showCartDetails()
              this.badge.innerHTML = data.length
              const subtotal = data.map(datum => parseFloat(parseFloat(datum.pricing.subtotal
                  .slice(1, datum.pricing.subtotal.length)))).reduce((x, y) => x + y, 0).toFixed(2)
              this.price.innerHTML = `\$${subtotal}`
          } else {
              this.hideCartDetails()
          }

      }
  
  }
}
onGuestUpdateCartItem() {
  return this.updateCartChannel.onmessage = events => {

      const store = this.store('orders', 'readwrite')
      const request = store.getAll()
      request.onerror = event => {
          console.log('could not get orders')
      }
      request.onsuccess = event => {
          const data = request.result
          if (data.length === 1) {
              this.showCartDetails()
          }
          this.showCartDetails()
          this.badge.innerHTML = data.length
          const subtotal = data.map(datum => parseFloat(parseFloat(datum.pricing.subtotal
              .slice(1, datum.pricing.subtotal.length)))).reduce((x, y) => x + y, 0).toFixed(2)
          this.price.innerHTML = `\$${subtotal}`
      }

  }
}
onGuestRemoveCartItem() {
 return this.removeCartChannel.onmessage = events => {
      const store = this.store('orders', 'readwrite')
      const request = store.getAll()
      request.onerror = event => {
          console.log('could not get orders')
      }
      request.onsuccess = event => {
          const data = request.result

          if (data.length === 1) {
              this.showCartDetails()
          }
          this.showCartDetails()
          this.badge.innerHTML = data.length
          const subtotal = data.map(datum => parseFloat(parseFloat(datum.pricing.subtotal
              .slice(1, datum.pricing.subtotal.length)))).reduce((x, y) => x + y, 0).toFixed(2)
          this.price.innerHTML = `\$${subtotal}`
          if(data.length === 0){
            this.hideCartDetails()
          }
      }

    
  }
}
formatSubtotal(datum = {}) {
  return parseFloat(parseFloat(datum.products[0].pricing.subtotal
      .slice(1, datum.products[0].pricing.subtotal.length)))
}

subtotal(prices = []) {
  return prices.reduce((x, y) => x + y, 0).toFixed(2)
}

calculate = (price, units) => {
  const total = parseFloat(price) * parseInt(units)
  return total.toFixed(2)
}

 formatPrice(price) {
  let finalString;
  if (price.length > 5) {
      const str = price.slice(-price.length, -3)
      if (str.length > 3) {
          const thousands = str.slice(-str, -3)
          const decimal = price.slice(4, price.length)
          const hundreds = str.slice(-str, -1)
          finalString = thousands.concat(',', hundreds, decimal)
      } else {
          finalString = price
      }
  } else {
      finalString = price

  }
  return finalString
}

    attrRemover(element, attr, value){
      if(element.getAttribute(attr) === value){
          element.removeAttribute(attr)
      }
  }
  attAdder(element, attr, value){
      element.setAttribute(attr, value)
  }
  navigation() {
      const home = this.shadowRoot.querySelector('a#home')
      const about = this.shadowRoot.querySelector('a#about')
      const menu = this.shadowRoot.querySelector('a#menu')
      const contact = this.shadowRoot.querySelector('a#contact')
      const signup = this.shadowRoot.querySelector('a#signup')
      const login = this.shadowRoot.querySelector('a#login')
      const cart = this.shadowRoot.querySelector('a#place-order')
      const user = this.shadowRoot.querySelector('a#user')
      const dashboard = this.shadowRoot.querySelector('a#dashboard')

      const parsedURL = new URL(this.baseURI)
      const path = parsedURL.pathname
      if (path === '/') {
          home.setAttribute('class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/dashboard' || path === '/order') {
        dashboard.setAttribute('class', 'active')
        this.attrRemover(home, 'class', 'active')
        this.attrRemover(about, 'class', 'active')
        this.attrRemover(menu, 'class', 'active')
        this.attrRemover(contact, 'class', 'active')
        this.attrRemover(signup, 'class', 'active')
    }
      if (path === '/about') {
          about.setAttribute('class', 'active')
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/menu') {
          menu.setAttribute('class', 'active')
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/contact') {
          contact.setAttribute('class', 'active')
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/signup') {
          signup.setAttribute('class', 'right active')
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/login') {
          login.setAttribute('class', 'right active')
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/cart') {
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(login, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/shipping') {
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(login, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/review') {
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(login, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/payment') {
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(login, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/feedback') {
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(login, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')
      }
      if (path === '/pizza') {
          this.attrRemover(home, 'class', 'active')
          this.attrRemover(menu, 'class', 'active')
          this.attrRemover(contact, 'class', 'active')
          this.attrRemover(about, 'class', 'active')
          this.attrRemover(signup, 'class', 'active')
          this.attrRemover(login, 'class', 'active')
          this.attrRemover(dashboard, 'class', 'active')

      }
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
customElements.define("navbar-element", NavbarElement);

export default NavbarElement
'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module DashboardElement
 * @kind class
 * 
 * @extends PizzaElement
 * 
 * @requires PizzaElement
 * 
 * @classdesc ContactElement class for the account page
 * 
 */

import PizzaElement from '../menu/pizza/PizzaElement.js'

class DashboardElement extends PizzaElement {
    constructor() {
        super();
        // element created
        this.dashboardTypes = []
    }

   /**
   * @name pizzaAboutInit
   * @function
   * 
   * @description Initiates and builds all attributes for the pizza object of the about page 
   * 
   * @return does not return anything
   * 
   */
    pizzaAboutInit(typePizza) {
        if (typeof typePizza !== 'string' || !typePizza.trim().length || typePizza.trim().length === 0) return
        const pizzaType = typePizza.trim().toLowerCase()
        const image = this.formField('image')
        const moreBtn = this.formField('read-more')
        const link = this.formField('link')
        const type = this.formField('title')
        const price = this.formField('prices')
        const description = this.formField('description')
   
        type.innerHTML = `${this.getAttribute('name')}`

        if (this.getAttribute('name').toLowerCase().trim() === `${pizzaType}`) {

            const topping = this.types[`${pizzaType}`]
            const priceRange = `${this[`${pizzaType}PriceRange`]}`

           this.addAboutPizzaToppings(topping.toppings)
            price.innerHTML = `${priceRange}`
            description.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing ... '
            type.setAttribute('type', `${pizzaType}`)
            type.setAttribute('name', `${pizzaType}`)
            image.setAttribute('alt', `${pizzaType}`)
            link.setAttribute('href', 'order')
            
            if (pizzaType === 'wês') {
                image.setAttribute('src', `../../../../public/images/menu/wes.jpg`)
            } else {
                image.setAttribute('src', `../../../../public/images/menu/${pizzaType}.jpg`)
            }
            let pizzaImage
            if (pizzaType === 'wês') {
                pizzaImage = `../../../../public/images/menu/swes.jpg`
            } else {
                pizzaImage = `../../../../public/images/menu/s${pizzaType}.jpg`
            }
            moreBtn.addEventListener('click', event => {
                const data = {
                    type: `${pizzaType}`,
                    name: `${pizzaType}`.toLocaleLowerCase(),
                    image: pizzaImage,
                    alt: image.getAttribute('alt'),
                    toppings: topping,
                    details: this.pizzaInfoDetails(`${pizzaType}`, this.dashboardTypes)
                }
               
                window.localStorage.setItem('pizza', JSON.stringify(data))
                this.sendRouteDataChanel.postMessage(data)
            })

        }
    }
    
 /**
   * @name onDashboardElementNaming
   * @function
   * 
   * @description Add attributes, initiates, and set the pizza object of the about page
   * 
   * @return does not return anything
   * 
   */
    onDashboardElementNaming() {
        if (!Array.isArray(this.dashboardTypes) || !this.dashboardTypes.length || this.dashboardTypes.length === 0) return
        this.prices()
        this.priceRanges()

        this.addAboutPizzaToppings = this.callFirstOnlyNTimes(this.addToppings)
        this.dashboardTypes.forEach(pizza => {
            this.pizzaAboutInit(pizza)
        })
    }
    init(){

     const initial = window.document.getElementById('initial')
     initial.style.display = 'none'

    window.addEventListener('load',async event =>{
      // window.localStorage.setItem('orders', JSON.stringify(orders[0]))
      const orders = await this.orders()
      if(!orders || orders.length === 0){
         const div = document.createElement('div')
         div.innerHTML =`<h1 style="color: red; text-align: center;">You have no orders</h1>`
         document.body.appendChild(div)
      }else{
        //document.body.removeChild(div)
        for(let order of orders){
          //  console.log(order.products)
           const userdashboard = document.createElement('user-dashboard')
           userdashboard.setAttribute('order', `order`)
           const title = userdashboard.shadowRoot.querySelector('#title')
           title.innerHTML = `${order.number}`
           const price = userdashboard.shadowRoot.querySelector('#prices')
           price.innerHTML = `${order.price}`
           const description = userdashboard.shadowRoot.querySelector('#description')
           description.innerHTML = `${order.created_at}`
           const items = userdashboard.shadowRoot.querySelector('#items')
           items.innerHTML = `${order.products.length} items in this order`
           // <img src="https://placehold.it/350x200 " alt="Jane " style="width:100%" id="image">
           const image = userdashboard.shadowRoot.querySelector('#image')
           image.src=`../../public/images/menu/${order.products[0].name}.jpg`
           image.alt=`${order.products[0].name}`
           const moreBtn = userdashboard.shadowRoot.querySelector('#read-more') 
           const link = userdashboard.shadowRoot.querySelector('#link') 
           link.setAttribute('href', 'order')
           for(let product of order.products){
          product.toppings = this.types[product.name].toppings
          let image
          if (product.name=== 'wês') {
              image = `../../../../public/images/menu/wes.jpg`
              product.image = image
          } else {
              image = `../../../../public/images/menu/${product.name}.jpg`
              product.image = image
          }
           }
           moreBtn.addEventListener('click', event => {
            const data = {
                products: order.products
            }
           
            window.localStorage.setItem('products', JSON.stringify(data))
            // this.sendRouteDataChanel.postMessage(data)
        })
           window.document.body.appendChild(userdashboard)
         }
      }
   
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
customElements.define("dashboard-element", DashboardElement);
export default DashboardElement
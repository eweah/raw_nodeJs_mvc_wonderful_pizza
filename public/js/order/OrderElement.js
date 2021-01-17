'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module OrderElement
 * @kind class
 * 
 * @extends PizzaElement
 * 
 * @requires PizzaElement
 * 
 * @classdesc OrderElement class for the order page
 * 
 **/

import PizzaElement from '../menu/pizza/PizzaElement.js'
class OrderElement extends PizzaElement {
    constructor() {
        super();
        // element created
        this.orderTypes = []
        this.autobind(OrderElement)
    }

    /**
    * @name setNewUserOrderElementAttribute
    * @function
    * 
    * @description sets new user-order element attribute
    * 
    * @param {object} order user's order
    * @param {HTMLElement} choice the chosen child element
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
    setNewUserOrderElementAttribute(order, choice){
        const types = this.types[`${order.name}`]
        for (let child of choice.children) {
            child.setAttribute('type', `${order.name}`)
            child.setAttribute('name', `${order.name.toUpperCase()}`)
            if (child.getAttribute('value') === 'small') {
                child.setAttribute('price', `${types.sizes[0].price}`)
            }
            if (child.getAttribute('value') === 'medium') {
                child.setAttribute('price', `${types.sizes[1].price}`)
            }
            if (child.getAttribute('value') === 'large') {
                child.setAttribute('price', `${types.sizes[2].price}`)
            }
            if (child.getAttribute('value') === 'xlarge') {
                child.setAttribute('price', `${types.sizes[3].price}`)
            }
        }
    }
    
     /**
    * @name addToppings
    * @function
    * 
    * @description add topping to pizza elements
    * 
    * @param {object} order user's order
    * 
    * @return does not return anything
    * 
    */
    addToppings(order){
        const toppings = this.userorder.shadowRoot.getElementById('toppings')
        order.toppings.forEach(topping => {
            let li = document.createElement('li')
            li.innerHTML =  `${topping}`
            toppings.appendChild(li)
        })
    }

    /**
    * @name setNewUserOrderElementInnertHTMLProperties
    * @function
    * 
    * @description sets new user-order element InnerHTML properties
    * 
    * @param {object} order user's order
    * 
    * @return does not return anyting
    * 
    */

    setNewUserOrderElementInnertHTMLProperties(order){
        this.newElquantity.innerHTML = `${order.pricing.quantity}`
        this.newElsize.innerHTML = `${order.size}`
        this.newEltype.innerHTML = `${order.name}`
        this.newEltype.setAttribute('type', `${order.name}`)
        this.newElprice.innerHTML = `${order.pricing.total}`
        this.productId.setAttribute('value', `${order.id}`)
    }

    /**
    * @name addNewUserOrderToDOM
    * @function
    * 
    * @description sets new user-order element to the DOM
    * 
    * @return does not return anyting
    * 
    */
    addNewUserOrderToDOM(){
        document.body.appendChild(this.userorder)
    }
     /**
    * @name createNewUserOrderElement
    * @function
    * 
    * @description creates new user order element
    * 
    * @param {object} order user's order
    * 
    * @return does not return anyting
    * 
    */
    createNewUserOrderElement(order){
        this.userorder = document.createElement('user-order')
        const responsive = this.userorder.shadowRoot.querySelector('.responsive')
        responsive.style.display = 'block'
        this.productId = this.userorder.shadowRoot.querySelector('#productId')
        this.newElquantity = this.userorder.shadowRoot.querySelector('.newElquantity')
        this.newElsize = this.userorder.shadowRoot.querySelector('.newElsize')
        this.newEltype = this.userorder.shadowRoot.querySelector('.newEltype')
        this.newElprice = this.userorder.shadowRoot.querySelector('.newElprice')
        this.choice = this.userorder.shadowRoot.getElementById('size')
        const image = this.userorder.shadowRoot.getElementById('image')
        const imageLink = this.userorder.shadowRoot.getElementById('image-link')
        imageLink.setAttribute('href', 'pizza')
        image.src=`${order.image}`
        image.setAttribute('alt', order.name)
    }

    /**
    * @name createANewUserOrderElementAndAppend
    * @function
    * 
    * @description creates new user order element and appends
    * 
    * @param {object} order user's order
    * 
    * @return does not return anyting
    * 
    */
    createANewUserOrderElementAndAppend(order){
        this.createNewUserOrderElement(order)
        this.setNewUserOrderElementAttribute(order, this.choice)
        this.setNewUserOrderElementInnertHTMLProperties(order)
        this.addToppings(order)
        this.addNewUserOrderToDOM()
    }

     /**
    * @name createNewUserOrderElements
    * @function
    * 
    * @description creates new user order element
    * 
    * @param {Array} products orders array
    * 
    * @return does not return anyting
    * 
    */
    createNewUserOrderElements(products = []){
        if(!Array.isArray(products) || !products.length || products.length === 0) return 
        products.forEach(order => {
            this.createANewUserOrderElementAndAppend(order)
        })
    }

     /**
    * @name getOrderProducts
    * @function
    * 
    * @description gets order products
    * 
    * @return does not return anyting
    * 
    */
    getOrderProducts(){
        const order = JSON.parse(window.localStorage.getItem('products'))
        if(order === null) return 
        if(!order.products) return 
        if(!order.products.length) return 
        return order.products
    }

     /**
    * @name onLoadAuthCartData
    * @function
    * 
    * @description create authenticated cart data upon window load
    * 
    * 
    * @return does not return anyting
    * 
    */
    onLoadAuthCartData() {
        this.setAuthCartData()
        window.addEventListener('load', event => {
            this.createNewUserOrderElements(this.getOrderProducts())
            return 
        }, {
            once: true
        })
    }
    // async init() {
    //     const auth = await this.authUser()
    //     const orders = await this.authOrders()
    //     if (auth && auth !== null && orders && orders.length) {
    //         orders.forEach(order => {
    //             this.createNewUserOrderElement(order)
    //             this.setNewUserOrderElementAttribute(order, this.choice)
    //             this.setNewUserOrderElementInnertHTMLProperties(order)
    //             this.addNewUserOrderToDOM()
        
    //         })
    //     }
    // }
    // async onAuth() {
    //     window.addEventListener('DOMContentLoaded', async event => {
    //         await this.init()
    //     })
    // }
    
     /**
    * @name setOrderItem
    * @function
    * 
    * @description set order item
    * 
    * @param {Object} data order item
    * 
    * @return does not return anyting
    * 
    */
setOrderItem(data){
    for (let datum of data) {
        const order = {}
        order.phone = datum.user.phone
        order.pricing = datum.pricing
        order.name = datum.name
        order.size = datum.size
        order.toppings = datum.toppings
        order.placed = datum.placed
        order.created_at = datum.created_at
        order.updated_at = datum.updated_at
        order.id = datum.id
        order.user = datum.user
        this.offlineOrders.push(order)
    }
}
/**
    * @name setAuthCartData
    * @function
    * 
    * @description sets authenticated cart data
    * 
    * @return does not return anyting
    * 
    */
    setAuthCartData() {
        this.authOrders()
            .then(data => {
                this.setOrderItem(data)
            })
            .catch(error => {
                console.log('no order found')
                // this.showCartDetails()
            })
    }
    /**
    * @name cartItemDetails
    * @function
    * 
    * @description set order item
    * 
    * @param {String} type pizza type
    * 
    * @return {Object} pizza object details
    * 
    */
    cartItemDetails(type){
        const details = {
            subtitle: `${this[`${type}Details`]().subtitle}`,
            description: `${this[`${type}Details`]().description}`
        }
        return details
    }
    /**
    * @name addCartItemToppings
    * @function
    * 
    * @description sets pizza toppings
    * 
    * @param {Array} toppingArray pizza element toppings
    * 
    * @return does not return anyting
    * 
    */
    addCartItemToppings = (toppingArray = []) => {
        if (!Array.isArray(toppingArray) || !toppingArray.length || toppingArray.length == 0) return
        const toppings = this.formField('toppings')
        toppingArray.forEach(topping => {
            const li = document.createElement('li')
            li.innerHTML = `${topping}`
            toppings.appendChild(li)
        })
    }

    /**
    * @name onCartItemInit
    * @function
    * 
    * @description sets and prepares pizza elements
    * 
    * @param {String} typePizza pizza type
    * 
    * @return does not return anyting
    * 
    */
    onCartItemInit(typePizza){
        if (typeof typePizza !== 'string' || !typePizza.trim().length || typePizza.trim().length === 0) return
        const pizzaType = typePizza.trim().toLowerCase()
        this.cartItemToppings = this.callFirstOnlyNTimes(this.addCartItemToppings)
        const image = this.shadowRoot.getElementById('image')
        const link = this.shadowRoot.getElementById('image-link')
        const type = this.shadowRoot.getElementById('pizza-name')
        if(type.getAttribute('type') !== null){
            if (type.getAttribute('type').toLowerCase().trim() === pizzaType) {
                image.setAttribute('src', `../../../../public/images/menu/${pizzaType}.jpg`)
                image.setAttribute('alt', `${pizzaType}`)
                // link.setAttribute('href', '../../../../public/images/menu/yummy.jpg')
                link.setAttribute('href', 'pizza')
                const topping = this.types[`${pizzaType}`]
                this.cartItemToppings(topping.toppings)
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
                link.addEventListener('click', event => {
                //  console.log('image-link clicked')
                    const data = {
                        type: type.getAttribute('type').toLowerCase().trim(),
                        name: type.getAttribute('type').toUpperCase().trim(),
                        image: pizzaImage,
                        alt: image.getAttribute('alt'),
                        toppings: topping,
                        details: this.cartItemDetails(pizzaType)
                    }
                    window.localStorage.setItem('pizza', JSON.stringify(data))
                    this.sendRouteDataChanel.postMessage(data)
                })
    
            }
        }

    }
    init(){
        this.onLoadAuthCartData()
        this.prices()
        this.priceRanges()

        const products = JSON.parse(window.localStorage.getItem('products'))
        products.products.forEach(product => {
            this.orderTypes.push(product.name)
        })
        this.orderTypes.forEach(order => {
            this.onCartItemInit(order)
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
customElements.define("order-element", OrderElement);
export default OrderElement
'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module AboutElement
 * @kind class
 * 
 * @extends PizzaElement
 * 
 * @requires PizzaElement
 * 
 * @classdesc AboutElement class for the about page
 * 
 */
import PizzaElement from '../menu/pizza/PizzaElement.js'

class AboutElement extends PizzaElement {
    constructor() {
        super();
        // element created

        // auto bind methods
        this.autobind(AboutElement)
        this.aboutTypes = []
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
            link.setAttribute('href', 'pizza')
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
                    details: this.pizzaInfoDetails(`${pizzaType}`, this.aboutTypes)
                }
               
                window.localStorage.setItem('pizza', JSON.stringify(data))
                this.sendRouteDataChanel.postMessage(data)
            })

        }

    }

   /**
   * @name onAboutElementNaming
   * @function
   * 
   * @description Add attributes, initiates, and set the pizza object of the about page
   * 
   * @return does not return anything
   * 
   */
    onAboutElementNaming() {
        if (!Array.isArray(this.aboutTypes) || !this.aboutTypes.length || this.aboutTypes.length === 0) return
        this.prices()
        this.priceRanges()

        this.addAboutPizzaToppings = this.callFirstOnlyNTimes(this.addToppings)
        this.aboutTypes.forEach(pizza => {
            this.pizzaAboutInit(pizza)
        })
    }
    
    /**
     * @name connectedCallback (element's life cycle)
     * @function
     * 
     * @description browser calls this method when the element is added or mounted to the  document or DOM
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
customElements.define("about-element", AboutElement);
export default AboutElement
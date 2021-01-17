'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module SinglePizzaElement
 * @kind class
 * 
 * @extends PizzaElement
 * 
 * @requires PizzaElement
 * 
 * @classdesc SinglePizzaElement class for the pizza page
 * 
 **/

import PizzaElement from '../menu/pizza/PizzaElement.js'
class SinglePizzaElement extends PizzaElement {
  constructor() {
    super();
    // element created
  }

  setVariables(){
    this.dataEvent 
    this.title = this.shadowRoot.getElementById('main-title')
    this.image = this.shadowRoot.getElementById('image')
    this.toppings = this.shadowRoot.getElementById('toppings')

    this.smallPrice = this.shadowRoot.getElementById('small-price')
    this.mediumPrice = this.shadowRoot.getElementById('medium-price')
    this.largePrice = this.shadowRoot.getElementById('large-price')
    this.xlargePrice = this.shadowRoot.getElementById('xlarge-price')

    this.reducedSmallPrice = this.shadowRoot.getElementById('small-reduced-price')
    this.reducedMediumPrice = this.shadowRoot.getElementById('medium-reduced-price')
    this.reducedLargePrice = this.shadowRoot.getElementById('large-reduced-price')
    this.reducedXlargePrice = this.shadowRoot.getElementById('xlarge-reduced-price')

    this.subtitle = this.shadowRoot.getElementById('subtitle')
    this.description = this.shadowRoot.getElementById('description')

    this.data = JSON.parse(window.localStorage.getItem('pizza'))
}
render(){
    if (this.data && this.data !== null) {
        // console.log(data)
        this.subtitle.innerHTML = this.data.details.subtitle
        this.description.innerHTML = this.data.details.description
       if(this.data.onSell){
        let name = `${this.data.name.split(',')[0].toUpperCase()}`
        let desc = `${this.data.name.split(',')[1]}`
        this.shadowRoot.getElementById('main-title').innerHTML = name + ',' + desc
       }else{
        this.shadowRoot.getElementById('main-title').innerHTML = this.data.name.toUpperCase()
       }
        this.image.setAttribute('src', this.data.image)
        this.data.toppings.toppings.forEach(topping => {
            const li = document.createElement('li')
            li.innerHTML = `${topping}`
            this.toppings.appendChild(li)
        })

       
         if(this.data.onSell){
            this.data.toppings.sizes.forEach(item => {
                // console.log('item', item)
                if (item.size.trim().toLowerCase() === 'small') {
                    this.smallPrice.innerHTML = `\$${item.price}`
                    this.smallPrice.style.color = "orange"
                }
                if (item.size.trim().toLowerCase() === 'medium') {
                    this.mediumPrice.innerHTML = `\$${item.price}`
                    this.mediumPrice.style.color = "orange"
                }
                if (item.size.trim().toLowerCase() === 'large') {
                    this.largePrice.innerHTML = `\$${item.price}`
                    this.largePrice.style.color = "orange"
                }
                if (item.size.trim().toLowerCase() === 'xlarge') {
                    this.xlargePrice.innerHTML = `\$${item.price}`
                    this.xlargePrice.style.color = "orange"
                }
            })

            this.data.toppings.reducedPrices.forEach(item => {
                console.log('item', item)
                if (item.size.trim().toLowerCase() === 'small') {
                    this.reducedSmallPrice.innerHTML = `\$${item.price}`
                    this.reducedSmallPrice.style.color = "teal"
                }
                if (item.size.trim().toLowerCase() === 'medium') {
                    this.reducedMediumPrice.innerHTML = `\$${item.price}`
                    this.reducedMediumPrice.style.color = "teal"
                }
                if (item.size.trim().toLowerCase() === 'large') {
                    this.reducedLargePrice.innerHTML = `\$${item.price}`
                    this.reducedLargePrice.style.color = "teal"
                }
                if (item.size.trim().toLowerCase() === 'xlarge') {
                    this.reducedXlargePrice.innerHTML = `\$${item.price}`
                    this.reducedXlargePrice.style.color = "teal"
                }
            })
         }else{
            this.data.toppings.sizes.forEach(item => {
                // console.log('item', item)
                if (item.size.trim().toLowerCase() === 'small') {
                    this.smallPrice.innerHTML = `\$${item.price}`
                    this.smallPrice.style.color = "teal"
                    this.smallPrice.style.textDecoration = 'none'
                    this.reducedSmallPrice.innerHTML= ''
                }
                if (item.size.trim().toLowerCase() === 'medium') {
                    this.mediumPrice.innerHTML = `\$${item.price}`
                    this.mediumPrice.style.color = "teal"
                    this.mediumPrice.style.textDecoration = 'none'
                    this.reducedMediumPrice.innerHTML = ``
                    
                }
                if (item.size.trim().toLowerCase() === 'large') {
                    this.largePrice.innerHTML = `\$${item.price}`
                    this.largePrice.style.color = "teal"
                    this.largePrice.style.textDecoration = 'none'
                    this.reducedLargePrice.innerHTML = ``
                }
                if (item.size.trim().toLowerCase() === 'xlarge') {
                    this.xlargePrice.innerHTML = `\$${item.price}`
                    this.xlargePrice.style.color = "teal"
                    this.xlargePrice.style.textDecoration = 'none'
                    this.reducedXlargePrice.innerHTML = ``
                }
            })
         }
        

    }
}
init(){
    this.setVariables()
    this.render()
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
customElements.define("single-pizza-element", SinglePizzaElement);
export default SinglePizzaElement
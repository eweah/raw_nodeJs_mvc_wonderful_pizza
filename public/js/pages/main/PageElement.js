'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module PageElement
 * @kind class
 * 
 * @extends PizzaElement
 * 
 * @requires PizzaElement
 * 
 * @classdesc PageElement class for the order page
 * 
 **/
import PizzaElement from '../../menu/pizza/PizzaElement.js'
class PageElement extends PizzaElement {
  constructor() {
    super();
    // element created
  }

  // setItems(){
  //   this.banner = this.formField('banner-image')
  //   this.name = this.formField('pizza-name')
  //   this.description = this.formField('pizza-description')
  //   // this.toppingImage = this.formField('topping-image')
  //   this.toppingDescription = this.formField('topping-description')
  //   this.toppingContainer = this.formField('aside-container')
  //   this.banner.removeAttribute('src')
  //   this.banner.setAttribute('src', '../../../../public/images/menu/bchicken.jpg')
  //   // this.toppingImage.setAttribute('src', '../../../../public/images/menu/sidechicken.jpg')
  //   this.name.innerHTML = this.types.chicken.name//.topUpperCase()
  //   this.toppingContainer.style.backgroundImage= "url('../../../../public/images/menu/sidechicken.jpg')"
  //   this.types.chicken.toppings.forEach(topping => {
  //     const ul = document.createElement('ul')
  //     const li = document.createElement('li')
  //     li.innerHTML = topping 
  //     ul.appendChild(li)
  //     this.toppingContainer.appendChild(ul)
  //     this.toppingContainer.style.color = 'blue'
  //     this.toppingContainer.style.opacity = '0.4'
  //   })
  // }

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
customElements.define("page-element", PageElement)
export default PageElement
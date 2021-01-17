'use strict'

import BaseElement from '../BaseElement.js'
class HomeElement extends BaseElement {
  constructor() {
    super();
    // element created
  }
   /**
   * @name showSlides
   * @function
   * 
   * @param {Number} n slide number
   * 
   * @description shows and control image slideshow
   * 
   * @return does not return anything
   * 
   */
  showSlides(n) {
    let i;
    this.slides = this.shadowRoot.querySelectorAll('.mySlides')
    this.dots = this.shadowRoot.querySelectorAll('.demo')
    this.name = this.shadowRoot.getElementById('caption')

    if (n > this.slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = this.slides.length
    }
    for (i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }
    for (i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace(" active", "");
    }
    this.slides[this.slideIndex - 1].style.display = "block";
    this.dots[this.slideIndex - 1].className += " active";
    this.name.innerHTML = this.dots[this.slideIndex - 1].alt;
  }
   /**
   * @name plusSlides
   * @function
   * 
   * @param {Number} n slide number
   * 
   * @description adds slide number
   * 
   * @return does not return anything
   * 
   */
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
   /**
   * @name currentSlide
   * @function
   * 
   * @param {Number} n slide number
   * 
   * @description add current slide number
   * 
   * @return does not return anything
   * 
   */
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

   /**
   * @name navigate
   * @function
   * 
   * @param {Number} n slide number
   * 
   * @description processes the slide navigation
   * 
   * @return does not return anything
   * 
   */
  navigate() {
    this.prev = this.shadowRoot.querySelector('a.prev')
    this.next = this.shadowRoot.querySelector('a.next')
    this.prev.addEventListener('click', event => {
      this.plusSlides(-1)
    })
    this.next.addEventListener('click', event => {
      this.plusSlides(1)
    })
  }

  init(){
      // const agent = navigator.userAgent
    // const browserName = agent.split(' ')[agent.split(' ').length -1]
    // // console.log(browserName)
    // console.log(agent)
    // if(navigator.userAgent.indexOf('Chrome') !== -1){
    //   console.log('Chrome')
    // }

    this.slideIndex = 1;

    this.showSlides(this.slideIndex);
    this.dots.forEach((slide, index) => {
      slide.addEventListener('click', event => {
        this.currentSlide(index + 1)
      })
    })
    this.navigate()
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
customElements.define("home-element", HomeElement);

export default HomeElement
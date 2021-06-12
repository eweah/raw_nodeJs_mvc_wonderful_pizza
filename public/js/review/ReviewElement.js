'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Review
 * @kind class
 * 
 * @extends ReviewElement
 * 
 * @requires ReviewElement
 * @requires html
 * 
 * @classdesc Review class for the review page
 * 
 **/
import ShoppingCartElement from '../cart/ShoppingCartElement.js'
class ReviewElement extends ShoppingCartElement {
  constructor() {
    super();
    // element created
  }

  /**
    * @name createtd
    * @function
    * 
    * @description creates a table data element
    * 
    * @param {String} id the value of the id attribute
    * @param {String} innerHTML the innerHTML value to set
    * @param {String} value the value of the id attribute
    * @param {HTMLElement} choice the value of the value attribute
    * 
    * @return {HTMLElement} the table data element
    * 
    */
  createtd(id, innerHTML, value) {
    const td = document.createElement('td')
    td.setAttribute('id', id)
    td.setAttribute('value', value)
    td.innerHTML = `${innerHTML}`
    return td
  }
   /**
    * @name destroytd
    * @function
    * 
    * @description create a table data element
    * 
    * @param {String} id the value of the id attribute
    * @param {String} innerHTML the innerHTML value to set
    * @param {String} value the value of the id attribute
    * @param {HTMLElement} choice the value of the value attribute
    * 
    * @return {HTMLElement} the table data element
    * 
    */
  destroytd(id, innerHTML, value) {
    const td = document.createElement('td')
    td.setAttribute('id', id)
    td.setAttribute('value', value)
    td.innerHTML = `${innerHTML}`
    return td
  }

   /**
    * @name addtd
    * @function
    * 
    * @description adds table data element
    * 
    * @param {String} parentId id of the parent element
    * @param {String} childId id of the child element
    * @param {String} childInnerHTML innerHTML value of the child element
    * @param {value} value value of the value attribute
    * 
    * @return does not return anything
    * 
    */
  addtd(parentId, childId, childInnerHTML, value) {
    this.itemToReview = this.shadowRoot.getElementById(parentId)
    if (this.itemToReview !== null) {
      this.itemToReview.appendChild(this.createtd(childId, childInnerHTML, value))
    } else {

      const itemTable = this.shadowRoot.getElementById('myTable')

      const tableBody = itemTable.firstElementChild

      const items = itemTable.firstElementChild.firstElementChild

      const tr = document.createElement('tr')
      tr.setAttribute('id', parentId)
      items.parentNode.insertBefore(tr, items.nextSibling);
      this.itemToReview = this.shadowRoot.getElementById(parentId)
      this.itemToReview.appendChild(this.createtd(childId, childInnerHTML))
    }
  }
  /**
    * @name removetd
    * @function
    * 
    * @description removes a table data element
    * 
    * @param {String} parentId id of the parent element
    * @param {String} childId id of the child element
    * @param {String} childInnerHTML innerHTML value of the child element
    * @param {value} value value of the value attribute
    * 
    * @return does not return anything
    * 
    */
  removetd(parentId, childId, childInnerHTML, value) {
    this.itemToReview = this.shadowRoot.getElementById(parentId)
    if (this.itemToReview !== null) {
      this.itemToReview.appendChild(this.createtd(childId, childInnerHTML, value))
      this.itemToReview.parentNode.removeChild(this.itemToReview)
    }
  }
  /**
    * @name renderDefault
    * @function
    * 
    * @description renders table by adding table data elements
    * 
    * @return does not return anything
    * 
    */
  renderDefault() {
    // unit price
    this.addtd('review-edit', 'unit-price', '$9.95')

    // quantity 
    this.addtd('review-edit', 'quantity', '6')

    // size 
    this.addtd('review-edit', 'size', 'small')

    // type 
    this.addtd('review-edit', 'type', 'Prairie')
  }

  /**
    * @name addCartItem
    * @function
    * 
    * @description renders table by adding table data elements for car item
    * 
    * @return does not return anything
    * 
    */
  addCartItem(parentId, unitPrice, quantity, size, type, price) {

    this.addtd(parentId, 'unit-price', unitPrice, unitPrice)

    // // quantity 
    this.addtd(parentId, 'quantity', quantity, quantity)

    // // size 
    this.addtd(parentId, 'size', size, size)

    // // type 
    this.addtd(parentId, 'type', type, type)

    // price
    // const  subtotal = `${price}  <strong id="trash">&#9851;</strong>`

    this.addtd(parentId, 'item-subtotal', price, price)
  }

  /**
    * @name removeCartItem
    * @function
    * 
    * @description removed rendered cart table data elements
    * 
    * @return does not return anything
    * 
    */
  removeCartItem(parentId, unitPrice, quantity, size, type, price) {

    this.removetd(parentId, 'unit-price', unitPrice, unitPrice)

    // // quantity 
    this.removetd(parentId, 'quantity', quantity, quantity)

    // // size 
    this.removetd(parentId, 'size', size, size)

    // // type 
    this.removetd(parentId, 'type', type, type)

    // price
    // const  subtotal = `${price}  <strong id="trash">&#9851;</strong>`

    this.removetd(parentId, 'item-subtotal', price, price)
  }



  //}
  test() {
    const items = this.shadowRoot.getElementById('items')
    const itemTable = this.shadowRoot.getElementById('myTable')
    // console.log(items)
    console.log(itemTable.firstElementChild.firstElementChild)
  }
  /**
    * @name buildSizeInnerHTML
    * @function
    * 
    * @description builds or renders innerHTML
    * 
    * @param {String} size pizza size
    * @param {String} key pizza key attributes
    * 
    * @return {String} string containing the HTML
    * 
    */
  buildSizeInnerHTML(size, key) {
    if (size === 'small') {
      return `
      <select name="size" id="select-size" required>
      <option value="${size}" key="${key}">small</option>
      <option value="medium">medium</option>
      <option value="large">large</option>
      <option value="xlarge">xlarge</option>
    </select>`
    }
    if (size === 'medium') {
      return `
      <select name="size" id="select-size" required>
      <option value="${size}" key="${key}">medium</option>
      <option value="small">small</option>
      <option value="large">large</option>
      <option value="xlarge">xlarge</option>
    </select>`
    }
    if (size === 'large') {
      return `
      <select name="size" id="select-size" required>
      <option value="${size}" key="${key}">large</option>
      <option value="small">small</option>
      <option value="medium">medium</option>
      <option value="xlarge">xlarge</option>
    </select>`
    }
    if (size === 'xlarge') {
      return `
      <select name="size" id="select-size" required>
      <option value="${size}" key="${key}">xlarge</option>
      <option value="small">small</option>
      <option value="medium">medium</option>
      <option value="large">large</option>
    </select>`
    }

    return `
      <select name="size" id="select-size" required>
      <option value="small" key="${key}">small</option>
      <option value="medium">medium</option>
      <option value="large">large</option>
      <option value="xlarge">xlarge</option>
    </select>`
  }

  /**
    * @name buildTypeInnerHTML
    * @function
    * 
    * @description builds or renders innerHTML
    * 
    * @param {String} type pizza type
    * @param {String} key pizza key attributes
    * 
    * @return {String} string containing the HTML
    * 
    */
  buildTypeInnerHTML(type, key) {
    if (type === 'prairie') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">prairie</option>
      <option value="texan">texan</option>
      <option value="bronco">bronco</option>
      <option value="roma">roma</option>
      <option value="italian">italian</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'texan') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">texan</option>
      <option value="prairie">prairie</option>
      <option value="bronco">bronco</option>
      <option value="roma">roma</option>
      <option value="italian">italian</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }

    if (type === 'bronco') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="italian">italian</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }

    if (type === 'roma') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">roma</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="italian">italian</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'italian') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">italian</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'hawaiian') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">hawaiian</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="italian">italian</option>
      <option value="italian">italian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'tasmanian') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">tasmanian</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="italian">italian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'ivorian') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">ivorian</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="italian">italian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'canadian') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">canadian</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="italian">italian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'ausie') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">ausie</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="italian">italian</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'happy') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">happy</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="italian">italian</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'wonderful') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">wonderful</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="italian">italian</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'chicken') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">chicken</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="italian">italian</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'bbq') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">bbq</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="italian">italian</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'beef') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">beef</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="italian">italian</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'cheese') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">cheese</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="italian">italian</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'buffalo') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">buffalo</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="italian">italian</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'bacon') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">bacon</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="italian">italian</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'roundup') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">roundup</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="italian">italian</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'wês') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">wês</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="italian">italian</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'szran') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">szran</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="italian">italian</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'lago') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">lago</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="italian">italian</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'gnonsoa') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">gnonsoa</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="italian">italian</option>
      <option value="yummy">yummy</option>
    </select>`
    }
    if (type === 'yummy') {
      return `
      <select name="type" id="select-type" required>
      <option value="${type}" key="${key}">yummy</option>
      <option value="bronco">bronco</option>
      <option value="texan">texan</option>
      <option value="prairie">prairie</option>
      <option value="roma">roma</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="italian">italian</option>
    </select>`
    }
    return `
    <select name="type" id="select-type" required>
    <option value="prairie" key="${key}">prairie</option>
    <option value="texan">texan</option>
    <option value="bronco">bronco</option>
    <option value="roma">roma</option>
    <option value="italian">italian</option>
      <option value="hawaiian">hawaiian</option>
      <option value="tasmanian">tasmanian</option>
      <option value="ivorian">ivorian</option>
      <option value="canadian">canadian</option>
      <option value="ausie">ausie</option>
      <option value="happy">happy</option>
      <option value="wonderful">wonderful</option>
      <option value="chicken">chicken</option>
      <option value="bbq">bbq</option>
      <option value="beef">beef</option>
      <option value="cheese">cheese</option>
      <option value="buffalo">buffalo</option>
      <option value="bacon">bacon</option>
      <option value="roundup">roundup</option>
      <option value="wês">wês</option>
      <option value="szran">szran</option>
      <option value="lago">lago</option>
      <option value="gnonsoa">gnonsoa</option>
      <option value="yummy">yummy</option>
  </select>`
  }
  /**
    * @name render
    * @function
    * 
    * @description builds or renders innerHTML
    * 
    * @param {String} formId form it
    * @param {String} itemId cart item id
    * @param {Number} quantity pizza quantity
    * @param {String} size pizza size
    * @param {String} type pizza type
    * @param {Number} price pizza price
    * @param {String} key pizza key attributes
    * 
    * @return does not return anything
    * 
    */
  render(formId, itemId, quantity, size, type, price, key) {
    this.itemToReview = this.shadowRoot.getElementById(itemId)
    //   from 
    const rForm = document.createElement('form')
    // rForm.setAttribute('action', '')
    rForm.setAttribute('class', 'review')
    rForm.setAttribute('id', formId)

    const editQuantity = document.createElement('td')
    editQuantity.setAttribute('id', 'edit-quantity')
    editQuantity.setAttribute('key', `${key}`)

    editQuantity.innerHTML = `<input type="number" min="1" max="100" required name="quantity" id="select-quantity" value="${quantity}" key="${key}">`
    rForm.appendChild(editQuantity)
    this.itemToReview.appendChild(editQuantity)

    const editSize = document.createElement('td')
    editSize.setAttribute('id', 'edit-size')
    editSize.setAttribute('key', `${key}`)

    editSize.innerHTML = this.buildSizeInnerHTML(size, key)
    rForm.appendChild(editSize)
    this.itemToReview.appendChild(editSize)

    const editType = document.createElement('td')
    editType.setAttribute('id', 'edit-type')
    editType.setAttribute('key', `${key}`)

    editType.innerHTML = this.buildTypeInnerHTML(type, key)
    rForm.appendChild(editType)
    this.itemToReview.appendChild(editType)

    //price 
    const itemPrice = document.createElement('td')
    itemPrice.setAttribute('id', 'edit-item-subtotal')
    itemPrice.setAttribute('key', `${key}`)
    itemPrice.innerHTML = `${price}  <strong id="trash">&#9851;</strong>`
    rForm.appendChild(itemPrice)
    this.itemToReview.appendChild(itemPrice)
    this.itemToReview.appendChild(rForm)

  }
  // unRender(itemId){
  //   this.itemToReview = this.shadowRoot.getElementById(itemId)
  //   if(this.itemToReview !== null)  this.itemToReview.parentNode.removeChild(this.itemToReview)
  // }

 /**
    * @name unRender
    * @function
    * 
    * @description unrenders innerHTML
    * 
    * @param {String} formId form it
    * @param {String} itemId cart item id

    * 
    * @return does not return anything
    * 
    */
  unRender(formId, itemId) {

    this.itemToReview = this.shadowRoot.getElementById(itemId)
    if (this.itemToReview !== null) this.itemToReview.parentNode.removeChild(this.itemToReview)
    //   from 
    const rForm = this.shadowRoot.getElementById(formId)
    if (rForm !== null) rForm.parentNode.removeChild(rForm)

    const editQuantity = this.shadowRoot.getElementById('edit-quantity')
    if (editQuantity !== null) editQuantity.parentNode.removeChild(editQuantity)


    const editSize = this.shadowRoot.getElementById('edit-size')
    if (editSize !== null) editSize.parentNode.removeChild(editSize)


    const editType = this.shadowRoot.getElementById('edit-type')
    if (editType !== null) editType.parentNode.removeChild(editType)


    //price 

    const itemPrice = this.shadowRoot.getElementById('edit-item-subtotal')
    if (itemPrice !== null) itemPrice.parentNode.removeChild(itemPrice)

    // this.itemToReview.appendChild(itemPrice)
    // this.itemToReview.appendChild(rForm)

  }


 /**
    * @name getReviewItem
    * @function
    * 
    * @description gets shadow DOM element
    * 
    * @param {String} elementId shadow DOM element id
    * 
    * @return {HTMLElement} the shadow DOM element with the corresponding id
    * 
    */
  getReviewItem(elementId) {
    return this.shadowRoot.getElementById(elementId)
  }

   /**
    * @name setChildren
    * @function
    * 
    * @description sets shadow DOM element children
    * 
    * @param {String} parentId the shadow DOM parent element id
    * 
    * @return does not return anything
    * 
    */
  setChildren(parentId) {
    const parent = this.getReviewItem(parentId)
    const editBtn = this.shadowRoot.getElementById('edit')
    const doneBtn = this.shadowRoot.getElementById('done')
    let quantity, type, size, data = []
    if (parent !== null && parent.children) {
      for (let child of parent.children) {

        if (child.getAttribute('id') === 'quantity') {
          // quantity = child.getAttribute('value')
          // data.push(quantity)
        }
        if (child.getAttribute('id') === 'type') {
          // type = child.getAttribute('value')
          // data.push(type)
        }
        if (child.getAttribute('id') === 'size') {
          // size = child.getAttribute('value')
          // data.push(size)
        }
        if (child.getAttribute('id') === 'edit-quantity') {
          quantity = child.getAttribute('value')

        }
        if (child.getAttribute('id') === 'edit-type') {
          type = child.getAttribute('value')

        }
        if (child.getAttribute('id') === 'edit-size') {
          size = child.getAttribute('value')

        }
        if (child.getAttribute('id') === 'edit-quantity') {
          child.style.display = 'none'
          editBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'

          })
          doneBtn.addEventListener('click', event => {
            child.style.display = 'none'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'
            quantity = parseInt(child.firstElementChild.value)


          })
        }
        if (child.getAttribute('id') === 'edit-size') {
          child.style.display = 'none'
          editBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'
          })
          doneBtn.addEventListener('click', event => {
            child.style.display = 'none'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'
            size = child.firstElementChild.value

          })
        }
        if (child.getAttribute('id') === 'edit-type') {
          child.style.display = 'none'
          editBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'
          })
          doneBtn.addEventListener('click', event => {

            // on udpate 
            child.style.display = 'none'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'

            type = child.firstElementChild.value
            if (quantity < 0) {
              quantity = 0
            }
            const data = this.select(type, size, quantity, false)
            // console.log('edit type', type, size, quantity)
            const chosen = child.firstElementChild.firstElementChild
            const orderId = parseInt(chosen.getAttribute('key'))

            if(this.authCheck()){
            
                this.authUser()
                    .then(auth => {
                        const dataToUpdate = {
                            id: child.firstElementChild.firstElementChild.getAttribute('key'),
                            type: type,
                            size: size,
                            quantity: quantity,
                            placed: false
                        }
                        this.updateAuthCartItem(dataToUpdate)
                            .then(response => {
                                this.updateCartChannel.postMessage({
                                    response
                                })
                                window.dispatchEvent(new CustomEvent('order-review-updated', {
                                  detail: {
                                    response
                                  }
                                }))
                               
                            })
                            .catch(error => console.log('error', error))

                        //  this.removeCartItem({id: productId.value})
                        // //  this.parentNode.removeChild(this)
                        //  this.updateCartChannel.postMessage({id: productId.value})
                    })
                    .catch(console.error)
            }else{
              try{
                const store = this.store('orders', 'readwrite')

              const request = store.get(orderId)
              request.onerror = event => {
                console.log('ERROR')
              }
              request.onsuccess = event => {
                const order = event.target.result
                order.pricing = data.pricing
                order.name = data.name
                order.size = data.size
                const updateRequest = store.put(order)
                updateRequest.onerror = event => {
                  console.log('Error')
                }
                updateRequest.onsuccess = event => {
                  const updated = event.target.result
                  window.dispatchEvent(new CustomEvent('order-review-updated', {
                    detail: {
                      order
                    }
                  }))
                  //  const carts = this.store('carts', 'readwrite')
                  // upadate cart 
                  const carts = this.store('carts', 'readwrite')
  
                  const requestCart = carts.getAll()
                  requestCart.onerror = event => {
                    console.log('ERROR')
                  }
                  requestCart.onsuccess = event => {
                    const orderData = event.target.result
                    console.log(orderData)
                    // orderData[0].order[0].pricing = data.pricing
                    // orderData[0].order[0].name = data.name
                    // orderData[0].order[0].size = data.size
                    // const updateRequest = carts.put(orderData[0])
                    // updateRequest.onerror = event =>{
                    //   console.log('Error')
                    // }
                    // updateRequest.onsuccess = event =>{
                    //   // const updated = event.target.result
                    //   // window.dispatchEvent(new CustomEvent('order-review-updated',{detail: {order}}))
  
                    // }
  
                  }
  
                }
  
              }
              }catch(error){
                window.location.reload()
                window.location.reload()
                window.location.reload()
                const store = this.store('orders', 'readwrite')
                window.location.reload()
                window.location.reload()
                window.location.reload()

              const request = store.get(orderId)
              request.onerror = event => {
                console.log('ERROR')
              }
              request.onsuccess = event => {
                const order = event.target.result
                order.pricing = data.pricing
                order.name = data.name
                order.size = data.size
                const updateRequest = store.put(order)
                updateRequest.onerror = event => {
                  console.log('Error')
                }
                updateRequest.onsuccess = event => {
                  const updated = event.target.result
                  window.dispatchEvent(new CustomEvent('order-review-updated', {
                    detail: {
                      order
                    }
                  }))
                  //  const carts = this.store('carts', 'readwrite')
                  // upadate cart 
                  window.location.reload()
                  window.location.reload()
                  window.location.reload()
                  const carts = this.store('carts', 'readwrite')
                  window.location.reload()
                  window.location.reload()
                  window.location.reload()

  
                  const requestCart = carts.getAll()
                  requestCart.onerror = event => {
                    console.log('ERROR')
                  }
                  requestCart.onsuccess = event => {
                    const orderData = event.target.result
                    console.log(orderData)
                    // orderData[0].order[0].pricing = data.pricing
                    // orderData[0].order[0].name = data.name
                    // orderData[0].order[0].size = data.size
                    // const updateRequest = carts.put(orderData[0])
                    // updateRequest.onerror = event =>{
                    //   console.log('Error')
                    // }
                    // updateRequest.onsuccess = event =>{
                    //   // const updated = event.target.result
                    //   // window.dispatchEvent(new CustomEvent('order-review-updated',{detail: {order}}))
  
                    // }
  
                  }
  
                }
  
              }
              }
            }


          })
        }
        if (child.getAttribute('id') === 'edit-item-subtotal') {
          child.style.display = 'none'
          editBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'
          })
          doneBtn.addEventListener('click', event => {
            child.style.display = 'none'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'
          })
        }

        if (child.getAttribute('id') === 'quantity') {
          // child.style.display = 'none'
          editBtn.addEventListener('click', event => {
            child.style.display = 'none'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'
          })
          doneBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'
          })

        }
        if (child.getAttribute('id') === 'size') {
          editBtn.addEventListener('click', event => {
            child.style.display = 'none'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'
          })
          doneBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'
          })
        }
        if (child.getAttribute('id') === 'type') {
          editBtn.addEventListener('click', event => {
            child.style.display = 'none'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'
          })
          doneBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'
          })
        }
        if (child.getAttribute('id') === 'item-subtotal') {
          editBtn.addEventListener('click', event => {
            child.style.display = 'none'
            doneBtn.style.display = 'block'
            editBtn.style.display = 'none'
          })
          doneBtn.addEventListener('click', event => {
            child.style.display = 'table-cell'
            doneBtn.style.display = 'none'
            editBtn.style.display = 'block'
          })

        }



      }
    }



  }
   /**
    * @name edit
    * @function
    * 
    * @description edits shadow DOM elements
    * 
    * @param {String} elementId shadow DOM element id
    * 
    * @return does not return anything
    * 
    */
  edit(elementId) {

    this.setChildren(elementId)

    const calculate = this.shadowRoot.getElementById('calculate')
    calculate.style.backgroundColor = 'teal'
    calculate.style.color = 'white'
    const items = this.shadowRoot.getElementById('items')
    items.style.backgroundColor = 'bisque'
  }

 /**
    * @name onReviewLoad
    * @function
    * 
    * @description renders order cart items
    * 
    * @param {Array} data order details
    * 
    * @return does not return anything
    * 
    */
  onReviewLoad(data = []) {
    if (data && data.length > 0) {
      data.forEach(datum => {
        this.addCartItem(`${datum.id}-${datum.size}-${datum.name}`, datum.pricing.price, datum.pricing.quantity, datum.size, datum.name, datum.pricing.subtotal)
        // this.edit(`${datum.id}-${datum.size}-${datum.name}`)
        this.render(`form-${datum.id}-${datum.size}-${datum.name}`, `${datum.id}-${datum.size}-${datum.name}`, datum.pricing.quantity, datum.size, datum.name, datum.pricing.subtotal, datum.id)

        // render(formId, itemId, datum.pricing.quantity, datum.size, datum.name)
        this.edit(`${datum.id}-${datum.size}-${datum.name}`)
      })
    }
    const subtotal = data
      .map(datum => parseFloat(datum.pricing.subtotal.substring(1)))
      .reduce((x, y) => x + y, 0)
    //  const total= data
    //  .map(datum => parseFloat(datum.pricing.total.substring(1)))
    //  .reduce((x, y) => x + y,0).toFixed(2)

    //  const taxed = data
    //  .map(datum => parseFloat(datum.pricing.tax.substring(1)))
    //  .reduce((x, y) => x + y,0).toFixed(2)

    const quantity = data
      .map(datum => parseInt(datum.pricing.quantity))
      .reduce((x, y) => x + y, 0)

    const taxing = 0.07 * subtotal
    const taxed = taxing.toFixed(2)

    const totaling = taxing + subtotal
    const total = totaling.toFixed(2)
    this.grandSubtotal = this.shadowRoot.getElementById('grand-subtotal')
    this.grandQuantity = this.shadowRoot.getElementById('grand-quantity')
    this.grandTax = this.shadowRoot.getElementById('grand-tax')
    this.grandTaxed = this.shadowRoot.getElementById('grand-taxed')
    this.grandTotal = this.shadowRoot.getElementById('grand-total')
    this.grandSubtotal.innerHTML = `\$${subtotal.toFixed(2)}`
    this.grandTotal.innerHTML = `\$${total}`
    this.grandTaxed.innerHTML = `\$${taxed}`
    this.grandQuantity.innerHTML = `${quantity}`
    this.grandTax.innerHTML = `7% x \$${subtotal.toFixed(2)}`
  }

 /**
    * @name onGuestOrderReview
    * @function
    * 
    * @description renders guest order cat items
    * 
    * @return does not return anything
    * 
    */
  onGuestOrderReview() {
    window.addEventListener('reload', event => {}, {
      once: true
    })
    window.addEventListener('load', async event => {
      if (this.authCheck()) {
        const auth = await this.authUser()
        const orders = await this.authOrders()
        this.onReviewLoad(orders)
      } else {
        try{
          // console.log('event')
        // window.location.reload()
        // window.location.reload()
        // window.location.reload()
        const store = this.store('orders', 'readwrite')
        // window.location.reload()
        // window.location.reload()
        // window.location.reload()

        const request = store.getAll()

        request.onerror = event => {
          console.log('ERROR')
        }
        request.onsuccess = event => {
          // console.log('SUCCESS')
          const data = request.result
          this.onReviewLoad(data)
        }
        }catch(error){
          // console.log('event')
        window.location.reload()
        window.location.reload()
        window.location.reload()
        const store = this.store('orders', 'readwrite')
        window.location.reload()
        window.location.reload()
        window.location.reload()

        const request = store.getAll()

        request.onerror = event => {
          console.log('ERROR')
        }
        request.onsuccess = event => {
          // console.log('SUCCESS')
          const data = request.result
          this.onReviewLoad(data)
        }
        }
      }
    }, {
      once: true
    })
  }
   /**
    * @name onGuestUpdateOrderDuringReview
    * @function
    * 
    * @description show the guest user's udpated order details
    * 
    * @return does not return anything
    * 
    */
  onGuestUpdateOrderDuringReview() {
    this.updateCartItem.onmessage = event => {
      window.document.onload()
    }
  }

   /**
    * @name init
    * @function
    * 
    * @description set orders and order cart items
    * 
    * @return does not return anything
    * 
    */
  init() {
    window.addEventListener('order-review-updated', event => {
      const reload = () => window.location.reload()
      this.updateReviewChannel.postMessage({
        order: event.detail
      })
      setTimeout(reload, 50);
    })
    const editInCartBtn = this.shadowRoot.getElementById('back-to-cart')
    editInCartBtn.addEventListener('click', event => {
      window.location.href = 'https://www.wonderfulpizzas.ericsonweah.com/cart'
    })
    const paymentMethodBtn = this.shadowRoot.getElementById('payment-method')
    paymentMethodBtn.addEventListener('click', event => {
      window.location.href = 'https://www.wonderfulpizzas.ericsonweah.com/payment'
    })
    const doneBtn = this.shadowRoot.getElementById('done')
    doneBtn.style.display = 'none'
    this.onGuestOrderReview()
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
customElements.define("review-element", ReviewElement);
export default ReviewElement
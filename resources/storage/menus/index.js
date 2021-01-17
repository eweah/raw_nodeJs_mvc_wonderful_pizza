'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Menu
 * @kind class
 * 
 * @extends Helpers
 * 
 * @requires Helpers
 * @requires storeMenus
 * 
 * @classdesc Menus for source of truth for all menus
 * 
 *  
 * @typedef {String} type the pizza type
 * @typedef {String} size the pizza size 
 * @typedef {Number} quantity the quantity or total number of pizza in a single cart item
 * @typedef {Object} order the order containing one or more cat items. A cart item contains one or more pizza
 * 
 *
 * 
 */

const storeMenus = require('./store')
const Helpers = require('../../library/helpers')

class Menus  extends Helpers{
    constructor() {
        super()
        
        // auto bind methods 
        this.autobind(Menus)
    }


     /**
     * @name menuStore
     * @function
     *  
     * @description holds all menu items 
     * 
     * @return {Object} all menu items
     * 
     */
    menuStore(){
        return storeMenus
    }
   


    /**
     * @name _calculateSubtotal
     * @function
     *  
     * @description calculates subtotal prices of cart items
     * 
     * @return {Object} all menu items
     * 
     */
    _calculateSubtotal (quantity, price) {return quantity * price} 

    /**
     * @name _calculateTax
     * @function
     *  
     * @description calculates the tax of cart items
     * 
     * @return {Number} tax amount
     * 
     */
    _calculateTax (rate, quantity, price, fn = this._calculateSubtotal) {return rate * fn(quantity, price)}

    /**
     * @name _calculateTotal
     * @function
     *  
     * @description calculates grand total of cart items
     * 
     * @return {Number} grand total
     * 
     */
    _calculateTotal (tax, subtotal) {return tax + subtotal}

    /**
     * @name _clean
     * @function
     *  
     * @description cleans (trims) or normalize inputs
     * 
     * @return {String} trimed string
     * 
     */
    _clean(str){return str.trim().toLowerCase()}

    /**
     * @name _isItemInStack
     * @function
     *  
     * @description checks for items in stock
     * 
     * @return {Boolean} true if item is in stock; false otherwise
     * 
     */
    _isItemInStack(type, size) {

        // check input
        let checkType = this.menuStore().types[`${this._clean(type)}`]
        let isSize, checkSize
        checkType == undefined ? isSize = false : isSize = true

        isSize ? checkSize = checkType.sizes.find(el => el.size == this._clean(size)) : checkSize == undefined

        return checkSize == undefined ? false : checkSize.size == this._clean(size) ? true : false
    }

    /**
     * @name _isQuantityAvailable
     * @function
     *  
     * @description checks if the requested item quantity is available
     * 
     * @return {Boolean} true if requested quantity is smaller or equal to the quantity available; false otherwise
     * 
     */
    _isQuantityAvailable(type, quantity){return quantity <= this.menuStore().types[`${this._clean(type)}`]['quantity'] ? true : false}


    /**
     * @name Select
     * @function
     *  
     * @description selects the request cart item
     * 
     * @param {String} type pizza type 
     * @param {String} size pizza size
     * @param {Number} quantity quantity or number of pizzas in the cart item
     * @param {Boolean} placed  whether the cart item was saved in the cart or was ordered
     *                          1. if placed is false then the cart item sits in the cart
     *                          2. if placed is true, the item was purchased successfully
     * 
     * @return {Object} order
     * 
     */
    select(type, size, quantity, placed = true){
        if (this._isItemInStack(this._clean(type), size) && this._isQuantityAvailable(this._clean(type), quantity))

        if (this._isItemInStack(this._clean(type), size) && this._isQuantityAvailable(this._clean(type), quantity)) {
            const selectedMenus = this.menuStore().types[`${this._clean(type)}`]
            const toppings = selectedMenus.toppings
            const name = selectedMenus.name
            const selectedSize = selectedMenus.sizes.find(el => el.size == this._clean(size)).size
            const selectedPrice = selectedMenus.sizes.find(el => el.size == this._clean(size)).price
            const subtotal = this._calculateSubtotal(quantity, parseFloat(selectedPrice))
            const tax = this._calculateTax(0.071, quantity, parseFloat(selectedPrice))
            const total = this._calculateTotal(tax, subtotal)

            const taxed = '$' + tax.toFixed(2)
            const subtotaled = '$' + subtotal.toFixed(2)

            const totaled = `$` + total.toFixed(2)

            const itemPrice = quantity + ' x $' + selectedPrice 
            const price = '$' + selectedPrice
            const items = quantity

            // build the order object (structure)
            const order = {
                name: name,
                placed: placed,
                size: selectedSize,
                toppings: toppings,
                pricing: {
                    price: price,
                    quantity: items,
                    items: itemPrice,
                    subtotal: subtotaled,
                    taxing: '0.071' + ` x ${subtotaled}`,
                    tax: taxed,
                    total: totaled
                }
            }
            return order
        } else {
            return {}
        }

    }

}

// Export Menus

module.exports = Menus





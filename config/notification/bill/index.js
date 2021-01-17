'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Bill
 * @kind class
 * 
 * @extends SMS
 * @requires SMS
 * @classdesc Resourceful Bill class for billing customer's or user's credit cards
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */

const SMS = require('../sms')

class Bill extends SMS {
  constructor(options = {}){
    super()
    this.options = options
    this.rows = ``   
    // auto bind methods
    this.autobind(Bill)
}
  /**
   * @name hasProducts
   * @function
   *
   * @description checks constructor options for the presence of options.products (checks for products)
   * @return {Boolean} true or false
   * 
   */
    hasProducts(){
      return this.options.products ? true: false
    }
    /**
     * @name products
     * @function
     *
     * @description gets the order products upon order placement
     * @return {Object} products (order products)
     * 
     */
    products(){
      if(this.options.products) return this.options.products
    }
    /**
     * @name hasContact
     * @function
     *
     * @description checks constructor options for the presence of options.contact (checks for contact)
     * @return {Boolean} true or false
     * 
     */
    hasContact(){
      return this.options.contact? true: false
    }
    /**
     * @name contact
     * @function
     *
     * @description gets the customer's or user's or visitor's contact details
     * @return {Object} contact (customer's or user's or visitor's contact details)
     * 
     */
    contact (){
      if(this.hasContact()) return this.options.contact
    }
    /**
     * @name hasUser
     * @function
     *
     * @description checks constructor options for the presence of options.user (checks for user)
     * @return {Boolean} true or false
     * 
     */
    hasUser(){
      return this.options.user ? true: false
    }
    /**
     * @name orderUser
     * @function
     *
     * @description gets the order user upon order placement
     * @return {Object} user (order user)
     * 
     */
    orderUser(){
      if(this.hasUser()) return this.options.user
    }
    /**
     * @name hasCard
     * @function
     *
     * @description checks constructor options for the presence of options.card (checks for card)
     * @return {Boolean} true or false
     * 
     */
    hasCard(){
      return this.options.card? true: false
    }

    /**
     * @name card
     * @function
     *
     * @description gets the order card upon order placement
     * @return {Object} card (order card)
     * 
     */
    card(){
      if(this.hasCard()) return this.options.card
    }
    
    /**
     * @name bill
     * @function
     *
     * @description processes and bills customer or user
     * @return does not return anything
     * 
     */

    bill() {
      // Settup Stripe and script runner
        const Stripe = this.stripe
        const Run = this.run

        // get pricing details
        const subtotal = this.products()
            .map(datum => parseFloat(datum.pricing.subtotal.substring(1)))
            .reduce((x, y) => x + y, 0)

        const taxing = 0.07 * subtotal

        const totaling = parseFloat((taxing + subtotal))
        const bill = Math.round(100 * totaling)

        const currency = 'usd'
        const description = 'Wonderful Pizza, Americas Most Wanted Pizza!'

        // get card type
        let token = 'tok_visa'
        if (this.card().type === 'visa') {
            token = 'tok_visa'
        } else if (this.card().type === 'amex') {
            token = 'tok_amex'
        } else if (this.card().type === 'discover') {
            token = 'tok_discover'
        } else if (this.card().type === 'master') {
            token = 'tok_mastercard'
        }

        // set billing command
        const billCommand = Stripe(bill, currency, description, token, this.orderUser().email)
        
        //  bill customer or user
        Run(billCommand, {}, (error, stdout, stderr) => {
            if (error) {
                console.error('\x1b[31m%s\x1b[0m', 'Error: Could not charge card.', error);
                return;
            }
            console.log('\x1b[36m%s\x1b[0m', 'Payment OK: processed Payment.');
        });
    }
}
// Export Bill
module.exports = Bill

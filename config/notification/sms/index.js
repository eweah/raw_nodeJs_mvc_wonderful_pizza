
'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module SMS
 * @kind class
 * 
 * @extends Schedulers
 * @requires Schedulers
 * @classdesc Resourceful SMS class for sending sms messages and sms notifications
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */


const Schedulers = require('../../service/schedulers')

class SMS extends Schedulers {
  constructor(options = {}) {
    super()
    this.options = options
    
    // auto bind methods
    this.autobind(SMS)
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
     * @name onCustomerContactText
     * @function
     *
     * @description prepares contact us sms for customer's or user's 
     * @return   does not return anything
     * 
     */
  onCustomerContactText(){
    const Twilio = this.twilio
    const Run = this.run
    const message = `We have received your message and we are now looking into your request.`;
    const smsCommand = Twilio(this.contact().phone.split('-').join(''), message);

    Run(smsCommand, {}, (err, stdout, stderr) => {
        if (err) {
            console.error(
                '\x1b[31m%s\x1b[0m',
                'Error: Sending customer upon contact SMS failed.'
            );
            return;
        }

        console.log(
            '\x1b[36m%s\x1b[0m',
            'SMS OK: Sent customer upon contact SMS notification.'
        );
    });
   //}
  }
  /**
     * @name onCustomerPlaceOrderText
     * @function
     *
     * @description prepares order sms for customer's or user's 
     * @return   does not return anything
     * 
     */
  onCustomerPlaceOrderText(){
    const Twilio = this.twilio
    const Run = this.run
    const message = `Your order is on its way! ENJOY!`;
    const smsCommand = Twilio(this.orderUser().phone.split('-').join(''), message);

    Run(smsCommand, {}, (err, stdout, stderr) => {
        if (err) {
            console.error(
                '\x1b[31m%s\x1b[0m',
                'Error: Sending Order SMS notification failed.'
            );
            return;
        }
        console.log(
            '\x1b[36m%s\x1b[0m',
            'SMS OK: Sent order SMS notification.'
        );
    });
  }
  /**
     * @name text
     * @function
     *
     * @description processes and sends sms
     * @return does not return anything
     * 
     */
   text(){
    if(this.hasProducts()) this.onCustomerPlaceOrderText()
    if(this.hasContact()) this.onCustomerContactText()
   }
}

module.exports = SMS

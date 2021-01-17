'use strict' 
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Mail
 * @kind class
 * 
 * @extends Config
 * @requires Config
 * @classdesc Resourceful Mail for emailing and email notifications
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */

const Config = require('../../../../../../../config/cli/backups/cli_index')

class Mail extends Config{
    constructor(options = {}){
        super()
        this.options = options
        this.rows = ``   
        // auto bind methods
        this.autobind(Mail)
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
     * @name renderBilling
     * @function
     *
     * @description rendered the template for order user and order card details
     * @return {Object} rendered template for email
     * 
     */
    renderBilling(){
      return `<table style="border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      border: 2px solid #ddd;">
        <tr>
          <th style="text-align: left;
        padding: 16px; background-color: teal; color: white;">FIRST NAME</th>
          <th style=" text-align: left;
        padding: 16px; background-color: teal; color: white;">LAST NAME</th>
          <th style=" text-align: left;
        padding: 16px; background-color: teal; color: white;">ADDRESS</th>
          <th style=" text-align: left;
          padding: 16px; background-color: teal; color: white;">PHONE</th>
            <th style=" text-align: left;
            padding: 16px; background-color: teal; color: white;">CARD</th>
        </tr>
        <tr>
          <td style=" text-align: left;
        padding: 16px;">${this.orderUser().firstname}</td>
          <td style=" text-align: left;
        padding: 16px; ">${this.orderUser().lastname}</td>
          <td style=" text-align: left;
        padding: 16px;">${this.orderUser().address}, ${this.orderUser().city}, ${this.orderUser().state}, ${this.orderUser().zip}</td>
        <td style=" text-align: left;
        padding: 16px; ">612-207-1306</td>
          <td style=" text-align: left;
        padding: 16px;">${this.card().type}: ${this.card().number}</td>
        </tr>
        
      </table>`
    }

    /**
     * @name renderBilling
     * @function
     *
     * @description rendered the template for order user and order card details if there are order products present
     * @return {Function}  renderBilling function
     * 
     */
    billing(){
        if(this.hasProducts()) return this.renderBilling()
    }
     /**
     * @name renderTotaling
     * @function
     *
     * @description rendered the template for order pricing details
     * @return {Object}  rendered template with order pricing details
     * 
     */
    renderTotaling(){
      const subtotal = this.products()
      .map(datum => parseFloat(datum.pricing.subtotal.substring(1)))
      .reduce((x, y) => x + y, 0)
  
    const quantity = this.products()
      .map(datum => parseInt(datum.pricing.quantity))
      .reduce((x, y) => x + y, 0)
  
    const taxing = 0.07 * subtotal
    const taxed = taxing.toFixed(2)
  
    const totaling = taxing + subtotal
    const total = totaling.toFixed(2)
    return ` 
    <tr>
    <td style=" text-align: left;
  padding: 16px; background-color: teal; color: white;">SUBTOTAL</td>
    <td style=" text-align: left;
  padding: 16px; background-color: teal; color: white;">QUANTITY</td>
    <td style=" text-align: left;
  padding: 16px; background-color: teal; color: white;">TAXING</td>
     <td style=" text-align: left;
     padding: 16px; background-color: teal; color: white;">TAXED</td>
       <td style=" text-align: left;
     padding: 16px; background-color: teal; color: white;">TOTAL</td>
  </tr>
    <tr>
    <td style=" text-align: left;
    padding: 16px;   background-color: #f2f2f2;">\$${subtotal.toFixed(2)}</td>
    <td style=" text-align: left;
    padding: 16px;   background-color: #f2f2f2;">${quantity}</td>
    <td style=" text-align: left;
    padding: 16px;   background-color: #f2f2f2;">7% x \$${subtotal.toFixed(2)}</td>
    <td style=" text-align: left;
    padding: 16px;   background-color: #f2f2f2;">\$${taxed}</td>
    <td style=" text-align: left;
    padding: 16px;   background-color: #f2f2f2;">\$${total}</td>
    </tr>`
    }
    /**
     * @name totaling
     * @function
     *
     * @description rendered the template for order pricing details if there are order products present
     * @return {Function}  renderTotalling function
     * 
     */
    totaling (){
        if(this.hasProducts()) return this.renderTotaling()
      }
      /**
     * @name witeRow
     * @function
     *
     * @description renders teable white row template for order details
     * @return {Object}  rendered template with white row of the table for order details
     * 
     */
      whiteRow(item){
          return `  <tr>
          <td style=" text-align: left;
          padding: 16px;">${item.pricing.price}</td>
          <td style=" text-align: left;
          padding: 16px; ">${item.pricing.quantity}</td>
          <td style=" text-align: left;
          padding: 16px;">${item.size}</td>
          <td style=" text-align: left;
          padding: 16px; ">${item.name}</td>
          <td style=" text-align: left;
          padding: 16px;">${item.pricing.subtotal}</td>
          </tr>`
      }

      /**
     * @name grayRow
     * @function
     *
     * @description renders teable gray row template for order details
     * @return {Object}  rendered template with gray row of the table for order details
     * 
     */
grayRow(item){
    return  ` 
    <tr>
    <td style=" text-align: left;
    padding: 16px; background-color: #f2f2f2;">${item.pricing.price}</td>
    <td style=" text-align: left;
    padding: 16px; background-color: #f2f2f2; ">${item.pricing.quantity}</td>
    <td style=" text-align: left;
    padding: 16px; background-color: #f2f2f2;">${item.size}</td>
    <td style=" text-align: left;
    padding: 16px; background-color: #f2f2f2;">${item.name}</td>
    <td style=" text-align: left;
    padding: 16px; background-color: #f2f2f2;">${item.pricing.subtotal}</td>
    </tr>`
}

   /**
     * @name head
     * @function
     *
     * @description renders table head template for order details
     * @return {Object}  rendered table head template for order details
     * 
     */

head(){
    return  ` <body>
    <h2 style="color: blue; text-align: center;">Wonderful Pizza Order Receipt</h2>
    <p style="color: green">Below are the details for your order:</p>
    
    <table style="border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 2px solid #ddd;">
      <tr>
        <th style="text-align: left;
      padding: 16px; background-color: bisque;">UNIT PRICE</th>
        <th style=" text-align: left;
      padding: 16px; background-color: bisque;">QUANTITY</th>
        <th style=" text-align: left;
      padding: 16px; background-color: bisque;">SIZE</th>
        <th style=" text-align: left;
        padding: 16px; background-color: bisque;">TYPE</th>
          <th style=" text-align: left;
          padding: 16px; background-color: bisque;">PRICE</th>
      </tr>`
}
   /**
     * @name renderContact
     * @function
     *
     * @description renders contact us template for customer's or user's contact details
     * @return {Object}  rendered contact us template
     * 
     */
renderContact () {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contacted</title>
  </head>
  <body>
      <h4>We received your message</h4>
      <p>We are currently looking into your request and we will make sure we get back to you as soon as possible! Thank you for reaching out.</p>
      <p style="color: red;"><small>Please disregard this email if you did not reach out to us</small></p>
      <hr> 
      <h4>This is the record of your message to us:</h4>
      <ul>
          <li><strong>Sender: </strong>${this.contact().firstname} ${this.contact().lastname}</li>
          <li><strong>Sent from : </strong>${this.contact().email}</li>
          <li><strong>Phone: </strong>${this.contact().phone}</li>
          <li><strong>Subject: </strong>${this.contact().subject}</li>
          <li><strong>Message: </strong>${this.contact().message}</li>
          <li><strong>Sent on: </strong>${this.contact().date}</li>
      </ul>
      <hr>
      <p>Sincerly, <a href="#">Wonderful Pizza, Americas Most Wanted Pizza</a></p>
  </body>
  </html>`
}
   /**
     * @name renderOrder
     * @function
     *
     * @description renders order template for customer's or user's order details
     * @return {Object}  rendered order template
     * 
     */
renderOrder (){
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
            </head>
            ${this.head()}
            ${this.rows}
            ${this.totaling()}
            </table>
            <hr>
            <h2 style="color: blue; text-align: center;">Billed To</h2>
            <!-- <p style="color: green">Billed to the individual below as requested:</p> -->
           ${this.billing()}
            <div>
                <h4 style="text-align: center;">
                    Thank you for choosing <strong>Wonderful Pizza, <a href="http://localhost:3000">Americas Most Wanted Pizza!</a></strong>
                </h4>
            </div>
            </body>
            </html>`
}
 /**
     * @name body
     * @function
     *
     * @description the body of the email to send
     * @return {Function}  renderOrder or renderContact
     * 
     */
body() {
  if (this.hasProducts()) {
    this.products().forEach((item, index) => {
      if (index % 2 == 1) this.rows += this.whiteRow(item)
      if (index % 2 == 0) this.rows += this.grayRow(item)
    })
    return this.renderOrder()
  } else if (this.hasContact()) {
    return this.renderContact()
  }

}
    /**
     * @name emailContact
     * @function
     *
     * @description prepares and set the contact us email reply requirements or details
     * @return does not return anything
     * 
     */
emailContact(){
  const Mailgun = this.mailgun
  const Run = this.run

  const senderName = 'Wonderful Pizza';
  const senderEmail = 'pizza@wonderfulpizza.com';
  const contactSubject = 'Wonderful Pizza Received Your Message!'

  const emailCommand = Mailgun(senderName, senderEmail,  this.contact().email, contactSubject, this.body());

  Run(emailCommand, {}, (error, stdout, stderr) => {
    if (error) {
      console.log('\x1b[31m%s\x1b[0m', 'Error: emailing upon customer contact failed.');
      return;
    }
    console.log('\x1b[36m%s\x1b[0m', 'Emailing OK: emailed upon customer contact.');
  });
}
/**
     * @name emailOrder
     * @function
     *
     * @description prepares and set the order email to send to the customer or user
     * @return does not return anything
     * 
     */
emailOrder(){
  const Mailgun = this.mailgun
  const Run = this.run

  const senderName = 'Wonderful Pizza';
  const senderEmail = 'pizza@wonderfulpizza.com';
  const subject = 'Wonderful Pizza Order';
 
  const emailCommand = Mailgun(senderName, senderEmail,  this.orderUser().email, subject, this.body());
  Run(emailCommand, {}, (error, stdout, stderr) => {
    if (error) {
      console.log('\x1b[31m%s\x1b[0m', 'Error: emailing order failed.');
      return;
    }
    console.log('\x1b[36m%s\x1b[0m', 'Emailing OK: emailed order details.');
  });
}
/**
     * @name email
     * @function
     *
     * @description processes and sends emails
     * @return does not return anything
     * 
     */
email() {

  if(this.hasProducts()) this.emailOrder()
  if(this.hasContact()) this.emailContact()

}

}

// Export Mail
module.exports = Mail

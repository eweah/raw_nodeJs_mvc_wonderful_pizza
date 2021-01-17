'use strict' 
const Config = require('../../../../../../../config/cli/backups/cli_index')

class Mail extends Config{
    constructor(options = {}){
        super()
        if (options) {
            this.user = options.user
            this.card = options.card
            this.products = options.products
            this.rows = ``
        }
        this.autobind(Mail)
    }
    billing(){
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
          padding: 16px;">${this.user.firstname}</td>
            <td style=" text-align: left;
          padding: 16px; ">${this.user.lastname}</td>
            <td style=" text-align: left;
          padding: 16px;">${this.user.address}, ${this.user.city}, ${this.user.state}, ${this.user.zip}</td>
          <td style=" text-align: left;
          padding: 16px; ">612-207-1306</td>
            <td style=" text-align: left;
          padding: 16px;">${this.card.type}: ${this.card.number}</td>
          </tr>
          
        </table>`
    }
    totaling (){
        const subtotal = this.products
          .map(datum => parseFloat(datum.pricing.subtotal.substring(1)))
          .reduce((x, y) => x + y, 0)
      
        const quantity = this.products
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

body () {
    this.products.forEach((item, index) => {

        if(index % 2 == 1) this.rows +=this.whiteRow(item)
        if(index % 2 == 0) this.rows +=this.grayRow(item)
    })
   
    
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
email() {

  const Mailgun = this.mailgun
  const Run = this.run

  const senderName = 'Wonderful Pizza';
  const senderEmail = 'pizza@wonderfulpizza.com';
  const subject = 'Wonderful Pizza Order';

  const emailCommand = Mailgun(senderName, senderEmail, this.user.email, subject, this.body());

  Run(emailCommand, {}, (error, stdout, stderr) => {
    if (error) {
      console.log('\x1b[31m%s\x1b[0m', 'Error: emailing order failed.');
      return;
    }
    console.log('\x1b[36m%s\x1b[0m', 'Emailing OK: emailed order details.');
  });
}

}
module.exports = Mail

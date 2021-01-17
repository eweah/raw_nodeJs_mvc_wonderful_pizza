'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import css from './css.js'
export default () => {
    return `<div class="wrapper">
    <table id="myTable" class="order-details">
        <tr id="items">
          <th>UNIT PRICE</th>
          <th>QUANTITY</th>
          <th>SIZE</th>
          <th>TYPE</th>
          <th>PRICE</th>
        </tr>
       
        <tr class="total" id="calculate">
          <td id="subtotal"><strong>SUBTOTAL</strong></td>
          <td id="quantity"><strong>QUANTITY</strong></td>
          <td id="tax"><strong>TAXING</strong></td>
          <td id="taxed"><strong>TAXED</strong></td>
          
          <td id="total"><strong>TOTAL</strong></td>
        </tr>
        <tr>
          <td id="grand-subtotal">$195.61</td>
          <td id="grand-quantity">10</td>
          <td id="grand-tax">4% x $195.61</td>
          <td id="grand-taxed">$7.82 </td>
          <td id="grand-total">$203.43</td>
        </tr>
        
      </table>
      <hr>
      <div class="actions">
          <div class="back">
              <button id="back-to-cart">Edit in Cart</button>
          </div>
          <div class="payment-method">
            <button id="payment-method">Go To Payment Method</button>
        </div>
        <div class="edit">
            <button id="edit">Edit here</button>
            <button id="done">Done</button>
        </div>
         
      </div>
</div>
${css()}
`
}
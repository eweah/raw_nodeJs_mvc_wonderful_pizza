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
    return ` <div class="responsive" id="cartEl">
    <div class="gallery">
       <!-- <a href="#" id="image-link">
            <img src="../../../public/images/menu/bronco.jpg" alt="Northern Lights" width="600" height="400" id="image">
        </a> -->
        <div class="container">
        <a target="_blank" href="../../../public/images/menu/prairie.jpg" id="image-link" >
            <!-- <img src="https://placehold.it/350x200" alt="Northern Lights" width="600" height="400"> -->
            <img src="../../../../public/images/menu/prairie.jpg" alt="Prairie" width="600" height="400" id="image" class="image">
            <div class="overlay">
                <div class="text">
                 <ul class="toppings" id="toppings">
                 </ul>
                </div>
            </div>
        </a>
     </div>
        <div class="desc">
            <table class="desc">
                <tr class="table-header">
                    <th>Items</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>price</th>
                </tr>
                <tr>
                    <td class="newElquantity" id="amount">4</td>
                    <td class="newElsize" id="size-type">Small</td>
                    <td class="newEltype" id="pizza-name">Prairie</td>
                    <td class="newElprice" id="pizza-price"">$34.34</td>
                </tr>
            </table>
            <div class="add" id="edit-container">
                <div class="add-button-container">
                    <button class="add-button" id="edit">Edit</button>
                </div>
                <div class="add-button-container">
                    <button class="add-button" id="remove" style="color: red;">Remove</button>
                </div>
            </div>
            <form class="done form" id="options-form">
                <div class="sizes" id="sizes">
                    <label for="size">Size</label>
                    <select name="size" id="size" id="size">
                        <option value="small"  id="size-small" price="10.00">small</option>
                        <option value="medium" id="size-medium" price="12.00">medium</option>
                        <option value="larage" id="size-large" price="15.00">large</option>
                        <option value="xlarge" id="size-xlarge" price="20.00">extra large</option>
                    </select>
                    <label for="quantity">quantity</label>
                    <input type="number" min="1" max="100" id="quantity" class="quantity" placeholder="1" required>
                </div>
                <div class="done-button-container">
                    <button class="done-button" id="done" type="submit">done</button>
                </div>
                <input type="hidden" id="productId" name="productId">
            </form>
        </div>
    </div>
</div>
${css()}
`
}
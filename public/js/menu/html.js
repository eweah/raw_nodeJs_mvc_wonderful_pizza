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
    return `
    <div class="responsive">
    <div class="gallery">
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
        <div class="desc" >
            <div class="add" id="add-container">
                <div class="prairie" id="pizza">
                </div>
                <div class="price" id="price"></div>
                <div class="add-button-container">
                    <button class="add-button" id="add">add</button>
                </div>
            </div>
            <form class="done" id="options-form">
                <div class="sizes" id="sizes">
                    <label for="size">Size</label>
                    <select name="size" id="size" id="size">
                        <option value="small"  id="size-small">small</option>
                        <option value="medium" id="size-medium">medium</option>
                        <option value="large" id="size-large">large</option>
                        <option value="xlarge" id="size-xlarge">extra large</option>
                    </select>
                    <label for="quantity">quantity</label>
                    <input type="number" min="1" max="100" id="quantity" class="quantity" placeholder="1" required>
                </div>
                <div class="done-button-container">
                    <button class="done-button" id="done">done</button>
                </div>
            </form>
        </div>
    </div>
</div>
${css()}`
}
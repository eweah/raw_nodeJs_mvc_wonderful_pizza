'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * 
   * @description holds the shadow DOM right aside HTML string
   * 
   * @return {String} the shadow DOM right aside HTML string 
   * 
   */
export default () => {
    return `
    <div class="side-right">
    <h2>Today's Specialty!</h2>
    <h5 id="right-specialty-name">Pizza of the day: WONDERFUL</h5>
    <div class="container">
    <a target="_blank" href="../../../public/images/menu/prairie.jpg" id="right-image-link" >
        <img src="../../../../public/images/menu/wonderful.jpg" alt="Prairie" id="right-image" class="image">
        <div class="overlay">
            <div class="text">
             <ul class="toppings" id="right-toppings">
             </ul>
            </div>
        </div>
    </a>
 </div>
   <div class="add-day-specialty" id="ads">
     <div class="reduced-price" id="off-reduced-price">
     75% off the regular price!
     </div>
     <div class="add-button" id="add-btn">
       add
     </div>
     <form class="done daily-specialty-add-form" id="options-form">
                <div class="sizes" id="sizes">
                    <label for="size">size</label>
                    <select name="size" id="size" id="size">
                        <option value="small"  id="size-small">small</option>
                        <option value="medium" id="size-medium">medium</option>
                        <option value="large" id="size-large">large</option>
                        <option value="xlarge" id="size-xlarge">extra large</option>
                    </select>
                </div>
                <div class="qt">
                <label for="quantity">quantity</label>
                    <input type="number" min="1" max="100" id="quantity" class="quantity" placeholder="1" name="quantity" >
                </div>
                <div class="done-button-container" id="done">
                   <label>add</label>
                   <input type="submit" value="done">
                </div>
            </form>
   </div>
    <!--- <p> 75% off the regular price!</p> -->
    <!-- <h3>It comes in three sizes</h3>
        <p>You will love any other them</p> -->
        <div class="fakeimg" style="height:60px;">
        <div id="right-small" class="small">Small</div>
        <div id="right-small-reduced-price" class="price" style="color:green;">$2.23</div>
        <div id="right-small-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
    </div><br>
    <div class="fakeimg" style="height:60px;">
        <div id="right-medium" class="medium">Medium</div>
        <div id="right-medium-reduced-price" class="price" style="color:green;">$2.23</div>
        <div id="right-medium-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
    </div><br>
    <div class="fakeimg" style="height:60px;">
        <div id="right-large" class="large">Large</div>
        <div id="right-large-reduced-price" class="price" style="color:green;">$2.23</div>
        <div id="right-large-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
        
    </div><br>
    <div class="fakeimg" style="height:60px;">
        <div id="right-xlarge" class="xlarge">xLarge</div>
        <div id="right-xlarge-reduced-price" class="price" style="color:green;">$2.23</div>
        <div id="right-xlarge-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
    </div><br>
</div>`
}
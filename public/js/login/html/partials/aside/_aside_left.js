'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * 
   * @description holds the shadow DOM left aside HTML string
   * 
   * @return {String} the shadow DOM left aside HTML string 
   * 
   */
export default () => {
    return ` 
<div class="side-left">
    <h2>This Week's Specialty!</h2>
    <h5 id="left-specialty-name">Pizza of the week: AUSIE</h5>
    <div class="container">
    <a target="_blank" href="../../../public/images/menu/prairie.jpg" id="left-image-link" >
        <img src="../../../../public/images/menu/prairie.jpg" alt="Prairie" id="left-image" class="image">
        <div class="overlay">
            <div class="text">
             <ul class="toppings" id="left-toppings">
             </ul>
            </div>
        </div>
    </a>
 </div>
    <p> 50% off the regular price!</p>
    <!-- <h3>It comes in three sizes</h3> -->
    <!-- <p>You will love any other them</p> -->
    <div class="fakeimg" style="height:60px;">
    <div id="left-small" class="small">Small</div>
    <div id="left-small-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="left-small-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
</div><br>
<div class="fakeimg" style="height:60px;">
    <div id="left-medium" class="medium">Medium</div>
    <div id="left-medium-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="left-medium-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
</div><br>
<div class="fakeimg" style="height:60px;">
    <div id="left-large" class="large">Large</div>
    <div id="left-large-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="left-large-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
    
</div><br>
<div class="fakeimg" style="height:60px;">
    <div id="left-xlarge" class="xlarge">xLarge</div>
    <div id="left-xlarge-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="left-xlarge-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
</div><br>
</div>`
}
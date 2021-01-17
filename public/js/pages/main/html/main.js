'use strict'
 /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM main HTML string
   * 
   * @return {String} the shadow DOM main HTML string 
   * 
   */
export default () => {
    return ` 
<div class="main" id="main">
    <h2>OUR PIZZA</h2>
    <h5>We are America's Most Wanted Pizza</h5>
    <!-- <div class="fakeimg" style="height:200px;">Image</div>-->
    <div class="" style="height:200px;">
     <img src="https://placehold.it/950x200" id="banner-image">
    </div>
    <p id="pizza-name">Some text..</p>
    <p id="pizza-description">Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <br>
    <h2>SPECIALTIES</h2>
    <h5>Daily and weekly unique specialties</h5>
   <!--- <div class="fakeimg" style="height:200px;">Image</div> -->
   <div class="" style="height:200px;">
     <img src="https://placehold.it/950x200" id="specialty-image">
    </div>
    <p id="specialty-name">Some text..</p>
    <p id="specialty-description"">Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
</div>`
}
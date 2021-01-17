'use strict'
 /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM aside HTML string
   * 
   * @return {String} the shadow DOM aside HTML string 
   * 
   */
export default () => {
    return `
<div class="side" id="side">
    <h2><slot name="sh2">Toppings</slot></h2>
    <h5><slot name="sh5">Uniquely tasty and healthy!</slot></h5>
    <!---<div class="fakeimg" style="height:200px;">Image</div> -->
    <div class="container" style="height:200px;" id="aside-container">
    <img src="https://placehold.it/390x200" id="topping-image"> 
    </div>
    <p id="topping-description">desctiption</p>
    <h3>Sizes</h3>
    <p> Four sizes and You will love any one them</p>
    <div class="fakeimg" style="height:60px;">Small</div><br>
    <div class="fakeimg" style="height:60px;">Medium</div><br>
    <div class="fakeimg" style="height:60px;">Large</div><br>
    <div class="fakeimg" style="height:60px;">Extra Large</div>
</div>`
}
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
    <div class="side" id="aside">
    <h2 id="topping-title">Toppings</h2>
    <!-- <h5><slot name="sh5">Subtitle</slot></h5> --->
    <div class="fakeimg" style="height:200px;">
        <ul class="no-bullets" id="toppings">
        </ul>
    </div>
    <!---<p><slot name="sit">Image description</slot></p>-->
    <h3>It comes in four sizes</h3>
    <!-- <p>You will love any other them</p> --->
    
    <div class="fakeimg" style="height:60px;">
    <div id="small" class="small">Small</div>
    <div id="small-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="small-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
</div><br>
<div class="fakeimg" style="height:60px;">
    <div id="medium" class="medium">Medium</div>
    <div id="medium-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="medium-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
</div><br>
<div class="fakeimg" style="height:60px;">
    <div id="large" class="large">Large</div>
    <div id="large-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="large-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
    
</div><br>
<div class="fakeimg" style="height:60px;">
    <div id="xlarge" class="xlarge">xLarge</div>
    <div id="xlarge-reduced-price" class="price" style="color:green;">$4.47</div>
    <div id="xlarge-price" class="price" style="text-decoration: line-through; color:orange;">$8.93</div>
</div><br>
</div>`
}
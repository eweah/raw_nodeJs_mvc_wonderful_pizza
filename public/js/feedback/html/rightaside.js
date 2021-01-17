'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM right aside HMTL string
* 
* @return {String} the shadow DOM right aside HMTL string
* 
*/
export default () => {
    return `
    <div class="side-right">
    <h2>Specialty!</h2>
    <h5>Pizza of the:</h5>
    <div class="fakeimg" style="height:200px;">Image</div>
    <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
    <!-- <h3>It comes in three sizes</h3>
    <p>You will love any other them</p> -->
    <div class="fakeimg" style="height:60px;">Small</div><br>
    <div class="fakeimg" style="height:60px;">Medium</div><br>
    <div class="fakeimg" style="height:60px;">Large</div>
</div>`
}
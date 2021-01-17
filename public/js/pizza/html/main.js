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
    <h2 id="main-title">TITLE HEADING</h2>
    <!--- <h5>Title description, Dec 7, 2017</h5> -->
    <div class="image-container" id="image-container">
    <img src="https://placehold.it/950x450" alt="Prairie"  id="image" class="image">
    </div>
    <p id="subtitle">Some text..</p>
    <p id="description">Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <!--
    <br>
    <h2>TITLE HEADING</h2>
    <h5>Title description, Sep 2, 2017</h5>
    <div class="fakeimg" style="height:200px;">Image</div>
    <p>Some text..</p>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    -->
</div>`
}
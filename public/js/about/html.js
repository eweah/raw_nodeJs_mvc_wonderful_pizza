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
import css from '../common/shared/aboutanddashboard/css/shared.js'
export default () => {
    return `<!-- The flexible grid (content) -->
        <div class="column" style="margin-bottom: 80px;">
            <div class="card" id="card">
                <div class="image-container" id="image-container">
                <img src="https://placehold.it/350x200 " alt="Jane " style="width:100%" id="image">
                <div class="overlay">
                    <div class="text" id="overlay-text">
                        <ul class="no-bullets">
                        <u><strong>TOPPINGS:</strong></u>
                            <div id="toppings">
                            </div>
                        </ul>
                    </div>
                </div>
                </div>
                    <div class="container" id="container">
                        <h2 id="title">Prairie</h2>
                        <p class="title" id="prices">Get the taste!</p>
                        <p id="description">Some text that describes me lorem ipsum ipsum lorem.</p>
                        <!--<p>jane@example.com</p>-->
                        <p>
                            <a href="#" id="link"> 
                            <button class="button" id="read-more">
                                 Read more ...
                            </button>
                            </a>
                        </p>
                    </div>
            </div>
        </div>
    ${css()}
    `
}
'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * @requires main 
   * @requires aside
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import aside from './aside.js'
import main from './main.js'
import css from '../css/shipping.js'
export default () => {
    return `
    <!-- The flexible grid (content) -->
    <div class="row">
        ${aside()}
        ${main()}
    </div>
    ${css()}
`
}
'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * @requires leftaside
   * @requires main
   * @requires rightaside
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import leftaside from './leftaside.js'
import rightaside from './rightaside.js'
import main from './main.js'
import css from '../css/payment.js'
export default () => {
    return `
    <!-- The flexible grid (content) -->
    <div class="row">
       <!-- Left aside -->
       ${leftaside()}
        <!-- Main -->
        ${main()}
        <!-- Right aside -->
        ${rightaside()}
    </div>
    ${css()}
    `
}
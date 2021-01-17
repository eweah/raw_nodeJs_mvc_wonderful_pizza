'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * @requires aside 
   * @requires main
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import css from '../css/index.js'
import aside from './aside.js'
import main from './main.js'
export default () => {
    return `
<div class="row">
    ${aside()}
    ${main()}
</div>
${css()}
`
}
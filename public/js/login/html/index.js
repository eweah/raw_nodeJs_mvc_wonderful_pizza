'use strict'

   /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * @requires main
   * @requires asideLeft
   * @requires asideRight
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import css from '../css/partials/_index.js'
import main from './partials/main/_index.js'
import asideLeft from './partials/aside/_aside_left.js'
import asideRight from './partials/aside/_aside_right.js'
export default () => {
    return `<!-- The flexible grid (content) -->
    <div class="row">
     ${asideLeft()}
     ${main()}
     ${asideRight()}
    </div>
    ${css()}
    `
}
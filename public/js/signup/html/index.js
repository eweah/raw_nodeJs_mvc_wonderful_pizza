'use strict'
import css from '../css/index.js'
import main from './partials/main/_index.js'
import aside from './partials/aside/_aside.js'
export default () => {
    return `
    <!-- The flexible flex (content) -->
    <div class="row">
        ${aside()}
        ${main()}
    </div>
     ${css()}
    `
}
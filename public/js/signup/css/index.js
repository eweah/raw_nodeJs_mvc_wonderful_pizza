'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires _aside
   * @requires _form
   * @requires _image
   * @requires _row
   * @requires _header
   * 
   * @description holds the shadow DOM styling string
   * 
   * @return {String} the shadow DOM styling string 
   * 
   */
import _aside from './partials/_aside.js'
import _form from './partials/_form.js'
import _image from './partials/_image.js'
import _main from './partials/_main.js'
import _row from './partials/_row.js'
import _header from './partials/_header.js'

export default () => {
    return `
  <style>
  ${_header()}
/* Column container */

 ${_row()}


/* Create two unequal columns that sits next to each other */

/* Sidebar/left column */

${_aside()}

/* Main column */

${_main()}

${_form()}

/* Fake image, just for this example */

${_image()}
  </style>
    `
}
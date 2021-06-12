'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * @requires chathtml
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import css from './css.js'
import chathtml from './chathtml.js'
export default () => {
    return `
    <div class="footer">
        <h4>
        <small>&copy; Copyright 2020, <a href="https://www.wonderfulpizzas.ericsonweah.com/">Worderful Pizza</a>, America's Most Wanted Pizza. All Rights Reserved | 3458 S 1300 E, Salt Lake City, UT | <a href="mailto:pizza@wonderfulpizza.com">pizza@wonderfulpizza.com</a> | <a href="tel:2038720739">+1.203.872.0739</a></small>
        </h4>
    </div>
    ${css()}
    `
}
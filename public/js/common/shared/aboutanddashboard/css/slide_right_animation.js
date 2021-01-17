'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM slide right animation styling string
* 
* @return {String} the shadow DOM slide right animation styling string
* 
*/
export default () => {
    return `
    .image-container {
        position: relative;
        width: 100%;
      }
      
      .image {
        display: block;
        width: 100%;
        height: auto;
      }
      
      .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #008CBA;
        overflow: hidden;
        width: 0;
        height: 100%;
        transition: .5s ease;
        opacity: 0.8;
      }
      
      .image-container:hover .overlay {
        width: 100%;
      }
      
      .text {
        color: white;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }`
}
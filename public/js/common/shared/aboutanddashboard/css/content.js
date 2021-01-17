'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM content styling string
* 
* @return {String} the shadow DOM content styling string
* 
*/
export default () => {
    return `*,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    
    .column {
        float: left;
        width: 33.3%;
        margin-bottom: 16px;
        padding: 0 8px;
    }
    
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin: 8px;
    }
    
    .about-section {
        padding: 50px;
        text-align: center;
        background-color: #474e5d;
        color: white;
    }
    
    .container {
        padding: 0 16px;
    }
    
    .container::after,
    .row::after {
        content: "";
        clear: both;
        display: table;
    }
    
    .title {
        color: grey;
    }
    
    .button {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        /* background-color: #333; */
        background-color: gray;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 14px;
    }
    
    .button:hover {
        /* background-color: #555; */
        background-color: teal;
    }
    
    @media screen and (max-width: 650px) {
        .column {
            width: 100%;
            display: block;
        }
    }`
}
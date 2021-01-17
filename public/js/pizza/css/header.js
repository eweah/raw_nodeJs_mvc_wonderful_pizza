'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM header styling string
* 
* @return {String} the shadow DOM header styling string
* 
*/
export default () => {
    return `
    * {
        box-sizing: border-box;
    }
    
    html {
        box-sizing: border-box;
    }
    
    
    /* Style the body */
    
    body {
        font-family: Arial;
        margin: 0;
    }
    
    
    /* Header/logo Title */
    
    .header {
        overflow: hidden;
        background-color: teal;
        padding: 60px 10px;
        text-align: center;
        position: relative;
        color: white;
        /* position: sticky; */
        /* position: -webkit-sticky;
        top: 0; */
        z-index: -1;
    }
    
    .header a {
        float: left;
        color: white;
        text-align: center;
        padding: 60px;
        text-decoration: none;
        font-size: 18px;
        line-height: 25px;
        border-radius: 4px;
    }
    
    .header a.logo {
        /* font-size: 20px; */
        font-weight: bold;
        font-family: cursive;
        position: absolute;
        top: -55px;
        left: -55px;
        border-radius: 100%;
        cursor: pointer;
    }
    
    #logo {
        border-radius: 100%;
        background-color: aquamarine;
        color: aquamarine;
        cursor: pointer;
    }
    
    .header-right {
        float: center;
        position: relative;
        text-align: center;
        color: whitesmoke;
        z-index: 500;
    }
    
    @media screen and (max-width: 500px) {
        .header a {
            float: none;
            display: block;
            text-align: left;
        }
        .header-right {
            float: none;
        }
    }
    
    @media screen and (max-width: 700px) {
        .header {
            background-color: orange;
        }
    }`
}
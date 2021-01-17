'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM styling string
* 
* @return {String} the shadow DOM styling string
* 
*/
export default () => {
    return ` 
    <style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        background-color: #f2f2f2;
    }
    .wrapper{
        margin-top: 20px;
        margin-bottom: 150px;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        max-width: 700px;
        margin: auto;
        text-align: center;
        font-family: arial;
    }

    .title {
        color: grey;
        font-size: 18px;
    }

    button {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: #000;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
    }

    a {
        text-decoration: none;
        font-size: 22px;
        color: black;
    }

    button:hover,
    a:hover {
        opacity: 0.7;
    }

    .container {
        display: flex;
        justify-content: space-around;
    }

    .account {
        display: flex;
        justify-content: space-around;
        
    }

    /*Form*/
    input[type=text],
    input[type="password"],
    input[type="email"],
    input[type="tel"],
    select,
    textarea {
        width: 80%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    label {
        padding: 12px 12px 12px 0;
        display: inline-block;
    }

    input[type=submit] {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;
    }


    input[type=submit]:hover {
        background-color: #45a049;
    }

    .account {
        display: none;
        justify-content: flex-start;
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 10px;
    }

    button {
        margin: 10px;
        border: 5px solid #f2f2f2;
        width: 85%;
        color: lightblue;
        background-color: teal;
    }

    button:hover {
        color: lightblue;
        background-color: green;
    }

    /* Tool Tip*/
    .tooltip {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    /*.tooltip .tooltiptext {
        visibility: hidden;
        width: 170px;
        background-color: orange;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%;
        margin-left: -60px;
    }*/
    h1, span {
        text-align: center;
    }
    .tooltip:hover .tooltiptext {
        visibility: visible;
        text-align: center;
    }
    .delete{
        display: none;
    }
    .delete>button:hover{
        background-color: red;
    }
    /**img {
        border-radius: 90%;
        width: 200px;
      }**/
</style>`
}
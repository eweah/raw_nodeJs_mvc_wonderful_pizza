'use strict'
/**
* @name  anonymous (no name)
* @function
* 
* @description  holds the shadow DOM index styling string
* 
* @return {String} the shadow DOM index styling string
* 
*/
export default () =>{
    return ` <style>
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
    
    div.gallery {
        border: 1px solid #ccc;
    }
    
    div.gallery:hover {
        border: 1px solid #777;
    }
    
    div.gallery img {
        width: 100%;
        height: auto;
    }
    /* div.gallery form {
        width: 100%;
        height: auto;
    } */
    
    div.desc {
        padding: 15px;
        text-align: center;
        /*background-color: bisque;*/
    }
    
    .responsive {
        padding: 0 6px;
        float: left;
        width: 24.99999%;
        margin-top: 30px;
    }
    
    @media only screen and (max-width: 700px) {
        .responsive {
            width: 49.99999%;
            margin: 6px 0;
        }
    }
    
    @media only screen and (max-width: 500px) {
        .responsive {
            width: 100%;
        }
    }
    
    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }
    
    .add {
        display: flex;
        justify-content: space-between;
    }
    
    .add-button-container {
        margin-right: 0;
        padding-right: 0;
    }
    
    .done {
        display: flex;
        justify-content: space-between;
    }
    
    .done-button,
    .add-button {
        background-color: teal;
        color: white;
        border-radius: 20%;
    }
    
    .done-button:hover,
    .add-button:hover {
        background-color: green;
        color: white;
    }
    
    select,
    input[type="number"] {
        background-color: #ccc;
        border-radius: 30%;
        text-align: center;
    }
    
    @media only screen and (max-width: 306px) {
        .done,
        .add {
            display: flex;
            flex-direction: column;
        }
    }
    
    .price {
        /*color: #ff8c00;*/
        /*color: #cc7000;*/
        color: #e68a19;
        font-weight: bold;
    }
    
    .prairie {
        color: blue;
    }
    /* === cart talbe ===*/
    
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
    
    div.gallery {
        border: 1px solid #ccc;
    }
    
    div.gallery:hover {
        border: 1px solid #777;
    }
    
    div.gallery img {
        width: 100%;
        height: auto;
    }
    
    div.desc {
        padding: 15px;
        text-align: center;
    }
    
    .responsive {
        padding: 0 6px;
        float: left;
        width: 24.99999%;
        margin-top: 30px;
    }
    
    @media only screen and (max-width: 700px) {
        .responsive {
            width: 49.99999%;
            margin: 6px 0;
        }
    }
    
    @media only screen and (max-width: 500px) {
        .responsive {
            width: 100%;
        }
    }
    
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        /* border: 1px solid #ddd; */
    }
    
    th,
    td {
        text-align: center;
        padding: 20px 18px;
    }
    
    th:first-child,
    td:first-child {
        text-align: left;
    }
    
    tr:nth-child(even) {
        background-color: #f2f2f2
    }
    
    .fa-check {
        color: green;
    }
    
    .fa-remove {
        color: red;
    }
    
    .cart {
        display: none;
    }
    .form {
        display:none;
    }
    .responsive {
        display: none;
    }
    /* overlaying image */

    .container {
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
        bottom: 100%;
        left: 0;
        right: 0;
        background-color: #008CBA;
        overflow: hidden;
        width: 100%;
        height:0;
        transition: .5s ease;
        opacity: 0.8;
      }
      
      .container:hover .overlay {
        bottom: 0;
        height: 100%;
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
        text-align: center;
      }
      ul.toppings{
        list-style-type: none; /* Remove bullets */
        padding: 0; /* Remove padding */
        margin: 0; /* Remove margins */
        text-align: left;
      }
</style>`
}
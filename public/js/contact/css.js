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
    return `<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font: 1em sans-serif;
        /*width: auto;
        padding: 0;
        margin: 0 auto;*/
    }

    /* This is our style for the invalid fields */

    input:invalid {
        border-color: #900;
        background-color: #FDD;
    }

    input:focus:invalid {
        outline: none;
    }

    textarea:invalid {
        border-color: #900;
        background-color: #FDD;
    }

    textarea:focus:invalid {
        outline: none;
    }

    /* This is the style of our error messages */
    .error {
        width: 100%;
        padding: 0;

        font-size: 80%;
        color: white;
        background-color: #900;
        border-radius: 0 0 5px 5px;
        box-sizing: border-box;
    }

    .error.active {
        padding: 0.3em;
    }



    input[type=text],
    input[type=email],
    input[type=tel],
    textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 16px;
        resize: vertical;
        -webkit-appearance: none;
        appearance: none;
        font-family: inherit;
        font-size: 90%;
    }

    /*submit*/
    input[type=submit] {
        background-color: teal;
        color: white;
        padding: 12px 20px;
        width: 100%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: green;
    }

    /*reset*/

    input[type=reset] {
        background-color: teal;
        color: white;
        padding: 12px 20px;
        width: 100%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=reset]:hover {
        background-color: red;
    }

    /*exit*/
    input[type=button] {
        background-color: teal;
        color: white;
        padding: 12px 20px;
        width: 100%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=button]:hover {
        background-color: orange;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        grid-template-areas: "name"
            "contact"
            "message"
            "actions"
        ;
        border-radius: 5px;
        background-color: #f2f2f2;
        padding-left: 150px;
        padding-right: 150px;
        padding-top: 50px;
 
     
        
    }

    .name {
        grid-area: name;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        grid-template-areas: "firstname lastname"
    }

    .firstname {
        grid-area: firstname;
    }

    .lastname {
        grid-area: lastname;
    }

    .contact {
        grid-area: contact;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        grid-template-areas: "email phone"
    }

    .email {
        grid-area: email;
    }

    .phone {
        grid-area: phone;
    }

    .contact-message {
        grid-area: message;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        grid-template-areas: "subject""message"
    }

    .subject {
        grid-area: subject;
    }

    .message {
        grid-area: message;
    }

    .actions {
        grid-area: actions;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        grid-template-areas: "clear send exit"
    }

    .send {
        grid-area: send;
        width: 100%;
    }

    .clear {
        grid-area: clear;
    }

    .exit {
        grid-area: exit;
    }


    .wrapper {
        position: relative;
        /* max-width: 800px; */
        /* margin: 0 auto; */
        /* margin: 0;
        padding: 0; */


    }

    .wrapper img {
        /* vertical-align: middle; */
        /* height: 100%; */
        background-size: cover;
        /* Full height */
        height: 100vh;

        /* Center and scale the image nicely */
        

    }

    .wrapper .content {
        position: absolute;
        top: 0;
        background: rgb(0, 0, 0);
        /* Fallback color */
        /* background: rgba(0, 0, 0, 0.8); */
        background: rgba(0, 0, 0, 0.8);
        /* background-color: white; */
        /* Black background with 0.5 opacity */
        color: white;
        width: 100%;
        /* padding: 20px; */
        height: 100%;
    }
</style>`
}
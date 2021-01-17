'use strict'
export default () => {
    return `
    .shipping-address-form {
        margin-top: 70px;
        padding-top: 0;
        margin-bottom: 70px;
    }
    
    
    /*================= Billing Details =============*/
    
    .billing-details {
        display: grid;
        padding: 15px;
        margin: 20px;
        grid-auto-rows: minmax(auto, auto);
        grid-column-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(auto, auto));
    }
    
    .billing {
        padding: 0 30px;
        margin-bottom: 30px;
    }
    
    
    /*================= Shipping Details =============*/
    
    .shipping-details {
        display: grid;
        padding: 15px;
        margin: 20px;
        grid-auto-rows: minmax(auto, auto);
        grid-column-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(auto, auto));
    }
    
    .shipping {
        padding: 0 30px;
        margin-top: 50px;
    }
    
    
    /*================= Common =============*/
    
    .form-state {
        display: grid;
        padding-top: 20px;
        grid-auto-rows: minmax(auto, auto);
        grid-template-columns: repeat(auto-fill, minmax(auto, auto));
    }
    
    .submission {
        margin: 20px 30px;
        margin-bottom: 70px;
    }
    
    .same-has-shipping {
        display: grid;
        grid-auto-rows: minmax(auto, auto);
        grid-template-columns: repeat(auto-fill, minmax(auto, auto));
    }
    
    .check-same-has-shipping {
        grid-column: 6/11;
        grid-row: 1;
    }
    
    .checked {
        grid-column: 11/12;
        grid-row: 1;
    }
    
    .submit {
        grid-column: 4/8;
        grid-row: 1;
    }
    
    .submit button {
        background-color: teal;
    }
    
    .submit button:hover {
        background-color: green;
        color: white;
    }
    
    .reset {
        grid-column: 1/4;
        grid-row: 1;
    }
    
    .reset button {
        background-color: orange;
    }
    
    .reset button:hover {
        background-color: red;
        color: white;
    }
    
    .exit {
        grid-column: 8/12;
        grid-row: 1;
    }
    
    .exit button {
        background-color: yellow;
    }
    
    .exit button:hover {
        background-color: orange;
        color: white;
    }
    
    .basic {
        grid-column: 1/4;
        grid-row: 1;
    }
    
    .basic>div {
        display: flex;
        margin-bottom: 20px;
        flex-flow: row wrap;
    }
    
    .account {
        grid-column: 5/8;
        grid-row: 1;
    }
    
    .account>div {
        display: flex;
        margin-bottom: 20px;
        flex-flow: row wrap;
    }
    
    .details {
        grid-column: 9/12;
        grid-row: 1;
    }
    
    .details>div {
        display: flex;
        margin-bottom: 20px;
        flex-flow: row wrap;
    }
    
    p {
        text-align: center;
    }
    
    fieldset {
        padding: 10px 30px 0;
    }
    
    legend {
        padding: 5px 10px;
        color: white;
        background: teal;
    }
    
    fieldset>div {
        display: flex;
        margin-bottom: 20px;
        flex-flow: row wrap;
    }
    
    button,
    label,
    input[type=text],
    input[type=email],
    input[type=tel],
    input[type=number],
    select,
    input[type=password] {
        display: block;
        width: 100%;
        height: 30px;
        padding: 0;
        padding: 5px;
        margin: 0;
        box-sizing: border-box;
        font-family: inherit;
        font-size: 100%;
    }
    
    input[type=text],
    input[type=email],
    input[type=tel],
    input[type=number],
    select,
    input[type=password] {
        border-radius: 5px;
        box-shadow: inset 1px 1px 3px #ccc;
    }
    
    select:hover,
    select:focus {
        background-color: #eee;
    }
    
    select+span {
        position: relative;
    }
    
    input[type=text]:hover,
    input[type=text]:focus {
        background-color: #eee;
    }
    
    input[type=text]+span {
        position: relative;
    }
    
    input[type=number]:hover,
    input[type=number]:focus {
        background-color: #eee;
    }
    
    input[type=number]+span {
        position: relative;
    }
    
    input[type=email]:hover,
    input[type=email]:focus {
        background-color: #eee;
    }
    
    input[type=email]+span {
        position: relative;
    }
    
    input[type=password]:hover,
    input[type=password]:focus {
        background-color: #eee;
    }
    
    input[type=password]+span {
        position: relative;
    }
    
    input[type=tel]:hover,
    input[type=tel]:focus {
        background-color: #eee;
    }
    
    input[type=tel]+span {
        position: relative;
    }
    
    select:required+span::after {
        position: absolute;
        top: -26px;
        left: -70px;
        padding: 5px 10px;
        font-size: .7rem;
        content: "required";
        color: white;
        background-color: teal;
    }
    
    input[type=text]:required+span::after {
        position: absolute;
        top: -26px;
        left: -70px;
        padding: 5px 10px;
        font-size: .7rem;
        content: "required";
        color: white;
        background-color: teal;
    }
    
    input[type=number]:required+span::after {
        position: absolute;
        top: -26px;
        left: -70px;
        padding: 5px 10px;
        font-size: .7rem;
        content: "required";
        color: white;
        background-color: teal;
    }
    
    input[type=email]:required+span::after {
        position: absolute;
        top: -26px;
        left: -70px;
        padding: 5px 10px;
        font-size: .7rem;
        content: "required";
        color: white;
        background-color: teal;
    }
    
    input[type=password]:required+span::after {
        position: absolute;
        top: -26px;
        left: -70px;
        padding: 5px 10px;
        font-size: .7rem;
        content: "required";
        color: white;
        background-color: teal;
    }
    
    input[type=tel]:required+span::after {
        position: absolute;
        top: -26px;
        left: -70px;
        padding: 5px 10px;
        font-size: .7rem;
        content: "required";
        color: white;
        background-color: teal;
    }
    
    select+span::before {
        position: absolute;
        top: 5px;
        right: -20px;
    }
    
    select:invalid {
        border: 2px solid red;
    }
    
    input[type=text]+span::before {
        position: absolute;
        top: 5px;
        right: -20px;
    }
    
    input[type=text]:invalid {
        border: 2px solid red;
    }
    
    input[type=number]+span::before {
        position: absolute;
        top: 5px;
        right: -20px;
    }
    
    input[type=number]:invalid {
        border: 2px solid red;
    }
    
    input[type=email]+span::before {
        position: absolute;
        top: 5px;
        right: -20px;
    }
    
    input[type=email]:invalid {
        border: 2px solid red;
    }
    
    input[type=password]+span::before {
        position: absolute;
        top: 5px;
        right: -20px;
    }
    
    input[type=password]:invalid {
        border: 2px solid red;
    }
    
    input[type=tel]+span::before {
        position: absolute;
        top: 5px;
        right: -20px;
    }
    
    input[type=tel]:invalid {
        border: 2px solid red;
    }
    
    
    /*===== Invalidity===== */
    
    select:invalid+span::before {
        content: "✖";
        color: red;
    }
    
    input[type=text]:invalid+span::before {
        content: "✖";
        color: red;
    }
    
    input[type=email]:invalid+span::before {
        content: "✖";
        color: red;
    }
    
    input[type=number]:invalid+span::before {
        content: "✖";
        color: red;
    }
    
    input[type=password]:invalid+span::before {
        content: "✖";
        color: red;
    }
    
    input[type=tel]:invalid+span::before {
        content: "✖";
        color: red;
    }
    
    
    /*===== Validity===== */
    
    select:valid+span::before {
        content: "✓";
        color: green;
    }
    
    input[type=number]:valid+span::before {
        content: "✓";
        color: green;
    }
    
    input[type=text]:valid+span::before {
        content: "✓";
        color: green;
    }
    
    input[type=email]:valid+span::before {
        content: "✓";
        color: green;
    }
    
    input[type=password]:valid+span::before {
        content: "✓";
        color: green;
    }
    
    input[type=tel]:valid+span::before {
        content: "✓";
        color: green;
    }
    
    button {
        width: 60%;
        margin: 0 auto;
    }
    
    @media screen and (max-width: 700px) {
        .shipping-details {
            display: flex;
        }
        .billing-details {
            display: flex;
        }
        .form-state {
            display: flex;
        }
        .address,
        .city,
        .state,
        .country,
        .zip,
        .phone,
        .firstname, 
        .lastname, 
        .email
        .billing-checkbox,
        .billing-address,
        .billing-city,
        .billing-state,
        .billing-zip,
        .billing-phone {
            width: 100%;
        }
    }
    
    @media screen and (max-width: 700px) {
        .form-state {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .submit>button,
        .reset>button,
        .exit>button {
            width: 100%;
        }
    }`
}
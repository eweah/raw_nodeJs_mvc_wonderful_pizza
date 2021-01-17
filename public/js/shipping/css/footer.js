'use strict'
export default () => {
    return `
    /* Footer */

    .footer {
        padding: 10px;
        text-align: center;
        background: #ddd;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        margin-top: 30px;
    }
    
    
    /* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
    
    @media screen and (max-width: 400px) {
        .row,
        .navbar {
            flex-direction: column;
        }
    }`
}
'use strict'
import css from './css.js'
export default () => {
    return `
    <div class="header">
    <!---<a href="index.html" class="logo">
        <img src="https://placehold.it/50x35" alt="Wonderful Pizza" id="logo">
    </a> -->
    <div class="header-right">
        <h1 id="title">Your Cart</h1>
        <p id="title-text">We are America's Most Wanted Pizza!</p>
    </div>
    <div class="notifications">
        <button class="notification" id="notification">Enable Notifications</button>
    </div>
</div>

<style>
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
    z-index: 0;
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
}

.notifications {
    font-size: 15px;
    font-weight: bold;
    font-family: cursive;
    position: absolute;
    top: 5px;
    right: 5px;
    /* border-radius: 100%; */
    cursor: pointer;
    z-index: -1;
    border: 4px solid teal;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    background-color: teal;
    opacity: 0.7;
}

.notification {
    color: black;
    border: 1px solid teal;
    color: white;
    /* text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; */
    cursor: pointer;
    background-color: teal;
    /* box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}

.notification:hover {
    color: white;
    opacity: 1.0;
}
</style>
${css()}
`
}
'use strict'
import css from './css.js'

export default () => {
    return `
    <div class="navbar" id="navbar">
    <a href="/" class="active" id="home">Home</a>
    <a href="about" class="about" id="about">About</a>
    <a href="menu" class="menu" id="menu">Menu</a>
    <!---<a href="order" class="order">Order</a>-->
    <a href="shipping" class="shipping" id="shipping">Shipping</a>
    <a href="billing" class="billing" id="billing">Billing</a>
    <a href="payment" class="payment" id="payment">Payment</a>
    <a href="dashboard" class="dashboard" id="dashboard">Dashboard</a> 
    <a href="contact" class="contact" id="contact">contact</a> 
    <a href="cart" class="right price" id="price">$0.00</a>
    <a href="cart" class="right equal" id="equal">=</a>
    <a href="cart" class="right cart notification " id="cart">
        <span>&#128722;</span>
        <span class="badge" id="badge">0</span>
    </a>
      <a href="shipping" class="pay" id="place-order">CHECK OUT</a>
    <a href="login" class="right login" id="login"> login</a>
    <a href="signup " class="right signup" id="signup"> signup</a>
    <a href="account" class="right user" id="user">user</a>
    <a href="login" class="right logout" id="logout">logout</a>
    
 
    <!--
    <a href="javascript:void(0); " class="icon" id="icon" style="display:none">
        <div class="humberger"></div>
        <div class="humberger"></div>
        <div class="humberger"></div>
    -->
    </a> 
</div>

${css()}
`
}
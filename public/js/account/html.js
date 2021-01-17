'use strict'
   /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string 
   * 
   */
import css from './css.js'
export default () => {
    return `
    <div class="wrapper">
    <div class="card">
    <img src="https://placehold.it/150x100" alt="John" style="width:100%"> 
    <div class="tooltip">
        <h1 id="profile-name">John Doe</h1>
       <!-- <span class="tooltiptext">Cannot Be Changed!</span>-->
    </div>
    <div class="container">
        <div>
            <p class="title">Basic Info</p>
            <p id="fullname">John Doe</p>
            <p id="current-email">john.doe@gmail.com</p>
        </div>
        <div>
            <p class="title">Credentials</p>
            <p id="current-phone">612-207-1306</p>
            <p id="current-username">ericsonweah</p>
        </div>
        <div>
            <p class="title">Others</p>
            <p id="current-nickname">nickname</p>
            <p>signup 6 months ago</p>
        </div>
    </div>
    <form action="" class="account" id="updateAccountForm">
        <div>
            <div class="phone">
                <label for="phone">Phone</label>
                <input type="tel" name="phone" id="phone" placeholder="Phone number...">
            </div>
            <div class="email">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="email address ...">
            </div>
            <div class="nickname">
                <!-- <label for="nickname">Submit</label> -->
                <button type="submit" id="submit">Submit</button>
            </div>
        </div>
        <div>
            <div class="username">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" placeholder="username ...">
            </div>
            <div class="nickname">
                <label for="nickname">Nickname</label>
                <input type="text" name="nickname" id="nickname" placeholder="nickname ...">
            </div>
            <div class="username">
                <!-- <label for="nickname">Clear</label> -->
                <button type="reset" id="clear">Clear</button>
            </div>
        </div>
        <div>
            <div class="username">
                <label for="password">Password</label>
                <input type="text" name="password" id="password" placeholder="password ...">
            </div>
            <div class="nickname">
                <label for="confirm">Confirm</label>
                <input type="password" name="confirm" id="confirm" placeholder="confirm password ...">
            </div>
            <div class="username">
                <!-- <label for="nickname">Exit</label> -->
                <button type="submit" id="exit">Exit</button>
            </div>
        </div>
        

    </form>
    
        <p class="delete"><button type="submit" id="delete-account">Delete Account</button></p>
       

    <p><button type="submit" id="update">Update</button></p>
    
</div>
    </div>
${css()}
`
}
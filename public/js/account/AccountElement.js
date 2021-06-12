'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module AccountElement
 * @kind class
 * 
 * @extends Validator
 * 
 * @requires Validator
 * 
 * @classdesc AccountElement class for the account page
 * 
 */

import Validator from '../common/Validator.js'
class AccountElement extends Validator{
  constructor() {
    super();
    // element created
  }

  // set variables 

  setVariables(){
    this.updateButton = this.shadowRoot.getElementById('update')
    this.exitButton = this.shadowRoot.getElementById('exit')
    this.accountUpdateForm = this.shadowRoot.getElementById('updateAccountForm')
    this.account = this.shadowRoot.querySelector('.account')
    this.container = this.shadowRoot.querySelector('.container')
    this.profileName = this.shadowRoot.getElementById('profile-name')
    this.deleteAccountBtn = this.shadowRoot.getElementById('delete-account')
    this.deleteBtn = this.shadowRoot.querySelector('.delete')
  }

  /**
     * @name isUserLoggedIn 
     * @function
     * 
     * @description sets account update form fields and account default values to user's details
     * 
     * @return does not return anything
     * 
     */
    isUserLoggedIn() {
      if (this.authCheck()) {
          this.authUser()
              .then(auth => {
                // Current 
                 const profileName = this.shadowRoot.getElementById('profile-name')
                 const fullname = this.shadowRoot.getElementById('fullname')
                 const currentEmail = this.shadowRoot.getElementById('current-email')
                 const currentPhone = this.shadowRoot.getElementById('current-phone')
                 const currentUsername= this.shadowRoot.getElementById('current-username')
                 const currentNickname = this.shadowRoot.getElementById('current-nickname')
  
                 profileName.innerHTML = `${auth.firstname} ${auth.lastname}`
                 fullname.innerHTML = `${auth.firstname} ${auth.lastname}`
                 currentEmail.innerHTML = `${auth.email}`
                 currentPhone.innerHTML = `${auth.phone}`
                 currentUsername.innerHTML = `${auth.username}`
                 currentNickname.innerHTML = `${auth.nickname}`   
                 
                 const email = this.shadowRoot.getElementById('email')
                 const phone = this.shadowRoot.getElementById('phone')
                 const username= this.shadowRoot.getElementById('username')
                 const nickname = this.shadowRoot.getElementById('nickname')
                 const password= this.shadowRoot.getElementById('password')
                 const confirm = this.shadowRoot.getElementById('confirm')
                 email.placeholder = `${auth.email}`
                 
                 phone.setAttribute('disabled', '')
                 phone.placeholder = `${auth.phone}`
                 username.placeholder = `${auth.username}`
                 nickname.placeholder = `${auth.nickname}`
                 password.placeholder = `Enter new password`
                 confirm.placeholder = `Confirm new password`
              })
      }
  }
  // user has logged in handler

  userHasLoginHandler(){
    this.isUserLoggedIn()
    window.addEventListener('user-has-logged-in', event => {
        this.isUserLoggedIn()
    })
  }

  // user has updated account handler
  userHasUpdatedAccountHandler(){
    this.addEventListener('user-has-updated-account', event => {
      const profileName = this.shadowRoot.getElementById('profile-name')
      const fullname = this.shadowRoot.getElementById('fullname')
      const currentEmail = this.shadowRoot.getElementById('current-email')
      const currentPhone = this.shadowRoot.getElementById('current-phone')
      const currentUsername= this.shadowRoot.getElementById('current-username')
      const currentNickname = this.shadowRoot.getElementById('current-nickname')

      profileName.innerHTML = `${event.detail.firstname} ${event.detail.lastname}`
      fullname.innerHTML = `${event.detail.firstname} ${event.detail.lastname}`
      currentEmail.innerHTML = `${event.detail.email}`
      currentPhone.innerHTML = `${event.detail.phone}`
      currentUsername.innerHTML = `${event.detail.username}`
      currentNickname.innerHTML = `${event.detail.nickname}` 
      // console.log(event)
  })
  }

  // update button handler

  updateButtonHandler(){
    this.updateButton.addEventListener('click', event => {
      this.container.style.display = 'none'
      this.updateButton.style.display = 'none'
      this.account.style.display = 'flex'
      this.deleteBtn.style.display = 'block'
  })
  }

  // account update form handler

  accountUpdateFormHandler(){
    this.accountUpdateForm.addEventListener('submit', event => {
      event.preventDefault()
      this.container.style.display = 'flex'
      this.updateButton.style.display = 'inline-block'
      this.account.style.display = 'none'
      this.deleteBtn.style.display = 'none'
      
      this.authUser()
          .then(auth => {
              const userData  = {
                  phone: auth.phone,
                  email: this.accountUpdateForm.email.value,
                  password: this.accountUpdateForm.password.value, 
                  username: this.accountUpdateForm.username.value,
                  nickname: this.accountUpdateForm.nickname.value, 
                  confirm: this.accountUpdateForm.confirm.value
              }
          const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/users/edit'
              this.updateAccount(url, userData)
              .then(response => {
                  const userHasUpdatedAccount = new CustomEvent('user-has-updated-account',{bubbles:false, composed: false, detail: response.user})
                  this.dispatchEvent(userHasUpdatedAccount)
              })
              .catch(console.log)
          })
          .catch(console.log)
  })
  }

  // exit button handler 
  exitButtonHandler(){
    this.exitButton.addEventListener('click', event => {
      event.preventDefault()
      this.container.style.display = 'flex'
      this.updateButton.style.display = 'inline-block'
      this.account.style.display = 'none'
  })
  }

  // animation handler 

  animationHandler(){
    this.profileName.addEventListener('mouseenter', event => {
      this.profileName.style.opacity = '0.4'
  })
  this.profileName.addEventListener('mouseleave', event => {
      this.profileName.style.opacity = '1.0'
  })
  this.deleteAccountBtn.addEventListener('click', event => {
    this.deleteAccount()

  })
  }
  init(){
    this.setVariables()
    this.userHasLoginHandler()
    this.userHasUpdatedAccountHandler()
    this.updateButtonHandler()
    this.accountUpdateFormHandler()
    this.exitButtonHandler()
    this.animationHandler()
  }
    

    /**
     * @name loggout
     * @function
     * 
     * @description logs the user out
     * 
     * @return does not return anything
     * 
     */
logout() {
    if (!this.authCheck()) {
        return
    }
    window.localStorage.removeItem('window number')
    window.location.href = '/menu'

}
 
  
    /**
     * @name connectedCallback (element's life cycle)
     * @function
     * 
     * @description browser calls this method when the element is added or mounted to the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
    connectedCallback() {}

    /**
     * @name disconnectedCallback (element's life cycle)
     * @function 
     * 
     * @description browser calls this method when the element is removed or disconnect from the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
	  disconnectedCallback() {}

	  /**
     * @name observedAttributes (element's life cycle)
     * @function
     * 
     * @description array of attribute names to monitor for changes
     * 
     * @return does not return anything
     * 
     */
	  static get observedAttributes() {return []}

	  /**
     * @name attributeChangedCallback (element's life cycle)
     * @function
     * 
     * @description called when one of attributes listed above is modified (the attributes listed in the array returned by the observedAttribues method above)
     * 
     * @return does not return anything
     * 
     */

	  attributeChangedCallback(name, oldValue, newValue) {}

	  /**
     * @name adoptedCallback (element's life cycle)
     * @function
     * 
     * @description called when the element is moved to a new document
     * 
     * @return does not return anything
     * 
     */
	  adoptedCallback() {}
}
customElements.define("account-element", AccountElement);

export default AccountElement
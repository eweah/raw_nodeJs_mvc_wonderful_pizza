'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module ShappingElement
 * @kind class
 * 
 * @extends StatesElement
 * 
 * @requires StatesElement
 * 
 * @classdesc ShippingElement class for the shipping page
 * 
 */
import StatesElement from './StatesElement.js'
class ShappingElement extends StatesElement {
	constructor() {
		super();
		// auto bind methods 
		this.autobind(ShappingElement)
	}
	/**
	 * @name initFormFields
	 * @function
	 * 
	 * @description sets and initiates form field values
	 * 
	 * @return does not return anything
	 * 
	 */

	initFormFields() {
		//this.user
		//this.billing
		// this.user.billing = this.billing
		this.firstname = this.formField('firstname'); // done
		this.lastname = this.formField('lastname'); // done
		this.email = this.formField('email'); // done
		this.city = this.formField('city'); // done
		this.state = this.formField('state'); //done
		this.phone = this.formField('phone'); //done
		this.address = this.formField('address'); //done
		this.zip = this.formField('zip'); // done
		// Billing
		this.checkBox = this.formField('billing-checkbox')
		this.billingAddress = this.formField('billing-address')
		this.billingCity = this.formField('billing-city')
		this.billingState = this.formField('billing-state')
		this.billingZip = this.formField('billing-zip')
		this.billingPhone = this.formField('billing-phone')
		this.billingCountry = this.formField('billing-country')
		this.toValidateOnChange = [
			this.firstname,
			this.lastname,
			this.email,
			this.city,
			this.state,
			this.phone,
			this.address,
			this.zip,
			this.checkBox,
			this.billingAddress,
			this.billingCity,
			this.billingState,
			this.billingZip,
			this.billingPhone,
			this.billingCity
		];
	}

	/**
	 * @name isNeeded
	 * @function
	 * 
	 * @description prefills form field values with authenticated user's details  
	 * 
	 * @return does not return anything
	 * 
	 */
	isNeeded() {
		if (this.authCheck()) {
			this.authUser()
				.then(auth => {
					// console.log('auth', auth)
					if (auth.records !== null) {
						this.address.setAttribute('value', auth.records.address)
						this.city.setAttribute('value', auth.records.city)
						this.zip.setAttribute('value', auth.records.zip)
						this.state.setAttribute('value', auth.records.state)
						this.phone.setAttribute('value', auth.records.phone)
						this.billingAddress.setAttribute('value', auth.records.billing.billing_address)
						this.billingCity.setAttribute('value', auth.records.billing.billing_city)
						this.billingZip.setAttribute('value', auth.records.billing.billing_zip)
						this.billingPhone.setAttribute('value', auth.records.billing.billing_phone)
						this.userState(auth.records.state)
						this.userBillingState(auth.records.billing.billing_state)
					}
					this.firstname.setAttribute('value', `${auth.firstname}`);
					this.lastname.setAttribute('value', `${auth.lastname}`);
					this.email.setAttribute('value', `${auth.email}`);
				})
				.catch(console.error);
		}
	}
	shippingForm() {
		const sForm = this.shadowRoot.getElementById('shipping');
		sForm.addEventListener('submit', (event) => {
			event.preventDefault();
			//console.log(event);
		});
	}

	/**
	 * @name onGuestInit
	 * @function
	 * 
	 * @description prefills form field values with authenticated guest user's details  
	 * 
	 * @return does not return anything
	 * 
	 */
	onGuestInit() {
		window.addEventListener('load', event => {
			console.log('on guest init')
			const store = this.store('carts', 'readwrite');
			const request = store.getAll();
			request.onerror = (event) => {
				console.log('ERROR on init');
			};
			request.onsuccess = (event) => {
				const data = event.target.result;
				console.log('data', data)
				if (data && data[0] && data[0].user) {
					this.user = data[0].user;
					//this.user.billing = {}
					// console.log(this.user)
					this.firstname.setAttribute('value', this.user.firstname);
					// this.firstname.setAttribute('placeholder', this.user.firstname)
					this.firstname.placeholder = this.user.firstname;
					this.lastname.value = this.user.lastname;
					this.email.value = this.user.email;
					this.city.value = this.user.city;
					this.state.value = this.user.state;
					this.phone.value = this.user.phone;
					this.address.value = this.user.address;
					this.zip.value = this.user.zip;

					if (this.user.billing) {
						this.billingCity.value = this.user.billing.billing_city;
						this.billingState.value = this.user.billing.billing_state;
						this.billingPhone.value = this.user.billing.billing_phone;
						this.billingAddress.value = this.user.billing.billing_address;
						this.billingZip.value = this.user.billing.billing_zip;
					}

				} else {
					this.validateShappingForm()
				}
			};
		})
	}
	formatPhoneNumber(phoneNumber) {
		let formattedNumber;
		if (phoneNumber.trim().length === 10) {
			const areaCode = phoneNumber.slice(0, 3);
			const firstThree = phoneNumber.slice(3, 6);
			const lastFrour = phoneNumber.slice(6, 10);
			formattedNumber = `${areaCode}-${firstThree}-${lastFrour}`;
		}
		return formattedNumber;
	}
	async onAuthInit() {
		this.auth = await this.authUser();
		if (this.auth && this.auth !== null) {
			this.firstname.value = this.auth.firstname;
			this.lastname.value = this.auth.lastname;
			this.email.value = this.auth.email;
			this.phone.value = this.formatPhoneNumber(this.auth.phone);
		}
	}

	/**
	 * @name onSubmitShippingForm
	 * @function
	 * 
	 * @description processes shipping form  
	 * 
	 * @return does not return anything
	 * 
	 */

	onSubmitShippingForm() {
		this.shippingForm = this.formField('shipping');
		const toValidate = [
			this.firstname,
			this.lastname,
			this.email,
			this.city,
			this.state,
			this.phone,
			this.address,
			this.zip,
		];
		const billing = [
			this.billingAddress,
			this.billingCity,
			this.billingState,
			this.billingZip,
			this.billingPhone,
			this.billingCity
		]

		this.shippingForm.addEventListener('submit', async (event) => {
			event.preventDefault();
			const store = this.store('orders', 'readwrite'); //.objectStore('orders')
			const request = store.getAll();
			request.onerror = (event) => {
				console.log('Error');
			};
			request.onsuccess = (event) => {
				if (this.user) {
					const cart = this.store('carts', 'readwrite');
					const cartRequest = cart.get(1);
					cartRequest.onerror = (event) => {
						console.log('Could not process fetching user');
					};
					cartRequest.onsuccess = (event) => {
						const userData = event.target.result;
						userData.user.billing = {}
						userData.user.firstname = this.firstname.value;
						userData.user.lastname = this.lastname.value;
						userData.user.email = this.email.value;
						userData.user.city = this.city.value;
						userData.user.phone = this.phone.value;
						userData.user.state = this.state.value;
						userData.user.address = this.address.value;
						userData.user.zip = this.zip.value;
						if (this.billingPhone.getAttribute('readonly') === null) {
							console.log('hello')
							userData.user.billing.billing_city = this.billingCity.value;
							userData.user.billing.billing_phone = this.billingPhone.value;
							userData.user.billing.billing_state = this.billingState.value;
							userData.user.billing.billing_address = this.billingAddress.value;
							userData.user.billing.billing_zip = this.billingZip.value;

						} else {
							delete userData.user.billing
							console.log('deleted')
						}

						const updateRequest = cart.put(userData);
						updateRequest.onerror = (event) => {
							console.log('Failed to update user');
						};
						updateRequest.onsuccess = (event) => {
							console.log('user updated');
							console.log(userData.user)
							console.log(this.billingAddress)
						};
					};
					window.location.href = 'http://wonderfulpizza.devoutprogrammer.com/review';
				} else {
					const data = {};
					data.user = {};
					data.user.billing = {}
					const cart = this.store('carts', 'readwrite');
					toValidate.forEach((valid) => {
						const values = `${valid.value}`;
						data.user[`${valid.getAttribute('name')}`] = values;
					});
					billing.forEach((valid) => {
						const billingValues = `${valid.value}`;
						data.user.billing[`${valid.getAttribute('name')}`] = billingValues;
					});
					console.log('data', data)
					const addRequest = cart.add(data);
					addRequest.onerror = (event) => {
						console.log('Error: failed to add user');
					};
					addRequest.onsuccess = (event) => {
						console.log('user added');
					};
				}
				window.location.href = 'http://wonderfulpizza.devoutprogrammer.com/review';
			};
		});
	}

	/**
	 * @name validateIfFieldChanges
	 * @function
	 * 
	 * @description checks and validates shipping form field 
	 * 
	 * @return does not return anything
	 * 
	 */
	validateIfFieldChanges() {
		this.toValidateOnChange.forEach(field => {
			field.addEventListener('change', event => {
				this.validateShappingForm()
			})
		})
	}

	init() {
		this.formatPhoneNumberOnChange()
		this.zipsAndStatesMatcher()
		// window.addEventListener('load', event => {
		// 	this.onGuestInit();
		// 	this.onAuthInit();
		// });
		this.loadStates();
		this.initFormFields()
		this.onGuestInit()
		this.onAuthInit();
		this.validateIfFieldChanges()
		this.isNeeded();
		this.shippingForm();
		this.onSubmitShippingForm();
		this.loadBillingStates()
		this.onBillingIsSameAsShippingCheck()
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
	static get observedAttributes() {
		return []
	}

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
customElements.define("shipping-element", ShappingElement);
export default ShappingElement
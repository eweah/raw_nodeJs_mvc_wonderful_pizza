'use strict';

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Validator
 * @kind class
 * 
 * @extends FormElement
 * 
 * @requires FormElement
 * 
 * @classdesc Validator class for all form validations
 * 
 */

import FormElement from './FormElement.js';

class Validator extends FormElement {
	constructor() {
		super();

		// auto bind methods
		this.autobind(Validator)
		this.authState
	}

	/**
    * @name regexes
    * @function
    * 
    * @description sets the regex for each and all form fields
    * 
    * @return {Object} all form field regexes object
    * 
    */
	regexes() {
		const formFieldRegexes = {
			phone: /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/,
			password: /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$"/,
			passwordConfirmation: /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$"/,
			firstname: /^[A-Z][A-Za-z.'\-].{0,25}$/,
			lastname: /^[A-Z][A-Za-z.'\-].{0,25}$/,
			username: /^[A-Za-z.'\-].{0,25}\S*$/,
			nickname: /^[A-Za-z.'\-].{0,25}\S*$/,
			email: /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/,
			// Amex Card 
			amexNumber: /^3[47][0-9]{2}([\- ]?)[0-9]{6}([\- ]?)[0-9]{5}$/,
			amexSecurityCode: /^[0-9]{4}$/,
			amexNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/,
			amexExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
			// Visa Card 
			visaNumber: /^(?:4000)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/,
			visaSecurityCode: /^[0-9]{3}$/,
			visaNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/,
			visaExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
			// Master Card
			masterNumber: /^(?:5100)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/,
			masterSecurityCode: /^[0-9]{3}$/,
			masterNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/,
			masterExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,
			// Discover
			discoverNumber: /^(?:6011)([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}([\- ]?)[0-9]{4}$/,
			discoverSecurityCode: /^[0-9]{3}$/,
			discoverNameOnCard: /^[A-Z][A-Za-z.'\-].{0,25}$/,
			discoverExpirationDate: /^(0?[1-9]|1[0-2])[-/](20[2-3][0-9]|2030)$/gm,

			// Zip Code 
			zip: /^[0-9]{5}(?:[\-][0-9]{4})?$/,
			// city 
			city: '',
			// State
			state: '',
			// Country
			country: /^USA$/
		}
		return formFieldRegexes
	}

	/**
    * @name loadStates
    * @function
    * 
    * @description sets state option for form select elements
    * 
    * @return does not return anything
    * 
    */
	loadStates() {
		const stateList = this.formField('state');
		this.states().forEach((state) => {
			const option = document.createElement('option');
			option.setAttribute('value', state.code);
			option.setAttribute('name', state.name);
			option.innerHTML = state.name;
			option.setAttribute('zipmin', state.zip.min);
			option.setAttribute('zipmax', state.zip.max);
			option.setAttribute('stateid', state.id);
			stateList.appendChild(option);
		});
	}
	/**
    * @name userState
    * @function
    * 
    * @description sets state option for form select elements
    * 
    * @return does not return anything
    * 
    */
	userState(uState) {
		if (typeof uState !== 'string') return null
		const stateList = this.formField('state');
		this.states().forEach(state => {
			const option = document.createElement('option');
			option.setAttribute('value', state.code);
			option.setAttribute('name', state.name);
			option.innerHTML = state.name;
			option.setAttribute('zipmin', state.zip.min);
			option.setAttribute('zipmax', state.zip.max);
			option.setAttribute('stateid', state.id);

			if (state.code.trim().toLocaleLowerCase() === uState.trim().toLocaleLowerCase()) {
				this.authState = state
				option.setAttribute('selected', '')
				// console.log(state)
			}
			stateList.appendChild(option);
		})
	}

	/**
    * @name userBillingState
    * @function
    * 
    * @description sets state option for form select elements
    * 
    * @return does not return anything
    * 
    */
	userBillingState(uState) {
		if (typeof uState !== 'string') return null
		const billStateList = this.formField('billing-state')
		this.states().forEach(state => {
			const option = document.createElement('option');
			option.setAttribute('value', state.code);
			option.setAttribute('name', state.name);
			option.innerHTML = state.name;
			option.setAttribute('zipmin', state.zip.min);
			option.setAttribute('zipmax', state.zip.max);
			option.setAttribute('stateid', state.id);

			if (state.code.trim().toLocaleLowerCase() === uState.trim().toLocaleLowerCase()) {
				this.authState = state
				option.setAttribute('selected', '')
			}
			billStateList.appendChild(option);
		})
	}

   /**
    * @name loadBillingStates
    * @function
    * 
    * @description load state options for form select elements
    * 
    * @return does not return anything
    * 
    */
	loadBillingStates() {
		const billStateList = this.formField('billing-state')
		this.states().forEach((state) => {
			const option = document.createElement('option');
			option.setAttribute('value', state.code);
			option.setAttribute('name', state.name);
			option.innerHTML = state.name;
			option.setAttribute('zipmin', state.zip.min);
			option.setAttribute('zipmax', state.zip.max);
			option.setAttribute('stateid', state.id);
			billStateList.appendChild(option)
		});
	}
	
	/**
    * @name billingAddressOnCheckboxChange
    * @function
    * 
    * @description sets the ability of the billing address field upon checkbox change
    * 
    * @return does not return anything
    * 
    */

	billingAddressOnCheckboxChange() {
		if (this.billingAddress.getAttribute('disabled') === null) {
			this.billingAddress.setAttribute('disabled', '')
			this.billingAddress.setAttribute('readonly', 'readonly')
		} else {
			this.billingAddress.removeAttribute('disabled')
			this.billingAddress.removeAttribute('readonly')
		}
	}
	/**
    * @name billingCityOnCheckboxChange
    * @function
    * 
    * @description sets the ability of the billing city field upon checkbox change
    * 
    * @return does not return anything
    * 
    */
	billingCityOnCheckboxChange() {
		if (this.billingCity.getAttribute('disabled') === null) {
			this.billingCity.setAttribute('disabled', '')
			this.billingCity.setAttribute('readonly', 'readonly')
		} else {
			this.billingCity.removeAttribute('disabled')
			this.billingCity.removeAttribute('readonly')
		}
	}
	/**
    * @name billingStateOnCheckboxChange
    * @function
    * 
    * @description sets the ability of the billing state field upon checkbox change
    * 
    * @return does not return anything
    * 
    */
	billingStateOnCheckboxChange() {
		if (this.billingState.getAttribute('disabled') === null) {
			this.billingState.setAttribute('disabled', '')
			this.billingState.setAttribute('readonly', 'readonly')
		} else {
			this.billingState.removeAttribute('disabled')
			this.billingState.removeAttribute('readonly')
		}
	}
	/**
    * @name billingZipOnCheckboxChange
    * @function
    * 
    * @description sets the ability of the billing zip field upon checkbox change
    * 
    * @return does not return anything
    * 
    */
	billingZipOnCheckboxChange() {
		if (this.billingZip.getAttribute('disabled') === null) {
			this.billingZip.setAttribute('disabled', '')
			this.billingZip.setAttribute('readonly', 'readonly')
		} else {
			this.billingZip.removeAttribute('disabled')
			this.billingZip.removeAttribute('readonly')
		}
	}

	/**
    * @name billingPhoneCheckboxChange
    * @function
    * 
    * @description sets the ability of the billing phone field upon checkbox change
    * 
    * @return does not return anything
    * 
    */
	billingPhoneOnCheckboxChange() {
		if (this.billingPhone.getAttribute('disabled') === null) {
			this.billingPhone.setAttribute('disabled', '')
			this.billingPhone.setAttribute('readonly', 'readonly')

		} else {
			this.billingPhone.removeAttribute('disabled')
			this.billingPhone.removeAttribute('readonly')
		}
	}

	/**
    * @name billingCountryOnCheckboxChange
    * @function
    * 
    * @description sets the ability of the billing country field upon checkbox change
    * 
    * @return does not return anything
    * 
    */
	billingCountryOnCheckboxChange() {
		if (this.billingCountry.getAttribute('disabled') === null) {
			this.billingCountry.setAttribute('disabled', '')
			this.billingCountry.setAttribute('readonly', 'readonly')
		} else {
			this.billingCountry.removeAttribute('disabled')
			this.billingCountry.removeAttribute('readonly')

		}
	}

	/**
    * @name onBillingIsSameAsShippingCheck
    * @function
    * 
    * @description tracks the state of the checkbox  on change
    * 
    * @return does not return anything
    * 
    */
	onBillingIsSameAsShippingCheck() {
		this.checkBox.addEventListener('change', event => {
			this.billingAddressOnCheckboxChange()
			this.billingCityOnCheckboxChange()
			this.billingStateOnCheckboxChange()
			this.billingZipOnCheckboxChange()
			this.billingPhoneOnCheckboxChange()

		})
	}

	/**
    * @name stateMatcher
    * @function
    * 
    * @description verifies match between shipping states and shipping zip codes
    * 
    * @return does not return anything
    * 
    */

	stateMatcher() {
		this.formField('state').addEventListener('change', event => {
			this.isStateAndZipMatched()
		})
	}

	/**
    * @name zipMatcher
    * @function
    * 
    * @description verifies match between shipping zip codes and shipping states 
    * 
    * @return does not return anything
    * 
    */
	zipMatcher() {
		this.formField('zip').addEventListener('change', event => {
			this.isStateAndZipMatched()
		})
	}
	/**
    * @name billingStateMatcher
    * @function
    * 
    * @description verifies match between billing zip codes and shipping states 
    * 
    * @return does not return anything
    * 
    */
	billingStateMatcher() {
		this.formField('billing-state').addEventListener('change', event => {
			this.isBillingStateAndBillingZipMatched()
		})
	}

	/**
    * @name billingStateMatcher
    * @function
    * 
    * @description verifies match between billing zip codes and shipping states 
    * 
    * @return does not return anything
    * 
    */
	billingZipMatcher() {
		this.formField('billing-zip').addEventListener('change', event => {
			this.isBillingStateAndBillingZipMatched()
		})
	}

	/**
    * @name billingZipAndStateMatcher
    * @function
    * 
    * @description verifies match betweeen billing zip codes and shipping states 
    * 
    * @return does not return anything
    * 
    */
	billingZipAndStateMatcher() {
		this.billingStateMatcher()
		this.billingZipMatcher()
	}
	/**
    * @name zipAndStateMatcher
    * @function
    * 
    * @description verifies match betweeen billing zip codes and shipping states 
    * 
    * @return does not return anything
    * 
    */
	zipAndStateMatcher() {
		this.stateMatcher()
		this.zipMatcher()
	}
	/**
    * @name zipAndStateMatcher
    * @function
    * 
    * @description verifies match betweeen billing zip codes and shipping states 
    * 
    * @return does not return anything
    * 
    */
	zipsAndStatesMatcher() {
		this.zipAndStateMatcher()
		this.billingZipAndStateMatcher()
	}

	// Form Validation

	/// Payment 

	// Visa card number
	/**
    * @name validateVisaCardNumber
    * @function
    * 
    * @description validates visa card number
    * 
    * @return does not return anything
    * 
    */
	validateVisaCardNumber() {
		this.visaCardNumber = this.formField('visa-number');
		this.visaCardNumberValidationRules = {
			value: 'Darling, I am expecting a visa card number!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.visaCardNumber.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.visaCardNumber.maxLength} characters long.`,
			pattern: 'Darling, this is not a valid Visa Card number. Please double check',
			badinput: 'I will not accept this, darling.',
		};
		// console.log('this.visaCardNumber', this.visaCardNumber)
		this.showFormFieldNameError(this.visaCardNumber, this.visaCardNumberValidationRules);
		this.validate(this.visaCardNumber, this.visaCardNumberValidationRules);
	}
	/**
    * @name formatVisaCardNumber
    * @function
    * 
    * @description formats visa card number
    * 
    * @return does not return anything
    * 
    */
	formatVisaCardNumber() {
		this.visaCardNumberFormat = this.formField('visa-number');
		this.visaCardNumberFormat.addEventListener('keyup', (event) => {
			if (this.visaCardNumberFormat.value.trim().length <= 14) {
				this.visaCardNumberFormat.value = this.visaCardNumberFormat.value.replace(/(\d{4})\-?/g, '$1-');
			} else {
				this.visaCardNumberFormat.value = this.visaCardNumberFormat.value.replace(/(\d{5})\-?/g, '$1');
			}
		});
	}
	//visa-security-code
	/**
    * @name validateVisaCardSecurityCode
    * @function
    * 
    * @description validates visa card security code
    * 
    * @return does not return anything
    * 
    */
	validateVisaCardSecurityCode() {
		this.visaCardSecurityCode = this.formField('visa-security-code');
		this.visaCardSecurityCodeValidationRules = {
			value: 'Darling, I am expecting the security code for the visa card!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be exactly ${this.visaCardSecurityCode.minLength} digits.`,
			maxlength: `This is too long, darling! Must be exactly ${this.visaCardSecurityCode.maxLength} digits.`,
			pattern: 'Please use correct formatting. Something like 123',
			badinput: 'I will not accept this, darling.'
		};
		this.showFormFieldNameError(this.visaCardSecurityCode, this.visaCardSecurityCodeValidationRules);
		this.validate(this.visaCardSecurityCode, this.visaCardSecurityCodeValidationRules);
	}

	// visa-expiration
	/**
    * @name validateVisaExpirationDate
    * @function
    * 
    * @description validates visa card expiration date
    * 
    * @return does not return anything
    * 
    */
	validateVisaExpirationDate() {
		this.visaExpirationDate = this.formField('visa-expiration');
		this.visaExpirationDateValidationRules = {
			value: `Darling, I am expecting the expiration date for the visa card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.visaExpirationDate.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.visaExpirationDate.maxLength} characters long.`,
			pattern: 'Invalid expiration date or invalid format. Something like 12/2025',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.visaExpirationDate, this.visaExpirationDateValidationRules);
		this.validate(this.visaExpirationDate, this.visaExpirationDateValidationRules);
	}
	//visa-nameoncard
	/**
    * @name validateVisaCardNumber
    * @function
    * 
    * @description validates name on visa card
    * 
    * @return does not return anything
    * 
    */
	validateVisaNameOnCard() {
		this.visaNameOnCard = this.formField('visa-name-on-card');
		this.visaNameOnCardValidationRules = {
			value: `Darling, I am expecting the name on the visa card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.visaNameOnCard.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.visaNameOnCard.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Jessica Moreno',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.visaNameOnCard, this.visaNameOnCardValidationRules);
		this.validate(this.visaNameOnCard, this.visaNameOnCardValidationRules);
	}
	// Visa Card Agrement
	/**
    * @name validateVisaPaymentAgreements
    * @function
    * 
    * @description validates visa card payment agreements
    * 
    * @return does not return anything
    * 
    */
	validateVisaPaymentAgreements() {
		this.visaCardPaymentAgreements = this.formField('agreement');
		const showVisaError = () => {
			this.visaCardPaymentAgreements.setCustomValidity('Darling, to proceed with the Visa Card payment we have to agree!')
		}
		this.visaCardPaymentAgreements.addEventListener('change', event => {
			this.visaCardPaymentAgreements.setCustomValidity('')
			this.visaCardPaymentAgreements.checkValidity()
			this.visaCardPaymentAgreements.reportValidity()
		})
		this.visaCardPaymentAgreements.addEventListener('invalid', event => {
			if (!this.visaCardPaymentAgreements.validity.valid) {
				showVisaError()
			}

		})
	}
	// Master number
	/**
    * @name validateMasterCardNumber
    * @function
    * 
    * @description validates master card number
    * 
    * @return does not return anything
    * 
    */
	validateMasterCardNumber() {
		this.masterCardNumber = this.formField('master-number');
		this.masterCardNumberValidationRules = {
			value: 'Darling, I am expecting a Master Card number!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.masterCardNumber.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.masterCardNumber.maxLength} characters long.`,
			pattern: 'Darling, this is not a valid Master Card number. Please double check',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.masterCardNumber, this.masterCardNumberValidationRules);
		this.validate(this.masterCardNumber, this.masterCardNumberValidationRules);
	}
	// format master card number
	/**
    * @name formatMasterCardNumber
    * @function
    * 
    * @description formats master card number
    * 
    * @return does not return anything
    * 
    */
	formatMasterCardNumber() {
		this.masterCardNumberFormat = this.formField('master-number');
		this.masterCardNumberFormat.addEventListener('keyup', (event) => {
			if (this.masterCardNumberFormat.value.trim().length <= 14) {
				this.masterCardNumberFormat.value = this.masterCardNumberFormat.value.replace(/(\d{4})\-?/g, '$1-');
			} else {
				this.masterCardNumberFormat.value = this.masterCardNumberFormat.value.replace(/(\d{5})\-?/g, '$1');
			}
		});
	}

	// upper case first letter 
	upperCaseFirstLetter(element) {
		element.addEventListener('keyup', event => {
			this.firstLetter = element.value.slice(-element.value.length, 1)
			element.value = element.value.replace(this.firstLetter, this.firstLetter.toLocaleUpperCase())
		})
		element.addEventListener('change', event => {
			this.firstLetter = element.value.slice(-element.value.length, 1)
			element.value = element.value.replace(this.firstLetter, this.firstLetter.toLocaleUpperCase())
		})
	}

	//master-security-code
	/**
    * @name validateMasterCardSecurityCode
    * @function
    * 
    * @description validates master card security code
    * 
    * @return does not return anything
    * 
    */
	validateMasterCardSecurityCode() {
		this.masterCardSecurityCode = this.formField('master-security-code');
		this.masterCardSecurityCodeValidationRules = {
			value: 'Darling, I am expecting the security code for the master card!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be exactly ${this.masterCardSecurityCode.minLength} digits.`,
			maxlength: `This is too long, darling! Must not be exactly ${this.masterCardSecurityCode.maxLength} digits.`,
			pattern: 'Please use correct formatting. Something like 123',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.masterCardSecurityCode, this.masterCardSecurityCodeValidationRules);
		this.validate(this.masterCardSecurityCode, this.masterCardSecurityCodeValidationRules);
	}
	// master-expiration
	/**
    * @name validateMasterExpirationDate
    * @function
    * 
    * @description validates master card expiration date
    * 
    * @return does not return anything
    * 
    */
	validateMasterExpirationDate() {
		this.masterExpirationDate = this.formField('master-expiration');
		this.masterExpirationDateValidationRules = {
			value: `Darling, I am expecting the expiration date for the master card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.masterExpirationDate.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.masterExpirationDate.maxLength} characters long.`,
			pattern: 'Invalid expiration date or invalid format. Something like 12/2025',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.masterExpirationDate, this.masterExpirationDateValidationRules);
		this.validate(this.masterExpirationDate, this.masterExpirationDateValidationRules);
	}
	//master-nameoncard
	/**
    * @name validateMaster CardNumber
    * @function
    * 
    * @description validates name on name card
    * 
    * @return does not return anything
    * 
    */
	validateMasterNameOnCard() {
		this.masterNameOnCard = this.formField('master-name-on-card');
		this.masterNameOnCardValidationRules = {
			value: `Darling, I am expecting the name on the master card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.masterNameOnCard.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.masterNameOnCard.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Jessica Moreno',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.masterNameOnCard, this.masterNameOnCardValidationRules);
		this.validate(this.masterNameOnCard, this.masterNameOnCardValidationRules);
	}
	// Master Card Agrement
	/**
    * @name validateMasterPaymentAgreements
    * @function
    * 
    * @description validates master card payment agreements
    * 
    * @return does not return anything
    * 
    */
	validateMasterPaymentAgreements() {
		this.masterCardPaymentAgreements = this.formField('agreement');
		const showMasterError = () => {
			this.masterCardPaymentAgreements.setCustomValidity('Darling, to proceed with the Master Card payment we have to agree!')
		}
		this.masterCardPaymentAgreements.addEventListener('change', event => {
			this.masterCardPaymentAgreements.setCustomValidity('')
			this.masterCardPaymentAgreements.checkValidity()
			this.masterCardPaymentAgreements.reportValidity()
		})
		this.masterCardPaymentAgreements.addEventListener('invalid', event => {
			if (!this.masterCardPaymentAgreements.validity.valid) {
				showMasterError()
			}

		})
	}
	//  Discover card number
	/**
    * @name validateDiscoverCardNumber
    * @function
    * 
    * @description validates discover card number
    * 
    * @return does not return anything
    * 
    */
	validateDiscoverCardNumber() {
		this.discoverCardNumber = this.formField('discover-number');
		this.discoverCardNumberValidationRules = {
			value: 'Darling, I am expecting a Discover Card number!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.discoverCardNumber.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.discoverCardNumber.maxLength} characters long.`,
			pattern: 'Darling, this is not a valid Discover Card number. Please double check',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.discoverCardNumber, this.discoverCardNumberValidationRules);
		this.validate(this.discoverCardNumber, this.discoverCardNumberValidationRules);
	}
	// Format discover card number
	/**
    * @name formatDiscoverCardNumber
    * @function
    * 
    * @description formats discover card number
    * 
    * @return does not return anything
    * 
    */
	formatDiscoverCardNumber() {
		this.discoverCardNumberFormat = this.formField('discover-number');
		this.discoverCardNumberFormat.addEventListener('keyup', (event) => {
			if (this.discoverCardNumberFormat.value.trim().length <= 14) {
				this.discoverCardNumberFormat.value = this.discoverCardNumberFormat.value.replace(/(\d{4})\-?/g, '$1-');
			} else {
				this.discoverCardNumberFormat.value = this.discoverCardNumberFormat.value.replace(/(\d{5})\-?/g, '$1');
			}
		});
	}
	//discover-security-code
	/**
    * @name validateDiscoverCardSecurityCode
    * @function
    * 
    * @description validates discover card security code
    * 
    * @return does not return anything
    * 
    */
	validateDiscoverCardSecurityCode() {
		this.discoverCardSecurityCode = this.formField('discover-security-code');
		this.discoverCardSecurityCodeValidationRules = {
			value: 'Darling, I am expecting the security code for the Discover Card!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be exactly ${this.discoverCardSecurityCode.minLength} digits.`,
			maxlength: `This is too long, darling! Must not be exactly ${this.discoverCardSecurityCode.maxLength} digits.`,
			pattern: 'Please use correct formatting. Something like 123',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.discoverCardSecurityCode, this.discoverCardSecurityCodeValidationRules);
		this.validate(this.discoverCardSecurityCode, this.discoverCardSecurityCodeValidationRules);
	}
	// discover-expiration
	/**
    * @name validateDiscoverExpirationDate
    * @function
    * 
    * @description validates discover card expiration date
    * 
    * @return does not return anything
    * 
    */
	validateDiscoverExpirationDate() {
		this.discoverExpirationDate = this.formField('discover-expiration');
		this.discoverExpirationDateValidationRules = {
			value: `Darling, I am expecting the expiration date for the Discover Card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.discoverExpirationDate.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.discoverExpirationDate.maxLength} characters long.`,
			pattern: 'Invalid expiration date or invalid format. Something like 12/2025',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.discoverExpirationDate, this.discoverExpirationDateValidationRules);
		this.validate(this.discoverExpirationDate, this.discoverExpirationDateValidationRules);
	}
	//discover-nameoncard
	/**
    * @name validateDiscoverCardNumber
    * @function
    * 
    * @description validates name on discover card
    * 
    * @return does not return anything
    * 
    */
	validateDiscoverNameOnCard() {
		this.discoverNameOnCard = this.formField('discover-name-on-card');
		this.discoverNameOnCardValidationRules = {
			value: `Darling, I am expecting the name on the Discover Card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.discoverNameOnCard.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.discoverNameOnCard.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Jessica Moreno',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.discoverNameOnCard, this.discoverNameOnCardValidationRules);
		this.validate(this.discoverNameOnCard, this.discoverNameOnCardValidationRules);
	}
	// Discover Card Agrement
	/**
    * @name validateDiscoverPaymentAgreements
    * @function
    * 
    * @description validates discover card payment agreements
    * 
    * @return does not return anything
    * 
    */
	validateDiscoverPaymentAgreements() {
		this.discoverCardPaymentAgreements = this.formField('agreement');
		const showDiscoverError = () => {
			this.discoverCardPaymentAgreements.setCustomValidity('Darling, to proceed with the Discover Card payment we have to agree!')
		}
		this.discoverCardPaymentAgreements.addEventListener('change', event => {
			this.discoverCardPaymentAgreements.setCustomValidity('')
			this.discoverCardPaymentAgreements.checkValidity()
			this.discoverCardPaymentAgreements.reportValidity()
		})
		this.discoverCardPaymentAgreements.addEventListener('invalid', event => {
			if (!this.discoverCardPaymentAgreements.validity.valid) {
				showDiscoverError()
			}

		})
	}

	//  Amex card number
	/**
    * @name validateAmexCardNumber
    * @function
    * 
    * @description validates visa card number
    * 
    * @return does not return anything
    * 
    */
	validateAmexCardNumber() {
		this.amexCardNumber = this.formField('amex-number');
		// console.log('this.amexCardNumber', this.amexCardNumber)
		this.amexCardNumberValidationRules = {
			value: 'Darling, I am expecting an American Express Card number!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.amexCardNumber.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.amexCardNumber.maxLength} characters long.`,
			pattern: 'Darling, this is not a valid American Express Card number. Please double check',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.amexCardNumber, this.amexCardNumberValidationRules);
		this.validate(this.amexCardNumber, this.amexCardNumberValidationRules);
	}
	// format amex card number
	/**
    * @name formatAmexCardNumber
    * @function
    * 
    * @description formats amex card number
    * 
    * @return does not return anything
    * 
    */
	formatAmexCardNumber() {
		this.amexCardNumberFormat = this.formField('amex-number');
		this.amexCardNumberFormat.addEventListener('keyup', (event) => {
			if (this.amexCardNumberFormat.value.trim().length <= 4) {
				this.amexCardNumberFormat.value = this.amexCardNumberFormat.value.replace(/(\d{4})\-?/g, '$1-');
			} else if (this.amexCardNumberFormat.value.trim().length < 12) {
				this.amexCardNumberFormat.value = this.amexCardNumberFormat.value.replace(/(\d{6})\-?/g, '$1-');
			} else {
				this.amexCardNumberFormat.value = this.amexCardNumberFormat.value.replace(/(\d{15})\-?/g, '$1');
			}
		});
	}
	//amex-security-code
	/**
    * @name validateAmexCardSecurityCode
    * @function
    * 
    * @description validates american express card security code
    * 
    * @return does not return anything
    * 
    */
	validateAmexCardSecurityCode() {
		this.amexCardSecurityCode = this.formField('amex-security-code');
		this.amexCardSecurityCodeValidationRules = {
			value: 'Darling, I am expecting the security code for the American Express Card!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be exactly ${this.amexCardSecurityCode.minLength} digits.`,
			maxlength: `This is too long, darling! Must be exactly ${this.amexCardSecurityCode.maxLength} digits.`,
			pattern: 'Please use correct formatting. 1234',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.amexCardSecurityCode, this.amexCardSecurityCodeValidationRules);
		this.validate(this.amexCardSecurityCode, this.amexCardSecurityCodeValidationRules);
	}
	// amex-expiration
	/**
    * @name validateAmexExpirationDate
    * @function
    * 
    * @description validates american express card expiration date
    * 
    * @return does not return anything
    * 
    */
	validateAmexExpirationDate() {
		this.amexExpirationDate = this.formField('amex-expiration');
		this.amexExpirationDateValidationRules = {
			value: `Darling, I am expecting the expiration date for the Amerian Express Card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.amexExpirationDate.minLength} digits.`,
			maxlength: `This is too long, darling! Must not be more than ${this.amexExpirationDate.maxLength} digits.`,
			pattern: 'Invalid expiration date or invalid format. Something like 12/2025',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.amexExpirationDate, this.amexExpirationDateValidationRules);
		this.validate(this.amexExpirationDate, this.amexExpirationDateValidationRules);
	}

	//amex-nameoncard

	/**
    * @name validateAmexCardNumber
    * @function
    * 
    * @description validates name on american express card
    * 
    * @return does not return anything
    * 
    */
	validateAmexNameOnCard() {
		this.amexNameOnCard = this.formField('amex-name-on-card');
		this.amexNameOnCardValidationRules = {
			value: `Darling, I am expecting the name on the American Express Card!`,
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.amexNameOnCard.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.amexNameOnCard.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Jessica Moreno',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.amexNameOnCard, this.amexNameOnCardValidationRules);
		this.validate(this.amexNameOnCard, this.amexNameOnCardValidationRules);
	}
	// Amex Card Agrement

	/**
    * @name validateAmexPaymentAgreements
    * @function
    * 
    * @description validates amex card payment agreements
    * 
    * @return does not return anything
    * 
    */
	validateAmexPaymentAgreements() {
		this.amexCardPaymentAgreements = this.formField('agreement');
		const showAmexError = () => {
			this.amexCardPaymentAgreements.setCustomValidity('Darling, to proceed with the American Express Card payment we have to agree!')
		}
		this.amexCardPaymentAgreements.addEventListener('change', event => {
			this.amexCardPaymentAgreements.setCustomValidity('')
			this.amexCardPaymentAgreements.checkValidity()
			this.amexCardPaymentAgreements.reportValidity()
		})
		this.amexCardPaymentAgreements.addEventListener('invalid', event => {
			if (!this.amexCardPaymentAgreements.validity.valid) {
				showAmexError()
			}

		})
	}


	// Common stuffs

	// First name
	/**
    * @name validateFirstname
    * @function
    * 
    * @description validates firstname
    * 
    * @return does not return anything
    * 
    */
	validateFirstname() {
		this.firstname = this.formField('firstname');
		this.firstnameValidationRules = {
			value: 'Darling, I am expecting a first name!',
			type: 'Darling, first name must be a text',
			minlength: `This is too short, darling! Must be at least ${this.firstname.minLength} characters long.`,
			maxlength: `This is too long, darling! Must not be more than ${this.firstname.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Jessica',
			badinput: 'I will not accept this, darling.',
		};

		this.upperCaseFirstLetter(this.firstname)
		this.showFormFieldNameError(this.firstname, this.firstnameValidationRules);
		this.validate(this.firstname, this.firstnameValidationRules);
	}


	// Last name
	/**
    * @name validateLastname
    * @function
    * 
    * @description validates Lastname
    * 
    * @return does not return anything
    * 
    */
	validateLastname() {
		this.lastname = this.formField('lastname');
		this.lastnameValidationRules = {
			value: 'Darling, I am expecting a last name!',
			type: 'Darling, last name must be a text',
			minlength: `This is too short! Must be at least ${this.lastname.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.lastname.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Moreno',
			badinput: 'I will not accept this, darling.',
		};
		this.upperCaseFirstLetter(this.lastname)
		this.showFormFieldNameError(this.lastname, this.lastnameValidationRules);
		this.validate(this.lastname, this.lastnameValidationRules);
	}


	// username
	/**
    * @name validateUsername
    * @function
    * 
    * @description validates firstname
    * 
    * @return does not return anything
    * 
    */
	validateUsername() {
		this.username = this.formField('username');
		this.usernameValidationRules = {
			value: 'Darling, I am expecting a username!',
			type: 'Darling, last name must be a text',
			minlength: `This is too short! Must be at least ${this.username.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.username.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like johndoe',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.username, this.usernameValidationRules);
		this.validate(this.username, this.usernameValidationRules);
	}
	// nickname
	/**
    * @name validateNickname
    * @function
    * 
    * @description validates nickanme
    * 
    * @return does not return anything
    * 
    */
	validateNickname() {
		this.nickname = this.formField('nickname');
		this.nicknameValidationRules = {
			value: 'Darling, I am expecting a nickname!',
			type: 'Darling, last name must be a text',
			minlength: `This is too short! Must be at least ${this.nickname.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.nickname.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like iamcool',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.nickname, this.nicknameValidationRules);
		this.validate(this.nickname, this.nicknameValidationRules);
	}
	// subject
	/**
    * @name validateSubject
    * @function
    * 
    * @description validates SubvalidateSubject
    * 
    * @return does not return anything
    * 
    */
	validateSubject() {
		this.subject = this.formField('subject');
		this.subjectValidationRules = {
			value: 'Darling, I am expecting a message subject!',
			type: 'Darling, subject must be a text',
			minlength: `This is too short! Must be at least ${this.subject.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.subject.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Your pizza makes me super cool',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.subject, this.subjectValidationRules);
		this.validate(this.subject, this.subjectValidationRules);
	}
	// Message
	/**
    * @name validateMessage
    * @function
    * 
    * @description validates SubvalidateMessage
    * 
    * @return does not return anything
    * 
    */
	validateMessage() {
		this.message = this.formField('message');
		this.messageValidationRules = {
			value: 'Darling, I am expecting your message!',
			type: 'Darling, message must be a text',
			minlength: `This is too short! Must be at least ${this.message.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.message.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like I really liked the pizza',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.message, this.messageValidationRules);
		this.validate(this.message, this.messageValidationRules);
	}
	// Password
	/**
    * @name validatePassword
    * @function
    * 
    * @description validates SubvalidatePassword
    * 
    * @return does not return anything
    * 
    */
	validatePassword() {
		this.password = this.formField('password');
		this.passwordValidationRules = {
			value: 'Darling, I am expecting a password!',
			type: 'Darling, last name must be a text',
			minlength: `This is too short! Must be at least ${this.password.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.password.maxLength} characters long.`,
			pattern: 'Password must contain a least one upper case letter, on lower case letter, one digit, and a special character. Something like &1skyWalkers',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.password, this.passwordValidationRules);
		this.validate(this.password, this.passwordValidationRules);
	}
	// Password
	/**
    * @name validatePasswordConfirmation
    * @function
    * 
    * @description validates SubvalidatePasswordConfirmation
    * 
    * @return does not return anything
    * 
    */
	validatePasswordConfirmation() {
		this.passwordConfirmation = this.formField('password-confirmation');
		this.passwordConfirmationValidationRules = {
			value: 'Darling, I am expecting the exact same password you entered!',
			type: 'Darling, last name must be a text',
			minlength: `This is too short! Must be at least ${this.passwordConfirmation.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.passwordConfirmation.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like #10SkyWalkers',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.passwordConfirmation, this.passwordConfirmationValidationRules);
		this.validate(this.passwordConfirmation, this.passwordConfirmationValidationRules);
	}
	// Password Matcher 
	/**
    * @name passwordMatcher
    * @function
    * 
    * @description matches passwords with password confirmations
    * 
    * @return does not return anything
    * 
    */
	passwordMatcher() {
		this.password = this.formField('password')
		this.passwordConfirmation = this.formField('password-confirmation')

		this.passwordConfirmation.addEventListener('change', event => {
			this.passwordValue = this.password.value
			this.passwordConfirmationValue = this.passwordConfirmation.value
			this.passwordError = this.formField('password-error')
			this.passwordConfirmationError = this.formField('password-confirmation-error')
			if (this.passwordValue !== this.passwordConfirmationValue) {
				this.passwordError.innerHTML = `Mismatched password confirmation!`
				this.passwordError.style.color = 'red'
				this.passwordConfirmationError.innerHTML = `Mismatched password!`
				this.passwordConfirmationError.style.color = 'red'
			} else {
				this.passwordError.innerHTML = ``
				this.passwordConfirmationError.innerHTML = ``
			}
		})

	}
	// Email
	/**
    * @name validateEmail
    * @function
    * 
    * @description validates SubvalidateEmail
    * 
    * @return does not return anything
    * 
    */
	validateEmail() {
		this.email = this.formField('email');
		this.emailValidationRules = {
			value: 'Darling, I am expecting an email address!',
			type: 'Darling, email must be a valid email address',
			minlength: `This is too short! Must be at least ${this.email.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.email.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like weah@gmail.com',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.email, this.emailValidationRules);
		this.validate(this.email, this.emailValidationRules);
	}
	// Sign up Agreement
	/**
    * @name validateSignupAgreements
    * @function
    * 
    * @description validates signup agreements
    * 
    * @return does not return anything
    * 
    */
	validateSignupAgreements() {
		this.signupPaymentAgreements = this.formField('agreement');
		const showMasterError = () => {
			this.signupPaymentAgreements.setCustomValidity('Darling, to proceed with the signup we have to agree!')
		}
		this.signupPaymentAgreements.addEventListener('change', event => {
			this.signupPaymentAgreements.setCustomValidity('')
			this.signupPaymentAgreements.checkValidity()
			this.signupPaymentAgreements.reportValidity()
		})
		this.signupPaymentAgreements.addEventListener('invalid', event => {
			if (!this.signupPaymentAgreements.validity.valid) {
				showMasterError()
			}

		})
	}
	// City
	/**
    * @name validateCity
    * @function
    * 
    * @description validates SubvalidateCity
    * 
    * @return does not return anything
    * 
    */
	validateCity() {
		this.city = this.formField('city');
		this.cityValidationRules = {
			value: 'Darling, I am expecting an city name!',
			type: 'Darling, city must be a valid city name',
			minlength: `This is too short! Must be at least ${this.city.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.city.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Miami',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.city, this.cityValidationRules);
		this.validate(this.city, this.cityValidationRules);
	}

	// Billing City
	/**
    * @name validateBillingCity
    * @function
    * 
    * @description validates billing city
    * 
    * @return does not return anything
    * 
    */
	validateBillingCity() {
		this.billingCity = this.formField('billing-city');
		this.billingCityValidationRules = {
			value: 'Darling, I am expecting an billing city name!',
			type: 'Darling, billingCity must be a valid billing city name',
			minlength: `This is too short! Must be at least ${this.billingCity.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.billingCity.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like Miami',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.billingCity, this.billingCityValidationRules);
		this.validate(this.billingCity, this.billingCityValidationRules);
	}


	// Address
	/**
    * @name validateAddress
    * @function
    * 
    * @description validates address
    * 
    * @return does not return anything
    * 
    */
	validateAddress() {
		this.address = this.formField('address');
		this.addressValidationRules = {
			value: 'Darling, I am expecting an address name!',
			type: 'Darling, address must be a valid address name',
			minlength: `This is too short! Must be at least ${this.address.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.address.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like 1534 E 1300 S',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.address, this.addressValidationRules);
		this.validate(this.address, this.addressValidationRules);
	}
	
	/**
    * @name validateBillingAddress
    * @function
    * 
    * @description validates billing address
    * 
    * @return does not return anything
    * 
    */
	validateBillingAddress() {
		this.billingAddress = this.formField('billing-address');
		this.billingAddressValidationRules = {
			value: 'Darling, I am expecting an billing address name!',
			type: 'Darling, billingAddress must be a valid billingAddress name',
			minlength: `This is too short! Must be at least ${this.billingAddress.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.billingAddress.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like 1534 E 1300 S',
			badinput: 'I will not accept this, darling.',
		};
		this.showFormFieldNameError(this.billingAddress, this.billingAddressValidationRules);
		this.validate(this.billingAddress, this.billingAddressValidationRules);
	}
	// format phone number on keyup

	/**
    * @name formPhoneNumber
    * @function
    * 
    * @description formats phone number 
    * 
    * @return does not return anything
    * 
    */
	formPhoneNumber() {
		this.phone = this.formField('phone')
		this.phone.addEventListener('keyup', event => {
			if (this.phone.value.trim().length <= 8) {
				this.phone.value = this.phone.value.replace(/(\d{3})\-?/g, '$1-');
			} else {
				this.phone.value = this.phone.value.replace(/(\d{4})\-?/g, '$1');
			}
		});
	}

	/**
    * @name formBillingPhoneNumber
    * @function
    * 
    * @description format billing form number
    * 
    * @return does not return anything
    * 
    */
	formBillingPhoneNumber() {
		this.billingPhone = this.formField('billing-phone');
		this.billingPhone.addEventListener('keyup', (event) => {
			if (this.billingPhone.value.trim().length <= 8) {
				this.billingPhone.value = this.billingPhone.value.replace(/(\d{3})\-?/g, '$1-');
			} else {
				this.billingPhone.value = this.billingPhone.value.replace(/(\d{4})\-?/g, '$1');
			}
		});
	}
	// Phone
	/**
    * @name validatePhone
    * @function
    * 
    * @description validates phone
    * 
    * @return does not return anything
    * 
    */
	validatePhone() {
		this.phone = this.formField('phone');
		this.phoneValidationRules = {
			value: 'Darling, I am expecting an phone number!',
			type: 'Darling, phone must be a valid phone number',
			minlength: `This is too short! Must be at least ${this.phone.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.phone.maxLength} characters long.`,
			pattern: 'Wrong-formatted USA number. Darling, I am expecting something like 8013343435 or 801-334-3435',
			badinput: 'I will not accept this, darling.',
		};
		this.formPhoneNumber();
		this.showFormFieldNameError(this.phone, this.phoneValidationRules);
		this.validate(this.phone, this.phoneValidationRules);
	}
/**
    * @name validateBillingPhone
    * @function
    * 
    * @description validates billing phone
    * 
    * @return does not return anything
    * 
    */
	validateBillingPhone() {
		this.billingPhone = this.formField('billing-phone');
		this.billingPhoneValidationRules = {
			value: 'Darling, I am expecting a phone number!',
			type: 'Darling, phone must be a valid phone number',
			minlength: `This is too short! Must be at least ${this.billingPhone.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.billingPhone.maxLength} characters long.`,
			pattern: 'Wrong-formatted USA number. Darling, I am expecting something like 8013343435 or 801-334-3435',
			badinput: 'I will not accept this, darling.',
		};
		//this.formBillingPhoneNumber();
		this.showFormFieldNameError(this.billingPhone, this.billingPhoneValidationRules);
		this.validate(this.billingPhone, this.billingPhoneValidationRules);
	}

    /**
    * @name isStateAndZipMatched
    * @function
    * 
    * @description checks for a match between a state name and a zip code
    * 
    * @return does not return anything
    * 
    */
	isStateAndZipMatched() {
		let zipmin = parseInt(this.option('state').getAttribute('zipmin'));
		let zipmax = parseInt(this.option('state').getAttribute('zipmax'));
		let state = this.option('state').getAttribute('name');
		this.zipError = this.formField('zip-error');
		let zip = parseInt(this.zip.value.trim().split('-')[0]);

		if (zip > zipmax || zip < zipmin) {
			this.zipError.innerHTML = `Invalid zip for the State of ${state}`;
			this.zipError.style.color = 'red';
		} else {
			this.zipError.innerHTML = '';
		}
	}
	 /**
    * @name isBillingStateAndBillingZipMatched
    * @function
    * 
    * @description checks for a match between a billing state name and a billing zip code
    * 
    * @return does not return anything
    * 
    */
	isBillingStateAndBillingZipMatched() {
		let zipmin = parseInt(this.option('billing-state').getAttribute('zipmin'));
		let zipmax = parseInt(this.option('billing-state').getAttribute('zipmax'));
		let billingState = this.option('billing-state').getAttribute('name');
		this.billingZipError = this.formField('billingZip-error');
		let billinZip = parseInt(this.billingZip.value.trim().split('-')[0]);

		if (billinZip > zipmax || billinZip < zipmin) {
			this.billingZipError.innerHTML = `Invalid zip for the State of ${billingState}`;
			this.billingZipError.style.color = 'red';
		} else {
			this.billingZipError.innerHTML = '';
		}
	}

	// check state on zip change
	 /**
    * @name checkZipOnStateChange
    * @function
    * 
    * @description checks zip when the value of state changes
    * 
    * @return does not return anything
    * 
    */
	checkZipOnStateChange() {
		this.state = this.formField('state')
		this.state.addEventListener(
			'change',
			(event) => {
				// this.zip.dispatchEvent(new CustomEvent('state-change'));
				this.isStateAndZipMatched()
			});
	}
	
	/**
    * @name checkBillingStateOnBillingZipChange
    * @function
    * 
    *  @description checks billing zip when the value of state changes
    * 
    * @return does not return anything
    * 
    */
	checkBillingZipOnBillingStateChange() {
		this.billingState = this.formField('billing-state')
		this.billingState.addEventListener(
			'change',
			(event) => {
				// this.zip.dispatchEvent(new CustomEvent('state-change'));
				this.isBillingStateAndBillingZipMatched()
			});
	}

	// check zip on state change
	/**
    * @name checkStateOnZipChange
    * @function
    * 
    *  @description checks state when the value of zip changes
    * 
    * @return does not return anything
    * 
    */
	checkStateOnZipChange() {
		this.zip = this.formField('zip')
		this.state = this.formField('state')
		this.zip.addEventListener('change', (event) => {
			this.state.dispatchEvent(new CustomEvent('change'));
			this.isStateAndZipMatched()
		});
	}
	/**
    * @name checkBillingStateOnBillingZipChange
    * @function
    * 
    *  @description checks billing state when the value of billing zip changes
    * 
    * @return does not return anything
    * 
    */
	checkBillingStateOnBillingZipChange() {
		this.billingZip.addEventListener('change', (event) => {
			this.billingState.dispatchEvent(new CustomEvent('change'));
			this.isBillingStateAndBillingZipMatched()
		});
	}
	// Zip
	/**
    * @name validateZip
    * @function
    * 
    * @description validate zip
    * 
    * @return does not return anything
    * 
    */
	validateZip() {
		this.zip = this.formField('zip');
		this.zipValidationRules = {
			value: 'Darling, I am expecting a zip code!',
			type: 'Darling, zip must be a valid zip code',
			minlength: `This is too short! Must be at least ${this.zip.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.zip.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like 84105',
			badinput: 'I will not accept this, darling.',
		};
		this.checkZipOnStateChange();
		this.checkStateOnZipChange();
		this.showFormFieldNameError(this.zip, this.zipValidationRules);
		this.validate(this.zip, this.zipValidationRules);
	}
	/**
    * @name validateBillingZip
    * @function
    * 
    * @description validate billing zip
    * 
    * @return does not return anything
    * 
    */
	validateBillingZip() {
		this.billingZip = this.formField('billing-zip');
		this.billingZipValidationRules = {
			value: 'Darling, I am expecting an zip code!',
			type: 'Darling, zip must be a valid zip code',
			minlength: `This is too short! Must be at least ${this.billingZip.minLength} characters long.`,
			maxlength: `This is too Long! Must not be more than ${this.billingZip.maxLength} characters long.`,
			pattern: 'Please use correct formatting. Something like 84105',
			badinput: 'I will not accept this, darling.',
		};
		//this.checkZipOnStateChange();
		this.checkBillingStateOnBillingZipChange()
		this.checkBillingZipOnBillingStateChange()
		//this.checkStateOnZipChange();
		this.showFormFieldNameError(this.billingZip, this.billingZipValidationRules);
		this.validate(this.billingZip, this.billingZipValidationRules);
	}
	// State
	/**
    * @name validateZipOnStateChange
    * @function
    * 
    * @description emits change event on state change
    * 
    * @return does not return anything
    * 
    */
	validateZipOnStateChange() {
		this.state = this.formField('state');
		this.state.addEventListener('change', (event) => {
			this.zip.dispatchEvent(new CustomEvent('change'));
		});
	}

	/**
    * @name formatPhoneNumberOnChange
    * @function
    * 
    * @description formats form number on change
    * 
    * @return does not return anything
    * 
    */
	formatPhoneNumberOnChange() {
		this.formBillingPhoneNumber()
		this.formPhoneNumber()
	}

    /**
    * @name validateShappingForm
    * @function
    * 
    * @description validate shapping form
    * 
    * @return does not return anything
    * 
    */
	validateShappingForm() {
		// First name
		this.validateFirstname();

		// Last name
		this.validateLastname();

		// Email
		this.validateEmail();

		// City
		this.validateCity();
		this.validateBillingCity()

		// Address
		this.validateAddress();
		this.validateBillingAddress()

		// Phone
		this.validatePhone();
		this.validateBillingPhone()


		// Zip
		this.validateZip();
		this.validateBillingZip()
	}
	/**
    * @name validateSignupForm
    * @function
    * 
    * @description validate signup form
    * 
    * @return does not return anything
    * 
    */
	validateSignupForm() {
		// match password and password confirmation
		this.passwordMatcher()

		// First name
		this.validateFirstname();

		// Last name
		this.validateLastname();

		// Email
		this.validateEmail();

		// username
		this.validateUsername()

		// Address
		this.validateNickname()

		// Phone
		this.validatePhone();

		// Password
		this.validatePassword()

		// Password Confirmation
		this.validatePasswordConfirmation()
		// signup agreement
		this.validateSignupAgreements()
	}
	/**
    * @name validateContactForm
    * @function
    * 
    * @description validate contact form
    * 
    * @return does not return anything
    * 
    */
	validateContactForm() {
		// First name
		this.validateFirstname();

		// Last name
		this.validateLastname();

		// Email
		this.validateEmail();

		// Phone
		this.validatePhone();

		// Subject 
		this.validateSubject()

		// Message 
		this.validateMessage()
	}

	/**
    * @name validateLoginForm
    * @function
    * 
    * @description validate login form
    * 
    * @return does not return anything
    * 
    */
   validateLoginForm() {
	// Phone
	this.validatePhone();
	// Password
	this.validatePassword()
	// Password Confirmation
	this.validatePasswordConfirmation()
	
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
customElements.define('app-validator', Validator);
export default Validator;

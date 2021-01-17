'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module PizzaElement
 * @kind class
 * 
 * @extends BaseElement
 * 
 * @requires BaseElement
 * 
 * @classdesc ContactElement class for the account page
 * 
 */
import BaseElement from '../../BaseElement.js'
class PizzaElement extends BaseElement {
    constructor() {
        super();
        // element created
        this.types = this.storage().types
        // list of pizza added to the dom <menu-pizza></menu-pizza>
        this.pizzas = []
    }

    /**
    * @name prices
    * @function
    * 
    * 
    * @description declares prices for each pizza element
    * 
    * @return does not return anything
    * 
    */
    prices() {
        this.prairiePrices = [9.95, 12.75, 17.45, 23.57]
        this.texanPrices = [10.45, 15.95, 20.75, 25.69]
        this.broncoPrices = [8.95, 11.85, 14.45, 17.98]
        this.roundupPrices = [5.98, 8.95, 14.75, 19.69]

        this.chickenPrices = [7.98, 13.95, 17.75, 21.69]
        this.cheesePrices = [7.98, 9.95, 13.75, 15.69]
        this.baconPrices = [6.98, 8.95, 14.75, 18.69]
        this.romaPrices = [9.97, 15.57, 18.75, 22.69]

        this.italianPrices = [11.65, 13.45, 17.85, 27.85]
        this.hawaiianPrices = [7.25, 9.75, 15.95, 19.99]
        this.tasmanianPrices = [4.95, 7.85, 10.95, 12.87]
        this.ivorianPrices = [7.55, 10.85, 13.97, 18.99]


        this.canadianPrices = [6.69, 9.99, 15.87, 20.55]
        this.ausiePrices = [5.99, 8.85, 12.87, 17.97]
        this.happyPrices = [6.27, 8.99, 13.75, 19.97]
        this.wonderfulPrices = [5.00, 7.00, 9.00, 12.00]

        this.bbqPrices = [5.87, 7.95, 12.85, 17.89]
        this.beefPrices = [6.97, 11.99, 15.75, 22.98]
        this.buffaloPrices = [7.15, 9.99, 13.65, 18.85]
        this.wêsPrices = [6.55, 10.87, 13.95, 18.35]

        this.szranPrices = [5.98, 8.95, 12.75, 17.95]
        this.lagoPrices = [5.15, 7.55, 9.35, 15.55]
        this.gnonsoaPrices = [4.75, 7.85, 12.45, 15.99]
        this.yummyPrices = [6.45, 10.95, 15.35, 20.85]
    }

    /**
    * @name priceRanges
    * @function
    * 
    * 
    * @description declares price ranges for each pizza element
    * 
    * @return does not return anything
    * 
    */
    priceRanges() {
        this.prairiePriceRange = `\$${Math.min(...this.prairiePrices)} - \$${Math.max(...this.prairiePrices)}`
        this.broncoPriceRange = `\$${Math.min(...this.broncoPrices)} - \$${Math.max(...this.broncoPrices)}`
        this.texanPriceRange = `\$${Math.min(...this.texanPrices)} - \$${Math.max(...this.texanPrices)}`
        this.roundupPriceRange = `\$${Math.min(...this.roundupPrices)} - \$${Math.max(...this.roundupPrices)}`

        this.chickenPriceRange = `\$${Math.min(...this.chickenPrices)} - \$${Math.max(...this.chickenPrices)}`
        this.cheesePriceRange = `\$${Math.min(...this.cheesePrices)} - \$${Math.max(...this.cheesePrices)}`
        this.baconPriceRange = `\$${Math.min(...this.baconPrices)} - \$${Math.max(...this.baconPrices)}`
        this.romaPriceRange = `\$${Math.min(...this.romaPrices)} - \$${Math.max(...this.romaPrices)}`

        this.italianPriceRange = `\$${Math.min(...this.italianPrices)} - \$${Math.max(...this.italianPrices)}`
        this.hawaiianPriceRange = `\$${Math.min(...this.hawaiianPrices)} - \$${Math.max(...this.hawaiianPrices)}`
        this.tasmanianPriceRange = `\$${Math.min(...this.tasmanianPrices)} - \$${Math.max(...this.tasmanianPrices)}`
        this.ivorianPriceRange = `\$${Math.min(...this.ivorianPrices)} - \$${Math.max(...this.ivorianPrices)}`

        this.canadianPriceRange = `\$${Math.min(...this.canadianPrices)} - \$${Math.max(...this.canadianPrices)}`
        this.ausiePriceRange = `\$${Math.min(...this.ausiePrices)} - \$${Math.max(...this.ausiePrices)}`
        this.happyPriceRange = `\$${Math.min(...this.happyPrices)} - \$${Math.max(...this.happyPrices)}`
        this.wonderfulPriceRange = `\$${Math.min(...this.wonderfulPrices)} - \$${Math.max(...this.wonderfulPrices)}`

        this.bbqPriceRange = `\$${Math.min(...this.bbqPrices)} - \$${Math.max(...this.bbqPrices)}`
        this.beefPriceRange = `\$${Math.min(...this.beefPrices)} - \$${Math.max(...this.beefPrices)}`
        this.buffaloPriceRange = `\$${Math.min(...this.buffaloPrices)} - \$${Math.max(...this.buffaloPrices)}`
        this.wêsPriceRange = `\$${Math.min(...this.wêsPrices)} - \$${Math.max(...this.wêsPrices)}`

        this.szranPriceRange = `\$${Math.min(...this.szranPrices)} - \$${Math.max(...this.szranPrices)}`
        this.lagoPriceRange = `\$${Math.min(...this.lagoPrices)} - \$${Math.max(...this.lagoPrices)}`
        this.gnonsoaPriceRange = `\$${Math.min(...this.gnonsoaPrices)} - \$${Math.max(...this.gnonsoaPrices)}`
        this.yummyPriceRange = `\$${Math.min(...this.yummyPrices)} - \$${Math.max(...this.yummyPrices)}`
    }
    
    /**
    * @name formField
    * @function
    * 
    * @description gets form field element by id
    * 
    * @return {HTMLElement} form field element
    * 
    */
    formField(fieldId) {
        return this.shadowRoot.getElementById(fieldId)
    }

     /**
    * @name addToppings
    * @function
    * 
    * 
    * @description add toppings to each pizza
    * 
    * @return does not return anything
    * 
    */

    addToppings = (toppingArray = []) => {
        if (!Array.isArray(toppingArray) || !toppingArray.length || toppingArray.length == 0) return
        const toppings = this.formField('toppings')
        toppingArray.forEach(topping => {
            const li = document.createElement('li')
            li.innerHTML = `${topping}`
            toppings.appendChild(li)
        })
    }
    // checkPizzaType = type => this.pizzas.indexOf(type) > -1 ? true : false

    /**
    * @name checkPizzaType
    * @function
    * 
    * 
    * @description checks pizza type
    * 
    * @param {Array} pizzaNameArray array containing pizza names
    * @param {String} type pizza type
    * 
    * @return {Boolean} true is type is a string, false otherwise
    * 
    */
    checkPizzaType = (pizzaNameArray = [], type = 'string') => Array.isArray(pizzaNameArray) ? pizzaNameArray.indexOf(type) > -1 ? true : false : false

    /**
    * @name prairieDetails
    * @function
    * 
    * @description sets prairie pizza details
    * 
    * @return {Object} prairie pizza details
    * 
    */
    prairieDetails() {
        const details = {
            subtitle: 'Your taste of our Prairie is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
        }

        return details
    }
      /**
    * @name texanDetails
    * @function
    * 
    * @description sets texan pizza details
    * 
    * @return {Object} texan pizza details
    * 
    */
    texanDetails() {
        const details = {
            subtitle: 'Your taste of our Texan is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

      /**
    * @name broncoDetails
    * @function
    * 
    * @description sets bronco pizza details
    * 
    * @return {Object} bronco pizza details
    * 
    */
    broncoDetails() {
        const details = {
            subtitle: 'Your taste of our Bronco is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }
      /**
    * @name romaDetails
    * @function
    * 
    * @description sets roma pizza details
    * 
    * @return {Object} roma pizza details
    * 
    */
    romaDetails() {
        const details = {
            subtitle: 'Your taste of our Roma is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }
    
    /**
    * @name italianDetails
    * @function
    * 
    * @description sets italian pizza details
    * 
    * @return {Object} italian pizza details
    * 
    */
    italianDetails() {
        const details = {
            subtitle: 'Your taste of our Italian is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name hawaiianDetails
    * @function
    * 
    * @description sets hawaiian pizza details
    * 
    * @return {Object} hawaiian pizza details
    * 
    */
    hawaiianDetails() {
        const details = {
            subtitle: 'Your taste of our Hawaiian is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name tasmanianDetails
    * @function
    * 
    * @description sets tasmanian pizza details
    * 
    * @return {Object} tasmanian pizza details
    * 
    */
    tasmanianDetails() {
        const details = {
            subtitle: 'Your taste of our Tasmanian is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name ivorianDetails
    * @function
    * 
    * @description sets ivorian pizza details
    * 
    * @return {Object} ivorian pizza details
    * 
    */
    ivorianDetails() {
        const details = {
            subtitle: 'Your taste of our Ivorian is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name canadianDetails
    * @function
    * 
    * @description sets canadian pizza details
    * 
    * @return {Object} canadian pizza details
    * 
    */
    canadianDetails() {
        const details = {
            subtitle: 'Your taste of our Canadian is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name ausieDetails
    * @function
    * 
    * @description sets ausie pizza details
    * 
    * @return {Object} ausie pizza details
    * 
    */
    ausieDetails() {
        const details = {
            subtitle: 'Your taste of our Ausie is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }
    /**
    * @name wonderfulDetails
    * @function
    * 
    * @description sets wonderful pizza details
    * 
    * @return {Object} wonderful pizza details
    * 
    */
    wonderfulDetails() {
        const details = {
            subtitle: 'Your taste of our Wonderful is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name chickenDetails
    * @function
    * 
    * @description sets chicken pizza details
    * 
    * @return {Object} chicken pizza details
    * 
    */
    chickenDetails() {
        const details = {
            subtitle: 'Your taste of our Chicken is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name bbqDetails
    * @function
    * 
    * @description sets bbq pizza details
    * 
    * @return {Object} bbq pizza details
    * 
    */
    bbqDetails() {
        const details = {
            subtitle: 'Your taste of our BBQ is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name beefDetails
    * @function
    * 
    * @description sets beef pizza details
    * 
    * @return {Object} beef pizza details
    * 
    */
    beefDetails() {
        const details = {
            subtitle: 'Your taste of our Beef is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name cheeseDetails
    * @function
    * 
    * @description sets cheese pizza details
    * 
    * @return {Object} cheese pizza details
    * 
    */
    cheeseDetails() {
        const details = {
            subtitle: 'Your taste of our Cheese is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name chickenDetails
    * @function
    * 
    * @description sets chicken pizza details
    * 
    * @return {Object} chicken pizza details
    * 
    */
    buffaloDetails() {
        const details = {
            subtitle: 'Your taste of our Buffalo is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name baconDetails
    * @function
    * 
    * @description sets bacon pizza details
    * 
    * @return {Object} bacon pizza details
    * 
    */
    baconDetails() {
        const details = {
            subtitle: 'Your taste of our Bacon  is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name happyDetails
    * @function
    * 
    * @description sets happy pizza details
    * 
    * @return {Object} happy pizza details
    * 
    */
    happyDetails() {
        const details = {
            subtitle: 'Your taste of our Happy is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name roundupDetails
    * @function
    * 
    * @description sets roundup pizza details
    * 
    * @return {Object} roundup pizza details
    * 
    */
    roundupDetails() {
        const details = {
            subtitle: 'Your taste of our Roundup is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name szranDetails
    * @function
    * 
    * @description sets szran pizza details
    * 
    * @return {Object} szran pizza details
    * 
    */
    szranDetails() {
        const details = {
            subtitle: 'Your taste of our Szran is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name wêsDetails
    * @function
    * 
    * @description sets wês pizza details
    * 
    * @return {Object} wês pizza details
    * 
    */
    wêsDetails() {
        const details = {
            subtitle: 'Your taste of our Wês is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name gnonsoaDetails
    * @function
    * 
    * @description sets gnonsoa pizza details
    * 
    * @return {Object} gnonsoa pizza details
    * 
    */
    gnonsoaDetails() {
        const details = {
            subtitle: 'Your taste of our Gnonsoa is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

     /**
    * @name yummyDetails
    * @function
    * 
    * @description sets yummy pizza details
    * 
    * @return {Object} yummy pizza details
    * 
    */
    yummyDetails() {
        const details = {
            subtitle: 'Your taste of our Yummy is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name lagoDetails
    * @function
    * 
    * @description sets lago pizza details
    * 
    * @return {Object} lago pizza details
    * 
    */
    lagoDetails() {
        const details = {
            subtitle: 'Your taste of our Lago is our witness!',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
        }
        return details
    }

    /**
    * @name structurePizzaDetails
    * @function
    * 
    * @description structures pizza details
    * 
    * @return {Array} pizza details array
    * 
    */
    structurePizzaDetails = array => array.map(type => ({
        subtitle: `${this[`${type}Details`]().subtitle}`,
        description: `${this[`${type}Details`]().description}`
    }))

    /**
    * @name detailedPizza
    * @function
    * 
    * @param {Array} array array containing pizza types
    * 
    * @description sets each pizza details
    * 
    * @return {Object} pizza details
    * 
    */
    detailedPizza(array) {
        const details = {
            subtitle: this.structurePizzaDetails(array)[0].subtitle,
            description: this.structurePizzaDetails(array)[0].description
        }
        return details
    }

    /**
    * @name pizzaDetails
    * @function
    * 
    * @param {Array} array array containing pizza types
    * @param {String} type pizza type
    * 
    * @description checks pizza types and sets pizza details
    * 
    * @return {Object} pizza details
    * 
    */
    pizzaDetails(type, array = []) {
        if (this.checkPizzaType(array, type)) {
            return this.detailedPizza(array)

        }
    }

    /**
    * @name pizzaDetails
    * @function
    * 
    * @param {Array} array array containing pizza types
    * @param {String} typePizza pizza type
    * 
    * @description checks pizza types and sets pizza details
    * 
    * @return {Object} pizza details
    * 
    */
    pizzaInfoDetails(typePizza, array = this.pizzas) {
        return this.pizzaDetails(typePizza, array)
    }

    /**
    * @name pizzaInit
    * @function
    * 
    * @param {String} typePizza pizza type
    * 
    * @description initiats and sets pizza details
    * 
    * @return does not return anything
    * 
    */
    pizzaInit(typePizza) {
        if (typeof typePizza !== 'string' || !typePizza.trim().length || typePizza.trim().length === 0) return
        const pizzaType = typePizza.trim().toLowerCase()
        const image = this.formField('image')
        const link = this.formField('image-link')
        const type = this.shadowRoot.getElementById('pizza')
        const price = this.shadowRoot.getElementById('price')
        type.innerHTML = `${this.getAttribute('name')}`

        if (this.getAttribute('name').toLowerCase().trim() === pizzaType) {

            const topping = this.types[`${pizzaType}`]
            const priceRange = `${this[`${pizzaType}PriceRange`]}`
            const prices = new Array(`${this[`${pizzaType}Prices`]}`)
            price.innerHTML = `${priceRange}`
            type.setAttribute('type', this.getAttribute('name').toLowerCase().trim())
            type.setAttribute('name', this.getAttribute('name'))
            this.setSizePrice('small', parseFloat(prices[0]))
            this.setSizePrice('medium', parseFloat(prices[0]))
            this.setSizePrice('large', parseFloat(prices[0]))
            this.setSizePrice('xlarge', parseFloat(prices[0]))
            if (pizzaType === 'wês') {
                image.setAttribute('src', `../../../../public/images/menu/wes.jpg`)
            } else {
                image.setAttribute('src', `../../../../public/images/menu/${pizzaType}.jpg`)
            }
            image.setAttribute('alt', `${pizzaType}`)
            this.addPizzaToppings(topping.toppings)
            link.setAttribute('href', 'pizza')
            link.addEventListener('click', event => {
                let pizzaImage
                if (pizzaType === 'wês') {
                    pizzaImage = `../../../../public/images/menu/swes.jpg`
                } else {
                    pizzaImage = `../../../../public/images/menu/s${pizzaType}.jpg`
                }
                const data = {
                    type: this.formField('pizza').getAttribute('type'),
                    name: this.getAttribute('name'),
                    image: pizzaImage,
                    alt: image.getAttribute('alt'),
                    toppings: topping,
                    details: this.pizzaInfoDetails(typePizza)
                }
                window.localStorage.setItem('pizza', JSON.stringify(data))
                this.sendRouteDataChanel.postMessage(data)
            })

        }
    }

   
    /**
    * @name onElementNaming
    * @function
    * 
    * @description initiats and sets pizza on pizza namping
    * 
    * @return does not return anything
    * 
    */
    onElementNaming() {
        if (!Array.isArray(this.pizzas) || !this.pizzas.length || this.pizzas.length === 0) return

        this.addPizzaToppings = this.callFirstOnlyNTimes(this.addToppings)
        this.pizzas.forEach(pizza => {
            this.pizzaInit(pizza)
        })
    }
    /**
    * @name addButton
    * @function
    * 
    * @description gets and sets shadow element with id add-button
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
    addButton = () => this.shadowRoot.getElementById('add-button')

    /**
    * @name single
    * @function
    * 
    * @description gets and sets shadow element with id single-pizza
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
    single = () => this.shadowRoot.getElementById('single-pizza')

    /**
    * @name formContainer
    * @function
    * 
    * @description gets and sets shadow element with id pizza-form-container
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
    formContainer = () => this.shadowRoot.getElementById('pizza-form-container')
    
    /**
    * @name doneButton
    * @function
    * 
    * @description gets and sets shadow element with id done-button
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */

   doneButton = () => this.shadowRoot.getElementById('done-button')

    /**
    * @name addContainer
    * @function
    * 
    * @description gets and sets shadow element with id add-container
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
  
    addContainer = () => this.shadowRoot.getElementById('add-container')

    /**
    * @name optionsForm 
    * @function
    * 
    * @description gets and sets shadow element with id options-form
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */

    optionsForm = () => this.shadowRoot.getElementById('options-form')


    /**
    * @name addButton
    * @function
    * 
    * @description gets and sets shadow element with id add
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */

    addButton = () => this.shadowRoot.getElementById('add')


    /**
    * @name doneButton
    * @function
    * 
    * @description gets and sets shadow element with id done
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
    doneButton = () => this.shadowRoot.getElementById('done')


    /**
    * @name onStorageChange
    * @function
    * 
    * @description gets and sets token on window storage event
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
    onStorageChange() {
        window.addEventListener('storage', event => {
            if (window.localStorage.getItem('window number') !== null) {
                this.token = JSON.parse(window.localStorage.getItem('window number')).id
            }
        })
    }


    /**
    * @name onLoadAuthDetails 
    * @function
    * 
    * @description gets and sets token on window load event
    * 
    * @return {HTMLElement} the shadow root element
    * 
    */
    onLoadAuthDetails() {
        window.addEventListener('load', event => {
            if (window.localStorage.getItem('window number') !== null) {
                this.token = JSON.parse(window.localStorage.getItem('window number')).id
            }
        })
    }

    /**
    * @name getOrders()
    * @function
    * 
    * @description gets and sets orders
    * 
    * @return {Promise} all
    * 
    */
    async getOrders() {
        const response = await fetch('http://localhost:3000/api/orders/add')
        return response.json()
    }

    /**
    * @name setSizePrice
    * @function
    * 
    * @param {String} size single pizza size
    * @param {String} price single pizza price
    * 
    * @description gets and initiat pizza price and size
    * 
    * @return dos not return anything
    * 
    */
    setSizePrice(size, price) {
        const sizeElement = this.shadowRoot.getElementById(`size-${size}`)
        if (this.hasAttribute(size)) {
            if (typeof parseFloat(this.getAttribute(size).toLowerCase().trim()) === 'number') {
                sizeElement.setAttribute('price', this.getAttribute(size))
            } else {
                this.setAttribute(size, price)
                sizeElement.setAttribute('price', this.getAttribute(size))
            }
        } else {
            this.setAttribute(size, price)
            sizeElement.setAttribute('price', this.getAttribute(size))
        }
    }

    /**
    * @name add
    * @function
    * 
    * @description show add form upon click event
    * 
    * @return dos not return anything
    * 
    */
    add() {
        this.addButton.addEventListener('click', event => {
            event.preventDefault()
            this.addContainer.style.display = 'none'
            this.optionsForm.style.display = 'flex'

        })
    }

    /**
    * @name calculate
    * @function
    * 
    * @param {Number} units total number of pizza
    * @param {Number} price single pizza price
    * 
    * @description calcualte pizza price per unit
    * 
    * @return dos not return anything
    * 
    */
    calculate = (price, units) => {
        const total = parseFloat(price) * parseInt(units)
        return total.toFixed(2)
    }
    /**
    * @name formatPrice
    * @function
    * 
    * @param {String} price single pizza price
    * 
    * @description format pizza price
    * 
    * @return {String} formatted string
    * 
    */
    formatPrice(price) {
        let finalString;
        if (price.length > 5) {
            const str = price.slice(-price.length, -3)
            if (str.length > 3) {
                const thousands = str.slice(-str, -3)
                const decimal = price.slice(4, price.length)
                const hundreds = str.slice(-str, -1)
                finalString = thousands.concat(',', hundreds, decimal)
            } else {
                finalString = price
            }
        } else {
            finalString = price

        }
        return finalString
    }

    /**
    * @name findChildElement
    * @function
    * 
    * @param {String}  parentId id of the parent element of the shadow DOM
    * 
    * @description finds the child element
    * 
    * @return {HTMLElement} parent and child elements
    * 
    */
    findChildElement(parentId) {
        try {
            const parent = this.shadowRoot.getElementById(parentId)
            let child
            for (let childEl of parent.children) {
                if (childEl.value === parent.value) child = childEl
            }
            return {
                child,
                parent
            }
        } catch (error) {
            return {}
        }
    }

    /**
    * @name isNotEmpty
    * @function
    * 
    * 
    * @description checks to see if window local storage is not empty
    * 
    * @return {Boolean} true if wondow local storage is empty; false otherwise
    * 
    */
    isNotEmpty() {
        return !!(localStorage.length > 0)
    }

    /**
    * @name isPresent
    * @function
    * 
    * @param {String} localObject the local storage item name
    * 
    * @description checks for the presence of a local storage item
    * 
    * @return {Object|Null} local storage item name localObject if wondow local storage is empty; null otherwise
    * 
    */
    isPresent(localObject) {
        return !!(window.localStorage.getItem(localObject) !== null)
    }

     /**
    * @name getLocalData
    * @function
    * 
    * @param {String} data the local storage item name
    * 
    * @description get local storage items names data
    * 
    * @return {Object|Null} local storage item name data if wondow local storage is empty; null otherwise
    * 
    */
    getLocalData(data) {
        return JSON.parse(window.localStorage.getItem(data))
    }


    /**
    * @name optionsData
    * @function
    * 
    * @description builds cart object
    * 
    * @return {Object} the cart object 
    * 
    */

    optionsData() {

        const pizza = this.shadowRoot.getElementById('pizza')
        const sizes = this.findChildElement('size')

        const price = sizes.child.getAttribute('price')
        const quantity = this.shadowRoot.getElementById('quantity')
        const totalPrice = this.calculate(price, quantity.value)

        // const cartObject = {
        //     name: pizza.getAttribute('name'),
        //     type: pizza.getAttribute('type'),
        //     price: `\$${this.formatPrice(totalPrice)}`,
        //     size: sizes.parent.value,
        //     quantity: quantity.value,
        //     uPrice: price,
        //     unitPrice: `\$${price}`,
        // }
        const cartObject = {
            // name: pizza.getAttribute('name'),
            type: pizza.getAttribute('type'),
            size: sizes.parent.value,
            quantity: parseInt(quantity.value),
            placed: false
        }
        return cartObject

    }
   
    

   /**
    * @name addToNotAuthCart
    * @function
    * 
    * @param {Object} data cart array data
    * @param {Array} cart the cart array
    * @description builds cart object
    * 
    * @return {Array} the cart array containing data
    * 
    */

    addToNotAuthCart(data, cart = []) {
        cart.push(data)
        return cart
    }

    /**
    * @name storage
    * @function
    * 

    * @description sets all menus
    * 
    * @return {Object} the menus object containing all menu items
    * 
    */
    storage() {
        const menus = {
            types: {
                prairie: {
                    toppings: ['Broccoli', 'Red Onions', 'Black Olives', 'Green Olives', 'Green Peppers', 'Spinach', 'Sliced Tomatoes', 'American Cheese'],
                    name: 'prairie',
                    sizes: [{
                        size: 'small',
                        price: '9.95'
                    }, {
                        size: 'medium',
                        price: '12.75'
                    }, {
                        size: 'large',
                        price: '17.45'
                    }, {
                        size: 'xlarge',
                        price: '23.57'
                    }],
                    quantity: 600
                },
                texan: {
                    toppings: ['Beef', 'Lettuce', 'Tomatoes', 'Taco Sauce', 'Red Onions', 'Pepperoni', 'Cheese'],
                    name: 'texan',
                    sizes: [{
                        size: 'small',
                        price: '10.45'
                    }, {
                        size: 'medium',
                        price: '15.95'
                    }, {
                        size: 'large',
                        price: '20.75'
                    }, {
                        size: 'xlarge',
                        price: '25.69'
                    }],
                    quantity: 550
                },
                bronco: {
                    toppings: ['Beef', 'Pepperoni', 'Canadian Bacon', 'Bacon Pieces', 'Black Olives', 'Lettuce', 'Tomatoes', 'Red Pepper'],
                    name: 'bronco',
                    sizes: [{
                        size: 'small',
                        price: '8.95'
                    }, {
                        size: 'medium',
                        price: '11.85'
                    }, {
                        size: 'large',
                        price: '14.45'
                    }, {
                        size: 'xlarge',
                        price: '17.98'
                    }],
                    quantity: 500
                },
                roma: {
                    toppings: ['Sliced Tomatoes', 'Green Pepper', 'Alfredo Sauce', 'Pineapple', 'Black Olives', 'Red Chilis'],
                    name: 'roma',
                    sizes: [{
                        size: 'small',
                        price: '9.97'
                    }, {
                        size: 'medium',
                        price: '15.57'
                    }, {
                        size: 'large',
                        price: '18.75'
                    }, {
                        size: 'xlarge',
                        price: '22.69'
                    }],
                    quantity: 150
                },
                //this.italianPrices = [11.65, 13.45, 17.85, 27.85]
                italian: {
                    toppings: ['Pepperoni', 'Spinach', 'Red Onins', 'Red Chilis', 'Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
                    name: 'italian',
                    sizes: [{
                        size: 'small',
                        price: '11.65'
                    }, {
                        size: 'medium',
                        price: '13.45'
                    }, {
                        size: 'large',
                        price: '17.85'
                    }, {
                        size: 'xlarge',
                        price: '27.85'
                    }],
                    quantity: 100
                },
                //this.hawaiianPrices = [7.25, 9.75, 15.95, 19.99]
                hawaiian: {
                    toppings: ['Pepperoni', 'Chicken', 'Bacon', 'Ground Tomatoes', 'Red Onions'],
                    name: 'hawaiian',
                    sizes: [{
                        size: 'small',
                        price: '7.25'
                    }, {
                        size: 'medium',
                        price: '9.75'
                    }, {
                        size: 'large',
                        price: '15.95'
                    }, {
                        size: 'xlarge',
                        price: '19.99'
                    }],
                    quantity: 100
                },
                //this.tasmanianPrices = [4.95, 7.85, 10.95, 12.87]
                tasmanian: {
                    toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes', 'Mushroom', 'Spinach', 'Black Olives'],
                    name: 'tasmanian',
                    sizes: [{
                        size: 'small',
                        price: '4.95'
                    }, {
                        size: 'medium',
                        price: '7.85'
                    }, {
                        size: 'large',
                        price: '10.95'
                    }, {
                        size: 'xlarge',
                        price: '12.87'
                    }],
                    quantity: 100
                },
                //this.ivorianPrices = [7.55, 10.85, 13.97, 18.99]
                ivorian: {
                    toppings: ['Black Olives', 'Spinach', 'Tomatoes', 'Mushroom', 'Garlic', 'Perilla', 'icecream'],

                    name: 'ivorian',
                    sizes: [{
                        size: 'small',
                        price: '7.55'
                    }, {
                        size: 'medium',
                        price: '10.85'
                    }, {
                        size: 'large',
                        price: '13.97'
                    }, {
                        size: 'xlarge',
                        price: '18.99'
                    }],
                    quantity: 100
                },
                //this.canadianPrices = [6.69, 9.99, 15.87, 20.55]
                canadian: {
                    toppings: ['Canadian Bacon', 'Beef', 'Mushrooms', 'Black Olives', 'Red Onions', 'Green Peppers'],
                    name: 'canadian',
                    sizes: [{
                        size: 'small',
                        price: '6.69'
                    }, {
                        size: 'medium',
                        price: '9.99'
                    }, {
                        size: 'large',
                        price: '15.87'
                    }, {
                        size: 'xlarge',
                        price: '20.55'
                    }],
                    quantity: 450
                },
                //this.chickenPrices = [7.98, 13.95, 17.75, 21.69]
                chicken: {
                    toppings: ['Chicken', 'BBQ Sauce', 'Red Onions', 'Pineapple', 'Red Pepper', 'Tomatoes', 'Green Pepper'],
                    name: 'chicken',
                    sizes: [{
                        size: 'small',
                        price: '7.98'
                    }, {
                        size: 'medium',
                        price: '13.95'
                    }, {
                        size: 'large',
                        price: '17.75'
                    }, {
                        size: 'xlarge',
                        price: '21.69'
                    }],
                    quantity: 400
                },
                //this.cheesePrices = [7.98, 9.95, 13.75, 15.69]
                cheese: {
                    toppings: ['Cheese', 'Mushroom', 'Macaroni', 'Black Olives', 'Green Pepper'],
                    name: 'cheese',
                    sizes: [{
                        size: 'small',
                        price: '7.98'
                    }, {
                        size: 'medium',
                        price: '9.95'
                    }, {
                        size: 'large',
                        price: '13.75'
                    }, {
                        size: 'xlarge',
                        price: '15.69'
                    }],
                    quantity: 300
                },
                //this.beefPrices = [6.97, 11.99, 15.75, 22.98]
                beef: {
                    toppings: ['Beef', 'Red Pepper', 'Pepperoni', 'Bacon', 'Green Jelapeños', 'Cheese'],
                    name: 'beef',
                    sizes: [{
                        size: 'small',
                        price: '6.97'
                    }, {
                        size: 'medium',
                        price: '11.99'
                    }, {
                        size: 'large',
                        price: '15.75'
                    }, {
                        size: 'xlarge',
                        price: '22.98'
                    }],
                    quantity: 250
                },
                //this.buffaloPrices = [7.15, 9.99, 13.65, 18.85]
                buffalo: {
                    toppings: ['Buffalo', 'Hot Sauce', 'Mushroom', 'BBQ Saurce', 'Black Olives'],
                    name: 'buffalo',
                    sizes: [{
                        size: 'small',
                        price: '7.15'
                    }, {
                        size: 'medium',
                        price: '9.99'
                    }, {
                        size: 'large',
                        price: '13.65'
                    }, {
                        size: 'xlarge',
                        price: '18.85'
                    }],
                    quantity: 200
                },
                // this.roundupPrices = [5.98, 8.95, 14.75, 19.69]
                roundup: {
                    toppings: ['Beef', 'Bacon', 'Sausage', 'Tomatoes', 'Mushrooms', 'Black Olives', 'Perilla'],
                    name: 'roundup',
                    sizes: [{
                        size: 'small',
                        price: '5.98'
                    }, {
                        size: 'medium',
                        price: '8.95'
                    }, {
                        size: 'large',
                        price: '14.75'
                    }, {
                        size: 'xlarge',
                        price: '19.69'
                    }],
                    quantity: 350
                },
                //this.baconPrices = [6.98, 8.95, 14.75, 18.69]
                bacon: {
                    toppings: ['Bacon', 'Pineapple', 'Tomatoes', 'Tomatoes', 'Red Onions', 'pumpkin'],
                    name: 'bacon',
                    sizes: [{
                        size: 'small',
                        price: '6.98'
                    }, {
                        size: 'medium',
                        price: '8.95'
                    }, {
                        size: 'large',
                        price: '14.75'
                    }, {
                        size: 'xlarge',
                        price: '18.69'
                    }],
                    quantity: 100
                },

                //this.wêsPrices = [6.55, 10.87, 13.95, 18.35]
                wês: {
                    toppings: ['Purple Onions', 'Tomatoes', 'cucomber', 'Tomatoes', 'Pickles', 'Cerelis', 'Potatoes'],
                    name: 'wês',
                    sizes: [{
                        size: 'small',
                        price: '6.55'
                    }, {
                        size: 'medium',
                        price: '10.87'
                    }, {
                        size: 'large',
                        price: '13.95'
                    }, {
                        size: 'xlarge',
                        price: '18.35'
                    }],
                    quantity: 100
                },
                //this.happyPrices = [6.27, 8.99, 13.75, 19.97]
                happy: {
                    toppings: ['Green Pepper', 'Cheese', 'Eggs', 'Tomatoes', 'Red Onions'],
                    name: 'happy',
                    sizes: [{
                        size: 'small',
                        price: '6.27'
                    }, {
                        size: 'medium',
                        price: '8.99'
                    }, {
                        size: 'large',
                        price: '13.75'
                    }, {
                        size: 'xlarge',
                        price: '19.97'
                    }],
                    quantity: 100
                },
                // this.ausiePrices = [5.99, 8.85, 12.87, 17.97]
                ausie: {
                    toppings: ['Mushroom', 'Perilla', 'Black Olives', 'Onions', 'Tomatoes'],
                    name: 'ausie',
                    sizes: [{
                        size: 'small',
                        price: '5.99'
                    }, {
                        size: 'medium',
                        price: '8.85'
                    }, {
                        size: 'large',
                        price: '12.87'
                    }, {
                        size: 'xlarge',
                        price: '17.97'
                    }],
                    quantity: 100
                },
                //this.bbqPrices = [5.87, 7.95, 12.85, 17.89]
                bbq: {
                    toppings: ['BBQ', 'Mushroom', 'Red Pepper', 'Tomatoes', 'Perilla', 'Yellow Jelapeños'],
                    name: 'bbq',
                    sizes: [{
                        size: 'small',
                        price: '5.87'
                    }, {
                        size: 'medium',
                        price: '7.95'
                    }, {
                        size: 'large',
                        price: '12.85'
                    }, {
                        size: 'xlarge',
                        price: '17.89'
                    }],
                    quantity: 100
                },
                //this.wonderfulPrices = [5.00, 7.00, 9.00, 12.00]
                wonderful: {
                    toppings: ['Peperoni', 'Bacon', 'Perialla', 'Tomatoes', 'Black Olives', 'American Cheese'],
                    name: 'wonderful',
                    sizes: [{
                        size: 'small',
                        price: '5.00'
                    }, {
                        size: 'medium',
                        price: '7.00'
                    }, {
                        size: 'large',
                        price: '9.00'
                    }, {
                        size: 'xlarge',
                        price: '12.00'
                    }],
                    quantity: 100
                },
                //this.szranPrices = [5.98, 8.95, 12.75, 17.95]
                szran: {
                    toppings: ['Tomatoes', 'Green Pepper', 'Black Olvie', 'Chilis', 'White Onions', 'Orange Papper'],
                    name: 'szran',
                    sizes: [{
                        size: 'small',
                        price: '5.98'
                    }, {
                        size: 'medium',
                        price: '8.95'
                    }, {
                        size: 'large',
                        price: '12.75'
                    }, {
                        size: 'xlarge',
                        price: '17.95'
                    }],
                    quantity: 100
                },
                //this.lagoPrices = [5.15, 7.55, 9.35, 15.55]
                lago: {
                    toppings: ['Tomatoes', 'Black Olives', 'Perilla', 'Onions', 'Yellow Jelapeños'],
                    name: 'lago',
                    sizes: [{
                        size: 'small',
                        price: '5.15'
                    }, {
                        size: 'medium',
                        price: '7.55'
                    }, {
                        size: 'large',
                        price: '9.35'
                    }, {
                        size: 'xlarge',
                        price: '15.55'
                    }],
                    quantity: 100
                },
                //this.gnonsoaPrices = [4.75, 7.85, 12.45, 15.99]
                gnonsoa: {
                    toppings: ['Mushroom', 'Tomatoes', 'Peperoni', 'Perilla', 'Black Olives', 'Bacon'],
                    name: 'gnonsoa',
                    sizes: [{
                        size: 'small',
                        price: '4.75'
                    }, {
                        size: 'medium',
                        price: '7.85'
                    }, {
                        size: 'large',
                        price: '12.45'
                    }, {
                        size: 'xlarge',
                        price: '15.99'
                    }],
                    quantity: 100
                },
                //this.yummyPrices = [6.45, 10.95, 15.35, 20.85]
                yummy: {
                    toppings: ['Fresh Salmon', 'Lettuce', 'Crab Meat', 'Tomatoes', 'Purple Leaves', 'Fresh Sushi'],
                    name: 'yummy',
                    sizes: [{
                        size: 'small',
                        price: '6.45'
                    }, {
                        size: 'medium',
                        price: '10.95'
                    }, {
                        size: 'large',
                        price: '15.35'
                    }, {
                        size: 'xlarge',
                        price: '20.85'
                    }],
                    quantity: 100
                },
            }
        }
        return menus
    }


   /**
     * @name _calculateSubtotal
     * @function
     *  
     * @description calculates subtotal prices of cart items
     * 
     * @return {Object} all menu items
     * 
     */
    _calculateSubtotal(quantity, price) {
        return quantity * price
    }

    /**
     * @name _calculateTax
     * @function
     *  
     * @description calculates the tax of cart items
     * 
     * @return {Number} tax amount
     * 
     */

    _calculateTax = (rate, quantity, price, fn = this._calculateSubtotal) => rate * fn(quantity, price)

     /**
     * @name _calculateTotal
     * @function
     *  
     * @description calculates grand total of cart items
     * 
     * @return {Number} grand total
     * 
     */
    _calculateTotal(tax, subtotal) {
        return tax + subtotal
    }

     /**
     * @name _clean
     * @function
     *  
     * @description cleans (trims) or normalize inputs
     * 
     * @return {String} trimed string
     * 
     */

    _clean(str) {
        try {
            if (str) {
                return str.trim().toLowerCase()
            } else {
                throw new Error(`Could not trim ${str}`)
            }
        } catch (error) {
            throw new Error(`Could not trim ${str}`)
        }
    }
    
    /**
     * @name _isItemInStack
     * @function
     *  
     * @description checks for items in stock
     * 
     * @return {Boolean} true if item is in stock; false otherwise
     * 
     */

    _isItemInStack = (type, size) => {
        // check input
        let checkType = this.storage().types[`${this._clean(type)}`]
        let isSize, checkSize
        checkType == undefined ? isSize = false : isSize = true

        isSize ? checkSize = checkType.sizes.find(el => el.size == this._clean(size)) : checkSize == undefined

        return checkSize == undefined ? false : checkSize.size == this._clean(size) ? true : false
    }


    /**
     * @name _isQuantityAvailable
     * @function
     *  
     * @description checks if the requested item quantity is available
     * 
     * @return {Boolean} true if requested quantity is smaller or equal to the quantity available; false otherwise
     * 
     */

    _isQuantityAvailable = (type, quantity) => quantity <= this.storage().types[`${this._clean(type)}`]['quantity'] ? true : false


   /**
     * @name Select
     * @function
     *  
     * @description selects the request cart item
     * 
     * @param {String} type pizza type 
     * @param {String} size pizza size
     * @param {Number} quantity quantity or number of pizzas in the cart item
     * @param {Boolean} placed  whether the cart item was saved in the cart or was ordered
     *                          1. if placed is false then the cart item sits in the cart
     *                          2. if placed is true, the item was purchased successfully
     * 
     * @return {Object} order
     * 
     */
    select = (type, size, quantity, placed = true) => {
        if (this._isItemInStack(this._clean(type), size) && this._isQuantityAvailable(this._clean(type), quantity)) {
            const selectedMenus = this.storage().types[`${this._clean(type)}`]
            const toppings = selectedMenus.toppings
            const name = selectedMenus.name
            const selectedSize = selectedMenus.sizes.find(el => el.size == this._clean(size)).size
            const selectedPrice = selectedMenus.sizes.find(el => el.size == this._clean(size)).price
            const subtotal = this._calculateSubtotal(quantity, parseFloat(selectedPrice))
            const tax = this._calculateTax(0.071, quantity, parseFloat(selectedPrice))
            const total = this._calculateTotal(tax, subtotal)

            const taxed = '$' + tax.toFixed(2)
            const subtotaled = '$' + subtotal.toFixed(2)

            const totaled = `$` + total.toFixed(2)

            const itemPrice = quantity + ' x $' + selectedPrice + '.00'
            const price = '$' + selectedPrice + '.00'
            const items = quantity

            // build the order object (structure)
            const order = {
                name: name,
                placed: placed,
                size: selectedSize,
                toppings: toppings,
                pricing: {
                    price: price,
                    quantity: items,
                    items: itemPrice,
                    subtotal: subtotaled,
                    taxing: '0.07' + ` x ${subtotaled}`,
                    tax: taxed,
                    total: totaled
                }
            }
            return order
        } else {
            return {}
        }

    }


    /**
     * @name onAddCartItem
     * @function
     *  
     * @description add cart item to cart
     * 
     * @return does not return anything
     * 
     */

    onAddCartItem() {
        /// If the user is logged in
        this.optionsForm.addEventListener('submit', event => {
            event.preventDefault()
            
            const store = this.store('orders', 'readwrite')
            this.addContainer.style.display = 'flex'
            this.optionsForm.style.display = 'none'
            const data = this.optionsData()
            if (this.authCheck()) {
                this.addToAuthCart(data)
            } else {
                // this.addToGuestCart(data)
                // Using indexedDB
                const order = this.select(data.type, data.size, data.quantity, false)
                const request = store.add(order)
                request.onerror = event => {
                    console.log('Error adding')
                }
                request.onsuccess = event => {
                    const justAdded = store.get(event.target.result)
                    justAdded.onerror = event => {
                        console.log('Error fetching just added')
                    }
                    justAdded.onsuccess = event => {
                        const types = this.storage().types
                        this.addCartChannel.postMessage({
                            order,
                            types
                        }, {
                            once: true
                        })
                        // CacheStorage
                        // .open(this.CURRENT_ORDER_CACHE)
                        // .then(console.log)
                        // .catch(console.error)
                    }
                }

            }
        }, {
            once: true
        })
    }
    showQuantityError() {
        const quantity = this.formField('quantity')
        if (quantity.validity.valueMissing) {
            quantity.setCustomValidity('Darling, I am expecting a quantity greater than zero.');
        } else if (quantity.validity.typeMismatch) {
            quantity.setCustomValidity('Darling, quantity must a positive number');
        } else if (quantity.validity.tooShort) {
            quantity.setCustomValidity('Darling, must at at least 1')
        } else if (quantity.validity.tooLong) {
            quantity.setCustomValidity('Darling, quantity must not be more 100')
        } else if (quantity.validity.patternMismatch) {
            quantity.setCustomValidity('Darling, quantity must a be digit greater than zero')
        } else if (quantity.validity.badInput) {
            quantity.setCustomValidity('Darling, I just cannot accept this.')
        }
    }
    /**
     * @name formFieldOnChange
     * @function
     * 
     * @param {String} field the form field id
     * 
     * @description checks validity and report validity for form field upon change event
     * 
     * @return does not return anything
     * 
     */
    quantityFieldOnChange() {
        const quantity = this.formField('quantity')
        quantity.addEventListener('change', () => {
            quantity.setCustomValidity('')
            quantity.checkValidity()
            quantity.reportValidity()
        })
    }
 
    /**
     * @name formFieldOnInvalid
     * @function
     * 
     * @param {String} field the form field id
     * @param {Object} options form field error messages
     * 
     * @description checks validity and shows form field error messages upon invalid event
     * 
     * @return does not return anything
     * 
     */
 
    quantityFieldOnInvalid() {
        const quantity = this.formField('quantity')
        quantity.addEventListener('invalid', () => {
            if (!quantity.validity.valid) {
                this.showQuantityError()
            }
        })
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
customElements.define("base-pizza", PizzaElement);
export default PizzaElement
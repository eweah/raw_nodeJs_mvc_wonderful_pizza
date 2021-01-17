'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Config
 * @kind class
 * @extends Service
 * 
 * @classdesc Resourceful Config class for setting and configuring the server
 * 
 */

const Service = require('./service')

class Config extends Service {
    constructor() {
        super()
       this.environments = {};

       // auto bind methods
       this.autobind(Config)

    }

    /**
     * @name staging
     * @function
     *
     * @description sets and configures the server staging configuration
     * @return {Object} the server staging configuration object
     * 
     */

    staging() {
        return {
            httpPort: 3000,
            httpsPort: 3001,
            name: 'staging',
            hashingSecret: 'HolyMole!IsThisTheHashingSecret?',
            maxChecks: 5,
            maxItemsInCart: 200,
            // SMS configuration: the twilio curl function
            twilio: {
                curl: this.twilio
            },
            // Email configuration: the mailgun curl function
            mailgun: {
                curl: this.mailgun
            },
            // Card Payment configuration: the stripe curl function
            stripe: {
                curl: this.stripe
            },
            globalViews: {
                name: 'Wonderful Pizza',
                company: 'Wonderful Pizza, Inc.',
                year: '2020',
                baseUrl: `http://127.0.0.1:3000/`
            }
        }
    }
     /**
     * @name production
     * @function
     *
     * @description sets and configures the server production configuration
     * @return {Object} the server production configuration object
     * 
     */

    production() {
        return {
            httpPort: 5000,
            httpsPort: 5001,
            name: 'production',
            hashingSecret: 'HolyMole!IsThisTheHashingSecret?',
            maxChecks: 5,
            maxItemsInCart: 200,
            // SMS configuration: the twilio curl function
            twilio: {
                curl: this.twilio
            },
            // Email configuration: the mailgun curl function
            mailgun: {
                curl: this.mailgun
            },
            // Card Payment configuration: the stripe curl function
            stripe: {
                curl: this.stripe
            },
            globalViews: {
                name: 'Wonderful Pizza',
                company: 'Wonderful Pizza, Inc.',
                year: '2020',
                baseUrl: `http://localhost:3000/`
            }
        }
    }
     /**
     * @name development
     * @function
     *
     * @description sets and configures the server development configuration
     * @return {Object} the server development configuration object
     * 
     */

    development() {
        return {
            port: 8000,
            name: 'development',
            hashingSecret: 'HolyMole!IsThisTheHashingSecret?',
            maxChecks: 5,
        };

    }
     /**
     * @name currentEnvironment
     * @function
     *
     * @description checks and sets the currentEnvironment variables
     * @return {String}  NODE_ENV variable
     * 
     */

    currentEnvironment() {
        return typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
    }
     /**
     * @name environmentToExport
     * @function
     *
     * @description export the current environment
     * @return {String}  NODE_ENV variable
     * 
     */

    environmentToExport() {

        this.environments.staging = this.staging()
        this.environments.production = this.production()
        this.environments.development = this.development()

        return typeof this.environments[this.currentEnvironment] == 'object' ? this.environments[this.currentEnvironment] : this.environments.staging;
    }
 /**
     * @name state
     * @function
     *
     * @description sets the environment to exports
     * @return {Function}  this.environmentToExport()
     * 
     */

    static state() {
        return this.environmentToExport()
    }
}
// Export Config
module.exports = Config

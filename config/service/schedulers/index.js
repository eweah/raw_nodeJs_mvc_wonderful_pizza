//const Resources = require('../../../resources')

// Dependencies
const fs = require('fs')
const path = require('path')
const ServiceConfig = require('../config')

class Schedulers extends ServiceConfig {
    constructor() {
        super()
    }

    // Check the access rights of the directory
    canAccess() {
        return fs.promises.access(`${dir}`, fs.constants.R_OK | fs.constants.W_OK)
    }

    // Read the directory
    readDir() {
        return fs.promises.readdir(`${dir}`, {
            encoding: 'utf8',
            withFileTypes: false
        })
    }

    // orders director
    ordersDir() {
        return path.join(__dirname, '../../../.data/orders')
    }

    // tokens directory
    tokensDir() {
        return path.join(__dirname, '../../../.data/tokens')
    }

    // Checks for expired tokens
    checkForExpiredTokens() {
        return this.canAccess()
            .then(() => this.readDir()
                .then(files => files.forEach(file => fs.promises.readFile(`${dir}/${file}`, {
                        encoding: 'utf8',
                        flag: 'r'
                    })
                    .then(content => ((JSON.parse(content).expires > Date.now() ?
                        console.log() :
                        // Remove the token if it has expired for 15 minutes or longer
                        (JSON.parse(content).expires < Date.now() + (1000 * 60 * 15) ?
                            fs.promises.unlink(`${dir}/${file}`)
                            .then(() => console.log('\x1b[31m%s\x1b\0m', `Deleted an expired user's token from: `, file))
                            .catch(() => console.log()) :
                            console.log()))))
                    .catch(() => console.log())))
                .catch(() => console.log()))
            .catch(() => console.log())
    }


    // checkExpiredOrders function
    checkExpiredOrders() {
        return this.canAccess()
            .then(() => this.readDir().then(files => files.forEach(file => fs.promises.readFile(`${dir}/${file}`, {
                    encoding: 'utf8',
                    flag: 'r'
                }).then(content => {
                    // check to see if there is a reservation (order) in cart 
                    if (!JSON.parse(content).products[0]['placed']) {
                        // Empty the cart (remove an order) if it has been in the cart for 5 or more days
                        if (new Date(JSON.parse(content).updated_at) < (Date.now() - (1000 * 60 * 60 * 24 * 5))) {
                            fs.promises.unlink(`${dir}/${file}`)
                                .then(() => console.log('\x1b[31m%s\x1b\0m', `Deleted an expired user's reservation from: `, file))
                                .catch(() => console.log())
                        }

                    }
                })
                .catch(() => console.log()))))
            .catch(() => console.log())
    }


    // Check for expired reservation every six hours
    cart() {
        return setInterval(() => checkExpiredOrders(), 1000 * 60 * 60 * 6);
    }

    // Check for expired token every six hours
    token() {
        return setInterval(() => checkForExpiredTokens(), 1000 * 60 * 60 * 6);
    }
}

module.exports = Schedulers
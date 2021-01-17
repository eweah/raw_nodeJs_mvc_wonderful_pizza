'use strict'


const path = require('path')
const Env = require('../env')
class SSL extends Env{
    constructor() {
        super()
    }

    static cert() {
        return path.join(__dirname, './cert.pem')
    }
    static key() {
        return path.join(__dirname, './key.pem')
    }

    certs() {
        return path.join(__dirname, './cert.pem')
    }
    keys() {
        return path.join(__dirname, './key.pem')
    }
}

module.exports = SSL
'use strict'

const StatsCommand = require('../statistics')

class TokenCommand extends StatsCommand {
    constructor(){
        super()
        this.autobind(TokenCommand)
        this.autoinvoker(TokenCommand)
    }
}

module.exports = TokenCommand
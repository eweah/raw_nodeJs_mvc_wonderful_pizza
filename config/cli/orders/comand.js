'use strict'

const ByEMAIL = require('./ByEMAIL')


class Command extends ByEMAIL{
    constructor(){
        super()
        this.autobind(Command)
        this.autoinvoker(Command)
        this.setMaxListeners(Infinity)
    }
    onorderscommand() {
        this.on('orders', async string => {
            let cleaned = this.clean(string)
            if(string.startsWith('orders') && string.length > 'orders'.length){
                if(string !== 'orders -h' && string !== 'orders --help'){
                    if(this.auth === false){
                        return this.emit('orders:warning', {error: 'You must be logged in to do this.'})
                    }
                }
            }
            this.orderscommand(cleaned)
            this.onglobalordermatch(cleaned)
        })
    }
}
module.exports = Command

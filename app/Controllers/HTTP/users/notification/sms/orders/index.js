'use strict'

const Config = require('../../../../../../../config/cli/backups/cli_index')

class SMS extends Config {
    constructor(options = {}) {
        super()
        if (options) {
            this.card = options.card
            this.user = options.user
            this.cart = options.cart
        }
        this.autobind(SMS)
    }

    render(){

    }
   text(){
    const Twilio = this.twilio
    const Run = this.run
    const message = `Your order is on its way! ENJOY!`;
    const smsCommand = Twilio(this.user.phone.split('-').join(''), message);

    Run(smsCommand, {}, (err, stdout, stderr) => {
        if (err) {
            console.error(
                '\x1b[31m%s\x1b[0m',
                'Error: Sending SMS failed.'
            );
            return;
        }

        console.log(
            '\x1b[36m%s\x1b[0m',
            'SMS OK: sent SMS notification.'
        );
    });
   }
}

module.exports = SMS

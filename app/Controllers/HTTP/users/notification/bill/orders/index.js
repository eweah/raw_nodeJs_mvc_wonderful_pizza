'use strict'

const Config = require('../../../../../../../config/cli/backups/cli_index')

class Bill extends Config {
    constructor(options = {}) {
        super()
        if (options) {
            this.card = options.card
            this.user = options.user
            this.products = options.products
        }
        this.autobind(Bill)
    }

    bill() {
        const Stripe = this.stripe
        const Run = this.run

        const subtotal = this.products
            .map(datum => parseFloat(datum.pricing.subtotal.substring(1)))
            .reduce((x, y) => x + y, 0)

        const taxing = 0.07 * subtotal

        const totaling = parseFloat((taxing + subtotal))
        const bill = Math.round(100 * totaling)

        const currency = 'usd'
        const description = 'Wonderful Pizza, Americas Most Wanted Pizza!'

        let token = 'tok_visa'
        if (this.card.type === 'visa') {
            token = 'tok_visa'
        } else if (this.card.type === 'amex') {
            token = 'tok_amex'
        } else if (this.card.type === 'discover') {
            token = 'tok_discover'
        } else if (this.card.type === 'master') {
            token = 'tok_mastercard'
        }

        const billCommand = Stripe(bill, currency, description, token, this.user.email)
        Run(billCommand, {}, (error, stdout, stderr) => {
            if (error) {
                console.error('\x1b[31m%s\x1b[0m', 'Error: Could not charge card.', error);
                return;
            }
            console.log('\x1b[36m%s\x1b[0m', 'Payment OK: processed Payment.');
        });
    }
}

module.exports = Bill

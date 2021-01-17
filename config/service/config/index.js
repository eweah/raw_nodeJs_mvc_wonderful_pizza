
const ENV = require('../../env')

const SSL = require('../../ssl')

class ConfigService extends SSL {
    constructor() {
        super()
        this.autobind(ConfigService)
    }

    // Messaging container

    dp ()  {
        // default params 
        const _df = {}
        _df.n = 'Wonderful Pizza',
            _df.se = 'pizza@wonderfulpizza.com',
            _df.re = 'developer@devoutprogrammer.com'
        _df.s = 'Order from Wonderful Pizza'
        _df.m = 'Your order is on its way. ENJOY!'

        // Stripe api curl script configuration
        const _po = {}
        _po.a = 1,
            _po.c = "usd",
            _po.d = "Wonderful Pizza"
        _po.cc = "tok_visa",
            _po.e = "developer@devoutprogrammer.com"
        return {
            df: _df,
            po: _po
        }
    }
    // default error function
    errFunction () {return 'Error: one or more required field(s) is invalid or missing.'}

    // Twilio SMS api curl script configuration
    twilio (receiverNumber = '3857431354', message = 'Your order is on its way. ENJOY!', fn = this.errFunction) {
        receiverNumber = typeof receiverNumber == 'string' && receiverNumber.trim().length == 10 ? receiverNumber.trim() : false;
        message =
            typeof message == 'string' && message.trim().length > 0 && message.trim().length <= 1600 ?
            message.trim() :
            false;
        const apiCurl = `curl -X POST https://api.twilio.com/2010-04-01/Accounts/${ENV.TWILIO()._ACCOUNT_SID}/Messages.json --data-urlencode "Body=${message}" --data-urlencode "From=+12038720739" --data-urlencode "To=+1${receiverNumber}" -u ${ENV.TWILIO()._ACCOUNT_SID}:${ENV.TWILIO()._AUTH_TOKEN}`

        // return the curl cli to run 
        return (receiverNumber && message) ? apiCurl : fn('Error: phone number or message is missing or is invalid!')
    }

    // Mailgun api curl script configuration


    mailgun(name = this.dp().df.n, senderEmail = this.dp().df.se, receiverEmail = this.dp().df.re, subject = this.dp().df.s, message = this.dp().df.m, fn = this.errFunction) {
        // Validating field
        message = typeof message == 'string' && message.trim().length > 0 ? message.trim() : false;

        name = typeof name == 'string' && name.trim().length > 0 ? name.trim() : false;

        senderEmail = typeof senderEmail == 'string' && senderEmail.trim().length > 0 && this.validateEmail(senderEmail) ? senderEmail.trim() : false;

        receiverEmail = typeof receiverEmail == 'string' && receiverEmail.trim().length > 0 && this.validateEmail(receiverEmail) ? receiverEmail.trim() : false;

        subject = typeof subject == 'string' && subject.trim().length > 0 ? subject.trim() : false;

        // Verification
        const isOk = message && name && senderEmail && receiverEmail && subject
        
        // Api curl 
        const apiCurl = `curl -s --user 'api:${ENV.MAILGUN()._API_KEY}' https://api.mailgun.net/v3/${ENV.MAILGUN()._DOMAIN}/messages -F from='${name} <${senderEmail}>' -F to=${receiverEmail} -F subject='${subject}' --form-string html='${message}'`

        // returns the curl cli to run
        return isOk ? apiCurl : fn('Error: one or more required field(s) is invalid or missing.')

    }


    stripe (amount = this.dp().po.a, currency = this.dp().po.c, description = this.dp().po.d, cardCode = this.dp().po.cc, email = this.dp().po.e, fn = this.errFunction) {
        // Validating field

        amount = (typeof amount == 'number' && amount % 1 == 0 && amount >= 0) ? amount : false;
        currency = (typeof currency == 'string' && currency.trim().length > 0) ? currency.trim() : false;
        email = (typeof email == 'string' && email.trim().length > 0 && this.validateEmail(email)) ? email.trim() : false;
        description = (typeof description == 'string' && description.trim().length > 0) ? description.trim() : false;
        cardCode = (typeof cardCode == 'string' && cardCode.trim().length > 0) ? cardCode.trim() : false;

        // Verification
        const isOk = amount && currency && email && description && cardCode
        // Api curl 

        const apiCurl = `curl https://api.stripe.com/v1/charges -u ${ENV.STRIPE()._API_KEY}: -d amount=${amount} -d currency=${currency} -d description="${description}" -d source=${cardCode} -d receipt_email="${email}"`

        // return the curl cli to run
        return isOk ? apiCurl : fn('Error: one or more required field(s) is invalid or missing.')
    }

}

module.exports = ConfigService
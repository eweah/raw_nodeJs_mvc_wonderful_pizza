// Api keys and and token
module.exports = {

    // Stripe API Key
    STRIPE: {
        _API_KEY: 'pk_test_PwefGqRnoIj7yJpcRkurmxGc008cU3VtGR'
    },

    // Mailgun  API Key
    MAILGUN: {
        _API_KEY: 'f9f52febcd04196673ec1217a539627a-1d8af1f4-255aa97c',
        _DOMAIN: 'mail.devoutprogrammer.io'
        // _DOMAIN: 'sandboxb907f3fa427748f6909b2315406714f9.mailgun.org'
    },

    // Twilio API Key
    TWILIO: {
        _ACCOUNT_SID: 'AC931fb10e9db19f607c83228b61218d83',
        _AUTH_TOKEN: '04f4034d8861a18f0d7562e0d277cdab'

        // _ACCOUNT_SID: 'ACd865c44151ee3c11c82aa88fd645fab4',
        // _AUTH_TOKEN: '081c9aa0552a7757ba690b3273bd81af'
    },
    PASSWORD: {
        _HASH: {
            _SECRET: 'HolyMole!IsThisTheHashingSecret?',
            _METHOD: 'sha256'
        }
    }
}


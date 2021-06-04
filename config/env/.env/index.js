// Api keys and and token
module.exports = {

    // Stripe API Key
    STRIPE: {
        _API_KEY: 'sk_test_kLLlxWePPsoJfJWmzvIDEdp400mpRjMxUi'
    },

    // Mailgun  API Key
    MAILGUN: {
        _API_KEY: 'key-17cfda8340f7903445011000f41e2e82',
        _DOMAIN: 'mail.devoutprogrammer.io'

    },

    // Twilio API Key
    TWILIO: {
        _ACCOUNT_SID: 'AC931fb10e9db19f607c83228b61218d83',
        _AUTH_TOKEN: 'd71021cf5c469f2c9afe0f8d8136e283'

    },
    PASSWORD: {
        _HASH: {
            _SECRET: 'HolyMole!IsThisTheHashingSecret?',
            _METHOD: 'sha256'
        }
    }
}


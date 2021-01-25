// Api keys and and token
module.exports = {

    // Stripe API Key
    STRIPE: {
        _API_KEY: 'sk_test_kLLlxWePPsoJfJWmzvIDEdp400mpRjMxUi'
    },

    // Mailgun  API Key
    MAILGUN: {
        _API_KEY: 'key-92c958ffda43878f7722bc26eec76f56',
        _DOMAIN: 'devoutprogrammer.dev'
        // _DOMAIN: 'mail.devoutprogrammer.dev'
        // _DOMAIN: 'sandboxb907f3fa427748f6909b2315406714f9.mailgun.org'
    },

    // Twilio API Key
    TWILIO: {
        _ACCOUNT_SID: 'AC053ab22202b226f059a7515df64a9b51',
        _AUTH_TOKEN: '98530cbc7561d7c19a6a87331c4c2806'

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


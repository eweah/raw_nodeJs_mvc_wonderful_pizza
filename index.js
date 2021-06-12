'use strict'

/**
 *  Index: the server, starting, stoping, etc ...
 */
const Handler = require('./config/server/handler')

new Handler().init(new Handler().serverRequestHandler)


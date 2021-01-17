'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Server
 * @kind class
 * 
 * @extends Config
 * 
 * @requires Config
 * @requires http NodeJs native HTTP API
 * @requires https NodeJs native HTTPS API
 * @requires fs NodeJs native File System API
 * 
 * @classdesc The actual server for the entire system
 * 
 * @typedef {Function} serverHandler the server handler function
 * @typedef {Object} options the https server options
 * 
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const cli = require('../cli/man')
const Config = require('..')
class Server extends Config {
    constructor() {
        super()
        this.autobind(Server)
        this.httpServer = http.createServer
        this.httpsServer = https.createServer

        // this.httpServer = http.createServer()
        // this.httpsServer = https.createServer()

        // auto bind methods
       
    }

    /**
     * @name http
     * @function
     * 
     * @param {Function} serverHandler the handler function
     * 
     * @description creates and sets the http server
     * @return {Function} this.httpServer(serverHandler) the http server
     * 
     */

    http(serverHandler) {
        return this.httpServer(serverHandler)
        // return this.httpServer.on('request', serverHandler)
    }

    /**
     * @name https
     * @function
     * 
     * @param {Function} serverHandler the handler function
     * 
     * @description creates and sets the https server
     * @return {Function} this.httpsServer(options, serverHandler) the https server
     * 
     */
    https(serverHandler) {
        // Instantiate the https server
        const options = {
            key: fs.readFileSync(this.keys()),
            cert: fs.readFileSync(this.certs()),
        };
        return this.httpsServer(options, serverHandler)
        // return this.httpsServer.on('request', (options, serverHandler))

    }
    
    /**
     * @name init
     * @function
     * 
     * @param {Function} serverHandler the handler function
     * 
     * @description initiates or start the http/https server
     * @return does not return anything
     * 
     */
    init(serverHandler) {
        // Start the HTTP server 
        this.http(serverHandler).listen(this.environmentToExport().httpPort, () =>
            {
                // console in yellow 
            // console.log('\x1b[36m%s\x1b[0m', 'server is listening on port ' + this.environmentToExport().httpPort + ' in ' + this.environmentToExport().name + ' mode.\n')
            //new Command()
            new cli()
            }
        );

        // Start the HTTPS server
        // this.https(serverHandler).listen(this.environmentToExport().httpsPort, () =>
        //     {
        //         console.log('\x1b[35m%s\x1b[0m', 'server is listening on port ' + this.environmentToExport().httpsPort + ' in ' + this.environmentToExport().name + ' mode.\n')

        //         new Command()
        //     }
        // );
    
    }
}

// Export the module (Server) 
module.exports = Server
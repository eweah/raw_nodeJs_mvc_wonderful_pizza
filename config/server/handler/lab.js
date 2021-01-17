'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Handler 
 * @kind class
 * 
 * @extends Server
 * @requires Handler 
 * @requires router 
 * @requires url NodeJs native URL API
 * @requires util NodeJs native utilities API
 * @requires string_decoder NodeJs native String Decoder API
 * 
 * @classdesc Server Handler class for handling every resquest and response
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} routeHandler the main route handler response function
 * @typedef {Response} routeHandlerCallBack routing response callback function
 * @typedef {Function} serverRequestHandler routing configuration for setting every request and response
 * @typedef {Request}  request the request object
 * @typedef {Response} response the response object 
 * 
 */

const url = require('url');
const util = require('util')
const StringDecoder = require('string_decoder').StringDecoder;

const debug = util.debuglog('server')
const Server = require('../../server')
const router = require('../../../routes')
const Router = require('../router')

class Handler extends Router {
    constructor() {
        super()

        // auto bind methods
        this.autobind(Handler)
    }

    /**
     * @name serverRequestHandler
     * @function
     * 
     * @param {Request}  request the request object
     * @param {Response} response the response object
     * 
     * @description sets, configures, processes, and handles all and every server requests and responses
     * @return does not return anything
     * 
     */

    serverRequestHandler(request, response) {
        request.on('error', error => console.error('REQUEST STREAM ERROR: ', error))
        // get the url and parse it
        const parseURL = url.parse(request.url, true);
        // get the path from the url
        const path = parseURL.pathname;
        const trimmedPath = path.replace(/^\/+|\/+$/g, '');
        // query string variable

        const params = parseURL.query;
        // get HTTP method
        const method = request.method.toLowerCase();
        // send the response
        // get the header as an object
        const headers = request.headers;
        // get payload if any
        const decoder = new StringDecoder('utf-8');
        var buffer = '';
        request.on('data', data => {
            buffer += decoder.write(data);
        });
        request.on('end', () => {

            buffer += decoder.end();
            response.on('error', error => console.error('RESPONSE STREAM ERROR: ', error))
            // Choose request this handler should go to. If one is not found choose the 'notFound' handler
            let routeHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : router.notfound;

            //If the request is within the public directory, use the public handler instead
            //in other words: if the path includes  'public/'
            routeHandler = trimmedPath.indexOf('public') > -1 ? router.public : routeHandler

            // construct data object to send to handler
            const payloadData = this.parseJSON(buffer)
            const data = {
                trimmedPath: trimmedPath,
                params: params,
                method: method,
                headers: headers,
                payload: payloadData
            };
            // add to the request 
            request.body = payloadData
            request.data = data
            this.routeHandlerCallBack(statusCode, payload, contentType = 'json')
            // function routeHandlerCallBack(statusCode, payload, contentType = 'json'){
            //     // Determine the type of response  (callback to JSON)
            //     contentType = (typeof (contentType) === 'string') ? contentType : 'json'

            //     // Use the status code callback by the handler  or default to 200
            //     statusCode = typeof statusCode === 'number' ? statusCode : 200;

            //     // return the response-parts that are content-specific 
            //     let payloadString = ''
            //     // response.setHeader('Content-Type', 'application/javascript');

            //     if (contentType === 'json') {

            //         // set header content type to json
            //         response.setHeader('Content-Type', 'application/json');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payload = typeof payload === 'object' ? payload : {};

            //         // Convert the payload to string
            //         payloadString = JSON.stringify(payload);
            //     }
            //     if (contentType === 'html') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'text/html');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload === 'string' ? payload : '';
            //     }

            //     if (contentType === 'favicon') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/x-icon');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }

            //     if (contentType === 'css') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'text/css');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'png') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/png');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }

            //     //.jpg, .jpeg, .jfif, .pjpeg, .pjp
            //     if (contentType === 'jpeg') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/jpeg');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'pjpeg') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/jpeg');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'pjp') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/jpeg');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'jfif') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/jpeg');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'jpg') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/jpeg');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }

            //     if (contentType === 'jpeg') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'image/jpeg');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'plain') {
            //         // set header content type to html

            //         response.setHeader('Content-Type', 'text/plain');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'javascript') {
            //         // set header content type to html
            //         // response.setHeader('Content-Type', 'application/javascript');
            //         response.setHeader('Content-Type', 'application/javascript');

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'js') {
            //         // set header content type to html
            //         // response.setHeader('Content-Type', 'application/x-javascript');
            //         response.writeHead(200, {
            //             'Service-Worker-Allowed': '/',
            //             'Content-Type': 'application/javascript'
            //         })
            //         response.setHeader('Content-Type', 'text/javascript');


            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === '.js') {
            //         // set header content type to html
            //         response.writeHead(201, {
            //             'Service-Worker-Allowed': '/',
            //             'Content-Type': 'application/javascript'
            //         })

            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }
            //     if (contentType === 'script') {
            //         // set header content type to html
            //         response.setHeader('Content-Type', 'application/javascript');

            //         // response.setHeader('Content-Type', 'text/javascript');
            //         // Use the payload call back  by the handler or default to an empty object
            //         payloadString = typeof payload !== undefined ? payload : '';
            //     }

            //     // return the response-parts that are common to all content-types
            //     response.writeHead(statusCode);
            //     // response.writeHead(statusCode,{'Content-Type': 'text/javascript'})
            //     response.end(payloadString);

            //     statusCode == 200 ? debug('\x1b[32m%s\x1b[0m', method.toUpperCase() + '/' + trimmedPath + ' ' + statusCode) : debug('\x1b[31m%s\x1b[0m', method.toUpperCase() + '/' + trimmedPath + ' ' + statusCode)
            // };

            // Route the request to the handler  specified  in the router
            const req = request,
                res = response
            routeHandler(data, thhis.routeHandlerCallBack, req, res)

        });
    };

}

// Export Handler
module.exports = Handler
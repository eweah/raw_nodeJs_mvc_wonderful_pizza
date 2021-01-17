'use strict'

const Server  = require('../../server')
class Router extends Server {
    constructor(){
        super()
    }
    
    routeHandlerCallBack(statusCode, payload, contentType = 'json'){
        // Determine the type of response  (callback to JSON)
        contentType = (typeof (contentType) === 'string') ? contentType : 'json'

        // Use the status code callback by the handler  or default to 200
        statusCode = typeof statusCode === 'number' ? statusCode : 200;

        // return the response-parts that are content-specific 
        let payloadString = ''
        // response.setHeader('Content-Type', 'application/javascript');

        if (contentType === 'json') {

            // set header content type to json
            response.setHeader('Content-Type', 'application/json');

            // Use the payload call back  by the handler or default to an empty object
            payload = typeof payload === 'object' ? payload : {};

            // Convert the payload to string
            payloadString = JSON.stringify(payload);
        }
        if (contentType === 'html') {
            // set header content type to html
            response.setHeader('Content-Type', 'text/html');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload === 'string' ? payload : '';
        }

        if (contentType === 'favicon') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/x-icon');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }

        if (contentType === 'css') {
            // set header content type to html
            response.setHeader('Content-Type', 'text/css');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'png') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/png');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }

        //.jpg, .jpeg, .jfif, .pjpeg, .pjp
        if (contentType === 'jpeg') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/jpeg');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'pjpeg') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/jpeg');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'pjp') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/jpeg');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'jfif') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/jpeg');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'jpg') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/jpeg');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }

        if (contentType === 'jpeg') {
            // set header content type to html
            response.setHeader('Content-Type', 'image/jpeg');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'plain') {
            // set header content type to html

            response.setHeader('Content-Type', 'text/plain');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'javascript') {
            // set header content type to html
            // response.setHeader('Content-Type', 'application/javascript');
            response.setHeader('Content-Type', 'application/javascript');

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'js') {
            // set header content type to html
            // response.setHeader('Content-Type', 'application/x-javascript');
            response.writeHead(200, {
                'Service-Worker-Allowed': '/',
                'Content-Type': 'application/javascript'
            })
            response.setHeader('Content-Type', 'text/javascript');


            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === '.js') {
            // set header content type to html
            response.writeHead(201, {
                'Service-Worker-Allowed': '/',
                'Content-Type': 'application/javascript'
            })

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }
        if (contentType === 'script') {
            // set header content type to html
            response.setHeader('Content-Type', 'application/javascript');

            // response.setHeader('Content-Type', 'text/javascript');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
        }

        // return the response-parts that are common to all content-types
        response.writeHead(statusCode);
        // response.writeHead(statusCode,{'Content-Type': 'text/javascript'})
        response.end(payloadString);

        statusCode == 200 ? debug('\x1b[32m%s\x1b[0m', method.toUpperCase() + '/' + trimmedPath + ' ' + statusCode) : debug('\x1b[31m%s\x1b[0m', method.toUpperCase() + '/' + trimmedPath + ' ' + statusCode)
    };
}

module.exports = Router
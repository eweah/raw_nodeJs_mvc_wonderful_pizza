'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module DefaultController
 * @kind class
 * @extends HTTPController
 * 
 * @classdesc Resourceful controller for interacting with pages
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */

const HTTPController = require('../../HTTP')

class DefaultController extends HTTPController {
    constructor() {
        super()
        // auto bind methods
        this.autobind(DefaultController)
    }
    
    /**
     * @name notFound
     * @function
     * 
     * @method HTTP GET
     * @endpoint /503
     * @url /503
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the 503 page
     * @return does not return anything
     * 
     */
   async notFound (data, fn, req, res) {
        if (data.method === 'get') {
            const notFoundData = {
                'body.title': 'Whatsoever you are looking for cannot be found.'
            }
           await this.view('503', notFoundData)
                .then(string => fn(200, string, 'html'))
                .catch(() => fn(500, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }

     /**
     * @name favicon
     * @function
     * 
     * @method HTTP GET
     * @endpoint /favicon
     * @url /favicon
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets assets, data, and metadata for the favicon 
     * @return does not return anything
     * 
     */

    favicon (data, fn, req, res) {
        if (data.method === 'get') {
            this.assets('favicon.ico')
                .then(data => fn(200, data, 'favicon'))
                .catch(() => fn(500))
        } else {
            fn(403, undefined, 'favicon')
        }
    }

    /**
     * @name public
     * @function
     * 
     * @method HTTP GET
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, asset, and metadata for all the pages
     * @return does not return anything
     * 
     */
 
    public (data, fn, req, res) {
        // Reject if method is not GET
        if (data.method === 'get') {
            // Get the filename being requested
            const trimmedAssetName = data.trimmedPath.replace('public/', '').trim()
            if (trimmedAssetName.length > 0) {
                // Read in the favicon data
                this.assets(trimmedAssetName, (err, data) => {
                    if (!err && data) {
                        // Determine the content-type or default to plain/text 
                        let contentType = 'plain'
                        if (trimmedAssetName.indexOf('.css') > -1) {
                            contentType = 'css'
                        }
                        if (trimmedAssetName.indexOf('.png') > -1) {
                            contentType = 'png'
                        }
                        if (trimmedAssetName.indexOf('.jpg') > -1) {
                            contentType = 'jpg'
                        }
                        if (trimmedAssetName.indexOf('.ico') > -1) {
                            contentType = 'favicon'
                        }
                        //let contentType = 'plain'
                        if (trimmedAssetName.indexOf('.jpeg') > -1) {
                            contentType = 'jpeg'
                        }
                        if (trimmedAssetName.indexOf('.jfif') > -1) {
                            contentType = 'jfif'
                        }
                        if (trimmedAssetName.indexOf('.pjp') > -1) {
                            contentType = 'pjg'
                        }
                        if (trimmedAssetName.indexOf('.pjpeg') > -1) {
                            contentType = 'pjpeg'
                        }
                      
                        if (trimmedAssetName.indexOf('.js') > -1) {
                            contentType = 'javascript'
                        }

                        // call be the data
                        fn(200, data, contentType)

                      
                    } else {
                        fn(404)
                    }
                })
            } else {
                fn(404)
            }
        } else {
            fn(405)
        }
    }

    /**
     * @name home
     * @function 
     * 
     * @method HTTP GET
     * @endpoint ''
     * @url ''
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the home page
     * @return does not return anything
     * 
     */
   async  home(data, fn, req, res) {
        if (data.method === 'get') {
            // home page data interpolation
            const data = {
                'head.title': 'Wonderful Pizza'
            }
            await this.view('index', data)
                .then(string => this.uview(string, data, 'partials/home/_header', 'partials/home/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
  


    /**
     * @name contact
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /contact
     * @url /contact
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the contact page
     * @return does not return anything
     * 
     */
    async contact (data, fn, req,res)  {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'Contact'
            }
            await this.view('contact', data)
                .then(string => this.uview(string, data, 'partials/contact/_header', 'partials/contact/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }

  /**
     * @name about
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /about
     * @url /about
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the about page
     * @return does not return anything
     * 
     */
   async about (data, fn, req, res) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'About Us',
            }
           await this.view('about', data)
                .then(string => this.uview(string, data, 'partials/about/_header', 'partials/about/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }

     /**
     * @name menu
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /menu
     * @url /menu
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the menu page
     * @return does not return anything
     * 
     */
    async menu (data, fn)  {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'Menu',
            }
           await this.view('menu', data)
                .then(string => this.uview(string, data, 'partials/menu/_header', 'partials/menu/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
    /**
     * @name pizza
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /pizza
     * @url /pizza
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the pizza page
     * @return does not return anything
     * 
     */
   async  pizza (data, fn){
            if (data.method === 'get') {
                // Prepare data for interpolation 
                const data = {
                    'head.title': 'Pizza'
                }

               await this.view('pizza', data)
                    .then(string => this.uview(string, data, 'partials/pizza/_header', 'partials/pizza/_footer')
                        .then(string => fn(200, string, 'html'))
                        .catch(() => fn(500, undefined, 'html')))
                    .catch(() => fn(403, undefined, 'html'))
            } else {
                fn(403, undefined, 'html')
            }
        }
    /**
     * @name login
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /login
     * @url /login
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the login page
     * @return does not return anything
     * 
     */
   async  login (data, fn) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'Loggin'
            }
          await  this.view('login', data)
                .then(string => this.uview(string, data, 'partials/login/_header', 'partials/login/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }

    /**
     * @name signup
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /signup
     * @url /signup
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the signup page
     * @return does not return anything
     * 
     */
    async signup (data, fn) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'Signup'
            }
           await this.view('signup', data)
                .then(string => this.uview(string, data, 'partials/signup/_header', 'partials/signup/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }

    /**
     * @name account
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /account
     * @url /account
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the account page
     * @return does not return anything
     * 
     */
   async account (data, fn)  {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'Account'
            }
          await  this.view('account', data)
                .then(string => this.uview(string, data, 'partials/account/_header', 'partials/account/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
    /**
     * @name dashboard
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /dashboard
     * @url /dashboard
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the dashboard page
     * @return does not return anything
     * 
     */
   async dashboard (data, fn) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'dashboard'
            }
          await  this.view('dashboard', data)
                .then(string => this.uview(string, data, 'partials/dashboard/_header', 'partials/dashboard/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }

    /**
     * @name order
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /order
     * @url /order
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the order page
     * @return does not return anything
     * 
     */
   async order (data, fn) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'order'
            }
           await this.view('order', data)
                .then(string => this.uview(string, data, 'partials/order/_header', 'partials/order/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }

    /**
     * @name payment
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /payment
     * @url /payment
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the payment page
     * @return does not return anything
     * 
     */
   async  payment (data, fn) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'payment'
            }
            await this.view('payment', data)
                .then(string => this.uview(string, data, 'partials/payment/_header', 'partials/payment/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
    /**
     * @name review
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /review
     * @url /review
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the review page
     * @return does not return anything
     * 
     */
   async review (data, fn)  {
        if (data.method === 'get') {

            // Prepare data for interpolation 
            const data = {
                'head.title': 'payment',
                'head.description': 'This is the meta description',
                'body.title': 'payment',
                'body.class': 'index',
                'body.message': 'payment Details'
            }

           await this.view('review', data)
                .then(string => this.uview(string, data, 'partials/review/_header', 'partials/review/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
    /**
     * @name feedback
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /feedback
     * @url /feedback
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the feedback page
     * @return does not return anything
     * 
     */
    async feedback (data, fn) {
        if (data.method === 'get') {

            // Prepare data for interpolation 
            const data = {
                'head.title': 'payment',
                'head.description': 'This is the meta description',
                'body.title': 'payment',
                'body.class': 'index',
                'body.message': 'payment Details'
            }

           await this.view('feedback', data)
                .then(string => this.uview(string, data, 'partials/feedback/_header', 'partials/feedback/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
    /**
     * @name shipping
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /shipping
     * @url /shipping
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the shipping page
     * @return does not return anything
     * 
     */
   async shipping (data, fn) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'shipping'
            }
          await  this.view('shipping', data)
                .then(string => this.uview(string, data, 'partials/shipping/_header', 'partials/shipping/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
    /**
     * @name usercart
     * @function 
     * 
     * @method HTTP GET
     * @endpoint /cart
     * @url /cart
     * 
     * @param {Request}  data the request object data
     * @param {Response} fn the response function
     * @param {Request}  req the request object or middleware (optional)
     * @param {Response} res the response object or middleware (optional)
     * 
     * @description sets views, data, and metadata for the cart page
     * @return does not return anything
     * 
     */
  async usercart (data, fn) {
        if (data.method === 'get') {
            // Prepare data for interpolation 
            const data = {
                'head.title': 'cart',
            }
           await this.view('cart', data)
                .then(string => this.uview(string, data, 'partials/cart/_header', 'partials/cart/_footer')
                    .then(string => fn(200, string, 'html'))
                    .catch(() => fn(500, undefined, 'html')))
                .catch(() => fn(403, undefined, 'html'))
        } else {
            fn(403, undefined, 'html')
        }
    }
}

module.exports = DefaultController
'use strict'
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var STATIC_FILES = [
    '/public/js/menu/pizza/pizza.js',
    '/public/js/shopping_cart/shoppingCart.js',
    '/public/js/about/about.js',
    '/public/js/account/account.js',
    '/public/js/common/footer/footer.js',
    '/public/js/common/header/header.js',
    '/public/js/common/navbar/navbar.js',
    '/public/js/common/Common.js/',
    '/public/js/common/FormElement.js',
    '/public/js/contact/contact.js',
    '/public/js/dashboard/dashboard.js',
    '/public/js/home/home.js',
    '/public/js/login/login.js',
    '/public/js/order/order.js', 
    '/public/js/pages/main/page.js',
    '/public/js/payment/payment.js', 
    '/public/js/review/review.js',
    '/public/js/shipping/shipping.js',
    '/public/js/signup/signup.js',
    '/public/js/worker/activate.js',
    '/public/js/worker/fetch.js',
    '/public/js/worker/fetchutils.js', 
    '/public/js/worker/install.js', 
    '/public/js/worker/variables.js',
    '/app/Views/common/_footer.html',
    '/app/Views/common/_header.html',
    '/app/Views/partials/about/_footer.html',
    '/app/Views/partials/about/_header.html',
    '/app/Views/partials/account/_footer.html',
    '/app/Views/partials/account/_header.html',
    '/app/Views/partials/cart/_footer.html',
    '/app/Views/partials/cart/_header.html',
    '/app/Views/partials/contact/_footer.html',
    '/app/Views/partials/contact/_header.html',
    '/app/Views/partials/dashboard/_footer.html',
    '/app/Views/partials/dashboard/_header.html',
    '/app/Views/partials/feedback/_footer.html',
    '/app/Views/partials/feedback/_header.html',
    '/app/Views/partials/home/_footer.html',
    '/app/Views/partials/home/_header.html',
    '/app/Views/partials/login/_footer.html',
    '/app/Views/partials/login/_header.html',
    '/app/Views/partials/menu/_footer.html',
    '/app/Views/partials/menu/_header.html',
    '/app/Views/partials/order/_footer.html',
    '/app/Views/partials/order/_header.html',
    '/app/Views/partials/payment/_footer.html',
    '/app/Views/partials/payment/_header.html',
    '/app/Views/partials/review/_footer.html',
    '/app/Views/partials/review/_header.html',
    '/app/Views/partials/shipping/_footer.html',
    '/app/Views/partials/shipping/_header.html',
    '/app/Views/partials/signup/_footer.html',
    '/app/Views/partials/signup/_header.html',
    '/app/Views/404.html', 
    '/app/Views/about.html',
    '/app/Views/account.html', 
    '/app/Views/billing.html', 
    '/app/Views/cart.html',
    '/app/Views/contact.html', 
    '/app/Views/dashboard.html', 
    '/app/Views/feedback.html', 
    '/app/Views/index.html',
    '/app/Views/login.html', 
    '/app/Views/menu.html', 
    '/app/Views/order.html', 
    '/app/Views/payment.html', 
    '/app/Views/review.html',
    '/app/Views/shipping.html',
    '/app/Views/signup.html'

 
];

function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
        // console.log('matched ', string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}
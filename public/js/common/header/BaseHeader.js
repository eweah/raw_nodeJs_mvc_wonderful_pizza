'use strict'

import Common from '../Common.js'
class BaseHeader extends Common {
    constructor() {
        super();
        // element created
        this.autobind(BaseHeader)
        this.data  = {}
    }
    blinkNotification = () =>{
        setInterval(this.showNotification, 2000)
    
       }
       // clearNotification(){
       // }
       hideNotification = () =>{
           
           this.headerTile.innerHTML = `You have registered!`
           this.headerTile.style.color = 'white'
           this.headerTitleText.innerHTML = 'You may now loggin'
           this.headerTitleText.style.color= 'orange'
       }
    showNotification = () =>{
        this.headerTile.innerHTML = `Congratulation!`
        this.headerTile.style.color = 'white'
        this.headerTitleText.innerHTML = 'You may now loggin'
        this.headerTitleText.style.color= 'yellow'
           setTimeout(this.hideNotification, 1000)
       }
    home() {
        this.headerTile.innerHTML = 'Wonderful Pizza'
        this.headerTitleText.innerHTML = `America's Most Wanted Pizza!`
    }
    about() {
        this.headerTile.innerHTML = 'Wonderful Pizza'
        this.headerTitleText.innerHTML = `America's Most Wanted Pizza!`
    }
    menu() {
        this.headerTile.innerHTML = 'Menu'
        this.headerTitleText.innerHTML = 'Variety means possibilities of taste!'
    }
    signup() {
        this.headerTile.innerHTML = 'Sign Up!'
        this.headerTitleText.innerHTML = 'Great discounts and deals await you!'

    }
    login() {
        this.headerTile.innerHTML = 'Login'
        this.headerTitleText.innerHTML = 'Login to see your personal details including orders, cart, etc.'

    }
    
    async dashboard() {
        const orders = await this.orders()
        if(!orders || orders.length === 0){
         this.headerTitleText.innerHTML = 'You have no order'
         this.headerTile.innerHTML = 'YOUR DASHBOARD IS EMPTY'
        }else{
         this.headerTitleText.innerHTML = `You have a total of ${orders.length} orders.`
         this.headerTile.innerHTML = 'Your orders dashboard'
        }

        
    }
    cart() {
        this.headerTile.innerHTML = 'Your Cart'
        this.headerTitleText.innerHTML = 'All Your Products'
    }
    account() {
        this.headerTile.innerHTML = 'Account'
        this.headerTitleText.innerHTML = 'All your personal data'
    }
    contact() {
        this.headerTile.innerHTML = 'Contact Us'
        this.headerTitleText.innerHTML = 'Swing by for a yummy, or leave us a message'
    }
    shipping() {
        this.headerTile.innerHTML = 'Shipping Details'
        this.headerTitleText.innerHTML = 'We never bill you until after you review your order and agree to pay'
    }
    review() {
        this.headerTile.innerHTML = 'DOES EVERYTHING LOOK CORRECT?'
        this.headerTitleText.innerHTML = 'We never bill you until after you review your order and agree to pay'
    }
    payment() {
        this.headerTile.innerHTML = 'Payment Details'
        this.headerTitleText.innerHTML = `We will bill you after you successfully pay <hr> <br> <small>Please use any of the following test credit cards of your choice</small>: <br> <br><div style="text-align:justified"><small> <strong>American Express</strong>: 370012345612345 or 3700-123456-12345 <br><strong>Visa</strong>: 4000123412341234 or 4000-1234-1234-1234 <br><strong>Mastercard</strong>: 5100123412341234 or 5100-1234-1234-1234 <br><strong>Discover</strong>:6011123412341234 or 6011-1234-1234-1234</small></div> <br><br>
        <strong>NOTE:</strong> A real credit card will fail. This is only a fictional company! <br> <strong style="color:red">So please use any of the test credit cards</strong>.<br> However use your real email address and phone number for notifications and invoices.`
    }

    feedback() {
        this.headerTile.innerHTML = 'YOU ORDER IS ON ITS WAY!'
        this.headerTitleText.innerHTML = `Enjoy! Thanks for choosing Wonderful Pizza, America's Most Wanted Pizza!'`
    }
    pizza() {

        const data = JSON.parse(window.localStorage.getItem('pizza'))
        if(data && data !== null){
            this.headerTile.innerHTML = data.name.toUpperCase()
        this.headerTitleText.innerHTML = `Our ${data.type} is America's Most Wanted ${data.type} pizza!`
        }
       
    }



    pages() {
        const parsedURL = new URL(this.baseURI)
        const path = parsedURL.pathname
        if (path === '/') this.home()
        if (path === '/menu') this.menu()
        if (path === '/about') this.about()
        if (path === '/dashboard') this.dashboard()
        if (path === '/cart') this.cart()
        if (path === '/account') this.account()
        if (path === '/contact') this.contact()
        if (path === '/shipping') this.shipping()
        if (path === '/payment') this.payment()
        if (path === '/review') this.review()
        if (path === '/feedback') this.feedback()
        if (path === '/pizza') this.pizza()
        if (path === '/signup') this.signup()
        if (path === '/login') this.login()
    }
    isServiceWorkerPresent = () => 'serviceWorker' in navigator ? true : false

    urlBase64ToUint8Array = base64String => {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    displayConfirmNotification = () => {

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .ready
                .then(registeredWorker => {
                    const options = {
                        body: 'Congrats! You have successfully subscribed to our Notifications!',
                        icon: '../../../../pwa/public/src/images/icons/app-icon-96x96.png',
                        image: '../../../../pwa/public/src/images/sf-boat.jpg',
                        dir: 'ltr',
                        lang: 'en-US', // BPC 47,
                        vibrate: [100, 50, 200],
                        badge: '../../../../pwa/public/src/images/icons/app-icon-96x96.png', // on Android
                        tag: 'confirm-notification',
                        renotify: true,
                        actions: [{
                                action: 'confirm',
                                title: 'Confirm',
                                icon: '../../../../pwa/public/src/images/icons/app-icon-96x96.png'
                            },
                            {
                                action: 'cancel',
                                title: 'Cancel',
                                icon: '../../../../pwa/public/src/images/icons/app-icon-96x96.png'
                            },
                        ]
                    }
                    registeredWorker.showNotification('Successfully Subscribed!', options)
                })
                .catch(console.error)
        }

    }

    configurePushSubscription = () => {
        if (!('serviceWorker' in navigator)) return

        let registration
        navigator.serviceWorker
            .ready
            .then(registeredWorker => {
                registration = registeredWorker
                return registeredWorker.pushManager.getSubscription()
            })
            .then(subscription => {
                if (subscription === null) {
                    // Create a new subscription
                    console.log('substriong is null', subscription)
                    const apiKeys = {}
                    apiKeys.private = 'lZNJmgC5V7UqJVipOj7BlyBlamjJr76-KPHWWFvYXUc'
                    apiKeys.public = 'BOccmZTvYlG9a2XbUxOyJ93SxMVYRqwNHrtyF3mfQftTXPEW0H8_aVziWN28wzB2rIZQsT3VwTDFitpISt9HEss'
                    const applicationKey = urlBase64ToUint8Array(apiKeys.public)
                    const subConfigOptions = {
                        userVisibleOnly: true,
                        applicationServerKey: applicationKey
                    }

                    return registration.pushManager.subscribe(subConfigOptions)
                } else {
                    // there already is  subscription

                }
            })
            .then(newSubscription => {
                // Send it to database 
                const url = 'https://wonderful-pizza-752d5.firebaseio.com/subscriptions.json'
                const getOptions = {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(newSubscription)
                }
                return fetch(url, getOptions)
            })
            .then(response => {

                displayConfirmNotification()

            })
            .catch(console.error)

    }
    // function to actually ask the permissions
    handlePermission = (permission) => {
        // Whatever the user answers, we make sure Chrome stores the information
        if (!('permission' in Notification)) {
            Notification.permission = permission;
        }

        // set the button to shown or hidden, depending on what the user answers
        if (Notification.permission === 'denied' || Notification.permission === 'default') {
            this.notificationContainer.style.display = 'block';
            console.log('notification permission not granted. Sorry')
        } else {
            this.notificationContainer.style.display = 'none';
            console.log('notification permission granted.')
            // displayConfirmNotification()
            configurePushSubscription()
        }
    }

    checkNotificationPromise = () => {
        try {
            Notification.requestPermission().then();
        } catch (e) {
            return fals
        }

        return true;
    }
    checkState = () => {
        // Let's check if the browser supports notifications
        if (!('Notification' in window)) {
            console.log("This browser does not support notifications.");
        } else {
            if (checkNotificationPromise()) {
                Notification.requestPermission()
                    .then((permission) => {
                        handlePermission(permission);
                    })
            } else {
                Notification.requestPermission(function (permission) {
                    handlePermission(permission);
                });
            }
        }
    }

    askNotificationPermission = () => {
        checkState()
    }

    checkNotificationPromise() {
        try {
            Notification.requestPermission().then();
        } catch (e) {
            return false;
        }

        return true;
    }

    handlePermission(permission) {
        // Whatever the user answers, we make sure Chrome stores the information
        if (!('permission' in Notification)) {
            Notification.permission = permission;
        }

        // set the button to shown or hidden, depending on what the user answers
        if (Notification.permission === 'denied' || Notification.permission === 'default') {
            notificationBtn.style.display = 'block';
        } else {
            notificationBtn.style.display = 'none';
        }
    }


    hasBrowserNotification() {
        if (!('Notification' in window)) {
            console.log("This browser does not support notifications.");
        } else {
            if (this.checkNotificationPromise()) {
                Notification.requestPermission()
                    .then((permission) => {
                        this.handlePermission(permission);
                    })
            } else {
                Notification.requestPermission(function (permission) {
                    this.handlePermission(permission);
                });
            }
        }
    }

    askNotificationPermission() {
        this.handlePermission(permission)
        this.hasBrowserNotification()
    }
    pluralize(quantity, item, style = 'l') {
        let plural
        style === 'u' ? plural = 'S' : plural = 's'
        return (typeof quantity === 'number' && quantity > 1) ? `${item}${plural}` : `${item}`
    }
    processAddNotification(event) {
        if (Notification.permission === 'granted') {
            // console.log('event', event.data.order)
            const order = event.data.order
            const text = `${order.name}`
            const body = `You added ${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size+ ' ' + order.name,'l')} to your cart!`
            const title = `${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size.toUpperCase()+ ' ' + order.name.toUpperCase(),'u')} ADDED!`
            // console.log(title)
            const lang = 'en-US'
            const data = 'OK Cool'
            const dts = Math.floor(Date.now())
            const vibratepattern = [200, 100, 200]
            const image = '../../../test.jpg'
            const icon = ''
            const actions = []
            const badge = ''
            const dir = 'rtl' /** ltr,rtl */
            const tag = ''
            const options = {
                body,
                lang,
                data,
                timestamp: dts,
                vibrate: vibratepattern,
                requireInteraction: false,
                renotify: false,
                dir
            }
            const notification = new Notification(title, options)
            notification.addEventListener('click', event => {
                event.preventDefault()
                alert('Voila')
            })
            notification.addEventListener('close', event => {
                event.preventDefault()
            })
            notification.addEventListener('error', event => {
                event.preventDefault()
            })
            notification.addEventListener('show', event => {
                event.preventDefault()
            })
        }
        // document.addEventListener('visibilitychange', event =>{
        //     if(document.visibilityState === 'visible'){
        //         // The tab has become visible so clear the now-stale Notification. 
        //         notify.close()
        //     }
        // })

    }
    processRemoveNotification(event) {
        if (Notification.permission === 'granted') {
            const order = event.data.order
            // const text = `${order.name}`
            // const body = `You added ${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size+ ' ' + order.name,'l')} to your cart!`
            // const title =  `${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size.toUpperCase()+ ' ' + order.name.toUpperCase(),'u')} ADDED!`
            // // console.log(title)
            const title = 'ITEM REMOVED FROM CART'
            const body = 'You have removed an item from your cart'
            const lang = 'en-US'
            const data = 'OK Cool'
            const dts = Math.floor(Date.now())
            const vibratepattern = [200, 100, 200]
            const image = '../../../test.jpg'
            const icon = ''
            const actions = []
            const badge = ''
            const dir = 'rtl' /** ltr,rtl */
            const tag = ''
            const options = {
                body,
                lang,
                data,
                timestamp: dts,
                vibrate: vibratepattern,
                requireInteraction: false,
                renotify: false,
                dir
            }
            const notification = new Notification(title, options)
            notification.addEventListener('click', event => {
                event.preventDefault()
                alert('Voila')
            })
            notification.addEventListener('close', event => {
                event.preventDefault()
            })
            notification.addEventListener('error', event => {
                event.preventDefault()
            })
            notification.addEventListener('show', event => {
                event.preventDefault()
            })
        }
        // document.addEventListener('visibilitychange', event =>{
        //     if(document.visibilityState === 'visible'){
        //         // The tab has become visible so clear the now-stale Notification. 
        //         notify.close()
        //     }
        // })

    }
    processUpdateNotification(event) {
        if (Notification.permission === 'granted') {
            const order = event.data.order
            // const text = `${order.name}`
            // const body = `You added ${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size+ ' ' + order.name,'l')} to your cart!`
            // const title =  `${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size.toUpperCase()+ ' ' + order.name.toUpperCase(),'u')} ADDED!`
            // // console.log(title)
            const title = 'ITEM UPDATED'
            const body = 'You have updated an item in your cart'
            const lang = 'en-US'
            const data = 'OK Cool'
            const dts = Math.floor(Date.now())
            const vibratepattern = [200, 100, 200]
            const image = '../../../test.jpg'
            const icon = ''
            const actions = []
            const badge = ''
            const dir = 'rtl' /** ltr,rtl */
            const tag = ''
            const options = {
                body,
                lang,
                data,
                timestamp: dts,
                vibrate: vibratepattern,
                requireInteraction: false,
                renotify: false,
                dir
            }
            const notification = new Notification(title, options)
            notification.addEventListener('click', event => {
                event.preventDefault()
                alert('Voila')
            })
            notification.addEventListener('close', event => {
                event.preventDefault()
            })
            notification.addEventListener('error', event => {
                event.preventDefault()
            })
            notification.addEventListener('show', event => {
                event.preventDefault()
            })
        }
        // document.addEventListener('visibilitychange', event =>{
        //     if(document.visibilityState === 'visible'){
        //         // The tab has become visible so clear the now-stale Notification. 
        //         notify.close()
        //     }
        // })

    }

    processUpdateOrderReviewNotification(event) {
        if (Notification.permission === 'granted') {
            const order = event.data.order
            // const text = `${order.name}`
            // const body = `You added ${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size+ ' ' + order.name,'l')} to your cart!`
            // const title =  `${order.pricing.quantity} ${this.pluralize(parseInt(order.pricing.quantity), order.size.toUpperCase()+ ' ' + order.name.toUpperCase(),'u')} ADDED!`
            // // console.log(title)
            const title = 'ORDER REVIEW UPDATED'
            const body = 'You have reviewed and updated your order'
            const lang = 'en-US'
            const data = 'OK Cool'
            const dts = Math.floor(Date.now())
            const vibratepattern = [200, 100, 200]
            const image = '../../../test.jpg'
            const icon = ''
            const actions = []
            const badge = ''
            const dir = 'rtl' /** ltr,rtl */
            const tag = ''
            const options = {
                body,
                lang,
                data,
                timestamp: dts,
                vibrate: vibratepattern,
                requireInteraction: false,
                renotify: false,
                dir
            }
            const notification = new Notification(title, options)
            notification.addEventListener('click', event => {
                event.preventDefault()
                alert('Voila')
            })
            notification.addEventListener('close', event => {
                event.preventDefault()
            })
            notification.addEventListener('error', event => {
                event.preventDefault()
            })
            notification.addEventListener('show', event => {
                event.preventDefault()
            })
        }
        // document.addEventListener('visibilitychange', event =>{
        //     if(document.visibilityState === 'visible'){
        //         // The tab has become visible so clear the now-stale Notification. 
        //         notify.close()
        //     }
        // })

    }
    onCartItemAddNotification() {
        this.addCartChannel.onmessage = event => {
            this.processAddNotification(event)
        }
    }
    onCartItemUpdateNotification() {
        this.updateCartChannel.onmessage = event => {
            this.processUpdateNotification(event)
        }
    }
    onCartItemRemoveNotification() {
        this.removeCartChannel.onmessage = event => {
            this.processRemoveNotification(event)
        }
    }
    onOrderReviewUpdateNotification() {
        this.updateReviewChannel.onmessage = event => {
            this.processUpdateOrderReviewNotification(event)
        }
    }
    
    /**
     * @name connectedCallback (element's life cycle)
     * @function
     * 
     * @description browser calls this method when the element is added or mounted to the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
    connectedCallback() {}

    /**
     * @name disconnectedCallback (element's life cycle)
     * @function 
     * 
     * @description browser calls this method when the element is removed or disconnect from the document or DOM
	   * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
	  disconnectedCallback() {}

	  /**
     * @name observedAttributes (element's life cycle)
     * @function
     * 
     * @description array of attribute names to monitor for changes
     * 
     * @return does not return anything
     * 
     */
	  static get observedAttributes() {return []}

	  /**
     * @name attributeChangedCallback (element's life cycle)
     * @function
     * 
     * @description called when one of attributes listed above is modified (the attributes listed in the array returned by the observedAttribues method above)
     * 
     * @return does not return anything
     * 
     */

	  attributeChangedCallback(name, oldValue, newValue) {}

	  /**
     * @name adoptedCallback (element's life cycle)
     * @function
     * 
     * @description called when the element is moved to a new document
     * 
     * @return does not return anything
     * 
     */
	  adoptedCallback() {}
}
customElements.define("base-header", BaseHeader);
export default BaseHeader
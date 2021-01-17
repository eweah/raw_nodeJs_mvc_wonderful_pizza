'use strict'

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module OrdersControllerUtils
 * @kind class
 * 
 * @extends HTTPController
 * 
 * @requires HTTPController
 * @requires Mail
 * @requires Bill
 * @requires SMS
 * 
 * @classdesc Resourceful controller for interacting with pages
 * 
 * @typedef {Request}  data the request object data 
 * @typedef {Response} fn the response function 
 * @typedef {Request}  req the request object or middleware
 * @typedef {Response} res the response object or middleware
 * 
 */


const HTTPController = require('../..')

const Mail = require('../notification/mail/orders')
const Bill = require('../notification/bill/orders')
const SMS = require('../notification/sms/orders')

class OrdersControllerUtils extends HTTPController {
    constructor() {
        super()
        this.errors = []

        // auto bind methods
        this.autobind(OrdersControllerUtils)
    }

    /**
     * @name notifyCustomer
     * @function
     * 
     * @param {Object}  order the customer's order
     *
     * @description bills customers, emails customer's order details, and sends customer SMS notification
     * @return does not return anything
     * 
     */
    async notifyCustomer(order) {
        new Mail(order).email()
        new Bill(order).bill()
        new SMS(order).text()
    }
    /**
     * @name updateOrCreate
     * @function
     * 
     * @param {Object}  order the customer's order
     * @param {Object}  user the customer (or user)
     *
     * @description updates or creates the authenticated customer's (or user's) order
     * @return does not return anything
     * 
     */
    async updateOrCreate(order, user) {
        await this.fileUpdate(`users/${user.phone.split('-').join('')}.json`, user)
        await this.fileCreate(`orders/${order.id}.json`, {
            // id: order.id,
            // card: order.card,
            // products: order.products,
            // price: order.price,
            // number: order.number,
            // created_at: order.created_at,
            // updated_at: order.updated_at
            id: order.id,
            number: order.number,
            products: order.products,
            price: order.price,
            card: order.card,
            created_at: order.created_at,
            updated_at: order.updated_at,
            guest: false
        })
    }

    /**
     * @name addOrderAndClearCart
     * @function
     * 
     * @param {Object}  order the customer's order
     * @param {Object}  user the customer (or user)
     *
     * @description adds an order to the authenticated customer (or user) records and clearn his/her cart
     * @return does not return anything
     * 
     */
    async addOrderAndClearCart(order, user) {
        if (!user.orders || user.orders.length === 0) {
            user.orders = []
        }
        user.cart = []
        user.orders.push(order.id)
    }

    /**
     * @name processAuthOrderData
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     *
     * @description proccesses the actual authenticated customer's (or user's) order process (payment proccess)
     * @return does not return anything
     * 
     */

    async processAuthOrderData(order) {
        this.getAuth = await this.auth()
        this.addOrderAndClearCart(order, this.getAuth)
        this.updateOrCreate(order, this.getAuth)
        this.notifyCustomer(order)
    }

     /**
     * @name authOrderShippingExists
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     * @param {Object}  shipping the customer's (or user) shipping record
     *
     * @description updates authenticated customer's (or user's) shipping records
     * @return does not return anything
     * 
     */
    async authOrderShippingExists(order, shipping) {
        await this.fileUpdate(`shippings/${order.user.phone.split('-').join('')}.json`, shipping)
            .then(async () => {
                try {
                    this.processAuthOrderData(order)
                } catch (error) {
                    this.emit('error-updating-aut-data', {error: 'Error updating auth data'})
                }
            })
    }

     /**
     * @name authOrderShippingDoesNotExist
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     *
     * @description create authenticated customer's (or user's) shipping records
     * @return does not return anything
     * 
     */

    async authOrderShippingDoesNotExist(order) {
        order.user.cart = []
        order.user.cart.push(order.id)
        await this.fileCreate(`shippings/${order.user.phone.split('-').join('')}.json`, order.user)
            .then(async () => {
                try {
                    this.processAuthOrderData(order)
                } catch (error) {
                    fn(200, {
                        error: 'Error creating auth initial records and updating'
                    })
                }
            })
            .catch(error => console.log('could not create auth shipping user', error))
    }

    /**
     * @name cleanAuthCart
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     *
     * @description cleans (or clears) authenticated customer's (or user's) cart upon successfull order placement
     * @return does not return anything
     * 
     */
    async cleanAuthCart() {
        this.orderCart = this.data.payload.cart
        if (this.orderCart && Array.isArray(this.orderCart) && this.orderCart.length > 0) {
            this.orderCart.forEach(async order => {
                try {
                    await this.fileDelete(`carts/users/${order.id}.json`)
                } catch (error) {
            
                    this.emit('could-not-clear-cart',{error: 'Could not clear cart'})
                }
            })
        } else {
      
            this.emit('cart-is-empty', {error: 'Cart is empty'})
        }

    }

    /**
     * @name createAuthRecord
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     *
     * @description creates (or stores) authenticated customer's (or user's) order records upon successfull order placement
     * @return does not return anything
     * 
     */
    async createAuthRecord(order) {
        await this.fileRead(`shippings/${order.user.phone.split('-').join('')}.json`)
            .then(data => {
                this.shipping = JSON.parse(data)
                this.shipping.cart.push(order.id)
                this.authOrderShippingExists(order, this.shipping)
            })
            .catch(() => {
                this.authOrderShippingDoesNotExist(order)
            })
    }

    /**
     * @name checkOrderDetails
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     *
     * @description checks (or or verifies) incoming order object for processing
     * @return {Boolean} true or false
     * 
     */
    checkOrderDetails(order) {
        const checkSize =
            typeof order.size === 'string' && ['small', 'medium', 'large', 'xlarge'].indexOf(order.size.toLowerCase()) > -1 && ['small', 'medium', 'large', 'xlarge'].includes(order.size.toLowerCase()) &&
            order.size.trim().length > 0 ?
            true :
            false;
        const checkType = typeof order.name === 'string' && order.name.trim().length > 0 ? true : false;
        const checkQuantity = typeof order.pricing.quantity === 'number' && order.pricing.quantity > 0 ? true : false;

        if (checkType && checkSize && checkQuantity) {
            return true
        } else {

            return false
        }
    }
    /**
     * @name buildOrderProducts
     * @function
     * 
     * @param {Array}  cart the customer's (or user) incoming (or request) order cart array object
     *
     * @description builds order products from the incoming order object cart for processing
     * @return does not return anything
     * 
     */
    async buildOrderProducts(cart = []) {
        cart.forEach(order => {
            if (this.checkOrderDetails(order) === true) {
                this.order.products.push(this.createAuthItemObject(order))
            } else {
               return this.fn(400, {
                    Error: 'One or more required field(s) is missing.',
                });
            }

        })
    }

    /**
     * @name buildOrderProductsAndCreateRecord
     * @function
     * 
     * @description builds order products and creates order record from the incoming (request) payload
     * @return does not return anything
     * 
     */
    async buildOrderProductsAndCreateRecord() {
        this.cart = this.data.payload.cart
        this.card = this.data.payload.card
        this.user = this.data.payload.user
        this.order = {}
        this.order.card = this.card
        this.order.user = this.user
        this.order.products = []
        this.order.id = this.createRandomString(30);
        const date = new Date();
        this.order.created_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        this.order.updated_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        this.order.number = this.generateOrderNumber()
        this.order.price = `\$${this.orderPrice(this.data.payload.cart)}`


        if (Array.isArray(this.cart) && this.cart.length > 0 && this.cart.length < this.environmentToExport().maxItemsInCart) {
            this.buildOrderProducts(this.cart)

            if (await this.authCheck()) {
                this.createAuthRecord(this.order)
                this.cleanAuthCart()
             } 
            //else {
            //     this.createGuestRecord(this.order)
            // }
        } else {
            this.emit('cart-is-empty', {error: 'Cart is empty'})
        }
    }

    /**
     * @name buildGuestOrderProductsAndCreateRecord
     * @function
     * 
     * @description builds order products and creates order record from the incoming (request) payload
     * @return does not return anything
     * 
     */
    async buildGuestOrderProductsAndCreateRecord() {
        this.cart = this.data.payload.cart
        this.card = this.data.payload.card
        this.user = this.data.payload.user
        this.order = {}
        this.order.card = this.card
        this.order.user = this.user
        this.order.products = []
        this.order.id = this.createRandomString(30);
        const date = new Date();
        this.order.created_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        this.order.updated_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        this.order.number = this.generateOrderNumber()
        this.order.price = `\$${this.orderPrice(this.data.payload.cart)}`
        if (Array.isArray(this.cart) && this.cart.length > 0 && this.cart.length < this.environmentToExport().maxItemsInCart) {
            this.buildOrderProducts(this.cart)
            this.createGuestRecord(this.order)
        } else {
            this.emit('cart-is-empty', {error: 'Cart is empty'})
        }
    }
    
    /**
     * @name onPrepareAuthOrder
     * @function
     * 
     * @description prepares the authenticated customer 's or (user's) incoming order (request) for processing
     * @return does not return anything
     * 
     */
    async onPrepareAuthOrder() {
        try {
            this.buildOrderProductsAndCreateRecord()
        } catch (error) {
            this.emit('error-placing-order', {error: 'Error processing order'})
        }

    }

     /**
     * @name checkGuestOrderInputs
     * @function
     * 
     * @description checks (or or verifies) incoming guest's order object for processing
     * @return does not return anything
     * 
     */
    checkGuestOrderInputs() {
        if (!this.data) return this.fn(200, {
            error: 'No data at all'
        })
        if (!this.data.payload) return this.fn(200, {
            error: 'No empty payload'
        })
        if (!this.data.payload.user) return this.fn(200, {
            error: 'not guest user found'
        })
        if (!this.data.payload.cart) return this.fn(200, {
            error: 'no guest cart found'
        })
        if (!this.data.payload.card) return this.fn(200, {
            error: 'No guest card found'
        })
        if (!this.data.payload.cart.length || this.data.payload.cart.length === 0) return this.fn(200, {
            error: 'No empty cart allowed'
        })
    }

    /**
     * @name onPrepareGuestOrder
     * @function
     * 
     * @description prepares the guest customer 's or (user's) incoming order (request) for processing
     * @return does not return anything
     * 
     */

   
    async onPrepareGuestOrder() {
        this.checkGuestOrderInputs()
        // this.buildOrderProductsAndCreateRecord()
        this.buildGuestOrderProductsAndCreateRecord()
    }


    /**
     * @name onPrepareGuestOrder
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     * 
     * @description creates (or stores) guest customer's (or user's) order record
     * @return does not return anything
     * 
     */
    async createGuestOrder(order) {
        await this.fileCreate(`orders/${order.id}.json`, {
            // card: order.card,
            // products: order.products,

            id: order.id,
            number: order.number,
            products: order.products,
            price: order.price,
            card: order.card,
            created_at: order.created_at,
            updated_at: order.updated_at,
            guest: true
        })
    }

    /**
     * @name createGuestAndAddGuestOrder
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     * 
     * @description creates (or stores) guest customer's (or user's) order records upon successfull order placement
     * @return does not return anything
     * 
     */
    async createGuestOrderRecord(order) {
        this.createGuestOrder(order)
        this.notifyCustomer(order)
    }

    /**
     * @name updateGuest
     * @function
     * 
     * @param {Object}  order the customer's (or user) order
     * @param {Object}  guest the guest customer (or user) object
     * 
     * @description update guest customer's (or user's) records upon successfull order placement
     * @return does not return anything
     * 
     */
    async updateGuest(order, guest) {
        await this.fileUpdate(`guests/${order.user.phone.split('-').join('')}.json`, guest)
            .then(() => {
                this.notifyCustomer(order)
            })
            .catch(error => console.log('Error updating guest'))
    }


     /**
     * @name createGuestAndAddGuestOrder
     * @function
     * 
     * @param {Object}  order the guest customer's (or user) order
     * 
     * @description creates (or stores) guest customer's (or user's) records upon successfull order placement
     * @return does not return anything
     * 
     */

    async createGuestAndAddGuestOrder(order) {
        order.user.cart = []
        order.user.cart.push(order.id)
        await this.fileCreate(`guests/${order.user.phone.split('-').join('')}.json`, order.user)
            .then(async () => {
                this.createGuestOrderRecord(order)
            })
            .catch(error => console.log('could not create guest user', error))
    }

   /**
     * @name updateGuestAndAddGuestOrder
     * @function
     * 
     * @param {Object}  order the guest customer's (or user) order
     * @param {Object}  guest the guest customer (or user) object
     * 
     * @description updates (or edits) guest customer's (or user's) order records upon successfull order placement
     * @return does not return anything
     * 
     */
    async updateGuestAndAddGuestOrder(order, guest) {
        await this.fileCreate(`orders/${order.id}.json`, {
            id: order.id,
            number: order.number,
            products: order.products,
            price: order.price,
            card: order.card,
            created_at: order.created_at,
            updated_at: order.updated_at,
            guest: true
            })
            .then(async () => {
                this.updateGuest(order, guest)
            })
            .catch(error => console.log('Error updating guest records ', error))
    }


     /**
     * @name guestOrderShippingExists
     * @function
     * 
     * @param {Object}  order the guest customer's (or user) order
     * @param {Object}  shipping the guest customer (or user) shipping record
     * 
     * @description updates (or edits) guest customer's (or user's) shipping records 
     * @return does not return anything
     * 
     */
    async guestOrderShippingExists(order, shipping) {
        await this.fileUpdate(`guestshippings/${order.user.phone.split('-').join('')}.json`, shipping)
            .then(async () => {
                try {
                    this.recordGuest(order)
                } catch (error) {
                    this.emit('error-updating-guest-data', {error: 'Error updating guest data'})
                }
            })
    }
    
    /**
     * @name guestOrderShippingDoesNotExist
     * @function
     * 
     * @param {Object}  order the guest customer's (or user) order
     * 
     * @description create (or store) guest customer's (or user's) shipping records 
     * @return does not return anything
     * 
     */
    async guestOrderShippingDoesNotExist(order) {
        order.user.cart = []
        order.user.cart.push(order.id)
        await this.fileCreate(`guestshippings/${order.user.phone.split('-').join('')}.json`, order.user)
            .then(async () => {
                try {
                    this.recordGuest(order)
                } catch (error) {
                    fn(200, {
                        error: 'Error creating guest initial records and updating'
                    })
                }
            })
            .catch(error => console.log('could not create guest shipping user', error))
    }


    /**
     * @name guestOrderShippingDoesNotExist
     * @function
     * 
     * @param {Object}  order the guest customer's (or user) order
     * 
     * @description creates (or stores) guest customer's (or user's) shipping records  if it does not already exists
     * @return does not return anything
     * 
     */
    async guestShipping(order) {
        await this.fileRead(`guestshippings/${order.user.phone.split('-').join('')}.json`)
            .then(data => {
                this.guestShipping = JSON.parse(data)
                this.guestShipping.cart.push(order.id)
                this.guestOrderShippingExists(order, this.guestShipping)
            })
            .catch(() => {
                this.guestOrderShippingDoesNotExist(order)
            })
    }
  

    /**
     * @name recordGuest
     * @function
     * 
     * @param {Object}  order the guest customer's (or user) order
     * 
     * @description creates (or stores) guest customer (or user) records 
     * @return does not return anything
     * 
     */
    async recordGuest(order) {
        await this.fileRead(`guests/${order.user.phone.split('-').join('')}.json`)
            .then(async data => {
                this.guest = JSON.parse(data)
                this.guest.cart.push(order.id)
                this.updateGuestAndAddGuestOrder(order, this.guest)
            })
            .catch(() => {
                this.createGuestAndAddGuestOrder(order)
            })
    }

    /**
     * @name createGuestRecord
     * @function
     * 
     * @param {Object}  order the guest customer's (or user) order
     * 
     * @description creates (or stores) guest customer (or user) records upon successfull order placement
     * @return does not return anything
     * 
     */
    async createGuestRecord(order) {
        try {
            this.guestShipping(order)
        } catch (error) {
            console.log('order', order)
            console.log('Error adding or updating guest')
        }
    }

     /**
     * @name prepareAuthCart
     * @function
     * 
     * 
     * @description prepares authenticated customer's (or user's) cart for cart item processing (storage)
     * @return does not return anything
     * 
     */
    async prepareAuthCart() {
        if (await this.authCheck()) {
            try {
                const auth = await this.auth()
                const cartItem = this.createAuthSaveCartItemObject(this.data.payload)
                await this.fileCreate(`carts/users/${cartItem.id}.json`, cartItem)
                if (!auth.cart || auth.cart.length === 0) {
                    auth.cart = []
                    auth.cart.push(cartItem.id)
                } else {
                    auth.cart.push(cartItem.id)
                }
                await this.fileUpdate(`users/${auth.phone}.json`, auth)
                return this.fn(200, {
                    success: 'cart item added',
                    cartItem
                })
            } catch (error) {
                this.fn(300, {
                    error: 'could not create auth cart item'
                })
            }
        } else {
            this.fn(200, {
                error: 'Unauthorized'
            })
            return
        }

    }

    /**
     * @name createAuthItemObject
     * @function
     * 
     * 
     * @description create authenticated customer's (or user's) cart item object
     * @return the authenticated customer's (or user's) cart item object
     * 
     */
    createAuthItemObject(item) {
        const itemId = this.createRandomString(30);
        const type = item.name;
        const size = item.size;
        const quantity = item.pricing.quantity;
        const placed = item.placed;
        const cartItem = this.select(type, size, quantity, placed);
        const date = new Date();
        cartItem.created_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        cartItem.updated_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        cartItem.id = itemId
        return item
    }

     /**
     * @name createAuthSaveCartItemObject
     * @function
     * 
     * @param {Object} item the authenticated customer's (or user's) saved cart item object
     * 
     * @description create authenticated customer's (or user's) saved cart item object
     * @return the authenticated customer's (or user's) saved cart item object
     * 
     */
    createAuthSaveCartItemObject(item) {
        const itemId = this.createRandomString(30);
        // Create the order object
        const type = item.type;
        const size = item.size;
        const quantity = item.quantity;
        const placed = item.placed;
        const cartItem = this.select(type, size, quantity, placed);
        const date = new Date();
        cartItem.created_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        cartItem.updated_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
        cartItem.id = itemId
        return cartItem
    }

     /**
     * @name sizeCheck
     * @function
     * 
     * @param {Object}  data the incoming customer's (or user) order object
     * @param {String}  checkSize the incoming customer's (or user's) order cart item (or cart item) size
     * @param {Object}  item the incoming customer's (or user's) order cart item (or cart item) object
     *
     * @description checks (or or verifies) the size of incoming cart item for processing
     * @return {String} size
     * 
     */
    sizeCheck(data, checkSize, item) {
        let size
        if (checkSize) {
            if (data.payload.size) {
                size = typeof data.payload.size === 'string' && ['small', 'medium', 'large', 'xlarge'].indexOf(
                        data.payload.size.toLowerCase()
                    ) > -1 && ['small', 'medium', 'large', 'xlarge'].includes(
                        data.payload.size.toLowerCase()
                    ) &&
                    data.payload.size.trim().length > 0 ?
                    data.payload.size.trim() :
                    item.size;
            } else {
                size = item.size
            }

        } else {
            size = item.size
        }

        return size
    }

    /**
     * @name typeCheck
     * @function
     * 
     * @param {Object}  data the incoming customer's (or user) order object
     * @param {String}  checkType the incoming customer's (or user's) order cart item (or cart item) type
     * @param {Object}  item the incoming customer's (or user's) order cart item (or cart item) object
     *
     * @description checks (or or verifies) the type of incoming cart item for processing
     * @return {String} type
     * 
     */

    typeCheck(data, checkType, item) {
        let type
        if (checkType) {
            if (data.payload.type) {
                type =
                    typeof data.payload.type === 'string' &&
                    data.payload.type.trim().length > 0 ?
                    data.payload.type.trim() :
                    item.name;
            } else {
                type = item.name;
            }
        }
        if (!checkType) {
            type = item.name;
        }

        return type
    }

    /**
     * @name quantityCheck
     * @function
     * 
     * @param {Object}  data the incoming customer's (or user) order object
     * @param {Number}  quantityCheck the incoming customer's (or user's) order cart item (or cart item) quantity
     * @param {Object}  item the incoming customer's (or user's) order cart item (or cart item) object
     *
     * @description checks (or or verifies) the quantiy of incoming cart item for processing
     * @return {Number} quantity
     * 
     */
    quantityCheck(data, checkQuantity, item) {
        let quantity
        if (checkQuantity) {
            if (data.payload.quantity) {
                quantity =
                    typeof data.payload.quantity === 'number' &&
                    data.payload.quantity > 0 ?
                    data.payload.quantity :
                    item.pricing['quantity'];
            } else {
                quantity = item.pricing['quantity'];
            }
        } else {
            quantity = item.pricing['quantity'];
        }
        return quantity
    }

    /**
     * @name placedCheck
     * @function
     * 
     * @param {Object}  data the incoming customer's (or user) order object

     * @param {Object}  item the incoming customer's (or user's) order cart item (or cart item) object
     *
     * @description checks (or or verifies) the placed (save in cart or place order) of incoming cart item for processing
     * @return {Boolean} placed
     * 
     */
    placedCheck(data, item) {
        let placed
        if (data.payload) {
            if (data.payload.placed === true) {
                placed = data.payload.placed
            }
            if (data.payload.placed === false) {
                placed = data.payload.placed
            }
            if (typeof data.payload.placed !== 'boolean') {
                placed = false
            }
        } else {
            placed = item.placed
        }
        return placed
    }

    /**
     * @name dataToUpdate
     * @function
     * 
     * @param {Object}  data the incoming customer's (or user) order object
     * @param {String}  size the incoming customer's (or user) order cart item size (or cart item size)
     * @param {String}  type the incoming customer's (or user) order cart item type (or cart item type)
     * @param {Number}  quantity the incoming customer's (or user) order cart item quantity (or cart item quantity)
     * @param {Object}  item the incoming customer's (or user's) order cart item (or cart item) object
     *
     * @description updates (or edits) the authenticated customer's (or user's) carts object
     * @return does not return anything
     * 
     */

    async dataToUpdate(type, size, quantity, item, data) {
        const date = new Date();
        const order = this.select(type, size, quantity, false);
        order['updated_at'] = `${date.toDateString()} ${date.toLocaleTimeString()}`;
        order['id'] = data._id || item
        order['created_at'] = item.created_at
        await this.fileUpdate(`carts/users/${data._id}.json`, order)

    }

    /**
     * @name prepareOrderForUpdate
     * @function
     * 
     * @param {Object}  data the incoming customer's (or user) order object
     * @param {String}  checkSize the incoming customer's (or user) order cart item size (or cart item size)
     * @param {String}  checkType the incoming customer's (or user) order cart item type (or cart item type)
     * @param {Number}  checkQuantity the incoming customer's (or user) order cart item quantity (or cart item quantity)
     * @param {Object}  item the incoming customer's (or user's) order cart item (or cart item) object
     *
     * @description prepares the authenticated customer's (or user's) carts object for updating
     * @return does not return anything
     * 
     */

    prepareOrderForUpdate(data, item, checkSize, checkType, checkQuantity) {
        try {
            if (item.placed !== true) {
                let size, type, quantity, placed
                size = this.sizeCheck(data, checkSize, item)
                type = this.typeCheck(data, checkType, item)
                quantity = this.quantityCheck(data, checkQuantity, item)
                placed = this.placedCheck(data, item)
                this.dataToUpdate(type, size, quantity, item, data)
                //this.fn(200, {success: 'order updated'})
                //return 
            } else {
                return this.fn(200, {
                    Error: 'You can no longer update this order. Re-ordered instead?'
                })
            }
        } catch (e) {
            return this.fn(200, {
                Error: 'Error preparing update order.'
            })
        }
    }

    /**
     * @name prepareAuthCartItemForUpdate
     * @function
     * 
     * @param {Object}  data the incoming customer's (or user) order object
     * @param {Function}  fn the callback function
    
     *
     * @description prepares the authenticated customer's (or user's) cart item object for updating
     * @return does not return anything
     * 
     */

    prepareAuthCartItemForUpdate(data, fn) {
        try {
            if (orderData.products[0].placed !== true) {
                let size, type, quantity, placed
                size = this.sizeCheck(data, checkSize, orderData)
                type = this.typeCheck(data, checkType, orderData)
                quantity = this.quantityCheck(data, checkQuantity, orderData)
                placed = this.placedCheck(data, orderData)
                this.dataToUpdate(type, size, quantity, placed, orderData, data)
                fn(200, orderData)
            } else {
                fn(500, {
                    Error: 'You can no longer update this order. Re-ordered instead?'
                })
                return
            }
        } catch (e) {
            fn(500, {
                Error: 'Error preparing update order.'
            })
        }
    }

    /**
     * @name checkCartItemBeforeUpdate
     * @function
     * 
     * @description checks (or or verifies) incoming order cart item object before updating it or editing it
     * @return {Boolean} true or false
     * 
     */

    checkCartItemBeforeUpdate() {
        // Check for required field
        const checkSize =
            typeof this.data.payload.size === 'string' && ['small', 'medium', 'large', 'xlarge'].indexOf(this.data.payload.size.toLowerCase()) > -1 && ['small', 'medium', 'large', 'xlarge'].includes(this.data.payload.size.toLowerCase()) &&
            this.data.payload.size.trim().length > 0 ?
            true :
            false;
        const checkType = typeof this.data.payload.type === 'string' && this.data.payload.type.trim().length > 0 ? true : false;
        const checkQuantity = typeof this.data.payload.quantity === 'number' && this.data.payload.quantity > 0 ? true : false;

        const isDataIsOk = checkType || checkSize || checkQuantity || (typeof this.data.payload.placed === 'boolean')
        if (isDataIsOk) {
            return true
        } else {
            return false
        }
    }
    /**
     * @name checkCartItemBeforeStore
     * @function
     * 
     * @description checks (or or verifies) incoming order cart item object before creating it or storing it
     * @return {Boolean} true or false
     * 
     */

    checkCartItemBeforeStore() {
        // validate all inputs
        //Check that all required fields are filled out
        const checkSize =
            typeof this.data.payload.size === 'string' && ['small', 'medium', 'large', 'xlarge'].indexOf(this.data.payload.size.toLowerCase()) > -1 && ['small', 'medium', 'large', 'xlarge'].includes(this.data.payload.size.toLowerCase()) &&
            this.data.payload.size.trim().length > 0 ?
            true :
            false;
        const checkType = typeof this.data.payload.type === 'string' && this.data.payload.type.trim().length > 0 ? true : false;
        const checkQuantity = typeof this.data.payload.quantity === 'number' && this.data.payload.quantity > 0 ? true : false;
        if (checkType && checkSize && checkQuantity) {
            return true
        } else {
            return false
        }

    }
    /**
     * @name checkCartItemBeforeUpdate
     * @function
     * 
     * @description checks (or or verifies) incoming order cart item object before updating it or before storing it
     * @return {Function} checkCartItemBeforeUpdate() checkCartItemBeforeStore()
     * 
     */

    async checkCartItem(update = false) {
        if (update === true) {
            return this.checkCartItemBeforeUpdate()
        } else {
            return this.checkCartItemBeforeStore()
        }
    }

    /**
     * @name updateCartItem
     * @function
     * 
     * @description updates (or edits)  order cart item object
     * @return {Function} the updated cart item through a callback
     * 
     */

    async updateCartItem() {
         await this.fileRead(`carts/users/${this.data._id}.json`)
        .then(response => {
            const item = JSON.parse(response)
            this.prepareOrderForUpdate(this.data, item, item.size, item.name, item.pricing.quantity)
        })
        .catch(error => {
            this.emit('cart-item-not-found', {error: 'cart item not found'})
        })
        await this.fileRead(`carts/users/${this.data._id}.json`)
        .then(response => {
            this.emit('order-updated', JSON.parse(response))
        })
        .catch(error =>{
            this.emit('cart-item-not-found', {error: 'cart item not found'})
        })
    }

     /**
     * @name onUpdateCartItem
     * @function
     * 
     * @description checks verifies order cart item and updates (or edits)  it
     * @return does not return anything
     * 
     */
    async onUpdateCartItem() {
        if (await this.authCheck()) {
            try {
                if (this.checkCartItemBeforeUpdate()) {
                    this.updateCartItem()
                } else {
                 this.emit('error-updating-item', {error: 'Error updating cart item'})
                }
            } catch (e) {
                this.emit('order-was-not-found', {error: 'This order was not found'})
            }
        } else {
            this.emit('unauthorized', {error: 'unauthorized'})
        }
    }

      /**
     * @name removeCartItemFromUserCart
     * @function
     * 
     * @param {Object} user the customer or user
     * 
     * @description removes (or deletes) an item from the customer's or user's cart
     * @return does not return anything
     * 
     */
    async removeCartItemFromUserCart(user) {
        if (user.cart.length > 0) {
            const updatedCart = user.cart.filter(orderId => orderId !== this.data._id)
            const uUser = user
            uUser.cart = updatedCart
            await this.fileUpdate(`users/${user.phone}.json`, uUser)
        } else {
            console.log('cart have been empty')
        }
        this.fn(200, {
            message: 'Order removed.'
        })
    }
    
    /**
     * @name removeCartItemFromUserCart
     * @function
     * 
     * @param {Object} user the authenticated customer or user
     * 
     * @description removes (or deletes) an item from the authenticated customer's or user's cart
     * @return does not return anything
     * 
     */
    async onRemoveItemFromUserCart() {
    
        if (await this.authCheck()) {
            try {

                await this.fileDelete(`carts/users/${this.data._id}.json`)
                const user = await this.auth()
                this.removeCartItemFromUserCart(user)
               
            } catch (error) {
                this.fn(200, {
                    error: 'Cart is now empty'
                })
            }
        } else {
            this.fn(200, {
                error: 'Unauthorized'
            })
        }
    }

    /**
     * @name userCartItems
     * @function
     * 
     * @param {Object} user the authenticated customer or user
     * @param {Function} fn the callback function
     * 
     * @description sets (or gathers) all items from the customer's or user's cart
     * @return {Function} the callback function with all the items in the customer's or user's cart
     * 
     */
    async userCartItems(user, fn) {
        this.counter = 0
        let cartItem, cartItems = []
        if (user.cart && user.cart.length) {
            for (let item of user.cart) {
                cartItem = await this.fileRead(`carts/users/${item}.json`).then(JSON.parse)
                cartItems.push(cartItem)
                this.counter += 1
                if (this.counter === user.cart.length) {
                    break;
                }
            }
        }
        return fn(200, {
            items: cartItems
        })
    }

     /**
     * @name getUserCartItems
     * @function
     * 
     * @param {Function} fn the callback function
     * 
     * @description gets (or gathers) all items from the customer's or user's cart
     * @return does not return anything
     * 
     */

    async getUserCartItems(fn) {
        this.userCartItems(await this.auth(), fn)
    }

    /**
     * @name onGetUserCartItems
     * @function
     * 
     * @param {Function} fn the callback function
     * 
     * @description gets (or gathers) all items from the authenticated customer's or user's cart
     * @return does not return anything
     * 
     */

    async onGetUserCartItems(fn) {
        if (await this.authCheck()) {
            this.getUserCartItems(fn)

        } else {
            return fn(200, {
                error: 'Unauthorized'
            })
        }
    }

    /**
     * @name onPrepareAuthCart
     * @function
     * 
     * 
     * @description prepares the authenticated customer's or user's cart for processing
     * @return does not return anything
     * 
     */
    async onPrepareAuthCart() {
        if (await this.checkCartItem()) {
            await this.prepareAuthCart()
        } else {
            this.fn(200, {
                error: 'Unauthorized'
            })
        }
    }

     /**
     * @name onGetUserOrder
     * @function
     * 
     * 
     * @description gets (or gathers) all order for the authenticated customer or user
     *  @return {Function} the callback function with all the orders for the authenticated customer or user
     * 
     */
    async onGetUserOrder() {
        if (await this.authCheck()) {
            try {
                const order = await this.fileRead(`orders/${this.data._id}.json`).then(JSON.parse)
                if (!order) return
                this.fn(200, order)
            } catch (error) {
                this.fn(200, {
                    error: 'no such order could be found'
                })
            }
        } else {
            this.fn(200, {
                error: 'Unauthorized'
            })
        }
    }

     /**
     * @name onCustomerContact
     * @function
     * 
     * 
     * @description sends contact us reply email to customer or user and sends him/her an sms notification
     * @return {Function} the callback function with the success message upon successfull email and sms send
     * 
     */
    async onCustomerContact() {
        if (!this.data) return
        if (!this.data.payload) return
        if (!this.data.payload.firstname) return
        if (!this.data.payload.lastname) return
        if (!this.data.payload.email) return
        if (!this.data.payload.phone) return
        if (!this.data.payload.subject) return
        if (!this.data.payload.message) return
        // handler error
        this.on('invalid', message => {
            this.errors = []
            this.errors.push(message)
        })
        // validate input data
        this.validateInputData(this.data)

        const date = new Date();
        // const dateContacted = `${date.toDateString()} ${date.toLocaleTimeString()}`
        const contact = {}
        contact.contact = {}
        contact.contact = this.data.payload
        contact.contact.date = `${date.toDateString()} ${date.toLocaleTimeString()}`
        new Mail(contact).email()
        new SMS(contact).text()

        return this.fn(200,{success: 'Message Sent!'})

    }
}

// Export OrdersControllerUtils
module.exports = OrdersControllerUtils
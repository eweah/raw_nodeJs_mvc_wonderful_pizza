'use strict'

const {
    createReadStream,
    promises
} = require('fs')
const path = require('path')
const util = require('util')

const CLI = require('..')



class OrderCommand extends CLI {

    constructor() {
        super()
        this.autobind(OrderCommand)
        this.autoinvoker(OrderCommand)
    }

    autobinder(className = {}) {
        for (let method of Object.getOwnPropertyNames(className.prototype)) {
            if (typeof (this[method]) === 'function' && method !== 'constructor') {
                this[method] = this[method].bind(this)
            }
        }
    }
    autobind(className = {}) {
        this.autobinder = this.autobinder.bind(this)
        this.autobinder(className)
    }
    autoinvoker(className = {}) {
        for (let method of Object.getOwnPropertyNames(className.prototype)) {
            this.autoinvoked().forEach(name => {
                if(method === name){
                    this[method]()
                }
            })
        }
    }
    autoinvoked(){
        return ['init', 'commands', 'login', 'common', 'notACommand']
    }
    
    init() {
        console.log('\x1b[34m%s\x1b[0m', 'cli is running')
        console.log('')
        this._interface.prompt()
        this._interface.on('line', string => {
            this.input(string)
            this._interface.prompt()
        })
    }
    base() {
        return path.join(__dirname, '../../resources/storage/.data')
    }
    async findAll(path) {
        return await promises.readdir(`${this.base()}/${path}`);
    }
    hash(string) {
        if (typeof string == 'string' && string.trim().length > 0) {
            const hash = require('crypto').createHmac('sha256', 'HolyMole!IsThisTheHashingSecret?').update(string).digest('hex');
            return hash;
        } else {
            return false;
        }

    };
    login() {
        this.on('login', () => {
            this._interface.question('Phone Number: ', phone => {
                if (phone.trim().length !== 10 || typeof (phone) !== 'string') {
                    console.log('\x1b[31m%s\x1b[0m', 'Invalid phone number!')
                    process.exit(0)
                }
                phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone.toLocaleLowerCase().trim() : false
                if (!phone) {
                    console.log('\x1b[31m%s\x1b[0m', 'admin phone number required')
                    process.exit(0)
                }
                if (phone) {
                    this._interface.question('Password: ', password => {
                        if (typeof (password) !== 'string' || password.trim().length < 8) {
                            console.log('\x1b[31m%s\x1b[0m', 'Invalid password')
                            process.exit(0)
                        }
                        password = typeof (password) === 'string' && password.trim().length >= 8 ? password.trim() : false
                        if (!password) {
                            console.log('\x1b[31m%s\x1b[0m', 'admin phone required')
                            process.exit(0)
                        }
                        if (password) {

                            let path = `${this.base()}/users/${phone}.json`
                            let readable = createReadStream(path, 'utf-8')
                            readable.on('error', error => {
                                return this.emit('error', {
                                    error: 'Unrecognized Phone number'
                                })
                            })
                            readable.on('data', chunk => {
                                let user = JSON.parse(chunk)
                                let hashed = this.hash(password)
                                if (user.password !== hashed) {
                                    return this.emit('error', {
                                        error: 'Incorrect password'
                                    })
                                }
                                if (user.password === hashed) {
                                    this.emit('success', {
                                        message: 'You are logged in!'
                                    })
                                    console.clear()
                                    delete user.aToken
                                    delete user.password
                                    console.log()
                                    //  console.log(user)
                                    this.auth = true
                                    let centered = `${user.firstname} ${user.lastname}`
                                    this.horizontalLine()
                                    this.centered(`\x1b[32m${centered}\x1b[0m`)
                                    this.horizontalLine()
                                    this.verticalSpace(2)

                                    // Show each command followed by its explanation in white and yellow respectively

                                    for (let key in user) {
                                        if (user.hasOwnProperty(key)) {
                                            let value = `\x1b[33m${user[key]}\x1b[0m`
                                            let line = `\x1b[36m${key}\x1b[0m`
                                            let padding = 60 - line.length
                                            for (let i = 0; i < padding; i++) {
                                                line += ' '
                                            }
                                            line += value
                                            console.log(line)
                                            this.verticalSpace(1)
                                        }
                                    }
                                    this.horizontalLine()
                                    this._interface.prompt()

                                }
                            })

                        }

                    })
                }

            })
        })


    }
    common() {
        this.on('clear', () => {
            console.clear()
        })
        this.on('exit', () => {
            process.exit(0)
        })
        this.on('leave', () => {
            process.exit(0)
        })
        this.on('quit', () => {
            process.exit(0)
        })
    }

    notACommand() {
        this.on('command-not-found', data => {
            console.log()
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            console.log()
            this._interface.prompt()
            //process.exit(0)
        })
        this.on('error', data => {
            console.log()
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            console.log()
            this._interface.prompt()
            // process.exit(0)
        })
        this.on('success', data => {
            console.log(`\x1b[36m${data.message}\x1b[0m`)
        })

    }

    onProducts() {
        this.once('order-products', products => {
            let options = {
                string: 'PRODUCTS IN THIS ORDER',
                number: process.stdout.columns,
                color: 36
            }
            console.log()
            this.padding(options)
            console.table(products)
        })
    }
    onNumber() {
        this.once('order-number', ordernumber => {
            let options = {
                string: 'ORDER NUMBER',
                number: process.stdout.columns,
                color: 36
            }
            console.log()
            this.padding(options)
            console.table(ordernumber)
           
           
        })
    }
    onCard() {
        this.once('order-card', ordercard => {
            let options = {
                string: 'CREDIT CARD DETAILS',
                number: process.stdout.columns,
                color: 36
            }
         
            console.log()
            this.padding(options)
            console.table(ordercard)
        })
    }
    onGuestCustomer() {
        this.once('order-guest-customer', customer => {
            let options = {
                string: `GUEST CUSTOMER'S SHIPPING DETAILS`,
                number: process.stdout.columns,
                color: 36
            }
            console.log()
            this.padding(options)
            console.table([customer])
        })
    }

    onGuestBilling() {
        this.once('order-guest-billing', billing => {
            console.log()
            let options = {
                string: `GUEST CUSTOMER'S BILLING ADDRESS`,
                number: process.stdout.columns,
                color: 36
            }
            console.log()
            this.padding(options)
            console.table([billing])
        })
    }
    onAuthCustomer() {
        this.once('order-auth-customer', customer => {
            let options = {
                string: `REGISTERED CUSTOMER'S SHIPPING DETAILS`,
                number: process.stdout.columns,
                color: 36
            }
            console.log()
            this.padding(options)
            console.table([customer])
            
        })
    }
    onAuthBilling() {
        this.once('order-auth-billing', billing => {
            let options = {
                string: `REGISTERED CUSTOMER'S BILLING ADDRESS`,
                number: process.stdout.columns,
                color: 36
            }
            console.log()
            this.padding(options)
            console.table([billing])
        })
    }
    onShipping() {
        this.once('shipping-found', data => {
            let billing = data.guest ? `GUEST CUSTOMER'S BILLING ADDRESS` : `REGISTERED CUSTOMER'S BILLING ADDRESS`
            let shipping = data.guest ? `GUEST CUSTOMER'S SHIPPING DETAILS` : `REGISTERED CUSTOMER'S SHIPPING DETAILS`

            let bill = {
                string: billing,
                number: process.stdout.columns,
                color: 36
            }
            let ship = {
                string: shipping,
                number: process.stdout.columns,
                color: 36
            }
      
            this.padding(bill)
            console.table([data.billing])
            this.padding(ship)
            console.table([data.customer])
     
            return
        })
        this._interface.prompt()
    }
    onPCNS() {
        this.onNumber()
        this.onProducts()
        this.onCard()
        this.onGuestCustomer()
        this.onGuestBilling()
        this.onAuthCustomer()
        this.onAuthBilling()
        this._interface.prompt()
    }
    onPs() {
        this.onProducts()
        this.onGuestCustomer()
        this.onGuestBilling()
        this.onAuthCustomer()
        this.onAuthBilling()
        this._interface.prompt()
    }
    onPc() {
        this.onProducts()
        this.onCard()
        this._interface.prompt()
    }
    onPn() {
        this.onNumber()
        this.onProducts()
        this._interface.prompt()
       
    }
    onCN() {
        this.onCard()
        this.onNumber()
        this._interface.prompt()
    }
    onCS() {
        this.onCard()
        this.onGuestCustomer()
        this.onGuestBilling()
        this.onAuthCustomer()
        this.onAuthBilling()
        this._interface.prompt()
    }
    onNS(){
        this.onNumber()
        this.onShipping()
        this._interface.prompt()
    }
    onCNPS(){
        this.onNumber()
        this.onCard()
        this.onProducts()
        this.onShipping()
        this._interface.prompt()
    }
    onCNP(){
        this.onNumber()
        this.onCard()
        this.onProducts()
        this._interface.prompt()
    }
    onNPS(){
        this.onNumber()
        this.onProducts()
        this.onShipping()
        this._interface.prompt()
    }
    onpcn(){
        this.onNumber()
        this.onProducts()
        this.onCard()
        this._interface.prompt()
    }
    onPcn(){
        this.onNumber()
        this.onProducts()
        this.onCard()
        this._interface.prompt()
    }
    onPcs(){
        this.onProducts()
        this.onCard()
        this.onShipping()
        this._interface.prompt()
    }
    onPns(){
        this.onNumber()
        this.onProducts()
        this.onShipping()
        this._interface.prompt()
    }
    oncp(){
        this.onProducts()
        this.onCard()
        this._interface.prompt()
    }
    onnp(){
        this.onNumber()
        this.onProducts()
        this._interface.prompt()
    }
    onps(){
        this.onProducts()
        this.onShipping()
        this._interface.prompt()
    }
    Pc(option){
       return option === 'Pc' || option === 'Pcard'
    }
    Pn(option){
        return option === 'Pn' || option === 'Pnumber'
    }
    Ps(option){
        return option === 'Ps' ||  option === 'Pshipping'
    }
    ps(option){
        return option === 'productss' ||  option === 'productsshipping'
    }
    cn(option){
        return option === 'cn' || option === 'cnumber' || option === 'cardn' || option === 'cardnumber'
    }
    cs(option){
        return option === 'cs' || option === 'cshipping' || option === 'cards' || option === 'cardshipping'
    }
    cp(option){
        return option === 'cproducts' || option === 'cardproducts' 
    }
    ns(option){
        return option === 'ns' || option === 'nshipping' || option === 'numbers' || option === 'numbershipping'
    }
    np(option){
        return option === 'nproducts' || option === 'numberproducts'
    }
    cns(option){
        return option === 'cns' || option === 'cnumbers' || option === 'cnshipping' || option === 'cardns' ||option === 'cardnumbers' || option === 'cardnumbershipping' || option === 'cardnshipping'
    }
    cnps(option){
        return option === 'cnproductss' || option === 'cnumberproductss' || option === 'cardnproductsshipping' || option ==='cardnumberproductsshipping' 
    }
    cnp(option){
        return option === 'cnproducts' || option === 'cnumberproducts' || option === 'cardnumberproducts' || option === 'cardnproducts' 
    }
    nps(option){
        return option === 'nproductss' || option === 'numberproductss' || option === 'numberproductsshipping' 
    }
    n(option){
        return option === 'n' || option === 'number'
    }
    c(option){
        return option === 'c' || option === 'card'
    }
    s(option){
        return option === 's' || option === 'shipping'
    }
    p(option){
        return option === 'P' || option === 'products'
    }
    pcns(option){
        return option === 'Pcns'|| option === 'Pcardns' || option === 'Pcardnumbers' || option === 'Pcardnumbershipping'||option === 'productscardnumbershipping'
    }
    pcn(option){
        return option === 'productscn'|| option === 'productscardn' || option === 'productscnumber' || option === 'productscardnumber'
    }
    Pcn(option){
        return option === 'Pcn'|| option === 'Pcardn' || option === 'Pcnumber' || option === 'Pcardnumber'
    }
    Pcs(option){
        return option === 'Pcs'|| option === 'Pcards' || option === 'Pcshipping' || option ==='Pcardshipping'
    }
    Pns(option){
        return option === 'Pns'|| option === 'Pnumbers' || option === 'Pnshipping' || option ==='Pnumbershipping'
    }

    processOptions(option) {
        console.log('option', option)
        if (this.p(option)) {
            this.onProducts()
        } else if (this.n(option)) {
            this.onNumber()
        } else if (this.c(option)) {
            this.onCard()
        } else if (this.s(option)) {
            this.onShipping()
        } else if (this.Pc(option)) {
            this.onPc()
        } else if (this.Pn(option)) {
            this.onPn()
        } else if (this.Ps(option)) {
            this.onPs()
        } else if (this.cn(option)) {
            this.onCN()
        } else if (this.cs(option)) {
            this.onCS()
        } else if (this.cns(option)) {
            this.onCS()
        }else if(this.ns(option)){
            this.onNS()
        }else if(this.cnps(option)){
            this.onCNPS()
        }else if(this.cnp(option)){
            this.onCNP()
        }else if(this.nps(option)){
            this.onNPS()
        }else if(this.pcn(option)){
            this.onpcn()
        }else if(this.Pcn(option)){
            this.onPcn()
        }else if(this.Pcs(option)){
            this.onPcs()
        }else if(this.Pns(option)){
            this.onPns()
        }else if(this.cp(option)){
            this.oncp()
        } else if(this.np(option)){
            this.onnp()
        }else if(this.ps(option)){
            this.onps()
        }
         else if (this.pcns(option)) {
            // Number
            this.onPCNS()
        } else {
            this.emit('command-not-found', {
                error: 'Invalid options'
            })
        }
    }
    // guestShipping(order){
    //     this.findAll('guestshippings').then(shippings => {

    //         for (let shipping of shippings) {
    //             let shippingpath = `${this.base()}/guestshippings/${shipping}`
    //             let shippingreadable = createReadStream(shippingpath, 'utf-8')
    //             let customer = {}
    //             let billing = {}
    //             shippingreadable
    //                 .on('data', chunck => {
    //                     let ship = JSON.parse(chunck)
    //                     if (ship.cart && ship.cart.length > 0) {
    //                         let ordershipping = ship.cart.find(orderId => orderId === order.id)
    //                         if (ordershipping && ordershipping !== undefined) {
    //                             console.log()

    //                             billing.address = ship.billing.billing_address
    //                             billing.city = ship.billing.billing_city
    //                             billing.state = ship.billing.billing_state
    //                             billing.zip = ship.billing.billing_zip
    //                             billing.phone = ship.billing.billing_phone

    //                             customer.firstname = ship.firstname
    //                             customer.lastname = ship.lastname
    //                             customer.address = ship.address
    //                             customer.city = ship.city
    //                             customer.state = ship.state
    //                             customer.zip = ship.zip
    //                             //customer.email = ship.email
    //                             customer.phone = ship.phone
    //                         }
    //                     }
    //                 })
    //                 .on('error', () => {
    //                     this.emit('error', {
    //                         error: `Could not find shipping with phone number ${shipping}`
    //                     })
    //                 })
    //                 .on('end', () => {
    //                     this.emit('order-guest-billing', billing)
    //                     this.emit('order-guest-customer', customer)
                        
    //                 })
    //         }
    //     })
    //     .catch(error => {

    //     })
    // }
    // authShipping(order){
    //     this.findAll('shippings').then(authshippings => {
    //         for (let shipping of authshippings) {

    //             let shippingpath = `${this.base()}/shippings/${shipping}`
    //             let shippingreadable = createReadStream(shippingpath, 'utf-8')
    //             let customer = {}
    //             let billing = {}
    //             shippingreadable
    //                 .on('data', chunck => {
    //                     let ship = JSON.parse(chunck)
    //                     if (ship.cart && ship.cart.length > 0) {
    //                         let ordershipping = ship.cart.find(orderId => orderId === order.id)
    //                         if (ordershipping && ordershipping !== undefined) {
    //                             console.log()
    //                             billing.address = ship.billing.billing_address
    //                             billing.city = ship.billing.billing_city
    //                             billing.state = ship.billing.billing_state
    //                             billing.zip = ship.billing.billing_zip
    //                             billing.phone = ship.billing.billing_phone
    //                             customer.firstname = ship.firstname
    //                             customer.lastname = ship.lastname
    //                             customer.address = ship.address
    //                             customer.city = ship.city
    //                             customer.state = ship.state
    //                             customer.zip = ship.zip
    //                             //customer.email = ship.email
    //                             customer.phone = ship.phone
    //                             //return
    //                         }
    //                     }
    //                 })
    //                 .on('error', () => {
    //                     this.emit('error', {
    //                         error: `Could not find shipping with phone number ${shipping}`
    //                     })
    //                 })
    //                 .on('end', () => {
    //                     this.emit('order-auth-billing', billing)
    //                     this.emit('order-auth-customer', customer)
                        
    //                 })
    //         }

    //     })
    //     .catch(error => {

    //     })
    // }
    getorder(orderId){
        let path = `${this.base()}/orders/${orderId}.json`
        let readable = createReadStream(path, 'utf-8')
        let order = {}
        readable.on('error', error => {
            return this.emit('error', {error: `Order with id ${orderId} does not exists.`})
        })
         readable.on('data', chunk => {
             order = JSON.parse(chunk)
         })
         readable.on('end', () => {
           return  this.emit('order-found', {order})
         })

    }
    getshipping(){
        
        this.once('order-found', orderdata => {
            //console.log(data.order)
            let path = orderdata.order.guest ? `guestshippings` : `shippings`
           
            let data = {}
            let billing = {}
            let customer = {}
            data.guest = orderdata.order.guest
            this.findAll(path).then(shippings => {
              for(let shipping of shippings){
                let shippinpath = `${this.base()}/${path}/${shipping}`
                let readable = createReadStream(shippinpath, 'utf-8')
                readable.on('error', error => {
                    return this.emit('error', {error: `Shipping with id ${shipping} does not exist`})
                })
                readable.once('data', chunk => {
                    let ship = JSON.parse(chunk)
                    if (ship.cart && ship.cart.length > 0) {
                        let ordershipping = ship.cart.find(orderId => orderId === orderdata.order.id)
                        if (ordershipping && ordershipping !== undefined) {
                        
                            billing.address = ship.billing.billing_address
                            billing.city = ship.billing.billing_city
                            billing.state = ship.billing.billing_state
                            billing.zip = ship.billing.billing_zip
                            billing.phone = ship.billing.billing_phone

                            customer.firstname = ship.firstname
                            customer.lastname = ship.lastname
                            customer.address = ship.address
                            customer.city = ship.city
                            customer.state = ship.state
                            customer.zip = ship.zip
                            customer.email = ship.email
                            ///customer.phone = ship.phone

                            data.billing = billing 
                            data.customer = customer
                            
                        
                        }
                    }
                }).on('end', () => {
                   return this.emit('shipping-found', data)
                })
              }
            })
            .catch(error => {
                return this.emit('error', {error: error})
            })
        })

       

    }
    commandHandler(orderId, option) {
        // let authPath = `${this.base()}/orders/${orderId}.json`
        // let authReadable = createReadStream(authPath, 'utf-8')
        // event variables 
        this.getshipping()
        this.getorder(orderId)
        this.once('order-found', orderdata => {
            // console.log('order in com', order)
            let orderproducts = []
            let ordernumber = []
            let ordercard = {}

            if (orderdata.order.products && orderdata.order.products.length > 0) {
                for (let product of orderdata.order.products) {
                    let prod = {}
                    prod['pizza type'] = product.name.toUpperCase()
                    prod.size = product.size
                    prod['unit price'] = product.pricing.price
                    prod.quantity = product.pricing.quantity
                    prod['total price'] = product.pricing.total
                    orderproducts.push(prod)
                }
            }
            // Order number 
          
            let time = this.elapsed(new Date(orderdata.order.created_at), new Date())
        
            let days = time.days
            let hours = time.hours
            let minutes = time.minutes
            let seconds = time.seconds

            // let message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} and ${seconds} ${this.pluralize('second', seconds)} ago.`
            let message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ago.`
      
            ordernumber['DETAILS'] = []
            ordernumber['DETAILS']['\x1b[37mORDER#\x1b[0m'] = orderdata.order.number
            ordernumber['DETAILS']['DATE'] = orderdata.order.created_at
            ordernumber['DETAILS']['AS OF NOW'] = message
    
            // Order card
            delete orderdata.order.card.tosAgrement
            orderdata.order.card['agreed to pay?'] = 'yes'
            ordercard['0'] = orderdata.order.card

            this.emit('order-number', ordernumber)
            this.emit('order-products', orderproducts)
            this.emit('order-card', ordercard)
            this.processOptions(option)
        })

      


        // authReadable.on('error', error => {
        //     this.emit('error', {
        //         error: `could not find order with id: ${orderId}`
        //     })
        // })
        // authReadable.on('data', chunk => {
        //     order = JSON.parse(chunk)
        //     // Shipping

        //     // if (order.guest) {
        //     //     this.guestShipping(order)
        //     // }
        //     // if (order.guest === false) {
        //     //     this.authShipping(order)
        //     // }
        //     this.getshipping(order.id)
        //     // Order Products
        //     if (order.products && order.products.length > 0) {
        //         for (let product of order.products) {
        //             let prod = {}
        //             prod['pizza type'] = product.name.toUpperCase()
        //             prod.size = product.size
        //             prod['unit price'] = product.pricing.price
        //             prod.quantity = product.pricing.quantity
        //             prod['total price'] = product.pricing.total
        //             orderproducts.push(prod)
        //         }
        //     }
        //     // Order number 
          
        //     let time = this.elapsed(new Date(order.created_at), new Date())
        
        //     let days = time.days
        //     let hours = time.hours
        //     let minutes = time.minutes
        //     let seconds = time.seconds

        //     // let message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} and ${seconds} ${this.pluralize('second', seconds)} ago.`
        //     let message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ago.`
      
        //     ordernumber['DETAILS'] = []
        //     ordernumber['DETAILS']['\x1b[37mORDER#\x1b[0m'] = order.number
        //     ordernumber['DETAILS']['DATE'] = order.created_at
        //     ordernumber['DETAILS']['AS OF NOW'] = message
    
        //     // Order card
        //     delete order.card.tosAgrement
        //     order.card['agreed to pay?'] = 'yes'
        //     ordercard['0'] = order.card
        // })
        // authReadable.on('end', () => {
        //     this.emit('order-number', ordernumber)
        //     this.emit('order-products', orderproducts)
        //     this.emit('order-card', ordercard)
        // })
    
       this.processOptions(option)
    }
    spliter(str, spl) {
        if(str === undefined || spl === undefined) return []
        return str.split(spl).filter(string => string !='').map(st => st.trim())
    }
    singles(string, args) {
        const option = this.spliter(string, 'orders')
        if(!option || option.length === 0) return 
        let idandoption = this.spliter(option[0], args)
        let details = this.spliter(idandoption[0], ' ')
        let orderId = details[0]

        let options = []
        for (let i = 1; i < details.length; i++) {
            options.push(details[i])
        }
        if(options.length === 0){
            this.getorder(orderId)
        }
        this.once('order-found', order => {
            // console.clear()
            // console.log(util.inspect(order,{showHidden: true, depth: Infinity, colors: true}))
            // this._interface.prompt()
            
            return
        })
        // console.log('options', options)
        if (details[0] === undefined || !details[0].trim() || details[0].trim() === undefined) {
            return this.emit('error', {
                error: 'Order id is required'
            })
        }
        if (details[0].trim().length !== 30 || typeof (details[0].trim()) !== 'string') {
            return this.emit('error', {
                error: `${details} is not a valid order id`
            })
        }

        if (details[0].trim() !== undefined && details[0].trim().length === 30 && typeof (details[0].trim()) === 'string') {
            if (options.sort().length > 4) {
                return this.emit('error', {
                    error: 'invalid numbers of options or arguments'
                })
            } else {
                for (let opt of options.sort()) {
                    if (!this.orderOptions().includes(opt)) {
                        return this.emit('error', {
                            error: `"${opt}" is not an option`
                        })

                    } else {
                        let code = this.spliter(options.join('-'), '-').sort().join('')
                        return this.commandHandler(orderId, code)
                    }
                }
            }
        }

    }
    commands() {
        this.on('orders', async string => {
            this.singles(string, '-g -i')          
        })
    }


}

module.exports = OrderCommand
new OrderCommand()
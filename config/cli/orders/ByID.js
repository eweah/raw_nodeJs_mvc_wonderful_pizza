'use strict'
const Orders = require('./')
const {createReadStream,promises} = require('fs')
const path = require('path')
const util = require('util')

class ByID extends Orders{
    constructor(){
        super()
        this.autobind(ByID)
        this.autoinvoker(ByID)
        this.setMaxListeners(Infinity)
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
        this.once('order-products-json', (products, jsonned) => {
            this.infos(products, jsonned.depth)
        })
        this.removeDuplicateListeners('order-products')
        this.removeDuplicateListeners('order-products-json')
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
        this.once('order-number-json', (number, jsonned) => {
            this.infos(number, jsonned.depth)
        })
        this.removeDuplicateListeners('order-number')
        this.removeDuplicateListeners('order-number-json')
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
        this.once('order-card-json', (card, jsonned) => {
            this.infos(card, jsonned.depth)
        })
        this.removeDuplicateListeners('order-card')
        this.removeDuplicateListeners('order-card-json')
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
      
            console.log()
            this.padding(bill)
            console.table(data.billing)
            console.log()
            this.padding(ship)
            console.table(data.customer)
     
            return
        })
        this.once('shipping-found-json', (shipping, jsonned) => {
            this.infos(shipping, jsonned.depth)
        })
        this.removeDuplicateListeners('shipping-found')
        this.removeDuplicateListeners('shipping-found-json')
        this.prompt()
    }
    onPCNS() {
        console.log()
        this.onNumber()
        this.onProducts()
        this.onCard()
        this.onShipping()
        this.prompt()
    }
    onPs() {
        console.log()
        this.onProducts()
        this.onShipping()
        this.prompt()
    }
    onPc() {
        console.log()
        this.onProducts()
        this.onCard()
        this.prompt()
    }
    onPn() {
        console.log()
        this.onNumber()
        this.onProducts()
        this.prompt()
       
    }
    oncn() {
        console.log()
        this.onCard()
        this.onNumber()
        this.prompt()
    }
    oncs() {
        console.log()
        this.onCard()
        this.onShipping()
        this.prompt()
    }
    oncns() {
        console.log()
        this.onCard()
        this.onNumber()
        this.onShipping()
        this.prompt()
    }
    onNS(){
        console.log()
        this.onNumber()
        this.onShipping()
        this.prompt()
    }
    onCNPS(){
        console.log()
        this.onNumber()
        this.onCard()
        this.onProducts()
        this.onShipping()
        this.prompt()
    }
    onCNP(){
        console.log()
        this.onNumber()
        this.onCard()
        this.onProducts()
        this.prompt()
    }
    onNPS(){
        console.log()
        this.onNumber()
        this.onProducts()
        this.onShipping()
        this.prompt()
    }
    onpcn(){
        console.log()
        this.onNumber()
        this.onProducts()
        this.onCard()
        this.prompt()
    }
    onPcn(){
        console.log()
        this.onNumber()
        this.onProducts()
        this.onCard()
        this.prompt()
    }
    onPcs(){
        console.log()
        this.onProducts()
        this.onCard()
        this.onShipping()
        this.prompt()
    }
    onPns(){
        console.log()
        this.onNumber()
        this.onProducts()
        this.onShipping()
        this.prompt()
    }
    oncp(){
        console.log()
        this.onProducts()
        this.onCard()
        this.prompt()
    }
    onnp(){
        console.log()
        this.onNumber()
        this.onProducts()
        this.prompt()
    }
    onps(){
        console.log()
        this.onProducts()
        this.onShipping()
        this.prompt()
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
            this.oncn()
        } else if (this.cs(option)) {
            this.oncs()
        } else if (this.cns(option)) {
            this.oncns()
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
            console.log('command not found', option)
            this.emit('command-not-found', {
                error: 'Invalid options'
            })
        }
    }
    async getOrderByID(string, args) {
        const option = this.spliter(string, 'orders')
        if(!option || option.length === 0) return
        let idandoption = this.spliter(option[0], args)
        let jsonned, json, depth, jscodes, jscode, jschecker, jscheckers, orderOptionsCodes, depthchecker


        if (idandoption === undefined || idandoption.length === 0 ) {
            return
            // return this.emit('orders:error', {
            //     error: `orders ${args} requires an argument (a phone number)`
            // })
        }

        //  if (idandoption[0].trim().length !== 30 || typeof(idandoption[0].trim()) !== 'string') {
        //     return this.emit('orders:error', {
        //         error: `'${idandoption[0]}' is not a valid argument for 'orders ${args}' `
        //     })
        // }
        let details = this.spliter(idandoption[0], ' ')
        let orderId = details[0]

        let options = []
        for (let i = 1; i < details.length; i++) {
            options.push(details[i])
        }
    
        if (details[0] === undefined || !details[0].trim() || details[0].trim() === undefined) {
            return this.emit('orders:error', {
                error: 'Order id is required'
            })
        }
        if (details[0].trim().length !== 30 || typeof (details[0].trim()) !== 'string') {
            return this.emit('orders:error', {
                error: `'${details[0]}' is not a valid order id`
            })
         
        }
         
        if (details[0].trim() !== undefined && details[0].trim().length === 30 && typeof (details[0].trim()) === 'string') {
    
            let path = `${this.base()}/orders/${orderId}.json`
            let readable = createReadStream(path, 'utf-8')
            let order = {}

            readable.on('error', error => {
                return this.emit('orders:error', {error: `Order with id ${orderId} does not exists.`})
            })
             readable.on('data', chunk => {
                 order = JSON.parse(chunk)
             })
             readable.on('end', async () => {
// orders --get --id=6vb08ZMwaEgOMXvbkYnwW6AvA7Tgf8 -P -c -n -s --json --depth=0
                if (options.sort().length > 7) {
                    
                    return this.emit('orders:error', {
                        error: 'invalid numbers of options or arguments'
                    })
                }else if(options.sort().length === 0){
                    // works
                    console.log(util.inspect(order, {showHidden:true, depth:Infinity, colors:true}))
                    return 
                }else if(options.sort().length > 0 && options.sort().length <= 7){

                    orderOptionsCodes = options.filter(val => this.orderOptions().includes(val))
                    jscodes = options.filter(val => !this.orderOptions().includes(val))
                   
                     if(orderOptionsCodes.length > 4){
                        return this.emit('orders:error', {
                            error: `"${orderOptionsCodes.join(' ')}" is not an option `
                        })
                     }
                     if(jscodes.length > 3){
                        return this.emit('orders:error', {
                            error: `"${jscodes.join(' ')}" is not an option `
                        })
                     }
                   
                     if(options.length !== (orderOptionsCodes.length + jscodes.length)){
                        return this.emit('orders:error', {
                            error: `"${options.join(' ')}" is not an option`
                        })
                     }

                    if(jscodes.length > 0){
                        if(jscodes.length === 1){
                          if(jscodes[0] === '-j' || jscodes[0] === '--json'){
                              jsonned = {json: jscodes[0], depth: Infinity}
                          }else{
                            return this.emit('orders:error', {
                                error: `"${jscodes.join(' ')}" is not an option  ...`
                            })
                          }
                        }
                        if(jscodes.length === 2){
                            let equal = jscodes.filter(str => str.includes('='))
                            let noequal = jscodes.filter(str => !str.includes('='))
                            if(equal.length === 1){
                                if(noequal.length !== 1){
                                    return this.emit('orders:error', {
                                        error: `"${jscodes.join(' ')}" is not an option ,,.`
                                    })
                                }
                                if(noequal.length === 1){

                                 jscode = this.spliter(equal[0], '=')[0]
                                 depthchecker = this.spliter(equal[0], '=')[1]
                               
                                 if(this.jsonEventList().find(val => val === `${noequal} ${jscode}=`) !== undefined){
                                     if(this.isValid(this.regexes().jsonregex, depthchecker) === true){
                                         jsonned = {json: `${noequal} ${jscode}=`, depth: depthchecker}
                                     }else{
                                        return this.emit('orders:error', {
                                            error: `"${depthchecker}" must a positive number`
                                        })
                                     }
                                 }else{
                                    return this.emit('orders:error', {
                                        error: `"${jscodes}" is not an option .sds`
                                    })
                                 }
                                }else{
                                    return this.emit('orders:error', {
                                        error: `"${noequal.join(' ')}" is not an option ..`
                                    })
                                }
                            }else if(equal.length === 0){
                                console.log('no equal length is zero')
                                console.log('jscodes:', jscodes)
                            }
                        }
                        if(jscodes.length === 3){
                            depthchecker = jscodes.find(val => this.isValid(this.regexes().jsonregex, val))
                            jschecker = jscodes.filter(val => !this.isValid(this.regexes().jsonregex, val))
                          
                             let codeopt1 = `${jschecker[0]} ${jschecker[1]}`
                             let codeopt2 = `${jschecker[1]} ${jschecker[0]}`
                           
                             if(this.jsonEventList().find(val => val === codeopt1) !== undefined){
                                 jsonned = {json: codeopt1, depth: depthchecker}
                             }else{
                                jsonned = {json: codeopt2, depth: depthchecker}
                             }
                        }
                    }
                    
                    if(orderOptionsCodes.length === 0 && jsonned !== undefined && jsonned.json !== undefined && jsonned.depth !== undefined){
                        this.ongetorderbyid(orderId, 'single-order-found')
                        this.once('single-order-found', order => {
                            this.infos({'ORDER': order.order}, jsonned.depth)
                        })
                        this.removeDuplicateListeners('single-order-found')

                    }
                    // orders --get --id=6vb08ZMwaEgOMXvbkYnwW6AvA7Tgf8 -P -c -n -s --json -d 0
                   

                    for (let opt of orderOptionsCodes.sort()) {
                    
                        if (!this.orderOptions().includes(opt)) {
                            return this.emit('orders:error', {
                                error: `"${opt}" is not an option`
                            })
                        } else if(this.orderOptions().includes(opt)){
                            let code = this.spliter(orderOptionsCodes.join('-'), '-').sort().join('')
                            this.processOptions(code)
                            
                            
                            
                            // return this.commandHandler(orderId, code)

                            //Shipping 
                            //console.log(data.order)
                            let path = order.guest ? `guestshippings` : `shippings`

                            let data = {}
                            let jsondata = {}
                            let billing = {}
                            let customer = {}
                            data.guest = order.guest

                            try {
                                let shippings = await this.findAll(path) //.then(shippings => {

                                for (let shipping of shippings) {
                                    let shippinpath = `${this.base()}/${path}/${shipping}`
                                    let readable = createReadStream(shippinpath, 'utf-8')

                                    readable.on('error', error => {
                                        return this.emit('orders:error', {
                                            error: `Shipping with id ${shipping} does not exist`
                                        })
                                    })
                                    readable.on('data', chunk => {
                                        let ship = JSON.parse(chunk)
                                        if (ship.cart && ship.cart.length > 0) {

                                            let ordershipping = ship.cart.find(orderId => orderId === order.id)
                                            if (ordershipping && ordershipping !== undefined) {
                                               
                                                billing['\x1b[35mBILLING\x1b[0m'] = []
                                                billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mADDRESS\x1b[0m`] = ship.billing.billing_address
                                                billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mCITY\x1b[0m`] = ship.billing.billing_city
                                                billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mSTATE\x1b[0m`] = ship.billing.billing_state
                                                billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mZIP\x1b[0m`]= ship.billing.billing_zip
                                                billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mPHONE\x1b[0m`] = ship.billing.billing_phone
                                               

                                                // billing.address = ship.billing.billing_address
                                                // billing.city = ship.billing.billing_city
                                                // billing.state = ship.billing.billing_state
                                                // billing.zip = ship.billing.billing_zip
                                                // billing.phone = ship.billing.billing_phone

                                                customer['\x1b[35mSHIPPING\x1b[0m'] = []
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mFIRST NAME\x1b[0m`] = ship.firstname
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mLAST NAME\x1b[0m`] = ship.lastname
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mADDRESS\x1b[0m`] = ship.address
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mCITY\x1b[0m`]= ship.city
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mSTATE\x1b[0m`] = ship.state
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mZIP\x1b[0m`] = ship.zip
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mEMAIL\x1b[0m`] = ship.email
                                                ///customer.phone = ship.phone

                                                data.billing = billing
                                                data.customer = customer



                                                customer['\x1b[35mSHIPPING\x1b[0m'] = []
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mFIRST NAME\x1b[0m`] = ship.firstname
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mLAST NAME\x1b[0m`] = ship.lastname
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mADDRESS\x1b[0m`] = ship.address
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mCITY\x1b[0m`]= ship.city
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mSTATE\x1b[0m`] = ship.state
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mZIP\x1b[0m`] = ship.zip
                                                customer['\x1b[35mSHIPPING\x1b[0m'][`\x1b[37mEMAIL\x1b[0m`] = ship.email


                                                jsondata.billing = ship.billing
                                                jsondata.customer = {} 
                                                jsondata.customer.firstname = ship.firstname
                                                jsondata.customer.lastname= ship.lastname
                                                jsondata.customer.address = ship.address
                                                jsondata.customer.city = ship.city
                                                jsondata.customer.state = ship.state
                                                jsondata.customer.zip = ship.zip
                                                jsondata.customer.email = ship.email
                                                jsondata.customer.phone = ship.phone

                                            }
                                        }
                                    })
                                    readable.on('end', () => {
                                        // works
                                        
                                     
                                        if(jsonned && jsonned !== undefined && jsonned.json !== undefined && jsonned.depth !== undefined){
                                            this.emit('shipping-found-json', {'ORDER SHIPPING DETAILS': jsondata}, jsonned)
                                        }else{
                                            this.emit('shipping-found', data)
                                        }
                                        
                                    })
                                }

                            } catch (error) {
                                return this.emit('orders:error', {
                                    error: error
                                })
                            }

                          
                            // works
                            //this.once('shipping-found', data => console.log('shipping data', data))
                            //this.onShipping()
                            // Rest 
                            let orderproducts = []
                            let ordernumber = []
                            let ordercard = {}

                            if (order.products && order.products.length > 0) {
                                for (let product of order.products) {
                                    let prod = {}
                                    prod['pizza type'] = product.name.toUpperCase()
                                    prod.size = product.size
                                    prod['unit price'] = product.pricing.price
                                    prod.quantity = product.pricing.quantity
                                    prod['total price'] = product.pricing.total
                                    orderproducts.push(prod)
                                }
                            }
                            let prod ={}
                            for( let product of orderproducts){
                                
                                let name = product['pizza type']
                                let total  = product['total price']
                                let price = product['unit price']
                                prod[`\x1b[35m${name}\x1b[0m`] = []
                                prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mPIZZA TYPE\x1b[0m`] = name
                                prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mSIZE\x1b[0m`] = product.size
                                prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mUNIT PRICE\x1b[0m`] = price
                                prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mQUANTITY\x1b[0m`] = product.quantity
                                prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mTOTAL PRICE\x1b[0m`] = total
                            }
                            orderproducts = prod
                            
                            let time = this.elapsed(new Date(order.created_at), new Date())
                            let message
                            let years = time.years
                            let months = time.months
                            let days = time.days
                            let hours = time.hours
                            let minutes = time.minutes
                            let seconds = time.seconds
                            // console.log(years, months, days, hours, minutes, seconds)
            
                            if (years > 0) {
                                message = `${years} ${this.pluralize('year', years)} ${months} ${this.pluralize('month', months)} ${days} ${this.pluralize('day', days)} ago.`
                            } else if (months > 0) {
                                message = `${months} ${this.pluralize('month', months)} ${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ago.`
                            } else if (days > 0) {
                                message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ago.`
            
                            } else if (hours > 0) {
                                message = `${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ${seconds} ${this.pluralize('second', seconds)} ago.`
                            } else {
                                message = `${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ${seconds} ${this.pluralize('second', seconds)} ago.`
                                //console.log({hours, minutes, seconds})
                            }
            
                            

                            ordernumber['\x1b[35mORDER\x1b[0m'] = []
                            ordernumber['\x1b[35mORDER\x1b[0m']['\x1b[37mORDER#\x1b[0m'] = order.number
                            ordernumber['\x1b[35mORDER\x1b[0m']['\x1b[37mDATE\x1b[0m'] = order.created_at
                            ordernumber['\x1b[35mORDER\x1b[0m']['\x1b[37mAS OF NOW\x1b[0m'] = message

                            // Order card
                            delete order.card.tosAgrement
                            let card = {}
                            card['\x1b[35mCARD\x1b[0m'] = []
                            card['\x1b[35mCARD\x1b[0m']['\x1b[37mNUMBER\x1b[0m'] = order.card.number
                            card['\x1b[35mCARD\x1b[0m']['\x1b[37mEXPIRATION\x1b[0m'] =order.card.type
                            card['\x1b[35mCARD\x1b[0m']['\x1b[37mEXPIRATION\x1b[0m'] = order.card.expiration
                            card['\x1b[35mCARD\x1b[0m']['\x1b[37mCODE\x1b[0m'] = order.card.code
                            card['\x1b[35mCARD\x1b[0m']['\x1b[37mNAME\x1b[0m'] = order.card.name 
                            // card['\x1b[35mCARD\x1b[0m']['\x1b[37mTYPE\x1b[0m'] = order.card.type
                            card['\x1b[35mCARD\x1b[0m']['\x1b[37mAGREE TO PAY?\x1b[0m'] ='Yes' 
                            
                           
                            order.card['agreed to pay?'] = 'yes'
                            ordercard['0'] = order.card
                            
                            if(jsonned && jsonned !== undefined && jsonned.json !== undefined && jsonned.depth !== undefined){
                                let number = {}
                                number.NUMBER = order.number
                                number.DATE = order.created_at
                                number.AS_OF_NOW = message
                                
                                this.emit('order-products-json', {'ORDER PRODUCTS': order.products}, jsonned)
                                this.emit('order-card-json', {'ORDER CARD': order.card},jsonned)
                                this.emit('order-number-json', {'ORDER NUMBER': number}, jsonned)
                            }else{
                                this.emit('order-products', orderproducts)
                                this.emit('order-card', card)
                                this.emit('order-number', ordernumber)
                            }
                    
                            return 
                        }
                        else {
                           console.log('An unknown error occured')
                        }
                    }
                }else{
                    console.log('unkown options length occurred')
                }
             })
        }
    }
   
    // orders load
    j(string) {
        const validate = (regex, input) => regex.test(input)
        const checker = code => this.spliter(string, code)[0]
        const isValid = (regex, code) => validate(regex, checker(code))

        let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
        let mregex = /^[0-5]?[0-9]$/gm
        let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
        let Mregex = /^(1[0-1]|[1-9])$/gm
        let yregex = /^[0-9]?[0-9]$/gm
        let Dregex = /^[0-9]?[0-9]$/gm
        let jsonregex = /^[0-9]?[0-9]$/gm
        
        if (string.trim().startsWith('orders --load -j')) {
            
            if (string.trim() === 'orders --load -j') {
                return this.getOrders(string, '--load -j')
            }

            if (string.trim().match(/orders --load -j -d/)) {
                if (string.trim().length > 'orders --load -j -d'.length) {

                    if (isValid(Dregex, 'orders --load -j -d')) {
                        this.getOrders(string, '--load -j -d')
                    } else {
                        return this.emit('orders:error', {
                            error: `'${checker('orders --load -j -d')}' is not a valid argument for 'orders --load -j -d'! Number of days must be a positive whole number.`
                        })
                    }

                    // year and json

                }
            } else if (string.trim().match(/orders --load -j --depth=/)) {
                if (string.trim().length > 'orders --load -j --depth='.length) {

                    if (isValid(Dregex, 'orders --load -j --depth=')) {
                        this.getOrders(string, '--load -j --depth=')
                    } else {
                        return this.emit('orders:error', {
                            error: `'${checker('orders --load -j --depth=')}' is not a valid argument for 'orders --load -j --depth='! Number of days must be a positive whole number.`
                        })
                    }
                }
            } else {
                return this.emit('orders:error', {
                    error: `'${checker('orders --load -j')}' is not a valid argument for 'orders --load --json'`
                })
            }
        } 
    }


    // order load by json
    json (string){
        const validate = (regex, input) => regex.test(input)
        const checker = code => this.spliter(string, code)[0]
        const isValid = (regex, code) => validate(regex, checker(code))

        let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
        let mregex = /^[0-5]?[0-9]$/gm
        let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
        let Mregex = /^(1[0-1]|[1-9])$/gm
        let yregex = /^[0-9]?[0-9]$/gm
        let Dregex = /^[0-9]?[0-9]$/gm
        let jsonregex = /^[0-9]?[0-9]$/gm

        if (string.trim().startsWith('orders --load --json')) {

            if (string.trim() === 'orders --load --json') {
                return this.getOrders(string, '--load --json')
            }
            if (string.trim().match(/orders --load --json -d/)) {
                if (string.trim().length > 'orders --load --json -d'.length) {

                    if (isValid(Dregex, 'orders --load --json -d')) {
                        this.getOrders(string, '--load --json -d')
                    } else {
                        return this.emit('orders:error', {
                            error: `'${checker('orders --load --json -d')}' is not a valid argument for 'orders --load --json -d'! Number of days must be a positive whole number.`
                        })
                    }
                }
            } else if (string.trim().match(/orders --load --json --depth=/)) {
                if (string.trim().length > 'orders --load --json --depth='.length) {
                    if (isValid(Dregex, 'orders --load --json --depth=')) {
                        this.getOrders(string, '--load --json --depth=')
                    } else {
                        return this.emit('orders:error', {
                            error: `'${checker('orders --load --json --depth=')}' is not a valid argument for 'orders --load --json --depth='! Number of days must be a positive whole number.`
                        })
                    }
                }
            } else {
                return this.emit('orders:error', {
                    error: `'${checker('orders --load --json')}' is not a valid argument for 'orders --load --json'`
                })
            }
        }
    }

// orders load by time
    onloader(string){
        const validate = (regex, input) => regex.test(input)
        const checker = code => this.spliter(string, code)[0]
        const isValid = (regex, code) => validate(regex, checker(code))

        let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
        let mregex = /^[0-5]?[0-9]$/gm
        let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
        let Mregex = /^(1[0-1]|[1-9])$/gm
        let yregex = /^[0-9]?[0-9]$/gm
        let Dregex = /^[0-9]?[0-9]$/gm
        let jsonregex = /^[0-9]?[0-9]$/gm

          // Years
          if (string.match(/orders --load -y/)) {
            if (string.trim().length > 'orders --load -y'.length) {
                this.onjson(string, '--load -y')

            }
        } else if (string.match(/orders --load --years=/)) {
            if (string.trim().length > 'orders --load --years='.length) {
                this.onjson(string, '--load --years=')
            }
        }

        // months
        if (string.match(/orders --load -M/)) {
            if (string.trim().length > 'orders --load -M'.length) {
                this.onjson(string, '--load -M')
            }
        } else if (string.match(/orders --load --months=/)) {
            if (string.trim().length > 'orders --load --months='.length) {
                this.onjson(string, '--load --months=')
            }
        }
        // days
        if (string.match(/orders --load -d/)) {
            if (string.trim().length > 'orders --load -d'.length) {

                this.onjson(string, '--load -d')
            }
        } else if (string.match(/orders --load --days=/)) {
            if (string.trim().length > 'orders --load --days='.length) {
                this.onjson(string, '--load --days=')
            }

        } else if (string.match(/orders --load --hours=/)) {
            if (string.trim().length > 'orders --load --hours='.length) {
                this.onjson(string, '--load --hours=')
            }
        } else if (string.match(/orders --load -h/)) {
            if (string.trim().length > 'orders --load -h'.length) {
                this.onjson(string, '--load -h')
            }

        } else if (string.match(/orders --load --minutes=/)) {
            if (string.trim().length > 'orders --load --minutes='.length) {
                this.onjson(string, '--load --minutes=')
            }
        } else if (string.match(/orders --load -m/)) {
            if (string.trim().length > 'orders --load -m'.length) {
                this.onjson(string, '--load -m')
            }
        } else if (string.match(/orders --load/)) {
            if (string === 'orders --load') {
                //this.getOrders(string, '--load')
            } else if (string === 'orders --load -j') {

            } else if (string === 'orders --load') {

            } else if (string.trim().length > 'orders --load -y'.length || string === 'orders --load -y') {

            } else if (string === 'orders --load --json') {

            } else if (string.trim().length > 'orders --load -j -d'.length || string.trim() === 'orders --load -j -d') {

            } else if (string.trim().length > 'orders --load --json -d'.length || string.trim() === 'orders --load --json -d') {

            } else if (string.trim().length > 'orders --load -j --depth='.length || string.trim() === 'orders --load -j --depth=') {

            } else if (string.trim().length > 'orders --load --json --depth='.length || string.trim() === 'orders --load --json --depth=') {

            } else {
                this.emit('orders:error', {
                    error: `'${string}' is not valid command! onloader 1`
                })
            }
        } else {
            this.emit('orders:error', {
                error: `'${string}' is not valid command! onloader 2 ss`
            })
        }
    }

    // order load by json, time
    onload(string) {
        if (string.trim().startsWith('orders --load')) {
            if (string.trim().length === 'orders --load'.length) {
                this.getOrders(string, '--load')
            }
            this.j(string)
            this.json(string)
            this.onloader(string)
        }
    }
    // this.getOrders
    onl(string) {
        const validate = (regex, input) => regex.test(input)
        const checker = code => this.spliter(string, code)[0]
        const isValid = (regex, code) => validate(regex, checker(code))

        let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
        let mregex = /^[0-5]?[0-9]$/gm
        let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
        let Mregex = /^(1[0-1]|[1-9])$/gm
        let yregex = /^[0-9]?[0-9]$/gm
        let Dregex = /^[0-9]?[0-9]$/gm
        let jsonregex = /^[0-9]?[0-9]$/gm

        if (string.trim().startsWith('orders -l')) {
            if (string.trim().length === 'orders -l'.length) {
                this.getOrders(string, '-l')
            }
            if (string.trim().startsWith('orders -l -j')) {
                if (string.trim() === 'orders -l -j') {
                    return this.getOrders(string, '-l -j')
                }

                if (string.trim().match(/orders -l -j -d/)) {
                    if (string.trim().length > 'orders -l -j -d'.length) {

                        if (isValid(Dregex, 'orders -l -j -d')) {
                            this.getOrders(string, '-l -j -d')
                        } else {
                            return this.emit('orders:error', {
                                error: `'${checker('orders -l -j -d')}' is not a valid argument for 'orders -l -j -d'! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else if (string.trim().match(/orders -l -j --depth=/)) {
                    if (string.trim().length > 'orders -l -j --depth='.length) {

                        if (isValid(Dregex, 'orders -l -j --depth=')) {
                            this.getOrders(string, '-l -j --depth=')
                        } else {
                            return this.emit('orders:error', {
                                error: `'${checker('orders -l -j --depth=')}' is not a valid argument for 'orders -l -j --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else {
                    return this.emit('orders:error', {
                        error: `'${checker('orders -l -j')}' is not a valid argument for 'orders -l --json'`
                    })
                }


            } else if (string.trim().startsWith('orders -l --json')) {
                if (string.trim() === 'orders -l --json') {
                    return this.getOrders(string, '-l --json')
                }
                if (string.trim().match(/orders -l --json -d/)) {
                    if (string.trim().length > 'orders -l --json -d'.length) {

                        if (isValid(Dregex, 'orders -l --json -d')) {
                            this.getOrders(string, '-l --json -d')
                        } else {
                            return this.emit('orders:error', {
                                error: `'${checker('orders -l --json -d')}' is not a valid argument for 'orders -l --json -d'! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else if (string.trim().match(/orders -l --json --depth=/)) {
                    if (string.trim().length > 'orders -l --json --depth='.length) {
                        if (isValid(Dregex, 'orders -l --json --depth=')) {
                            this.getOrders(string, '-l --json --depth=')
                        } else {
                            return this.emit('orders:error', {
                                error: `'${checker('orders -l --json --depth=')}' is not a valid argument for 'orders -l --json --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else {
                    return this.emit('orders:error', {
                        error: `'${checker('orders -l --json')}' is not a valid argument for 'orders -l --json'`
                    })
                }
            }

            //  Years orders -l -y + json
            else if (string.match(/orders -l -y/)) {
                if (string.trim().length > 'orders -l -y'.length) {
                    this.onjson(string, '-l -y')
                }
            } else if (string.match(/orders -l --years=/)) {
                if (string.trim().length > 'orders -l --years='.length) {
                    this.onjson(string, '-l --years=')
                }
            }

            // months
            if (string.match(/orders -l -M/)) {
                if (string.trim().length > 'orders -l -M'.length) {
                    this.onjson(string, '-l -M')
                }
            } else if (string.match(/orders -l --months=/)) {
                if (string.trim().length > 'orders -l --months='.length) {
                    this.onjson(string, '-l --months=')
                }
            }
            // days
            if (string.match(/orders -l -d/)) {
                if (string.trim().length > 'orders -l -d'.length) {
                    this.onjson(string, '-l -d')
                }
            } else if (string.match(/orders -l --days=/)) {
                if (string.trim().length > 'orders -l --days='.length) {
                    this.onjson(string, '-l --days=')
                }
                // hours
            } else if (string.match(/orders -l --hours=/)) {
                if (string.trim().length > 'orders -l --hours='.length) {
                    this.onjson(string, '-l --hours=')
                }
            } else if (string.match(/orders -l -h/)) {

                if (string.trim().length > 'orders -l -h'.length) {
                    this.onjson(string, '-l -h')
                }
                // minutes
            } else if (string.match(/orders -l --minutes=/)) {
                if (string.trim().length > 'orders -l --minutes='.length) {
                    this.onjson(string, '-l --minutes=')
                }
            } else if (string.match(/orders -l -m/)) {
                if (string.trim().length > 'orders -l -m'.length) {
                    this.onjson(string, '-l -m')
                }
            } else if (string.match(/orders -l/)) {
                if (string === 'orders -l') {
                    // this.getOrders(string, '-l')
                } else if (string === 'orders -l -j') {

                }else if (string === 'orders -l -y') {

                } else if (string.trim().length > 'orders -l -y'.length || string === 'orders -l -y') {

                } else if (string === 'orders -l --json') {

                } else if (string.trim().length > 'orders -l -j -d'.length || string.trim() === 'orders -l -j -d') {

                } else if (string.trim().length > 'orders -l --json -d'.length || string.trim() === 'orders -l --json -d') {

                } else if (string.trim().length > 'orders -l -j --depth='.length || string.trim() === 'orders -l -j --depth=') {

                } else if (string.trim().length > 'orders -l --json --depth='.length || string.trim() === 'orders -l --json --depth=') {

                } else {
                    return this.emit('orders:error', {
                        error: `'${string}' is not valid  command! 1`
                    })
                }
            } else {
                return this.emit('orders:error', {
                    error: `'${string}' is not valid command! 2`
                })
            }
        }

    }

    // this.getOrderByID
    ongetbyid(string){
        const validate = (regex, input) => regex.test(input)
        const checker = code => this.spliter(string, code)[0]
        const isValid = (regex, code) => validate(regex, checker(code))


        if (string.trim().startsWith('orders -g -i')) {
            if (string.trim().length > 'orders -g -i'.length) {
                this.getOrderByID(string, '-g -i')
            }
        } else if (string.trim().startsWith('orders -g --id=')) {
            if (string.trim().length > 'orders -g --id='.length) {
                this.getOrderByID(string, '-g --id=')
            }
        } else if (string.trim().startsWith('orders --get -i')) {
            if (string.trim().length > 'orders --get -i'.length) {
                this.getOrderByID(string, '--get -i')
            }
        } else if (string.trim().startsWith('orders --get --id=')) {
            if (string.trim().length > 'orders --get --id='.length) {
                this.getOrderByID(string, '--get --id=')
            }
        } 

    }
  
ongetbyhelp(string){
    if (string.trim().startsWith('orders -h')) {
        if (string.trim().length === 'orders -h'.length) {
            this.help(string)
        } else {
            this.emit('orders:error', {
                error: `'${string}' is not valid command! ongetbyhelp`
            })
        }
    } else if (string.trim().startsWith('orders --help')) {
        if (string.trim().length === 'orders --help'.length) {
            this.help(string)
        } else {
            //this.emit('orders:error', {error: `'${string}' is not valid command!`})
        }
    } 
}
ongetbyerror(string){
    if (string.trim().startsWith('orders') && string.trim().length === 'orders'.length) {
        //this.emit('orders')
    }else if (string.trim().startsWith('orders -l') && string.trim().length === 'orders -l'.length) {
        //this.emit('orders')
    }else if (string.trim().length >'orders -l -y'.length || string.trim().length === 'orders -l -y'.length) {
        //this.emit('orders')
    } else if (string.trim().startsWith('orders --load') && string.trim().length > 'orders --load'.length) {
        //this.emit('orders')
    }else if (string.trim().startsWith('orders --load') && string.trim().length === 'orders --load'.length) {
        //this.emit('orders')
    }else if (string.trim().startsWith('orders -h') && string.trim().length === 'orders -h'.length) {
        //this.emit('orders')
    }else {
        this.emit('orders:error', {
            error: `'${string}' is not valid command! ongetbyerror`
        })
    }
}
    onget(string) {
        this.ongetbyid(string)
        this.ongetbyemail(string)
        this.ongetbyphone(string)
        this.ongetbyhelp(string)
        this.ongetbyerror(string)
    
    }
    onglobalordermatch(string) {
        this.onload(string)
        this.onl(string)
        this.onget(string)
    }
    
}
module.exports = ByID


'use strict'
const ByPHONE = require('./byPHONE')
const {createReadStream,promises} = require('fs')
const path = require('path')
const util = require('util')


class ByEMAIL extends ByPHONE{
    constructor(){
        super()
        this.autobind(ByEMAIL)
        this.autoinvoker(ByEMAIL)
        this.setMaxListeners(Infinity)
    }

    async getOrderByEMAIL(string, args) {
    
        const option = this.spliter(string, 'orders')
        if(!option || option.length === 0) return
        
        let idandoption = this.spliter(option[0], args)

        if (idandoption === undefined || idandoption.length === 0 ) {
            //return
            // return this.emit('orders:error', {
            //     error: `orders ${args} requires an argument (a phone number)`
            // })
        }

         if (idandoption[0].trim().length < 4 || typeof(idandoption[0].trim()) !== 'string') {
            return this.emit('orders:error', {
                error: `'${idandoption[0]}' is not a valid argument for 'orders ${args}' `
            })
        }
        
        let details = this.spliter(idandoption[0], ' ')
        let email = details[0]
        let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
      
        let options = []
        for (let i = 1; i < details.length; i++) {
            options.push(details[i])
        }
    
        if (!emailRegex.test(details[0])) {
            return this.emit('orders:error', {
                error: `'${details[0]}' is not a valid email address.`
            })
        }
        if (details[0] === undefined || !details[0].trim() || details[0].trim() === undefined) {
            return this.emit('orders:error', {
                error: 'Email address is required'
            })
        }
        if (details[0].trim().length <4 || typeof (details[0].trim()) !== 'string') {
            return this.emit('orders:error', {
                error: `${details} is not a valid email length`
            })
        }
         
        if (details[0].trim() !== undefined && details[0].trim().length >= 10 && typeof (details[0].trim()) === 'string') {

           try{
        
            let guests = await this.findAll('guestshippings')
            let users = await this.findAll('shippings')
            let corders = await this.findAll('orders')
            let userguest = [...guests, ...users]

            let customers = new Set 
            for(let ug of userguest){
                customers.add(ug)
            }
           
            if(customers.size > 0){
          
                /// look through guestshipping first 
                let counter  = 0
                for(let customer of customers){
                    // check in guestshipping
                    let isCustomerFound = false
                    let guestpath = `${this.base()}/guestshippings/${customer}`
                    let guestreadable = createReadStream(guestpath, 'utf-8')
                    let guestcustomer = {}
                    guestreadable.on('error', error => {
                        let path = `${this.base()}/shippings/${customer}`
                        let readable = createReadStream(path, 'utf-8')
                        let customertofind = {}
                        readable.on('error', error => {
                            //console.log('customer not found in shipping')
                            return this.emit('orders:warning', {error: 'register not found in shipping'})
                        })
                        readable.on('data', chunk =>{
                            customertofind = JSON.parse(chunk)
                            // console.log(JSON.parse(chunk))
                           
                        })
                        readable.on('end', () =>{
                            counter++
                            if(customertofind && customertofind.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase()){
                                isCustomerFound = true
                                customertofind.guest = false
                                this.emit('customer-found', customertofind)
                            }else {
                                if(counter === customers.size){
                                    this.emit('no-shippings-found')
                                }
                            }
                        })
                    })
                    guestreadable.on('data', chunk =>{
                        guestcustomer = JSON.parse(chunk)
                    })
                    guestreadable.on('end', () =>{
                        counter++
                        if(guestcustomer && guestcustomer.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase()){
                            isCustomerFound = true
                            guestcustomer.guest = true
                            this.emit('customer-found', guestcustomer)
                        }else{
                            if(counter === customers.size){
                                this.emit('no-guestshippings-found')
                            }
                        }
                    })
                     
                    if(isCustomerFound === true) break
                }
                this.once('no-guestshippings-found', error => {
                    return this.emit('orders:info', {error: 'There is no order associated with this email'})
                })
                this.removeDuplicateListeners('no-guestshippings-found')
                this.once('no-shippings-found', error => {
                    return this.emit('orders:info', {error: 'There is no order associated with this email'})
                })
                this.removeDuplicateListeners('no-shippings-found')
                
                this.once('customer-found', customer =>{
                    //this.removeDuplicateListeners('customer-found')
                     let orderids = []
                     let order = {}
                     let orders = []
                     let errors = []
                     if (customer.cart && customer.cart.length > 0) {
                        //  console.log('cart', customer.cart)
                        //  console.log('orders', corders)
                        //  return 
                         for (let orderId of customer.cart) {
                             let orderid = corders.find(id => id === `${orderId}.json`)

                             if (orderid && orderid !== undefined) {
                                 orderids.push(orderid)
                                 errors.push('order-id-found')

                                 let orderpath = `${this.base()}/orders/${orderid}`
                                 let orderreadable = createReadStream(orderpath, 'utf-8')

                                 orderreadable.on('error', error => {
                                     this.emit('orders:error', {
                                         error: `Order with id ${orderid} does not exits`
                                     })
                                 })
                                 orderreadable.on('data', chunk => {
                                     order = JSON.parse(chunk)
                                     orders.push(order)
                                 })
                                 orderreadable.on('end', () => {
                                    this.emit('customer-orders-found', {customer, orders})
                                 })
                             } else if (!orderid || orderid === undefined) {
                                 errors.push('order-id-not-found')
                             }
                         }
                     }else if(!customer.cart || customer.cart.length === 0){
                         return this.emit('orders:info', {error: 'This customer has no orders'})
                     }
                     let err = errors.find(error => error === 'order-id-found')
                     if (!err || err === undefined) {
                         return this.emit('orders:info', {
                             error: 'This user has no orders.'
                         })
                     }
                })
                this.once('customer-orders-found',  data =>{
                    
                let email = data.customer.email
                let disp = {}

                let counter = 0;
                for (let order of data.orders.reverse()) {
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

                    counter++
                    disp[`\x1b[35mORDER ${counter}\x1b[0m`] = []
                    disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mORDER ID #\x1b[0m'] = order.id
                    disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mDATE\x1b[0m'] = order.created_at
                    disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mAS FOR NOW\x1b[0m'] = message
                }

                let title = data.customer.guest ? `ALL ORDERS FOR ${email.toUpperCase()} (GUEST CUSTOMER) ` :  `ALL ORDERS FOR ${email.toUpperCase()} (REGISTERED CUSTOMER)`
                let options = {
                    string: title,
                    number: process.stdout.columns,
                    color: 36
                }
                // console.log('hello ')
                this.padding(options)
                console.table(disp)
                })
                this.removeDuplicateListeners('customer-orders-found')
            }else{
                return this.emit('orders:error', {error: 'no users found'})
            }
           }catch(error){
            this.emit('orders:error', {error})
           }        
        }

    }
    timeoptions(){
        return [
            '-y', '--years=',
            '-M', '--months=',
            '-d', '--days=',
            '-h', '--hours=',
            '-m', '--minutes=',
            '-s', '--seconds='
        ]
    }
    jsonoptions(){
        return [
            '-j',
            '--json',
            '-j -d',
            '-j --depth=',
            '--json -d',
            '--json --depth='
        ]
    }
    onvalidetimecode (code){
        return this.timeoptions().find(option => option === code) === undefined ? false: true
    }
    onvalidatejsoncode(code){
        return this.timeoptions().find(option => option === code) === undefined ? false: true
    }
    ongetbyemail(string){
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

       if (string.trim().startsWith('orders -g -e')) {
            if (string.trim().length > 'orders -g -e'.length) {
                this.emailjson(string,'orders -g -e' )
                // this.getOrderByEMAIL(string, '-g -e')
            }
        } else if (string.trim().startsWith('orders -g --email=')) {
            if (string.trim().length > 'orders -g --email='.length) {
                this.emailjson(string,'orders -g --email=' )
                // this.getOrderByEMAIL(string, '-g --email=')
            }
        } else if (string.trim().startsWith('orders --get -e')) {
            if (string.trim().length > 'orders --get -e'.length) {
                this.emailjson(string,'orders --get -e' )
                // this.getOrderByEMAIL(string, '--get -e')
            }
        } else if (string.trim().startsWith('orders --get --email=')) {
            if (string.trim().length > 'orders --get --email='.length) {
                this.emailjson(string,'orders --get --email=' )
                // this.getOrderByEMAIL(string, '--get --email=')
            }
        } else if (string.trim().startsWith('orders')) {
            if (string.trim().length === 'orders'.length) {
                // this.emailjson(string,'orders --get --email=' )
                // this.getOrderByEMAIL(string, '--get --email=')
            }
        }
        else{
            return this.emit('orders:error', {error: `'${string}' is not a command.`})
        }
    }
    loadByEmailOrderByTime(event){
        // orders --get --phone=6122071306 --hours=12
       
       this.once(event, (orders, data) => {
        // console.log('event:', event)
        let jsonned = data.jsonned ? data.jsonned : undefined
        let time = data.time ? data.time : undefined
           let _e
            if(event === '--years=' || event ==='-y'){
                _e = 'orders:year'
            }
            if(event === '--months=' || event ==='-M'){
                _e = 'orders:month'
            }
            if(event === '--days=' || event ==='-d'){
                _e = 'orders:day'
            }
            if(event === '--hours=' || event ==='-h'){
                _e = 'orders:hour'
            }
            if(event === '--minutes=' || event ==='-m'){
                _e = 'orders:minute'
            }
         if(jsonned !== undefined){
            if(jsonned.json !== undefined && jsonned.depth !== undefined){
                this.getOrderByTime(orders, _e, data)
                // console.log('json and no time')
            }else{
                if(time !== undefined){
                    if(time.code !== undefined && time.value !== undefined){
                       this.ondisplaybychosentime(_e)
                       this.removeDuplicateListeners(_e)
                      this.getOrderByTime(orders, _e, data)
                    }
                }
            }
         }else if (jsonned  === undefined){
             if(time !== undefined){
                 if(time.code !== undefined && time.value !== undefined){
                    //  console.log('time .. and no json')
                    this.ondisplaybychosentime(_e)
                    this.removeDuplicateListeners(_e)
                   this.getOrderByTime(orders, _e, data)
                 }
             }
         }
       })
    }
    async loadEmailOrdersByJsonOnly(event) {
    
        this.once(event, async data => {
        
            try{
                let time = data.time ? data.time : undefined
                let jsonned = data.jsonned ? data.jsonned : undefined
                let email = data.email ? data.email : undefined
    
                let guests = await this.findAll('guestshippings')
                let users = await this.findAll('shippings')
                let corders = await this.findAll('orders')
                let userguest = [...guests, ...users]
    
                let customers = new Set 
                for(let ug of userguest){
                    customers.add(ug)
                }
                if(customers.size > 0){
                    /// look through guestshipping first 
                    let counter  = 0
                    for(let customer of customers){
                        // check in guestshipping
                        let isCustomerFound = false
                        let guestpath = `${this.base()}/guestshippings/${customer}`
                        let guestreadable = createReadStream(guestpath, 'utf-8')
                        let guestcustomer = {}
    


                        guestreadable.on('error', error => {

                            let path = `${this.base()}/shippings/${customer}`
                            let readable = createReadStream(path, 'utf-8')
                            let customertofind = {}

                            readable.on('error', error => {
                               // console.log('customer not found in shipping')
                                return this.emit('orders:warning', {error: 'register not found in shipping'})
                            })
                            readable.on('data', chunk =>{
                                customertofind = JSON.parse(chunk)
                                // console.log(JSON.parse(chunk))
                               
                            })
                            readable.on('end', () =>{
                                counter++

                                if(customertofind && customertofind.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase()){
                                    isCustomerFound = true
                                    customertofind.guest = false
                                    return this.emit('customer-found', customertofind)
                                }else{
                                    if(counter === customers.size){
                                       return this.emit('no-shippings-found')
                                    }
                                }
                            })
                          return 
                        })

    
                        guestreadable.on('data', chunk =>{
                            guestcustomer = JSON.parse(chunk)
                        })
            
                        guestreadable.on('end', () =>{
                            counter++
                            if(guestcustomer && guestcustomer.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase()){
                                isCustomerFound = true
                                guestcustomer.guest = true
                                 return this.emit('customer-found', guestcustomer)
                            }else{
                                if(counter === customers.size){
                                    return this.emit('no-guestshippings-found')
                                }
                            }
                        })
                         
                        if(isCustomerFound === true) break
                    }



                    this.once('no-guestshippings-found', error => {
                        return this.emit('orders:info', {error: 'This email has no associated orders'})
                    })
                    this.removeDuplicateListeners('no-guestshippings-found')

                    this.once('no-shippings-found', error => {
                        return this.emit('orders:info', {error: 'This email has no associated orders'})
                    })
                    this.removeDuplicateListeners('no-shippings-found')

                    this.once('customer-found', customer =>{
                         let orderids = []
                         let order = {}
                         let orders = []
                         let errors = []
                         if (customer.cart && customer.cart.length > 0) {
                            //  console.log('cart', customer.cart)
                            //  console.log('orders', corders)
                            //  return 
                             for (let orderId of customer.cart) {
                                 let orderid = corders.find(id => id === `${orderId}.json`)
                                 
                                 if (orderid && orderid !== undefined) {
                                     orderids.push(orderid)
                                     errors.push('order-id-found')
    
                                     let orderpath = `${this.base()}/orders/${orderid}`
                                     let orderreadable = createReadStream(orderpath, 'utf-8')
    
                                     orderreadable.on('error', error => {
                                         this.emit('orders:error', {
                                             error: `Order with id ${orderid} does not exits`
                                         })
                                     })
                                     orderreadable.on('data', chunk => {
                                         order = JSON.parse(chunk)
                                         orders.push(order)
                                     })
                                     orderreadable.on('end', () => {
                                         if (orders.length === customer.cart.length) {
                                            //  return this.infos(orders, jsonned.depth)
                                            return this.emit('found-all-customer-orders', orders, jsonned)
                                         }
                                     })
                                 } else if (!orderid || orderid === undefined) {
                                     errors.push('order-id-not-found')
                                 }
    
                             }
                         }else if(!customer.cart || customer.cart.length === 0){
                             return this.emit('orders:info', {error: 'This customer has no orders'})
                         }
    
                         let err = errors.find(error => error === 'order-id-found')
                         if (!err || err === undefined) {
                             return this.emit('orders:info', {
                                 error: 'This user has no orders.'
                             })
                         }
    
                    })
                    this.removeDuplicateListeners('customer-found')
                }else{
                    return this.emit('orders:error', {error: 'no users found'})
                }
    
               }catch(error){
                this.emit('orders:error', {error})
               } 
       
        })
        this.removeDuplicateListeners('found-all-customer-orders')
        this.once('found-all-customer-orders', (orders, jsonned) =>{
            return this.infos(orders, jsonned.depth)
        })
    }
    async loadByEmail(codeevent, event) {
   
        this.once(codeevent, async data => {
            try{
                let time = data.time ? data.time : undefined
                let jsonned = data.jsonned ? data.jsonned : undefined
                let email = data.email ? data.email : undefined
    
                let guests = await this.findAll('guestshippings')
                let users = await this.findAll('shippings')
                let corders = await this.findAll('orders')
                let userguest = [...guests, ...users]
    
                let customers = new Set 
                for(let ug of userguest){
                    customers.add(ug)
                }
                if(customers.size > 0){
                    /// look through guestshipping first 
                    let counter  = 0
                    for(let customer of customers){
                       
                        // check in guestshipping
                        let isCustomerFound = false
                        let guestpath = `${this.base()}/guestshippings/${customer}`
                        let guestreadable = createReadStream(guestpath, 'utf-8')
                        let guestcustomer = {}
    
                        guestreadable.on('error', error => {
    
                            let path = `${this.base()}/shippings/${customer}`
                            let readable = createReadStream(path, 'utf-8')
                            let customertofind = {}
                            readable.on('error', error => {
                                // console.log('customer not found in shipping')
                                return this.emit('orders:warning', {error: 'register not found in shipping'})
                            })
                            readable.on('data', chunk =>{
                                customertofind = JSON.parse(chunk)
                                // console.log(JSON.parse(chunk))
                               
                            })
                            readable.on('end', () =>{
                                counter++
                                if(customertofind && customertofind.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase()){
                                    isCustomerFound = true
                                    customertofind.guest = false
                                    this.emit('customer-found', customertofind)
                                }else{
                                    if(counter === customers.size){
                                        this.emit('no-shippings-found')
                                    }
                                }
                            })
                        
                        })
    
                        guestreadable.on('data', chunk =>{
                            guestcustomer = JSON.parse(chunk)
                        })
            
                        guestreadable.on('end', () =>{
                            counter++
                            if(guestcustomer && guestcustomer.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase()){
                                isCustomerFound = true
                                guestcustomer.guest = true
                                this.emit('customer-found', guestcustomer)
                            }else{
                                if(counter === customers.size){
                                    this.emit('no-guestshippings-found')
                                }
                            }
                        })
                         
                        if(isCustomerFound === true) break
                    }
                    this.once('no-guestshippings-found', error => {
                        return this.emit('orders:info', {error: 'This email has no associated orders'})
                    })
                    this.removeDuplicateListeners('no-guestshippings-found')
                    this.once('no-shippings-found', error => {
                        return this.emit('orders:info', {error: 'This email has no associated orders'})
                    })
                    this.removeDuplicateListeners('no-shippings-found')

                    this.once('customer-found', customer =>{
                         let orderids = []
                         let order = {}
                         let orders = []
                         let errors = []
                         if (customer.cart && customer.cart.length > 0) {
                            //  console.log('cart', customer.cart)
                            //  console.log('orders', corders)
                            //  return 
                             for (let orderId of customer.cart) {
                                 let orderid = corders.find(id => id === `${orderId}.json`)
    
                                 if (orderid && orderid !== undefined) {
                                     orderids.push(orderid)
                                     errors.push('order-id-found')
    
                                     let orderpath = `${this.base()}/orders/${orderid}`
                                     let orderreadable = createReadStream(orderpath, 'utf-8')
    
                                     orderreadable.on('error', error => {
                                         this.emit('orders:error', {
                                             error: `Order with id ${orderid} does not exits`
                                         })
                                     })
                                     orderreadable.on('data', chunk => {
                                         order = JSON.parse(chunk)
                                         orders.push(order)
                                     })
                                     orderreadable.on('end', () => {
                                        // this.emit('customer-orders-found', {customer, orders})
                                        //orders.push(order)
                                        if (orders.length === customer.cart.length) {
                                            if (time !== undefined && jsonned !== undefined) {
                                                if (time.code !== undefined && time.value !== undefined) {
                                                    if (jsonned.json !== undefined && jsonned.depth !== undefined) {
                                                        this.emit(event, orders, data)
                                                    }
                                                }
                                            }
                                            if (time !== undefined) {
                                                if (time.code !== undefined && time.value !== undefined) {
                                                    this.emit(event, orders, data)
                                                } else if (time.code === undefined || time.value === undefined) {
                                                    if (jsonned !== undefined) {
                                                        if (jsonned.json !== undefined && jsonned.depth !== undefined) {
                                                            this.infos(orders, jsonned.depth)
                                                        }
                                                    }
                                                }
                                            } else if (time === undefined) {
                                                if (jsonned !== undefined) {
                                                    if (jsonned.json !== undefined && jsonned.depth !== undefined) {
                                                        this.infos(orders, jsonned.depth)
                                                    }
                                                }
                                            }
    
                                        }
                                        })
                                 } else if (!orderid || orderid === undefined) {
                                     errors.push('order-id-not-found')
                                 }
    
                             }
                         }else if(!customer.cart || customer.cart.length === 0){
                             return this.emit('orders:info', {error: 'This customer has no orders'})
                         }
    
                         let err = errors.find(error => error === 'order-id-found')
                         if (!err || err === undefined) {
                             return this.emit('orders:info', {
                                 error: 'This user has no orders.'
                             })
                         }
    
                    })
                }else{
                    return this.emit('orders:info', {error: 'no users found'})
                }
    
               }catch(error){
                this.emit('orders:error', {error})
               } 

        })
        this.loadByEmailOrderByTime(event)
    }
    
   
    emailjson(string, event) {

        let original = this.spliter(string, event)

        let orig = this.spliter(original[0], ' ')
      
        /// 
        let email = orig[0]

        let isPhoneOk = this.isValid(this.regexes().emailregex, email)
        if (isPhoneOk === false) {
            return this.emit('orders:error', {
                error: `'${email}' is not a valid email address.`
            })
        }

        let options = [] // 1. length = 5, 

        for (let i = 1; i < orig.length; i++) {
            options.push(orig[i])
        }
        // console.log(options)
        // orders --get --phone=6122071306
       
        if (!options || options.length === 0) {
            return this.getOrderByEMAIL(string, this.spliter(event, 'orders')[0])
        } else {

            // by time 
           
            if (options.length <= 2) {
               
                let code, value, time, cchecker, vchecker, codes, _event, json, depth, jsonned
                if (options.length === 1) {
                  
                    if (options[0] === '-j' || options[0] === '--json') {
                        let data = {}
                        time = {code: code, value: value}
                        jsonned = {json: options[0], depth: Infinity}
                        data.email = email
                        data.time = time 
                        data.jsonned = jsonned

                        let _event = 'orders:json'

                        this.loadEmailOrdersByJsonOnly(_event)
                        this.emit(_event, data)
                      
                    } else {
                       
                        codes = this.spliter(options[0], '=')
                        code = `${codes[0]}=`
                        value = codes[1]
                        _event = code
                     

                       if (!options[0].includes('=')) {
                           return this.emit('orders:error', {
                               error: `'${options[0]}' is not a valid option ....`
                           })
                       }

                        if (this.onvalidetimecode(code) === false) {
                            return this.emit('orders:error', {
                                error: `'${codes[0]}' is not a valid argument for '${event}'`
                            })
                        }

                        if (code === '--years=' || code === '-y' ) {
                            let ishOK = this.isValid(this.regexes().yregex, value)
                            if (ishOK === false) {
                                if(value === undefined){
                                    return this.emit('orders:error', {
                                        error: `'${code}' requires an argument.`
                                    })
                                }else{
                                    return this.emit('orders:error', {
                                        error: `'${value}' is not a valid argument for '${code}'! Number of years must be a positive whole number.`
                                    })
                                }
                                
                            }
                        }

                        if (code === '--months=' || code === '-M' ) {
                            let ishOK = this.isValid(this.regexes().Mregex, value)
                            if (ishOK === false) {
                                if(value === undefined){
                                    return this.emit('orders:error', {
                                        error: `'${code}' requires an argument.`
                                    })
                                }else{
                                    return this.emit('orders:error', {
                                        error: `'${value}' is not a valid argument for '${code}'! Number of months must be from 1 to 11.`
                                    })
                                }
                               
                            }
                        }

                        if (code === '--days=' || code === '-d' ) {
                            let ishOK = this.isValid(this.regexes().dregex, value)
                            if (ishOK === false) {
                                if(value === undefined){
                                    return this.emit('orders:error', {
                                        error: `'${code}' requires an argument.`
                                    })
                                }else{
                                    return this.emit('orders:error', {
                                        error: `'${value}' is not a valid argument for '${code}'! Number of days must be from 1 to 30.`
                                    })
                                }
                               
                            }
                        }

                        if (code === '--hours=' || code === '-h' ) {
                            let ishOK = this.isValid(this.regexes().hregex, value)
                            if (ishOK === false) {
                                if(value === undefined){
                                    return this.emit('orders:error', {
                                        error: `'${code}' requires an argument.`
                                    })
                                }else{
                                    return this.emit('orders:error', {
                                        error: `'${value}' is not a valid argument for '${code}'! Number of hours must be from 1 to 23.`
                                    })
                                }
                                
                            }
                        }
                        if (code === '--minutes=' || code === '-m') {
                            let ishOK = this.isValid(this.regexes().mregex, value)
                            if (ishOK === false || value === 0) {
                                if(value === undefined){
                                    return this.emit('orders:error', {
                                        error: `'${code}' requires an argument.`
                                    })
                                }else{
                                    return this.emit('orders:error', {
                                        error: `'${value}' is not a valid argument for '${code}'! Number of minutes must be from 1 to 59.`
                                    })
                                }
                                
                            }
                        }
                        value = codes[1]

                        time = {
                            code,
                            value
                        }

                        let codeevent = `${email}:orders:${code}`
                        let jsonned = {json, depth}
                        let data = {}
                        
                        data.time = time 
                        data.jsonned = jsonned
                        data.email = email
                        data._event = _event
                        data.codeevent = codeevent
                      
                        this.loadByEmail(codeevent, code)
                        this.emit(codeevent, data)

                    }
                } else if (options.length === 2) {
                    let code, value, time, cchecker, vchecker, codes, _event, json, jsonned, jcode, tcode
                    // all the possibilities
                    // orders --get --phone=6122071307 --json --depth=0
                    //orders --get --phone=6122071306 --json --depth=0
                   
                    let equal = options.filter(val => val.includes('='))
                    let noequal = options.filter(val => !val.includes('='))
                    // console.log(noequal)
                    // console.log(equal)

                    if(equal.length === 1 && noequal.length  === 1 ){
                        jcode = this.onarraywalk(this.jsonEventList(), noequal, true)
                        tcode = this.onarraywalk(this.timeEventList(), noequal, true)
                       

                        if(tcode.length === 0 && jcode.length === 0){
                            return this.emit('orders:error', {error: `'${noequal}' is not a valid option`})
                        }
                        if(tcode.length > 0 && jcode.length > 0){
                            console.log('Hey')
                        }
                    }

                    if(noequal.length > 0 && equal.length === 0){
                        jcode = this.onarraywalk(this.jsonEventList(), noequal, true)
                        tcode = this.onarraywalk(this.timeEventList(), noequal, true)

                        if(tcode.length === 0 && jcode.length === 0){
                            return this.emit('orders:error', {error: `'${noequal}' is not a valid option`})
                        }
                        if(tcode.length > 0 && jcode.length  === 0){
                            if(tcode.length !== 1){
                                return this.emit('orders:error', {error: `'${tcode.join(' ')}' is not a valid option`})
                            }
                        
                            time = {code: tcode[0], value: options[options.indexOf(tcode[0]) + 1]}
                            jsonned = {json: undefined, depth: undefined}
                               
                               if (this.onvalidetimecode(time.code) === false) {
                                   return this.emit('orders:error', {
                                       error: `'${time.code}' is not a valid argument for '${event}'`
                                   })
                               }
                               if (time.code === '--years=' || time.code === '-y' ) {
                                   let ishOK = this.isValid(this.regexes().yregex, time.value)
                                   if (ishOK === false) {
                                       if(time.value === undefined){
                                           return this.emit('orders:error', {
                                               error: `'${time.code}' requires an argument.`
                                           })
                                       }else{
                                           return this.emit('orders:error', {
                                               error: `'${time.value}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                                           })
                                       }
                                       
                                   }
                               }
                               if (time.code === '--months=' || time.code === '-M' ) {
                                   let ishOK = this.isValid(this.regexes().Mregex, time.value)
                                   if (ishOK === false) {
                                       if(time.value === undefined){
                                           return this.emit('orders:error', {
                                               error: `'${time.code}' requires an argument.`
                                           })
                                       }else{
                                           return this.emit('orders:error', {
                                               error: `'${time.value}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                                           })
                                       }
                                      
                                   }
                               }
                               if (time.code === '--days=' || time.code === '-d' ) {
                                   let ishOK = this.isValid(this.regexes().dregex, time.value)
                                   if (ishOK === false) {
                                       if(time.value === undefined){
                                           return this.emit('orders:error', {
                                               error: `'${time.code}' requires an argument.`
                                           })
                                       }else{
                                           return this.emit('orders:error', {
                                               error: `'${time.value}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                                           })
                                       }
                                      
                                   }
                               }
       
                               if (time.code === '--hours=' || time.code === '-h' ) {
                                   let ishOK = this.isValid(this.regexes().hregex, time.value)
                                   if (ishOK === false) {
                                       if(time.value === undefined){
                                           return this.emit('orders:error', {
                                               error: `'${time.code}' requires an argument.`
                                           })
                                       }else{
                                           return this.emit('orders:error', {
                                               error: `'${time.value}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                                           })
                                       }
                                       
                                   }
                               }
                               if (time.code === '--minutes=' || time.code === '-m') {
                                   let ishOK = this.isValid(this.regexes().mregex, time.value)
                                   if (ishOK === false || time.value === 0) {
                                       if(time.value === undefined){
                                           return this.emit('orders:error', {
                                               error: `'${time.code}' requires an argument.`
                                           })
                                       }else{
                                           return this.emit('orders:error', {
                                               error: `'${time.value}' is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                                           })
                                       }
                                       
                                   }
                               }
                               
                              let data = {}
   
                              data.time = time
                              data.jsonned = jsonned
                              data.email = email
                              data.options = options
                         
                           let codeevent = `${email}:orders:${time.code}`
                           this.loadByEmail(codeevent, time.code)
                           this.emit(codeevent, data)
                            
                        }
                    }

                    if(equal.length  === 2 && noequal.length === 0){
                        console.log('equal.length === 2')
                    }
                    if(equal.length === 0 && noequal.length === 2){
                        jcode = this.onarraywalk(this.jsonEventList(), noequal, true)
                        tcode = this.onarraywalk(this.timeEventList(), noequal, true)
                      
                        if(tcode.length > 1){
                            return this.emit('orders:error', {error: `'Invalid option: only one time option per command allowed'`})
                        }
                        if(jcode.length === 1 && tcode.length === 1){
                            return this.emit('orders:error', {error: `'${tcode}' requires an argument`})
                        }
                    }


                    if(equal.length > 0){
                        if(equal.length > 1){
                            return this.emit('orders:error', {error: `'${equal.join(' ')}' is not a valid option`})
                        }
                        codes = this.spliter(equal[0], '=')

                        json = noequal
                        let jjson = this.jsonEventList().find(value => value === `${noequal} ${codes[0]}=`)
                       
                        if(json && json !== undefined && jjson === undefined){
                            let timer = this.timeEventList().find(value => value === `${codes[0]}=`)
                            if(timer && timer !== undefined){
                               // get the json value for the timer
                               time = {code: timer, value: codes[1]}
                               jsonned = {json, depth: Infinity}
                                
                                if (this.onvalidetimecode(time.code) === false) {
                                    return this.emit('orders:error', {
                                        error: `'${time.code}' is not a valid argument for '${event}'`
                                    })
                                }
                                if (time.code === '--years=' || time.code === '-y' ) {
                                    let ishOK = this.isValid(this.regexes().yregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                                            })
                                        }
                                        
                                    }
                                }
                                if (time.code === '--months=' || time.code === '-M' ) {
                                    let ishOK = this.isValid(this.regexes().Mregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                                            })
                                        }
                                       
                                    }
                                }
                                if (time.code === '--days=' || time.code === '-d' ) {
                                    let ishOK = this.isValid(this.regexes().dregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                                            })
                                        }
                                       
                                    }
                                }
        
                                if (time.code === '--hours=' || time.code === '-h' ) {
                                    let ishOK = this.isValid(this.regexes().hregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                                            })
                                        }
                                        
                                    }
                                }
                                if (time.code === '--minutes=' || time.code === '-m') {
                                    let ishOK = this.isValid(this.regexes().mregex, time.value)
                                    if (ishOK === false || time.value === 0) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                                            })
                                        }
                                        
                                    }
                                }
                                
                               let data = {}
    
                               data.time = time
                               data.jsonned = jsonned
                               data.email = email
                               data.options = options
                          
                            let codeevent = `${email}:orders:${time.code}`
                            this.loadByEmail(codeevent, time.code)
                            this.emit(codeevent, data)
    
                            }else{
                                return this.emit('orders:error', {error: `Invalid options or arguments`})
                            }
                        }else if(jjson && jjson !== undefined){
                             let data = {}
                            let jsonned = {json: jjson, depth: codes[1]}
                            let time = {code, value}

                           // if(time.code !== undefined && time.value !== undefined){
                                if (this.onvalidetimecode(time.code) === false) {
                                    return this.emit('orders:error', {
                                        error: `'${time.code}' is not a valid argument for '${event}'`
                                    })
                                }
                                if (time.code === '--years=' || time.code === '-y' ) {
                                    let ishOK = this.isValid(this.regexes().yregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                                            })
                                        }
                                        
                                    }
                                }
        
                                if (time.code === '--months=' || time.code === '-M' ) {
                                    let ishOK = this.isValid(this.regexes().Mregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                                            })
                                        }
                                       
                                    }
                                }
        
                                if (time.code === '--days=' || time.code === '-d' ) {
                                    let ishOK = this.isValid(this.regexes().dregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                                            })
                                        }
                                       
                                    }
                                }
        
                                if (time.code === '--hours=' || time.code === '-h' ) {
                                    let ishOK = this.isValid(this.regexes().hregex, time.value)
                                    if (ishOK === false) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                                            })
                                        }
                                        
                                    }
                                }
                                if (time.code === '--minutes=' || time.code === '-m') {
                                    let ishOK = this.isValid(this.regexes().mregex, time.value)
                                    if (ishOK === false || time.value === 0) {
                                        if(time.value === undefined){
                                            return this.emit('orders:error', {
                                                error: `'${time.code}' requires an argument.`
                                            })
                                        }else{
                                            return this.emit('orders:error', {
                                                error: `'${time.value}'  is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                                            })
                                        }
                                        
                                    }
                                }
                    
                             data.email = email
                             data.time = time 
                             data.jsonned = jsonned
                             let _event = 'orders:json'
                            
                             this.loadEmailOrdersByJsonOnly(_event)
                             this.emit(_event, data)
                        
                        }else{
                            // let timer = this.timeEventList().find(value => value === `${codes[0]}=`)
                            // if(timer && timer !== undefined){
                            //     console.log(timer)
                            // }
                            console.log('SOMETHING ELSE!')
                             
                        }
                    }else{
                        //console.log('options length is 2 and equal.length is not greater than zero')
                    }

                    
                    if(equal.length === 0 && noequal.length > 0){
                        let time, jsonned, data = {}
                       
                        let timeption = this.timeEventList().find(value => value === options[0].trim())
                        let jsonption = this.jsonEventList().find(value => value === options[0].trim())

                        if(timeption !== undefined){
                            let tcod = options.find(val => !this.isValid(this.regexes().jsonregex, val))
                            let tval = options.find(val => this.isValid(this.regexes().jsonregex, val))
                            //     console.log(tcod)
                            //     console.log(tval)
                            //     return
                            if(tcod === undefined || !tcod){
                                return this.emit('orders:error', {error: `'${tcod}' is not valid option`})
                            }
                            
                            time = {code: tcod, value: tval}
                            jsonned = {json: undefined, depth: undefined}

                            if (this.onvalidetimecode(time.code) === false) {
                                return this.emit('orders:error', {
                                    error: `'${time.code}' is not a valid argument for '${event}'`
                                })
                            }

                            if (time.code === '-y' ) {
                                let ishOK = this.isValid(this.regexes().yregex, time.value)
                                if (ishOK === false) {
                                    if(time.value === undefined && options[1] === '' ){
                                        return this.emit('orders:error', {
                                            error: `'${time.code}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${options[1]}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                                        })
                                    }
                                    
                                }
                            }
    
                            if (time.code === '-M' ) {
                                let ishOK = this.isValid(this.regexes().Mregex, time.value)
                                if (ishOK === false) {
                                    if(time.value === undefined && options[1] === ''){
                                        return this.emit('orders:error', {
                                            error: `'${time.code}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${options[1]}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                                        })
                                    }
                                   
                                }
                            }
    
                            if (time.code === '-d' ) {
                                let ishOK = this.isValid(this.regexes().dregex, time.value)
                                if (ishOK === false) {
                                    if(time.value === undefined && options[1] === ''){
                                        return this.emit('orders:error', {
                                            error: `'${time.code}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${options[1]}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                                        })
                                    }
                                   
                                }
                            }
    
                            if (time.code === '-h' ) {
                                let ishOK = this.isValid(this.regexes().hregex, time.value)
                                if (ishOK === false) {
                                    if(time.value === undefined && options[1] === ''){
                                        return this.emit('orders:error', {
                                            error: `'${time.code}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${options[1]}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                                        })
                                    }
                                    
                                }
                            }
                            if (time.code === '-m') {
                                let ishOK = this.isValid(this.regexes().mregex, time.value)
                                if (ishOK === false || time.value === 0) {
                                    if(time.value === undefined && options[1] === ''){
                                        return this.emit('orders:error', {
                                            error: `'${time.code}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${options[1]}'  is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                                        })
                                    }
                                    
                                }
                            }
                            
                
                        //     data.time = time
                        //     data.jsonned = jsonned
                        //     data.email = email
                        //     data.options = options
         
                        // //   console.log(data, 'here ...')
                        // //   return
                        //  let codeevent = `${email}:orders:${time.code}`
                        //  this.loadByEmail(codeevent, time.code)
                        //  this.emit(codeevent, data)
                        }else{
                            return this.emit('orders:error', {error: `'${options[0]} ${options[1]}' is not valid option`})
                        }
                    }else if(equal !== undefined && noequal === undefined){
                        console.log('equal is NOT undefined and noequal is undefined')
             
                    }else if(equal === undefined && noequal === undefined){
                        console.log('equal', equal)
                        console.log('no equal' , noequal)
                    }else{
                        console.log('what is this?')
                    }
                    
                    // check for json
                   
                } else {
                    console.log('unknow error')
                }

            } else if(options.length === 3) {

                // console.log(options)
               
            
                // console.log(options)
                //orders --get --email=ericson.weah@gmail.com --days=4 --json --depth=0
                let equal = options.filter(val => val.includes('='))
                let noequal = options.filter(val => !val.includes('='))

                if(equal.length > 0  && noequal.length === 0){
                    // IMPOSSIBLE
                    return this.emit('orders:error', {error: `'${equal.join(' ')}' is not a valid option`})
                  
                    // VISITED
                }else if(noequal.length > 0 && equal.length === 0){
                    let jcodes = [], tcodes =[], tvalue, time, jsonned, invalid =[]
                    for(let el of noequal){
                        tcodes.push(this.timeEventList().find(val => val === el))
                        jcodes.push(this.jsonEventList().find(val => val === el))
                        
                        if(this.timeEventList().find(val => val === el) === undefined && this.jsonEventList().find(val => val === el) === undefined ){
                            invalid.push(el)
                        }
                    }
                   

                    invalid = invalid.filter(val => !this.isValid(this.regexes().jsonregex, val))

                    tcodes = tcodes.filter(str => str !== undefined)
                    jcodes = jcodes.filter(str => str !== undefined)
                    tvalue = noequal.find(el => this.isValid(this.regexes().jsonregex, el))
                    
                    if((tcodes.length + jcodes.length) < 2){
                        if(invalid.length === 1){
                            return this.emit('orders:error', {error: `'${invalid[0]}' is not a valid option`})
                        }else if(invalid.length  === 2){
                            return this.emit('orders:error', {error: `'${invalid[0]}' and '${invalid[1]}' are not valid options`})
                        }else if(invalid.length  === 3){
                            return this.emit('orders:error', {error: `'${invalid[0]}', '${invalid[1]}', and '${invalid[2]}' are not valid options`})
                        }
                    }
                    
                    
                    if(jcodes.length == 1 && tcodes[0] === '-d' && tvalue === undefined){
                        return this.emit('orders:error', {error: `'${invalid[0]}' is not a valid argument! Json depth level must be zero or a positive number.`})
                    }

                    if(tcodes.length === 1 && tcodes[0] !== '-d'){
                        if (this.onvalidetimecode(tcodes[0]) === false) {
                            return this.emit('orders:error', {
                                error: `'${tcodes[0]}' is not a valid argument for '${event}'`
                            })
                        }

                        if(invalid && invalid.length === 1){
                            if (tcodes[0] === '-y' ) {
                                let ishOK = this.isValid(this.regexes().yregex, invalid[0])
                                if (ishOK === false) {
                                    if(invalid[0] === undefined){
                                        return this.emit('orders:error', {
                                            error: `'${tcodes[0]}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${invalid[0]}' is not a valid argument for '${tcodes[0]}'! Number of years must be a positive whole number.`
                                        })
                                    }
                                    
                                }
                            }
    
                            if (tcodes[0] === '-M' ) {
                                // console.log(invalid)
                                // return 
                                let ishOK = this.isValid(this.regexes().Mregex, invalid[0])
                                if (ishOK === false) {
                                    if(invalid.length === 1 && invalid[0] === undefined){
                                        return this.emit('orders:error', {
                                            error: `'${tcodes[0]}' requires an argument.`
                                        })
                                    }
                                    else{
                                        return this.emit('orders:error', {
                                            error: `'${invalid[0]}' is not a valid argument for '${tcodes[0]}'! Number of months must be from 1 to 11.`
                                        })
                                    }
                                   
                                }
                            }
    
                            if (tcodes[0] === '-d' ) {
                                let ishOK = this.isValid(this.regexes().dregex, invalid[0])
                                if (ishOK === false) {
                                    if(invalid[0] === undefined){
                                        return this.emit('orders:error', {
                                            error: `'${tcodes[0]}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${invalid[0]}' is not a valid argument for '${tcodes[0]}'! Number of days must be from 1 to 30.`
                                        })
                                    }
                                   
                                }
                            }
    
                            if (tcodes[0] === '-h' ) {
                                let ishOK = this.isValid(this.regexes().hregex, invalid[0])
                                if (ishOK === false) {
                                    if(invalid[0] === undefined){
                                        return this.emit('orders:error', {
                                            error: `'${tcodes[0]}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${invalid[0]}' is not a valid argument for '${tcodes[0]}'! Number of hours must be from 1 to 23.`
                                        })
                                    }
                                    
                                }
                            }
                            if (tcodes[0] === '-m') {
                                let ishOK = this.isValid(this.regexes().mregex, invalid[0])
                                if (ishOK === false || invalid[0] === 0) {
                                    if(invalid[0] === undefined){
                                        return this.emit('orders:error', {
                                            error: `'${tcodes[0]}' requires an argument.`
                                        })
                                    }else{
                                        return this.emit('orders:error', {
                                            error: `'${invalid[0]}' is not a valid argument for '${tcodes[0]}'! Number of minutes must be from 1 to 59.`
                                        })
                                    }
                                    
                                }
                            }
                        }
                       
                    }
         
                    if(tcodes.length > 0 && tcodes.length === 1){

                        if(tvalue && tvalue !== undefined){
                             if(options[0] ==='-j' && options[1] === '-d'){
                                time = {code:undefined, value: undefined}
                                jsonned = {json: jcodes[0], depth: options[2]}
                             }else if(options[0] ==='-d' && options[2] === '-j'){
                                time = {code:options[0], value: options[1]}
                                jsonned = {json: jcodes[0], depth: Infinity}
                             }else{
                                 //orders --get --phone=6122071306 --json -d 9
                                if(tcodes[0] === '-d'){
                                    time = {code:undefined, value: undefined}
                                    jsonned = {json: jcodes[0], depth: tvalue}
                                }else{
                                    
                                    time = {code: tcodes[0], value: tvalue}
                                    jsonned = {json: jcodes[0], depth: Infinity}
                                }
                             }
                           
                        }else if(jcodes.length > 0 && jcodes.length === 1){
                         console.log(jcodes)
                         console.log(tcodes)
                         console.log(tvalue)
                         return
                         for(let opt of options){
                             console.log(typeof(opt))
                         }
                         //return 
                        }else{
                            console.log('mmm .. jcodes')
                        }
                    }else{
                        console.log('Do someting else')
                    }
                    

                    // console.log(jsonned)
                    // console.log(time)
                    // return 
                    if(jsonned && jsonned.depth && !this.isValid(this.regexes().jsonregex, jsonned.depth) && jsonned.depth !== Infinity){
                        return this.emit('orders:error', {error: `'${jsonned.depth}' must be zero or a positive number`})
                    }
                    if(time && time.value && !this.isValid(this.regexes().jsonregex, time.value)){
                        return this.emit('orders:error', {error: `'${time.value}' must be zero or a positive number`})
                    }
                    let data = {}
                    data.time = time 
                    data.jsonned = jsonned

                    // console.log(jsonned)
                    //let data = {}
                    data.email = email
                    //data.options = options
                    //data.depth = jsonned.depth
                    let _event = 'orders:json'
                    // let params = {phone: email, _event}
                    // data.params = params
                 
                    this.loadEmailOrdersByJsonOnly(_event)
                    this.emit(_event, data)

                    // console.log('data:', data)

                    // VISITED
                }else if(equal.length > 0 && noequal.length > 0){
    
                    // equal[0]
                    let jcode, mcode, jcodes, mcodes, jmcodes, jsdepth, mvalue, time, jsonned

                    if(equal[0] && equal[0] !== undefined){

                        jmcodes = this.spliter(equal[0], '=')
                        jcode = this.jsonEventList().find(val => (val === `${jmcodes[0]}=` || val === `${noequal} ${jmcodes[0]}=`))
                        mcode = this.timeEventList().find(val => val === `${jmcodes[0]}=`)
                        if(jcode && jcode !== undefined){
                            jsonned = {json: jcode, depth: jmcodes[1]}
                        }else if(mcode && mcode !== undefined){
                            time = {code: mcode, value: jmcodes[1]}
                        }else{
                           if(equal.length === 1){
                               if(this.jsonEventList().find(val => val === `${equal[0]}=`) === undefined && this.timeEventList().find(val => val === `${equal[0]}=`) === undefined){
                                return this.emit('orders:error', {error: `'${equal[0]}' is not a valid option`})
                               }else{
                                   console.log('I am not sure ...')
                               }
                           }else{
                               if(jcode === undefined && mcode === undefined){
                                return this.emit('orders:error', {error: `'${equal[0]}' is not a valid option`})
                               }
                               console.log('Okay, we have no clues ....')
                               
                           }
                            
                        }

                        // console.log(equal)
                        // console.log(noequal)
                        if(equal[1] && equal[1] !== undefined){
                        
                            if(this.jsonEventList().find(val => val === noequal[0]) === undefined){
                                return this.emit('orders:error', {error: `'${noequal[0]}' is not a valid option.`})
                            }else{
                                jmcodes = this.spliter(equal[1], '=')
                            jcode = this.jsonEventList().find(val => (val === `${jmcodes[0]}=` || val === `${noequal} ${jmcodes[0]}=`))
                            mcode = this.timeEventList().find(val => val === `${jmcodes[0]}=`)
                            
                            let jc = `${noequal} ${equal[1]}`
                            // console.log(jc)
                            // console.log(jmcodes[1])
//orders --get --email=ericson.weah@gmail.com --days=3 --json --depth=

                            if(jcode && jcode !== undefined){

                                if(jmcodes[1] === undefined){
                                    return this.emit('orders:error', {error: `'${jc}' requires an argument.`})
                                }
                                jsonned = {json: jcode, depth: jmcodes[1]}

                            }else if(mcode && mcode !== undefined){
                                if(jmcodes[1] === undefined){
                                    return this.emit('orders:error', {error: `'${equal[1]}' requires an argument.`})
                                }

                                time = {code: mcode, value: jmcodes[1]}
                            }else{
                                
                                if(jcode === undefined && mcode === undefined){
                                    if(this.jsonEventList().find(val => val === noequal[0]) !== undefined){
                                        return this.emit('orders:error', {error: `'${jc}' is not a valid  option.....`})
                                    }
                                    
                                }
                                
                            }
                            }
                            
    
                        }else{
                           
                            if(noequal.length > 0){
                                ///console.log(equal)
                                for(let option of noequal){
                                    if(this.jsonEventList().find(val => val === option) === undefined && this.timeEventList().find(val => val === option) === undefined){
                                        return this.emit('orders:error', {error: `'${option}' is not a valid  option`})
                                    }
                                    if (this.timeEventList().find(val => val === option) === undefined) {
                                        if(this.jsonEventList().find(val => val === option) !== undefined){
                                            if(noequal.indexOf(option) < (noequal.length - 1)){
                                                return this.emit('orders:error', {error: `'${noequal[noequal.indexOf(option) + 1]}' requires an argument.`})
                                            }else{
                                                return this.emit('orders:error', {error: `'${option}' requires an argument.`})
                                            }
                                            
                                        }
                                    }
                                    if(this.jsonEventList().find(val => val === option) === undefined){
                                        if(this.timeEventList().find(val => val === option) !== undefined){
                                            return this.emit('orders:error', {error: `'${option}' is no longer a valid option: another time option is already in used in this command.`})

                                            // if(noequal.indexOf(option) < (noequal.length - 1)){
                                            //     return this.emit('orders:error', {error: `'${noequal[noequal.indexOf(option) + 1]}' requires an argument.`})
                                            // }else{
                                            //     return this.emit('orders:error', {error: `'${option}' requires an argument.`})
                                            // }
                                        }
                                    }
                                   
                            
                                }
                            }

                            
                        }

                    }else{
                       console.log('Ia mn ot too ss ...')
                    }

                    if (this.onvalidetimecode(time.code) === false) {
                        return this.emit('orders:error', {
                            error: `'${time.code}' is not a valid argument for '${event}'`
                        })
                    }
        
                    if (time.code === '--years=' || time.code === '-y' ) {
                        let ishOK = this.isValid(this.regexes().yregex, time.value)
                        if (ishOK === false) {
                            if(time.value === undefined){
                                return this.emit('orders:error', {
                                    error: `'${time.code}' requires an argument.`
                                })
                            }else{
                                return this.emit('orders:error', {
                                    error: `'${time.value}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                                })
                            }
                            
                        }
                    }

                    if (time.code === '--months=' || time.code === '-M' ) {
                        let ishOK = this.isValid(this.regexes().Mregex, time.value)
                        if (ishOK === false) {
                            if(time.value === undefined){
                                return this.emit('orders:error', {
                                    error: `'${time.code}' requires an argument.`
                                })
                            }else{
                                return this.emit('orders:error', {
                                    error: `'${time.value}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                                })
                            }
                           
                        }
                    }

                    if (time.code === '--days=' || time.code === '-d' ) {
                        let ishOK = this.isValid(this.regexes().dregex, time.value)
                        if (ishOK === false) {
                            if(time.value === undefined){
                                return this.emit('orders:error', {
                                    error: `'${time.code}' requires an argument.`
                                })
                            }else{
                                return this.emit('orders:error', {
                                    error: `'${time.value}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                                })
                            }
                           
                        }
                    }

                    if (time.code === '--hours=' || time.code === '-h' ) {
                        let ishOK = this.isValid(this.regexes().hregex, time.value)
                        if (ishOK === false) {
                            if(time.value === undefined){
                                return this.emit('orders:error', {
                                    error: `'${time.code}' requires an argument.`
                                })
                            }else{
                                return this.emit('orders:error', {
                                    error: `'${time.value}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                                })
                            }
                            
                        }
                    }
                    if (time.code === '--minutes=' || time.code === '-m') {
                        let ishOK = this.isValid(this.regexes().mregex, time.value)
                        if (ishOK === false || time.value === 0) {
                            if(time.value === undefined){
                                return this.emit('orders:error', {
                                    error: `'${time.code}' requires an argument.`
                                })
                            }else{
                                return this.emit('orders:error', {
                                    error: `'${time.value}' is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                                })
                            }
                            
                        }
                    }


                    // if (time.code === '--years=' || time.code === '-y' || time.code === '--years=' || time.code === '-y') {
                    //     let ishOK = this.isValid(this.regexes().yregex, time.value)
                    //     if (ishOK === false) {
                    //         return this.emit('orders:error', {
                    //             error: `'${time.value}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                    //         })
                    //     }
                    // }
        
                    // if (time.code === '--months=' || time.code === '-M' || time.code === '--months=' || time.code === '-M') {
                    //     let ishOK = this.isValid(this.regexes().Mregex, time.value)
                    //     if (ishOK === false) {
                    //         return this.emit('orders:error', {
                    //             error: `'${time.value}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                    //         })
                    //     }
                    // }
        
                    // if (time.code === '--days=' || time.code === '-d' || time.code === '--days=' || time.code === '-d') {
                    //     let ishOK = this.isValid(this.regexes().dregex, time.value)
                    //     if (ishOK === false) {
                    //         return this.emit('orders:error', {
                    //             error: `'${time.value}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                    //         })
                    //     }
                    // }
        
                    // if (time.code === '--hours=' || time.code === '-h' || time.code === '--hours=' || time.code === '-h') {
                    //     let ishOK = this.isValid(this.regexes().hregex, time.value)
                    //     if (ishOK === false) {
                    //         return this.emit('orders:error', {
                    //             error: `'${time.value}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                    //         })
                    //     }
                    // }
                    // if (time.code === '--minutes=' || time.code === '-m' || time.code === '--minutes=' || time.code === '-m') {
                    //     let ishOK = this.isValid(this.regexes().mregex, time.value)
                    //     if (ishOK === false || time.value === 0) {
                    //         return this.emit('orders:error', {
                    //             error: `'${time.value}' is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                    //         })
                    //     }
                    // }
                    if(jsonned!== undefined){
                        if(jsonned.depth !== undefined){
                            if(!this.isValid(this.regexes().jsonregex, jsonned.depth)){
                                return this.emit('orders:error', {error: `'${jsonned.depth}' is invalid. JSON depth level must be a number equal or greater than zero.`})
                            }
                        }
                    }
                    let data = {}
                    data.time = time 
                    data.jsonned = jsonned
                    //console.log(jsonned)

                    data.email = email
                    data.options = options
 
                    // orders --get --phone=6122071306 --json --depth=0 --years=40
                  ///console.log(data, 'here ...')
                //   return
                 let codeevent = `${email}:orders:${time.code}`
                 this.loadByEmail(codeevent, time.code)
                 this.emit(codeevent, data)
               
                    // equal[1]
                    //orders --get --phone=6122071306 --json --depth=0 --days=0
                }else if(equal === undefined && noequal === undefined){
                    console.log(' I am not too sure about this')
                }else{
                    console.log('We are not s ...')
                }

                // VISITED
            }else if(options.length === 4){
                
                // orders --get --phone=6122071306 --json -d 0 --hours=12
                // orders --get --phone=6122071306 --json --depth=0 -M 19
                // orders --get --phone=6122071306 --json -d 0 --months=12
                let equal = options.filter(val => val.includes('='))
                let noequal = options.filter(val => !val.includes('='))

                //console.log(equal, noequal)

                if (equal.length > 0 && noequal.length > 0) {
                   
                    let jcode, tcode, jcodes =[], tcodes = [], jtcodes, jsdepth, tvalue, time, jsonned, jtvalue, tcode1, jcode1, jvalue

                    jtcodes = this.spliter(equal[0], "=")
            
                    let matcher = `${jtcodes[0]}=`
                    let noe = noequal.filter(val => !this.isValid(this.regexes().jsonregex, val)).sort()
                    let noerrors = noequal.filter(val => !this.isValid(this.regexes().jsonregex, val))//.sort()
                    jtvalue = noequal.find(el => this.isValid(this.regexes().jsonregex, el))
                    
                    for (let op of noe) {
                        if (this.jsonEventList().find(val => val === op) !== undefined) {
                            for (let js of this.jsonEventList()) {
                                if (js.match(RegExp(matcher))) {
                                    jcode1 = `${op} ${matcher}`
                                    jvalue = jtcodes[1]
                                }
                            }
                        }
                        if (this.timeEventList().find(val => val === op) !== undefined) {
                            for (let ts of this.timeEventList()) {
                                if (ts.match(RegExp(matcher)) && op !== '-d') {
                                    tcode1 = `${op} ${matcher}`
                                    tvalue = jtcodes[1]
                                } 
                            }
                        }
                    }

                   for(let el of noequal){
                     jcodes.push(this.jsonEventList().find(val => val === el))
                     tcodes.push(this.timeEventList().find(val => val === el))
                   }
                  
                    jcodes = jcodes.filter(str => str !== undefined)
                    tcodes = tcodes.filter(str => str !== undefined)
                  
                    let val = noequal.find(val => (this.isValid(this.regexes().jsonregex, val)))

                 ///orders --get --email=ericson.weah@gmail.com --days=21 -j -d -19 
                    if(tcode1 === undefined && jcode1 === undefined){

                        time = {code: `${jtcodes[0]}=`, value: jtcodes[1]}
                        if(this.jsonEventList().find(val => val === `${noe[0]} ${noe[1]}`) !== undefined){
                            jsonned = {json: `${noe[0]} ${noe[1]}`, depth: val }
                        }else{
                            let _ev = `${noe[1]} ${noe[0]}`.trim()
                        
                            if(this.validateJsonEvent(_ev) === true){
                                jsonned = {json: `${noe[1]} ${noe[0]}`, depth: val }
                            }else{
                              
                                if(this.jsonEventList().find(val => val === noe[0] === undefined)){
                                    return this.emit('orders:error', {error: `'${noe[0]}' is not a valid option.`})
                                }
                                if(this.jsonEventList().find(val => val === noe[1] === undefined)){
                                    return this.emit('orders:error', {error: `'${noe[1]}' is not a valid option.`})
                                }
                                if(this.jsonEventList().find(val => val === `${noe[1]} ${noe[0]}`) === undefined){
                                    return this.emit('orders:error', {error: `'${noerrors.join(' ')}' is not a valid JSON option.`})
                                }
                                if(!this.isValid(this.regexes().jsonregex, noe[0])){
                                    if(typeof(parseInt(noe[0])) === 'number'){
                                        return this.emit('orders:error', {error: `'${noe[0]}' is not a valid argument. JSON depth level must be zero or a higher number.`})
                                    }else{
                                        return this.emit('orders:error', {error: `'${noe[0]}' is not a valid JSON option.`})
                                    }
                                    
                                }
                                
                                
                                
                            }
                        
                        }

                    }else if(jcode1 !== undefined && tcode1 === undefined){
                        jsonned = {json: jcode1, depth: jtcodes[1]}
                        let tcodes = []
                        for(let ts of noe){
                            tcodes.push(this.timeEventList().find(val => val === ts))
                      
                        }
                        tcodes = tcodes.filter(str => str !== undefined)

                        if(tcodes.length && tcodes.length > 0 && (!val || val === undefined)){
                            return this.emit('orders:error', {error: `'${val}' is not valid argument`})
                        }
                        if(tcodes.length > 0 && tcodes.length === 1){
                            time = {code: tcodes[0], value: val}
                        }
                    }else{
                      if(tcodes.length > 1){
                        return this.emit('orders:error', {error: `A time option is already is used: No more than one time option per command allowed. You may want to remove '${tcodes.join(' ')}'`})
                      }
                        console.log('not sure about tcode1 and jcode1')
                    }

            // orders --get --phone=6122071306 --json -d 8 --days=0
            // orders --get --phone=6122071306 --json --depth=8 -M 9
            if (this.onvalidetimecode(time.code) === false) {
                return this.emit('orders:error', {
                    error: `'${time.code}' is not a valid argument for '${event}'`
                })
            }

            if (time.code === '--years=' || time.code === '-y' || time.code === '--years=' || time.code === '-y') {
                let ishOK = this.isValid(this.regexes().yregex, time.value)
                if (ishOK === false) {
                    return this.emit('orders:error', {
                        error: `'${time.value}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                    })
                }
            }

            if (time.code === '--months=' || time.code === '-M' || time.code === '--months=' || time.code === '-M') {
                let ishOK = this.isValid(this.regexes().Mregex, time.value)
                if (ishOK === false) {
                    return this.emit('orders:error', {
                        error: `'${time.value}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                    })
                }
            }

            if (time.code === '--days=' || time.code === '-d' || time.code === '--days=' || time.code === '-d') {
                let ishOK = this.isValid(this.regexes().dregex, time.value)
                if (ishOK === false) {
                    return this.emit('orders:error', {
                        error: `'${time.value}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                    })
                }
            }

            if (time.code === '--hours=' || time.code === '-h' || time.code === '--hours=' || time.code === '-h') {
                let ishOK = this.isValid(this.regexes().hregex, time.value)
                if (ishOK === false) {
                    return this.emit('orders:error', {
                        error: `'${time.value}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                    })
                }
            }
            if (time.code === '--minutes=' || time.code === '-m' || time.code === '--minutes=' || time.code === '-m') {
                let ishOK = this.isValid(this.regexes().mregex, time.value)
                if (ishOK === false || time.value === 0) {
                    return this.emit('orders:error', {
                        error: `'${time.value}' is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                    })
                }
            }
                  let data = {}
                  data.time = time 
                  data.jsonned = jsonned

                  data.email = email
                  data.options = options

                  // orders --get --phone=6122071306 --json --depth=0 --years=40
                ///console.log(data, 'here ...')
              //   return
               let codeevent = `${email}:orders:${time.code}`
               this.loadByEmail(codeevent, time.code)
               this.emit(codeevent, data)
             

                  //orders --get --phone=6122071306 -y 40 --json --depth=0
                }else{
                    // orders --get --email=ericson.weah@gmail.com -j -d 0 -M
                    if(equal.length  === 0 && noequal.length > 0){
                       
                        // let validjcs = []
                        // let validtcs = []
                        // let invalids = []
                        // options.forEach((x,y) =>{
                        //     this.jsonEventList().forEach((js, jsindex) =>{
                        //         if(x === js){
                        //             validjcs.push(x)
                        //         }
                        //     })
                        //     this.timeEventList().forEach((ts, tsindex) =>{
                        //         if(x === ts){
                        //             validtcs.push(x)
                        //         }
                        //     })

                        // })

                        // console.log(validjcs)
                        // console.log(validjcs)
                        // return 

                       let jcs = options.filter(val => this.jsonEventList().find(e => e === val))
                       let tcs = options.filter(val => this.timeEventList().find(e => e === val))
                       let jsc
                       let jtva
                       let dep
                       let val 
                    //    console.log(jcs)
                    //    console.log(tcs)
                    //    return 
                       if(tcs.length === 2 && tcs.includes('-d')){
                           jsc = `${jcs[0]} ${tcs[tcs.indexOf('-d')]}`
                       }
                       //orders --get --email=ericson.weah@gmail.com -j -d -M 10
                       for (let x of options) {
                           if (x !== '-d' && x !== '-y' && x !== '-M' && x !== '-h' && x !== '-m') {

                               if (!this.isValid(this.regexes().jsonregex, x)) {
                                   return this.emit('orders:error', {
                                       error: `${x} is not valid option`
                                   })
                               }

                           }
                           if (x === '-d') {
                               //   console.log(options[y+1])
                               dep = options[options.indexOf('-d') + 1]

                               if (dep === undefined) {
                                   return this.emit('orders:error', {
                                       error: `'${x}' requires an argument`
                                   })
                               }
                               if (dep === '-M' || dep === '-y' || dep === '-h' || dep === '-m') {
                                   return this.emit('orders:error', {
                                       error: `'${x}' requires an argument`
                                   })
                               }
                               if (typeof (dep) !== 'number') {
                                   return this.emit('orders:error', {
                                       error: `The argument for '${x}' must be number`
                                   })
                               }
                               if (!this.isValid(this.regexes().jsonregex, dep)) {
                                   return this.emit('orders:error', {
                                       error: `'${dep}' is an invalid argument. Must be a positive number`
                                   })
                               }

                           }
                           if (x === '-y') {
                               val = options[options.indexOf('-y') + 1]
                               if (val === undefined) {
                                   return this.emit('orders:error', {
                                       error: `'${x}' requires an argument`
                                   })
                               }
                           }
                           if (x === '-M') {
                               val = options[options.indexOf('-M') + 1]
                               if (val === undefined) {
                                   return this.emit('orders:error', {
                                       error: `'${x}' requires an argument`
                                   })
                               }
                           }
                           if (x === '-d') {
                               val = options[options.indexOf('-d') + 1]
                               if (val === undefined) {
                                   return this.emit('orders:error', {
                                       error: `'${x}' requires an argument`
                                   })
                               }
                           }
                           if (x === '-h') {
                               val = options[options.indexOf('-h')+ 1]
                               if (val === undefined) {
                                   return this.emit('orders:error', {
                                       error: `'${x}' requires an argument`
                                   })
                               }
                           }
                           if (x === '-m') {
                               val = options[options.indexOf('-m') + 1]
                               if (val === undefined) {
                                   return this.emit('orders:error', {
                                       error: `'${x}' requires an argument`
                                   })
                               }
                           }
                       }
                    //     options.forEach((x, y) => {
                    //         if(x !== '-d' && x !=='-y' && x !=='-M' && x !=='-h' && x !== '-m' ){
                                
                    //             if(!this.isValid(this.regexes().jsonregex, x)){
                    //                 return this.emit('orders:error', {error: `${x} is not valid option`})
                    //             }
                    //             return 
                    //         }
                    //        if(x === '-d'){
                    //         //   console.log(options[y+1])
                    //           dep = options[y + 1]
                              
                    //             if(dep === undefined){
                    //                 return this.emit('orders:error', {
                    //                     error: `'${x}' requires an argument`
                    //                 })
                    //             }
                    //             if(dep === '-M' || dep ==='-y' || dep ==='-h' || dep ==='-m'){
                    //                 return this.emit('orders:error', {
                    //                     error: `'${x}' requires an argument`
                    //                 })
                    //             }
                    //             if(typeof(dep) !== 'number'){
                    //                 return this.emit('orders:error', {
                    //                     error: `The argument for '${x}' must be number`
                    //                 })
                    //             }
                    //             if(!this.isValid(this.regexes().jsonregex, dep)){
                    //                 return this.emit('orders:error', {
                    //                     error: `'${dep}' is an invalid argument. Must be a positive number`
                    //                 })
                    //             }
                              
                    //        }
                    //        if(x === '-y'){
                    //           val = options[y + 1]
                    //             if(val === undefined){
                    //                 return this.emit('orders:error', {
                    //                     error: `'${x}' requires an argument`
                    //                 })
                    //             }
                    //        }
                    //        if(x === '-M'){
                    //         val = options[y + 1]
                    //           if(val === undefined){
                    //               return this.emit('orders:error', {
                    //                   error: `'${x}' requires an argument`
                    //               })
                    //           }
                    //      }
                    //      if(x === '-d'){
                    //         val = options[y + 1]
                    //           if(val === undefined){
                    //               return this.emit('orders:error', {
                    //                   error: `'${x}' requires an argument`
                    //               })
                    //           }
                    //      }
                    //      if(x === '-h'){
                    //         val = options[y + 1]
                    //           if(val === undefined){
                    //               return this.emit('orders:error', {
                    //                   error: `'${x}' requires an argument`
                    //               })
                    //           }
                    //      }
                    //      if(x === '-m'){
                    //         val = options[y + 1]
                    //           if(val === undefined){
                    //               return this.emit('orders:error', {
                    //                   error: `'${x}' requires an argument`
                    //               })
                    //           }
                    //      }
                    //    })

                    
                    }else{
                        console.log('I do not know')
                    }
                    if(equal.length  > 0 && noequal.length  == 0){
                        console.log( ' sdfsfsdf no sut')
                    }
                    
                }
                
            }else if(options.length === 5){
                let invalidtc = this.exclude(this.timeEventList(),options, true)
                let invalidjc = this.exclude(this.jsonEventList(),options, true)

                // console.log(invalidtc)
                // console.log(invalidjc)
                // return 
              
                if(invalidtc.length> 0){
                    let checkjc = this.exclude(this.jsonEventList(), invalidtc)
                    if(checkjc.length > 0 && (checkjc[0] !=='-j' || checkjc[0] !=='--json')){
                        return this.emit('orders:error', {error: `'${checkjc[0]}' is not a valid option`})
                    }
                }
                if(invalidjc.length> 0){
                    let checktc = this.exclude(this.timeEventList(), invalidjc)
                    if(checktc.length > 0){
                        return this.emit('orders:error', {error: `'${checktc[0]}' is not a valid option`})
                    }
                }
                //return 
                // if(invalidcodes.length > 0){
                //     return this.emit('orders:error', {error: `'${invalidcodes[0]}' is not a valid option`})
                // }
                // orders --get --phone=6122071306 --json -d 0 -M 10
                let  jcodes =[], tcodes = [], tvalue, jvalue, time, jsonned, jtvalues, common , tvc,jvc

                for(let el of options){
                    jcodes.push(this.jsonEventList().find(val => val === el))
                    tcodes.push(this.timeEventList().find(val => val === el))
                }
                jtvalues = options.filter(val => this.isValid(this.regexes().jsonregex, val))
  
                let str = this.spliter(original[0], email)
                let finders = this.spliter(str[0], '-')

                let jtester=[], ttester =[], fd
                for(let find of finders){
                    if(find.trim().length >= 3){
                        fd = `-${find[0]}`
                        if(this.timeEventList().find(val => val === fd) !== undefined){
                            ttester.push(find)
                        }
                        if(this.jsonEventList().find(val => val === fd) !== undefined){
                            jtester.push(find)
                        }
                    }
                }
             
                tcodes = tcodes.filter(str => str !== undefined)
                jcodes = jcodes.filter(str => str !== undefined)

                if(tcodes.length && tcodes.length > 0){

                    // COMPLETE FOR NOW
                    if(tcodes.length === 2){
                     
                        if(tcodes[0] === tcodes[1]){

                            jsonned = {json: `${jcodes[0]} ${tcodes[0]}`, depth: 0}
                            time = {code: tcodes[0], value: 0}

                            // console.log(jsonned)
                            // return

                            // orders --get --phone=6122071306 --json -d 0 -d 10
                            // orders --get --phone=6122071306 -d 0 -j -d 10
                            let valueFinder = this.spliter(str[0], jsonned.json)
                  
                            if(valueFinder.length && valueFinder.length === 2){
                                jvalue = valueFinder[1]
                                tvalue = this.spliter(valueFinder[0], ' ')[1]
                            }
                            if(valueFinder.length && valueFinder.length === 1){
                                jvalue = this.spliter(valueFinder[0], '-d')[0]
                                tvalue = this.spliter(valueFinder[0], '-d')[1]
                            }

                            jsonned = {json: `${jcodes[0]} ${tcodes[tcodes.indexOf('-d')]}`, depth: jvalue}
                            time = {code: tcodes.find(val => val === '-d'), value: tvalue}
                            // console.log(jsonned)
                            // return 
                     
                        }else if(tcodes.indexOf('-d') > -1){

                            jsonned = {json: `${jcodes[0]} ${tcodes[tcodes.indexOf('-d')]}`, depth: 0}
                            time = {code: tcodes.find(val => val !== '-d'), value: 0}
                            // console.log(jsonned)
                            // return

                            let tval = this.spliter(time.code, '-')
                            let jval = this.spliter(tcodes[tcodes.indexOf('-d')], '-')
                        
                            for(let tt of ttester){
                                if(tt.indexOf(tval[0]) > -1){
                                    tvalue = this.spliter(tt, ' ')[1]
                                }
                                if(tt.indexOf(jval[0]) > -1){
                                    jvalue = this.spliter(tt, ' ')[1]
                                }
                            }

                            jsonned = {json: `${jcodes[0]} ${tcodes[tcodes.indexOf('-d')]}`, depth: jvalue}
                            time = {code: tcodes.find(val => val !== '-d'), value: tvalue}
                            
                        
                            for(let x of options){
                                if(x === '-d'){
                                    if(parseInt(options[options.indexOf('-d') + 1]) < 0){
                                        return this.emit('orders:error', {
                                            error: `'${options[options.indexOf('-d') + 1]}' is not a valid argument for '${jsonned.json}'. Json depth level must be a number equal to zero or greater than zero`
                                        })
                                    }
                                }
                                if(x ==='-y'){
                                    if(parseInt(options[options.indexOf('-y') + 1]) < 0){
                                        return this.emit('orders:error', {
                                            error: `'${options[options.indexOf('-y') + 1]}' is not a valid argument for '${x}'. Number of years must be positive number`
                                        })
                                    }
                                }
                                if(x ==='-M'){
                                    if(parseInt(options[options.indexOf('-M') + 1]) < 0){
                                        return this.emit('orders:error', {
                                            error: `'${options[options.indexOf('-M') + 1]}' is not a valid argument for '${x}'.  Number of months must be from 1 to 11`
                                        })
                                    }
                                }
                                if(x ==='-h'){
                                    if(parseInt(options[options.indexOf('-h') + 1]) < 0){
                                        return this.emit('orders:error', {
                                            error: `'${options[options.indexOf('-h') + 1]}' is not a valid argument for '${x}'. Number of hours must be from 1 to 23`
                                        })
                                    }
                                }
                                if(x ==='-m'){
                                    if(parseInt(options[options.indexOf('-m') + 1]) < 0){
                                        return this.emit('orders:error', {
                                            error: `'${options[options.indexOf('-m') + 1]}' is not a valid argument for '${x}'. Number of minutes must be from 1 to 59`
                                        })
                                    }
                                }
                                if(x ==='-d'){
                                    if(parseInt(options[options.indexOf('-d') + 1]) < 0){
                                        return this.emit('orders:error', {
                                            error: `'${options[options.indexOf('-d') + 1]}' is not a valid argument for '${x}'. Number of days must be from 1 to 30`
                                        })
                                    }
                                }
                            }
                           
                            // if(parseInt(jvc) < 0){
                            //     return this.emit('orders:error', {
                            //         error: `'${jvc}' is not a valid argument for '${jsonned.json}'`
                            //     })
                            // }
                            // if(parseInt(tvc) < 0){
                            //     return this.emit('orders:error', {
                            //         error: `'${tvc}' is not a valid argument for '${time.code}'`
                            //     })
                            // }

                            // orders --get --email=ericson.weah@gmail.com -M 10 -j -d -0
                        }else{
                            console.log('What is this?')
                        }
                    }
                }else{
                    console.log('ook cool')
                }
             
                if (this.onvalidetimecode(time.code) === false) {
                    return this.emit('orders:error', {
                        error: `'${time.code}' is not a valid argument for '${event}'`
                    })
                }
    
                if (time.code === '-y') {
                    let ishOK = this.isValid(this.regexes().yregex, time.value)
                    if (ishOK === false) {
                        return this.emit('orders:error', {
                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of years must be a positive whole number.`
                        })
                    }
                }
    
                if (time.code === '-M') {
                    let ishOK = this.isValid(this.regexes().Mregex, time.value)
                    if (ishOK === false) {
                        return this.emit('orders:error', {
                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of months must be from 1 to 11.`
                        })
                    }
                }
    
                if (time.code === '-d') {
                    let ishOK = this.isValid(this.regexes().dregex, time.value)
                    if (ishOK === false) {
                        return this.emit('orders:error', {
                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of days must be from 1 to 30.`
                        })
                    }
                }
    
                if (time.code === '-h') {
                    let ishOK = this.isValid(this.regexes().hregex, time.value)
                    if (ishOK === false) {
                        return this.emit('orders:error', {
                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of hours must be from 1 to 23.`
                        })
                    }
                }
                if (time.code === '-m') {
                    let ishOK = this.isValid(this.regexes().mregex, time.value)
                    if (ishOK === false || time.value === 0) {
                        return this.emit('orders:error', {
                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of minutes must be from 1 to 59.`
                        })
                    }
                }
                // let data = {}
                // data.time = time 
                // data.jsonned = jsonned 
                // console.log(data)
                if(jsonned && jsonned.depth && jsonned.depth < 0){
                   
                    return this.emit('orders:error', {
                        error: `'${jsonned.depth}' is not a valid argument for '${jsonned.json}'! Json depth level must be zero or higher.`
                    })
                }
                if(jvc && jvc < 0){
                    // console.log( 'adsfsadf')
                    return this.emit('orders:error', {
                        error: `'${jvc}' is not a valid argument for '${jsonned.json}'! Json depth level must be zero or higher.`
                    })
                }
              
               
               
                // let invalidtc = this.exlude(options, this.timeEventList(), true)
            
                // if(invalidtc.length > 0 ){
                //    if(invalidtc.length === 1){
                //         if(this.exlude(options, this.jsonEventList(), true).length === 0){
                //             return this.emit('orders:error', {
                //                 error: `'${invalidtc.join(' ')}' is not a valid JSON option...`
                //             })
                //         }
                //    }
                // }
               
                if(this.jsonEventList().find(val => val === jsonned.json) === undefined){
                    return this.emit('orders:error', {
                        error: `'${jcodes}' is not a valid JSON option.`
                    })
                }
                if(!this.isValid(this.regexes().jsonregex, jsonned.depth)){

                    return this.emit('orders:error', {
                        error: `'${jsonned.depth}' is not a valid argument! Json depth level must be zero or a higher number.`
                    })
                }
                if(time.code === undefined && time.value !== undefined){
                    return this.emit('orders:error', {
                        error: `'${time.value}' is not valid just itself.`
                    })
                }
                let data = {}
                // console.log(time)
                // return 
                data.time = time 
                data.jsonned = jsonned

                data.email = email
                data.options = options
             
             let codeevent = `${email}:orders:${time.code}`
             this.loadByEmail(codeevent, time.code)
             this.emit(codeevent, data)
               
            }else{
                return this.emit('orders:error', {error: `INVALIDE NUMBER OF OPTIONS! PLEASE SEE 'man orders' FOR USAGE`})
            }
        }
    }

}
module.exports = ByEMAIL

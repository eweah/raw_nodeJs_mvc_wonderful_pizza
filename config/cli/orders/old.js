'use strict'

const {createReadStream,promises} = require('fs')
const path = require('path')
const util = require('util')

const CLI = require('..')



class OrderCommand extends CLI {

    constructor() {
        super()
        this.autobind(OrderCommand)
        this.autoinvoker(OrderCommand)
        this.guestorders =[]
        this.setMaxListeners(Infinity)
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
        return [ 'init','commands', 'login', 'common', 'notACommand']
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
        this.once('order-found', async orderdata => {
            //console.log(data.order)
            let path = orderdata.order.guest ? `guestshippings` : `shippings`
           
            let data = {}
            let billing = {}
            let customer = {}
            data.guest = orderdata.order.guest

            try{
                let  shippings = await this.findAll(path)//.then(shippings => {

                for(let shipping of shippings){
                  let shippinpath = `${this.base()}/${path}/${shipping}`
                  let readable = createReadStream(shippinpath, 'utf-8')
                  
                  readable.on('error', error => {
                      return this.emit('error', {error: `Shipping with id ${shipping} does not exist`})
                  })
                  readable.on('data', chunk => {
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
                  })
                  readable.on('end', () => {
                     return this.emit('shipping-found', data)
                  })
                }
           
            }catch(error){
                return this.emit('error', {error: error})
            }

            
        })

       

    }
   
   

  
    
    async getOrders(string, args) {

       let checkstring = this.spliter(string, ' ')
    
       if(checkstring.length === 4 || checkstring.length === 3 || checkstring.length === 2 || checkstring.length=== 5){
            
        }else{
            return this.emit('error', {
                error: `'${string}'  has invalid number of arguments `
            })
        }
        const option = this.spliter(string, 'orders')
      
        if (!option || option.length === 0) return
        if(option.length !== 1){
            return this.emit('error', {
                error: `'${option}' is not a valid argument for 'orders ${args}' `
            })
        }

        try{
            let orderIds = await this.findAll('orders')
            let orders = []
            for(let id of orderIds){
                let path = `${this.base()}/orders/${id}`
                let readable = createReadStream(path,  'utf-8')
                readable.on('error', () => {

                })
                readable.on('data', chunk =>{
                    orders.push(JSON.parse(chunk))
                })
                readable.on('end', () =>{
                   if(orders.length === orderIds.length){
                     this.emit('all-orders', orders)
                   }
                })
            }
        }catch(error){
            this.emit('error', {error: 'Internal ERROR: could not get orders'})
        }
        let matcher = this.spliter(option[0], args)

        if(option[0].length === 6 || option[0].length === 2){
            if(option[0] === '--load' || option[0] === '-l'){
                this.on('all-orders', orders =>{
                    this.emit('show-all-orders', orders,{message: ''}, {message: 'ALL ORDERS IN THE SYSTEM'})
                })
            }
        } 
        if(args === '--load --json' || args === '--load -j' || args === '-l --json' || args === '-l -j'){
            this.once('all-orders', orders => {
               console.log(util.inspect(orders, {showHidden: true, depth: Infinity, colors: true}))
            })
        }
        if(args === '--load --json -d' || args === '--load --json --depth=' || args === '--load -j -d' || args === '--load -j --depth=' || args === '-l --json -d' || args === '-l --json --depth=' || args === '-l -j -d' || args === '-l -j --depth='){
            this.once('all-orders', orders => {
               console.log(util.inspect(orders, {showHidden: true, depth: parseInt(matcher[0]), colors: true}))
            })
        }

        if(args === '--load --months=' || args === '-l --months='){
                this.once('all-orders', orders => {
                    let months = parseInt(matcher[0])
                    let chosenmonth = orders.filter(order => this.onmonths(order.created_at) <= months)
                    if (chosenmonth.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${months} ${this.pluralize('month', months)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-month', chosenmonth,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${months} ${this.pluralize('month', months).toLocaleUpperCase()}`})
                })
        } 
        if(args === '--load -M' || args === '-l -M'){
                this.once('all-orders', orders => {
                    let months = parseInt(matcher[0])
                    let chosenmonth = orders.filter(order => this.onmonths(order.created_at) <= months)
                    if (chosenmonth.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${months} ${this.pluralize('month', months)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-month', chosenmonth,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${months} ${this.pluralize('month', months).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load --years=' || args ==='-l --years='){
                this.once('all-orders', orders => {
                    let years = parseInt(matcher[0])
                    let chosenyear = orders.filter(order => this.onyears(order.created_at) <= years)
                    if (chosenyear.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${years} ${this.pluralize('year', years)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-year', chosenyear,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${years} ${this.pluralize('year', years).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load -y' || args ==='-l -y'){
                this.once('all-orders', orders => {
                    let years = parseInt(matcher[0])
                    let chosenyear = orders.filter(order => this.onyears(order.created_at) <= years)
                    if (chosenyear.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${years} ${this.pluralize('year', years)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-year', chosenyear,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${years} ${this.pluralize('year', years).toLocaleUpperCase()}`})
                })
        }

        if(args === '--load --days=' || args === '-l --days='){
                this.once('all-orders', orders => {
                    let days = parseInt(matcher[0])
                    let chosenday = orders.filter(order => this.ondays(order.created_at) <= days)
                    if (chosenday.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${days} ${this.pluralize('day', days)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-day', chosenday,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${days} ${this.pluralize('day', days).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load -d' || args === '-l -d'){
                this.once('all-orders', orders => {
                    let days = parseInt(matcher[0])
                    let chosenday = orders.filter(order => this.ondays(order.created_at) <= days)
                    if (chosenday.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${days} ${this.pluralize('day', days)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-day', chosenday,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${days} ${this.pluralize('day', days).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load --hours=' || args === '-l --hours='){
              this.once('all-orders', orders => {
                  let hours = parseInt(matcher[0])
                  let chosenhour = orders.filter(order => this.ondays(order.created_at) === 0 && this.onhours(order.created_at) <= hours)
                  if (chosenhour.length === 0) {
                      return this.emit('error', {
                          error: `No order was placed within the last ${hours} ${this.pluralize('hour', hours)}`
                      })
                  }
                  return this.emit('show-all-orders-within-chosen-hour', chosenhour, {message: 'ALL ORDERS WITHIN THE LAST'},{message: `${hours} ${this.pluralize('hour', hours).toLocaleUpperCase()}`})
              })
        }
        if(args === '--load -h' || args === '-l -h'){
              this.once('all-orders', orders => {
                  let hours = parseInt(matcher[0])
                  let chosenhour = orders.filter(order => this.ondays(order.created_at) === 0 && this.onhours(order.created_at) <= hours)
                  if (chosenhour.length === 0) {
                      return this.emit('error', {
                          error: `No order was placed within the last ${hours} ${this.pluralize('hour', hours)}`
                      })
                  }
                  return this.emit('show-all-orders-within-chosen-hour', chosenhour, {message: 'ALL ORDERS WITHIN THE LAST'},{message: `${hours} ${this.pluralize('hour', hours).toLocaleUpperCase()}`})
              })
        }
        if(args === '--load --minutes=' || args === '-l --minutes='){
                this.once('all-orders', orders => {
                    let minutes = parseInt(matcher[0])
                    let chosenminute = orders.filter(order => this.ondays(order.created_at) === 0 && this.onhours(order.created_at) === 0 && this.onminutes(order.created_at) <= minutes)
                    if (chosenminute.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${minutes} ${this.pluralize('minute', minutes)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-minute', chosenminute,{message: 'ALL ORDERS WITHIN THE LAST'},{message: `${minutes} ${this.pluralize('minutes', minutes).toLocaleUpperCase()}`})
                })
          }
          if(args === '--load -m' || args === '-l -m'){
                this.once('all-orders', orders => {
                    let minutes = parseInt(matcher[0])
                    let chosenminute = orders.filter(order => this.ondays(order.created_at) === 0 && this.onhours(order.created_at) === 0 && this.onminutes(order.created_at) <= minutes)
                    if (chosenminute.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${minutes} ${this.pluralize('minute', minutes)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-minute', chosenminute,{message: 'ALL ORDERS WITHIN THE LAST'},{message: `${minutes} ${this.pluralize('minutes', minutes).toLocaleUpperCase()}`})
                })
          }

        this.ondisplayforchosentime('show-all-orders-within-chosen-year', 'ALL ORDERS CHOSEN YEARS')          
        this.ondisplayforchosentime('show-all-orders-within-chosen-month', 'ALL ORDERS CHOSEN MONTHS')
        this.ondisplayforchosentime('show-all-orders-within-chosen-minute', 'ALL ORDERS CHOSEN MINUTES')
        this.ondisplayforchosentime('show-all-orders-within-chosen-hour', 'ALL ORDERS CHOSEN HOURS')
        this.ondisplayforchosentime('show-all-orders-within-chosen-day', 'ALL ORDERS CHOSEN DAYS')
        this.ondisplayforchosentime('show-all-orders', 'ALL ORDERS IN SYSTEM')

    }
   load(event) {
      this.findAll('orders')
           .then(orderIds => {
               let orders = []
               for (let id of orderIds) {
                   let path = `${this.base()}/orders/${id}`
                   let readable = createReadStream(path, 'utf-8')
                   readable.on('error', () => {})
                   readable.on('data', chunk => {
                       orders.push(JSON.parse(chunk))
                   })
                   readable.on('end', () => {
                       if (orders.length === orderIds.length) {
                           return this.emit(event, orders)
                       }
                   })
               }
           })
           .catch(error => {
               this.emit('error', {
                   error: 'Internal ERROR: could not get orders',
                   error
               })
           })
   }
   getOrderJsonFormat(){
       this.load('orders-available')
       this.once('-l -y', data => {
           this.once('orders-available', orders => {
               let years = parseInt(data.years)
               let chosenyear = orders.filter(order => this.onyears(order.created_at) <= years)
               if (chosenyear.length === 0) {
                   return this.emit('error', {
                       error: `No order was placed within the last ${years} ${this.pluralize('year', years)}`
                   })
               }
               console.log()
               console.log(util.inspect(chosenyear, {
                   showHidden: true,
                   colors: true,
                   depth: data.depth
               }))
           })
       })
    }
    // onjson(option) {

    //     let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //     let mregex = /^[0-5]?[0-9]$/gm
    //     let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //     let Mregex = /^(1[0-1]|[1-9])$/gm
    //     let yregex = /^[0-9]?[0-9]$/gm
    //     let Dregex = /^[0-9]?[0-9]$/gm
    //     let jsonregex = /^[0-9]?[0-9]$/gm
    //     let validOptions = [
    //         '-j',
    //         '--json',
    //         '-j -d',
    //         '-j --depth=',
    //         '--json -d',
    //         '--json --depth='
    //     ]

    //     let original = this.spliter(option.string, `orders ${option.event}`)
    //     let orig = this.spliter(original[0], ' ')

    //     if (yregex.test(parseInt(orig[0])) === false) {
    //         return this.emit('error', {
    //             error: `'${orig[0]}' is not a valid argument for 'orders ${option.event}'! ${option.message}`
    //         })
    //     }

    //     let options = []
    //     for (let i = 1; i < orig.length; i++) {
    //         options.push(orig[i])
    //     }
    //     if (options.length === 0) {
    //         return this.getOrders(option.string, option.event)
    //     } else {
    //         let data = {
    //             options,
    //             years: orig[0],
    //             valid: option.validOption,
    //             validOptions
    //         }
    //         this.onpreparejson(option.event)
    //         return this.emit(option.event, data)
    //     }
    //     return
    // }
    onpreparejson(event) {
        this.once(event, data => {
            if (data.options.length === 1 || data.options.length === 2 || data.options.length === 3) {
                let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
                let mregex = /^[0-5]?[0-9]$/gm
                let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
                let Mregex = /^(1[0-1]|[1-9])$/gm
                let yregex = /^[0-9]?[0-9]$/gm
                let Dregex = /^[0-9]?[0-9]$/gm
                let jsonregex = /^[0-9]?[0-9]$/gm
                //if(options.length == 2){
                let option = data.options.join(' ')

                let jsondepth = data.validOptions.find(valid => option.startsWith(valid) && valid === data.valid)
              

                if (!jsondepth || jsondepth === undefined) {
                    return this.emit('error', {
                        error: `'${option}' is not a valid argument for 'orders ${event}'! Must a be json argument. Please orders man page or 'orders --help'.`
                    })
                }
                if (jsondepth && jsondepth !== undefined) {
                    //onsole.log(arg)
                    let argument = this.spliter(option, jsondepth)[0]
                    let validargument = parseInt(this.spliter(option, jsondepth)[0], 10)
                    let isValidargumentOk = jsonregex.test(validargument)
                    if (isValidargumentOk === false) {
                        return this.emit('error', {
                            error: `'${argument}' is not a valid argument for '${jsondepth}'! Arguement must a positive whole number.`
                        })
                    }
                    if (isValidargumentOk == true) {
                        let datum = {
                            years: data.years,
                            depth: argument
                        }
                         this.emit(event, datum)
                        return this.getOrderJsonFormat()
                       
                    }
                    return
                }
            } else {
                console.log('error: invalid number of arguments')
            }
        })
    }
    onglobalordermatch(string){
        const validate = (regex, input) => regex.test(input)
        const checker = code => this.spliter(string,code)[0]
        const isValid = (regex, code) => validate(regex, checker(code))

        let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
        let mregex = /^[0-5]?[0-9]$/gm
        let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
        let Mregex = /^(1[0-1]|[1-9])$/gm
        let yregex = /^[0-9]?[0-9]$/gm
        let Dregex = /^[0-9]?[0-9]$/gm
        let jsonregex = /^[0-9]?[0-9]$/gm

        if(string.trim().startsWith('orders --load')){
            if(string.trim().length === 'orders --load'.length){
                this.getOrders(string,'--load')
            }
            if(string.trim().startsWith('orders --load -j')){
                if(string.trim() === 'orders --load -j'){
                    return this.getOrders(string,'--load -j')
                }

                if(string.trim().match(/orders --load -j -d/)){
                    if (string.trim().length > 'orders --load -j -d'.length){
                        
                        if(isValid(Dregex,'orders --load -j -d')){
                            this.getOrders(string, '--load -j -d')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders --load -j -d')}' is not a valid argument for 'orders --load -j -d'! Number of days must be a positive whole number.`
                            })
                        }

                        // year and json
                        
                    }
                }
                else if(string.trim().match(/orders --load -j --depth=/)){
                    if (string.trim().length > 'orders --load -j --depth='.length){
                        
                        if(isValid(Dregex,'orders --load -j --depth=')){
                            this.getOrders(string, '--load -j --depth=')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders --load -j --depth=')}' is not a valid argument for 'orders --load -j --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                }else{
                    return this.emit('error', {
                        error: `'${checker('orders --load -j')}' is not a valid argument for 'orders --load --json'` 
                    })
                }
            }
            else if(string.trim().startsWith('orders --load --json')){

                if(string.trim() === 'orders --load --json'){
                    return this.getOrders(string,'--load --json')
                }
                if(string.trim().match(/orders --load --json -d/)){
                    if (string.trim().length > 'orders --load --json -d'.length){
                        
                        if(isValid(Dregex,'orders --load --json -d')){
                            this.getOrders(string, '--load --json -d')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders --load --json -d')}' is not a valid argument for 'orders --load --json -d'! Number of days must be a positive whole number.`
                            })
                        }
                    }
                }
                 else if(string.trim().match(/orders --load --json --depth=/)){
                    if (string.trim().length > 'orders --load --json --depth='.length){
                        if(isValid(Dregex,'orders --load --json --depth=')){
                            this.getOrders(string, '--load --json --depth=')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders --load --json --depth=')}' is not a valid argument for 'orders --load --json --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                }else{
                    return this.emit('error', {
                        error: `'${checker('orders --load --json')}' is not a valid argument for 'orders --load --json'` 
                    })
                }
            }
            
           
            // Years
            if(string.match(/orders --load -y/)){
                if(string.trim().length > 'orders --load -y'.length){
                    if(isValid(yregex,'orders --load -y')){
                        this.getOrders(string, '--load -y')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load -y')}' is not a valid argument for 'orders --load -y'! Number of days must be a positive whole number.`
                        })
                    }
                }
            }else if(string.match(/orders --load --years=/)){
                if(string.trim().length > 'orders --load --years='.length){
                    if(isValid(yregex,'orders --load --years=')){
                        this.getOrders(string, '--load --years=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load --years=')}' is not a valid argument for 'orders --load --years='! Number of days must be a positive whole number.`
                        })
                    }
                }
            }
            
            // months
            if(string.match(/orders --load -M/)){
                if(string.trim().length > 'orders --load -M'.length){
                    if(isValid(Mregex,'orders --load -M')){
                        this.getOrders(string, '--load -M')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load -M')}' is not a valid argument for 'orders --load -M'! Number of months must be a positive whole number from 1 to 11.`
                        })
                    }
                }
            }else if(string.match(/orders --load --months=/)){
                if(string.trim().length > 'orders --load --months='.length){
                    if(isValid(Mregex,'orders --load --months=')){
                        this.getOrders(string, '--load --months=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load --months=')}' is not a valid argument for 'orders --load --months='! Number of months must be a positive whole number from 1 to 11.`
                        })
                    }
                }
            }
            // days
            if(string.match(/orders --load -d/)){
                if(string.trim().length > 'orders --load -d'.length){
                    if(isValid(dregex,'orders --load -d')){
                        this.getOrders(string, '--load -d')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load -d')}' is not a valid argument for 'orders --load -d'! Number of days must be a positive whole number from 1 to 30.`
                        })
                    }
                }
            }else if(string.match(/orders --load --days=/)){
                if(string.trim().length > 'orders --load --days='.length){
                    if(isValid(dregex,'orders --load --days=')){
                        this.getOrders(string, '--load --days=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load --days=')}' is not a valid argument for 'orders --load --days='! Number of days must be a positive whole number from 1 to 30.`
                        })
                    }
                }
        
            }else if(string.match(/orders --load --hours=/)){
                if(string.trim().length > 'orders --load --hours='.length){
                    if(isValid(hregex,'orders --load --hours=')){
                        this.getOrders(string, '--load --hours=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load --hours=')}' is not a valid argument for 'orders --load --hours='! Number of days must be a positive whole number from 1 to 23.`
                        })
                    }
                }
            }else if(string.match(/orders --load -h/)){
                if(string.trim().length > 'orders --load -h'.length){
                    if(isValid(hregex,'orders --load -h')){
                        this.getOrders(string, '--load -h')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load -h')}' is not a valid argument for 'orders --load -h'! Number of days must be a positive whole number from 1 to 23.`
                        })
                    }
                }

            }else if(string.match(/orders --load --minutes=/)){
                if(string.trim().length > 'orders --load --minutes='.length){
                    if(isValid(mregex,'orders --load --minutes=')){
                        this.getOrders(string, '--load --minutes=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load --minutes=')}' is not a valid argument for 'orders --load --minutes='! Number of days must be a positive whole number from 1 to 59.`
                        })
                    }
                }
            }else if(string.match(/orders --load -m/)){
                if(string.trim().length > 'orders --load -m'.length){
                    if(isValid(mregex,'orders --load -m')){
                        this.getOrders(string, '--load -m')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders --load -m')}' is not a valid argument for 'orders --load -m'! Number of days must be a positive whole number from 1 to 59.`
                        })
                    }
                }
            }else if(string.match(/orders --load/)){
                if(string === 'orders --load'){
                    //this.getOrders(string, '--load')
                }
                else if(string === 'orders --load -j'){

                }
                else if(string === 'orders --load --json'){

                }

                else if(string.trim().length > 'orders --load -j -d'.length || string.trim() === 'orders --load -j -d' ){

                }
                else if(string.trim().length > 'orders --load --json -d'.length || string.trim() === 'orders --load --json -d' ){

                }
                else if(string.trim().length > 'orders --load -j --depth='.length || string.trim() === 'orders --load -j --depth=' ){

                }
                else if(string.trim().length > 'orders --load --json --depth='.length || string.trim() === 'orders --load --json --depth=' ){

                }
                else {
                    this.emit('error', {error: `'${string}' is not valid command!`})
                }
            }else {
               this.emit('error', {error: `'${string}' is not valid command!`})
            }
        }
        else if(string.trim().startsWith('orders -l')){
            if(string.trim().length === 'orders -l'.length){
                this.getOrders(string,'-l')
            }


            if(string.trim().startsWith('orders -l -j')){
                if(string.trim() === 'orders -l -j'){
                    return this.getOrders(string,'-l -j')
                }

                if(string.trim().match(/orders -l -j -d/)){
                    if (string.trim().length > 'orders -l -j -d'.length){
                        
                        if(isValid(Dregex,'orders -l -j -d')){
                            this.getOrders(string, '-l -j -d')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders -l -j -d')}' is not a valid argument for 'orders -l -j -d'! Number of days must be a positive whole number.`
                            })
                        }
                    }
                }
                else if(string.trim().match(/orders -l -j --depth=/)){
                    if (string.trim().length > 'orders -l -j --depth='.length){
                        
                        if(isValid(Dregex,'orders -l -j --depth=')){
                            this.getOrders(string, '-l -j --depth=')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders -l -j --depth=')}' is not a valid argument for 'orders -l -j --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                }else{
                    return this.emit('error', {
                        error: `'${checker('orders -l -j')}' is not a valid argument for 'orders -l --json'` 
                    })
                }
                
               
            }
            else if(string.trim().startsWith('orders -l --json')){

                if(string.trim() === 'orders -l --json'){
                    return this.getOrders(string,'-l --json')
                }
                if(string.trim().match(/orders -l --json -d/)){
                    if (string.trim().length > 'orders -l --json -d'.length){
                        
                        if(isValid(Dregex,'orders -l --json -d')){
                            this.getOrders(string, '-l --json -d')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders -l --json -d')}' is not a valid argument for 'orders -l --json -d'! Number of days must be a positive whole number.`
                            })
                        }
                    }
                }
                 else if(string.trim().match(/orders -l --json --depth=/)){
                    if (string.trim().length > 'orders -l --json --depth='.length){
                        if(isValid(Dregex,'orders -l --json --depth=')){
                            this.getOrders(string, '-l --json --depth=')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders -l --json --depth=')}' is not a valid argument for 'orders -l --json --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                }else{
                    return this.emit('error', {
                        error: `'${checker('orders -l --json')}' is not a valid argument for 'orders -l --json'` 
                    })
                }
            }
          
            // Years
           else if(string.match(/orders -l -y/)){

                if(string.trim().length > 'orders -l -y'.length){  

                    let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
                    let mregex = /^[0-5]?[0-9]$/gm
                    let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
                    let Mregex = /^(1[0-1]|[1-9])$/gm
                    let yregex = /^[0-9]?[0-9]$/gm
                    let Dregex = /^[0-9]?[0-9]$/gm
                    let jsonregex = /^[0-9]?[0-9]$/gm
                    let validOptions = [
                        '-j',
                        '--json',
                        '-j -d',
                        '-j --depth=',
                        '--json -d',
                        '--json --depth='
                    ]
            
                    let original = this.spliter(string, `orders -l -y`)
                    let orig = this.spliter(original[0], ' ')
            
                    if (yregex.test(parseInt(orig[0])) === false) {
                        return this.emit('error', {
                            error: `'${orig[0]}' is not a valid argument for 'orders -l -y'! Number of years must be a positive whole number`
                        })
                    }
            
                    let options = []
                    for (let i = 1; i < orig.length; i++) {
                        options.push(orig[i])
                    }
                
                    if (options.length === 0) {
                        return this.getOrders(string, '-l -y')
                    } else {
                       
                        if (options.length <= 3) {
                            let option = options.join(' ')
    
                            // jsondepth
                            let jsondepth = validOptions.find(valid => option.startsWith(valid) && valid === '--json --depth=')
                            let jsond = validOptions.find(valid => option.startsWith(valid) && valid === '--json -d')
                            let jdepth = validOptions.find(valid => option.startsWith(valid) && valid === '-j --depth=')
                            let jd = validOptions.find(valid => option.startsWith(valid) && valid === '-j -d')
                            let j = validOptions.find(valid => option.startsWith(valid) && valid === '-j')
                            let json = validOptions.find(valid => option.startsWith(valid) && valid === '--json')
    
                            let validarray = [jsondepth, jsond, jdepth, jd, j, json].filter(val => val !== undefined)

                            if(validarray.length === 1 && validarray[0] !== undefined){
                                if(validarray[0] === '-j' || validarray[0] === '--json'){
                                    let datum = {
                                        years: orig[0],
                                        depth: Infinity
                                    }                      
                                        this.getOrderJsonFormat()
                                        this.emit('-l -y', datum)
                                    
                                }else{
                                    return this.emit('error', {
                                        error: `'${argument[0]}' is not a valid argument for '${validarray[0]}'! Arguement must a positive whole number.`
                                    })
                                }
                            }
                            if(validarray.length === 2 && validarray[0] !== undefined && validarray[1] !== undefined){
                                let argument = this.spliter(option, validarray[0])[0]
                                let validargument = parseInt(this.spliter(option, validarray[0])[0], 10)
                                let isValidargumentOk = jsonregex.test(validargument)
    
                                if (isValidargumentOk === false) {
                                    return this.emit('error', {
                                        error: `'${argument}' is not a valid argument for '${validarray[0]}'! Arguement must a positive whole number.`
                                    })
                                }

                                if (isValidargumentOk === true) {
                                    let datum = {
                                            years: orig[0],
                                            depth: argument
                                        }
                                    this.getOrderJsonFormat()
                                    this.emit('-l -y', datum)
                                }
                            }
    
                        } else {
                            return this.emit('error', {
                                error: `'${options}' invalid number of arguments!`
                            })
                        }
                    }
                  
                }
                
            }else if(string.match(/orders -l --years=/)){
                if(string.trim().length > 'orders -l --years='.length){
                    if(isValid(yregex,'orders -l --years=')){
                        this.getOrders(string, '-l --years=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l --years=')}' is not a valid argument for 'orders -l --years='! Number of days must be a positive whole number from 1 to 59.`
                        })
                    }
                }
            }
    
            // months
            if(string.match(/orders -l -M/)){
                if(string.trim().length > 'orders -l -M'.length){
                    if(isValid(Mregex,'orders -l -M')){
                        this.getOrders(string, '-l -M')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l -M')}' is not a valid argument for 'orders -l -M'! Number of months must be a positive whole number from 0 to 11.`
                        })
                    }
                }
            }else if(string.match(/orders -l --months=/)){
                if(string.trim().length > 'orders -l --months='.length){
                        if(isValid(Mregex,'orders -l --months=')){
                            this.getOrders(string, '-l --months=')
                        }else{
                            return this.emit('error', {
                                error: `'${checker('orders -l --months=')}' is not a valid argument for 'orders -l --months='! Number of months must be a positive whole number from 0 to 11.`
                            })
                        }
                }
            }
            // days
            if(string.match(/orders -l -d/)){
                if(string.trim().length > 'orders -l -d'.length){
                    if(isValid(dregex,'orders -l -d')){
                        this.getOrders(string, '-l -d')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l -d')}' is not a valid argument for 'orders -l -d'! Number of days must be a positive whole number from 1 to 30.`
                        })
                    }
                }
            }else if(string.match(/orders -l --days=/)){
                if(string.trim().length > 'orders -l --days='.length){
                    if(isValid(dregex,'orders -l --days=')){
                        this.getOrders(string, '-l --days=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l --days=')}' is not a valid argument for 'orders -l --days='! Number of days must be a positive whole number from 1 to 30.`
                        })
                    }
                }
            // hours
            }else if(string.match(/orders -l --hours=/)){
                if(string.trim().length > 'orders -l --hours='.length){
                    if(isValid(hregex,'orders -l --hours=')){
                        this.getOrders(string, '-l --hours=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l --hours=')}' is not a valid argument for 'orders -l --hours='! Number of days must be a positive whole number from 1 to 30.`
                        })
                    }
                }
            }else if(string.match(/orders -l -h/)){
                if(string.trim().length > 'orders -l -h'.length){
                    if(isValid(hregex,'orders -l -h')){
                        this.getOrders(string, '-l -h')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l -h')}' is not a valid argument for 'orders -l -h'! Number of days must be a positive whole number from 1 to 30.`
                        })
                    }
                }
            // minutes
            }else if(string.match(/orders l --minutes=/)){
                if(string.trim().length > 'orders -l --minutes='.length){
                    if(isValid(mregex,'orders -l --minutes=')){
                        this.getOrders(string, '-l --minutes=')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l --minutes=')}' is not a valid argument for 'orders -l --minutes='! Number of days must be a positive whole number from 1 to 59.`
                        })
                    }
                }
            }else if(string.match(/orders -l -m/)){
                if(string.trim().length > 'orders -l -m'.length){
                    if(isValid(mregex,'orders -l -m')){
                        this.getOrders(string, '-l -m')
                    }else{
                        return this.emit('error', {
                            error: `'${checker('orders -l -m')}' is not a valid argument for 'orders -l -m'! Number of days must be a positive whole number from 1 to 59.`
                        })
                    }
                }
            }else if(string.match(/orders -l/)){
                if(string === 'orders -l'){
                   // this.getOrders(string, '-l')
                }
                else if(string === 'orders -l -j'){

                }
                else if(string.trim().length >'orders -l -y'.length || string === 'orders -l -y'){

                }
                else if(string === 'orders -l --json'){

                }
                else if(string.trim().length > 'orders -l -j -d'.length || string.trim() === 'orders -l -j -d' ){

                }
                else if(string.trim().length > 'orders -l --json -d'.length || string.trim() === 'orders -l --json -d' ){

                }
                else if(string.trim().length > 'orders -l -j --depth='.length || string.trim() === 'orders -l -j --depth=' ){

                }
                else if(string.trim().length > 'orders -l --json --depth='.length || string.trim() === 'orders -l --json --depth=' ){

                }
                else{
                   return this.emit('error', {error: `'${string}' is not valid  command! 1`})
                }
            }
            else {
               return this.emit('error', {error: `'${string}' is not valid command! 2`})
            }
        }



       
        else if(string.trim().startsWith('orders -g -i')){
            if(string.trim().length > 'orders -g -i'.length){
                this.getOrderByID(string, '-g -i')
            }
        }
        else if(string.trim().startsWith('orders -g --id=')){
            if(string.trim().length > 'orders -g --id='.length){
                this.getOrderByID(string, '-g --id=')
            }
        }
        else if(string.trim().startsWith('orders --get -i')){
           if(string.trim().length > 'orders --get -i'.length){
            this.getOrderByID(string, '--get -i')
           }
        }
        else if(string.trim().startsWith('orders --get --id=')){
            if(string.trim().length > 'orders --get --id='.length){
                this.getOrderByID(string, '--get --id=')
            }
        }
        else if(string.trim().startsWith('orders -g -p')){
            if(string.trim().length > 'orders -g -p'.length){
                this.getOrderByPHONE(string, '-g -p')
            }
        }
        else if(string.trim().startsWith('orders -g --phone=')){
            if(string.trim().length > 'orders -g --phone='){
                this.getOrderByPHONE(string, '-g --phone=')
            }
        }
        else if(string.trim().startsWith('orders --get -p')){
            if(string.trim().length > 'orders --get -p'.length){
                this.getOrderByPHONE(string, '--get -p')
            }
        }
        else if(string.trim().startsWith('orders --get --phone=')){
            this.getOrderByPHONE(string, '--get --phone=')
        }
        else if(string.trim().startsWith('orders -g -e')){
            if(string.trim().length > 'orders -g -e'.length){
                this.getOrderByEMAIL(string, '-g -e')
            }
        }
        else if(string.trim().startsWith('orders -g --email=')){
            if(string.trim().length > 'orders -g --email='.length){
                this.getOrderByEMAIL(string, '-g --email=')
            }
        }
        else if(string.trim().startsWith('orders --get -e')){
            if(string.trim().length > 'orders --get -e'.length){
                this.getOrderByEMAIL(string, '--get -e')
            }
        }
        else if(string.trim().startsWith('orders --get --email=')){
            if(string.trim().length > 'orders --get --email='.length){
                this.getOrderByEMAIL(string, '--get --email=')
            }
        }
        else if(string.trim().startsWith('orders -h')){
            if(string.trim().length  === 'orders -h'.length){
                this.help(string)
            }else{
                this.emit('error', {error: `'${string}' is not valid command!`})
            }
        } else if(string.trim().startsWith('orders --help')){
            if(string.trim().length  === 'orders --help'.length){
                this.help(string)
            }else{
                //this.emit('error', {error: `'${string}' is not valid command!`})
            }
        }
        else if(string.trim().startsWith('orders') && string.trim().length === 'orders'.length){
            //this.emit('orders')
        }
        else {
            this.emit('error', {error: `'${string}' is not valid command!`})
        }
    }
   onmacthgetorderbyid(string){
    if(string.match(/-g -i/)){
        this.getOrderByID(string, '-g -i')
    }
    if(string.match(/-g --id=/)){
        this.getOrderByID(string, '-g --id=')
    }
    if(string.match(/--get -i/)){
        this.getOrderByID(string, '--get -i')
    }
    if(string.match(/--get --id=/)){
        this.getOrderByID(string, '--get --id=')
    }
   }
   onmacthgetorderbyphone(string){
    if(string.match(/-g -p/)){
        this.getOrderByPHONE(string, '-g -p')
    }
    if(string.match(/-g --phone=/)){
        this.getOrderByPHONE(string, '-g --phone=')
    }
    if(string.match(/--get -p/)){
        this.getOrderByPHONE(string, '--get -p')
    }
    if(string.match(/--get --phone=/)){
        this.getOrderByPHONE(string, '--get --phone=')
    }
   }
   onmacthgetorderbypemail(string){
    if(string.match(/-g -e/)){
        this.getOrderByEMAIL(string, '-g -e')
    }
    if(string.match(/-g --email=/)){
        this.getOrderByEMAIL(string, '-g --email=')
    }
    if(string.match(/--get -e/)){
        this.getOrderByEMAIL(string, '--get -e')
    }
    if(string.match(/--get --email=/)){
        this.getOrderByEMAIL(string, '--get --email=')
    }
   }
    commands() {
        this.on('orders', async string => {
            let cleaned = this.clean(string)
       
            this.orderscommand(cleaned)
            this.onglobalordermatch(cleaned)
            // this.onmacthgetorderbyid(string)
            // this.onmacthgetorderbyphone(string)
            // this.onmacthgetorderbypemail(string)
        })
    }

    help(string){
        const commands = {
            '-h': 'or \x1b[36m--help\x1b[0m        Help',
            '-l': 'or \x1b[36m--load\x1b[0m        Users',
            '-g': 'or \x1b[36m--get\x1b[0m         Order by id (phone, or email): [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m ]',
            '-i': 'or \x1b[36m--id\x1b[0m          Order with the specified id: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m ]',
            '-p': 'or \x1b[36m--phone\x1b[0m       Orders with the specified phone: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m ]',
            '-n': 'or \x1b[36m--number\x1b[0m      Order number of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-n \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--number\x1b[0m]',
            '-s': 'or \x1b[36m--shipping\x1b[0m    Shipping details of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-s \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--shipping\x1b[0m]',
            '-c': 'or \x1b[36m--card\x1b[0m        Card of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-c \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--card\x1b[0m]',
            '-P': 'or \x1b[36m--products\x1b[0m    Products of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-P \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--products\x1b[0m]',
    
        }

        let clean = string.split(' ').filter(str => str !== '').join(' ')
        let command = clean.split('orders')

        if (string  === 'orders' || string === 'orders -h' || string === 'orders --help') {
            console.clear()
                       let centered = `\x1b[36mNAME\x1b[0m
\x1b[36morders\x1b[0m -- Application orders and a order's details 

\x1b[36mSYPNOSIS\x1b[0m
\x1b[36morders\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
\x1b[36morders\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m] 
\x1b[36morders\x1b[0m [\x1b[36m--get --phone=\x1b[0m|\x1b[36m--get -p \x1b[0m|\x1b[36m-g --phone=\x1b[0m|\x1b[36m-g -p \x1b[0m]\x1b[4mphone\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]
\x1b[36morders\x1b[0m [\x1b[36m--get --email=\x1b[0m|\x1b[36m--get -e \x1b[0m|\x1b[36m-g --email=\x1b[0m|\x1b[36m-g -e \x1b[0m]\x1b[4memail\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]
\x1b[36morders\x1b[0m [\x1b[36m--get --id=\x1b[0m|\x1b[36m--get -i \x1b[0m|\x1b[36m-g --id=\x1b[0m|\x1b[36m-g -i \x1b[0m]\x1b[4morder_id\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]

\x1b[36mDESCRIPTION\x1b[0m
Application orders and a user's details  

        `
        //this.horizontalLine()
        this.centered(`\x1b[32mORDERS HELP AND USAGE MANUAL\x1b[0m`)
        //this.horizontalLine()
        this.description(centered)
        //this.horizontalLine()
        this.verticalSpace(2)
    
        // Show each command followed by its explanation in white and yellow respectively
    
        // for (let key in commands) {
        //     if (commands.hasOwnProperty(key)) {
        //         let value = commands[key]
        //         let line = `\x1b[36m${key}\x1b[0m`
        //         let padding = 65 - line.length
        //         for (let i = 0; i < padding; i++) {
        //             line += ' '
        //         }
        //         line += value
        //         console.log(line)
        //         //this.verticalSpace(1)
        //     }
        // }
        let  options = {pad: 15, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
        this.texAligner(options, commands)
        console.log()
        //this.horizontalLine()
            
        }
    }
    orderscommand(string){
        const commands = {
            '-h': 'or \x1b[36m--help\x1b[0m        Help',
            '-l': 'or \x1b[36m--load\x1b[0m        Users',
            '-g': 'or \x1b[36m--get\x1b[0m         Order by id (phone, or email): [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m ]',
            '-i': 'or \x1b[36m--id\x1b[0m          Order with the specified id: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m ]',
            '-p': 'or \x1b[36m--phone\x1b[0m       Orders with the specified phone: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m ]',
            '-n': 'or \x1b[36m--number\x1b[0m      Order number of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-n \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--number\x1b[0m]',
            '-s': 'or \x1b[36m--shipping\x1b[0m    Shipping details of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-s \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--shipping\x1b[0m]',
            '-c': 'or \x1b[36m--card\x1b[0m        Card of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-c \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--card\x1b[0m]',
            '-P': 'or \x1b[36m--products\x1b[0m    Products of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-P \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--products\x1b[0m]',
    
        }

        let clean = string.split(' ').filter(str => str !== '').join(' ')
        let command = clean.split('orders')

        if (string  === 'orders' || string === 'orders -h' || string === 'orders --help') {
            console.clear()
                       let centered = `\x1b[36mNAME\x1b[0m
\x1b[36morders\x1b[0m -- Application orders and a order's details 

\x1b[36mSYPNOSIS\x1b[0m
\x1b[36morders\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
\x1b[36morders\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m][ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|\x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m 
\x1b[36morders\x1b[0m [\x1b[36m--get --phone=\x1b[0m|\x1b[36m--get -p \x1b[0m|\x1b[36m-g --phone=\x1b[0m|\x1b[36m-g -p \x1b[0m]\x1b[4mphone\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]
\x1b[36morders\x1b[0m [\x1b[36m--get --email=\x1b[0m|\x1b[36m--get -e \x1b[0m|\x1b[36m-g --email=\x1b[0m|\x1b[36m-g -e \x1b[0m]\x1b[4memail\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]
\x1b[36morders\x1b[0m [\x1b[36m--get --id=\x1b[0m|\x1b[36m--get -i \x1b[0m|\x1b[36m-g --id=\x1b[0m|\x1b[36m-g -i \x1b[0m]\x1b[4morder_id\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]

\x1b[36mDESCRIPTION\x1b[0m
Application orders and a user's details  

        `
        //this.horizontalLine()
        this.centered(`\x1b[32mORDERS HELP AND USAGE MANUAL\x1b[0m`)
        //this.horizontalLine()
        this.description(centered)
        //this.horizontalLine()
        this.verticalSpace(2)
    
        // Show each command followed by its explanation in white and yellow respectively
    
        // for (let key in commands) {
        //     if (commands.hasOwnProperty(key)) {
        //         let value = commands[key]
        //         let line = `\x1b[36m${key}\x1b[0m`
        //         let padding = 65 - line.length
        //         for (let i = 0; i < padding; i++) {
        //             line += ' '
        //         }
        //         line += value
        //         console.log(line)
        //         //this.verticalSpace(1)
        //     }
        // }
        let  options = {pad: 15, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
        this.texAligner(options, commands)
        console.log()
        //this.horizontalLine()
            
        }
        //'orders -l -j -d'

        if(clean === 'orders --load -j -d'){
            let error = `\x1b[31morders: orders \x1b[31m '--load -j -d'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load -j -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --load -j --depth='){
            let error = `\x1b[31morders: orders \x1b[31m '--load -j --depth='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load -j --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders --load --json -d'){
            let error = `\x1b[31morders: orders \x1b[31m '--load --json -d'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load --json -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --load --json --depth='){
            let error = `\x1b[31morders: orders \x1b[31m '--load --json --depth='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load --json --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }







        if(clean === 'orders -l -j -d'){
            let error = `\x1b[31morders: orders \x1b[31m '-l -j -d'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l -j -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l -j --depth='){
            let error = `\x1b[31morders: orders \x1b[31m '-l -j --depth='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l -j --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders -l --json -d'){
            let error = `\x1b[31morders: orders \x1b[31m '-l --json -d'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l --json -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l --json --depth='){
            let error = `\x1b[31morders: orders \x1b[31m '-l --json --depth='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l --json --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }






        if(clean === 'orders --load --years='){
            let error = `\x1b[31morders: orders \x1b[31m '--load --years='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load --years=\x1b[0m\x1b[4mnumber_of_years\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l --years='){
            let error = `\x1b[31morders: orders \x1b[31m '-l --years='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l --years=\x1b[0m\x1b[4mnumber_of_years\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders --load -y'){
            let error = `\x1b[31morders: orders \x1b[31m '--load -y'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load -y \x1b[0m\x1b[4mnumber_of_years\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l -y'){
            let error = `\x1b[31morders: orders \x1b[31m '-l -y'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l -y \x1b[0m\x1b[4mnumber_of_years\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }


        // Handling error 

        if(clean === 'orders --load --months='){
            let error = `\x1b[31morders: orders \x1b[31m '--load --months='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load --months=\x1b[0m\x1b[4mnumber_of_months\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l --months='){
            let error = `\x1b[31morders: orders \x1b[31m '-l --months='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l --months=\x1b[0m\x1b[4mnumber_of_months\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders --load -M'){
            let error = `\x1b[31morders: orders \x1b[31m '--load -m'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load -M \x1b[0m\x1b[4mnumber_of_months\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l -M'){
            let error = `\x1b[31morders: orders \x1b[31m '-l -M'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l -M \x1b[0m\x1b[4mnumber_of_months\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }





        if(clean === 'orders --load --days='){
            let error = `\x1b[31morders: orders \x1b[31m '--load --days='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load --days=\x1b[0m\x1b[4mnumber_of_days\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l --days='){
            let error = `\x1b[31morders: orders \x1b[31m '-l --days='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l --days=\x1b[0m\x1b[4mnumber_of_days\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders --load -d'){
            let error = `\x1b[31morders: orders \x1b[31m '--load -d'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load -d \x1b[0m\x1b[4mnumber_of_days\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l -d'){
            let error = `\x1b[31morders: orders \x1b[31m '-l -d'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l -d \x1b[0m\x1b[4mnumber_of_days\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }





        if(clean === 'orders --load --hours='){
            let error = `\x1b[31morders: orders \x1b[31m '--load --hours='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load --hours=\x1b[0m\x1b[4mnumber_of_hours\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l --hours='){
            let error = `\x1b[31morders: orders \x1b[31m '-l --hours='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l --hours=\x1b[0m\x1b[4mnumber_of_hours\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders --load -h'){
            let error = `\x1b[31morders: orders \x1b[31m '--load -h'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load -h \x1b[0m\x1b[4mnumber_of_hours\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l -h'){
            let error = `\x1b[31morders: orders \x1b[31m '-l -h'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l -h \x1b[0m\x1b[4mnumber_of_hours\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }






        if(clean === 'orders --load --minutes='){
            let error = `\x1b[31morders: orders \x1b[31m '--load --minutes='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load --minutes=\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l --minutes='){
            let error = `\x1b[31morders: orders \x1b[31m '-l --minutes='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l --minutes=\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders --load -m'){
            let error = `\x1b[31morders: orders \x1b[31m '--load -m'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--load -m \x1b[0m\x1b[4mnumber_of_minutes\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -l -m'){
            let error = `\x1b[31morders: orders \x1b[31m '-l -m'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-l -m \x1b[0m\x1b[4mnumber_of_minutes\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        
        




        if(clean === 'orders -g -i'){
            let error = `\x1b[31morders: orders \x1b[31m '-g -i'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -g --id='){
            let error = `\x1b[31morders: orders \x1b[31m '-g --id='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --get --id='){
            let error = `\x1b[31morders: orders \x1b[31m '--get --id='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --get -i'){
            let error = `\x1b[31morders: orders \x1b[31m '--get -i'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[4m\x1b[32mUsage\x1b[0m\x1b[32m:\x1b[0m\x1b[0m \x1b[36morders\x1b[0m  \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }


        if(clean === 'orders -g -p'){
            let error = `\x1b[31morders: orders \x1b[31m '-g -p'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -g --phone='){
            let error = `\x1b[31morders: orders \x1b[31m '-g --phone='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --get --phone='){
            let error = `\x1b[31morders: orders \x1b[31m '--get --phone='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --get -p'){
            let error = `\x1b[31morders: orders \x1b[31m '--get -p'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[4m\x1b[32mUsage\x1b[0m\x1b[32m:\x1b[0m\x1b[0m \x1b[36morders\x1b[0m  \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }

        if(clean === 'orders -g -e'){
            let error = `\x1b[31morders: orders \x1b[31m '-g -e'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders -g --email='){
            let error = `\x1b[31morders: orders \x1b[31m '-g --phone='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --get --email='){
            let error = `\x1b[31morders: orders \x1b[31m '--get --email='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36morders\x1b[0m  \x1b[36m--get --email=\x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(clean === 'orders --get -e'){
            let error = `\x1b[31morders: orders \x1b[31m '--get -e'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[4m\x1b[32mUsage\x1b[0m\x1b[32m:\x1b[0m\x1b[0m \x1b[36morders\x1b[0m  \x1b[36m--get -e \x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
    }


}

module.exports = OrderCommand

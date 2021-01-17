'use strict'

const {createReadStream,promises} = require('fs')
const path = require('path')
const util = require('util')

const MenuCommand = require('../menu')

class OrderCommand extends MenuCommand {

    constructor() {
        super()
        this.autobind(OrderCommand)
        this.autoinvoker(OrderCommand)
        this.guestorders =[]
        this.setMaxListeners(Infinity)
    }
    orders(){
        return [
            'orders',
            'orders -h',
            'orders --help',
            // Load orders 
            'orders -l',
            'orders --load',
            // Get orders 
            // Get orders 
            'orders -g -i',
            'orders --get -i',
            'orders -g --id',
            'orders --get --id',
            // Delete user
            // 'orders -d -p',
            // 'orders --delete -p',
            // 'orders -d --phone',
            // 'orders --delete --phone',
          
        ]
    }
    orderMatches(){
        return [
            '--l', '--load',
            '-g -i', '-g -e', '-g -p',
            '-g --id=', '-g --email=', '-g --phone=',
            '--get -i', '--get -e', '--get -p',
            '--get --id=', '--get --email=', '--get --phone='
        ]
    }
    orderOptions(){
         return [
            '-h', '--help',
            '-g', '--get',
            '-i', '--id',
            '-e', '--email',
            '-p', '--phone',
            '-n', '--number',
            '-c', '--card',
            '-P', '--products',
            '-l', '--load',
            '-s', '--shipping'

        ]
    }
   
    getorder(orderId){
        let path = `${this.base()}/orders/${orderId}.json`
        let readable = createReadStream(path, 'utf-8')
        let order = {}
        readable.on('error', error => {
            return this.emit('orders:error', {error: `Order with id ${orderId} does not exists.`})
        })
         readable.on('data', chunk => {
             order = JSON.parse(chunk)
         })
         readable.on('end', () => {
           return  this.emit('order-found', {order})
         })
    }
    ongetorderbyid(orderId, event){
        let path = `${this.base()}/orders/${orderId}.json`
        let readable = createReadStream(path, 'utf-8')
        let order = {}
        readable.on('error', error => {
            return this.emit('orders:error', {error: `Order with id ${orderId} does not exists.`})
        })
         readable.on('data', chunk => {
             order = JSON.parse(chunk)
         })
         readable.on('end', () => {
           return  this.emit(event, {order})
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
                      return this.emit('orders:error', {error: `Shipping with id ${shipping} does not exist`})
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
                return this.emit('orders:error', {error: error})
            } 
        })
    }
    ordersNotifications() {
        this.on('orders:error', data => {
            console.log()
            console.log(`\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b\[31m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('orders:warning', data => {
            console.log()
            console.log(`\x1b[33m \x1b[4mATTENTION\x1b[0m\x1b[33m:\x1b[0m \x1b\[33m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('orders:info', data => {
            console.log()
            console.log(`\x1b[36m \x1b[4mINFO\x1b[0m\x1b[36m:\x1b[0m \x1b\[36m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('orders:success', data => {
            console.log()
            console.log(`\x1b[32m \x1b[4mOK\x1b[0m\x1b[32m:\x1b[0m \x1b\[32m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
    }
    async getOrders(string, args) {

       let checkstring = this.spliter(string, ' ')
      
       if(checkstring.length === 4 || checkstring.length === 3 || checkstring.length === 2 || checkstring.length=== 5){
            
        }else{
            return this.emit('orders:error', {
                error: `'${string}'  has invalid number of arguments `
            })
        }
        const option = this.spliter(string, 'orders')
      
        if (!option || option.length === 0) return
        if(option.length !== 1){
            return this.emit('orders:error', {
                error: `'${option}' is not a valid argument for 'orders ${args}' `
            })
        }
        let matcher = this.spliter(option[0], args)

        if(option[0].length === 6 || option[0].length === 2){
            this.load('system-orders')
            if((option[0] === '--load' || option[0] === '-l') &&(string === 'orders --load' || string=== 'orders -l')){
                this.on('system-orders', orders =>{
                    return this.emit('show-all-orders', orders,{message: ''}, {message: 'ALL ORDERS IN THE SYSTEM'})
                })
            }
        } 
        if(args === '--load --json' || args === '--load -j' || args === '-l --json' || args === '-l -j'){
            this.load('load--json')
            this.once('load--json', orders => {
               console.log(util.inspect(orders, {showHidden: true, depth: Infinity, colors: true}))
            })
        }
        if(args === '--load --json -d' || args === '--load --json --depth=' || args === '--load -j -d' || args === '--load -j --depth=' || args === '-l --json -d' || args === '-l --json --depth=' || args === '-l -j -d' || args === '-l -j --depth='){
            this.load('loading--json')
            this.once('loading--json', orders => {
               console.log(util.inspect(orders, {showHidden: true, depth: parseInt(matcher[0]), colors: true}))
            })
        }

        
        if(args === '--load --months=' || args === '-l --months='){
            this.load('load--months')
                this.once('load--months', orders => {
                    let months = parseInt(matcher[0])
                    let isMOK = this.isValid(this.regexes().Mregex, months)
                    if(isMOK === false || months === 0){
                        console.log()
                        return this.emit('orders:error', {
                            error: `Invalid input! Number of month must be from 1 to 11.`
                        })
                    }
                    let chosenmonth = orders.filter(order => (this.onmonths(order.created_at) <= months))
                    if (chosenmonth.length === 0) {
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${months} ${this.pluralize('month', months)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-month-months', chosenmonth,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${months} ${this.pluralize('month', months).toLocaleUpperCase()}`})
                })
        } 
        if(args === '--load -M' || args === '-l -M'){
            this.load('load--M')
                this.once('load--M', orders => {
                    let months = parseInt(matcher[0])
                    let isMOK = this.isValid(this.regexes().Mregex, months)
                    if(isMOK === false || months === 0){
                        console.log()
                        return this.emit('orders:error', {
                            error: `Invalid input! Number of month must be from 1 to 11.`
                        })
                    }
                    let chosenmonth = orders.filter(order => (this.onmonths(order.created_at) <= months))
                    if (chosenmonth.length === 0) {
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${months} ${this.pluralize('month', months)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-month-m', chosenmonth,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${months} ${this.pluralize('month', months).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load --years=' || args ==='-l --years='){
               this.load('load--years')
                this.once('load--years', orders => {
                    let years = parseInt(matcher[0])
                    let chosenyear = orders.filter(order => (this.onyears(order.created_at) <= years)) 
                    if (chosenyear.length === 0) {
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${years} ${this.pluralize('year', years)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-year-years', chosenyear,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${years} ${this.pluralize('year', years).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load -y' || args ==='-l -y'){
            this.load('load--y')
                this.once('load--y', orders => {
                    let years = parseInt(matcher[0])
                    let chosenyear = orders.filter(order => (this.onyears(order.created_at) <= years))
                    if (chosenyear.length === 0) {
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${years} ${this.pluralize('year', years)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-year-y', chosenyear,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${years} ${this.pluralize('year', years).toLocaleUpperCase()}`})
                })
        }

        if(args === '--load --days=' || args === '-l --days='){
            this.load('load--days')
                this.once('load--days', orders => {
                    let days = parseInt(matcher[0])
                    let isdOK = this.isValid(this.regexes().dregex, days)
                    if(isdOK === false){
                        console.log()
                        return this.emit('orders:error', {
                            error: `Invalid input! Number of days must be from 1 to 30.`
                        })
                    }
                    let chosenday = orders.filter(order =>(this.ondays(order.created_at) <= days))
                    if (chosenday.length === 0) {
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${days} ${this.pluralize('day', days)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-day-days', chosenday,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${days} ${this.pluralize('day', days).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load -d' || args === '-l -d'){
            this.load('load--d')
                this.once('load--d', orders => {
                    let days = parseInt(matcher[0])
                    let isdOK = this.isValid(this.regexes().dregex, days)
                    if(isdOK === false){
                        console.log()
                        return this.emit('orders:error', {
                            error: `Invalid input! Number of days must be from 1 to 30.`
                        })
                    }
                    let chosenday = orders.filter(order => (this.ondays(order.created_at) <= days))
                    if (chosenday.length === 0) {
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${days} ${this.pluralize('day', days)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-day-d', chosenday,{message: 'ALL ORDERS WITHIN THE LAST'}, {message: `${days} ${this.pluralize('day', days).toLocaleUpperCase()}`})
                })
        }
        if(args === '--load --hours=' || args === '-l --hours='){
            this.load('load--hours')
              this.once('load--hours', orders => {
                  let hours = parseInt(matcher[0])
                  let ishOK = this.isValid(this.regexes().hregex, hours)
                  if(ishOK === false || hours === 0){
                      console.log()
                      return this.emit('orders:error', {
                          error: `Invalid input! Number of hours must be from 1 to 23.`
                      })
                  }
                  let chosenhour = orders.filter(order => (this.onhours(order.created_at) <= hours))
                  if (chosenhour.length === 0) {
                      return this.emit('orders:error', {
                          error: `No order was placed within the last ${hours} ${this.pluralize('hour', hours)}`
                      })
                  }
                  return this.emit('show-all-orders-within-chosen-hour-hours', chosenhour, {message: 'ALL ORDERS WITHIN THE LAST'},{message: `${hours} ${this.pluralize('hour', hours).toLocaleUpperCase()}`})
              })
        }
        if(args === '--load -h' || args === '-l -h'){
            this.load('load--h')
              this.once('load--h', orders => {
                  let hours = parseInt(matcher[0])

                  let ishOK = this.isValid(this.regexes().hregex, hours)
                  if(ishOK === false || hours === 0){
                      console.log()
                      return this.emit('orders:error', {
                          error: `Invalid input! Number of hours must be from 1 to 23.`
                      })
                  }
                  let chosenhour = orders.filter(order => (this.onhours(order.created_at) <= hours))
                  if (chosenhour.length === 0) {
                      return this.emit('orders:error', {
                          error: `No order was placed within the last ${hours} ${this.pluralize('hour', hours)}`
                      })
                  }
                  return this.emit('show-all-orders-within-chosen-hour-h', chosenhour, {message: 'ALL ORDERS WITHIN THE LAST'},{message: `${hours} ${this.pluralize('hour', hours).toLocaleUpperCase()}`})
              })
        }
        if(args === '--load --minutes=' || args === '-l --minutes='){
            this.load('load--minutes')
               this.once('load--minutes', orders => {
                    let minutes = parseInt(matcher[0])

                    let ismOK = this.isValid(this.regexes().mregex, minutes)
                    if(ismOK === false || minutes === 0){
                        console.log()
                        return this.emit('orders:error', {
                            error: `Invalid input! Number of minutes must be from 1 to 59.`
                        })
                    }
                    let chosenminute = orders.filter(order => (this.onminutes(order.created_at) <= minutes))  

                    if (chosenminute.length === 0) {
                        console.log()
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${minutes} ${this.pluralize('minute', minutes)}`
                        })
                    }
                    else if(chosenminute.length > 0){
                        return this.emit('show-all-orders-within-chosen-minute-minutes', chosenminute,{message: 'ALL ORDERS WITHIN THE LAST'},{message: `${minutes} ${this.pluralize('minutes', minutes).toLocaleUpperCase()}`})
                    }else{
                        return 

                    }
                })
          }
          if(args === '--load -m' || args === '-l -m'){
              this.load('load--m')
                this.once('load--m', orders => {
                    let minutes = parseInt(matcher[0])
                    let ismOK = this.isValid(this.regexes().mregex, minutes)
                    if(ismOK === false || minutes === 0){
                        console.log()
                        return this.emit('orders:error', {
                            error: `Invalid input! Number of minutes must be from 1 to 59.`
                        })
                    }
                    let chosenminute = orders.filter(order => (this.onminutes(order.created_at) <= minutes))
                    if (chosenminute.length === 0) {
                        return this.emit('orders:error', {
                            error: `No order was placed within the last ${minutes} ${this.pluralize('minute', minutes)}`
                        })
                    }
                    return this.emit('show-all-orders-within-chosen-minute-m', chosenminute,{message: 'ALL ORDERS WITHIN THE LAST'},{message: `${minutes} ${this.pluralize('minutes', minutes).toLocaleUpperCase()}`})
                })
          }

        this.ondisplayforchosentime('show-all-orders-within-chosen-year-years') 
        this.ondisplayforchosentime('show-all-orders-within-chosen-year-y')
        this.removeDuplicateListeners('show-all-orders-within-chosen-year-years')
        this.removeDuplicateListeners('show-all-orders-within-chosen-year-y')
        
        this.ondisplayforchosentime('show-all-orders-within-chosen-month-months')
        this.ondisplayforchosentime('show-all-orders-within-chosen-month-m')
        this.removeDuplicateListeners('show-all-orders-within-chosen-month-months')
        this.removeDuplicateListeners('show-all-orders-within-chosen-month-m')

        this.ondisplayforchosentime('show-all-orders-within-chosen-minute-minutes')
        this.ondisplayforchosentime('show-all-orders-within-chosen-minute-m')
        this.removeDuplicateListeners('show-all-orders-within-chosen-minute-minutes')
        this.removeDuplicateListeners('show-all-orders-within-chosen-minute-m')
       
        this.ondisplayforchosentime('show-all-orders-within-chosen-hour-hours')
        this.ondisplayforchosentime('show-all-orders-within-chosen-hour-h')
        this.removeDuplicateListeners('show-all-orders-within-chosen-hour-hours')
        this.removeDuplicateListeners('show-all-orders-within-chosen-hour-h')


        this.ondisplayforchosentime('show-all-orders-within-chosen-day-days')
        this.ondisplayforchosentime('show-all-orders-within-chosen-day-d')
        this.removeDuplicateListeners('show-all-orders-within-chosen-day-days')
        this.removeDuplicateListeners('show-all-orders-within-chosen-day-d')

        this.ondisplayforchosentime('show-all-orders')
        this.removeDuplicateListeners('show-all-orders')

        this.removeDuplicateListeners('error')

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
               this.emit('orders:error', {
                   error: 'Internal ERROR: could not get orders',
                   error
               })
           })
   }


   show(event) {
       this.once(event, data => {
           this.once('orders-available', orders => {
               let timestring = this.ontime(event).timestring
               let getTime = this.ontime(event).getTime
               let time = parseInt(data.time)

               let chosentime = orders.filter(order => getTime(order.created_at, time))
               if (chosentime.length === 0) {
                   return this.emit('orders:error', {
                       error: `No order was placed within the last ${time} ${this.pluralize(timestring, time)}`
                   })
               }
               console.log()
               console.log(util.inspect(chosentime, {
                   showHidden: true,
                   colors: true,
                   depth: data.depth
               }))

               return 
           })
           return 
       })
       return 
   }
   getOrderJsonFormat(event) {
       this.load('orders-available')
       this.show(event)
   }
    onjson(string, event){
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

        let original = this.spliter(string, `orders ${event}`)
        let orig = this.spliter(original[0], ' ')

        if(event === '--load --years=' || event === '--load -y' || event ==='-l --years=' || event ==='-l -y'){
            let ishOK = this.isValid(this.regexes().yregex, parseInt(orig[0]))
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of years must be a positive whole number.`
                })
            }
        }

        if(event === '--load --months=' || event === '--load -M' || event ==='-l --months=' || event ==='-l -M'){
            let ishOK = this.isValid(this.regexes().Mregex, parseInt(orig[0]))
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of month must be from 1 to 11.`
                })
            }
        }

        if(event === '--load --days=' || event === '--load -d' || event ==='-l --days=' || event ==='-l -d'){
            let ishOK = this.isValid(this.regexes().dregex, parseInt(orig[0]))
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of days must be from 1 to 30.`
                })
            }
        }

        if(event === '--load --hours=' || event === '--load -h' || event ==='-l --hours=' || event ==='-l -h'){
            let ishOK = this.isValid(this.regexes().hregex, parseInt(orig[0]))
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of hours must be from 1 to 23.`
                })
            }
        }
        if(event === '--load --minutes=' || event === '--load -m' || event ==='-l --minutes=' || event ==='-l -m'){
            let ishOK = this.isValid(this.regexes().mregex, parseInt(orig[0]))
            if(ishOK === false || parseInt(orig[0]) === 0){
                return this.emit('orders:error', {
                    error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of minutes must be from 1 to 59.`
                })
            }
        }
    

        // if (hregex.test(parseInt(orig[0])) === false) {
        //     return this.emit('orders:error', {
        //         error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of years must be a positive whole number ....`
        //     })
        // }

        let options = []
        for (let i = 1; i < orig.length; i++) {
            options.push(orig[i])
        }
    
        if (options.length === 0) {
            return this.getOrders(string, event)
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
                            time: orig[0],
                            depth: Infinity
                        }                      
                            this.getOrderJsonFormat(event)
                            this.emit(event, datum)
                        
                    }else{
                        let errormessage 
                        if(arguments[0] === undefined){
                            errormessage = `${validarray[0]}' requires an argument. It cannot be blink`
                        }else{
                            errormessage = `'${argument[0]}' is not a valid argument for '${validarray[0]}'! Arguement must be a positive whole number.`
                        }
                        return this.emit('orders:error', {
                            error: errormessage
                        })
                    }
                }
                if(validarray.length === 2 && validarray[0] !== undefined && validarray[1] !== undefined){
                    let argument = this.spliter(option, validarray[0])[0]
                    let validargument = parseInt(this.spliter(option, validarray[0])[0], 10)
                    let isValidargumentOk = jsonregex.test(validargument)

                    if (isValidargumentOk === false) {

                        let errormessage 
                        if(argument === undefined){
                            errormessage = `'${validarray[0]}' requires an argument. It cannot be blink`
                        }else{
                            errormessage = `'${argument}' is not a valid argument for '${validarray[0]}'! Arguement must be a positive whole number.`
                        }
                        return this.emit('orders:error', {
                            error: errormessage
                        })
                    }

                    if (isValidargumentOk === true) {
                        let datum = {
                                time: orig[0],
                                depth: argument
                            }
                        this.getOrderJsonFormat(event)
                        this.emit(event, datum)
                    }
                }

            } else {
                return this.emit('orders:error', {
                    error: `'${options}' invalid number of arguments!`
                })
            }
        }
    }
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
                // console.log(option)
                // return

                let jsondepth = data.validOptions.find(valid => option.startsWith(valid) && valid === data.valid)
              
                if (!jsondepth || jsondepth === undefined) {
                    return this.emit('orders:error', {
                        error: `'${option}' is not a valid argument for 'orders ${event}'! Must a be json argument. Please orders man page or 'orders --help'.`
                    })
                }
                if (jsondepth && jsondepth !== undefined) {
                    //onsole.log(arg)
                    let argument = this.spliter(option, jsondepth)[0]
                    let validargument = parseInt(this.spliter(option, jsondepth)[0], 10)
                    let isValidargumentOk = jsonregex.test(validargument)
                    if (isValidargumentOk === false) {
                        return this.emit('orders:error', {
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


//     help(string){
//         const commands = {
//             '-h': 'or \x1b[36m--help\x1b[0m        Help',
//             '-l': 'or \x1b[36m--load\x1b[0m        Users',
//             '-g': 'or \x1b[36m--get\x1b[0m         Order by id (phone, or email): [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m ]',
//             '-i': 'or \x1b[36m--id\x1b[0m          Order with the specified id: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m ]',
//             '-p': 'or \x1b[36m--phone\x1b[0m       Orders with the specified phone: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m ]',
//             '-n': 'or \x1b[36m--number\x1b[0m      Order number of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-n \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--number\x1b[0m]',
//             '-s': 'or \x1b[36m--shipping\x1b[0m    Shipping details of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-s \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--shipping\x1b[0m]',
//             '-c': 'or \x1b[36m--card\x1b[0m        Card of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-c \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--card\x1b[0m]',
//             '-P': 'or \x1b[36m--products\x1b[0m    Products of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-P \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--products\x1b[0m]',
    
//         }

//         let clean = string.split(' ').filter(str => str !== '').join(' ')
//         let command = clean.split('orders')

//         if (string  === 'orders' || string === 'orders -h' || string === 'orders --help') {
//             console.clear()
//             let centered = `\x1b[36mNAME\x1b[0m
//             \x1b[36morders\x1b[0m -- Application orders and a order's details 

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36morders\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
//     \x1b[36morders\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m] 
//     \x1b[36morders\x1b[0m [\x1b[36m--get --phone=\x1b[0m|\x1b[36m--get -p \x1b[0m|\x1b[36m-g --phone=\x1b[0m|\x1b[36m-g -p \x1b[0m]\x1b[4mphone\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]
//     \x1b[36morders\x1b[0m [\x1b[36m--get --email=\x1b[0m|\x1b[36m--get -e \x1b[0m|\x1b[36m-g --email=\x1b[0m|\x1b[36m-g -e \x1b[0m]\x1b[4memail\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]
//     \x1b[36morders\x1b[0m [\x1b[36m--get --id=\x1b[0m|\x1b[36m--get -i \x1b[0m|\x1b[36m-g --id=\x1b[0m|\x1b[36m-g -i \x1b[0m]\x1b[4morder_id\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m]

// \x1b[36mDESCRIPTION\x1b[0m
//     Application orders and a user's details  

//         `
//         //this.horizontalLine()
//         this.centered(`\x1b[32mORDERS HELP AND USAGE MANUAL\x1b[0m`)
//         //this.horizontalLine()
//         this.description(centered)
//         //this.horizontalLine()
//         this.verticalSpace(2)
    
//         // Show each command followed by its explanation in white and yellow respectively
    
//         // for (let key in commands) {
//         //     if (commands.hasOwnProperty(key)) {
//         //         let value = commands[key]
//         //         let line = `\x1b[36m${key}\x1b[0m`
//         //         let padding = 65 - line.length
//         //         for (let i = 0; i < padding; i++) {
//         //             line += ' '
//         //         }
//         //         line += value
//         //         console.log(line)
//         //         //this.verticalSpace(1)
//         //     }
//         // }
//         let  options = {pad: 15, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
//         this.texAligner(options, commands)
//         console.log()
//         //this.horizontalLine()
            
//         }
//     }
    orderscommand(string){
        
        const commands = {
            '-l': 'or \x1b[36m--load\x1b[0m        Load users',
            '-g': 'or \x1b[36m--get\x1b[0m         Order by id (phone, or email): [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m ]',
            '-i': 'or \x1b[36m--id\x1b[0m          Order with the specified id: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m ]',
            '-p': 'or \x1b[36m--phone\x1b[0m       Orders with the specified phone: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m ]',
            '-e': 'or \x1b[36m--email\x1b[0m       Orders with the specified email: [\x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m ]',
            '-n': 'or \x1b[36m--number\x1b[0m      Order number of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-n \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--number\x1b[0m]',
            '-s': 'or \x1b[36m--shipping\x1b[0m    Shipping details of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-s \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--shipping\x1b[0m]',
            '-c': 'or \x1b[36m--card\x1b[0m        Card of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-c \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--card\x1b[0m]',
            '-P': 'or \x1b[36m--products\x1b[0m    Products of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-P \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--products\x1b[0m]',
            '-y': 'or \x1b[36m--years\x1b[0m       Orders placed within the specified number of years: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-y \x1b[0m\x1b[0m\x1b[4mnumber_of_years\x1b[0m]',
            '-M': 'or \x1b[36m--months\x1b[0m      Orders placed within the specified number of months: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-M \x1b[0m\x1b[0m\x1b[4mnumber_of_months\x1b[0m]',
            '-d': 'or \x1b[36m--days\x1b[0m        Orders placed within the specified number of days: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-d \x1b[0m\x1b[0m\x1b[4mnumber_of_days\x1b[0m]',
            '-h': 'or \x1b[36m--hours\x1b[0m       Orders placed within the specified number of hours: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-h \x1b[0m\x1b[0m\x1b[4mnumber_of_hours\x1b[0m]',
            '-m': 'or \x1b[36m--minutes\x1b[0m     Orders placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',
            '-j': 'or \x1b[36m--json\x1b[0m        JSON format: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-h \x1b[0m\x1b[0m\x1b[4mnumber_of_hours\x1b[0m [\x1b[36m-j\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m]',

            // '-h': 'or \x1b[36m--minutes\x1b[0m     Orders placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',
            // '-z': 'or \x1b[36m--minutes\x1b[0m     Orders placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',
            // '-k': 'or \x1b[36m--minutes\x1b[0m     Orders placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]'
        }

        let clean = string.split(' ').filter(str => str !== '').join(' ')
        let command = clean.split('orders')

        if (string  === 'orders' || string === 'orders -h' || string === 'orders --help') {
            console.clear()
                       let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36morders\x1b[0m - Application orders and an order's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36morders\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
    \x1b[36morders\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m][ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|\x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m] [\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|                \x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36morders\x1b[0m [\x1b[36m--get --phone=\x1b[0m|\x1b[36m--get -p \x1b[0m|\x1b[36m-g --phone=\x1b[0m|\x1b[36m-g -p \x1b[0m]\x1b[4mphone\x1b[0m[ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|
            \x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m[\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36morders\x1b[0m [\x1b[36m--get --email=\x1b[0m|\x1b[36m--get -e \x1b[0m|\x1b[36m-g --email=\x1b[0m|\x1b[36m-g -e \x1b[0m]\x1b[4memail\x1b[0m [ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|
            \x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m[\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m] [\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36morders\x1b[0m [\x1b[36m--get --id=\x1b[0m|\x1b[36m--get -i \x1b[0m|\x1b[36m-g --id=\x1b[0m|\x1b[36m-g -i \x1b[0m]\x1b[4morder_id\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m]
           [\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m

\x1b[36mDESCRIPTION\x1b[0m
    Application orders and a user's orders details. An order or a set of orders can be viewed in 
    two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
    depending on how you want to view it. A single order is selected by id (order id). A single order
    can also be selected by id by date, by id by card, by id by products by shipping by card and so on.
    A set of orders can be selected by phone or by email. A set of orders can also be
    selected by phone by date or by email by date with or without the Json options and so on.`
        //this.horizontalLine()
        this.centered(`\x1b[32mORDERS COMMANDS HELP AND USAGE MANUAL\x1b[0m`)
        //this.horizontalLine()
        this.description(centered)
        //this.horizontalLine()
        this.verticalSpace(2)
 
        let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
        this.texAligner(options, commands)
        console.log()
       
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

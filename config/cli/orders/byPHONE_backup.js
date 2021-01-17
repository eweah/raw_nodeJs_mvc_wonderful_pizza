'use strict'
const ByID = require('./ByID')
const {createReadStream,promises} = require('fs')
const path = require('path')
const util = require('util')




class ByPHONE extends ByID{
    constructor(){
        super()
        this.autobind(ByPHONE)
        this.autoinvoker(ByPHONE)
        this.setMaxListeners(Infinity)
    }
    showByPhone(event) {
        this.once(event, data => {
            console.log()
            console.log(util.inspect(chosentime, {
                showHidden: true,
                colors: true,
                depth: data.depth
            }))
        })
    }
    async getOrderByPHONE(string, args) {
        const option = this.spliter(string, 'orders')
        if (!option || option.length === 0) return
    
        let idandoption = this.spliter(option[0], args)
        if (idandoption === undefined || idandoption.length === 0 ) {
            return
            // return this.emit('orders:error', {
            //     error: `orders ${args} requires an argument (a phone number)`
            // })
        }

         if (idandoption[0].trim().length !== 10 || typeof(idandoption[0].trim()) !== 'string') {
            return this.emit('orders:error', {
                error: `'${idandoption[0]}' is not a valid argument for 'orders ${args}' `
            })
        }
        
        let details = this.spliter(idandoption[0], ' ')
        let phone = details[0]
        let phoneRegex = /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

        let options = []
        for (let i = 1; i < details.length; i++) {
            options.push(details[i])
        }

        if (!phoneRegex.test(parseInt(details[0]))) {
            return this.emit('orders:error', {
                error: `'${details[0]}' is not a valid phone number.`
            })
        }
        
        if (details[0] === undefined || !details[0].trim() || details[0].trim() === undefined) {
            return this.emit('orders:error', {
                error: 'Phone number is required'
            })
        }
        if (details[0].trim().length !== 10 || typeof (details[0].trim()) !== 'string') {
            return this.emit('orders:error', {
                error: `${details} is not a valid phone number length`
            })
        }
        if (details[0].trim() !== undefined && details[0].trim().length === 10 && typeof (details[0].trim()) === 'string') {

            try {

                let guests = await this.findAll('guestshippings')
                let users = await this.findAll('shippings')
                let corders = await this.findAll('orders')
                let phones = [...guests, ...users]
                let setofphones = new Set
                for (let phone of phones) {
                    setofphones.add(phone)
                }
                if (setofphones.size > 0) {
                    let guestphone = guests.find(guest => guest.split('.json')[0] === phone)
                    let userphone = users.find(user => user.split('.json')[0] === phone)

                    let path = guestphone !== undefined ? `${this.base()}/guestshippings/${phone}.json` : userphone !== undefined ? `${this.base()}/shippings/${phone}.json` : undefined

                    for (let phonenumber of setofphones) {

                        if (phonenumber.split('.json')[0] === phone) {
                            let customer
                            let readable = createReadStream(path, 'utf-8')
                            readable.on('error', error => {
                                this.emit('orders:error', {
                                    error: `Internal Error: could not get customer's orders ${error}`
                                })
                            })
                            readable.on('data', chunk => {
                                customer = JSON.parse(chunk)
                            })
                            readable.on('end', () => {
                                if (customer.cart && customer.cart.length > 0) {
                                    if (corders && corders.length > 0) {
                                        let orders = []
                                        let errors = []
                                        for (let orderId of customer.cart) {
                                            let orderid = corders.find(order => order === `${orderId}.json`)

                                            if (orderid === undefined) {
                                                errors.push('no')
                                            } else {
                                                errors.push('yes')
                                            }
                                            if (orderid && orderid !== undefined && orderid.split('.json')[0].length === 30) {
                                                let order = []
                                                let path = `${this.base()}/orders/${orderid}`
                                                let orderreadable = createReadStream(path, 'utf-8')
                                                // console.log(phone)
                                                // return
                                                orderreadable.on('error', error => {
                                                    this.emit('orders:error', {
                                                        error: `Internal Error: could not get customer's orders: ${error}`
                                                    })
                                                })
                                                orderreadable.on('data', chunk => {
                                                    order.push(JSON.parse(chunk))
                                                })
                                                orderreadable.on('end', () => {
                                                    orders.push(order)
                                                    if (orders.length === customer.cart.length) {
                                                        this.emit('customer-orders-by-phone', orders, phone)
                                                        orders = []
                                                    }
                                                })
                                            }
                                        }
                                        let err = errors.find(error => error === 'yes')
                                        if (err === undefined) {
                                            return this.emit('orders:error', {
                                                error: 'This user has no orders'
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }
                }

            } catch (error) {
                this.emit('orders:error', {
                    error: `Internal Error: could not get customer's orders`
                })
            }
        }
        this.ondisplayforchosentime('found-customer-orders-by-phone')
        this.once('customer-orders-by-phone', (orders, phone) => {
            this.emit('found-customer-orders-by-phone',orders,{message: 'ALL ORDERS ASSOCIATED WITH'}, {message: `${phone}`})
        })
        
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
    ongetbyphone(string){
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
    
        if (string.trim().startsWith('orders -g -p')) {
            if (string.trim().length > 'orders -g -p'.length) {
                this.phonejson(string,'orders -g -p' )
                //this.getOrderByPHONE(string, '-g -p')
            }
        } else if (string.trim().startsWith('orders -g --phone=')) {
            if (string.trim().length > 'orders -g --phone='.length) {
                // this.getOrderByPHONE(string, '-g --phone=')
                this.phonejson(string,'orders -g --phone=' )
            }
        } else if (string.trim().startsWith('orders --get -p')) {
            if (string.trim().length > 'orders --get -p'.length) {
                this.phonejson(string,'orders --get -p' )
                //this.getOrderByPHONE(string, '--get -p')
            }
        } else if (string.trim().startsWith('orders --get --phone=')) {
            if(string.trim().length > 'orders --get --phone='.length){
                this.phonejson(string,'orders --get --phone=' )
            }
            // this.getOrderByPHONE(string, '--get --phone=')
        } 
        
    }


    loadByPhoneOrderByTime(event){
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

    async loadPhoneOrdersByJsonOnly(event) {
   
        this.once(event, async data => {
       

       
            try {
                //let _event = data.options[0]
           
                
                let phone = data.phone.length  === 10 ? data.phone : undefined
                let time = data.time ? data.time : undefined
                let jsonned = data.jsonned ? data.jsonned: undefined
            
                
                if(!phone || phone === undefined){
                  return this.emit('orders:error', {error: `Phone number is required!`})
                }
                

                //let viewDepth = data.depth
           
                let guests = await this.findAll('guestshippings')
                let users = await this.findAll('shippings')
                let corders = await this.findAll('orders')
                let phones = [...guests, ...users]
                let setofphones = new Set
                for (let iphone of phones) {
                    setofphones.add(iphone)
                }
                if (setofphones.size > 0) {
                    let guestphone = guests.find(guest => guest.split('.json')[0] === phone)
                    let userphone = users.find(user => user.split('.json')[0] === phone)

                    let path = guestphone !== undefined ? `${this.base()}/guestshippings/${phone}.json` : userphone !== undefined ? `${this.base()}/shippings/${phone}.json` : undefined

                    for (let phonenumber of setofphones) {
                        if (phonenumber.split('.json')[0] === phone) {
                            let customer
                            let readable = createReadStream(path, 'utf-8')
                          
                           
                            readable.on('error', error => {
                                this.emit('orders:error', {
                                    error: `Internal Error: could not get customer's orders? ${error}`
                                })
                            })
                            readable.on('data', chunk => {
                                customer = JSON.parse(chunk)
                               
                            })
                            readable.on('end', () => {
                                if (customer.cart && customer.cart.length > 0) {
                                    if (corders && corders.length > 0) {
                                        let orders = []
                                        let errors = []
                                  
                                        for (let orderId of customer.cart) {
                                            let orderid = corders.find(order => order === `${orderId}.json`)

                                            if (orderid === undefined) {
                                                errors.push('no')
                                            } else {
                                                errors.push('yes')
                                            }
                                            if (orderid && orderid !== undefined && orderid.split('.json')[0].length === 30) {
                                                let order = {}
                                                let path = `${this.base()}/orders/${orderid}`
                                                let orderreadable = createReadStream(path, 'utf-8')
                                                orderreadable.on('error', error => {
                                                    this.emit('orders:error', {
                                                        error: `Internal Error: could not get customer's orders ..: ${error}`
                                                    })
                                                })
                                                orderreadable.on('data', chunk => {
                                                    order = JSON.parse(chunk)
                                                })
                                                orderreadable.on('end', () => {
                                                 orders.push(order)
                                                    if (orders.length === customer.cart.length) {
                                                        this.infos(orders, jsonned.depth)
                                                    }
                                                })
                                            }
                                        }
                                        let err = errors.find(error => error === 'yes')
                                        if (err === undefined) {
                                            return this.emit('orders:error', {
                                                error: 'This user has no orders'
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            } catch (error) {
                this.emit('orders:error', {
                    error: `Internal Error: could not get customer's orders`
                })
            }
            // this.once(data.options[0], (orders, data) =>{
            //     this.infos(orders, data.depth)
            // })
        })
       
    }
    async loadByPhone(codeevent, event) {
       

        this.once(codeevent, async data => {

            // console.log('code event:', codeevent)
            // console.log('data:', data)
            // return 
        
            try {
                let time = data.time ? data.time : undefined
                let jsonned = data.jsonned ? data.jsonned : undefined
                let phone = data.phone
                let guests = await this.findAll('guestshippings')
                let users = await this.findAll('shippings')
                let corders = await this.findAll('orders')
                let phones = [...guests, ...users]
                let setofphones = new Set
                for (let iphone of phones) {
                    setofphones.add(iphone)
                }
                if (setofphones.size > 0) {
                    let guestphone = guests.find(guest => guest.split('.json')[0] === phone)
                    let userphone = users.find(user => user.split('.json')[0] === phone)

                    let path = guestphone !== undefined ? `${this.base()}/guestshippings/${phone}.json` : userphone !== undefined ? `${this.base()}/shippings/${phone}.json` : undefined

                    for (let phonenumber of setofphones) {1
                        if (phonenumber.split('.json')[0] === phone) {
                            let customer
                            let readable = createReadStream(path, 'utf-8')
                          
                            readable.on('error', error => {
                                this.emit('orders:error', {
                                    error: `Internal Error: could not get customer's orders ${error}`
                                })
                            })
                            readable.on('data', chunk => {
                                customer = JSON.parse(chunk)
                               
                            })
                            readable.on('end', () => {
                                if (customer.cart && customer.cart.length > 0) {
                                    if (corders && corders.length > 0) {
                                        let orders = []
                                        let errors = []
                                  
                                        for (let orderId of customer.cart) {
                                            let orderid = corders.find(order => order === `${orderId}.json`)

                                            if (orderid === undefined) {
                                                errors.push('no')
                                            } else {
                                                errors.push('yes')
                                            }
                                            if (orderid && orderid !== undefined && orderid.split('.json')[0].length === 30) {
                                                let order = {}
                                                let path = `${this.base()}/orders/${orderid}`
                                                let orderreadable = createReadStream(path, 'utf-8')
                                                orderreadable.on('error', error => {
                                                    this.emit('orders:error', {
                                                        error: `Internal Error: could not get customer's orders: ${error}`
                                                    })
                                                })
                                                orderreadable.on('data', chunk => {
                                                    order = JSON.parse(chunk)
                                                })
                                                orderreadable.on('end', () => {
                                         
                                                 orders.push(order)
                                                    if (orders.length === customer.cart.length) {
                                                        if(time !== undefined && jsonned !== undefined){
                                                            if(time.code !== undefined && time.value !== undefined){
                                                                if(jsonned.json !== undefined && jsonned.depth !== undefined){
                                                                    this.emit(event, orders, data)
                                                                }
                                                            }
                                                        }
                                                        if(time !== undefined ){
                                                            if(time.code !== undefined && time.value !== undefined){
                                                                this.emit(event, orders, data)
                                                            }else if(time.code === undefined || time.value === undefined){
                                                                if(jsonned !== undefined){
                                                                    if(jsonned.json !== undefined && jsonned.depth !== undefined){
                                                                        this.infos(orders, jsonned.depth)
                                                                    }
                                                                }
                                                            }
                                                        }else if(time === undefined){
                                                            if(jsonned !== undefined){
                                                                if(jsonned.json !== undefined && jsonned.depth !== undefined){
                                                                    this.infos(orders, jsonned.depth)
                                                                }
                                                            }
                                                        }
                                                        
                                                    }
                                                })
                                            }
                                        }
                                        let err = errors.find(error => error === 'yes')
                                        if (err === undefined) {
                                            return this.emit('orders:error', {
                                                error: 'This user has no orders'
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            } catch (error) {
                this.emit('orders:error', {
                    error: `Internal Error: could not get customer's orders`
                })
            }
        })
        this.loadByPhoneOrderByTime(event)
    }
    
   
    phonejson(string, event) {


        let original = this.spliter(string, event)

        let orig = this.spliter(original[0], ' ')
      
        /// 
        let phonenumber = orig[0]

        let isPhoneOk = this.isValid(this.regexes().phoneregex, phonenumber)
        if (isPhoneOk === false) {
            return this.emit('orders:error', {
                error: `'${phonenumber}' is not a valid phone number.`
            })
        }

        let options = [] // 1. length = 5, 

        for (let i = 1; i < orig.length; i++) {
            options.push(orig[i])
        }
        // console.log(options)
        // orders --get --phone=6122071306
        if (!options || options.length === 0) {
            return this.getOrderByPHONE(string, this.spliter(event, 'orders')[0])
        } else {

            // by time 
           
            if (options.length <= 2) {
               
                let code, value, time, cchecker, vchecker, codes, _event, json, depth, jsonned
                if (options.length === 1) {
                  
                    if (options[0] === '-j' || options[0] === '--json') {
                        let data = {}
                        time = {code: code, value: value}
                        jsonned = {json: options[0], depth: Infinity}
                        data.phone = phonenumber
                        data.time = time 
                        data.jsonned = jsonned

                        let _event = 'orders:json'

                        // console.log('data here :', data)
                        // return 
                       
                        this.loadPhoneOrdersByJsonOnly(_event)
                        this.emit(_event, data)
                      
                    } else {
                       
                        codes = this.spliter(options[0], '=')
                        code = `${codes[0]}=`
                        value = codes[1]
                        _event = code
                        // check 
                        if (this.onvalidetimecode(code) === false) {
                            return this.emit('orders:error', {
                                error: `'${code}' is not a valid argument for '${event}phone'`
                            })
                        }

                        if (code === '--years=' || code === '-y' || code === '--years=' || code === '-y') {
                            let ishOK = this.isValid(this.regexes().yregex, value)
                            if (ishOK === false) {
                                return this.emit('orders:error', {
                                    error: `'${value}' is not a valid argument for '${code}'! Number of years must be a positive whole number.`
                                })
                            }
                        }

                        if (code === '--months=' || code === '-M' || code === '--months=' || code === '-M') {
                            let ishOK = this.isValid(this.regexes().Mregex, value)
                            if (ishOK === false) {
                                return this.emit('orders:error', {
                                    error: `'${value}' is not a valid argument for '${code}'! Number of month must be from 1 to 11.`
                                })
                            }
                        }

                        if (code === '--days=' || code === '-d' || code === '--days=' || code === '-d') {
                            let ishOK = this.isValid(this.regexes().dregex, value)
                            if (ishOK === false) {
                                return this.emit('orders:error', {
                                    error: `'${value}' is not a valid argument for '${code}'! Number of days must be from 1 to 30.`
                                })
                            }
                        }

                        if (code === '--hours=' || code === '-h' || code === '--hours=' || code === '-h') {
                            let ishOK = this.isValid(this.regexes().hregex, value)
                            if (ishOK === false) {
                                return this.emit('orders:error', {
                                    error: `'${value}' is not a valid argument for '${code}'! Number of hours must be from 1 to 23.`
                                })
                            }
                        }
                        if (code === '--minutes=' || code === '-m' || code === '--minutes=' || code === '-m') {
                            let ishOK = this.isValid(this.regexes().mregex, value)
                            if (ishOK === false || value === 0) {
                                return this.emit('orders:error', {
                                    error: `'${value}' is not a valid argument for '${code}'! Number of minutes must be from 1 to 59.`
                                })
                            }
                        }
                        value = codes[1]

                        time = {
                            code,
                            value
                        }

                        let codeevent = `${phonenumber}:orders:${code}`
                        let jsonned = {json, depth}
                        let data = {}
                        
                        data.time = time 
                        data.jsonned = jsonned
                        data.phone = phonenumber
                        data._event = _event
                        data.codeevent = codeevent
                        // console.log('data ?:', data)
                        // return 
                        // this.loadPhoneOrdersByJsonOnly(_event)
                        // this.emit(_event, data)
                        // return 
                        this.loadByPhone(codeevent, code)
                        this.emit(codeevent, data)

                    }
                } else if (options.length === 2) {
                    let code, value, time, cchecker, vchecker, codes, _event, json, jsonned
                    // all the possibilities
                    // orders --get --phone=6122071307 --json --depth=0
                    //orders --get --phone=6122071306 --json --depth=0
                   
                    let equal = options.find(val => val.includes('='))
                    let noequal = options.find(val => !val.includes('='))

                    // console.log(equal)
                    // console.log(noequal)
                    // console.log('equal', equal)
                    // console.log('no equal' , noequal)
                    


                    if(equal && equal !== undefined){
                        codes = this.spliter(equal, '=')

                        json = noequal
                        let jjson = this.jsonEventList().find(value => value === `${noequal} ${codes[0]}=`)
                       
                        if(json && json !== undefined && jjson === undefined){
                            let timer = this.timeEventList().find(value => value === `${codes[0]}=`)
                            if(timer && timer !== undefined){
                               // get the json value for the timer
                               time = {code: timer, value: codes[1]}
                               jsonned = {json, depth: Infinity}
    
    

                               if(time.code !== undefined && time.value !== undefined){
                                if (this.onvalidetimecode(time.code) === false) {
                                    return this.emit('orders:error', {
                                        error: `'${time.code}' is not a valid argument for '${event}phone'`
                                    })
                                }
                    
                                if (time.code === '--years=' || time.code === '-y' || time.code === '--years=' || time.code === '-y') {
                                    let ishOK = this.isValid(this.regexes().dregex, time.value)
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
                                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of month must be from 1 to 11.`
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
                               }
                               let data = {}
    
                               data.time = time
                               data.jsonned = jsonned
                               data.phone = phonenumber
                               data.options = options
            
                            let codeevent = `${phonenumber}:orders:${time.code}`
                            this.loadByPhone(codeevent, time.code)
                            this.emit(codeevent, data)
    
                            }else{
                                return this.emit('orders:error', {error: `Invalid options or arguments`})
                            }
                        }else if(jjson && jjson !== undefined){
                             let data = {}
                            let jsonned = {json: jjson, depth: codes[1]}
                            let time = {code, value}
                            if(time.code !== undefined && time.value !== undefined){
                                if (this.onvalidetimecode(time.code) === false) {
                                    return this.emit('orders:error', {
                                        error: `'${time.code}' is not a valid argument for '${event}phone'`
                                    })
                                }
                    
                                if (time.code === '--years=' || time.code === '-y' || time.code === '--years=' || time.code === '-y') {
                                    let ishOK = this.isValid(this.regexes().dregex, time.value)
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
                                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of month must be from 1 to 11.`
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
                               }
                             data.phone = phonenumber
                             data.time = time 
                             data.jsonned = jsonned
                             let _event = 'orders:json'
                           
                             this.loadPhoneOrdersByJsonOnly(_event)
                             this.emit(_event, data)
                        
                        }else{
                            // let timer = this.timeEventList().find(value => value === `${codes[0]}=`)
                            // if(timer && timer !== undefined){
                            //     console.log(timer)
                            // }
                            console.log('SOMETHING ELSE!')
                             
                        }
                    }else if(equal === undefined && noequal !== undefined){
                        let time, jsonned, data = {}
                       
                        let timeption = this.timeEventList().find(value => value === options[0].trim())
                        let jsonption = this.jsonEventList().find(value => value === options[0].trim())

                        if(timeption !== undefined){
                            let tcod = options.find(val => !this.isValid(this.regexes().jsonregex, val))
                            let tval = options.find(val => this.isValid(this.regexes().jsonregex, val))

                            if(tcod === undefined || !tcod){
                                return this.emit('orders:error', {error: `'${tcod}' is not valid option`})
                            }
                            if(tval === undefined || !tcod){
                                return this.emit('orders:error', {error: `'${tval}' is not valid option`})
                            }
                            time = {code: tcod, value: tval}
                            jsonned = {json: undefined, depth: undefined}

                            if (this.onvalidetimecode(time.code) === false) {
                                return this.emit('orders:error', {
                                    error: `'${time.code}' is not a valid argument for '${event}phone'`
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
                                        error: `'${time.value}' is not a valid argument for '${time.code}'! Number of month must be from 1 to 11.`
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
                            data.time = time
                            data.jsonned = jsonned
                            data.phone = phonenumber
                            data.options = options
         
                        //   console.log(data, 'here ...')
                        //   return
                         let codeevent = `${phonenumber}:orders:${time.code}`
                         this.loadByPhone(codeevent, time.code)
                         this.emit(codeevent, data)
                        }else{
                            return this.emit('orders:error', {error: `'${options[0]} ${options[1]}' is not valid option`})
                        }
                    }else if(equal !== undefined && noequal === undefined){
                        console.log('equal is NOT undefined and noequal is undefined')
             
                    }else if(equal === undefined && noequal === undefined){
                        console.log('equal', equal)
                        console.log('no equal' , noequal)
                    }
                    
                    // check for json
                   
                } else {
                    console.log('unknow error')
                }

            } else if(options.length === 3) {

            
                // console.log(options)
                //orders --get --phone=6122071306 --days=4 --json --depth=0
                let equal = options.filter(val => val.includes('='))
                let noequal = options.filter(val => !val.includes('='))

                if(equal.length > 0  && noequal.length === 0){
                    // IMPOSSIBLE
                  console.log(equal)
                  console.log(options)

                    // VISITED
                }else if(noequal.length > 0 && equal.length === 0){
                    let jcodes = [], tcodes =[], tvalue, time, jsonned
                    for(let el of noequal){
                        tcodes.push(this.timeEventList().find(val => val === el))
                        jcodes.push(this.jsonEventList().find(val => val === el))
                    }
                   
                    tcodes = tcodes.filter(str => str !== undefined)
                    jcodes = jcodes.filter(str => str !== undefined)
                    tvalue = noequal.find(el => this.isValid(this.regexes().jsonregex, el))

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
                        console.log('options lenght is 3 and jcodes.length > 0 && jcodes.length == 1')
                        }else{
                            console.log('mmm .. jcodes')
                        }
                    }else{
                        console.log('Do someting else')
                    }
                    

                    let data = {}
                    data.time = time 
                    data.jsonned = jsonned

                    //let data = {}
                    data.phone = phonenumber
                    //data.options = options
                    //data.depth = jsonned.depth
                    let _event = 'orders:json'
                    // let params = {phone: phonenumber, _event}
                    // data.params = params
                 
                    this.loadPhoneOrdersByJsonOnly(_event)
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
                            console.log('We are not sure ..')
                        }

                        if(equal[1] && equal[1] !== undefined){
                            jmcodes = this.spliter(equal[1], '=')
                            jcode = this.jsonEventList().find(val => (val === `${jmcodes[0]}=` || val === `${noequal} ${jmcodes[0]}=`))
                            mcode = this.timeEventList().find(val => val === `${jmcodes[0]}=`)
                            if(jcode && jcode !== undefined){
                                jsonned = {json: jcode, depth: jmcodes[1]}
                             
                        
                            }else if(mcode && mcode !== undefined){
                                time = {code: mcode, value: jmcodes[1]}
                            }else{
                                return this.emit('orders:error', {error: `'${equal[1]}' is not a valid  option.`})
                            }
    
                        }else{
                            return this.emit('orders:error', {error: `Missing arguments`})
                        }

                    }else{
                       console.log('Ia mn ot too ss ...')
                    }

                    if (this.onvalidetimecode(time.code) === false) {
                        return this.emit('orders:error', {
                            error: `'${time.code}' is not a valid argument for '${event}phone'`
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
                                error: `'${time.value}' is not a valid argument for '${time.code}'! Number of month must be from 1 to 11.`
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

                    data.phone = phonenumber
                    data.options = options
 
                    // orders --get --phone=6122071306 --json --depth=0 --years=40
                  ///console.log(data, 'here ...')
                //   return
                 let codeevent = `${phonenumber}:orders:${time.code}`
                 this.loadByPhone(codeevent, time.code)
                 this.emit(codeevent, data)
               
                    // equal[1]
                    //orders --get --phone=6122071306 --json --depth=0 --days=0
                }else if(equal === undefined && noequal === undefined){

                }else{

                }

                // VISITED
            }else if(options.length === 4){
                // console.log(options)
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

                 
                    if(tcode1 === undefined && jcode1 === undefined){

                        time = {code: `${jtcodes[0]}=`, value: jtcodes[1]}
                        if(this.jsonEventList().find(val => val === `${noe[0]} ${noe[1]}`) !== undefined){

                            jsonned = {json: `${noe[0]} ${noe[1]}`, depth: val }
                        }else{
                            let _ev = `${noe[1]} ${noe[0]}`.trim()
                        
                            if(this.validateJsonEvent(_ev) === true){
                                jsonned = {json: `${noe[1]} ${noe[0]}`, depth: val }
                            }else{
                                return this.emit('orders:error', {error: `'${noe[1]}' is not a valid json option`})
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
                        console.log('not sure about tcode1 and jcode1')
                    }
                    

            // orders --get --phone=6122071306 --json -d 8 --days=0
            // orders --get --phone=6122071306 --json --depth=8 -M 9
            if (this.onvalidetimecode(time.code) === false) {
                return this.emit('orders:error', {
                    error: `'${time.code}' is not a valid argument for '${event}phone'`
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
                        error: `'${time.value}' is not a valid argument for '${time.code}'! Number of month must be from 1 to 11.`
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

                  data.phone = phonenumber
                  data.options = options

                  // orders --get --phone=6122071306 --json --depth=0 --years=40
                ///console.log(data, 'here ...')
              //   return
               let codeevent = `${phonenumber}:orders:${time.code}`
               this.loadByPhone(codeevent, time.code)
               this.emit(codeevent, data)
             

                  //orders --get --phone=6122071306 -y 40 --json --depth=0
                }else{
                    console.log('I WILL NOT ACCEDPT THIS')
                }
                
            }else if(options.length === 5){
                // orders --get --phone=6122071306 --json -d 0 -M 10
                let  jcodes =[], tcodes = [], tvalue, jvalue, time, jsonned, jtvalues, common 

                for(let el of options){
                    jcodes.push(this.jsonEventList().find(val => val === el))
                    tcodes.push(this.timeEventList().find(val => val === el))
                }
                jtvalues = options.filter(val => this.isValid(this.regexes().jsonregex, val))
  
                let str = this.spliter(original[0], phonenumber)
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
                     
                        }else if(tcodes.indexOf('-d') > -1){

                            jsonned = {json: `${jcodes[0]} ${tcodes[tcodes.indexOf('-d')]}`, depth: 0}
                            time = {code: tcodes.find(val => val !== '-d'), value: 0}

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

                            

                        }
                    }
                }
                if (this.onvalidetimecode(time.code) === false) {
                    return this.emit('orders:error', {
                        error: `'${time.code}' is not a valid argument for '${event}phone'`
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
                            error: `'${time.value}' is not a valid argument for '${time.code}'! Number of month must be from 1 to 11.`
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
                let data = {}
                data.time = time 
                data.jsonned = jsonned

                data.phone = phonenumber
                data.options = options

                // orders --get --phone=6122071306 --json --depth=0 --years=40
              ///console.log(data, 'here ...')
            //   return
             let codeevent = `${phonenumber}:orders:${time.code}`
             this.loadByPhone(codeevent, time.code)
             this.emit(codeevent, data)
               
            }else{
                console.log('We are not sure about this')
            }
        }

    }
    validateTimeEvent(event, code, value){
        
        if(this.onvalidetimecode(code) === false){
            return this.emit('orders:error', {
                error: `'${code}' is not a valid argument for '${event}phone'`
            })
        }
       
        if(code === '--years=' || code === '-y' || code ==='--years=' || code ==='-y'){
            let ishOK = this.isValid(this.regexes().dregex, value)
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of years must be a positive whole number.`
                })
            }
        }

        if(code === '--months=' || code === '-M' || code ==='--months=' || code ==='-M'){
            let ishOK = this.isValid(this.regexes().Mregex, value)
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of month must be from 1 to 11.`
                })
            }
        }

        if(code === '--days=' || code === '-d' || code ==='--days=' || code ==='-d'){
            let ishOK = this.isValid(this.regexes().dregex, value)
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of days must be from 1 to 30.`
                })
            }
        }

        if(code === '--hours=' || code === '-h' || code ==='--hours=' || code ==='-h'){
            let ishOK = this.isValid(this.regexes().hregex, value)
            if(ishOK === false){
                return this.emit('orders:error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of hours must be from 1 to 23.`
                })
            }
        }
        if(code === '--minutes=' || code === '-m' || code ==='--minutes=' || code ==='-m'){
            let ishOK = this.isValid(this.regexes().mregex, value)
            if(ishOK === false || value === 0){
                return this.emit('orders:error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of minutes must be from 1 to 59.`
                })
            }
        }
    }
  
   

}
module.exports = ByPHONE

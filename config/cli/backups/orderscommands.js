'use strict'

const {createReadStream, promises} = require('fs')
const path = require('path')
const util = require('util')

const CLI = require('.')
const { cart } = require('../../routes/default')
const { ifError } = require('assert')



class OrderCommand extends CLI{

    constructor(){
        super()
        this.autobind(OrderCommand)
        this.autoinvoker(OrderCommand)
    }

    autobinder(className = {}){
        for(let method of Object.getOwnPropertyNames(className.prototype)){
          if(typeof(this[method]) === 'function' && method !=='constructor'){
              this[method] = this[method].bind(this)
          }
        }
    }
    autobind(className = {}){
        this.autobinder = this.autobinder.bind(this)
        this.autobinder(className)
    }

    autoinvoker(className = {}){
        for(let method of Object.getOwnPropertyNames(className.prototype)){
          if(typeof(this[method]) === 'function' && method !=='constructor' && method !== 'autoinvoker' && method !== 'autobinder' && method !== 'autobind' && method !== 'base' && method !=='findAll'){this[method]()}
        }
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
    base(){
        return path.join(__dirname, '../../resources/storage/.data')
    }
   async findAll(path){
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
                               return  this.emit('error', {error: 'Unrecognized Phone number'})
                            })
                            readable.on('data', chunk => {
                                let user = JSON.parse(chunk)
                                 let hashed = this.hash(password)
                                 if(user.password !== hashed){
                                     return this.emit('error', {error: 'Incorrect password'})
                                 }
                                 if(user.password === hashed){
                                     this.emit('success', {message: 'You are logged in!'})
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
    common(){
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
    
      // Users help

      ordercommands(){
        this.on('orders', async string => {

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
            if (string  === 'orders') {
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
            this.horizontalLine()
            this.centered(`\x1b[32mORDERS HELP AND USAGE MANUAL\x1b[0m`)
            this.horizontalLine()
            this.description(centered)
            this.horizontalLine()
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
            this.horizontalLine()
                
            }


            // Handling error 

            if(clean === 'orders -g' || clean === 'orders -g -e' || clean === 'orders -g --email' || clean === 'orders -g -p' || clean === 'orders -g --phone' || clean ==='orders -g -i' || clean ==='orders -g --id'){
                let error = `\x1b[31morders: orders \x1b[32m-g\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
                let usage = `\x1b[32mUsage:   \x1b[36morders\x1b[0m [ \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m ]`
                console.log()
                console.log(error)
                console.log(usage)
                console.log()
                return 
            }
            if(clean === 'orders --get' || clean === 'orders --get -e' || clean === 'orders --get --email' || clean === 'orders --get -p' || clean === 'orders --get --phone' || clean ==='orders --get -i' || clean ==='orders --get --id'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m [ \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get --i=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m--get --e=\x1b[0m\x1b[4memail\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get --p=\x1b[0m\x1b[4mphone\x1b[0m ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders -i' || clean === 'orders -i -e' || clean === 'orders -i --email' || clean === 'orders -i -p' || clean === 'orders -i --phone' || clean ==='orders -i -i' || clean ==='orders -i --id'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m [ \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get --i=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --i=\x1b[0m\x1b[4morder_id\x1b[0m  ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders --id' || clean === 'orders --id -e' || clean === 'orders --id --email' || clean === 'orders --id -p' || clean === 'orders --id --phone' || clean ==='orders --id -i' || clean ==='orders --id --id'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get --i=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m  ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders -e' || clean === 'orders -e -e' || clean === 'orders -e --email' || clean === 'orders -e -p' || clean === 'orders -e --phone' || clean ==='orders -e -i' || clean ==='orders -e --id'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m  [\x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m--get -e \x1b[0m\x1b[4memail\x1b[0m ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders -p'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m  [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m  | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders --phone'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m  [\x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m  | \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders --email'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m  [\x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m  | \x1b[36m--get --email=\x1b[0m\x1b[4memail\x1b[0m ]`
                console.log(error)
                console.log(usage)
                return 
            }



            

            /// users -h
           else if (command[1].match(/ -h/)) {
                console.clear()
                if (string.trim() !== 'orders -h') return this.emit('error', {
                    error: `'${string}' is not command, order-h`
                })
                if (string.trim().length !== 'orders -h'.length) return this.emit('error', {
                    error: `'${string}' is not command, orders-h`
                })

                           let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36morders\x1b[0m -- Application orders and a order's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36morders\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
    \x1b[36morders\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
    \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m ]

\x1b[36mDESCRIPTION\x1b[0m
    Application orders and a user's details  

            `
            this.horizontalLine()
            this.centered(`\x1b[32mORDERS HELP AND USAGE MANUAL\x1b[0m`)
            this.horizontalLine()
            this.description(centered)
            this.horizontalLine()
            this.verticalSpace(2)
        
            // Show each command followed by its explanation in white and yellow respectively
        
            for (let key in commands) {
                if (commands.hasOwnProperty(key)) {
                    let value = commands[key]
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
                
            }

//              /// users --help
             else if (command[1].match(/ --help/)) {
                 console.clear()
                if (string.trim() !== 'orders --help') return this.emit('error', {
                    error: `'${string}' is not command, orders --help`
                })
                if (string.trim().length !== 'orders --help'.length) return this.emit('error', {
                    error: `'${string}' is not command, orders --help`
                })
                           let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36morders\x1b[0m -- Application orders and a order's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36morders\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
    \x1b[36morders\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
    \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m ]

\x1b[36mDESCRIPTION\x1b[0m
    Application orders and a user's details  

            `
            this.horizontalLine()
            this.centered(`\x1b[32mORDERS HELP AND USAGE MANUAL\x1b[0m`)
            this.horizontalLine()
            this.description(centered)
            this.horizontalLine()
            this.verticalSpace(2)
        
            // Show each command followed by its explanation in white and yellow respectively
        
            for (let key in commands) {
                if (commands.hasOwnProperty(key)) {
                    let value = commands[key]
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
                
            }

//             // users -g --phone

            else if (command[1].match(/ -g --id/)) {

                //orders -g --id=MOQYcdb8CVcS5agLh5gnlt6mvoBfcT

               let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('=')


                let checkOptions = check[1].split('-').filter(str => str !== '').map(str => str.trim())

            
              

              //orders -g --id=PXp9hYvmrET8PA2WPt9tENqKZBBW4a -P
            
              
               let options = []
               
               for(let i = 1; i < checkOptions.length; i++){
                   options.push(checkOptions[i])
               }

               let opt = options.sort().join('')

              

              
                 if(options.length  === 2){
                  
                    
                 }else if(options.length  === 3){
                    let opt = options.join('')
                    console.log(opt)
                }else if(options.length  === 4){
                    let opt = options.join('')
                    console.log(opt)
                }   
        
    
                if(checkOptions[1] === undefined && checkOptions[0] && checkOptions[0].trim().length ==='WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length){
                    if (check[0] !== 'orders -g --id') {
                        return this.emit('error', {
                            error: `'${check[0]}' is not command.`
                        })
                    }
                    // if(!phoneRegex.test(parseInt(check[1]))){
                    //     return this.emit('error', {
                    //         error: `'${check[1]}' is not a valid phone number.`
                    //     })
                    // }
                    if (check[1].trim().length !== 'WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length || typeof check[1].trim() !== 'string') {
                        return this.emit('error', {
                            error: `'${check[1]}' is not a valid order id.`
                        })
                    }
                    if (string.length !== 'orders -g --id=WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length) return this.emit('error', {
                        error: `'${string}' is not command...`
                    })

                    let order_id = check[1].trim()
                    let path = `${this.base()}/orders/${order_id}.json`
                    let readable = createReadStream(path, 'utf-8')

                    readable.on('data', chunk => {
                        let order = JSON.parse(chunk)
                        console.log(util.inspect(order, {
                            colors: true,
                            showHidden: true,
                            depth: Infinity
                        }))
                    })
                    readable.on('end', () => {
                        this._interface.prompt()
                    })
                    readable.on('error', error => {
                        this.emit('error', {
                            error: `could not find a user with this phone number.`
                        })
                    })
                }else if(checkOptions[1] !== undefined && checkOptions[0] && checkOptions[0].trim().length ==='WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length){


                    
                    // check for n or number
                    if( (checkOptions[1] !== undefined && checkOptions[1].trim() === 'n') || checkOptions[1] !== undefined && checkOptions[1].trim() === 'number'){
                        let order_id = checkOptions[0].trim()
                        let path = `${this.base()}/orders/${order_id}.json`
                        let readable = createReadStream(path, 'utf-8')
   
                        readable.on('data', chunk => {
                            let order = JSON.parse(chunk)
    
                            console.log()
                            this.horizontalLine()
                            this.centered('ORDER NUMBER')
                            //this.horizontalLine()
                            let ordernumber = {}
                            ordernumber['ORDER#'] = order.number
                            console.table([ordernumber])
                            this.horizontalLine()
                            this._interface.prompt()
                           
                        })
                        readable.on('end', () => {
                            this._interface.prompt()
                        })
                        readable.on('error', error => {
                            this.emit('error', {
                                error: `could not find a user with this phone number.`
                            })
                        })
                    }
                    // check card  orders -g --id=MOQYcdb8CVcS5agLh5gnlt6mvoBfcT
                    if( (checkOptions[1] !== undefined && checkOptions[1].trim() === 'c') || checkOptions[1] !== undefined && checkOptions[1].trim() === 'card'){
                        let order_id = checkOptions[0].trim()
                        let path = `${this.base()}/orders/${order_id}.json`
                        let readable = createReadStream(path, 'utf-8')
   
                        readable.on('data', chunk => {
                            let order = JSON.parse(chunk)

                            console.log()
                            this.horizontalLine()
                            this.centered('CARD DETAILS')
                            //this.horizontalLine()
                            console.table([order.card])
                            this.horizontalLine()
                            this._interface.prompt()
                            //return
                           
                        })
                        readable.on('end', () => {
                            this._interface.prompt()
                        })
                        readable.on('error', error => {
                            this.emit('error', {
                                error: `could not find a user with this phone number.`
                            })
                        })
                    }
                    // check products  orders -g --id=MOQYcdb8CVcS5agLh5gnlt6mvoBfcT
                    if( (checkOptions[1] !== undefined && checkOptions[1].trim() === 'P') || checkOptions[1] !== undefined && checkOptions[1].trim() === 'products'){
                        let order_id = checkOptions[0].trim()
                        let path = `${this.base()}/orders/${order_id}.json`
                        let readable = createReadStream(path, 'utf-8')
   
                        readable.on('data', chunk => {
                            let order = JSON.parse(chunk)

                            let orderproducts = []
                            if(order.products && order.products.length > 0){
                                
                                for(let product of order.products){
                                    let prod = {}
                                    prod['pizza type'] = product.name.toUpperCase()
                                    prod.size = product.size
                                    prod['unit price'] = product.pricing.price
                                    prod.quantity = product.pricing.quantity
                                    prod['total price'] = product.pricing.total


                                    orderproducts.push(prod)
                                }
                            }
                            console.log()
                            this.horizontalLine()
                            this.centered('PRODUCTS IN THIS ORDER')
                            console.table(orderproducts)
                            this.horizontalLine()
                            this._interface.prompt()
                           
                        })
                        readable.on('end', () => {
                            this._interface.prompt()
                        })
                        readable.on('error', error => {
                            this.emit('error', {
                                error: `could not find a user with this phone number.`
                            })
                        })
                    }

                    // check shipping  orders -g --id=MOQYcdb8CVcS5agLh5gnlt6mvoBfcT
                    if( (checkOptions[1] !== undefined && checkOptions[1].trim() === 's') || checkOptions[1] !== undefined && checkOptions[1].trim() === 'shipping'){
                        let order_id = checkOptions[0].trim()
                        let path = `${this.base()}/orders/${order_id}.json`
                        let readable = createReadStream(path, 'utf-8')
   
                        readable.on('data', async chunk => {
                            let order = JSON.parse(chunk)
                            
                                if(order.guest){
                                    let shippings = await this.findAll('guestshippings')
                              
                                    for(let shipping of shippings){
     
                                     let shippingpath = `${this.base()}/guestshippings/${shipping}`
                                     let shippingreadable = createReadStream(shippingpath, 'utf-8')
                                     shippingreadable
                                     .on('data', chunck => {
                                         let ship = JSON.parse(chunck)
                                         if(ship.cart && ship.cart.length > 0){
                                             let ordershipping = ship.cart.find(orderId => orderId === order_id)
                                             if(ordershipping && ordershipping !== undefined){
                                                 console.log()
                                                 let billing = {}
                                                  billing.address = ship.billing.billing_address
                                                  billing.city = ship.billing.billing_city
                                                  billing.state = ship.billing.billing_state
                                                  billing.zip = ship.billing.billing_zip
                                                  billing.phone = ship.billing.billing_phone
                                                  this.horizontalLine()
                                                  this.centered('BILLING ADDRESS')
                                                  //this.horizontalLine()
                                                 console.table([billing])
                                                // this.horizontalLine()
                                                 console.log()
                                                 let customer = {}
                                                  customer.firstname = ship.firstname
                                                  customer.lastname = ship.lastname
                                                  customer.address = ship.address
                                                  customer.city = ship.city
                                                  customer.state = ship.state
                                                  customer.zip = ship.zip
                                                  //customer.email = ship.email
                                                  customer.phone = ship.phone
                                                  
                                                  //this.horizontalLine()
                                                  this.centered('SHIPPING DETAILS')
                                                  //this.horizontalLine()
                                                  this.centered(console.table([customer]))
                                                 this.horizontalLine()
                                                  this._interface.prompt()
                                                 return 
                                             }
                                         }
                                     })
                                     .on('error', () => {
                                         //console.log('error ...')
                                     })
                                     .on('end', () => {
                                         //console.log('ended')
                                     })
                                    }
                            
                            }else{
                               let shippings = await this.findAll('shippings')
                              
                               for(let shipping of shippings){

                                let shippingpath = `${this.base()}/shippings/${shipping}`
                                let shippingreadable = createReadStream(shippingpath, 'utf-8')
                                shippingreadable
                                .on('data', chunck => {
                                    let ship = JSON.parse(chunck)
                                    if(ship.cart && ship.cart.length > 0){
                                        let ordershipping = ship.cart.find(orderId => orderId === order_id)
                                        if(ordershipping && ordershipping !== undefined){
                                            console.log()
                                            let billing = {}
                                             billing.address = ship.billing.billing_address
                                             billing.city = ship.billing.billing_city
                                             billing.state = ship.billing.billing_state
                                             billing.zip = ship.billing.billing_zip
                                             billing.phone = ship.billing.billing_phone
                                             this.horizontalLine()
                                             this.centered('BILLING ADDRESS')
                                             //this.horizontalLine()
                                            console.table([billing])
                                           // this.horizontalLine()
                                            console.log()
                                            let customer = {}
                                             customer.firstname = ship.firstname
                                             customer.lastname = ship.lastname
                                             customer.address = ship.address
                                             customer.city = ship.city
                                             customer.state = ship.state
                                             customer.zip = ship.zip
                                             //customer.email = ship.email
                                             customer.phone = ship.phone
                                             
                                             //this.horizontalLine()
                                             this.centered('SHIPPING DETAILS')
                                             //this.horizontalLine()
                                             this.centered(console.table([customer]))
                                            this.horizontalLine()
                                             this._interface.prompt()
                                            return 
                                        }
                                    }
                                })
                                .on('error', () => {
                                    //console.log('error ...')
                                })
                                .on('end', () => {
                                    //console.log('ended')
                                })
                               }
                            }
                           
                        })
                        readable.on('end', () => {
                            this._interface.prompt()
                        })
                        readable.on('error', error => {
                            this.emit('error', {
                                error: `could not find a user with this phone number.`
                            })
                        })
                    }
                    
                }
                


               
            }


            else if (command[1].match(/ --get --id/)) {

                //orders --get --id=WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb

               let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('=')

                if(check[0] !== 'orders --get --id'){
                    return this.emit('error', {
                        error: `'${check[0]}' is not command.`
                    })
                }
                // if(!phoneRegex.test(parseInt(check[1]))){
                //     return this.emit('error', {
                //         error: `'${check[1]}' is not a valid phone number.`
                //     })
                // }
                if(check[1].trim().length !== 'WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length || typeof check[1].trim() !== 'string'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid order id.`
                    })
                }
                if (string.length !== 'orders --get --id=WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length) return this.emit('error', {
                    error: `'${string}' is not command...`
                })

                let order_id = check[1].trim()
                let path = `${this.base()}/orders/${order_id}.json`
                let readable = createReadStream(path, 'utf-8')

                readable.on('data', chunk => {
                    let order = JSON.parse(chunk)
                    console.log(order)
                })
                readable.on('end', () => {
                 this._interface.prompt()
                })
                readable.on('error', error => {
                    this.emit('error', {
                        error: `could not find a user with this phone number.`
                    })
                })
            }

            else if (command[1].match(/ --get -i/)) {

                //orders --get -i WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb

               let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('-i')

                if(check[0].trim() !== 'orders --get'){
                    return this.emit('error', {
                        error: `'${check[0]}' is not command.`
                    })
                }
                // if(!phoneRegex.test(parseInt(check[1]))){
                //     return this.emit('error', {
                //         error: `'${check[1]}' is not a valid phone number.`
                //     })
                // }
                if(check[1].trim().length !== 'WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length || typeof check[1].trim() !== 'string'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid order id.`
                    })
                }
                if (string.length !== 'orders --get -i WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length) return this.emit('error', {
                    error: `'${string}' is not command...`
                })

                let order_id = check[1].trim()
                let path = `${this.base()}/orders/${order_id}.json`
                let readable = createReadStream(path, 'utf-8')

                readable.on('data', chunk => {
                    let order = JSON.parse(chunk)
                    console.log(order)
                })
                readable.on('end', () => {
                 this._interface.prompt()
                })
                readable.on('error', error => {
                    this.emit('error', {
                        error: `could not find a user with this phone number.`
                    })
                })
            }

            else if (command[1].match(/ -g -i/)) {

                //orders -g -i WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb

               let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('-i')

                if(check[0].trim() !== 'orders -g'){
                    return this.emit('error', {
                        error: `'${check[0]}' is not command.`
                    })
                }
                // if(!phoneRegex.test(parseInt(check[1]))){
                //     return this.emit('error', {
                //         error: `'${check[1]}' is not a valid phone number.`
                //     })
                // }
                if(check[1].trim().length !== 'WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length || typeof check[1].trim() !== 'string'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid order id.`
                    })
                }
                if (string.length !== 'orders -g -i WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length) return this.emit('error', {
                    error: `'${string}' is not command...`
                })

                let order_id = check[1].trim()
                let path = `${this.base()}/orders/${order_id}.json`
                let readable = createReadStream(path, 'utf-8')

                readable.on('data', chunk => {
                    let order = JSON.parse(chunk)
                    console.log(order)
                })
                readable.on('end', () => {
                 this._interface.prompt()
                })
                readable.on('error', error => {
                    this.emit('error', {
                        error: `could not find a user with this phone number.`
                    })
                })
            }

           
            else if (command[1].match(/ -l/)) {
                if (string.length !== 'orders -l'.length) return this.emit('error', {
                    error: `'${string}' is not command, orders -l`
                })
                if (string !== 'orders -l') return this.emit('error', {
                    error: `'${string}' is not command, orders -l`
                })

                try{
                    const users = await this.findAll('orders')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/orders/${user}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })
                         console.log()
                        readable.on('data', chunked => {
                           let order = JSON.parse(chunked)
                           console.log(order)
                        })
                        readable.on('end', () => {
                         console.log()
                          this._interface.prompt()
                        })
                      })
                    }
                }catch(error){
                 this.emit('error', {error: 'User not found'})
                }
                
            }

           else if (command[1].match(/ --load/)) {
                if (string.length !== 'orders --load'.length) return this.emit('error', {
                    error: `'${string}' is not command, users -load`
                })
                if (string!== 'orders --load') return this.emit('error', {
                    error: `'${string}' is not command, users -load`
                })

                try{
                    let userOrders = []
                    const users = await this.findAll('orders')
                    if(users && users.length > 0){
                      users.forEach(order => {
                         let readable = createReadStream(`${this.base()}/orders/${order}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${order}`})
                         })
                         console.log()
                        readable.on('data', chunked => {
                           let order = JSON.parse(chunked)
                           userOrders.push(order)
                           console.dir(order)
                        })
                        readable.on('end', () => {
                         console.log()
                        this._interface.prompt()
                        })
                      })
                      
                 
                     
                    }
                }catch(error){
                 this.emit('error', {error: 'User not found'})
                }
                
            }
           
        })
 
    }
     
    notACommand(){
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

      
}


module.exports = OrderCommand

new OrderCommand()












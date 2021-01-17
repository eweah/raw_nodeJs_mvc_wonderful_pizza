'use strict'

const {createReadStream, promises} = require('fs')
const path = require('path')

const CLI = require('.')



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
      // Users help

      ordercommands(){
        this.on('orders', async string => {

            const commands = {
                '--help, -h': 'Help',
                '--load, -l': 'Load users',
                '-g -i order_id, -g --id=order_id': 'Get the order with the specified order id',
                '--get -i order_id, --get --id=order_id': 'Get the order with the specified order id',
                '-g -p, -g --phone=phone': 'Get the order with the specified phone number',
                '--get -p phone, --get --phone=phone': 'Get the order with the specified phone number',

                '-g -e, -g --email=email': 'Get the order with the specified email address',
                '--get -e email, --get --email=email': 'Get the order with the specified email address',

                '-g -i order_id -c, -g -i order_id --card': 'Get the order with the specified order id',
                '-g --id=order_id -c, -g --id=order_id --card,': 'Get the order with the specified order id',

                '--get -i order_id -c,--get -i order_id --card': 'Get the order with the specified order id',
                '--get --id=order_id -c, --get --id=order_id --card': 'Get the order with the specified order id',

                '-g -i order_id -s, -g -i order_id --shipping': 'Get the order with the specified order id',
                '-g --id=order_id -s, -g --id=order_id --shipping,': 'Get the order with the specified order id',

                '--get -i order_id -s,--get -i order_id --shipping': 'Get the order with the specified order id',
                '--get --id=order_id -s, --get --id=order_id --shipping': 'Get the order with the specified order id',


                '-g -i order_id -n, -g -i order_id --number': 'Get the order with the specified order id',
                '-g --id=order_id -n, -g --id=order_id --number,': 'Get the order with the specified order id',

                '--get -i order_id -n,--get -i order_id --number': 'Get the order with the specified order id',
                '--get --id=order_id -n, --get --id=order_id --number': 'Get the order with the specified order id',
            }

            let clean = string.split(' ').filter(str => str !== '').join(' ')
            let command = clean.split('orders')
            if (string  === 'orders') {
                console.clear()
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
            let  options = {pad: 70, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '33'}
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
            if(clean === 'orders --get'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m [ \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get --i=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m--get --e=\x1b[0m\x1b[4memail\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get --p=\x1b[0m\x1b[4mphone\x1b[0m ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders -i'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m [ \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get --i=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --i=\x1b[0m\x1b[4morder_id\x1b[0m  ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders --id'){
                 let error = `\x1b[31morders: orders options requires an argument\x1b[0m`
                let usage = `\x1b[31mUsage:   \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get --i=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m  ]`
                console.log(error)
                console.log(usage)
                return 
            }
            if(clean === 'orders -e'){
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

                //orders -g --id=WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb

               let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('=')

                if(check[0] !== 'orders -g --id'){
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
                if (string.length !== 'orders -g --id=WCcYZ9b8mKdE50zVmGPwhsLyw2LyQb'.length) return this.emit('error', {
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
                           console.log(order)
                        })
                        readable.on('end', () => {
                         console.log()
                        //  this.emit('user-orders', userOrders)
                        this._interface.prompt()
                        })
                      })
                      
                    //   this.once('user-orders', data => {
                    //       console.clear()
                    //       console.table(data)
                    //       this._interface.prompt()
                    //   })
                     
                    }
                }catch(error){
                 this.emit('error', {error: 'User not found'})
                }
                
            }
           
        })
 
    }
     
    notACommand(){
        this.on('command-not-found', data => {
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            process.exit(0)
        })
        this.on('error', data => {
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            process.exit(0)
        })
        this.on('success', data => {
            console.log(`\x1b[36m${data.message}\x1b[0m`)
        })
     
    }

      
}


module.exports = OrderCommand

new OrderCommand()







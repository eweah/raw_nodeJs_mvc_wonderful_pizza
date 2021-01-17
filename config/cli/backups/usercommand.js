'use strict'

const {createReadStream, createWriteStream, promises} = require('fs')
const {Readable, PassThrough, Transform} = require('stream')
const path = require('path')
const os = require('os')
const v8 = require('v8')

const CLI = require('.')


class UserCommand extends CLI{

    constructor(){
        super()
        this.autobind(UserCommand)
        this.autoinvoker(UserCommand)

        this.credentials = {
            phone: '6122071306',
            password: 'password'
        }
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

      usercommands(){
        this.on('users', async string => {


         
            const commands = {
                '--help, -h': 'Help',
                '--load, -l': 'Load users',
                '-g -p phone, -g --phone=phone': 'Get the user with the specified phone number',
                '--get -p phone, --get --phone=phone': 'Get the user with the specified phone number',
                '-d -p phone, -d --phone=phone': 'delete the user with the specified phone number',
                '--delete -p phone, --delete --phone=phone': 'delete the user with the specified phone number',
                '-g -e email, -g --email=email': 'Get the user with the specified email addresss',
                '--get -e email, --get --email=email': 'Get the user with the specified email address',
            }

            let command = string.split('users')
            if (string  === 'users') {
     
                           let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36musers\x1b[0m -- Application users and a user's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--get --email=\x1b[0m\x1b[4memail\x1b[0m | \x1b[36m--get -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m ]

\x1b[36mDESCRIPTION\x1b[0m
    Application users and a user's details  

            `
            this.horizontalLine()
            this.centered(`\x1b[32mUSERS HELP AND USAGE MANUAL\x1b[0m`)
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

            

            /// users -h
           else if (command[1].match(/ -h/)) {

                if (string.trim() !== 'users -h') return this.emit('error', {
                    error: `'${string}' is not command, users-h`
                })
                if (string.trim().length !== 'users -h'.length) return this.emit('error', {
                    error: `'${string}' is not command, users-h`
                })

                           let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36musers\x1b[0m -- Application users and a user's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]

\x1b[36mDESCRIPTION\x1b[0m
    Application users and a user's details  

            `
            this.horizontalLine()
            this.centered(`\x1b[32mUSERS HELP AND USAGE\x1b[0m`)
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
                if (string.trim() !== 'users --help') return this.emit('error', {
                    error: `'${string}' is not command, users --help`
                })
                if (string.trim().length !== 'users --help'.length) return this.emit('error', {
                    error: `'${string}' is not command, users --help`
                })

                           let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36musers\x1b[0m -- Application users and a user's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
    \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]

\x1b[36mDESCRIPTION\x1b[0m
    Application users and a user's details  

            `
            this.horizontalLine()
            this.centered(`\x1b[32mUSERS HELP AND USAGE\x1b[0m`)
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

            else if (command[1].match(/ -g --phone/)) {

               let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('=')

                if(check[0] !== 'users -g --phone'){
                    return this.emit('error', {
                        error: `'${check[0]}' is not command.`
                    })
                }
                if(!phoneRegex.test(parseInt(check[1]))){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if (string.length !== 'users -g --phone=6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })

                let phone = check[1].trim()
                let path = `${this.base()}/users/${phone}.json`
                let readable = createReadStream(path, 'utf-8')

                readable.on('data', chunk => {
                    let user = JSON.parse(chunk)
                    delete user.aToken
                    delete user.password

                    let data = [{firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone, registered: user.created_at}]
                    console.clear()
                    console.table(data)
                    // this.emit('-g --phone', data)
                })
                readable.on('end', () => {
                    // this.on('-get --phone' , data => {
                    //     console.clear()
                    //     console.table(data)
                    // })
                })
                readable.on('error', error => {
                    this.emit('error', {
                        error: `could not find a user with this phone number.`
                    })
                })
            }

            else if (command[1].match(/ -g --email/)) {

                let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
                 let check = string.split('=')
 
                 if(check[0] !== 'users -g --email'){
                     return this.emit('error', {
                         error: `'${check[0]}' is not command.`
                     })
                 }
                 if(!emailRegex.test(check[1].trim())){
                     return this.emit('error', {
                         error: `'${check[1]}' is not a valid email address.`
                     })
                 }
             
                 try{
                    const users = await this.findAll('users')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })


                         console.log()
                        readable.on('data', chunked => {

                           let chunk = JSON.parse(chunked)
                           if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
                            let user = {}
                            user.name = `${chunk.firstname} ${chunk.lastname}`
                            user.phone = chunk.phone
                            user.email = chunk.email
                            user.registered = chunk.created_at
                            console.log(user)
                           // return 
                           }
                           
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
             else if (command[1].match(/ -d --email/)) {

                 //users -d --email=ericson.weah@devoutprogrammer.com

                let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
                 let check = string.split('=')
 
                 if(check[0] !== 'users -d --email'){
                     return this.emit('error', {
                         error: `'${check[0]}' is not command.`
                     })
                 }
                 if(!emailRegex.test(check[1].trim())){
                     return this.emit('error', {
                         error: `'${check[1]}' is not a valid email address.`
                     })
                 }
             
                 try{
                    const users = await this.findAll('users')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                         readable.on('error' , error => {
                            this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })


                         console.log()
                        readable.on('data', chunked => {

                           let chunk = JSON.parse(chunked)
                           if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
                            // let path = `${this.base()}/users/${chunk.phone}.json`
                            let path = `${this.base()}/users/${user}`
                            promises.unlink(path)
                            .then(() => {
                             this.emit('success', {
                                 message: `User deleted.`
                             })
                            })
                            .catch(error => {
                             this.emit('error', {
                                 error: `User with this phone number does not even exist.`
                             })
                            })
                           return 
                           }
                           
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

             else if (command[1].match(/ --get --email/)) {
                //users --get --email=ericson.weah@devoutprogrammer.com

                let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
                 let check = string.split('=')
 
                 if(check[0] !== 'users --get --email'){
                     return this.emit('error', {
                         error: `'${check[0]}' is not command.`
                     })
                 }
                 if(!emailRegex.test(check[1].trim())){
                     return this.emit('error', {
                         error: `'${check[1]}' is not a valid email address.`
                     })
                 }
             
                 try{
                    const users = await this.findAll('users')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })


                         console.log()
                        readable.on('data', chunked => {

                           let chunk = JSON.parse(chunked)
                           if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
                            let user = {}
                            user.name = `${chunk.firstname} ${chunk.lastname}`
                            user.phone = chunk.phone
                            user.email = chunk.email
                            user.registered = chunk.created_at
                            console.log(user)
                           // return 
                           }
                           
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

             else if (command[1].match(/ --get -e/)) {
                //users --get -e ericson.weah@devoutprogrammer.com

                let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
                 let check = string.split('-e')
 
                 if(check[0].trim() !== 'users --get'){
                     return this.emit('error', {
                         error: `'${check[0].trim()}' is not command.`
                     })
                 }
                 if(!emailRegex.test(check[1].trim())){
                     return this.emit('error', {
                         error: `'${check[1]}' is not a valid email address.`
                     })
                 }
             
                 try{
                    const users = await this.findAll('users')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })


                         console.log()
                        readable.on('data', chunked => {

                           let chunk = JSON.parse(chunked)
                           if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
                            let user = {}
                            user.name = `${chunk.firstname} ${chunk.lastname}`
                            user.phone = chunk.phone
                            user.email = chunk.email
                            user.registered = chunk.created_at
                            console.log(user)
                           // return 
                           }
                           
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

             else if (command[1].match(/ -g -e/)) {
                //users -g -e ericson.weah@devoutprogrammer.com

                let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
                 let check = string.split('-e')
 
                 if(check[0].trim() !== 'users -g'){
                     return this.emit('error', {
                         error: `'${check[0].trim()}' is not command.`
                     })
                 }
                 if(!emailRegex.test(check[1].trim())){
                     return this.emit('error', {
                         error: `'${check[1]}' is not a valid email address.`
                     })
                 }
             
                 try{
                    const users = await this.findAll('users')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })


                         console.log()
                        readable.on('data', chunked => {

                           let chunk = JSON.parse(chunked)
                           if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
                            let user = {}
                            user.name = `${chunk.firstname} ${chunk.lastname}`
                            user.phone = chunk.phone
                            user.email = chunk.email
                            user.registered = chunk.created_at
                            console.log(user)
                           // return 
                           }
                           
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



            // users --get --phone
           else if (command[1].match(/ --get --phone/)) {

            let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
            let check = string.split('=')
            if(check[0] !== 'users --get --phone'){
                return this.emit('error', {
                    error: `'${check[0]}' is not command.`
                })
            }
            if(!phoneRegex.test(parseInt(check[1]))){
                return this.emit('error', {
                    error: `'${check[1]}' is not a valid phone number.`
                })
            }
            if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                return this.emit('error', {
                    error: `'${check[1]}' is not a valid phone number.`
                })
            }
                if (string.length !== 'users --get --phone=6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command, users --get --phone`
                })
                let phone = check[1].trim()
                let path = `${this.base()}/users/${phone}.json`
                let readable = createReadStream(path, 'utf-8')

                readable.on('data', chunk => {
                    let user = JSON.parse(chunk)
                    delete user.aToken
                    delete user.password
                    console.log(user)
                })
                readable.on('end', () => {})
                readable.on('error', error => {
                    this.emit('error', {
                        error: `could not find a user with this phone number.`
                    })
                })
            }
            // users -g -p
            else if (command[1].match(/ -g -p/)) {

            let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
            let check = string.split('-p')
            if(check[0].trim() !== 'users -g'){
                return this.emit('error', {
                    error: `'${check[0]} -p' is not command.`
                })
            }
            if(!phoneRegex.test(parseInt(check[1].trim()))){
                return this.emit('error', {
                    error: `'${check[1].trim()}' is not a valid phone number.`
                })
            }
            if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                return this.emit('error', {
                    error: `'${check[1]}' is not a valid phone number.`
                })
            }
                if (string.length !== 'users -g -p 6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command, users -g -p`
                })
                let phone = check[1].trim()
                let path = `${this.base()}/users/${phone}.json`
                let readable = createReadStream(path, 'utf-8')

                readable.on('data', chunk => {
                    let user = JSON.parse(chunk)
                    delete user.aToken
                    delete user.password
                    console.log(user)
                })
                readable.on('end', () => {})
                readable.on('error', error => {
                    this.emit('error', {
                        error: `could not find a user with this phone number.`
                    })
                })
            }

            // users --get -p
            if (command[1].match(/--get -p/)) {

                let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('-p')
                if(check[0].trim() !== 'users --get'){
                    return this.emit('error', {
                        error: `'${check[0]} -p' is not command.`
                    })
                }
                if(!phoneRegex.test(parseInt(check[1].trim()))){
                    return this.emit('error', {
                        error: `'${check[1].trim()}' is not a valid phone number.`
                    })
                }
                if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if (string.length !== 'users --get -p 6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command, users --get -p`
                })
                let phone = check[1].trim()
                let path = `${this.base()}/users/${phone}.json`
                let readable = createReadStream(path, 'utf-8')

                readable.on('data', chunk => {
                    let user = JSON.parse(chunk)
                    delete user.aToken
                    delete user.password
                    console.log(user)
                })
                readable.on('end', () => {})
                readable.on('error', error => {
                    this.emit('error', {
                        error: `could not find a user with this phone number.`
                    })
                })
            }

            // users -d --phone
            else if (command[1].match(/ -d --phone/)) {

                let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
                let check = string.split('=')
                if(check[0] !== 'users -d --phone'){
                    return this.emit('error', {
                        error: `'${check[0]}' is not command.`
                    })
                }
                if(!phoneRegex.test(parseInt(check[1]))){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if (string.length !== 'users -d --phone=6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command, users -d --phone`
                })
                let phone = check[1].trim()
 
                 let path = `${this.base()}/users/${phone}.json`
                promises.unlink(path)
                .then(() => {
                 this.emit('success', {
                     message: `User deleted.`
                 })
                })
                .catch(error => {
                 this.emit('error', {
                     error: `User with this phone number does not even exist.`
                 })
                })
            }

         // users --delete --phone
            else if (command[1].match(/ --delete --phone/)) {

                let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
                let check = string.split('=')
                if(check[0] !== 'users --delete --phone'){
                    return this.emit('error', {
                        error: `'${check[0]}' is not command.`
                    })
                }
                if(!phoneRegex.test(parseInt(check[1]))){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if (string.length !== 'users --delete --phone=6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command, users --delete --phone`
                })
                let phone = check[1].trim()
 
                 let path = `${this.base()}/users/${phone}.json`
                promises.unlink(path)
                .then(() => {
                 this.emit('success', {
                     message: `User deleted.`
                 })
                })
                .catch(error => {
                 this.emit('error', {
                     error: `User with this phone number does not even exist.`
                 })
                })
            }

            // users -d -p
            else if (command[1].match(/ -d -p/)) {

                let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('-p')
                if(check[0].trim() !== 'users -d'){
                    return this.emit('error', {
                        error: `'${check[0]} -p' is not command.`
                    })
                }
                if(!phoneRegex.test(parseInt(check[1].trim()))){
                    return this.emit('error', {
                        error: `'${check[1].trim()}' is not a valid phone number.`
                    })
                }
                if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if (string.length !== 'users -d -p 6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command, users -d -p`
                })
                let phone = check[1].trim()
 
                let path = `${this.base()}/users/${phone}.json`
                promises.unlink(path)
                .then(() => {
                 this.emit('success', {
                     message: `User deleted.`
                 })
                })
                .catch(error => {
                 this.emit('error', {
                     error: `User with this phone number does not even exist.`
                 })
                })
            }

            // users --delete -p
            else if (command[1].match(/ --delete -p/)) {

                let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

                let check = string.split('-p')
                if(check[0].trim() !== 'users --delete'){
                    return this.emit('error', {
                        error: `'${check[0]} -p' is not command.`
                    })
                }
                if(!phoneRegex.test(parseInt(check[1].trim()))){
                    return this.emit('error', {
                        error: `'${check[1].trim()}' is not a valid phone number.`
                    })
                }
                if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
                    return this.emit('error', {
                        error: `'${check[1]}' is not a valid phone number.`
                    })
                }
                if (string.length !== 'users --delete -p 6122071306'.length) return this.emit('error', {
                    error: `'${string}' is not command, users --delete -p`
                })
                let phone = check[1].trim()
 
                let path = `${this.base()}/users/${phone}.json`
                promises.unlink(path)
                .then(() => {
                 this.emit('success', {
                     message: `User deleted.`
                 })
                })
                .catch(error => {
                 this.emit('error', {
                     error: `User with this phone number does not even exist.`
                 })
                })
                
            }

//             // users -l
            else if (command[1].match(/ -l/)) {
                if (string.length !== 'users -l'.length) return this.emit('error', {
                    error: `'${string}' is not command, users -l`
                })
                if (string !== 'users -l') return this.emit('error', {
                    error: `'${string}' is not command, users -l`
                })

                try{
                    const users = await this.findAll('users')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })
                         console.log()
                        readable.on('data', chunked => {
                           
                           let user = {}
                           let chunk = JSON.parse(chunked)
                           user.name = `${chunk.firstname} ${chunk.lastname}`
                           user.phone = chunk.phone
                           user.email = chunk.email
                           user.registered = chunk.created_at
                           console.log(user)
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
//             // users --load
           else if (command[1].match(/ --load/)) {
                if (string.length !== 'users --load'.length) return this.emit('error', {
                    error: `'${string}' is not command, users -load`
                })
                if (string!== 'users --load') return this.emit('error', {
                    error: `'${string}' is not command, users -load`
                })

                try{
                    let appUsers = []
                    const users = await this.findAll('users')
                    if(users && users.length > 0){
                      users.forEach(user => {
                         let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                         readable.on('error' , error => {
                             this.emit('error', {error: `Could not find user with phone number ${user}`})
                         })
                         console.log()
                        readable.on('data', chunked => {
                           
                           let user = {}
                           let chunk = JSON.parse(chunked)
                           user.name = `${chunk.firstname} ${chunk.lastname}`
                           user.phone = chunk.phone
                           user.email = chunk.email
                           user.registered = chunk.created_at
                           appUsers.push(user)
                        })
                        readable.on('end', () => {
                         console.log()
                         this.emit('app-users', appUsers)
                        })
                      })
                      
                      this.once('app-users', data => {
                          console.clear()
                          console.table(data)
                          this._interface.prompt()
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


module.exports = UserCommand

new UserCommand()







// 'use strict'

// const {createReadStream, createWriteStream, promises} = require('fs')
// const {Readable, PassThrough, Transform} = require('stream')
// const path = require('path')
// const os = require('os')
// const v8 = require('v8')

// const CLI = require('./cli')


// class Command extends CLI{

//     constructor(){
//         super()
//         this.autobind(Command)
//         this.autoinvoker(Command)

//         this.credentials = {
//             phone: '6122071306',
//             password: 'password'
//         }
//     }

//     autobinder(className = {}){
//         for(let method of Object.getOwnPropertyNames(className.prototype)){
//           if(typeof(this[method]) === 'function' && method !=='constructor'){
//               this[method] = this[method].bind(this)
//           }
//         }
//     }
//     autobind(className = {}){
//         this.autobinder = this.autobinder.bind(this)
//         this.autobinder(className)
//     }

//     autoinvoker(className = {}){
//         for(let method of Object.getOwnPropertyNames(className.prototype)){
//           if(typeof(this[method]) === 'function' && method !=='constructor' && method !== 'autoinvoker' && method !== 'autobinder' && method !== 'autobind' && method !== 'base' && method !=='findAll'){this[method]()}
//         }
//     }
//     init() {
//         console.log('\x1b[34m%s\x1b[0m', 'cli is running')
//         console.log('')
//         this._interface.prompt()
//         this._interface.on('line', string => {
//             this.input(string)
//             this._interface.prompt()
//         })
       
//     }
//     base(){
//         return path.join(__dirname, '../../resources/storage/.data')
//     }
//    async findAll(path){
//      return await promises.readdir(`${this.base()}/${path}`);
//     }
//     login() {
//         this.on('login', () => {
//             this._interface.question('Phone Number: ', phone => {
//                 if (phone.trim().length !== 10 || typeof (phone) !== 'string') {
//                     console.log('\x1b[31m%s\x1b[0m', 'Invalid phone number!')
//                     process.exit(0)
//                 }
//                 phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone.toLocaleLowerCase().trim() : false
//                 if (!phone) {
//                     console.log('\x1b[31m%s\x1b[0m', 'admin phone number required')
//                     process.exit(0)
//                 }
//                 if (phone) {
//                     this._interface.question('Password: ', password => {
//                         if (typeof (password) !== 'string' || password.trim().length < 8) {
//                             console.log('\x1b[31m%s\x1b[0m', 'Invalid password')
//                             process.exit(0)
//                         }
//                         password = typeof (password) === 'string' && password.trim().length >= 8 ? password.trim() : false
//                         if (!password) {
//                             console.log('\x1b[31m%s\x1b[0m', 'admin phone required')
//                             process.exit(0)
//                         }
//                         if (password) {
//                             if (phone.trim().toLocaleLowerCase() !== this.credentials.phone.trim().toLocaleLowerCase()) {
//                                 console.log('\x1b[31m%s\x1b[0m', 'Unrecognized phone number')
//                                 process.exit(0)
//                             }
//                             if (password.trim().toLocaleLowerCase() !== this.credentials.password.trim().toLocaleLowerCase()) {
//                                 console.log('\x1b[31m%s\x1b[0m', 'Incorrect password')
//                                 process.exit(0)
//                             }
//                             if (phone.trim().toLocaleLowerCase() === this.credentials.phone.trim().toLocaleLowerCase()) {
//                                 if (password.trim().toLocaleLowerCase() === this.credentials.password.trim().toLocaleLowerCase()) {
//                                     console.log('\x1b[32m%s\x1b[0m', 'You are logged in!')
//                                     this.auth = true
//                                     this._interface.prompt()
//                                 }
//                             }
//                         }

//                     })
//                 }

//             })
//         })


//     }
//     mancommand(){
//         this.on('man', string => {
//             const commands = {
//                 'man': 'Command Line Interface (CLI) Manual',
//                 'help': 'Alias of the "man" command',
//                 'exit': 'Kill the CLI and the rest of the application',
//                 'quit': 'Kill the CLI and the rest of the application',
//                 'carts': 'List all the carts',
//                 'stats': 'Get statistics of the underlying operating system and resouce utilization',
//                 'users': 'List all the registered users in the system',
//                 'login': 'Login as an admin',
//                 'logout': 'Logout as an admin',
//                 'guests': 'List all the guests in the system',
//                 'orders': 'List all the orders in the system',
//                 'contacts': 'List all the contacts',
//                 'shippings': 'List all the shippings'
//             }
        
//             let command = string.split(' ').filter(str => str !== '').join(' ')
 
//             let event = this.man().find(event => command.indexOf(event) > -1)

//             if (event === undefined) {
//                 return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//             }


//             if(event === 'man'){
//                 if (command.length !== 3) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
                        
//                 let centered = `\x1b[36mNAME\x1b[0m
//         \x1b[36mman\x1b[0m -- CLIM: Command Line Interface Manual
    
//     \x1b[36mSYPNOSIS\x1b[0m
//         \x1b[36mman\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
      
//     \x1b[36mDESCRIPTION\x1b[0m
//         CLIM: Command Line Interface Manual
    
//                 `
            
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) MANUAL\x1b[0m`)
              
//                 this.horizontalLine()
//                 this.verticalSpace()
//                 this.description(centered)
//                 this.verticalSpace()
//                 this.horizontalLine()
            
//                 this.verticalSpace()
            
//                 // Show each command followed by its explanation in white and yellow respectively
            
//                 for (let key in commands) {
//                     if (commands.hasOwnProperty(key)) {
//                         let value = commands[key]
//                         let line = `\x1b[36m${key}\x1b[0m`
//                         let padding = 20 - line.length
//                         for (let i = 0; i < padding; i++) {
//                             line += ' '
//                         }
//                         line += value
//                         console.log(line)
//                         this.verticalSpace(1)
//                     }
//                 }
//                 this.horizontalLine()
//             }


//             if(event === 'man man'){
//                 if (command.length !== 7) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
                        
//                 let centered = `\x1b[36mNAME\x1b[0m
//         \x1b[36mman\x1b[0m -- CLIM: Command Line Interface Manual
    
//     \x1b[36mSYPNOSIS\x1b[0m
//         \x1b[36mman\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
      
//     \x1b[36mDESCRIPTION\x1b[0m
//         CLIM: Command Line Interface Manual
    
//                 `
            
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) MANUAL\x1b[0m`)
              
//                 this.horizontalLine()
//                 this.verticalSpace()
//                 this.description(centered)
//                 this.verticalSpace()
//                 this.horizontalLine()
            
//                 this.verticalSpace()
            
//                 // Show each command followed by its explanation in white and yellow respectively
            
//                 for (let key in commands) {
//                     if (commands.hasOwnProperty(key)) {
//                         let value = commands[key]
//                         let line = `\x1b[36m${key}\x1b[0m`
//                         let padding = 20 - line.length
//                         for (let i = 0; i < padding; i++) {
//                             line += ' '
//                         }
//                         line += value
//                         console.log(line)
//                         this.verticalSpace(1)
//                     }
//                 }
//                 this.horizontalLine()
//             }

//             if(event === 'man help'){
//                 if (command.length !== 8) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                             let centered = `\x1b[36mNAME\x1b[0m
//     \x1b[36mhelp\x1b[0m -- CLIM: Command Line Interface Help And Usage

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36mhelp\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
  
// \x1b[36mDESCRIPTION\x1b[0m
//     CLIM: Command Line Interface Help And Usage

//             `
        
//             this.horizontalLine()
//             this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) HELP AND USAGE\x1b[0m`)
          
//             this.horizontalLine()
//             this.verticalSpace()
//             this.description(centered)
//             this.verticalSpace()
//             this.horizontalLine()
        
//             this.verticalSpace()
        
//             // Show each command followed by its explanation in white and yellow respectively
        
//             for (let key in commands) {
//                 if (commands.hasOwnProperty(key)) {
//                     let value = commands[key]
//                     let line = `\x1b[36m${key}\x1b[0m`
//                     let padding = 20 - line.length
//                     for (let i = 0; i < padding; i++) {
//                         line += ' '
//                     }
//                     line += value
//                     console.log(line)
//                     this.verticalSpace(1)
//                 }
//             }
//             this.horizontalLine()
//             }

//             if (event === 'man users') {
       
//                 if (command.length !== 9) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                 const userscmd = {
//                     '--help, -h': 'Help',
//                     '--load, -l': 'Load users',
//                     '-g -p phone, -g --phone=phone': 'Get the user with the specified phone number',
//                     '--get -p phone, --get --phone=phone': 'Get the user with the specified phone number',
//                     '-d -p phone, -d --phone=phone': 'delete the user with the specified phone number',
//                     '--delete -p phone, --delete --phone=phone': 'delete the user with the specified phone number',
    
//                 }
    

//                            let centered = `\x1b[36mNAME\x1b[0m
//     \x1b[36musers\x1b[0m -- Application users and a user's details 

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
//     \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
//     \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
//     \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]

// \x1b[36mDESCRIPTION\x1b[0m
//     Application users and a user's details  

//             `
//             this.horizontalLine()
//             this.centered(`\x1b[32mUSERS HELP AND USAGE\x1b[0m`)
//             this.horizontalLine()
//             this.description(centered)
//             this.horizontalLine()
//             this.verticalSpace(2)
        
//             // Show each command followed by its explanation in white and yellow respectively
        
//             for (let key in userscmd) {
//                 if (userscmd.hasOwnProperty(key)) {
//                     let value = userscmd[key]
//                     let line = `\x1b[36m${key}\x1b[0m`
//                     let padding = 60 - line.length
//                     for (let i = 0; i < padding; i++) {
//                         line += ' '
//                     }
//                     line += value
//                     console.log(line)
//                     this.verticalSpace(1)
//                 }
//             }
//             this.horizontalLine()
                
//             }

//             if (event === 'man stats') {
       
//                 if (command.length !== 9) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })

//             const statscmd = {
//                 '--help, -h': 'Show stats help, command options, and usage',
//                 '--load, -l': 'Shows load average',
//                 '--uptime, -u': 'System uptime',
//                 '--cpu-count, --cpu, -c, -c -c': 'CPU Count',
//                 '--free-memory, --fm, -f, -f -m': 'Free Memory',
//                 '--current-malloced-memory, --cmm, -cmm, -c -m -m':  'Current Malloced Memory',
//                 '--peak-malloced-memory, --pmm, -pmm, -p -m -m': 'Peak Malloced Memory',
//                 '--allocated-heap-used, --ahu,-ahu, -a -h -u': 'Allocated Heap Used (%)',
//                 '--available-heap-allocated, --aha, -aha, -a -h -a': 'Allocated Heap Allocated (%)',
          
//             }
        
//             let centered = `\x1b[36mNAME\x1b[0m
//     \x1b[36mstats\x1b[0m -- Gives application system level statistics 

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36mstats\x1b[0m [\x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--uptime\x1b[0m | \x1b[36m-u\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--cpu-count\x1b[0m | \x1b[36m--cpu\x1b[0m | \x1b[36m-cpu\x1b[0m | \x1b[36m-c\x1b[0m | \x1b[36m-c -c\x1b[0m] 
//     \x1b[36mstats\x1b[0m [\x1b[36m--free-memory\x1b[0m | \x1b[36m--fm\x1b[0m | \x1b[36m-fm\x1b[0m | \x1b[36m-f\x1b[0m | \x1b[36m-f -m\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--current-malloced-memory\x1b[0m | \x1b[36m--cmm\x1b[0m | \x1b[36m-cmm\x1b[0m | \x1b[36m-c -m -m\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--peak-malloced-memory\x1b[0m | \x1b[36m--pmm\x1b[0m | \x1b[36m-pmm\x1b[0m | \x1b[36m-p -m -m\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--allocated-heap-used\x1b[0m | \x1b[36m--ahu\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -u\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--available-heap-allocated\x1b[0m | \x1b[36m--aha\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -a\x1b[0m]
  
// \x1b[36mDESCRIPTION\x1b[0m
//     Gives application system level statistics 

//             `
//             this.horizontalLine()
//             this.centered(`\x1b[32mSTATS HELP AND USAGE\x1b[0m`)
//             this.horizontalLine()
//             this.description(centered)
//             this.horizontalLine()
//             this.verticalSpace(2)
        
//             // Show each command followed by its explanation in white and yellow respectively
        
//             for (let key in statscmd) {
//                 if (statscmd.hasOwnProperty(key)) {
//                     let value = statscmd[key]
//                     let line = `\x1b[36m${key}\x1b[0m`
//                     let padding = 60 - line.length
//                     for (let i = 0; i < padding; i++) {
//                         line += ' '
//                     }
//                     line += value
//                     console.log(line)
//                     this.verticalSpace(1)
//                 }
//             }
//             this.horizontalLine()
//             }
            
//         })         
//     }

//     helpcommand(){
//         this.on('help', string => {
//             const commands = {
//                 'man': 'Command Line Interface (CLI) Manual',
//                 'help': 'Alias of the "man" command',
//                 'exit': 'Kill the CLI and the rest of the application',
//                 'quit': 'Kill the CLI and the rest of the application',
//                 'carts': 'List all the carts',
//                 'stats': 'Get statistics of the underlying operating system and resouce utilization',
//                 'users': 'List all the registered users in the system',
//                 'login': 'Login as an admin',
//                 'logout': 'Logout as an admin',
//                 'guests': 'List all the guests in the system',
//                 'orders': 'List all the orders in the system',
//                 'contacts': 'List all the contacts',
//                 'shippings': 'List all the shippings'
//             }
        
//             let command = string.split(' ').filter(str => str !== '').join(' ')
 
//             let event = this.help().find(event => command.indexOf(event) > -1)

//             if (event === undefined) {
//                 return this.emit('error', {
//                     error: `'${string}' is not command help event undefinied`
//                 })
//             }


//             if(event === 'help'){
//                 if (command.length !== 4) return this.emit('error', {
//                     error: `'${string}' is not command help help`
//                 })
//                             let centered = `\x1b[36mNAME\x1b[0m
//     \x1b[36mhelp\x1b[0m -- CLIM: Command Line Interface Help And Usage

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36mhelp\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
  
// \x1b[36mDESCRIPTION\x1b[0m
//     CLIM: Command Line Interface Help And Usage

//             `
        
//             this.horizontalLine()
//             this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) HELP AND USAGE\x1b[0m`)
          
//             this.horizontalLine()
//             this.verticalSpace()
//             this.description(centered)
//             this.verticalSpace()
//             this.horizontalLine()
        
//             this.verticalSpace()
        
//             // Show each command followed by its explanation in white and yellow respectively
        
//             for (let key in commands) {
//                 if (commands.hasOwnProperty(key)) {
//                     let value = commands[key]
//                     let line = `\x1b[36m${key}\x1b[0m`
//                     let padding = 20 - line.length
//                     for (let i = 0; i < padding; i++) {
//                         line += ' '
//                     }
//                     line += value
//                     console.log(line)
//                     this.verticalSpace(1)
//                 }
//             }
//             this.horizontalLine()
//             }

//             if(event === 'help man'){
//                 if (command.length !== 8) return this.emit('error', {
//                     error: `'${string}' is not command help help.`
//                 })
                        
//                 let centered = `\x1b[36mNAME\x1b[0m
//         \x1b[36mman\x1b[0m -- CLIM: Command Line Interface Manual
    
//     \x1b[36mSYPNOSIS\x1b[0m
//         \x1b[36mman\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
      
//     \x1b[36mDESCRIPTION\x1b[0m
//         CLIM: Command Line Interface Manual
    
//                 `
            
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) MANUAL\x1b[0m`)
              
//                 this.horizontalLine()
//                 this.verticalSpace()
//                 this.description(centered)
//                 this.verticalSpace()
//                 this.horizontalLine()
            
//                 this.verticalSpace()
            
//                 // Show each command followed by its explanation in white and yellow respectively
            
//                 for (let key in commands) {
//                     if (commands.hasOwnProperty(key)) {
//                         let value = commands[key]
//                         let line = `\x1b[36m${key}\x1b[0m`
//                         let padding = 20 - line.length
//                         for (let i = 0; i < padding; i++) {
//                             line += ' '
//                         }
//                         line += value
//                         console.log(line)
//                         this.verticalSpace(1)
//                     }
//                 }
//                 this.horizontalLine()
//             }

//             if(event === 'help help'){
//                 if (command.length !== 9) return this.emit('error', {
//                     error: `'${string}' is not command help help`
//                 })
//                             let centered = `\x1b[36mNAME\x1b[0m
//     \x1b[36mhelp\x1b[0m -- CLIM: Command Line Interface Help And Usage

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36mhelp\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
  
// \x1b[36mDESCRIPTION\x1b[0m
//     CLIM: Command Line Interface Help And Usage

//             `
        
//             this.horizontalLine()
//             this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) HELP AND USAGE\x1b[0m`)
          
//             this.horizontalLine()
//             this.verticalSpace()
//             this.description(centered)
//             this.verticalSpace()
//             this.horizontalLine()
        
//             this.verticalSpace()
        
//             // Show each command followed by its explanation in white and yellow respectively
        
//             for (let key in commands) {
//                 if (commands.hasOwnProperty(key)) {
//                     let value = commands[key]
//                     let line = `\x1b[36m${key}\x1b[0m`
//                     let padding = 20 - line.length
//                     for (let i = 0; i < padding; i++) {
//                         line += ' '
//                     }
//                     line += value
//                     console.log(line)
//                     this.verticalSpace(1)
//                 }
//             }
//             this.horizontalLine()
//             }

//             if (event === 'help users') {
       
//                 if (command.length !== 10) return this.emit('error', {
//                     error: `'${string}' is not command help users`
//                 })
//                 const userscmd = {
//                     '--help, -h': 'Help',
//                     '--load, -l': 'Load users',
//                     '-g -p phone, -g --phone=phone': 'Get the user with the specified phone number',
//                     '--get -p phone, --get --phone=phone': 'Get the user with the specified phone number',
//                     '-d -p phone, -d --phone=phone': 'delete the user with the specified phone number',
//                     '--delete -p phone, --delete --phone=phone': 'delete the user with the specified phone number',
    
//                 }
    

//                            let centered = `\x1b[36mNAME\x1b[0m
//     \x1b[36musers\x1b[0m -- Application users and a user's details 

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
//     \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
//     \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
//     \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]

// \x1b[36mDESCRIPTION\x1b[0m
//     Application users and a user's details  

//             `
//             this.horizontalLine()
//             this.centered(`\x1b[32mUSERS HELP AND USAGE\x1b[0m`)
//             this.horizontalLine()
//             this.description(centered)
//             this.horizontalLine()
//             this.verticalSpace(2)
        
//             // Show each command followed by its explanation in white and yellow respectively
        
//             for (let key in userscmd) {
//                 if (userscmd.hasOwnProperty(key)) {
//                     let value = userscmd[key]
//                     let line = `\x1b[36m${key}\x1b[0m`
//                     let padding = 60 - line.length
//                     for (let i = 0; i < padding; i++) {
//                         line += ' '
//                     }
//                     line += value
//                     console.log(line)
//                     this.verticalSpace(1)
//                 }
//             }
//             this.horizontalLine()
                
//             }

//             if (event === 'help stats') {
       
//                 if (command.length !== 10) return this.emit('error', {
//                     error: `'${string}' is not command help stats`
//                 })

//             const statscmd = {
//                 '--help, -h': 'Show stats help, command options, and usage',
//                 '--load, -l': 'Shows load average',
//                 '--uptime, -u': 'System uptime',
//                 '--cpu-count, --cpu, -c, -c -c': 'CPU Count',
//                 '--free-memory, --fm, -f, -f -m': 'Free Memory',
//                 '--current-malloced-memory, --cmm, -cmm, -c -m -m':  'Current Malloced Memory',
//                 '--peak-malloced-memory, --pmm, -pmm, -p -m -m': 'Peak Malloced Memory',
//                 '--allocated-heap-used, --ahu,-ahu, -a -h -u': 'Allocated Heap Used (%)',
//                 '--available-heap-allocated, --aha, -aha, -a -h -a': 'Allocated Heap Allocated (%)',
          
//             }
        
//             let centered = `\x1b[36mNAME\x1b[0m
//     \x1b[36mstats\x1b[0m -- Gives application system level statistics 

// \x1b[36mSYPNOSIS\x1b[0m
//     \x1b[36mstats\x1b[0m [\x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--uptime\x1b[0m | \x1b[36m-u\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--cpu-count\x1b[0m | \x1b[36m--cpu\x1b[0m | \x1b[36m-cpu\x1b[0m | \x1b[36m-c\x1b[0m | \x1b[36m-c -c\x1b[0m] 
//     \x1b[36mstats\x1b[0m [\x1b[36m--free-memory\x1b[0m | \x1b[36m--fm\x1b[0m | \x1b[36m-fm\x1b[0m | \x1b[36m-f\x1b[0m | \x1b[36m-f -m\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--current-malloced-memory\x1b[0m | \x1b[36m--cmm\x1b[0m | \x1b[36m-cmm\x1b[0m | \x1b[36m-c -m -m\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--peak-malloced-memory\x1b[0m | \x1b[36m--pmm\x1b[0m | \x1b[36m-pmm\x1b[0m | \x1b[36m-p -m -m\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--allocated-heap-used\x1b[0m | \x1b[36m--ahu\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -u\x1b[0m]
//     \x1b[36mstats\x1b[0m [\x1b[36m--available-heap-allocated\x1b[0m | \x1b[36m--aha\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -a\x1b[0m]
  
// \x1b[36mDESCRIPTION\x1b[0m
//     Gives application system level statistics 

//             `
//             this.horizontalLine()
//             this.centered(`\x1b[32mSTATS HELP AND USAGE\x1b[0m`)
//             this.horizontalLine()
//             this.description(centered)
//             this.horizontalLine()
//             this.verticalSpace(2)
        
//             // Show each command followed by its explanation in white and yellow respectively
        
//             for (let key in statscmd) {
//                 if (statscmd.hasOwnProperty(key)) {
//                     let value = statscmd[key]
//                     let line = `\x1b[36m${key}\x1b[0m`
//                     let padding = 60 - line.length
//                     for (let i = 0; i < padding; i++) {
//                         line += ' '
//                     }
//                     line += value
//                     console.log(line)
//                     this.verticalSpace(1)
//                 }
//             }
//             this.horizontalLine()
//             }
            
//         })         
//     }
   
//     quit(){
//         this.on('quit', () => {
//             console.log('You have asked for quit')
//         })
//     }
//     leave(){
//         this.on('leave', () => {
//             console.log('You have asked for leave')
//         })
//     }
//     exit(){
//         this.on('exit', () =>{
//             process.exit(0)
//         })
//     }
//     statscommand() {
//         this.on('stats', string => {
      
//             let command = string.split(' ').filter(str => str !== '').join(' ')
 
//             let event = this.stats().find(event => command.indexOf(event) > -1)
//             console.log('event: ', event)
//             console.log('command', command)

//             if (event === undefined) {
//                 return this.emit('error', {
//                     error: `'${string}' is not command...`
//                 })
//             }

//             if(event === 'stats'){
//                 if (command.length !== 'stats'.length) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                 const commands = {
//                     '--help, -h': 'Show stats help, command options, and usage',
//                     '--load, -l': 'Shows load average',
//                     '--uptime, -u': 'System uptime',
//                     '--cpu-count, --cpu, -c, -c -c': 'CPU Count',
//                     '--free-memory, --fm, -f, -f -m': 'Free Memory',
//                     '--current-malloced-memory, --cmm, -cmm, -c -m -m':  'Current Malloced Memory',
//                     '--peak-malloced-memory, --pmm, -pmm, -p -m -m': 'Peak Malloced Memory',
//                     '--allocated-heap-used, --ahu,-ahu, -a -h -u': 'Allocated Heap Used (%)',
//                     '--available-heap-allocated, --aha, -aha, -a -h -a': 'Allocated Heap Allocated (%)',
              
//                 }
            
//                 let centered = `\x1b[36mNAME\x1b[0m
//         \x1b[36mstats\x1b[0m -- Gives application system level statistics 
    
//     \x1b[36mSYPNOSIS\x1b[0m
//         \x1b[36mstats\x1b[0m [\x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m]
//         \x1b[36mstats\x1b[0m [\x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m]
//         \x1b[36mstats\x1b[0m [\x1b[36m--uptime\x1b[0m | \x1b[36m-u\x1b[0m]
//         \x1b[36mstats\x1b[0m [\x1b[36m--cpu-count\x1b[0m | \x1b[36m--cpu\x1b[0m | \x1b[36m-cpu\x1b[0m | \x1b[36m-c\x1b[0m | \x1b[36m-c -c\x1b[0m] 
//         \x1b[36mstats\x1b[0m [\x1b[36m--free-memory\x1b[0m | \x1b[36m--fm\x1b[0m | \x1b[36m-fm\x1b[0m | \x1b[36m-f\x1b[0m | \x1b[36m-f -m\x1b[0m]
//         \x1b[36mstats\x1b[0m [\x1b[36m--current-malloced-memory\x1b[0m | \x1b[36m--cmm\x1b[0m | \x1b[36m-cmm\x1b[0m | \x1b[36m-c -m -m\x1b[0m]
//         \x1b[36mstats\x1b[0m [\x1b[36m--peak-malloced-memory\x1b[0m | \x1b[36m--pmm\x1b[0m | \x1b[36m-pmm\x1b[0m | \x1b[36m-p -m -m\x1b[0m]
//         \x1b[36mstats\x1b[0m [\x1b[36m--allocated-heap-used\x1b[0m | \x1b[36m--ahu\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -u\x1b[0m]
//         \x1b[36mstats\x1b[0m [\x1b[36m--available-heap-allocated\x1b[0m | \x1b[36m--aha\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -a\x1b[0m]
      
//     \x1b[36mDESCRIPTION\x1b[0m
//         Gives application system level statistics 
    
//                 `
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mSTATS HELP AND USAGE\x1b[0m`)
//                 this.horizontalLine()
//                 this.description(centered)
//                 this.horizontalLine()
//                 this.verticalSpace(2)
            
//                 // Show each command followed by its explanation in white and yellow respectively
            
//                 for (let key in commands) {
//                     if (commands.hasOwnProperty(key)) {
//                         let value = commands[key]
//                         let line = `\x1b[36m${key}\x1b[0m`
//                         let padding = 60 - line.length
//                         for (let i = 0; i < padding; i++) {
//                             line += ' '
//                         }
//                         line += value
//                         console.log(line)
//                         this.verticalSpace(1)
//                     }
//                 }
//                 this.horizontalLine()
//             }
//                 /// users --all
//             if (event === 'stats --all') {
//                 if (command.length !== 'stats --all'.length) return this.emit('error', {
//                     error: `'${string}' is not command..`
//                 })
//                 const stats = {
//                     'Load Average': os.loadavg().join(' '),
//                     'CPU Count': os.cpus().length,
//                     'Free Memory': os.freemem(),
//                     'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
//                     'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
//                     'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
//                     'Available Heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100),
//                     'Uptime': os.uptime() + ' Seconds'
//                 }
//                 // Show the header for the help page this is as wide as the screen
//                 this.horizontalLine()
//                 this.centered('SYSTEM STATISTICS')
//                 this.horizontalLine()
//                 this.verticalSpace(2)
//                 // logout each stats 
//                 for (let key in stats) {
//                     if (stats.hasOwnProperty(key)) {
//                         let value = stats[key]
//                         let line = `\x1b[36m${key}\x1b[0m`
//                         let padding = 60 - line.length
//                         for (let i = 0; i < padding; i++) {
//                             line += ' '
//                         }
//                         line += value
//                         console.log(line)
//                         this.verticalSpace(1)
//                     }
//                 }
//                 this.verticalSpace(1)
    
//                 // End with another horizontal line
//                 this.horizontalLine()
//             }

//             if (event === 'stats -a') {
//                 if (command.length !== 'stats -a'.length) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                 const stats = {
//                     'Load Average': os.loadavg().join(' '),
//                     'CPU Count': os.cpus().length,
//                     'Free Memory': os.freemem(),
//                     'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
//                     'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
//                     'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
//                     'Available Heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100),
//                     'Uptime': os.uptime() + ' Seconds'
//                 }
//                 // Show the header for the help page this is as wide as the screen
//                 this.horizontalLine()
//                 this.centered('SYSTEM STATISTICS')
//                 this.horizontalLine()
//                 this.verticalSpace(2)
//                 // logout each stats 
//                 for (let key in stats) {
//                     if (stats.hasOwnProperty(key)) {
//                         let value = stats[key]
//                         let line = `\x1b[36m${key}\x1b[0m`
//                         let padding = 60 - line.length
//                         for (let i = 0; i < padding; i++) {
//                             line += ' '
//                         }
//                         line += value
//                         console.log(line)
//                         this.verticalSpace(1)
//                     }
//                 }
//                 this.verticalSpace(1)
    
//                 // End with another horizontal line
//                 this.horizontalLine()
//             }
//             if(event === 'stats --load'){
//                 if (command.length !== 'stats --load'.length) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                 const load =  os.loadavg().join(' ')
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mLOAD AVERAGE\x1b[0m`)
//                 this.horizontalLine()
//                 this.verticalSpace(2)
//                 let value = `\x1b[33m${load}\x1b[0m`
//                 let line = `\x1b[36mLoad Averge: \x1b[0m`
//                 let padding = 60 - line.length
//                 for (let i = 0; i < padding; i++) {
//                     line += ' '
//                 }
//                 line += value
//                 console.log(line)
//                 this.verticalSpace(1)
//                 this.horizontalLine()
//             }

//             if(event === 'stats -l'){
//                 if (command.length !== 'stats -l'.length) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                 const load =  os.loadavg().join(' ')
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mLOAD AVERAGE\x1b[0m`)
//                 this.horizontalLine()
//                 this.verticalSpace(2)
//                 let value = `\x1b[33m${load}\x1b[0m`
//                 let line = `\x1b[36mLoad Averge: \x1b[0m`
//                 let padding = 60 - line.length
//                 for (let i = 0; i < padding; i++) {
//                     line += ' '
//                 }
//                 line += value
//                 console.log(line)
//                 this.verticalSpace(1)
//                 this.horizontalLine()
//             }

//             if(event === 'stats --cpu-count'){
//                 if (command.length !== 'stats --cpu-count'.length) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                 const cpucount =  os.cpus().length
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
//                 this.horizontalLine()
//                 this.verticalSpace(2)
//                 let value = `\x1b[33m${cpucount}\x1b[0m`
//                 let line = `\x1b[36mCPU count: \x1b[0m`
//                 let padding = 70 - line.length
//                 for (let i = 0; i < padding; i++) {
//                     line += ' '
//                 }
//                 line += value
//                 console.log(line)
//                 this.verticalSpace(1)
//                 this.horizontalLine()
//             }


//             if(event === 'stats --cpu'){
//                 if (command.length !== 'stats --cpu'.length) return this.emit('error', {
//                     error: `'${string}' is not command.`
//                 })
//                 const cpucount =  os.cpus().length
//                 this.horizontalLine()
//                 this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
//                 this.horizontalLine()
//                 this.verticalSpace(2)
//                 let value = `\x1b[33m${cpucount}\x1b[0m`
//                 let line = `\x1b[36mCPU count: \x1b[0m`
//                 let padding = 70 - line.length
//                 for (let i = 0; i < padding; i++) {
//                     line += ' '
//                 }
//                 line += value
//                 console.log(line)
//                 this.verticalSpace(1)
//                 this.horizontalLine()
//             }
            
            
//         })
//     }
//     admin(){
//         this.on('admin', () => {
//             console.log('you have asked for admin')
//         })
//     }
//     logout(){
//         this.on('logout', () => {
//             console.log('you have asked for logout')
//         })
//     }

    

//     // Stats load
//     // statsload (){
//     // //     this.on('stats --load', () => {
//     // //         // const load =  os.loadavg().join(' ')
//     // //         // this.horizontalLine()
//     // //         // this.centered(`\x1b[32mLOAD AVERAGE\x1b[0m`)
//     // //         // this.horizontalLine()
//     // //         // this.verticalSpace(2)
//     // //         // let value = `\x1b[33m${load}\x1b[0m`
//     // //         // let line = `\x1b[36mLoad Averge: \x1b[0m`
//     // //         // let padding = 60 - line.length
//     // //         // for (let i = 0; i < padding; i++) {
//     // //         //     line += ' '
//     // //         // }
//     // //         // line += value
//     // //         // console.log(line)
//     // //         // this.verticalSpace(1)
//     // //         // this.horizontalLine()
            
//     // //     })
//     // //     this.on('stats -l', () => {

//     // //         const load =  os.loadavg().join(' ')
//     // //         this.horizontalLine()
//     // //         this.centered(`\x1b[32mLOAD AVERAGE\x1b[0m`)
//     // //         this.horizontalLine()
//     // //         this.verticalSpace(2)
//     // //         let value = `\x1b[33m${load}\x1b[0m`
//     // //         let line = `\x1b[36mLoad Averge: \x1b[0m`
//     // //         let padding = 60 - line.length
//     // //         for (let i = 0; i < padding; i++) {
//     // //             line += ' '
//     // //         }
//     // //         line += value
//     // //         console.log(line)
//     // //         this.verticalSpace(1)
//     // //         this.horizontalLine()
            
     
        
//     // // })
//     // }
//     statscpucount(){
//         // this.on('stats --cpu-count', () => {
//         //     const cpucount =  os.cpus().length
//         //     this.horizontalLine()
//         //     this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
//         //     this.horizontalLine()
//         //     this.verticalSpace(2)
//         //     let value = `\x1b[33m${cpucount}\x1b[0m`
//         //     let line = `\x1b[36mCPU count: \x1b[0m`
//         //     let padding = 70 - line.length
//         //     for (let i = 0; i < padding; i++) {
//         //         line += ' '
//         //     }
//         //     line += value
//         //     console.log(line)
//         //     this.verticalSpace(1)
//         //     this.horizontalLine()
//         // })
//         // this.on('stats --cpu', () => {
//         //     const cpucount =  os.cpus().length
//         //     this.horizontalLine()
//         //     this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
//         //     this.horizontalLine()
//         //     this.verticalSpace(2)
//         //     let value = `\x1b[33m${cpucount}\x1b[0m`
//         //     let line = `\x1b[36mCPU count: \x1b[0m`
//         //     let padding = 70 - line.length
//         //     for (let i = 0; i < padding; i++) {
//         //         line += ' '
//         //     }
//         //     line += value
//         //     console.log(line)
//         //     this.verticalSpace(1)
//         //     this.horizontalLine()
//         // })
//         this.on('stats -cpu', () => {
//             const cpucount =  os.cpus().length
//             this.horizontalLine()
//             this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${cpucount}\x1b[0m`
//             let line = `\x1b[36mCPU count: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -c', () => {
//             const cpucount =  os.cpus().length
//             this.horizontalLine()
//             this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${cpucount}\x1b[0m`
//             let line = `\x1b[36mCPU count: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -c -c', () => {
//             const cpucount =  os.cpus().length
//             this.horizontalLine()
//             this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${cpucount}\x1b[0m`
//             let line = `\x1b[36mCPU count: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//     }
  

//     // Free Memory
//     statsfreememory(){
//         this.on('stats --free-memory', () => {
//             const freememory =  os.freemem()
//             this.horizontalLine()
//             this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${freememory}\x1b[0m`
//             let line = `\x1b[36mFree memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats --fm', () => {
//             const freememory =  os.freemem()
//             this.horizontalLine()
//             this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${freememory}\x1b[0m`
//             let line = `\x1b[36mFree memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -f -m', () => {
//             const freememory =  os.freemem()
//             this.horizontalLine()
//             this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${freememory}\x1b[0m`
//             let line = `\x1b[36mFree memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -f', () => {
//             const freememory =  os.freemem()
//             this.horizontalLine()
//             this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${freememory}\x1b[0m`
//             let line = `\x1b[36mFree memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//     }
    
//     // Current Malloced Memory
//     statscurrentmallocedmemory(){
//         this.on('stats --current-malloced-memory', () => {
//             const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats --cmm', () => {
//             const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -cmm', () => {
//             const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -c -m -m', () => {
//             const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//     }

//      // Peak Malloced Memory
//      statspeakmallocedmemory(){
//         this.on('stats --peak-malloced-memory', () => {
//             const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mPeak malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats --pmm', () => {
//             const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mPeak malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -pmm', () => {
//             const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mPeak malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -p -m -m', () => {
//             const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
//             this.horizontalLine()
//             this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
//             let line = `\x1b[36mPeak malloced memory: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//     }

//      // Allocated Heap Used Percentage
//      statsallocatedheapused(){
//         this.on('stats --allocated-heap-used', () => {
//             const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
//             let line = `\x1b[36mAllocated heap used: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats --ahu', () => {
//             const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
//             let line = `\x1b[36mAllocated heap used: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -ahu', () => {
//             const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
//             let line = `\x1b[36mAllocated heap used: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -a -h -u', () => {
//             const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
//             let line = `\x1b[36mAllocated heap used: \x1b[0m`
//             let padding = 65 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//     }

//      // Avaialbe Heap Allocated
//      statsavailabeheapallocated(){
//         this.on('stats --available-heap-allocated', () => {
//             const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
//             let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats --aha', () => {
//             const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
//             let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -aha', () => {
//             const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
//             let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -a -h -a', () => {
//             const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
//             this.horizontalLine()
//             this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
//             let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//     }

//     // System Uptime
//     statsuptime(){
//         this.on('stats --uptime', () => {
//             const uptime =  os.uptime() + ' Seconds'
//             this.horizontalLine()
//             this.centered(`\x1b[32mSYSTEM UPTIME\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${uptime}\x1b[0m`
//             let line = `\x1b[36mSystem uptime: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
//         this.on('stats -u', () => {
//             const uptime =  os.uptime() + ' Seconds'
//             this.horizontalLine()
//             this.centered(`\x1b[32mSYSTEM UPTIME\x1b[0m`)
//             this.horizontalLine()
//             this.verticalSpace(2)
//             let value = `\x1b[33m${uptime}\x1b[0m`
//             let line = `\x1b[36mSystem uptime: \x1b[0m`
//             let padding = 70 - line.length
//             for (let i = 0; i < padding; i++) {
//                 line += ' '
//             }
//             line += value
//             console.log(line)
//             this.verticalSpace(1)
//             this.horizontalLine()
//         })
        
//     }
 
//       // Users help

//       userscommand(){
//         this.on('users', async string => {
//             const commands = {
//                 '--help, -h': 'Help',
//                 '--load, -l': 'Load users',
//                 '-g -p phone, -g --phone=phone': 'Get the user with the specified phone number',
//                 '--get -p phone, --get --phone=phone': 'Get the user with the specified phone number',
//                 '-d -p phone, -d --phone=phone': 'delete the user with the specified phone number',
//                 '--delete -p phone, --delete --phone=phone': 'delete the user with the specified phone number',

//             }

//             let command = string.split(' ').filter(str => str !== '').join(' ')
 
//             let usersevent = this.users().find(event => command.indexOf(event) > -1)
//             console.log('usersevent: ',usersevent)
//             console.log('command: ', command)
// //             if (usersevent  === undefined) {
// //                 return this.emit('error', {
// //                     error: `'${string}' is not command event undefined`
// //                 })
// //             }

// //                 /// users -h
// //             if (usersevent  === 'users') {
// //                 if (command.length !== 'users'.length) return this.emit('error', {
// //                     error: `'${string}' is not command users`
// //                 })

// //                            let centered = `\x1b[36mNAME\x1b[0m
// //     \x1b[36musers\x1b[0m -- Application users and a user's details 

// // \x1b[36mSYPNOSIS\x1b[0m
// //     \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]

// // \x1b[36mDESCRIPTION\x1b[0m
// //     Application users and a user's details  

// //             `
// //             this.horizontalLine()
// //             this.centered(`\x1b[32mUSERS HELP AND USAGE\x1b[0m`)
// //             this.horizontalLine()
// //             this.description(centered)
// //             this.horizontalLine()
// //             this.verticalSpace(2)
        
// //             // Show each command followed by its explanation in white and yellow respectively
        
// //             for (let key in commands) {
// //                 if (commands.hasOwnProperty(key)) {
// //                     let value = commands[key]
// //                     let line = `\x1b[36m${key}\x1b[0m`
// //                     let padding = 60 - line.length
// //                     for (let i = 0; i < padding; i++) {
// //                         line += ' '
// //                     }
// //                     line += value
// //                     console.log(line)
// //                     this.verticalSpace(1)
// //                 }
// //             }
// //             this.horizontalLine()
                
// //             }

// //             /// users -h
// //             if (command  === 'users -h') {
// //                 if (command.length !== 'users -h'.length) return this.emit('error', {
// //                     error: `'${string}' is not command users -h`
// //                 })

// //                            let centered = `\x1b[36mNAME\x1b[0m
// //     \x1b[36musers\x1b[0m -- Application users and a user's details 

// // \x1b[36mSYPNOSIS\x1b[0m
// //     \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]

// // \x1b[36mDESCRIPTION\x1b[0m
// //     Application users and a user's details  

// //             `
// //             this.horizontalLine()
// //             this.centered(`\x1b[32mUSERS HELP AND USAGE\x1b[0m`)
// //             this.horizontalLine()
// //             this.description(centered)
// //             this.horizontalLine()
// //             this.verticalSpace(2)
        
// //             // Show each command followed by its explanation in white and yellow respectively
        
// //             for (let key in commands) {
// //                 if (commands.hasOwnProperty(key)) {
// //                     let value = commands[key]
// //                     let line = `\x1b[36m${key}\x1b[0m`
// //                     let padding = 60 - line.length
// //                     for (let i = 0; i < padding; i++) {
// //                         line += ' '
// //                     }
// //                     line += value
// //                     console.log(line)
// //                     this.verticalSpace(1)
// //                 }
// //             }
// //             this.horizontalLine()
                
// //             }

// //              /// users --help
// //              if (event === 'users --help') {
// //                 if (command.length !== 8) return this.emit('error', {
// //                     error: `'${string}' is not command users --help`
// //                 })

// //                            let centered = `\x1b[36mNAME\x1b[0m
// //     \x1b[36musers\x1b[0m -- Application users and a user's details 

// // \x1b[36mSYPNOSIS\x1b[0m
// //     \x1b[36musers\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m ]
// //     \x1b[36musers\x1b[0m [ \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m ]

// // \x1b[36mDESCRIPTION\x1b[0m
// //     Application users and a user's details  

// //             `
// //             this.horizontalLine()
// //             this.centered(`\x1b[32mUSERS HELP AND USAGE\x1b[0m`)
// //             this.horizontalLine()
// //             this.description(centered)
// //             this.horizontalLine()
// //             this.verticalSpace(2)
        
// //             // Show each command followed by its explanation in white and yellow respectively
        
// //             for (let key in commands) {
// //                 if (commands.hasOwnProperty(key)) {
// //                     let value = commands[key]
// //                     let line = `\x1b[36m${key}\x1b[0m`
// //                     let padding = 60 - line.length
// //                     for (let i = 0; i < padding; i++) {
// //                         line += ' '
// //                     }
// //                     line += value
// //                     console.log(line)
// //                     this.verticalSpace(1)
// //                 }
// //             }
// //             this.horizontalLine()
                
// //             }

// //             // users -g --phone
// //             if (event === 'users -g --phone') {
// //                 if (command.length !== 27) return this.emit('error', {
// //                     error: `'${string}' is not command users -g --phone`
// //                 })
// //                 phone = command.split('=')[1].trim()
// //                 let path = `${this.base()}/users/${phone}.json`
// //                 let readable = createReadStream(path, 'utf-8')

// //                 readable.on('data', chunk => {
// //                     let user = JSON.parse(chunk)
// //                     delete user.aToken
// //                     delete user.password
// //                     console.log(user)
// //                 })
// //                 readable.on('end', () => {})
// //                 readable.on('error', error => {
// //                     this.emit('error', {
// //                         error: `could not find a user with this phone number.`
// //                     })
// //                 })
// //             }

// //             // users --get --phone
// //             if (event === 'users --get --phone') {
// //                 if (command.length !== 30) return this.emit('error', {
// //                     error: `'${string}' is not command users --get --phone`
// //                 })
// //                 phone = command.split('=')[1].trim()
// //                 let path = `${this.base()}/users/${phone}.json`
// //                 let readable = createReadStream(path, 'utf-8')

// //                 readable.on('data', chunk => {
// //                     let user = JSON.parse(chunk)
// //                     delete user.aToken
// //                     delete user.password
// //                     console.log(user)
// //                 })
// //                 readable.on('end', () => {})
// //                 readable.on('error', error => {
// //                     this.emit('error', {
// //                         error: `could not find a user with this phone number.`
// //                     })
// //                 })
// //             }
// //             // users -g -p
// //             if (event === 'users -g -p') {
// //                 if (command.length !== 22) return this.emit('error', {
// //                     error: `'${string}' is not command users -g -p`
// //                 })
// //                 phone = command.split('-p')[1].trim()
// //                 let path = `${this.base()}/users/${phone}.json`
// //                 let readable = createReadStream(path, 'utf-8')

// //                 readable.on('data', chunk => {
// //                     let user = JSON.parse(chunk)
// //                     delete user.aToken
// //                     delete user.password
// //                     console.log(user)
// //                 })
// //                 readable.on('end', () => {})
// //                 readable.on('error', error => {
// //                     this.emit('error', {
// //                         error: `could not find a user with this phone number.`
// //                     })
// //                 })
// //             }

// //             // users --get -p
// //             if (event === 'users --get -p') {
// //                 if (command.length !== 25) return this.emit('error', {
// //                     error: `'${string}' is not command users --get -p`
// //                 })
// //                 phone = command.split('-p')[1].trim()
// //                 let path = `${this.base()}/users/${phone}.json`
// //                 let readable = createReadStream(path, 'utf-8')

// //                 readable.on('data', chunk => {
// //                     let user = JSON.parse(chunk)
// //                     delete user.aToken
// //                     delete user.password
// //                     console.log(user)
// //                 })
// //                 readable.on('end', () => {})
// //                 readable.on('error', error => {
// //                     this.emit('error', {
// //                         error: `could not find a user with this phone number.`
// //                     })
// //                 })
// //             }

// //             // users -d --phone
// //             if (event === 'users -d --phone') {
// //                 if (command.length !== 27) return this.emit('error', {
// //                     error: `'${string}' is not command users -d --phone`
// //                 })
// //                 phone = command.split('=')[1].trim()
 
// //                  let path = `${this.base()}/users/${phone}.json`
// //                 promises.unlink(path)
// //                 .then(() => {
// //                  this.emit('success', {
// //                      message: `User deleted.`
// //                  })
// //                 })
// //                 .catch(error => {
// //                  this.emit('error', {
// //                      error: `User with this phone number does not even exist.`
// //                  })
// //                 })
// //             }

// //             // users --delete --phone
// //             if (event === 'users --delete --phone') {
// //                 if (command.length !== 33) return this.emit('error', {
// //                     error: `'${string}' is not command users --delete --phone`
// //                 })
// //                 phone = command.split('=')[1].trim()
 
// //                  let path = `${this.base()}/users/${phone}.json`
// //                 promises.unlink(path)
// //                 .then(() => {
// //                  this.emit('success', {
// //                      message: `User deleted.`
// //                  })
// //                 })
// //                 .catch(error => {
// //                  this.emit('error', {
// //                      error: `User with this phone number does not even exist.`
// //                  })
// //                 })
// //             }

// //             // users -d -p
// //             if (event === 'users -d -p') {
// //                 if (command.length !== 22) return this.emit('error', {
// //                     error: `'${string}' is not command users -d -p`
// //                 })
// //                 phone = command.split('-p')[1].trim()
 
// //                 let path = `${this.base()}/users/${phone}.json`
// //                 promises.unlink(path)
// //                 .then(() => {
// //                  this.emit('success', {
// //                      message: `User deleted.`
// //                  })
// //                 })
// //                 .catch(error => {
// //                  this.emit('error', {
// //                      error: `User with this phone number does not even exist.`
// //                  })
// //                 })
// //             }

// //             // users --delete -p
// //             if (event === 'users --delete -p') {
// //                 if (command.length !== 28) return this.emit('error', {
// //                     error: `'${string}' is not command.`
// //                 })
// //                 phone = command.split('-p')[1].trim()
 
// //                 let path = `${this.base()}/users/${phone}.json`
// //                 promises.unlink(path)
// //                 .then(() => {
// //                  this.emit('success', {
// //                      message: `User deleted.`
// //                  })
// //                 })
// //                 .catch(error => {
// //                  this.emit('error', {
// //                      error: `User with this phone number does not even exist.`
// //                  })
// //                 })
                
// //             }

// //             // users -l
// //             if (event === 'users -l') {
// //                 if (command.length !== 8) return this.emit('error', {
// //                     error: `'${string}' is not command.`
// //                 })

// //                 try{
// //                     const users = await this.findAll('users')
// //                     if(users && users.length > 0){
// //                       users.forEach(user => {
// //                          let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
// //                          readable.on('error' , error => {
// //                              this.emit('error', {error: `Could not find user with phone number ${user}`})
// //                          })
// //                          console.log()
// //                         readable.on('data', chunked => {
                           
// //                            let user = {}
// //                            let chunk = JSON.parse(chunked)
// //                            user.name = `${chunk.firstname} ${chunk.lastname}`
// //                            user.phone = chunk.phone
// //                            console.log(user)
// //                         })
// //                         readable.on('end', () => {
// //                          console.log()
// //                           this._interface.prompt()
// //                         })
// //                       })
// //                     }
// //                 }catch(error){
// //                  this.emit('error', {error: 'User not found'})
// //                 }
                
// //             }
// //             // users --load
// //             if (event === 'users --load') {
// //                 if (command.length !== 12) return this.emit('error', {
// //                     error: `'${string}' is not command.`
// //                 })

// //                 try{
// //                     const users = await this.findAll('users')
// //                     if(users && users.length > 0){
// //                       users.forEach(user => {
// //                          let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
// //                          readable.on('error' , error => {
// //                              this.emit('error', {error: `Could not find user with phone number ${user}`})
// //                          })
// //                          console.log()
// //                         readable.on('data', chunked => {
                           
// //                            let user = {}
// //                            let chunk = JSON.parse(chunked)
// //                            user.name = `${chunk.firstname} ${chunk.lastname}`
// //                            user.phone = chunk.phone
// //                            console.log(user)
// //                         })
// //                         readable.on('end', () => {
// //                          console.log()
// //                           this._interface.prompt()
// //                         })
// //                       })
// //                     }
// //                 }catch(error){
// //                  this.emit('error', {error: 'User not found'})
// //                 }
                
// //             }



//         })
 
//     }
     
//     notACommand(){
//         this.on('command-not-found', data => {
//             console.log(`\x1b[31m${data.error}\x1b[0m`)
//         })
//         this.on('error', data => {
//             console.log(`\x1b[31m${data.error}\x1b[0m`)
//         })
//         this.on('success', data => {
//             console.log(`\x1b[36m${data.message}\x1b[0m`)
//         })
     
//     }

      
// }


// module.exports = Command





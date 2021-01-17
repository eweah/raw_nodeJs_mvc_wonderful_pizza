'use strict'

const {createReadStream, createWriteStream, promises} = require('fs')
const {Readable, PassThrough, Transform} = require('stream')
const path = require('path')
const os = require('os')
const v8 = require('v8')

const CLI = require('..')


class ManCommand extends CLI{
    constructor(){
        super()
        this.autobind(ManCommand)
        this.autoinvoker(ManCommand)

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
                            if (phone.trim().toLocaleLowerCase() !== this.credentials.phone.trim().toLocaleLowerCase()) {
                                console.log('\x1b[31m%s\x1b[0m', 'Unrecognized phone number')
                                process.exit(0)
                            }
                            if (password.trim().toLocaleLowerCase() !== this.credentials.password.trim().toLocaleLowerCase()) {
                                console.log('\x1b[31m%s\x1b[0m', 'Incorrect password')
                                process.exit(0)
                            }
                            if (phone.trim().toLocaleLowerCase() === this.credentials.phone.trim().toLocaleLowerCase()) {
                                if (password.trim().toLocaleLowerCase() === this.credentials.password.trim().toLocaleLowerCase()) {
                                    console.log('\x1b[32m%s\x1b[0m', 'You are logged in!')
                                    this.auth = true
                                    this._interface.prompt()
                                }
                            }
                        }

                    })
                }

            })
        })


    }
    mancommand(){
        this.on('man', string => {

            const commands = {
                'man': 'Command Line Interface (CLI) Manual',
                'help': 'Alias of the "man" command',
                'exit': 'Kill the CLI and the rest of the application',
                'quit': 'Kill the CLI and the rest of the application',
                'carts': 'List all the carts',
                'stats': 'Get statistics of the underlying operating system and resouce utilization',
                'users': 'List all the registered users in the system',
                'login': 'Login as an admin',
                'logout': 'Logout as an admin',
                'guests': 'List all the guests in the system',
                'orders': 'List all the orders in the system',
                'contacts': 'List all the contacts',
                'shippings': 'List all the shippings'
            }
        
            let command = string.split(' ').filter(str => str !== '').join(' ')
 
            let event = this.man().find(event => event === command)

            if (event === undefined) {
                return this.emit('error', {
                    error: `'${string}' is not command.`
                })
            }


            if(event === 'man'){
                console.clear()
                if (command.length !== 3) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                        
                let centered = `\x1b[36mNAME\x1b[0m
        \x1b[36mman\x1b[0m -- CLIM: Command Line Interface Manual
    
    \x1b[36mSYPNOSIS\x1b[0m
        \x1b[36mman\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
      
    \x1b[36mDESCRIPTION\x1b[0m
        CLIM: Command Line Interface Manual
    
                `
            
                this.horizontalLine()
                this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) MANUAL\x1b[0m`)
              
                this.horizontalLine()
                this.verticalSpace()
                this.description(centered)
                this.verticalSpace()
                this.horizontalLine()
            
                this.verticalSpace()
            
                // Show each command followed by its explanation in white and yellow respectively
            
                for (let key in commands) {
                    if (commands.hasOwnProperty(key)) {
                        let value = commands[key]
                        let line = `\x1b[36m${key}\x1b[0m`
                        let padding = 30 - line.length
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


            if(event === 'man man'){
                console.clear()
                if (command.length !== 7) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                        
                let centered = `\x1b[36mNAME\x1b[0m
        \x1b[36mman\x1b[0m -- CLIM: Command Line Interface Manual
    
    \x1b[36mSYPNOSIS\x1b[0m
        \x1b[36mman\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
      
    \x1b[36mDESCRIPTION\x1b[0m
        CLIM: Command Line Interface Manual
    
                `
            
                this.horizontalLine()
                this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) MANUAL\x1b[0m`)
              
                this.horizontalLine()
                this.verticalSpace()
                this.description(centered)
                this.verticalSpace()
                this.horizontalLine()
            
                this.verticalSpace()
            
                // Show each command followed by its explanation in white and yellow respectively
            
                for (let key in commands) {
                    if (commands.hasOwnProperty(key)) {
                        let value = commands[key]
                        let line = `\x1b[36m${key}\x1b[0m`
                        let padding = 30 - line.length
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

            if(event === 'man help'){
                console.clear()
                if (command.length !== 8) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                            let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mhelp\x1b[0m -- CLIM: Command Line Interface Help And Usage

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mhelp\x1b[0m [ \x1b[36mman\x1b[0m | \x1b[36mhelp\x1b[0m | \x1b[36mexit\x1b[0m | \x1b[36mquit\x1b[0m | \x1b[36mcarts\x1b[0m | \x1b[36musers\x1b[0m | \x1b[36mlogin\x1b[0m | \x1b[36mlogout\x1b[0m | \x1b[36mguests\x1b[0m | \x1b[36morders\x1b[0m | \x1b[36mshippings\x1b[0m | \x1b[36mcontacts\x1b[0m | \x1b[36mshippings\x1b[0m ]
  
\x1b[36mDESCRIPTION\x1b[0m
    CLIM: Command Line Interface Help And Usage

            `
        
            this.horizontalLine()
            this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) HELP AND USAGE\x1b[0m`)
          
            this.horizontalLine()
            this.verticalSpace()
            this.description(centered)
            this.verticalSpace()
            this.horizontalLine()
        
            this.verticalSpace()
        
            // Show each command followed by its explanation in white and yellow respectively
        
            for (let key in commands) {
                if (commands.hasOwnProperty(key)) {
                    let value = commands[key]
                    let line = `\x1b[36m${key}\x1b[0m`
                    let padding = 30 - line.length
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

            if (event === 'man users') {
                console.clear()
                if (command.length !== 9) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                const userscmd = {
                    '--help, -h': 'Help',
                    '--load, -l': 'Load users',
                    '-g -p phone, -g --phone=phone': 'Get the user with the specified phone number',
                    '--get -p phone, --get --phone=phone': 'Get the user with the specified phone number',
                    '-d -p phone, -d --phone=phone': 'delete the user with the specified phone number',
                    '--delete -p phone, --delete --phone=phone': 'delete the user with the specified phone number',
    
                }
    

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
        
            
            for (let key in userscmd) {
                if (userscmd.hasOwnProperty(key)) {
                    let value = userscmd[key]
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

            if (event === 'man stats') {
                console.clear()
                if (command.length !== 9) return this.emit('error', {
                    error: `'${string}' is not command.`
                })

            const statscmd = {
                '--help, -h': 'Show stats help, command options, and usage',
                '--load, -l': 'Shows load average',
                '--uptime, -u': 'System uptime',
                '--cpu-count, --cpu, -c, -c -c': 'CPU Count',
                '--free-memory, --fm, -f, -f -m': 'Free Memory',
                '--current-malloced-memory, --cmm, -cmm, -c -m -m':  'Current Malloced Memory',
                '--peak-malloced-memory, --pmm, -pmm, -p -m -m': 'Peak Malloced Memory',
                '--allocated-heap-used, --ahu,-ahu, -a -h -u': 'Allocated Heap Used (%)',
                '--available-heap-allocated, --aha, -aha, -a -h -a': 'Allocated Heap Allocated (%)',
          
            }
        
            let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mstats\x1b[0m -- Gives application system level statistics 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mstats\x1b[0m [\x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--uptime\x1b[0m | \x1b[36m-u\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--cpu-count\x1b[0m | \x1b[36m--cpu\x1b[0m | \x1b[36m-cpu\x1b[0m | \x1b[36m-c\x1b[0m | \x1b[36m-c -c\x1b[0m] 
    \x1b[36mstats\x1b[0m [\x1b[36m--free-memory\x1b[0m | \x1b[36m--fm\x1b[0m | \x1b[36m-fm\x1b[0m | \x1b[36m-f\x1b[0m | \x1b[36m-f -m\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--current-malloced-memory\x1b[0m | \x1b[36m--cmm\x1b[0m | \x1b[36m-cmm\x1b[0m | \x1b[36m-c -m -m\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--peak-malloced-memory\x1b[0m | \x1b[36m--pmm\x1b[0m | \x1b[36m-pmm\x1b[0m | \x1b[36m-p -m -m\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--allocated-heap-used\x1b[0m | \x1b[36m--ahu\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -u\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--available-heap-allocated\x1b[0m | \x1b[36m--aha\x1b[0m | \x1b[36m-ahu\x1b[0m | \x1b[36m-a -h -a\x1b[0m]
  
\x1b[36mDESCRIPTION\x1b[0m
    Gives application system level statistics 

            `
            this.horizontalLine()
            this.centered(`\x1b[32mSTATS HELP AND USAGE\x1b[0m`)
            this.horizontalLine()
            this.description(centered)
            this.horizontalLine()
            this.verticalSpace(2)
        
            // Show each command followed by its explanation in white and yellow respectively
            
            for (let key in statscmd) {
                if (statscmd.hasOwnProperty(key)) {
                    let value = statscmd[key]
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

            if(event ==='man orders'){
                const ordercmds = {
                    '--help, -h': 'Help',
                    '--load, -l': 'Load users',
                    '-g -p orderId, -g --id=orderId': 'Get the order with the specified order id',
                    '--get -p orderId, --get --id=orderId': 'Get the order with the specified order id',
                }
    
             
                //if (string  === 'orders') {
         
                               let centered = `\x1b[36mNAME\x1b[0m
        \x1b[36morders\x1b[0m -- Application orders and a order's details 
    
    \x1b[36mSYPNOSIS\x1b[0m
        \x1b[36morders\x1b[0m [ \x1b[36m--help\x1b[0m | \x1b[36m-h\x1b[0m ]
        \x1b[36morders\x1b[0m [ \x1b[36m--load\x1b[0m | \x1b[36m-l\x1b[0m ]
        \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --it=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m ]
    
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
            
                for (let key in ordercmds) {
                    if (ordercmds.hasOwnProperty(key)) {
                        let value = ordercmds[key]
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
                    
                //}
            }
            
        })         
    }
 
    notACommand(){
        this.on('command-not-found', data => {
            console.log(`\x1b[31m${data.error}\x1b[0m`)
        })
        this.on('error', data => {
            console.log(`\x1b[31m${data.error}\x1b[0m`)
        })
        this.on('success', data => {
            console.log(`\x1b[36m${data.message}\x1b[0m`)
        })
     
    }

      
}


module.exports = ManCommand
new ManCommand()





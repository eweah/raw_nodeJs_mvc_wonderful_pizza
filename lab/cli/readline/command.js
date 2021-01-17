'use strict'

const {createReadStream, createWriteStream} = require('fs')
const {Readable, PassThrough, Transform} = require('stream')
const os = require('os')
const v8 = require('v8')

const CLI = require('./cli')

class Command extends CLI{

    constructor(){
        super()
        this.autobind(Command)
        this.autoinvoker(Command)

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
          if(typeof(this[method]) === 'function' && method !=='constructor' && method !== 'autoinvoker' && method !== 'autobinder' && method !== 'autobind'){this[method]()}
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
    man(){
        this.on('man', () => {
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
        
            this.horizontalLine()
            this.centered(`\x1b[32mCOMMAND LINE INTERFACE (CLI) MANUAL\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
        
            // Show each command followed by its explanation in white and yellow respectively
        
            for (let key in commands) {
                if (commands.hasOwnProperty(key)) {
                    let value = commands[key]
                    let line = `\x1b[36m${key}\x1b[0m`
                    let padding = 20 - line.length
                    for (let i = 0; i < padding; i++) {
                        line += ' '
                    }
                    line += value
                    console.log(line)
                    this.verticalSpace(1)
                }
            }
            this.horizontalLine()
        })
        this.on('help', () => {
            const commands = {
                'man': 'Command Line Interface (CLI) Manual',
                'help': 'Alias of the "man" command',
                'exit': 'Kill the CLI and the rest of the application',
                'quit': 'Kill the CLI and the rest of the application',
                'carts': 'Lists all the carts',
                'stats': 'Get statistics of the underlying operating system and resouce utilization',
                'users': 'Lists all the registered users in the system',
                'login': 'Login as an admin',
                'logout': 'Logout as an admin',
                'guests': 'Lists all the guests in the system',
                'orders': 'Lists all the orders in the system',
                'contacts': 'Lists all the contacts',
                'shippings': 'Lists all the shippings'
            }
        
            this.horizontalLine()
            this.centered(`\x1b[32mCLI MANUAL HELP\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
        
            // Show each command followed by its explanation in white and yellow respectively
        
            for (let key in commands) {
                if (commands.hasOwnProperty(key)) {
                    let value = commands[key]
                    let line = `\x1b[36m${key}\x1b[0m`
                    let padding = 20 - line.length
                    for (let i = 0; i < padding; i++) {
                        line += ' '
                    }
                    line += value
                    console.log(line)
                    this.verticalSpace(1)
                }
            }
            this.horizontalLine()
        })
        this.on('?', () => {
            const commands = {
                'man': 'Command Line Interface (CLI) Manual',
                'help': 'Alias of the "man" command',
                'exit': 'Kill the CLI and the rest of the application',
                'quit': 'Kill the CLI and the rest of the application',
                'carts': 'Lists all the carts',
                'stats': 'Get statistics of the underlying operating system and resouce utilization',
                'users': 'Lists all the registered users in the system',
                'login': 'Login as an admin',
                'logout': 'Logout as an admin',
                'guests': 'Lists all the guests in the system',
                'orders': 'Lists all the orders in the system',
                'contacts': 'Lists all the contacts',
                'shippings': 'Lists all the shippings'
            }
        
            this.horizontalLine()
            this.centered(`\x1b[32mCLI MANUAL HELP\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
        
            // Show each command followed by its explanation in white and yellow respectively
        
            for (let key in commands) {
                if (commands.hasOwnProperty(key)) {
                    let value = commands[key]
                    let line = `\x1b[36m${key}\x1b[0m`
                    let padding = 20 - line.length
                    for (let i = 0; i < padding; i++) {
                        line += ' '
                    }
                    line += value
                    console.log(line)
                    this.verticalSpace(1)
                }
            }
            this.horizontalLine()
        })
        this.on('-h', () => {
            const commands = {
                'man': 'Command Line Interface (CLI) Manual',
                'help': 'Alias of the "man" command',
                'exit': 'Kill the CLI and the rest of the application',
                'quit': 'Kill the CLI and the rest of the application',
                'carts': 'Lists all the carts',
                'stats': 'Get statistics of the underlying operating system and resouce utilization',
                'users': 'Lists all the registered users in the system',
                'login': 'Login as an admin',
                'logout': 'Logout as an admin',
                'guests': 'Lists all the guests in the system',
                'orders': 'Lists all the orders in the system',
                'contacts': 'Lists all the contacts',
                'shippings': 'Lists all the shippings'
            }
        
            this.horizontalLine()
            this.centered(`\x1b[32mCLI MANUAL HELP\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
        
            // Show each command followed by its explanation in white and yellow respectively
        
            for (let key in commands) {
                if (commands.hasOwnProperty(key)) {
                    let value = commands[key]
                    let line = `\x1b[36m${key}\x1b[0m`
                    let padding = 20 - line.length
                    for (let i = 0; i < padding; i++) {
                        line += ' '
                    }
                    line += value
                    console.log(line)
                    this.verticalSpace(1)
                }
            }
            this.horizontalLine()
        })
    }
   
    quit(){
        this.on('quit', () => {
            console.log('You have asked for quit')
        })
    }
    leave(){
        this.on('leave', () => {
            console.log('You have asked for leave')
        })
    }
    exit(){
        this.on('exit', () =>{
            process.exit(0)
        })
    }
    stats() {
        this.on('stats', () => {
            // let  seconds = new Date(os.uptime()).toDateString()
            // console.log(seconds)
            const stats = {
                'Load Average': os.loadavg().join(' '),
                'CPU Count': os.cpus().length,
                'Free Memory': os.freemem(),
                'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
                'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
                'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
                'Available Heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100),
                'Uptime': os.uptime() + ' Seconds'
            }
            // Show the header for the help page this is as wide as the screen
            this.horizontalLine()
            this.centered('SYSTEM STATISTICS')
            this.horizontalLine()
            this.verticalSpace(2)
            // logout each stats 
            for (let key in stats) {
                if (stats.hasOwnProperty(key)) {
                    let value = stats[key]
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
            this.verticalSpace(1)

            // End with another horizontal line
            this.horizontalLine()
        })
    }
    admin(){
        this.on('admin', () => {
            console.log('you have asked for admin')
        })
    }
    logout(){
        this.on('logout', () => {
            console.log('you have asked for logout')
        })
    }

    // Stats help
    statshelp(){
        this.on('stats --help', () => {
            const commands = {
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
    \x1b[36mstats\x1b[0m [options]
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
        })
        this.on('stats -h', () => {
            const commands = {
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
    \x1b[36mstats\x1b[0m [options]
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
        })
    }

    // Stats load
    statsload (){
        this.on('stats --load', () => {
            const load =  os.loadavg().join(' ')
            this.horizontalLine()
            this.centered(`\x1b[32mLOAD AVERAGE\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${load}\x1b[0m`
            let line = `\x1b[36mLoad Averge: \x1b[0m`
            let padding = 60 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
            
        })
        this.on('stats -l', () => {

            const load =  os.loadavg().join(' ')
            this.horizontalLine()
            this.centered(`\x1b[32mLOAD AVERAGE\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${load}\x1b[0m`
            let line = `\x1b[36mLoad Averge: \x1b[0m`
            let padding = 60 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
            
     
        
    })
    }
    statscpucount(){
        this.on('stats --cpu-count', () => {
            const cpucount =  os.cpus().length
            this.horizontalLine()
            this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${cpucount}\x1b[0m`
            let line = `\x1b[36mCPU count: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats --cpu', () => {
            const cpucount =  os.cpus().length
            this.horizontalLine()
            this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${cpucount}\x1b[0m`
            let line = `\x1b[36mCPU count: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -c -c', () => {
            const cpucount =  os.cpus().length
            this.horizontalLine()
            this.centered(`\x1b[32mCPU COUNT\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${cpucount}\x1b[0m`
            let line = `\x1b[36mCPU count: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
    }
  

    // Free Memory
    statsfreememory(){
        this.on('stats --free-memory', () => {
            const freememory =  os.freemem()
            this.horizontalLine()
            this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${freememory}\x1b[0m`
            let line = `\x1b[36mFree memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats --fm', () => {
            const freememory =  os.freemem()
            this.horizontalLine()
            this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${freememory}\x1b[0m`
            let line = `\x1b[36mFree memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -f -m', () => {
            const freememory =  os.freemem()
            this.horizontalLine()
            this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${freememory}\x1b[0m`
            let line = `\x1b[36mFree memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -f', () => {
            const freememory =  os.freemem()
            this.horizontalLine()
            this.centered(`\x1b[32mFREE MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${freememory}\x1b[0m`
            let line = `\x1b[36mFree memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
    }
    
    // Current Malloced Memory
    statscurrentmallocedmemory(){
        this.on('stats --current-malloced-memory', () => {
            const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
            let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats --cmm', () => {
            const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
            let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -cmm', () => {
            const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
            let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -c -m -m', () => {
            const currentmallocedmemory =  v8.getHeapStatistics().malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mCURRENT MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${currentmallocedmemory}\x1b[0m`
            let line = `\x1b[36mCurrent malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
    }

     // Peak Malloced Memory
     statspeakmallocedmemory(){
        this.on('stats --peak-malloced-memory', () => {
            const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
            let line = `\x1b[36mPeak malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats --pmm', () => {
            const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
            let line = `\x1b[36mPeak malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -pmm', () => {
            const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
            let line = `\x1b[36mPeak malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -p -m -m', () => {
            const peakmallocedmemory =  v8.getHeapStatistics().peak_malloced_memory
            this.horizontalLine()
            this.centered(`\x1b[32mPEAK MALLOCED MEMORY\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${peakmallocedmemory}\x1b[0m`
            let line = `\x1b[36mPeak malloced memory: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
    }

     // Allocated Heap Used Percentage
     statsallocatedheapused(){
        this.on('stats --allocated-heap-used', () => {
            const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
            let line = `\x1b[36mAllocated heap used: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats --ahu', () => {
            const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
            let line = `\x1b[36mAllocated heap used: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -ahu', () => {
            const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
            let line = `\x1b[36mAllocated heap used: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -a -h -u', () => {
            const allocatedheapused =  Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mALLOCATED HEAP USED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${allocatedheapused}%\x1b[0m`
            let line = `\x1b[36mAllocated heap used: \x1b[0m`
            let padding = 65 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
    }

     // Avaialbe Heap Allocated
     statsavailabeheapallocated(){
        this.on('stats --available-heap-allocated', () => {
            const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
            let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats --aha', () => {
            const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
            let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -aha', () => {
            const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
            let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -a -h -a', () => {
            const availabeheapallocated =  Math.round((v8.getHeapStatistics().total_heap_size_executable / v8.getHeapStatistics().heap_size_limit) * 100)
            this.horizontalLine()
            this.centered(`\x1b[32mAVAILABLE HEAP ALLOCATED\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${availabeheapallocated}%\x1b[0m`
            let line = `\x1b[36mAvailabe heap allocated: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
    }

    // System Uptime
    statsuptime(){
        this.on('stats --uptime', () => {
            const uptime =  os.uptime() + ' Seconds'
            this.horizontalLine()
            this.centered(`\x1b[32mSYSTEM UPTIME\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${uptime}\x1b[0m`
            let line = `\x1b[36mSystem uptime: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        this.on('stats -u', () => {
            const uptime =  os.uptime() + ' Seconds'
            this.horizontalLine()
            this.centered(`\x1b[32mSYSTEM UPTIME\x1b[0m`)
            this.horizontalLine()
            this.verticalSpace(2)
            let value = `\x1b[33m${uptime}\x1b[0m`
            let line = `\x1b[36mSystem uptime: \x1b[0m`
            let padding = 70 - line.length
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += value
            console.log(line)
            this.verticalSpace(1)
            this.horizontalLine()
        })
        
    }
    
    notACommand(){
        this.on('command-not-found', data => {
            console.log(`\x1b[31m${data.error}\x1b[0m`)
        })
    }

      
}


module.exports = Command

new Command()




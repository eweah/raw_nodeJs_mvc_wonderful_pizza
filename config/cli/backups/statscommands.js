'use strict'

const {createReadStream, createWriteStream, promises} = require('fs')
const {Readable, PassThrough, Transform} = require('stream')
const path = require('path')
const os = require('os')
const v8 = require('v8')

const CLI = require('.')

class StatsCommand extends CLI{

    constructor(){
        super()
        this.autobind(StatsCommand)
        this.autoinvoker(StatsCommand)
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
   
    statscommand() {
        this.on('stats', string => {
      
            let command = string.split(' ').filter(str => str !== '').join(' ')
 
            let event = this.stats().find(event => event === command)
            console.log('event: ', event)
            console.log('command', command)

            if (event === undefined) {
                return this.emit('error', {
                    error: `'${string}' is not command...`
                })
            }

            if(event === 'stats'){
                console.clear()
                if (command.length !== 'stats'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
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
                /// users --all
            if (event === 'stats --all') {
                console.clear()
                if (command.length !== 'stats --all'.length) return this.emit('error', {
                    error: `'${string}' is not command..`
                })
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
            }

            if (event === 'stats -a') {
                console.clear()
                if (command.length !== 'stats -a'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
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
            }
            if(event === 'stats --load'){
                console.clear()
                if (command.length !== 'stats --load'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
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
            }

            if(event === 'stats -l'){
                console.clear()
                if (command.length !== 'stats -l'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
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
            }

            if(event === 'stats --cpu-count'){
                console.clear()
                if (command.length !== 'stats --cpu-count'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
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
            }


            if(event === 'stats --cpu'){
                console.clear()
                if (command.length !== 'stats --cpu'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
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
            }
            if( event === 'stats --cpu-count') {
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
            }
            if(event === 'stats --cpu'){
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
            }
            if(event === 'stats --load'){
                console.clear()
                if (command.length !== 'stats --load'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
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
            }

            if(event === 'stats -cpu'){
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
            }
            if(event === 'stats -c') {
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
            }
            if( event === 'stats -c -c'){
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
            }

            if( event === 'stats --free-memory'){
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
            }
            if(event === 'stats --fm') {
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
            }
            if(event === 'stats -f -m') {
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
            }
            if( event === 'stats -f') {
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
            }

            if( event === 'stats --current-malloced-memory'){
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
            }
            if( event === 'stats --cmm'){
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
            }
            if( event === 'stats -cmm') {
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
            }
            if( event === 'stats -c -m -m') {
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
            }
            if( event === 'stats --peak-malloced-memory') {
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
            }
            if( event === 'stats --pmm') {
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
            }
            if( event ==='stats -pmm') {
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
            }
            if( event === 'stats -p -m -m'){
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
            }
            if( event === 'stats --allocated-heap-used') {
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
            }
            if( event === 'stats --ahu'){
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
            }
            if( event === 'stats -ahu') {
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
            }
            if( event === 'stats -a -h -u') {
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
            }

            if( event ==='stats --available-heap-allocated'){
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
            }
            if( event ==='stats --aha') {
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
            }
            if( event ==='stats -aha') {
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
            }
            if( event ==='stats -a -h -a') {
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
            }

            if( event === 'stats --uptime') {
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
            }
            if( event === 'stats -u'){
                console.clear()
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


module.exports = StatsCommand
new StatsCommand()





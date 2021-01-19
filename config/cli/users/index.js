'use strict'

const {createReadStream, promises} = require('fs')
const util = require('util')
const TokenCommand = require('../tokens')

class UserCommand extends TokenCommand{

    constructor(){
        super()
        this.autobind(UserCommand)
        this.autoinvoker(UserCommand)
    }
  
    users(){
        return [
            'users',
            'users -h',
            'users --help',
            // Load users 
            'users -l',
            'users --load',
            // Get users 
            // Get users 
            'users -g -p',
            'users --get -p',
            'users -g --phone',
            'users --get --phone',
            // Delete user
            'users -d -p',
            'users --delete -p',
            'users -d --phone',
            'users --delete --phone',
          
        ]
    }
    usersNotifications() {
        this.on('users:error', data => {
            console.log()
            console.log(`\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b\[31m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:warning', data => {
            console.log()
            console.log(`\x1b[33m \x1b[4mATTENTION\x1b[0m\x1b[33m:\x1b[0m \x1b\[33m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:info', data => {
            console.log()
            console.log(`\x1b[36m \x1b[4mINFO\x1b[0m\x1b[36m:\x1b[0m \x1b\[36m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:success', data => {
            console.log()
            console.log(`\x1b[32m \x1b[4mOK\x1b[0m\x1b[32m:\x1b[0m \x1b\[32m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })

        // email
        this.on('users:email:error', data => {
            console.log()
            console.log(`\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b\[31m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:email:warning', data => {
            console.log()
            console.log(`\x1b[33m \x1b[4mATTENTION\x1b[0m\x1b[33m:\x1b[0m \x1b\[33m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:email:info', data => {
            console.log()
            console.log(`\x1b[36m \x1b[4mINFO\x1b[0m\x1b[36m:\x1b[0m \x1b\[36m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:email:success', data => {
            console.log()
            console.log(`\x1b[32m \x1b[4mOK\x1b[0m\x1b[32m:\x1b[0m \x1b\[32m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })

        // phone
        this.on('users:phone:error', data => {
            console.log()
            console.log(`\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b\[31m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:phone:warning', data => {
            console.log()
            console.log(`\x1b[33m \x1b[4mATTENTION\x1b[0m\x1b[33m:\x1b[0m \x1b\[33m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:phone:info', data => {
            console.log()
            console.log(`\x1b[36m \x1b[4mINFO\x1b[0m\x1b[36m:\x1b[0m \x1b\[36m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('users:phone:success', data => {
            console.log()
            console.log(`\x1b[32m \x1b[4mOK\x1b[0m\x1b[32m:\x1b[0m \x1b\[32m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
    }
    userDetailsEvents(){
        return [
            '-r', '--records',
            '-o', '--orders',
            '-s', '--shipping',
            '-b', '--billing'
        ]
    }
    ongetuserbyphoneevent(phone, event){
        let path = `${this.base()}/users/${phone}.json`
        let user = {}
        let readable = createReadStream(path, 'utf-8')

        readable.on('error', error => {
           return this.emit('users:warning', {
            error: `user with phone number ${phone} does not exists.`
            })
        })
        readable.on('data', chunk => {
            user = JSON.parse(chunk)
            delete user.aToken
            delete user.password
            delete user.active
        })
        readable.on('end', () => {
           return this.emit(event, user)
        })
    }

    async ongetuserbyemailevent(email, event) {
        try {
            const users = await this.findAll('users')
            const errorBags = new Set()
            if (users && users.length > 0) {
                let customer = {}
                users.forEach(user => {
                    let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
                    readable.on('data', chunked => {
                        let chunk = JSON.parse(chunked)
                        if (chunk.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase()) {
                            delete chunk.aToken
                            delete chunk.password
                            delete chunk.active
                            customer = chunk
                        }
                    })
                    readable.on('end', () => {
                        if (JSON.stringify(customer) === '{}') {
                            return this.emit('users:user:not:found', {
                                error: `user with email ${email} does not exists`
                            })
                        }
                        if (JSON.stringify(customer) !== '{}') {
                            return this.emit(event, customer)
                        }
                    })
                })
            }else{
                return this.emit('users:warning', {error: `There are currenty no user in the system`})
            }

            this.once('users:user:not:found', () => {
                return this.emit('users:warning', {
                    error: `user with email ${email} does not exists.`
                })
            })
        } catch (error) {
            return this.emit('users:error', {
                error: 'INTERNAL ERROR: could not get data'
            })
        }
    }
      userscommands(){
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
            if (string  === 'users' || string  === 'users -h' || string  === 'users --help') {
                console.clear()
        const usercommands = {
            '-l': 'or \x1b[36m--load\x1b[0m        Load users',

            '-g': 'or \x1b[36m--get\x1b[0m         User by phone (or email): [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m| \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m]',


            '-p': 'or \x1b[36m--phone\x1b[0m       User with the specified phone: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m|\x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m]',

            '-e': 'or \x1b[36m--email\x1b[0m       User with the specified email: [\x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m|\x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m]',

            '-o': 'or \x1b[36m--orders\x1b[0m      Orders of the specified User: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-o \x1b[0m| \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m--orders\x1b[0m]',

            '-s': 'or \x1b[36m--shipping\x1b[0m    Shipping details of the specified user: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-s \x1b[0m|\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m--shipping\x1b[0m]',

            '-b': 'or \x1b[36m--billing\x1b[0m     Billing details of the specified user: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-b \x1b[0m|\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m--billing\x1b[0m]',


            '-y': 'or \x1b[36m--years\x1b[0m       Users registered within the specified number of years: [\x1b[36m-l -y \x1b[0m\x1b[4mnumber_of_years\x1b[0m]',

            '-M': 'or \x1b[36m--months\x1b[0m      Users registered within the specified number of months: [\x1b[36m-l -M \x1b[0m\x1b[0m\x1b[4mnumber_of_months\x1b[0m]',

            '-d': 'or \x1b[36m--days\x1b[0m        Users registered within the specified number of days: [\x1b[36m-l -d \x1b[0m\x1b[0m\x1b[4mnumber_of_days\x1b[0m]',

            '-h': 'or \x1b[36m--hours\x1b[0m       Users registered within the specified number of hours: [\x1b[36m-l -d \x1b[0m\x1b[0m\x1b[4mnumber_of_hours\x1b[0m]',

            '-m': 'or \x1b[36m--minutes\x1b[0m     Users registered within the specified number of minutes: [\x1b[36m-l -m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',

            '-j': 'or \x1b[36m--json\x1b[0m        JSON format: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m',
        }

                let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36musers\x1b[0m - Application users and a user's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36musers\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
    \x1b[36musers\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m][ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|\x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m] [\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|                \x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36musers\x1b[0m [\x1b[36m--get --phone=\x1b[0m|\x1b[36m--get -p \x1b[0m|\x1b[36m-g --phone=\x1b[0m|\x1b[36m-g -p \x1b[0m]\x1b[4mphone\x1b[0m [\x1b[36m--orders\x1b[0m|\x1b[36m-o\x1b[0m|\x1b[36m--records\x1b[0m|\x1b[36m-r\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--billing\x1b[0m|\x1b[36m-b\x1b[0m]
          [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m] 
    \x1b[36musers\x1b[0m [\x1b[36m--get --email=\x1b[0m|\x1b[36m--get -e \x1b[0m|\x1b[36m-g --email=\x1b[0m|\x1b[36m-g -e \x1b[0m]\x1b[4memail\x1b[0m [\x1b[36m--orders\x1b[0m|\x1b[36m-o\x1b[0m|\x1b[36m--records\x1b[0m|\x1b[36m-r\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--billing\x1b[0m|\x1b[36m-b\x1b[0m]
          [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m] 

\x1b[36mDESCRIPTION\x1b[0m
    Application users and a user's details. A user or a set of users can be viewed in 
    two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
    depending on how you want to view it. A single user is selected by phone or by email. A single user
    can also be selected by phone (or email) by orders, by phone by shipping, 
    by phone by records by shipping by billing and so on. A set of users can be
    selected by phone or by email. A set of users can also be selected by phone by date 
    or by email by date with or without the Json options and so on.
 `
 
 console.clear()
 this.centered(`\x1b[32mUSERS COMMANDS HELP AND USAGE MANUAL\x1b[0m`)
 
 this.description(centered)
 
 this.verticalSpace(2)

 let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, usercommands)
 console.log()
                
            }
           
        })
 
    }
    async usersonload(command, string){
                //users --load
           if (command[1].match(/--load/)) {
               
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
                             this.emit('error', {error: `Could not find user with phone number ${user}.`})
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
                        let users = {}

                        let counter = 0

                        for (let user of data) {
                            let time = this.elapsed(new Date(user.registered), new Date())
                            let message
                            let years = time.years
                            let months = time.months
                            let days = time.days
                            let hours = time.hours
                            let minutes = time.minutes
                            let seconds = time.seconds
                            // console.log(years, months, days, hours, minutes, seconds)

                            if (years > 0) {
                                message = `${years} ${this.pluralize('year', years)} ${months} ${this.pluralize('month', months)} ${days} ${this.pluralize('day', days)} ago.`
                            } else if (months > 0) {
                                message = `${months} ${this.pluralize('month', months)} ${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ago.`
                            } else if (days > 0) {
                                message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ago.`

                            } else if (hours > 0) {
                                message = `${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ${seconds} ${this.pluralize('second', seconds)} ago.`
                            } else {
                                message = `${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ${seconds} ${this.pluralize('second', seconds)} ago.`
                                //console.log({hours, minutes, seconds})
                            }
                            users[`\x1b[35mUSER ${counter}\x1b[0m`] = []
                            users[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mNAME\x1b[0m'] = user.name
                            users[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mPHONE\x1b[0m'] = user.phone
                            users[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mREGISTERED ON\x1b[0m'] = user.registered
                            users[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mAS OF NOW\x1b[0m'] = message
                            counter++
                        }

                        //   console.log('data:', data)
                        console.clear()
                        console.table(users)
                        this.prompt()
                        })
                     
                    }
                }catch(error){
                 this.emit('error', {error: 'User not found'})
                }
                
            }
    }
    userj(string) {
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
        
        if (string.trim().startsWith('users --load -j')) {
            
            if (string.trim() === 'users --load -j') {
                return this.getUsers(string, '--load -j')
            }

            if (string.trim().match(/users --load -j -d/)) {
                if (string.trim().length > 'users --load -j -d'.length) {

                    if (isValid(Dregex, 'users --load -j -d')) {
                        this.getUsers(string, '--load -j -d')
                    } else {
                        return this.emit('users:error', {
                            error: `'${checker('users --load -j -d')}' is not a valid argument for 'users --load -j -d'! Number of days must be a positive whole number.`
                        })
                    }

                    // year and json

                }
            } else if (string.trim().match(/users --load -j --depth=/)) {
                if (string.trim().length > 'users --load -j --depth='.length) {

                    if (isValid(Dregex, 'users --load -j --depth=')) {
                        this.getusers(string, '--load -j --depth=')
                    } else {
                        return this.emit('users:error', {
                            error: `'${checker('users --load -j --depth=')}' is not a valid argument for 'users --load -j --depth='! Number of days must be a positive whole number.`
                        })
                    }
                }
            } else {
                return this.emit('users:error', {
                    error: `'${checker('users --load -j')}' is not a valid argument for 'users --load --json'`
                })
            }
        } 
    }


    // order load by json
    userjson (string){
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

        if (string.trim().startsWith('users --load --json')) {

            if (string.trim() === 'users --load --json') {
                return this.getUsers(string, '--load --json')
            }
            if (string.trim().match(/users --load --json -d/)) {
                if (string.trim().length > 'users --load --json -d'.length) {

                    if (isValid(Dregex, 'users --load --json -d')) {
                        this.getUsers(string, '--load --json -d')
                    } else {
                        return this.emit('users:error', {
                            error: `'${checker('users --load --json -d')}' is not a valid argument for 'users --load --json -d'! Number of days must be a positive whole number.`
                        })
                    }
                }
            } else if (string.trim().match(/users --load --json --depth=/)) {
                if (string.trim().length > 'users --load --json --depth='.length) {
                    if (isValid(Dregex, 'users --load --json --depth=')) {
                        this.getUsers(string, '--load --json --depth=')
                    } else {
                        return this.emit('users:error', {
                            error: `'${checker('users --load --json --depth=')}' is not a valid argument for 'users --load --json --depth='! Number of days must be a positive whole number.`
                        })
                    }
                }
            } else {
                return this.emit('users:error', {
                    error: `'${checker('users --load --json')}' is not a valid argument for 'users --load --json'`
                })
            }
        }
    }

// orders load by time
    onuserloader(string){
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

          // Years
          if (string.match(/users --load -y/)) {
            if (string.trim().length > 'users --load -y'.length) {
                this.onusersjson(string, '--load -y')

            }
        } else if (string.match(/users --load --years=/)) {
            if (string.trim().length > 'users --load --years='.length) {
                this.onusersjson(string, '--load --years=')
            }
        }

        // months
        if (string.match(/users --load -M/)) {
            if (string.trim().length > 'users --load -M'.length) {
                this.onusersjson(string, '--load -M')
            }
        } else if (string.match(/users --load --months=/)) {
            if (string.trim().length > 'users --load --months='.length) {
                this.onusersjson(string, '--load --months=')
            }
        }
        // days
        if (string.match(/users --load -d/)) {
            if (string.trim().length > 'users --load -d'.length) {

                this.onusersjson(string, '--load -d')
            }
        } else if (string.match(/users --load --days=/)) {
            if (string.trim().length > 'users --load --days='.length) {
                this.onusersjson(string, '--load --days=')
            }

        } else if (string.match(/users --load --hours=/)) {
            if (string.trim().length > 'users --load --hours='.length) {
                this.onusersjson(string, '--load --hours=')
            }
        } else if (string.match(/users --load -h/)) {
            if (string.trim().length > 'users --load -h'.length) {
                this.onusersjson(string, '--load -h')
            }

        } else if (string.match(/users --load --minutes=/)) {
            if (string.trim().length > 'users --load --minutes='.length) {
                this.onusersjson(string, '--load --minutes=')
            }
        } else if (string.match(/users --load -m/)) {
            if (string.trim().length > 'users --load -m'.length) {
                this.onusersjson(string, '--load -m')
            }
        } else if (string.match(/users --load/)) {
            if (string === 'users --load') {
                this.getUsers(string, '--load')
            } else if (string === 'users --load -j') {} 
            else if (string === 'users --load') {} 
            else if (string.trim().length > 'users --load -y'.length || string === 'users --load -y') {} 
            else if (string === 'users --load --json') {} 
            else if (string.trim().length > 'users --load -j -d'.length || string.trim() === 'users --load -j -d') {} else if (string.trim().length > 'users --load --json -d'.length || string.trim() === 'users --load --json -d') {} 
            else if (string.trim().length > 'users --load -j --depth='.length || string.trim() === 'users --load -j --depth=') {} 
            else if (string.trim().length > 'users --load --json --depth='.length || string.trim() === 'users --load --json --depth=') {} 
            else {
                this.emit('users:error', {
                    error: `'${string}' is not valid command! onloader 1`
                })
            }
        }
        else if(string.trim() === 'users'){}
        else if(string.trim() === 'users -l'){}
        else if (string === 'users -l -j') {}
        else if (string === 'users -l') {}
        else if (string.trim().length > 'users -l -y'.length || string === 'users -l -y') {}
        else if (string === 'users -l --json') {} 
        else if (string.trim().length > 'users -l -j -d'.length || string.trim() === 'users -l -j -d') {} 
        else if (string.trim().length > 'users -l --json -d'.length || string.trim() === 'users -l --json -d') {} 
        else if (string.trim().length > 'users -l -j --depth='.length || string.trim() === 'users -l -j --depth=') {} else if (string.trim().length > 'users -l --json --depth='.length || string.trim() === 'users -l --json --depth=') {}
        else if(string.trim() === 'users -h' || string.trim() ==='users --help'){}
        else if(string.trim() === 'users -g -e'){}
        
        else {
            if(string.trim().startsWith('users') === false){
                this.emit('users:error', {
                    error: `'${string}' is not valid command!`
                })
            }
        }
    }
     
    onusergetbyhelp(string){
        if (string.trim().startsWith('users -h')) {
            if (string.trim().length === 'users -h'.length) {
                this.help(string)
            } else {
                this.emit('users:error', {
                    error: `'${string}' is not valid command! ongetbyhelp`
                })
            }
        } else if (string.trim().startsWith('users --help')) {
            if (string.trim().length === 'users --help'.length) {
                this.help(string)
            } else {
                //this.emit('orders:error', {error: `'${string}' is not valid command!`})
            }
        } 
    }
    ongetuserbyerror(string){
        if (string.trim().startsWith('users') && string.trim().length === 'users'.length) {
            //this.emit('users')
        }else if (string.trim().startsWith('users -l') && string.trim().length === 'users -l'.length) {
            //this.emit('users')
        }else if (string.trim().length >'users -l -y'.length || string.trim().length === 'users -l -y'.length) {
            //this.emit('users')
        } else if (string.trim().startsWith('users --load') && string.trim().length > 'users --load'.length) {
            //this.emit('users')
        }else if (string.trim().startsWith('users --load') && string.trim().length === 'users --load'.length) {
            //this.emit('users')
        }else if (string.trim().startsWith('users -h') && string.trim().length === 'users -h'.length) {
            //this.emit('orders')
        }else {
            this.emit('users:error', {
                error: `'${string}' is not valid command! ongetbyerror`
            })
        }
    }
    onloadusers(string) {
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

        if (string.trim().startsWith('users -l')) {
            if (string.trim().length === 'users -l'.length) {
                this.getUsers(string, '-l')
            }
            if (string.trim().startsWith('users -l -j')) {
                if (string.trim() === 'users -l -j') {
                    return this.getUsers(string, '-l -j')
                }

                if (string.trim().match(/users -l -j -d/)) {
                    if (string.trim().length > 'users -l -j -d'.length) {

                        if (isValid(Dregex, 'users -l -j -d')) {
                            this.getUsers(string, '-l -j -d')
                        } else {
                            return this.emit('users:error', {
                                error: `'${checker('users -l -j -d')}' is not a valid argument for 'users -l -j -d'! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else if (string.trim().match(/users -l -j --depth=/)) {
                    if (string.trim().length > 'users -l -j --depth='.length) {

                        if (isValid(Dregex, 'users -l -j --depth=')) {
                            this.getUsers(string, '-l -j --depth=')
                        } else {
                            return this.emit('users:error', {
                                error: `'${checker('users -l -j --depth=')}' is not a valid argument for 'users -l -j --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else {
                    return this.emit('users:error', {
                        error: `'${checker('users -l -j')}' is not a valid argument for 'users -l --json'`
                    })
                }


            } 
            
            else if (string.trim().startsWith('users -l --json')) {
                if (string.trim() === 'users -l --json') {
                    return this.getUsers(string, '-l --json')
                }
                if (string.trim().match(/users -l --json -d/)) {
                    if (string.trim().length > 'users -l --json -d'.length) {

                        if (isValid(Dregex, 'users -l --json -d')) {
                            this.getUsers(string, '-l --json -d')
                        } else {
                            return this.emit('users:error', {
                                error: `'${checker('users -l --json -d')}' is not a valid argument for 'users -l --json -d'! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else if (string.trim().match(/users -l --json --depth=/)) {
                    if (string.trim().length > 'users -l --json --depth='.length) {
                        if (isValid(Dregex, 'users -l --json --depth=')) {
                            this.getUsers(string, '-l --json --depth=')
                        } else {
                            return this.emit('users:error', {
                                error: `'${checker('users -l --json --depth=')}' is not a valid argument for 'users -l --json --depth='! Number of days must be a positive whole number.`
                            })
                        }
                    }
                } else {
                    return this.emit('users:error', {
                        error: `'${checker('users -l --json')}' is not a valid argument for 'users -l --json'`
                    })
                }
            }

            //  Years users -l -y + json
            else if (string.match(/users -l -y/)) {
                if (string.trim().length > 'users -l -y'.length) {
                    this.onusersjson(string, '-l -y')
                }
            } else if (string.match(/users -l --years=/)) {
                if (string.trim().length > 'users -l --years='.length) {
                    this.onusersjson(string, '-l --years=')
                }
            }

            // months
            if (string.match(/users -l -M/)) {
                if (string.trim().length > 'users -l -M'.length) {
                    this.onusersjson(string, '-l -M')
                }
            } else if (string.match(/users -l --months=/)) {
                if (string.trim().length > 'users -l --months='.length) {
                    this.onusersjson(string, '-l --months=')
                }
            }
            // days
            if (string.match(/users -l -d/)) {
                if (string.trim().length > 'users -l -d'.length) {
                    this.onusersjson(string, '-l -d')
                }
            } else if (string.match(/users -l --days=/)) {
                if (string.trim().length > 'users -l --days='.length) {
                    this.onusersjson(string, '-l --days=')
                }
                // hours
            } else if (string.match(/users -l --hours=/)) {
                if (string.trim().length > 'users -l --hours='.length) {
                    this.onusersjson(string, '-l --hours=')
                }
            } else if (string.match(/users -l -h/)) {

                if (string.trim().length > 'users -l -h'.length) {
                    this.onusersjson(string, '-l -h')
                }
                // minutes
            } else if (string.match(/users -l --minutes=/)) {
                if (string.trim().length > 'users -l --minutes='.length) {
                    this.onusersjson(string, '-l --minutes=')
                }
            } else if (string.match(/users -l -m/)) {
                if (string.trim().length > 'users -l -m'.length) {
                    this.onusersjson(string, '-l -m')
                }
            } else if (string.match(/users -l/)) {
                if (string === 'users -l') {
                    // this.getUsers(string, '-l')
                } else if (string === 'users -l -j') {

                }else if (string === 'users -l -y') {

                } else if (string.trim().length > 'users -l -y'.length || string === 'users -l -y') {

                } else if (string === 'users -l --json') {

                } else if (string.trim().length > 'users -l -j -d'.length || string.trim() === 'users -l -j -d') {

                } else if (string.trim().length > 'users -l --json -d'.length || string.trim() === 'users -l --json -d') {

                } else if (string.trim().length > 'users -l -j --depth='.length || string.trim() === 'users -l -j --depth=') {

                } else if (string.trim().length > 'users -l --json --depth='.length || string.trim() === 'users -l --json --depth=') {

                } else {
                    return this.emit('users:error', {
                        error: `'${string}' is not valid  command! 1`
                    })
                }
            } 
            else if(string.trim() ==='users -g -e'){}
            else if(string.trim() ==='users -d -e'){}
             else {
            
                return this.emit('users:error', {
                    error: `'${string}' is not valid command! sdsds2`
                })
            }
        }else if(string.trim().startsWith('users --load')){
            if (string.trim().length === 'users --load'.length) {
                this.getUsers(string, '--load')
            }
        }

    }

    onglobalusermatch(string) {
       this.userj(string)
       this.userjson(string)
       this.onuserloader(string)
       this.onloadusers(string)
       this.onusergetbyhelp(string)
       this.ongetuserbyerror(string)
    }
    
    async getUsers(string, args) {
       

        let checkstring = this.spliter(string, ' ')
    
       
        if(checkstring.length === 4 || checkstring.length === 3 || checkstring.length === 2 || checkstring.length=== 5){
             
         }else{
             return this.emit('users:error', {
                 error: `'${string}'  has invalid number of arguments `
             })
         }

         const option = this.spliter(string, 'users')


       
         if (!option || option.length === 0) return
         if(option.length !== 1){
             return this.emit('users:error', {
                 error: `'${option}' is not a valid argument for 'orders ${args}' `
             })
         }
         let matcher = this.spliter(option[0], args)
 
         if(option[0].length === 6 || option[0].length === 2){
            // if(this.auth === false){
            //     return this.emit('users:warning', {error: 'You must be logged in to do this'})
            // }
             this.loadusers('system-users')
             if((option[0] === '--load' || option[0] === '-l') &&(string === 'users --load' || string=== 'users -l')){
                 this.on('system-users', users =>{
                     return this.emit('show-all-users', users,{message: ''}, {message: 'ALL USERS IN THE SYSTEM'})
                 })
             }
         } 
         if(args === '--load --json' || args === '--load -j' || args === '-l --json' || args === '-l -j'){
             this.loadusers('load--json')
             this.once('load--json', orders => {
                console.log(util.inspect(orders, {showHidden: true, depth: Infinity, colors: true}))
             })
         }
         if(args === '--load --json -d' || args === '--load --json --depth=' || args === '--load -j -d' || args === '--load -j --depth=' || args === '-l --json -d' || args === '-l --json --depth=' || args === '-l -j -d' || args === '-l -j --depth='){
             this.loadusers('loading--json')
             this.once('loading--json', orders => {
                console.log(util.inspect(orders, {showHidden: true, depth: parseInt(matcher[0]), colors: true}))
             })
         }
 
         
         if(args === '--load --months=' || args === '-l --months='){
             this.loadusers('load--months')
                 this.once('load--months', orders => {
                     let months = parseInt(matcher[0])
                     let isMOK = this.isValid(this.regexes().Mregex, months)
                     if(isMOK === false || months === 0){
                         console.log()
                         return this.emit('users:error', {
                             error: `Invalid input! Number of month must be from 1 to 11.`
                         })
                     }
                     let chosenmonth = orders.filter(order => (this.onmonths(order.created_at) <= months))
                     if (chosenmonth.length === 0) {
                         return this.emit('users:info', {
                             error: `No user registered within the last ${months} ${this.pluralize('month', months)}`
                         })
                     }
                     return this.emit('show-all-users-within-chosen-month-months', chosenmonth,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'}, {message: `${months} ${this.pluralize('month', months).toLocaleUpperCase()}`})
                 })
         } 
         if(args === '--load -M' || args === '-l -M'){
             this.loadusers('load--M')
                 this.once('load--M', orders => {
                     let months = parseInt(matcher[0])
                     let isMOK = this.isValid(this.regexes().Mregex, months)
                     if(isMOK === false || months === 0){
                         console.log()
                         return this.emit('users:error', {
                             error: `Invalid input! Number of month must be from 1 to 11.`
                         })
                     }
                     let chosenmonth = orders.filter(order => (this.onmonths(order.created_at) <= months))
                     if (chosenmonth.length === 0) {
                         return this.emit('users:info', {
                             error: `No user registered within the last ${months} ${this.pluralize('month', months)}`
                         })
                     }
                     return this.emit('show-all-users-within-chosen-month-m', chosenmonth,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'}, {message: `${months} ${this.pluralize('month', months).toLocaleUpperCase()}`})
                 })
         }
         if(args === '--load --years=' || args ==='-l --years='){
                this.loadusers('load--years')
                 this.once('load--years', orders => {
                     let years = parseInt(matcher[0])
                     let chosenyear = orders.filter(order => (this.onyears(order.created_at) <= years)) 
                     if (chosenyear.length === 0) {
                         return this.emit('users:info', {
                             error: `No user registered within the last ${years} ${this.pluralize('year', years)}`
                         })
                     }
                     return this.emit('show-all-users-within-chosen-year-years', chosenyear,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'}, {message: `${years} ${this.pluralize('year', years).toLocaleUpperCase()}`})
                 })
         }
         if(args === '--load -y' || args ==='-l -y'){
             this.loadusers('load--y')
                 this.once('load--y', orders => {
                     let years = parseInt(matcher[0])
                     let chosenyear = orders.filter(order => (this.onyears(order.created_at) <= years))
                     if (chosenyear.length === 0) {
                         return this.emit('users:info', {
                             error: `No user registered within the last ${years} ${this.pluralize('year', years)}`
                         })
                     }
                     return this.emit('show-all-users-within-chosen-year-y', chosenyear,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'}, {message: `${years} ${this.pluralize('year', years).toLocaleUpperCase()}`})
                 })
         }
 
         if(args === '--load --days=' || args === '-l --days='){
             this.loadusers('load--days')
                 this.once('load--days', orders => {
                     let days = parseInt(matcher[0])
                     let isdOK = this.isValid(this.regexes().dregex, days)
                     if(isdOK === false){
                         console.log()
                         return this.emit('users:error', {
                             error: `Invalid input! Number of days must be from 1 to 30.`
                         })
                     }
                     let chosenday = orders.filter(order =>(this.ondays(order.created_at) <= days))
                     if (chosenday.length === 0) {
                         return this.emit('users:info', {
                             error: `No user registered within the last ${days} ${this.pluralize('day', days)}`
                         })
                     }
                     return this.emit('show-all-users-within-chosen-day-days', chosenday,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'}, {message: `${days} ${this.pluralize('day', days).toLocaleUpperCase()}`})
                 })
         }
         if(args === '--load -d' || args === '-l -d'){
             this.loadusers('load--d')
                 this.once('load--d', orders => {
                     let days = parseInt(matcher[0])
                     let isdOK = this.isValid(this.regexes().dregex, days)
                     if(isdOK === false){
                         console.log()
                         return this.emit('users:error', {
                             error: `Invalid input! Number of days must be from 1 to 30.`
                         })
                     }
                     let chosenday = orders.filter(order => (this.ondays(order.created_at) <= days))
                     if (chosenday.length === 0) {
                         return this.emit('users:info', {
                             error: `No user registered within the last ${days} ${this.pluralize('day', days)}`
                         })
                     }
                     return this.emit('show-all-users-within-chosen-day-d', chosenday,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'}, {message: `${days} ${this.pluralize('day', days).toLocaleUpperCase()}`})
                 })
         }
         if(args === '--load --hours=' || args === '-l --hours='){
             this.loadusers('load--hours')
               this.once('load--hours', orders => {
                   let hours = parseInt(matcher[0])
                   let ishOK = this.isValid(this.regexes().hregex, hours)
                   if(ishOK === false || hours === 0){
                       console.log()
                       return this.emit('users:error', {
                           error: `Invalid input! Number of hours must be from 1 to 23.`
                       })
                   }
                   let chosenhour = orders.filter(order => (this.onhours(order.created_at) <= hours))
                   if (chosenhour.length === 0) {
                       return this.emit('users:info', {
                           error: `No user registered within the last ${hours} ${this.pluralize('hour', hours)}`
                       })
                   }
                   return this.emit('show-all-users-within-chosen-hour-hours', chosenhour, {message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'},{message: `${hours} ${this.pluralize('hour', hours).toLocaleUpperCase()}`})
               })
         }
         if(args === '--load -h' || args === '-l -h'){
             this.loadusers('load--h')
               this.once('load--h', orders => {
                   let hours = parseInt(matcher[0])
 
                   let ishOK = this.isValid(this.regexes().hregex, hours)
                   if(ishOK === false || hours === 0){
                       console.log()
                       return this.emit('users:error', {
                           error: `Invalid input! Number of hours must be from 1 to 23.`
                       })
                   }
                   let chosenhour = orders.filter(order => (this.onhours(order.created_at) <= hours))
                   if (chosenhour.length === 0) {
                       return this.emit('users:info', {
                           error: `No user registered within the last ${hours} ${this.pluralize('hour', hours)}`
                       })
                   }
                   return this.emit('show-all-users-within-chosen-hour-h', chosenhour, {message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'},{message: `${hours} ${this.pluralize('hour', hours).toLocaleUpperCase()}`})
               })
         }
         if(args === '--load --minutes=' || args === '-l --minutes='){
             this.loadusers('load--minutes')
                this.once('load--minutes', orders => {
                     let minutes = parseInt(matcher[0])
 
                     let ismOK = this.isValid(this.regexes().mregex, minutes)
                     if(ismOK === false || minutes === 0){
                         console.log()
                         return this.emit('users:info', {
                             error: `Invalid input! Number of minutes must be from 1 to 59.`
                         })
                     }
                     let chosenminute = orders.filter(order => (this.onminutes(order.created_at) <= minutes))  
 
                     if (chosenminute.length === 0) {
                         console.log()
                         return this.emit('users:info', {
                             error: `No user registered within the last ${minutes} ${this.pluralize('minute', minutes)}`
                         })
                     }
                     else if(chosenminute.length > 0){
                         return this.emit('show-all-users-within-chosen-minute-minutes', chosenminute,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'},{message: `${minutes} ${this.pluralize('minutes', minutes).toLocaleUpperCase()}`})
                     }else{
                         return 
 
                     }
                 })
           }
           if(args === '--load -m' || args === '-l -m'){
               this.loadusers('load--m')
                 this.once('load--m', orders => {
                     let minutes = parseInt(matcher[0])
                     let ismOK = this.isValid(this.regexes().mregex, minutes)
                     if(ismOK === false || minutes === 0){
                         console.log()
                         return this.emit('users:error', {
                             error: `Invalid input! Number of minutes must be from 1 to 59.`
                         })
                     }
                     let chosenminute = orders.filter(order => (this.onminutes(order.created_at) <= minutes))
                     if (chosenminute.length === 0) {
                         return this.emit('users:info', {
                             error: `No user registered within the last ${minutes} ${this.pluralize('minute', minutes)}`
                         })
                     }
                     return this.emit('show-all-users-within-chosen-minute-m', chosenminute,{message: 'ALL USERS WHO REGISTERED WITHIN THE LAST'},{message: `${minutes} ${this.pluralize('minutes', minutes).toLocaleUpperCase()}`})
                 })
           }
 
         this.ondisplayusers('show-all-users-within-chosen-year-years') 
         this.ondisplayusers('show-all-users-within-chosen-year-y')
         this.removeDuplicateListeners('show-all-users-within-chosen-year-years')
         this.removeDuplicateListeners('show-all-users-within-chosen-year-y')
         
         this.ondisplayusers('show-all-users-within-chosen-month-months')
         this.ondisplayusers('show-all-users-within-chosen-month-m')
         this.removeDuplicateListeners('show-all-users-within-chosen-month-months')
         this.removeDuplicateListeners('show-all-users-within-chosen-month-m')
 
         this.ondisplayusers('show-all-users-within-chosen-minute-minutes')
         this.ondisplayusers('show-all-users-within-chosen-minute-m')
         this.removeDuplicateListeners('show-all-users-within-chosen-minute-minutes')
         this.removeDuplicateListeners('show-all-users-within-chosen-minute-m')
        
         this.ondisplayusers('show-all-users-within-chosen-hour-hours')
         this.ondisplayusers('show-all-users-within-chosen-hour-h')
         this.removeDuplicateListeners('show-all-users-within-chosen-hour-hours')
         this.removeDuplicateListeners('show-all-users-within-chosen-hour-h')
 
 
         this.ondisplayusers('show-all-users-within-chosen-day-days')
         this.ondisplayusers('show-all-users-within-chosen-day-d')
         this.removeDuplicateListeners('show-all-users-within-chosen-day-days')
         this.removeDuplicateListeners('show-all-users-within-chosen-day-d')
 
         this.ondisplayusers('show-all-users')
         this.removeDuplicateListeners('show-all-users')
 
         this.removeDuplicateListeners('error')
 
     }
    loadusers(event) {
       
       this.findAll('users')
            .then(userIds => {
                let users = []
                for (let id of userIds) {
                    let path = `${this.base()}/users/${id}`
                    let readable = createReadStream(path, 'utf-8')
                    readable.on('error', () => {})
                    readable.on('data', chunk => {
                        users.push(JSON.parse(chunk))
                    })
                    readable.on('end', () => {
                        if (users.length === userIds.length) {
                            return this.emit(event, users)
                        }
                    })
                }
            })
            .catch(error => {
                this.emit('orders:error', {
                    error: 'Internal ERROR: could not get users',
                    error
                })
            })
    }
 
 
    showusers(event) {
        this.once(event, data => {
            // console.log('event:', event)
            // console.log('data:', data)
            // return
            this.once('users-available', users => {
          
                let timestring = this.ontime(event).timestring
                let getTime = this.ontime(event).getTime
                let time = parseInt(data.time)
 
                let chosentime = users.filter(user => getTime(user.created_at, time))
                if (chosentime.length === 0) {
                    return this.emit('users:info', {
                        error: `No user registered within the last ${time} ${this.pluralize(timestring, time)}`
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
    getUserJsonFormat(event) {
        this.loadusers('users-available')
        this.showusers(event)
    }
     onusersjson(string, event){
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
 
         let original = this.spliter(string, `users ${event}`)
         let orig = this.spliter(original[0], ' ')
 
         if(event === '--load --years=' || event === '--load -y' || event ==='-l --years=' || event ==='-l -y'){
             let ishOK = this.isValid(this.regexes().yregex, parseInt(orig[0]))
             if(ishOK === false){
                 return this.emit('users:error', {
                     error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of years must be a positive whole number.`
                 })
             }
         }
 
         if(event === '--load --months=' || event === '--load -M' || event ==='-l --months=' || event ==='-l -M'){
             let ishOK = this.isValid(this.regexes().Mregex, parseInt(orig[0]))
             if(ishOK === false){
                 return this.emit('users:error', {
                     error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of month must be from 1 to 11.`
                 })
             }
         }
 
         if(event === '--load --days=' || event === '--load -d' || event ==='-l --days=' || event ==='-l -d'){
             let ishOK = this.isValid(this.regexes().dregex, parseInt(orig[0]))
             if(ishOK === false){
                 return this.emit('users:error', {
                     error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of days must be from 1 to 30.`
                 })
             }
         }
 
         if(event === '--load --hours=' || event === '--load -h' || event ==='-l --hours=' || event ==='-l -h'){
             let ishOK = this.isValid(this.regexes().hregex, parseInt(orig[0]))
             if(ishOK === false){
                 return this.emit('users:error', {
                     error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of hours must be from 1 to 23.`
                 })
             }
         }
         if(event === '--load --minutes=' || event === '--load -m' || event ==='-l --minutes=' || event ==='-l -m'){
             let ishOK = this.isValid(this.regexes().mregex, parseInt(orig[0]))
             if(ishOK === false || parseInt(orig[0]) === 0){
                 return this.emit('users:error', {
                     error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of minutes must be from 1 to 59.`
                 })
             }
         }
     
 
         // if (hregex.test(parseInt(orig[0])) === false) {
         //     return this.emit('users:error', {
         //         error: `'${orig[0]}' is not a valid argument for 'orders  ${event}'! Number of years must be a positive whole number ....`
         //     })
         // }
 
         let options = []
         for (let i = 1; i < orig.length; i++) {
             options.push(orig[i])
         }
     
         if (options.length === 0) {
             return this.getUsers(string, event)
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
                             this.getUserJsonFormat(event)
                             this.emit(event, datum)
                         
                     }else{
                         let errormessage 
                         if(arguments[0] === undefined){
                             errormessage = `${validarray[0]}' requires an argument. It cannot be blink`
                         }else{
                             errormessage = `'${argument[0]}' is not a valid argument for '${validarray[0]}'! Arguement must be a positive whole number.`
                         }
                         return this.emit('users:error', {
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
                         return this.emit('users:error', {
                             error: errormessage
                         })
                     }
 
                     if (isValidargumentOk === true) {
                         let datum = {
                                 time: orig[0],
                                 depth: argument
                             }
                         this.getUserJsonFormat(event)
                         this.emit(event, datum)
                     }
                 }
 
             } else {
                 return this.emit('users:error', {
                     error: `'${options}' invalid number of arguments!`
                 })
             }
         }
     }
     onprepareusersjson(event) {
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
                     return this.emit('users:error', {
                         error: `'${option}' is not a valid argument for 'orders ${event}'! Must a be json argument. Please orders man page or 'orders --help'.`
                     })
                 }
                 if (jsondepth && jsondepth !== undefined) {
                     //onsole.log(arg)
                     let argument = this.spliter(option, jsondepth)[0]
                     let validargument = parseInt(this.spliter(option, jsondepth)[0], 10)
                     let isValidargumentOk = jsonregex.test(validargument)
                     if (isValidargumentOk === false) {
                         return this.emit('users:error', {
                             error: `'${argument}' is not a valid argument for '${jsondepth}'! Arguement must a positive whole number.`
                         })
                     }
                     if (isValidargumentOk == true) {
                         let datum = {
                             years: data.years,
                             depth: argument
                         }
                          this.emit(event, datum)
                         return this.getUserJsonFormat()
                     }
                     return
                 }
             } else {
                 console.log('error: invalid number of arguments')
             }
         })
     }
      
}


module.exports = UserCommand








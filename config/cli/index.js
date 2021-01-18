'use strict'

const {Interface} = require('readline')


const {createReadStream,promises} = require('fs')
const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)

class CLI extends Interface {

    constructor() {
        let options = {
            input: process.stdin,
            output: process.stdout,
            prompt:``,
            historySize: 1000,
            crlfDelay: Infinity,
            removeHistoryDuplicates: false,
            escapeCodeTimeout: 500
        }

        super(options)

        this.autobind(CLI)
        this.autoinvoker(CLI)
        // this.guestorders =[]
        this.setMaxListeners(Infinity)

        this.isLoggedIn = false
        this.getAuth = null

    }
    get auth() {
        return this.isLoggedIn
    }
    get getAuthUser (){
        return this.getAuth
    }
    set auth(bool = false) {
        this.isLoggedIn = bool
    }

    set getAuthUser(user = null){
        this.getAuth = user
    }
    autobinder(className = {}) {
        for (let method of Object.getOwnPropertyNames(className.prototype)) {
            if (typeof (this[method]) === 'function' && method !== 'constructor') {
                this[method] = this[method].bind(this)
            }
        }
    }
    autobind(className = {}) {
        this.autobinder = this.autobinder.bind(this)
        this.autobinder(className)
    }
    autoinvoker(className = {}) {
        for (let method of Object.getOwnPropertyNames(className.prototype)) {
            this.autoinvoked().forEach(name => {
                if (method === name) {
                    this[method]()
                }
            })
        }
    }
    autoinvoked() {
        return ['init', 'common', 'notAcommand', 'login']
    }
    eventList(){
        return [
            'man',
            'clear',
            'help',
            'menu',
            'users',
            'exit',
            'quit',
            'leave',
            'admin',
            'login',
            'users',
            'stats',
            'guests',
            'orders',
            'contacts',
            'carts',
            'shippings',
            'logout',
            'frontend'
        ]
    }
    async run(command = 'ls', options  = {}){
        console.clear()
        // const { stdout, error, stderr} =
        await exec(command, options)
        this.prompt()
       
    }
    main(string) {
        string = typeof (string) === 'string' && string.trim().length > 0 ? string.trim() : false
        if (string) {
            let commandEvent = false
            let event = this.eventList().find(event => string.trim().toLowerCase().indexOf(event) > -1 && string.startsWith(event))

            if (event) {
                commandEvent = true
                 
                this.emit(event, string)
                return true
            }
            if (commandEvent === false) {
             this.removeDuplicateListeners('command-not-found')
               return this.emit('command-not-found', {
                    error: `'${string}' is not command`
                })
            }
            
        }else{
            return
        }
    }
    init() {

        this.setPrompt(`[\x1b[34m:\x1b[0m`)
        console.clear()
        this.horizontalLine()

        this.centered('\x1b[34mCLI AND SERVER ARE LISTENING ON PORT 3000.\x1b[0m')
        this.horizontalLine()
        //this.centered(`\x1b[32mUSERS COMMANDS HELP AND USAGE MANUAL\x1b[0m`)

        //this.description(centered)

        //this.verticalSpace(2)

        let options = {
            pad: 22,
            position: process.stdout.columns,
            hline: false,
            keyColor: '36',
            valueColor: '37'
        }
        
        // console.log('\x1b[34m%s\x1b[0m', 'CLI and server are running on port 3000.')
        // console.log('\x1b[36m%s\x1b[0m', `Type 'help' or 'man' for CLI usage`)
        console.log('')
        let cmds = {
            'FRONT END:': '\x1b[34mType \x1b[33mfrontend\x1b[0m \x1b[34mor\x1b[0m \x1b[34mnavigate to \x1b[33mhttp://localhost:3000\x1b[0m\x1b[0m \x1b[34m(Safari browser is not supported yet)\x1b[0m',
            'CLI:': `\x1b[34mType \x1b[33mman\x1b[0m \x1b[34mor\x1b[0m \x1b[33mhelp\x1b[0m \x1b[34mor\x1b[0m \x1b[33musers\x1b[0m \x1b[34mor\x1b[0m \x1b[33morders\x1b[0m \x1b[34mor\x1b[0m \x1b[33mmenu\x1b[0m\x1b[34m etc. for the corresponding manual\x1b[0m\x1b[0m`,
            'CLI ADMIN:': '\x1b[34musername:\x1b[0m\x1b[33m6122071306\x1b[0m\x1b[34m,\x1b[0m \x1b[34mpassword:\x1b[0m\x1b[33m#20Demaison\x1b[0m \x1b[34m(You must be logged in to have full access)\x1b[0m',
            'LOGIN:': `\x1b[34mType \x1b[33mlogin\x1b[0m \x1b[34mfor logging in\x1b[0m`,
            'LOGOUT:': `\x1b[34mType \x1b[33mlogout\x1b[0m \x1b[34mfor logging out\x1b[0m`
        }
        this.texAligner(options, cmds)
        this.verticalSpace()
        this.horizontalLine()
        this.verticalSpace()
        this.prompt()
        this.on('line', string => {
                this.main(string)
                this.prompt()
            })
            .on('pause', () => {
                //console.log('waiting for you ....')
            })
            .on('resume', () => {
                //console.log('resumed ....')
            })
            // .on('SIGINT', () => {
            //     this.question('Are you sure you want to exit? ', (answer) => {
            //       if (answer.match(/^y(es)?$/i)) this.close()
            //     })
            //   })
            .on('SIGCONT', () => {
                // `prompt` will automatically resume the stream
                this.prompt();
            })
            .on('SIGTSTP', () => {
                // This will override SIGTSTP and prevent the program from going to the
                // background.
                //console.log('Caught SIGTSTP.')
            })
            .on('close', () => {
                console.log('\x1b[36m%s\x1b[0m', 'Goobye. Have a wonderful and lovely one!')
                process.exit(0)
            })
    }
    completer(line) {
        const completions = '.help .error .exit .quit .q'.split(' ');
        const hits = completions.filter((c) => c.startsWith(line));
        // Show all completions if none found
        return [hits.length ? hits : completions, line];
    }
    common() {
        this.on('clear', () => {
            console.clear()
        })
        this.on('exit', () => {
            this.close()
        })
        this.on('leave', () => {
            this.close()
        })
        this.on('quit', () => {
            this.close()
        })
    }
    notACommand() {
        this.on('command-not-found', data => {
            console.log()
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            console.log()
            this.prompt()
            //process.exit(0)
        })

        this.on('error', data => {
            console.log()
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('success', data => {
            console.log(`\x1b[36m${data.message}\x1b[0m`)
        })
    }
    
    infos(object, depth = 1) {
        console.log(util.inspect(object, {
            showHidden: true,
            colors: true,
            depth: depth
        }))
    }
    
    base() {
        return path.join(__dirname, '../../resources/storage/.data')
    }
    async findAll(path) {
        return await promises.readdir(`${this.base()}/${path}`);
    }
    hash(string) {
        if (typeof string === 'string' && string.trim().length > 0) {
            const hash = require('crypto').createHmac('sha256', 'HolyMole!IsThisTheHashingSecret?').update(string).digest('hex');
            return hash;
        } else {
            return false;
        }
    };

    login() {

        const incorrectpassword =  (value, message) => {
            this.question('Password: ', passwrd => {
                if(passwrd === 'exit' || passwrd === 'quit' || passwrd === 'leave'){
                    return this.prompt()
                }
                else if(value !== this.hash(passwrd)){

                    if(passwrd.length === 0){
                        console.log(`\x1b[31mpassword required\x1b[0m`)
                    }
                    else if(this.isValid(this.regexes().passwordregex, passwrd) === false && passwrd.length > 0 ){
                        console.log(`\x1b[31minvalid password\x1b[0m`)
                    }else{
                        console.log(`\x1b[31mwrong password\x1b[0m`)
                    }
                    incorrectpassword(value, message)
                }
                else if(value === this.hash(passwrd)){
                    this.emit('login:password:correct', value)
                }            
            })

            this.on('login:password:correct', value => {
                this.emit('login:allowed', value)
            })
            
        }
     
        const onlogin = user => {
            let authUser = {}
            console.clear()
            delete user.aToken
            delete user.password
            console.log()
            this.getAuthUser = user
            let welcome = ` WELCOME ${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}!`
            let name = `${user.firstname} ${user.lastname}`

            authUser[`\x1b[35mDETAILS\x1b[0m`] = []
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mNAME\x1b[0m`] = name
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mPHONE\x1b[0m`] = user.phone
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mJOINED ON\x1b[0m`] = user.created_at
            authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mAS OF NOW\x1b[0m`] = this.ontimemessage(user.created_at)
            // authUser[`\x1b[35mDETAILS\x1b[0m`][`\x1b[37mEMAIL\x1b[0m`] = user.email

            this.removeDuplicateListeners('error')
            if (user.is_admin === false) {
                this.emit('error', {
                    error: ' You do not have admin privileges.'
                })
                this.prompt()
                return
            }
            this.auth = true
            let authoptions = {
                string: welcome,
                number: process.stdout.columns,
                color: 36
            }
            this.padding(authoptions)
            console.table(authUser)
        }

        this.on('login', () => {
            let user, hashed, authUser = {}

            this.question('Phone Number: ', phone => {

                phone = this.clean(phone)

                if(phone === 'exit' || phone === 'quit' || phone === 'leave'){
                    return this.prompt()
                 }
                 if(phone.length === 0){
                    console.log('\x1b[31m%s\x1b[0m', `admin phone number required! ('exit' to exit)`)
                     this.emit('login')
                 }
                 if(this.isValid(this.regexes().phoneregex, phone) === false && phone.length !== 0){
                    console.log('\x1b[31m%s\x1b[0m', `Invalid phone number! ('exit' to exit)`)
                    this.emit('login')
                 }
                    this.question('Password: ', password => {
                        password = this.clean(password)
                        if(password.length === 0){
                            console.log(`\x1b[31mPassword required!\x1b[0m`)
                        }
                            let path = `${this.base()}/users/${phone}.json`
                            let readable = createReadStream(path, 'utf-8')

                            readable.on('error', error => {
                                console.log(`\x1b[31mUnrecognized Phone number\x1b[0m`)
                                this.emit('login')
                            })
                            readable.on('data', chunk => {
                                user = JSON.parse(chunk)
                                hashed = this.hash(password)
                            })
                            readable.on('end', () => {

                                if(password.length === 0){
                                    incorrectpassword(user.password, 'password required')
                                    this.on('login:allowed', value => {
                                        onlogin(user)
                                    })
                                }
                                else if(this.isValid(this.regexes().passwordregex, password) === false && password.length > 0 ){
                                    incorrectpassword(user.password, 'invalid password')
                                    this.on('login:allowed', value => {
                                        onlogin(user)
                                    })
                                }
                                else if(user.password !== this.hash(password)){
                                    incorrectpassword(user.password, 'wrong password')
                                    this.on('login:allowed', value => {
                                        onlogin(user)
                                    })
                                }
                               else if(user.password === this.hash(password)){
                                   onlogin(user)
                                }
                            })
                    })
            })
        })
    }
    texAligner = (...args) => {
        let options = {
            pad: 75,
            position: process.stdout.columns,
            hline: false,
            keyColor: '36',
            valueColor: '33'
        }
        if (args.length > 1) {
            if (typeof (args[0]) === 'object') {
                for (let prop in args[0]) {
                    if (options.hasOwnProperty(prop)) {
                        options[prop] = args[0][prop]
                    }
                }
            }
        }

        let i = args.length > 1 ? 1 : 0

        for (; i < args.length; i++) {
            if (typeof args[i] === 'object') {
                for (let prop in args[i]) {
                    let key = `\x1b[${options.keyColor}m${prop}\x1b[0m`
                    let value = `\x1b[${options.valueColor}m${args[i][prop]}\x1b[0m`
                    let padding = options.pad - key.length

                    for (let i = 0; i < padding; i++) {
                        key += ' '
                    }
                    key += value
                    options.hline === true ? hline(1, options.position, key) : console.log(key);
                }
            } else {
                let key = `\x1b[36mKey\x1b[0m`
                let value = `\x1b[33m${args[i]}\x1b[0m`
                let padding = options.pad - key.length

                for (let i = 0; i < padding; i++) {
                    key += ' '
                }
                key += value
                options.hline === true ? hline(1, options.position, key) : console.log(key);
            }

        }
    }

    verticalSpace(NumberOfLines) {
        NumberOfLines = typeof (NumberOfLines) === 'number' && NumberOfLines > 0 ? NumberOfLines : 1
        for (let i = 0; i < NumberOfLines; i++) {
            console.log('')
        }
    }
    // horizontal line accross the screen 
    horizontalLine() {
        const width = process.stdout.columns
        let line = ''
        for (let i = 0; i < width; i++) {
            line += '-'
        }
        console.log(line)
    }

    // create centered text on the screen 
    centered(str) {
        str = typeof (str) === 'string' && str.trim().length > 0 ? str.trim() : ''
        const width = process.stdout.columns
        // calculate left padding 
        const leftPadding = Math.floor((width - str.length) / 2)
        // put in left padding space before the string 
        let line = ''
        for (let i = 0; i < leftPadding; i++) {
            line += ' '
        }
        line += str
        console.log(line)
    }
    // padding (str){
    //     str = typeof (str) === 'string' && str.trim().length > 0 ? str.trim() : ''
    //     const width = process.stdout.columns
    //     // calculate left padding 
    //     const leftPadding = Math.floor((width - str.length) / 2)
    //     // put in left padding space before the string 
    //     let line = ''
    //     for (let i = 0; i < leftPadding; i++) {
    //         line += ' '
    //     }
    //     line += str
    //     console.log(line)
    // }

    description(str) {
        str = typeof (str) === 'string' && str.trim().length > 0 ? str.trim() : ''
        const width = process.stdout.columns
        // calculate left padding 
        const leftPadding = Math.floor((width - str.length) / 4)
        // put in left padding space before the string 
        let line = ''
        for (let i = 0; i < leftPadding; i++) {
            line += ' '
        }
        line += str
        console.log(line)
    }
    manual(str) {
        str = typeof (str) === 'string' && str.trim().length > 0 ? str.trim() : ''
        const width = process.stdout.columns
        // calculate left padding 
        const leftPadding = Math.floor((width - str.length) / 4)
        // put in left padding space before the string 
        let line = ''
        for (let i = 0; i < leftPadding; i++) {
            line += ' '
        }
        line += str
        console.log(line)
    }

    objectToDisplay(...args) {
        let option = {}
        option.object = {}
        option.options = {}
        if (args.length === undefined || args.length === 0) {
            return option
        }
        if (args.length >= 1) {
            for (let i = 0; i < args.length; i++) {
                if (typeof (args[i]) === 'object') {
                    if (!args[i].hasOwnProperty('object') && !args[i].hasOwnProperty('options')) {

                        option.object = args[i]
                        args[i] = option
                    }
                    if (args[i].hasOwnProperty('object') && !args[i].hasOwnProperty('options')) {
                        option.object = args[i]['object']
                        args[i] = option
                    }
                    if (!args[i].hasOwnProperty('object') && args[i].hasOwnProperty('options')) {
                        option.options = args[i]['options']
                        args[i] = option
                    }
                } else if (typeof (args[i]) !== 'object') {
                    if (!args[i].hasOwnProperty('object') && args[i].hasOwnProperty('options')) {
                        option.object = {
                            key: args[i]
                        }
                        args[i] = option
                    } else {
                        option.object = {
                            key: args[i]
                        }
                        args[i] = option
                    }

                }
            }
        }
        return args
    }
    displayer(...args) {
        let option = {
            showHidden: true,
            depth: 10,
            colors: true,
            showProxy: true,
            maxArrayLength: 100,
            maxArrayLength: Infinity,
            compact: true,
            sorted: true
        }

        let dargs = {}
        dargs.object = {
            data: 'no data'
        }
        dargs.options = option

        if (args.length === undefined || args.length === 0) {
            console.log(util.inspect(dargs.object, dargs.options))
            return
        }
        if (args.length >= 1) {
            for (let i = 0; i < args.length; i++) {
                if (typeof (args[i]) === 'object') {
                    if (args[i].hasOwnProperty('object') && args[i].hasOwnProperty('options')) {

                        if (JSON.stringify(args[i]['options']) !== '{}') {
                            for (let prop in args[i]['options']) {
                                if (option.hasOwnProperty(prop)) {
                                    option[prop] = args[i]['options'][prop]
                                }
                            }
                        }
                        console.log(util.inspect(args[i]['object'], option))

                    } else if (args[i].hasOwnProperty('object') && !args[i].hasOwnProperty('options')) {

                        console.log(util.inspect(args[i]['object'], option))

                    } else if (!args[i].hasOwnProperty('object')) {

                        console.log(util.inspect(dargs.object, dargs.options))

                    }
                } else {
                    console.log(args[i], 'here')
                }
            }
        }
    }
    display(object) {
        this.displayer(...this.objectToDisplay(object))
    }
    padding(...args) {

        let options = {
            string: '-',
            number: process.stdout.columns,
            color: 37
        }
        if (args.length === undefined || args.length === 0) {
            // calculate left padding 
            let padding = Math.floor((process.stdout.columns - options.string.length) / options.number)
            // put in left padding space before the string 
            let line = ''
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += `\x1b[${options.color}m${options.string}\x1b[0m`
            console.log(line)
            return
        }

        for (let i = 0; i < args.length; i++) {
            if (typeof (args[i]) === 'object') {
                for (let prop in args[i]) {
                    let checkProp = prop === 'number' && args[i][prop] <= 0 ? 1 : prop
                    if (options.hasOwnProperty(checkProp)) {
                        options[checkProp] = args[i][checkProp]
                    }
                }
            } else {
                // calculate left padding 
                let padding = Math.floor((process.stdout.columns - options.string.length) / options.number)
                // put in left padding space before the string 
                let line = ''
                for (let i = 0; i < padding; i++) {
                    line += ' '
                }
                line += `\x1b[${options.color}m${options.string}\x1b[0m`
                console.log(line)
            }
            // calculate left padding 
            let padding = Math.floor((process.stdout.columns - options.string.length) / options.number)
            // put in left padding space before the string 
            let line = ''
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += `\x1b[${options.color}m${options.string}\x1b[0m`
            console.log(line)
        }

    }



    elapsed(start = new Date(), end = new Date()) {

        if (!util.types.isDate(start)) {
            start = new Date()
        }
        if (!util.types.isDate(end)) {
            end = new Date()
        }

        let result = {}
        // Get the time difference
        let delatt = (end - start) / 1000

        let ymod = delatt / (60 * 60 * 24 * 365)
        let years = Math.trunc(delatt / (60 * 60 * 24 * 365))
        let mmod = 12 * (ymod - years)
        let months = Math.trunc(mmod)
        let dmod = (365 * (mmod - months)) / 12
        let days = Math.trunc(dmod)

        let hmod = (24 * (dmod - days))

        let hours = Math.trunc(hmod)

        let minmod = 60 * (hmod - hours)

        let minutes = Math.trunc(minmod)

        let smod = 60 * (minmod - minutes)

        let seconds = Math.trunc(smod)

        result.years = years
        result.months = months
        result.days = days
        result.hours = hours
        result.minutes = minutes
        result.seconds = seconds

        return result
    }

    pluralize(item, quantiy) {
        return quantiy > 1 ? `${item}s` : `${item}`
    }
    spliter(str, spl) {
        if (str === undefined || spl === undefined) return []
        return str.split(spl).filter(string => string != '').map(st => st.trim())
    }
    clean(string) {
        return string.split(' ').filter(str => str != '').map(str => str.trim()).join(' ')
    }
    onfromthelasttime(date) {
        return this.elapsed(new Date(date), new Date())
    }
    onyears(date) {

        return this.onfromthelasttime(date).years
    }
    onmonths(date) {
        if (this.onyears(date) === 0) {
            return this.onfromthelasttime(date).months
        }
    }
    ondays(date) {
        if (this.onmonths(date) === 0) {
            return this.onfromthelasttime(date).days
        }
    }
    onhours(date) {
        if (this.ondays(date) === 0) {
            return this.onfromthelasttime(date).hours
        }
    }
    onminutes(date) {
        if (this.onhours(date) === 0) {
            return this.onfromthelasttime(date).minutes
        }
    }
    onseconds(date) {
        if (this.onminutes(date) === 0) {
            return this.onfromthelasttime(date).seconds
        }
    }

    onchosetime(monregex, matcher, months, event) {
        if (args === '--load --months=') {
            let isOk = monregex.test(matcher)

            if (isOk === false) {
                return this.emit('error', {
                    error: `'${matcher}' is not a valid argument! Number of ${months} must be a positive number.`
                })
            }
            if (isOk === true) {
                this.once('all-orders', orders => {
                    let months = parseInt(matcher)
                    let chosentime = orders.filter(order => this.onmonths(order.created_at) <= months)
                    if (chosentime.length === 0) {
                        return this.emit('error', {
                            error: `No order was placed within the last ${months} ${this.pluralize('day', months)}`
                        })
                    }
                    return this.emit(event, chosentime)
                })
            }
        }
    }
    ontimemessage(date){
        // if(util.isDate(date) === false) return this.emit('error', {error: `'${date}' is not valid date`})
        let time = this.elapsed(new Date(date), new Date())
        let message
        let years = time.years
        let months = time.months
        let days = time.days
        let hours = time.hours
        let minutes = time.minutes
        let seconds = time.seconds
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
        }

        return message
    }
    ondisplayforchosentime(event) {
    
        return this.once(event, (orders, title = '', time = '') => {

            let disp = {}

            let counter = 0;

            for (let iorder of orders.sort()) {

                let order
                order = Array.isArray(iorder) ? iorder[0] : iorder;

                let time = this.elapsed(new Date(order.created_at), new Date())
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


                counter++

                disp[`\x1b[35mORDER ${counter}\x1b[0m`] = []
                disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mORDER ID #\x1b[0m'] = order.id
                disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mDATE\x1b[0m'] = order.created_at
                disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mAS FOR NOW\x1b[0m'] = message
            }

            let string = typeof (title) === 'object' ? ` ${title.message} ${time.message}` : title
            let options
            options = {
                string,
                number: process.stdout.columns,
                color: 36
            }
            // console.log('hello ')
            console.log()
            this.padding(options)
            console.table(disp)

        });
    }
    ondisplayusers(event) {
    
        return this.once(event, (users, title = '', time = '') => {

            let disp = {}

            let counter = 0;

            for (let user of users.sort()) {

          
                let time = this.elapsed(new Date(user.created_at), new Date())
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


                counter++

                disp[`\x1b[35mUSER ${counter}\x1b[0m`] = []
                disp[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mNAME\x1b[0m'] = `${user.firstname} ${user.lastname}`
                disp[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mPHONE\x1b[0m'] = user.phone
                disp[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mJOINED ON\x1b[0m'] = user.created_at
                disp[`\x1b[35mUSER ${counter}\x1b[0m`]['\x1b[37mAS OF NOW\x1b[0m'] = message
            }

            let string = typeof (title) === 'object' ? ` ${title.message} ${time.message}` : title
            let options
            options = {
                string,
                number: process.stdout.columns,
                color: 36
            }
            // console.log('hello ')
            console.log()
            this.padding(options)
            console.table(disp)

        });
    }
    ondisplayuser(event) {
    
        return this.once(event, user => {
  
            // console.log(user)
            // return
            
            let disp = {}

                let time = this.elapsed(new Date(user.created_at), new Date())
                let message
                let years = time.years
                let months = time.months
                let days = time.days
                let hours = time.hours
                let minutes = time.minutes
                let seconds = time.seconds
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
                }

            let options
            if(user.records && !user.options){
                let string = user.code ? ` USER ASSOCIATED WITH ${user.code.toUpperCase()} (ORDER RECORDS FOUND)`: ` USER ASSOCIATED WITH ${user.phone} (ORDER RECORDS FOUND)`
                options = {
                    string,
                    number: process.stdout.columns,
                    color: 36
                }
            }else if(!user.options){
                let string = user.code ? ` USER ASSOCIATED WITH ${user.code.toUpperCase()} (ORDER RECORDS FOUND)`: ` USER ASSOCIATED WITH ${user.phone} (NO ORDER RECORDS)`
                options = {
                    string,
                    number: process.stdout.columns,
                    color: 36
                }
            }
           
            // console.log('hello ')
            console.log()
            let data = {}
            data[`\x1b[35mDETAILS\x1b[0m`] = []
            data[`\x1b[35mDETAILS\x1b[0m`]['\x1b[37mNAME\x1b[0m'] = `${user.firstname} ${user.lastname}`
            data[`\x1b[35mDETAILS\x1b[0m`]['\x1b[37mPHONE\x1b[0m'] = user.phone
            // data[`\x1b[35mDETAILS\x1b[0m`]['EMAIL'] = user.email
            data[`\x1b[35mDETAILS\x1b[0m`]['\x1b[37mJOINED ON\x1b[0m'] = user.created_at
            data[`\x1b[35mDETAILS\x1b[0m`]['\x1b[37mAS OF NOW\x1b[0m'] = message
           
            // console.log('records:', records)

            // return 
           
            

            if(!user.records){

                if (user.options && user.options.length > 0) {
                    for (let option of user.options) {
                        if (option === 'o') {
                            let string = user.code ? ` ALL ORDERS (${user.code.toUpperCase()})` : ` ALL ORDERS (${user.phone})`
                         let ordersoptions = {
                             string,
                             number: process.stdout.columns,
                             color: 36
                         }
                            this.padding(ordersoptions)
                            
                            if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                             return this.infos(user.data, user.jsonned.depth)
                           }else{
                             console.table(orders)
                           }
                        }
 
                        if (option === 'r') {
                            let string = user.code ? ` ADDRESSES (${user.code.toUpperCase()})` : ` ADDRESSES (${user.phone})`
                            let recordoptions = {
                                string,
                                number: process.stdout.columns,
                                color: 36
                            }
                            this.padding(recordoptions)
                            if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                             return this.infos(jsonrecords, user.jsonned.depth)
                           }else{
                             console.table(records)
                           }
 
                           
                            let ordersoptions = {
                                string:user.code ? ` ALL ORDERS (${user.code.toUpperCase()})` : ` ALL ORDERS (${user.phone})`,
                                number: process.stdout.columns,
                                color: 36
                            }
                            this.padding(ordersoptions)
                            if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                             return this.infos(orders, user.jsonned.depth)
                           }else{
                             console.table(orders)
                           }
                        }
                        
 
                        if (option === 'b') {
                         
                         let string = user.code ? ` BILLING ADDRESS (${user.code.toUpperCase()})` : ` BILLING ADDRESS (${user.phone})`
                         let billingoptions = {
                             string,
                             number: process.stdout.columns,
                             color: 36
                         }
                            this.padding(billingoptions)
                            if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                             return this.infos(jsonbilling, user.jsonned.depth)
                           }else{
                             console.table(billing)
                           }
                        }
                        
                        if (option === 's') {
                         let shippingoptions = {
                             string: ` SHIPPING ADDRESS (${user.phone})`,
                             number: process.stdout.columns,
                             color: 36
                         }
                            this.padding(shippingoptions)
                            if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                             return this.infos(jsonshipping, user.jsonned.depth)
                           }else{
                             console.table(shipping)
                           }
                        }
 
                    }
                } else {

                    if (user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined) {
                     let USER = this.objectCopy(user)
                     let depth = USER.jsonned.depth
                     delete USER.data
                     delete USER.options
                     delete USER.jsonned

                    
                        return this.infos({
                            USER
                        },depth)
                    }
                    if (!user.options) {
 
                     this.padding(options)
                     //delete user.records
                     delete user.active
                     delete user.nickname
                     delete user.tosAgreement
                     delete user.card
                     delete user.orders 
                     console.table(data)
                    }
                }
                
            }
            let orders = {}
            if(user.data && user.data.length > 0){
                let counter = 0
            
                // user's orders 
                for (let order of user.data) {
                
                    // console.log(order.created_at)
                    
                    let time = this.elapsed(new Date(order.created_at), new Date())
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
                    orders[`\x1b[35mORDER ${counter}\x1b[0m`] = []
                    orders[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mORDER ID #\x1b[0m'] = order.id
                    orders[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mDATE\x1b[0m'] = order.created_at
                    orders[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mAS FOR NOW\x1b[0m'] = message
                    counter++
                }
    
            }
           
           

            // if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
            //     return this.infos({user}, user.jsonned.depth)
            //   }else if(!user.options){
            //     console.table(data)
            //   }
      

         
            // console.log('user:', user)
            let records = {}
            let billing = {}
            let jsonbilling = {}
            let shipping = {}
            let jsonshipping = {}
            let jsonrecords = {}

           if (user.records || (user.data && user.data.length > 0)) {
               if (user.records) {
                   records[`\x1b[35mBILLING\x1b[0m`] = []
                   //records[`\x1b[35mBILLING\x1b[0m`][`\x1b[35mBILLING\x1b[0m`] = []
                   records[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mADDRESS\x1b[0m'] = user.records.billing.billing_address
                   records[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mCITY\x1b[0m'] = user.records.billing.billing_city
                   records[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mSTATE\x1b[0m'] = user.records.billing.billing_state
                   records[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mZIP\x1b[0m'] = user.records.billing.billing_zip
                   records[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mPHONE\x1b[0m'] = user.records.billing.billing_phone
                   records[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mEMAIL\x1b[0m'] = user.records.email

                   records[`\x1b[35mSHIPPING\x1b[0m`] = []
                   //records[`\x1b[35mSHIPPING\x1b[0m`][`\x1b[35mSHIPPING\x1b[0m`] = []
                   records[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mADDRESS\x1b[0m'] = user.records.address
                   records[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mCITY\x1b[0m'] = user.records.city
                   records[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mSTATE\x1b[0m'] = user.records.state
                   records[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mZIP\x1b[0m'] = user.records.zip
                   records[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mPHONE\x1b[0m'] = user.records.phone
                   records[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mEMAIL\x1b[0m'] = user.records.email

                   // JSON Records

                   jsonrecords[`BILLING`] = []
                   //jsonrecords[`BILLING`][`BILLING`] = []
                   jsonrecords[`BILLING`]['ADDRESS'] = user.records.billing.billing_address
                   jsonrecords[`BILLING`]['CITY'] = user.records.billing.billing_city
                   jsonrecords[`BILLING`]['STATE'] = user.records.billing.billing_state
                   jsonrecords[`BILLING`]['ZIP'] = user.records.billing.billing_zip
                   jsonrecords[`BILLING`]['PHONE'] = user.records.billing.billing_phone
                   jsonrecords[`BILLING`]['EMAIL'] = user.records.email


                   jsonrecords[`SHIPPING`] = []
                   //jsonrecords[`BILLING`][`BILLING`] = []
                   jsonrecords[`SHIPPING`]['ADDRESSS'] = user.records.address
                   jsonrecords[`SHIPPING`]['CITY'] = user.records.city
                   jsonrecords[`SHIPPING`]['STATE'] = user.records.state
                   jsonrecords[`SHIPPING`]['ZIP'] = user.records.zip
                   jsonrecords[`SHIPPING`]['PHONE'] = user.records.phone
                   jsonrecords[`SHIPPING`]['EMAIL'] = user.records.email


                   // shipping
                   shipping[`\x1b[35mSHIPPING\x1b[0m`] = []
                   //shipping[`\x1b[35mSHIPPING\x1b[0m`][`\x1b[35mSHIPPING\x1b[0m`] = []
                   shipping[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mADDRESS\x1b[0m'] = user.records.address
                   shipping[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mCITY\x1b[0m'] = user.records.city
                   shipping[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mSTATE\x1b[0m'] = user.records.state
                   shipping[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mZIP\x1b[0m'] = user.records.zip
                   shipping[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mPHONE\x1b[0m'] = user.records.phone
                   shipping[`\x1b[35mSHIPPING\x1b[0m`]['\x1b[37mEMAIL\x1b[0m'] = user.records.email


                   // json shipping
                   jsonshipping[`SHIPPING`] = []
                   //jsonshipping[`SHIPPING`][`SHIPPING`] = []
                   jsonshipping[`SHIPPING`]['ADDRESS'] = user.records.address
                   jsonshipping[`SHIPPING`]['CITY'] = user.records.city
                   jsonshipping[`SHIPPING`]['STATE'] = user.records.state
                   jsonshipping[`SHIPPING`]['ZIP'] = user.records.zip
                   jsonshipping[`SHIPPING`]['PHONE'] = user.records.phone
                   jsonshipping[`SHIPPING`]['EMAIL'] = user.records.email


                   // billing

                   billing[`\x1b[35mBILLING\x1b[0m`] = []
                   //billing[`\x1b[35mBILLING\x1b[0m`][`\x1b[35mBILLING\x1b[0m`] = []
                   billing[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mADDRESS\x1b[0m'] = user.records.billing.billing_address
                   billing[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mCITY\x1b[0m'] = user.records.billing.billing_city
                   billing[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mSTATE\x1b[0m'] = user.records.billing.billing_state
                   billing[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mZIP\x1b[0m'] = user.records.billing.billing_zip
                   billing[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mPHONE\x1b[0m'] = user.records.billing.billing_phone
                   billing[`\x1b[35mBILLING\x1b[0m`]['\x1b[37mEMAIL\x1b[0m'] = user.records.email


                   jsonbilling[`BILLING`] = []
                   //jsonbilling[`BILLING`][`BILLING`] = []
                   jsonbilling[`BILLING`]['ADDRESS'] = user.records.billing.billing_address
                   jsonbilling[`BILLING`]['CITY'] = user.records.billing.billing_city
                   jsonbilling[`BILLING`]['STATE'] = user.records.billing.billing_state
                   jsonbilling[`BILLING`]['ZIP'] = user.records.billing.billing_zip
                   jsonbilling[`BILLING`]['PHONE'] = user.records.billing.billing_phone
                   jsonbilling[`BILLING`]['EMAIL'] = user.records.email


               }
               if (user.options && user.options.length > 0) {
                 
                   for (let option of user.options) {
                       if (option === 'o') {
                        let string = user.code ? ` ALL ORDERS (${user.code.toUpperCase()})` : ` ALL ORDERS (${user.phone})`
                        let ordersoptions = {
                            string,
                            number: process.stdout.columns,
                            color: 36
                        }
                           this.padding(ordersoptions)
                           
                           if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                            return this.infos(user.data, user.jsonned.depth)
                          }else{
                            console.table(orders)
                          }
                       }

                       if (option === 'r') {
                        let string = user.code ? ` ADDRESSES (${user.code.toUpperCase()})` : ` ADDRESSES (${user.phone})`
                           let recordoptions = {
                               string,
                               number: process.stdout.columns,
                               color: 36
                           }
                           this.padding(recordoptions)
                           if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                            return this.infos(jsonrecords, user.jsonned.depth)
                          }else{
                            console.table(records)
                          }
                        //   let string2 = user.code ? ` ALL ORDERS (${user.code.toUpperCase()})` : ` ALL ORDERS (${user.phone})`
                           let ordersoptions = {
                               string:user.code ? ` ALL ORDERS (${user.code.toUpperCase()})` : ` ALL ORDERS (${user.phone})`,
                               number: process.stdout.columns,
                               color: 36
                           }
                           this.padding(ordersoptions)
                           if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                            return this.infos(orders, user.jsonned.depth)
                          }else{
                            console.table(orders)
                          }
                       }
                       

                       if (option === 'b') {
                        let string = user.code ? ` BILLING ADDRESS (${user.code.toUpperCase()})` : ` BILLING ADDRESS (${user.phone})`
                        let billingoptions = {
                            string,
                            number: process.stdout.columns,
                            color: 36
                        }
                        // let billingoptions = {
                        //     string: ` BILLING ADDRESS (${user.phone})`,
                        //     number: process.stdout.columns,
                        //     color: 36
                        // }
                           this.padding(billingoptions)
                           if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                            return this.infos(jsonbilling, user.jsonned.depth)
                          }else{
                            console.table(billing)
                          }
                       }
                       //users --get --email=ericson.weah@gmail.com
                       if (option === 's') {
                        let string = user.code ? ` SHIPPING ADDRESS (${user.code.toUpperCase()})` : ` SHIPPING ADDRESS (${user.phone})`
                        let shippingoptions = {
                            string,
                            number: process.stdout.columns,
                            color: 36
                        }
                           this.padding(shippingoptions)
                           if(user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined){
                            return this.infos(jsonshipping, user.jsonned.depth)
                          }else{
                            console.table(shipping)
                          }
                       }

                   }
               } else {
                   if (user.jsonned && user.jsonned.json !== undefined && user.jsonned.depth !== undefined) {

               
                    let USER = this.objectCopy(user)
                    let depth = USER.jsonned.depth
                    delete USER.data
                    delete USER.options
                    delete USER.jsonned
                        
                       return this.infos({
                           USER
                       },depth)
                   } else if (!user.options) {

                    this.padding(options)
                    //delete user.records
                    delete user.active
                    delete user.nickname
                    delete user.tosAgreement
                    delete user.card
                    delete user.orders 

                    console.table(data)
                   }
               }
           }
           
        });
    }
    ondisplaybychosentime(event) {
        return this.once(event, eventObject => {
            // console.log('event', event)
            // console.log('event object', eventObject)
            let orders = eventObject.orders
            let jsoninfo = eventObject.jsonned

            // console.log('orders:', orders)
            // console.log('json info:', jsoninfo)
    

            // return 
            let title = eventObject.title
            let time = eventObject.time
            let disp = {}

            let counter = 0;

            for (let iorder of orders.sort()) {

                let order
                order = Array.isArray(iorder) ? iorder[0] : iorder;

                let time = this.elapsed(new Date(order.created_at), new Date())
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


                counter++

                disp[`\x1b[35mORDER ${counter}\x1b[0m`] = []
                disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mORDER ID #\x1b[0m'] = order.id
                disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mDATE\x1b[0m'] = order.created_at
                disp[`\x1b[35mORDER ${counter}\x1b[0m`]['\x1b[37mAS FOR NOW\x1b[0m'] = message
            }

            let string = typeof (title) === 'object' ? ` ${title.message} ${time.message}` : title
            let options
            options = {
                string,
                number: process.stdout.columns,
                color: 36
            }
            // console.log('hello ')
            if(jsoninfo.json === undefined){
               console.log()
               this.padding(options)
               console.table(disp)
            }else if(jsoninfo.json !== undefined){
                if(jsoninfo.depth === undefined){
                    this.infos(orders, Infinity)
                }else if(jsoninfo.depth !== undefined){
                    this.infos(orders, jsoninfo.depth)
                }
            }

        });
    }
    removeDuplicateListeners(event) {
        if (this.rawListeners(event).length > 1) {
            for (let i = 1; i < this.rawListeners(event).length; i++) {
                this.removeListener(event, this.rawListeners(event)[i])
            }
        }
    }
    isNumber(str){
        return !isNaN(str) === true ? true: false
    }
    isNotNumber(str){
        return isNaN(str) === true ? true: false
    }
    regexes() {
        let phoneregex = /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
        let hregex = /^[1-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
        let mregex = /^[1-5]?[0-9]?$/gm
        let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
        let Mregex = /^(1[0-1]|[1-9])$/gm
        // let yregex = /^[0-9]?[0-9]$/gm
        let yregex = /^[1-9]+[0-9]*$/gm
        let Dregex = /^[0-9]?[0-9]$/gm
        let jsonregex = /^[0-9]?[0-9]$/gm
        let emailregex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
        // positive number including zero 
        let positivenumber = /^(0|[1-9][0-9]{0,9})$/gm
        // positive number greater than zero
        let greaterthanzero = /^[1-9][0-9]*$/gm
        let number = /-?[0-9]{0,10}/gm
       let passwordregex = /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$/gm

        return {
            hregex,
            mregex,
            dregex,
            Mregex,
            yregex,
            Dregex,
            jsonregex,
            phoneregex,
            emailregex,
            positivenumber,
            greaterthanzero,
            number,
            passwordregex
        }
    }
    validate(regex, string) {
        return regex.test(string)
    }
    isValid(regex, string) {
        return this.validate(regex, string) === true ? true : false;
    }
    onvalidateminute(minutes, errormessage = `Invalid input! Number of minutes must be from 1 to 59.`) {
        let ismOK = this.isValid(this.regexes().mregex, minutes)
        if (ismOK === false || minutes === 0) {
            this.emit('invalid-number-of-minutes')
            console.log()
            return this.emit('error', {
                error: errormessage
            })
        }
    }
    onvalidateday(days, errormessage = `Invalid input! Number of days must be from 1 to 30.`) {
        let isdOK = this.isValid(this.regexes().dregex, days)
        if (isdOK === false) {
            return this.emit('error', {
                error: errormessage
            })
        }
    }
    ontime(event) {
        let eventList = [
            '-l -y',
            '-l --years=',
            '--load -y',
            '--load --years=',
 
            '-l -M',
            '-l --months=',
            '--load -M',
            '--load --months=',
 
            '-l -d',
            '-l --days=',
            '--load -d',
            '--load --days=',
            '-l -h',
            '-l --hours=',
            '--load -h',
            '--load --hours=',
 
            '-l -m',
            '-l --minutes=',
            '--load -m',
            '--load --minutes='
        ]
 
 
        let timestring
        let getTime
 
        let gt = eventList.find(e => e === event)
 
        if (gt !== undefined) {
            if (gt === '-l -y' || gt === '-l --years=' || gt === '--load -y' || gt === '--load --years=') {
                timestring = 'year'
                getTime = (date, data) => (this.onyears(date) <= data)
            }
            if (gt === '-l -M' || gt === '-l --months=' || gt === '--load -M' || gt === '--load --months=') {
                timestring = 'month'
                getTime = (date, data) => (this.onmonths(date) <= data)
            }
            if (gt === '-l -d' || gt === '-l --days=' || gt === '--load -d' || gt === '--load --days=') {
                timestring = 'day'
                getTime = (date, data) => (this.ondays(date) <= data)
            }
            if (gt === '-l -h' || gt === '-l --hours=' || gt === '--load -h' || gt === '--load --hours=') {
             timestring = 'hour'
             getTime = (date, data) => (this.onhours(date) <= data)
         }
            if (gt === '-l -m' || gt === '-l --minutes=' || gt === '--load -m' || gt === '--load --minutes=') {
                timestring = 'minute'
                getTime = (date, data) => (this.onminutes(date) <= data)
            }
 
            return {
             timestring,
             getTime
         }
        }else{
            return this.emit('error', {error: `${event} IS AN INVALID OPTION`})
        }
 
    }

    timeEventList(){
        return [
            '-y',
            '--years=',
            '-M',
            '--months=',
            '-d',
            '--days=',
            '-h',
            '--hours=',
            '-m',
            '--minutes=',
            '-s',
            '--seconds='
        ]
    }
    validateTimeEvent(event){
        this.timeEventList().find(_event => _event === event.trim()) !== undefined ? true: false
    }
    jsonEventList(){
        return [
            '-j',
            '-j -d',
            '-j --depth=',
            '--json',
            '--json --depth=',
            '--json -d'
        ]
    }
    validateJsonEvent(event){
       return  this.jsonEventList().find(_event => _event === event.trim()) !== undefined ? true: false
    }
    ontimeevent(event) {
        let eventList = [
            '-y',
            '--years=',
            '-M',
            '--months=',
            '-d',
            '--days=',
            '-h',
            '--hours=',
            '-m',
            '--minutes='
        ]
 
 
        let timestring
        let getTime
 
        let gt = eventList.find(e => e === event)
 
        if (gt !== undefined) {
            if (gt === '-y' || gt === '--years=' || gt === '-y' || gt === '--years=') {
                timestring = 'year'
                getTime = (date, data) => (this.onyears(date) <= data)
            }
            if (gt === '-M' || gt === '--months=' || gt === '-M' || gt === '--months=') {
                timestring = 'month'
                getTime = (date, data) => (this.onmonths(date) <= data)
            }
            if (gt === '-d' || gt === '--days=' || gt === '-d' || gt === '--days=') {
                timestring = 'day'
                getTime = (date, data) => (this.ondays(date) <= data)
            }
            if (gt === '-h' || gt === '--hours=' || gt === '-h' || gt === '--hours=') {
             timestring = 'hour'
             getTime = (date, data) => (this.onhours(date) <= data)
         }
            if (gt === '-m' || gt === '--minutes=' || gt === '-m' || gt === '--minutes=') {
                timestring = 'minute'
                getTime = (date, data) => (this.onminutes(date) <= data)
            }
 
            return {
             timestring,
             getTime
         }
        }else{
            return this.emit('error', {error: `${event} IS AN INVALID OPTION`})
        }
 
    }
    byTimeEventList() {
        return [
  
            'orders:year',
            'orders:month',
            'orders:day',
            'orders:hour',
            'orders:minute',

            'orders:year:json',
            'orders:month:json',
            'orders:day:json',
            'orders:hour:json',
            'orders:minute:json',
            
            'users:month',
            'users:year',
            'users:day',
            'users:hour',
            'users:minute',

            'users:year:json',
            'users:month:json',
            'users:day:json',
            'users:hour:json',
            'users:minute:json'
        ]
    }
    byJsonFormat(){
        return [
            'orders:json',
            'users:json',
        ]
    }
    
    
     byTimeEvent(event){
        
         let _event  = this.byTimeEventList().find(e => e === event)
         if(_event !== undefined){
             return _event
         }else{
             return this.emit('error', {error: `Interval error: Not found in event list `})
         }
     }
     byTime(event){
        let timer = this.spliter(this.byTimeEvent(event), ':')
        let time
        if(timer.length === 3){
            time = `${timer[1]}:${timer[2]}`
        }else if(timer.length === 2){
            time = `${timer[1]}`
        }
        return time
     }
     
     
    eventMethodFromString(event) {
        return this[`on${this.byTimeEvent(event).split(':')[1]}s`]
    }
    timeEventString(event) {
        let code
        let string = this.byTimeEvent(event).split(':')[1]
        if (string === 'year') {
            code = '--years= -y'
        }
        if (string === 'month') {
            code = '--months= -M'
        }
        if (string === 'day') {
            code = '--days= -d'
        }
        if (string === 'hour') {
            code = '--hours= -h'
        }
        if (string === 'minute') {
            code = '--minutes= -m'
        }
        if (string === 'second') {
            code = '--seconds= -s'
        }
        return code
    }

    //
     getOrderByTime(orders, event, data){
     
    //  console.log('data:', data)
        let phone = data.phone ? data.phone : undefined
        let email = data.email ? data.email: undefined
        // let value = data.value ? data.value : undefined
        let timer = data.time ? data.time: undefined
        let jsonned = data.jsonned ? data.jsonned : undefined
        let options = data.options ? data.options : undefined

        

        let eventObject = {}

        eventObject.phone = phone
        eventObject.email = email
        eventObject.timer = timer
        eventObject.jsonned = jsonned
        eventObject.options = options

    
        let string  = this.spliter(this.timeEventString(event), ' ')

        let longcode, shortcode

        longcode = this.timeEventList().find(event => event === string[0])
        shortcode = this.timeEventList().find(event => event === string[1])

        if (longcode !== undefined && shortcode !== undefined) {
            let type, title
            if(phone && phone !== undefined){
               type = phone
            }else if(email && email !== undefined){
                type = email
            }
            if(type && type !== undefined){
                title = {message: `ALL THE ORDERS ${type.toLocaleUpperCase()} PLACED WITHIN THE LAST`}
            }else{
                title = {message: `ALL ORDERS WITHIN THE LAST`}
            }
            let chosenorders = orders.filter(order => (this.eventMethodFromString(event)(order.created_at) <= timer.value))
            if(type && type !== undefined){
                if (chosenorders.length === 0) {
                    return this.emit('orders:info', {
                        error: `${type} placed no order within the last ${timer.value} ${this.pluralize(this.byTime(event), timer.value)}`
                    })
                }
            }else{
                if (chosenorders.length === 0) {
                    return this.emit('orders:info', {
                        error: `No order was placed within the last ${timer.value} ${this.pluralize(this.byTime(event), timer.value)}`
                    })
                }
            }
            let time =  {message: `${timer.value} ${this.pluralize(this.byTime(event), timer.value).toLocaleUpperCase()}`}
            eventObject.title = title 
            eventObject.time = time 
            eventObject.orders = chosenorders
            // return this.emit(event, chosenorders, title, time)
            if(timer !== undefined && jsonned !== undefined){
                if(timer.code !== undefined && timer.value !== undefined){
                   if(jsonned && jsonned !== undefined){
                    if(jsonned.json !== undefined && jsonned.depth !== undefined){
                        this.infos(chosenorders, jsonned.depth)
                    }
                   }
                }
            }
            if(timer !== undefined){
                if(timer.code !== undefined && timer.value !== undefined){
                    if(jsonned && jsonned !== undefined){
                        if(jsonned.json === undefined && jsonned.depth === undefined){
                            return this.emit(event, eventObject)
                        }
                    }
                }
            }            
        }else{
            return []
        }

    }
 
    onarraywalk(searchIn, searchFor, number = false){
        let result = new Set
        for(let option of searchFor){
            if(searchIn.includes(option)){
                result.add(option)
            }
        }
        
        let tempresult = Array.from(result).filter(str => str !== undefined)
        let noNumber = tempresult.filter(str => Number.isNaN(str))

        return number === true ? noNumber : tempresult
    }

    exclude(searchIn, searchFor, number = false){
        let result = new Set
        for(let option of searchFor){
            if(!searchIn.includes(option)){
                result.add(option)
            }
        }

        let tempresult = Array.from(result).filter(str => str !== undefined)
   
        let noNumber = tempresult.filter(str => Number.isNaN(str))
        return number === true ? noNumber : tempresult
    }
    objectCopy(obj) {
        let copy = Object.create(Object.getPrototypeOf(obj))
        Object.getOwnPropertyNames(obj).forEach(name => {
            Object.defineProperty(copy, name, Object.getOwnPropertyDescriptor(obj, name))
        })
        return copy
    };
    matchFinder(searchIn =[], searchFor =[]){
        if(!Array.isArray(searchIn) || !Array.isArray(searchFor)) return 
    
        let found = []
    
        for(let sin of searchIn){
           for(let sfor of searchFor){
               if( sin.match(RegExp(sfor))){
                   found.push(sin)
               }
           }
        }
        return found
    }
    /**
     * @name promisify
     * @function
     *
     * @param {Function|Object} fn the function or object to be promisified
     *  
     * @description promisified functions or objects
     * @return {Function|Object} fn, the promisified function
     * 
     */
    promisify(fn){
        return (...args) => new Promise((resolve, reject) => fn(...args), (err, data) => (err ? reject(err) : resolve(data)))
    }

    
    /**
     * @name getField
     * @function
     *
     * @param {String|Object} attribute the attribute to extract
     *  
     * @description Receive the name of an attribute  and produce a new function that will be able to extract  an attribute from an object
     * 
     * @return {Function|Object} object, the function that will be able to extract an attribute from an object
     * 
     */
    getField (attribute){
        return object => object[attribute]
    }

    /**
     * @name pluckOff
     * @function
     *
     * @param {Function|Object} fn  the function to bind to object method
     *  
     * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
     * 
     *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
     * 
     * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
     * 
     * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
     * 
     */

    pluckOff(fn){
        return (...args) => fn.bind(...args)()
    }
/**
     * @name callOnlyNTimes
     * @function
     *
     * @param {Function|Object} f the function to be called only n times
  
     * @param {Number} n number of time the function f() should be called
     *  
     * @description creates a function that calls and runs the function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times. For instance if n = 1 and the function is called 200 times, it would call or execute f() only once (no more than once). If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and no more than 5 times.
     * 
     * @return {Function|Object} a function that calls fn() only n times
     * 
     */
    callOnlyNTimes(fn, n = 1) {
        let done = false
        return (...args) => {
            if (!done) {
                done = true
                for (let i = 0; i < Math.abs(n); i++) {
                    fn(...args)
                }
            }
        }
    }

     /**
     * @name callFirstOnlyNTimes
     * @function
     *
     * @param {Function|Object} f the function to be called only n times
     * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
     * @param {Number} n number of time the function f() should be called
     *  
     * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
     * 
     * @return {Function|Object} a function that calls fn() only n times and g() afterward
     * 
     */
    callFirstOnlyNTimes(f = () => {}, g = () => {}, n = 1) {
        let done = false
        return (...args) => {
          if (!done) {
            done = true
            if (typeof n !== 'number' || n % 1 !== 0) {
              f(...args)
            } else {
              for (let i = 1; i <= Math.abs(n); i++) {
                f(...args)
              }
            }
          } else {
            g(...args)
          }
        }
      }

    /**
     * @name inputsValid
     * @function
     *
     * @param {Function} arr  the array to validate
     * @param {Function} fn  the call back function to validate
     * @param {Number} flat arr flattening depth to validate
     *  
     * @description validates inputs
     * 
     * @return {Boolean} true if inputs are valid and false if inputs are invalid
     * 
     */
      inputsValid(arr = [], fn = () => {}, flat = 1){
        if (!Array.isArray(arr)) return false
        if (typeof fn !== 'function') return false;
        if (typeof flat !== 'number' || flat < 0 || (flat % 1 !== 0 && flat !== Infinity)) return false;
        return true
      }

     /**
     * @name none
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array
     * 
     * @return {Array|Object} array, the filtered array for which the predicate is true
     * 
     */
      none (arr = [], fn = () => false, flat = 0){
       return this.inputsValid(arr, fn, flat) ? arr.flat(flat).every(v => !fn(v)) : false
    };

     /**
     * @name forEachAsync
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  loops an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */
    forEachAsync (arr = [], fn = () => false, flat = 0){
        if(this.inputsValid(arr, fn, flat)){
            return arr.flat(flat).reduce((promise, value) => promise.then(() => fn(value)), Promise.resolve());
        }else{
            return undefined
        }
       
    }
        
    /**
     * @name mapAsync
     * @function
     *
     * @param {Array|Object} arr the array to loop throug
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  maps an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */
    mapAsync(arr = [],fn = () => [], flat = 0){
        return  this.inputsValid(arr, fn, flat)? Promise.all(arr.flat(flat).map(fn)): []
    }

    /**
     * @name filterAsync
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  filters an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */

    filterAsync (arr = [], fn = () => [], flat = 0){
        if(this.inputsValid(arr, fn, flat)){
            return this.mapAsync(fn, flat).then(array => arr.flat(flat).filter((v, i) => Boolean(array[i])));
        }else{
            return []
        }
    }

    /**
     * @name reduceAsync
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  reduces an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */

    async reduceAsync (arr =[], fn = () => {}, init, flat = 0){
       if(this.inputsValid(arr, fn, flat)){
        return Promise.resolve(init).then(accumulator => this.forEachAsync(arr.flat(flat), async (v, i) => {
            accumulator = fn(accumulator, v, i)
        }).then(() => accumulator))
       }else{
           return 0
       }
    }
    /**
     * @name filter
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the call back function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array
     * 
     * @return {Array|Object} array, the filtered array
     * 
     */
    filtered (arr = [], fn = () => [], flat = 1){
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).filter(x => fn(x)) : []
    }

    /**
     * @name filterItems
     * @function
     * 
     * @param {Array|Object} arr the array to filter
     * @param {String} query any fitlering query
     *  
     * @description asynchronously read a query and filter arrays according to the query
     * 
     * @return {Array}  the query filtered array
     * 
     */
    filterItems(query, arr = []){
        if (!Array.isArray(arr)) return []
        return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    } 

     /**
     * @name some
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array according to the thruthiness of the predicate
     * 
     * @return {Boolean} true if at least one of the array items for which the predicate is true if found. false otherwise
     * 
     */
    some(arr = [], fn = () => false, flat = 0){
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x || fn(y), false) : false
    } 

    /**
     * @name every
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array according to the thruthiness of the predicate
     * 
     * @return {Boolean} true if each one of the array items for which the predicate is true if found. false otherwise
     * 
     */
    every(arr = [], fn = () => false, flat = 0) {
       if(this.inputsValid(arr, fn, falt)){
        let result = [];
        arr.flat(flat).reduce((x, y) => (x === false && fn(y) ? result.push(y) : result.pop()), false);
        return result.length === arr.flat(flat).length ? true : false;
       }else{
           return false
       }
    }

    /**
     * @name forEach
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back funcction
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description performs fn() operation for each of the array elements
     * 
     * @return {Function|Object} the resulting object or array or element from the fn() operation 
     * 
     */

    forEach(arr = [], fn = () => false, flat = 0) {
        if(this.inputsValid(arr, fn, flat)){
            for (let i = 0; i < arr.flat(flat).length; i++) {
                fn(arr.flat(flat)[i]);
            }
        }else{
            return undefined
        }
    };

    /**
     * @name filter
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back funcction
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array according to the thruthiness of the predicate
     * 
     * @return {Array} the resulting array
     * 
     */

    filter(arr = [], fn = () => false, flat = 0) {
       if(this.inputsValid(arr, fn, flat)){
           let result;
           result = [];
           for (let i = 0; i < this.flat(flat).length; i++) {
               fn(arr.flat(flat)[i]) ? result.push(arr.flat(flat)[i]) : [];
           }
           return result.length > 0 ? result : [];
       }else{
           return []
       }
    };

    /**
     * @name flatten
     * @function
     *
     * @param {Array} arr the array to flatten
     *  
     * @description filten an array to whatsover depth or level it has
     * 
     * @return {Array} the resulting flattened array
     * 
     */

    flatten (arr =[]) {
        const result = [];
        arr.forEach(el => (Array.isArray(el) ? result.push(...flatten(el)) : result.push(el)));
        return result;
    };

     /**
     * @name findIndex
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back funcction
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description find the index of an array element
     * 
     * @return {Array} the resulting array element
     * 
     */
    findIndex (arr = [], fn = () => false, flat = 0) {
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y, z) => (x === -1 && fn(y) ? z : x), -1) : undefined;
    };

    /**
     * @name map
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description maps each element with the resulting operation of the callback function
     * 
     * @return {Array} the resulting array 
     * 
     */
    map (arr = [], fn = () => [], flat = 0) {
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x.concat(fn(y)), []) : []
    }

    /**
     * @name find
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description find the first array element for which the predicate is true
     * 
     * @return {Array} the resulting array element
     * 
     */
    find (arr = [], fn = () => false, flat = 0) {
        return this.inputsValid(arr,fn,flat) ? arr.flat(flat).reduce((x, y) => (x === undefined && fn(y) ? y : x), undefined) : undefined;
    };

    
}

module.exports = CLI





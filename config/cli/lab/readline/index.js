const {Interface} = require('readline')
const util = require('util')
const path = require('path')
const {createReadStream,promises} = require('fs')


class CLI extends Interface {
    constructor() {
        let options = {
            input: process.stdin,
            output: process.stdout,
            prompt: `\x1b[34m:: \x1b[0m`,
            historySize: 0,
            crlfDelay: 100,
            removeHistoryDuplicates: false,
            escapeCodeTimeout: 500
        }
        super(options)

        this.autobind(Cli)
        this.autoinvoker(Cli)
        this.guestorders =[]
        this.setMaxListeners(Infinity)

        this.isLoggedIn = false

    }
    get auth() {
        return this.isLoggedIn
    }
    set auth(bool = false) {
        this.isLoggedIn = bool
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
    main(string) {
        string = typeof (string) === 'string' && string.trim().length > 0 ? string.trim() : false
        if (string) {
            const eventsList = [
                'man',
                'clear',
                'help',
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
                'logout'

            ]
            let commandEvent = false
            let event = eventsList.find(event => string.trim().toLowerCase().indexOf(event) > -1 && string.startsWith(event))
            if (event) {
                commandEvent = true
                this.emit(event, string)
                return true
            }
            if (commandEvent === false) {
                this.emit('command-not-found', {
                    error: `'${string}' is not command input`
                })
            }
        }
    }
    init() {
        console.clear()
        console.log('\x1b[34m%s\x1b[0m', 'cli and server running on port 3000 ...')
        console.log('')
        this.prompt()
        this.on('line', string => {
            this.main(string)
            this.prompt()
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
            process.exit(0)
        })
        this.on('leave', () => {
            process.exit(0)
        })
        this.on('quit', () => {
            process.exit(0)
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
    show(object, depth = 1) {
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
        if (typeof string == 'string' && string.trim().length > 0) {
            const hash = require('crypto').createHmac('sha256', 'HolyMole!IsThisTheHashingSecret?').update(string).digest('hex');
            return hash;
        } else {
            return false;
        }
    };
    login() {
        this.on('login', () => {
            this.question('Phone Number: ', phone => {
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
                    this.question('Password: ', password => {
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
                                return this.emit('error', {
                                    error: 'Unrecognized Phone number'
                                })
                            })
                            readable.on('data', chunk => {
                                let user = JSON.parse(chunk)
                                let hashed = this.hash(password)
                                if (user.password !== hashed) {
                                    return this.emit('error', {
                                        error: 'Incorrect password'
                                    })
                                }
                                if (user.password === hashed) {
                                    this.emit('success', {
                                        message: 'You are logged in!'
                                    })
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
                                    this.prompt()

                                }
                            })

                        }

                    })
                }

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
                    if (options.hline === true) {
                        hline(1, options.position, key)
                    } else {
                        console.log(key)
                    }
                }
            } else {

                let key = `\x1b[36mKey\x1b[0m`
                let value = `\x1b[33m${args[i]}\x1b[0m`
                let padding = options.pad - key.length

                for (let i = 0; i < padding; i++) {
                    key += ' '
                }
                key += value
                if (options.hline === true) {
                    hline(1, options.position, key)
                } else {
                    console.log(key)
                }

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
                    console.log({
                        hours,
                        minutes,
                        seconds
                    })
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
    removeDuplicateListeners(event) {
        if (this.rawListeners(event).length > 1) {
            for (let i = 1; i < this.rawListeners(event).length; i++) {
                this.removeListener(event, this.rawListeners(event)[i])
            }
        }
    }
    regexes() {
        let phoneregex = /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
        let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
        let mregex = /^[1-5]?[0-9]?$/gm
        let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
        let Mregex = /^(1[0-1]|[1-9])$/gm
        let yregex = /^[0-9]?[0-9]$/gm
        let Dregex = /^[0-9]?[0-9]$/gm
        let jsonregex = /^[0-9]?[0-9]$/gm
        return {
            hregex,
            mregex,
            dregex,
            Mregex,
            yregex,
            Dregex,
            jsonregex,
            phoneregex
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
}

module.exports = CLI

let me = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '::'
})

me.on('line', string =>{
    console.log(string)
})


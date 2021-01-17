`    \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m -c| \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m -c| \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m -c| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m -c]
\x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m --card| \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m --card| \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m --card| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m --card]

\x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m -s| \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m -s| \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m -s| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m -s]
\x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m --shipping| \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m --shipping| \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m --shipping| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m --shipping]
\x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m --number| \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m --number| \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m --number| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m --number]




\x1b[36morders\x1b[0m -- Application orders and a order's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36morders\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
    \x1b[36morders\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m]
    \x1b[36morders\x1b[0m [\x1b[36m--get --phone=\x1b[0m|\x1b[36m--get -p \x1b[0m|\x1b[36m-g --phone=\x1b[0m|\x1b[36m-g -i \x1b[0m]\x1b[4mphone\x1b[0m[\x1b[36m -n\x1b[0m|\x1b[36m --number\x1b[0m|\x1b[36m -c\x1b[0m|\x1b[36m --card\x1b[0m|\x1b[36m -s\x1b[0m|\x1b[36m --shipping\x1b[0m|\x1b[36m -P\x1b[0m|\x1b[36m --products\x1b[0m]

    \x1b[36morders\x1b[0m [ \x1b[36m--get --email=\x1b[0m\x1b[4memail\x1b[0m | \x1b[36m--get -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g -i \x1b[0m\x1b[4memail\x1b[0m ] [ \x1b[36m-n\x1b[0m | \x1b[36m--number\x1b[0m | \x1b[36m-c\x1b[0m |\x1b[36m--card\x1b[0m | \x1b[36m-s\x1b[0m | \x1b[36m--shipping\x1b[0m | \x1b[36m-P\x1b[0m | \x1b[36m--products\x1b[0m ]


    \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m ]

    \x1b[36morders\x1b[0m [ \x1b[36m--get --id=\x1b[0m\x1b[4morder_id\x1b[0m [ \x1b[36m-n\x1b[0m | \x1b[36m--number\x1b[0m | \x1b[36m-c\x1b[0m |\x1b[36m--card\x1b[0m | \x1b[36m-s\x1b[0m | \x1b[36m--shipping\x1b[0m | \x1b[36m-P\x1b[0m | \x1b[36m--products\x1b[0m ]| \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m [ \x1b[36m-n\x1b[0m | \x1b[36m--number\x1b[0m | \x1b[36m-c\x1b[0m |\x1b[36m--card\x1b[0m | \x1b[36m-s\x1b[0m | \x1b[36m--shipping\x1b[0m | \x1b[36m-P\x1b[0m | \x1b[36m--products\x1b[0m ]| \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m [ \x1b[36m-n\x1b[0m | \x1b[36m--number\x1b[0m | \x1b[36m-c\x1b[0m |\x1b[36m--card\x1b[0m | \x1b[36m-s\x1b[0m | \x1b[36m--shipping\x1b[0m | \x1b[36m-P\x1b[0m | \x1b[36m--products\x1b[0m ]| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m [ \x1b[36m-n\x1b[0m | \x1b[36m--number\x1b[0m | \x1b[36m-c\x1b[0m |\x1b[36m--card\x1b[0m | \x1b[36m-s\x1b[0m | \x1b[36m--shipping\x1b[0m | \x1b[36m-P\x1b[0m | \x1b[36m--products\x1b[0m ]]
`

const factorial = n => {
    if(n === 1 || n === 0 ) return 1
    let j = 1
    for(let i = 1; i <= n; i++){
         j *= i
    }
    return j
}

const combination = (n, k) =>{
     return factorial(n)/(factorial(k)*factorial(n - k))
}

console.log(combination(4,1))


'use strict'
const readline = require('readline')
const {Transform} = require('stream')
const util = require('util')

class CLI extends Transform{
    constructor(){
        super({objectMode: true})
        this.isLoggedIn = false
        this._interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: `\x1b[34m:: \x1b[0m`
        })
    }

    get auth(){
        return this.isLoggedIn
    }
    set auth(bool = false){
        this.isLoggedIn = bool
    }
    _transform(chunk, encoding, fn){
        this.push(chunk.toString())
        fn()
    }
    _flush(chunk, enconding,fn){
        this.push(chunk.toString())
        fn()
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
    orders(){
        return [
            'orders',
            'orders -h',
            'orders --help',
            // Load orders 
            'orders -l',
            'orders --load',
            // Get orders 
            // Get orders 
            'orders -g -i',
            'orders --get -i',
            'orders -g --id',
            'orders --get --id',
            // Delete user
            // 'orders -d -p',
            // 'orders --delete -p',
            // 'orders -d --phone',
            // 'orders --delete --phone',
          
        ]
    }
    man(){
        return [
            'man',
            'man man',
            'man users',
            'man login',
            'man stats',
            'man orders',
            'man help',
            'man carts',
            'man logout',
            'man orders',
            'man login'
           
        ] 
    }
    help(){
        return [
            'help',
            'help man',
            'help users',
            'help login',
            'help stats',
            'help orders',
            'help help',
            'help carts',
            'help logout'
           
        ] 
    }
    stats(){
        return [
            'stats',
            'stats -a',
            'stats --all',
            'stats -l',
            'stats --load',
            'stats --cpu-count',
            'stats --cpu',
            'stats -cpu',
            'stats -c',
            'stats -c -c',
            'stats --free-memory',
            'stats --fm',
            'stats -f -m',
            'stats -f',
            'stats --current-malloced-memory',
            'stats --cmm',
            'stats -cmm',
            'stats -c -m -m',
            'stats --peak-malloced-memory',
            'stats --pmm',
            'stats -pmm',
            'stats -p -m -m',
            'stats --allocated-heap-used',
            'stats --ahu',
            'stats -ahu',
            'stats -a -h -u',
            'stats --available-heap-allocated',
            'stats --aha',
            'stats -aha',
            'stats -a -h -a',
            'stats --uptime',
            'stats -u'
           
        ] 
    }
    orderMatches(){
        return [
            '--l', '--load',
            '-g -i', '-g -e', '-g -p',
            '-g --id=', '-g --email=', '-g --phone=',
            '--get -i', '--get -e', '--get -p',
            '--get --id=', '--get --email=', '--get --phone='
        ]
    }
    orderOptions(){
         return [
            '-h', '--help',
            '-g', '--get',
            '-i', '--id',
            '-e', '--email',
            '-p', '--phone',
            '-n', '--number',
            '-c', '--card',
            '-P', '--products',
            '-l', '--load',
            '-s', '--shipping'

        ]
    }
    input(string){
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


            if(event){
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
    texAligner = ( ...args) => {
        let  options = {pad: 75, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '33'}
        if(args.length > 1){
           if(typeof(args[0]) === 'object'){
               for(let prop in args[0]){
                   if(options.hasOwnProperty(prop)){
                       options[prop] = args[0][prop]
                   }
               }
           }
        }
        
        let i = args.length > 1 ? 1: 0
    
        for ( ;i < args.length; i++) {
            if (typeof args[i] === 'object') {
                for (let prop in args[i]) {
                    let key = `\x1b[${options.keyColor}m${prop}\x1b[0m`
                    let value = `\x1b[${options.valueColor}m${args[i][prop]}\x1b[0m`
                    let padding = options.pad - key.length
    
                    for (let i = 0; i < padding; i++) {
                        key += ' '
                    }
                    key += value
                    if(options.hline === true){
                        hline(1,options.position, key)
                    }else{
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
                if(options.hline === true){
                    hline(1,options.position, key)
                }else{
                    console.log(key)
                }
    
            }
    
        }
    }
    
    verticalSpace (NumberOfLines) {
        NumberOfLines = typeof (NumberOfLines) === 'number' && NumberOfLines > 0 ? NumberOfLines : 1
        for (let i = 0; i < NumberOfLines; i++) {
            console.log('')
        }
    }
    // horizontal line accross the screen 
    horizontalLine(){
        const width = process.stdout.columns
        let line = ''
        for (let i = 0; i < width; i++) {
            line += '-'
        }
        console.log(line)
    }
    
    // create centered text on the screen 
    centered (str){
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

    description (str){
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
    manual (str){
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

    objectToDisplay(...args){
        let option = {}
        option.object = {}
        option.options = {}
        if(args.length === undefined || args.length === 0){
            return option
        }
        if(args.length >= 1){
            for(let i = 0; i < args.length; i++){
                if(typeof(args[i]) === 'object'){
                    if(!args[i].hasOwnProperty('object') && !args[i].hasOwnProperty('options')){
                        
                        option.object = args[i]
                        args[i] = option
                    }
                    if(args[i].hasOwnProperty('object') && !args[i].hasOwnProperty('options')){
                        option.object = args[i]['object']
                        args[i] = option
                    }
                    if(!args[i].hasOwnProperty('object') && args[i].hasOwnProperty('options')){
                        option.options = args[i]['options']
                        args[i] = option
                    }
                }else if(typeof(args[i]) !== 'object'){
                    if(!args[i].hasOwnProperty('object') && args[i].hasOwnProperty('options')){
                        option.object = {key: args[i]}
                        args[i] = option
                    }else{
                        option.object = {key: args[i]}
                        args[i] = option
                    }
                    
                }
            }
        }
        return args
    }
    displayer(...args){
        let option = { showHidden: true, depth: 10, colors:true, showProxy: true, maxArrayLength: 100, maxArrayLength: Infinity, compact: true, sorted: true}

        let dargs = {}
        dargs.object = {data: 'no data'}
        dargs.options = option

        if(args.length === undefined || args.length === 0){
            console.log(util.inspect(dargs.object, dargs.options))
            return
        }
        if(args.length >= 1){
            for (let i = 0; i < args.length; i++) {
               if(typeof(args[i]) === 'object'){
                if (args[i].hasOwnProperty('object') && args[i].hasOwnProperty('options')) {

                    if(JSON.stringify(args[i]['options']) !== '{}'){
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
               }else{
                   console.log(args[i], 'here')
               }
            }
        }
    }
    display(object){
        this.displayer(...this.objectToDisplay(object))
    }
    padding(...args) {

        let options = {
            string: '-',
            number: process.stdout.columns,
            color: 37
        }
        if(args.length === undefined || args.length === 0){
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
                    let checkProp = prop === 'number' && args[i][prop] <= 0 ? 1 :  prop
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

        // time difference in ms
        let timeDiff = end - start;
    
        // strip the ms
        timeDiff /= 1000;
    
        // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
        let seconds = Math.round(timeDiff % 60);
    
        // remove seconds from the date
        timeDiff = Math.floor(timeDiff / 60);
    

        // get minutes
        let minutes = Math.round(timeDiff % 60);
    
        // remove minutes from the date
        timeDiff = Math.floor(timeDiff / 60);
    
        
        // get hours
        let hours = Math.round(timeDiff % 24);
    
        // remove hours from the date
        timeDiff = Math.floor(timeDiff / 24);
    
        // the rest of timeDiff is number of days
        let days = timeDiff;
    
        let time = {
            seconds, minutes, hours, days
        }
        return time
    }

    pluralize(item, quantiy) {
        return quantiy > 1 ? `${item}s`: `${item}`
    }
    spliter(str, spl) {
        if(str === undefined || spl === undefined) return []
        return str.split(spl).filter(string => string !='').map(st => st.trim())
    }
    clean(string){
        return string.split(' ').filter(str => str !='').map(str => str.trim()).join(' ')
    }
    onfromthelasttime(date){
        return this.elapsed(new Date(date), new Date())
    }
    ondays(date){
        return this.onfromthelasttime(date).days
    }
    onminutes(date){
        return this.onfromthelasttime(date).minutes
    }
    onhours(date){
        return this.onfromthelasttime(date).hours
    }
    
    


    
}


module.exports = CLI
let created_at = new Date("Sun Jul 1 2020 5:59:52 AM")
let updated_at = "Sun Jul 19 2020 5:59:52 AM"
const cli = new CLI 

let time = cli.elapsed(created_at)
console.log(time)


   this.once('-l --years=', data => {
       this.once('orders-available', orders => {
           let years = parseInt(data.years)
           let chosenyear = orders.filter(order => this.onyears(order.created_at) <= years)
           if (chosenyear.length === 0) {
               return this.emit('error', {
                   error: `No order was placed within the last ${years} ${this.pluralize('years', years)}`
               })
           }
           console.log()
           console.log(util.inspect(chosenyear, {
               showHidden: true,
               colors: true,
               depth: data.depth
           }))
       })
   })
   if(isValid(mregex,'orders -l --minutes=')){
    this.getOrders(string, '-l --minutes=')
}else{
    return this.emit('error', {
        error: `'${checker('orders -l --minutes=')}' is not a valid argument for 'orders -l --minutes='! Number of days must be a positive whole number from 1 to 59.`
    })
}


//j(string) {
    //         const validate = (regex, input) => regex.test(input)
    //         const checker = code => this.spliter(string, code)[0]
    //         const isValid = (regex, code) => validate(regex, checker(code))
    
    //         let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //         let mregex = /^[0-5]?[0-9]$/gm
    //         let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //         let Mregex = /^(1[0-1]|[1-9])$/gm
    //         let yregex = /^[0-9]?[0-9]$/gm
    //         let Dregex = /^[0-9]?[0-9]$/gm
    //         let jsonregex = /^[0-9]?[0-9]$/gm
            
    //         if (string.trim().startsWith('orders --load -j')) {
                
    //             if (string.trim() === 'orders --load -j') {
    //                 return this.getOrders(string, '--load -j')
    //             }
    
    //             if (string.trim().match(/orders --load -j -d/)) {
    //                 if (string.trim().length > 'orders --load -j -d'.length) {
    
    //                     if (isValid(Dregex, 'orders --load -j -d')) {
    //                         this.getOrders(string, '--load -j -d')
    //                     } else {
    //                         return this.emit('error', {
    //                             error: `'${checker('orders --load -j -d')}' is not a valid argument for 'orders --load -j -d'! Number of days must be a positive whole number.`
    //                         })
    //                     }
    
    //                     // year and json
    
    //                 }
    //             } else if (string.trim().match(/orders --load -j --depth=/)) {
    //                 if (string.trim().length > 'orders --load -j --depth='.length) {
    
    //                     if (isValid(Dregex, 'orders --load -j --depth=')) {
    //                         this.getOrders(string, '--load -j --depth=')
    //                     } else {
    //                         return this.emit('error', {
    //                             error: `'${checker('orders --load -j --depth=')}' is not a valid argument for 'orders --load -j --depth='! Number of days must be a positive whole number.`
    //                         })
    //                     }
    //                 }
    //             } else {
    //                 return this.emit('error', {
    //                     error: `'${checker('orders --load -j')}' is not a valid argument for 'orders --load --json'`
    //                 })
    //             }
    //         } 
    //     }
    //     json (string){
    //         const validate = (regex, input) => regex.test(input)
    //         const checker = code => this.spliter(string, code)[0]
    //         const isValid = (regex, code) => validate(regex, checker(code))
    
    //         let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //         let mregex = /^[0-5]?[0-9]$/gm
    //         let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //         let Mregex = /^(1[0-1]|[1-9])$/gm
    //         let yregex = /^[0-9]?[0-9]$/gm
    //         let Dregex = /^[0-9]?[0-9]$/gm
    //         let jsonregex = /^[0-9]?[0-9]$/gm
    
    //         if (string.trim().startsWith('orders --load --json')) {
    
    //             if (string.trim() === 'orders --load --json') {
    //                 return this.getOrders(string, '--load --json')
    //             }
    //             if (string.trim().match(/orders --load --json -d/)) {
    //                 if (string.trim().length > 'orders --load --json -d'.length) {
    
    //                     if (isValid(Dregex, 'orders --load --json -d')) {
    //                         this.getOrders(string, '--load --json -d')
    //                     } else {
    //                         return this.emit('error', {
    //                             error: `'${checker('orders --load --json -d')}' is not a valid argument for 'orders --load --json -d'! Number of days must be a positive whole number.`
    //                         })
    //                     }
    //                 }
    //             } else if (string.trim().match(/orders --load --json --depth=/)) {
    //                 if (string.trim().length > 'orders --load --json --depth='.length) {
    //                     if (isValid(Dregex, 'orders --load --json --depth=')) {
    //                         this.getOrders(string, '--load --json --depth=')
    //                     } else {
    //                         return this.emit('error', {
    //                             error: `'${checker('orders --load --json --depth=')}' is not a valid argument for 'orders --load --json --depth='! Number of days must be a positive whole number.`
    //                         })
    //                     }
    //                 }
    //             } else {
    //                 return this.emit('error', {
    //                     error: `'${checker('orders --load --json')}' is not a valid argument for 'orders --load --json'`
    //                 })
    //             }
    //         }
    //     }
    
    //     onloader(string){
    //         const validate = (regex, input) => regex.test(input)
    //         const checker = code => this.spliter(string, code)[0]
    //         const isValid = (regex, code) => validate(regex, checker(code))
    
    //         let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //         let mregex = /^[0-5]?[0-9]$/gm
    //         let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //         let Mregex = /^(1[0-1]|[1-9])$/gm
    //         let yregex = /^[0-9]?[0-9]$/gm
    //         let Dregex = /^[0-9]?[0-9]$/gm
    //         let jsonregex = /^[0-9]?[0-9]$/gm
    
    //           // Years
    //           if (string.match(/orders --load -y/)) {
    //             if (string.trim().length > 'orders --load -y'.length) {
    //                 this.onjson(string, '--load -y')
    
    //             }
    //         } else if (string.match(/orders --load --years=/)) {
    //             if (string.trim().length > 'orders --load --years='.length) {
    //                 this.onjson(string, '--load --years=')
    //             }
    //         }
    
    //         // months
    //         if (string.match(/orders --load -M/)) {
    //             if (string.trim().length > 'orders --load -M'.length) {
    //                 this.onjson(string, '--load -M')
    //             }
    //         } else if (string.match(/orders --load --months=/)) {
    //             if (string.trim().length > 'orders --load --months='.length) {
    //                 this.onjson(string, '--load --months=')
    //             }
    //         }
    //         // days
    //         if (string.match(/orders --load -d/)) {
    //             if (string.trim().length > 'orders --load -d'.length) {
    
    //                 this.onjson(string, '--load -d')
    //             }
    //         } else if (string.match(/orders --load --days=/)) {
    //             if (string.trim().length > 'orders --load --days='.length) {
    //                 this.onjson(string, '--load --days=')
    //             }
    
    //         } else if (string.match(/orders --load --hours=/)) {
    //             if (string.trim().length > 'orders --load --hours='.length) {
    //                 this.onjson(string, '--load --hours=')
    //             }
    //         } else if (string.match(/orders --load -h/)) {
    //             if (string.trim().length > 'orders --load -h'.length) {
    //                 this.onjson(string, '--load -h')
    //             }
    
    //         } else if (string.match(/orders --load --minutes=/)) {
    //             if (string.trim().length > 'orders --load --minutes='.length) {
    //                 this.onjson(string, '--load --minutes=')
    //             }
    //         } else if (string.match(/orders --load -m/)) {
    //             if (string.trim().length > 'orders --load -m'.length) {
    //                 this.onjson(string, '--load -m')
    //             }
    //         } else if (string.match(/orders --load/)) {
    //             if (string === 'orders --load') {
    //                 //this.getOrders(string, '--load')
    //             } else if (string === 'orders --load -j') {
    
    //             } else if (string === 'orders --load') {
    
    //             } else if (string === 'orders --load -y') {
    
    //             } else if (string === 'orders --load --json') {
    
    //             } else if (string.trim().length > 'orders --load -j -d'.length || string.trim() === 'orders --load -j -d') {
    
    //             } else if (string.trim().length > 'orders --load --json -d'.length || string.trim() === 'orders --load --json -d') {
    
    //             } else if (string.trim().length > 'orders --load -j --depth='.length || string.trim() === 'orders --load -j --depth=') {
    
    //             } else if (string.trim().length > 'orders --load --json --depth='.length || string.trim() === 'orders --load --json --depth=') {
    
    //             } else {
    //                 this.emit('error', {
    //                     error: `'${string}' is not valid command!`
    //                 })
    //             }
    //         } else {
    //             this.emit('error', {
    //                 error: `'${string}' is not valid command!`
    //             })
    //         }
    //     }
    //     onload(string) {
          
    //         if (string.trim().startsWith('orders --load')) {
    //             if (string.trim().length === 'orders --load'.length) {
    //                 this.getOrders(string, '--load')
    //             }
    //             this.j(string)
    //             this.json(string)
    //             this.onloader(string)
                
    //         }
    
    //     }
    //     onl(string) {
    //         const validate = (regex, input) => regex.test(input)
    //         const checker = code => this.spliter(string, code)[0]
    //         const isValid = (regex, code) => validate(regex, checker(code))
    
    //         let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //         let mregex = /^[0-5]?[0-9]$/gm
    //         let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //         let Mregex = /^(1[0-1]|[1-9])$/gm
    //         let yregex = /^[0-9]?[0-9]$/gm
    //         let Dregex = /^[0-9]?[0-9]$/gm
    //         let jsonregex = /^[0-9]?[0-9]$/gm
    
    //         if (string.trim().startsWith('orders -l')) {
    //             if (string.trim().length === 'orders -l'.length) {
    //                 this.getOrders(string, '-l')
    //             }
    //             if (string.trim().startsWith('orders -l -j')) {
    //                 if (string.trim() === 'orders -l -j') {
    //                     return this.getOrders(string, '-l -j')
    //                 }
    
    //                 if (string.trim().match(/orders -l -j -d/)) {
    //                     if (string.trim().length > 'orders -l -j -d'.length) {
    
    //                         if (isValid(Dregex, 'orders -l -j -d')) {
    //                             this.getOrders(string, '-l -j -d')
    //                         } else {
    //                             return this.emit('error', {
    //                                 error: `'${checker('orders -l -j -d')}' is not a valid argument for 'orders -l -j -d'! Number of days must be a positive whole number.`
    //                             })
    //                         }
    //                     }
    //                 } else if (string.trim().match(/orders -l -j --depth=/)) {
    //                     if (string.trim().length > 'orders -l -j --depth='.length) {
    
    //                         if (isValid(Dregex, 'orders -l -j --depth=')) {
    //                             this.getOrders(string, '-l -j --depth=')
    //                         } else {
    //                             return this.emit('error', {
    //                                 error: `'${checker('orders -l -j --depth=')}' is not a valid argument for 'orders -l -j --depth='! Number of days must be a positive whole number.`
    //                             })
    //                         }
    //                     }
    //                 } else {
    //                     return this.emit('error', {
    //                         error: `'${checker('orders -l -j')}' is not a valid argument for 'orders -l --json'`
    //                     })
    //                 }
    
    
    //             } else if (string.trim().startsWith('orders -l --json')) {
    //                 if (string.trim() === 'orders -l --json') {
    //                     return this.getOrders(string, '-l --json')
    //                 }
    //                 if (string.trim().match(/orders -l --json -d/)) {
    //                     if (string.trim().length > 'orders -l --json -d'.length) {
    
    //                         if (isValid(Dregex, 'orders -l --json -d')) {
    //                             this.getOrders(string, '-l --json -d')
    //                         } else {
    //                             return this.emit('error', {
    //                                 error: `'${checker('orders -l --json -d')}' is not a valid argument for 'orders -l --json -d'! Number of days must be a positive whole number.`
    //                             })
    //                         }
    //                     }
    //                 } else if (string.trim().match(/orders -l --json --depth=/)) {
    //                     if (string.trim().length > 'orders -l --json --depth='.length) {
    //                         if (isValid(Dregex, 'orders -l --json --depth=')) {
    //                             this.getOrders(string, '-l --json --depth=')
    //                         } else {
    //                             return this.emit('error', {
    //                                 error: `'${checker('orders -l --json --depth=')}' is not a valid argument for 'orders -l --json --depth='! Number of days must be a positive whole number.`
    //                             })
    //                         }
    //                     }
    //                 } else {
    //                     return this.emit('error', {
    //                         error: `'${checker('orders -l --json')}' is not a valid argument for 'orders -l --json'`
    //                     })
    //                 }
    //             }
    
    //             //  Years orders -l -y + json
    //             else if (string.match(/orders -l -y/)) {
    //                 if (string.trim().length > 'orders -l -y'.length) {
    //                     this.onjson(string, '-l -y')
    //                 }
    //             } else if (string.match(/orders -l --years=/)) {
    //                 if (string.trim().length > 'orders -l --years='.length) {
    //                     this.onjson(string, '-l --years=')
    //                 }
    //             }
    
    //             // months
    //             if (string.match(/orders -l -M/)) {
    //                 if (string.trim().length > 'orders -l -M'.length) {
    //                     this.onjson(string, '-l -M')
    //                 }
    //             } else if (string.match(/orders -l --months=/)) {
    //                 if (string.trim().length > 'orders -l --months='.length) {
    //                     this.onjson(string, '-l --months=')
    //                 }
    //             }
    //             // days
    //             if (string.match(/orders -l -d/)) {
    //                 if (string.trim().length > 'orders -l -d'.length) {
    //                     this.onjson(string, '-l -d')
    //                 }
    //             } else if (string.match(/orders -l --days=/)) {
    //                 if (string.trim().length > 'orders -l --days='.length) {
    //                     this.onjson(string, '-l --days=')
    //                 }
    //                 // hours
    //             } else if (string.match(/orders -l --hours=/)) {
    //                 if (string.trim().length > 'orders -l --hours='.length) {
    //                     this.onjson(string, '-l --hours=')
    //                 }
    //             } else if (string.match(/orders -l -h/)) {
    
    //                 if (string.trim().length > 'orders -l -h'.length) {
    //                     this.onjson(string, '-l -h')
    //                 }
    //                 // minutes
    //             } else if (string.match(/orders l --minutes=/)) {
    //                 if (string.trim().length > 'orders -l --minutes='.length) {
    //                     this.onjson(string, '-l --minutes=')
    //                 }
    //             } else if (string.match(/orders -l -m/)) {
    //                 if (string.trim().length > 'orders -l -m'.length) {
    //                     this.onjson(string, '-l -m')
    //                 }
    //             } else if (string.match(/orders -l/)) {
    //                 if (string === 'orders -l') {
    //                     // this.getOrders(string, '-l')
    //                 } else if (string === 'orders -l -j') {
    
    //                 }else if (string === 'orders -l -y') {
    
    //                 } else if (string.trim().length > 'orders -l -y'.length || string === 'orders -l -y') {
    
    //                 } else if (string === 'orders -l --json') {
    
    //                 } else if (string.trim().length > 'orders -l -j -d'.length || string.trim() === 'orders -l -j -d') {
    
    //                 } else if (string.trim().length > 'orders -l --json -d'.length || string.trim() === 'orders -l --json -d') {
    
    //                 } else if (string.trim().length > 'orders -l -j --depth='.length || string.trim() === 'orders -l -j --depth=') {
    
    //                 } else if (string.trim().length > 'orders -l --json --depth='.length || string.trim() === 'orders -l --json --depth=') {
    
    //                 } else {
    //                     return this.emit('error', {
    //                         error: `'${string}' is not valid  command! 1`
    //                     })
    //                 }
    //             } else {
    //                 return this.emit('error', {
    //                     error: `'${string}' is not valid command! 2`
    //                 })
    //             }
    //         }
    
    //     }
    
    //     ongetbyid(string){
    //         const validate = (regex, input) => regex.test(input)
    //         const checker = code => this.spliter(string, code)[0]
    //         const isValid = (regex, code) => validate(regex, checker(code))
    
    //         let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //         let mregex = /^[0-5]?[0-9]$/gm
    //         let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //         let Mregex = /^(1[0-1]|[1-9])$/gm
    //         let yregex = /^[0-9]?[0-9]$/gm
    //         let Dregex = /^[0-9]?[0-9]$/gm
    //         let jsonregex = /^[0-9]?[0-9]$/gm
    
    //         if (string.trim().startsWith('orders -g -i')) {
    //             if (string.trim().length > 'orders -g -i'.length) {
    //                 this.getOrderByID(string, '-g -i')
    //             }
    //         } else if (string.trim().startsWith('orders -g --id=')) {
    //             if (string.trim().length > 'orders -g --id='.length) {
    //                 this.getOrderByID(string, '-g --id=')
    //             }
    //         } else if (string.trim().startsWith('orders --get -i')) {
    //             if (string.trim().length > 'orders --get -i'.length) {
    //                 this.getOrderByID(string, '--get -i')
    //             }
    //         } else if (string.trim().startsWith('orders --get --id=')) {
    //             if (string.trim().length > 'orders --get --id='.length) {
    //                 this.getOrderByID(string, '--get --id=')
    //             }
    //         } 
    
    //     }
    //     ongetbyemail(string){
    //         const validate = (regex, input) => regex.test(input)
    //         const checker = code => this.spliter(string, code)[0]
    //         const isValid = (regex, code) => validate(regex, checker(code))
    
    //         let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //         let mregex = /^[0-5]?[0-9]$/gm
    //         let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //         let Mregex = /^(1[0-1]|[1-9])$/gm
    //         let yregex = /^[0-9]?[0-9]$/gm
    //         let Dregex = /^[0-9]?[0-9]$/gm
    //         let jsonregex = /^[0-9]?[0-9]$/gm
    
    //        if (string.trim().startsWith('orders -g -e')) {
    //             if (string.trim().length > 'orders -g -e'.length) {
    //                 this.getOrderByEMAIL(string, '-g -e')
    //             }
    //         } else if (string.trim().startsWith('orders -g --email=')) {
    //             if (string.trim().length > 'orders -g --email='.length) {
    //                 this.getOrderByEMAIL(string, '-g --email=')
    //             }
    //         } else if (string.trim().startsWith('orders --get -e')) {
    //             if (string.trim().length > 'orders --get -e'.length) {
    //                 this.getOrderByEMAIL(string, '--get -e')
    //             }
    //         } else if (string.trim().startsWith('orders --get --email=')) {
    //             if (string.trim().length > 'orders --get --email='.length) {
    //                 this.getOrderByEMAIL(string, '--get --email=')
    //             }
    //         } 
            
    //     }
    // ongetbyphone(string){
    //     const validate = (regex, input) => regex.test(input)
    //     const checker = code => this.spliter(string, code)[0]
    //     const isValid = (regex, code) => validate(regex, checker(code))
    
    //     let hregex = /^[0-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm
    //     let mregex = /^[0-5]?[0-9]$/gm
    //     let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm
    //     let Mregex = /^(1[0-1]|[1-9])$/gm
    //     let yregex = /^[0-9]?[0-9]$/gm
    //     let Dregex = /^[0-9]?[0-9]$/gm
    //     let jsonregex = /^[0-9]?[0-9]$/gm
    
    //     if (string.trim().startsWith('orders -g -p')) {
    //         if (string.trim().length > 'orders -g -p'.length) {
    //             this.getOrderByPHONE(string, '-g -p')
    //         }
    //     } else if (string.trim().startsWith('orders -g --phone=')) {
    //         if (string.trim().length > 'orders -g --phone=') {
    //             this.getOrderByPHONE(string, '-g --phone=')
    //         }
    //     } else if (string.trim().startsWith('orders --get -p')) {
    //         if (string.trim().length > 'orders --get -p'.length) {
    //             this.getOrderByPHONE(string, '--get -p')
    //         }
    //     } else if (string.trim().startsWith('orders --get --phone=')) {
    //         this.getOrderByPHONE(string, '--get --phone=')
    //     } 
        
    // }
    // ongetbyhelp(string){
    //     if (string.trim().startsWith('orders -h')) {
    //         if (string.trim().length === 'orders -h'.length) {
    //             this.help(string)
    //         } else {
    //             this.emit('error', {
    //                 error: `'${string}' is not valid command!`
    //             })
    //         }
    //     } else if (string.trim().startsWith('orders --help')) {
    //         if (string.trim().length === 'orders --help'.length) {
    //             this.help(string)
    //         } else {
    //             //this.emit('error', {error: `'${string}' is not valid command!`})
    //         }
    //     } 
    // }
    // ongetbyerror(string){
    //     if (string.trim().startsWith('orders') && string.trim().length === 'orders'.length) {
    //         //this.emit('orders')
    //     }else if (string.trim().startsWith('orders -l') && string.trim().length === 'orders -l'.length) {
    //         //this.emit('orders')
    //     }else if (string.trim().startsWith('orders -l -y') && string.trim().length === 'orders -l -y'.length) {
    //         //this.emit('orders')
    //     } else if (string.trim().startsWith('orders --load -y') && string.trim().length === 'orders --load -y'.length) {
    //         //this.emit('orders')
    //     }else if (string.trim().startsWith('orders --load') && string.trim().length === 'orders --load'.length) {
    //         //this.emit('orders')
    //     }else {
    //         this.emit('error', {
    //             error: `'${string}' is not valid command! ...`
    //         })
    //     }
    // }
    //     onget(string) {
    //         this.ongetbyid(string)
    //         this.ongetbyemail(string)
    //         this.ongetbyphone(string)
    //         this.ongetbyhelp(string)
    //         this.ongetbyerror(string)
        
    //     }
    //     onglobalordermatch(string) {
    //         this.onload(string)
    //         this.onl(string)
    //         this.onget(string)
    //     }
    //     onmacthgetorderbyid(string) {
    //         if (string.match(/-g -i/)) {
    //             this.getOrderByID(string, '-g -i')
    //         }
    //         if (string.match(/-g --id=/)) {
    //             this.getOrderByID(string, '-g --id=')
    //         }
    //         if (string.match(/--get -i/)) {
    //             this.getOrderByID(string, '--get -i')
    //         }
    //         if (string.match(/--get --id=/)) {
    //             this.getOrderByID(string, '--get --id=')
    //         }
    //     }
    //     onmacthgetorderbyphone(string) {
    //         if (string.match(/-g -p/)) {
    //             this.getOrderByPHONE(string, '-g -p')
    //         }
    //         if (string.match(/-g --phone=/)) {
    //             this.getOrderByPHONE(string, '-g --phone=')
    //         }
    //         if (string.match(/--get -p/)) {
    //             this.getOrderByPHONE(string, '--get -p')
    //         }
    //         if (string.match(/--get --phone=/)) {
    //             this.getOrderByPHONE(string, '--get --phone=')
    //         }
    //     }
    //     onmacthgetorderbypemail(string) {
    //         if (string.match(/-g -e/)) {
    //             this.getOrderByEMAIL(string, '-g -e')
    //         }
    //         if (string.match(/-g --email=/)) {
    //             this.getOrderByEMAIL(string, '-g --email=')
    //         }
    //         if (string.match(/--get -e/)) {
    //             this.getOrderByEMAIL(string, '--get -e')
    //         }
    //         if (string.match(/--get --email=/)) {
    //             this.getOrderByEMAIL(string, '--get --email=')
    //         }
    //     }
    //     commands() {
    //         this.on('orders', async string => {
    //             let cleaned = this.clean(string)
    //             this.orderscommand(cleaned)
    //             this.onglobalordermatch(cleaned)
    //         })
    //     }



    // onmacthgetorderbyid(string) {
    //     if (string.match(/-g -i/)) {
    //         this.getOrderByID(string, '-g -i')
    //     }
    //     if (string.match(/-g --id=/)) {
    //         this.getOrderByID(string, '-g --id=')
    //     }
    //     if (string.match(/--get -i/)) {
    //         this.getOrderByID(string, '--get -i')
    //     }
    //     if (string.match(/--get --id=/)) {
    //         this.getOrderByID(string, '--get --id=')
    //     }
    // }
    // onmacthgetorderbyphone(string) {
    //     if (string.match(/-g -p/)) {
    //         this.getOrderByPHONE(string, '-g -p')
    //     }
    //     if (string.match(/-g --phone=/)) {
    //         this.getOrderByPHONE(string, '-g --phone=')
    //     }
    //     if (string.match(/--get -p/)) {
    //         this.getOrderByPHONE(string, '--get -p')
    //     }
    //     if (string.match(/--get --phone=/)) {
    //         this.getOrderByPHONE(string, '--get --phone=')
    //     }
    // }
    // onmacthgetorderbypemail(string) {
    //     if (string.match(/-g -e/)) {
    //         this.getOrderByEMAIL(string, '-g -e')
    //     }
    //     if (string.match(/-g --email=/)) {
    //         this.getOrderByEMAIL(string, '-g --email=')
    //     }
    //     if (string.match(/--get -e/)) {
    //         this.getOrderByEMAIL(string, '--get -e')
    //     }
    //     if (string.match(/--get --email=/)) {
    //         this.getOrderByEMAIL(string, '--get --email=')
    //     }
    // }



    oldphonejson(string, event){
   

        let validOptions = [
            '-j',
            '--json',
            '-j -d',
            '-j --depth=',
            '--json -d',
            '--json --depth='
        ]
        let timeOptions =[
            '-y', '--years=',
            '-M', '--months=',
            '-d', '--days=',
            '-h', '--hours=',
            '-m', '--minutes=',
            '-s', '--seconds='
        ]

        let original = this.spliter(string, event)
        
        let orig = this.spliter(original[0], ' ')

        let phonenumber = orig[0]

        let isPhoneOk = this.isValid(this.regexes().phoneregex, phonenumber)
        if (isPhoneOk === false) {
            return this.emit('error', {
                error: `'${phonenumber}' is not a valid phone number.`
            })
        }
        let options = [] // 1. length = 5, 
        // 4. [ '--json', '-d', '0', '--months=12' ] , [ '--json', '-depth=0', '-M', '12' ]
        // 5. [ '--json', '-d', '0', '-M', '12' ]
        // 3. [ '--json', '-depth=0', '--months=12' ], [ '--json', '-d', '0' ]
        // 2. [ '--json', '--depth=0' ], [ '-m', '12' ]
        // 1. [ '--json'], [ '--months=12' ]

        //
        


        for(let i = 1; i <orig.length; i++){
            options.push(orig[i])
        }
        //options = options.sort()
        // console.log(options)
        // return 
       
      
        if (!options || options.length === 0) {
            return this.getOrderByPHONE(string, this.spliter(event, 'orders')[0])
        } else {

            let times = []
            let time
            let jsons = []
            let json
            let jsoned
            let code 
            let value
            let checkcode
            let checkvalue
            let isOK
            let timesofjsons = []
            let timeofjson
            let depthlevel
            let checkjson 
            let checkjsonvalue
    

            let equals = options.filter(val => val.includes('='))
            let noequals = options.filter(val => !val.includes('='))
            

            if(equals !== undefined){
                if(equals.length === 0){
                    if(noequals !== undefined){
                        if(noequals.length === 5){
                            let jsons = []
                            let codes = []
                            for(let noeq of noequals){
                                 jsons.push(validOptions.find(val => val === noeq))
                                 codes.push(timeOptions.find(val => val === noeq))
                            }

                            time = {code: codes.filter(code => code !== undefined).join(' '), value}
                            jsoned = {json: jsons.filter(json => json !== undefined).join(' '), depthlevel}
                            console.log({jsoned, time})
                            return
                        }
                        if(noequals.length === 4){
                            
                        }
                        if(noequals.length === 3){
                            
                        }
                        if(noequals.length === 2){
                            
                        }
                        if(noequals.length === 1){
                            
                        }
                        if(noequals.length === 0){
                            
                        }
                        
                    }
                }
                if(equals.length === 1){
                    
                }
                if(equals.length === 2){
                    
                }
            }
            return

            if(options.length === 1){
                json = validOptions.find(valid => valid === options[0])
                if(json === undefined){
                    times = this.spliter(options[0], '=')
                     if(times.length === 2){
                        checkcode = timeOptions.find(val => val === `${times[0]}=`)
                        isOK = this.isValid(this.regexes().jsonregex, times[1])
                        if(checkcode === undefined){
                            return this.emit('error', {error: `'${times[0]}' is not a valid command option`})
                        }else if (checkcode !== undefined){
                            code = `${times[0]}=`
                        }
                        if(isOK === false){
                            return this.emit('error', {error: `'${times[1]}' must a positive number`})
                        }else if (isOK === true){
                            value = times[1]
                        }
                     }else{
                        return this.emit('error', {error: `'${options[0]}' is not a valid command option`})
                     }
                }else{
                    console.log('json', json)
                }
            }else if(options.length === 2){
    
                if(options[1].includes('=')){
                    timeofjson = options[0]
                    // console.log(options)
                    checkjsonvalue = validOptions.find(val => val === options[0])
                    timesofjsons = this.spliter(options[1], '=')
                    checkcode = timeOptions.find(val => val === `${timesofjsons[0]}=`)
                    checkjson = validOptions.find(val => (val === `${timesofjsons[0]}=` || val === `${checkjsonvalue} ${timesofjsons[0]}=`))
                    // console.log(timesofjsons)
                    // return 
                    isOK = this.isValid(this.regexes().jsonregex, timesofjsons[1])
                    if(isOK === false){
                        return this.emit('error', {error: `'${timesofjsons[1]}' must a positive number`})
                    }
                    if(checkcode === undefined && checkjson === undefined){
                        return this.emit('error', {error: `'${timesofjsons[0]}' is not a valid command option`})
                    }

                    if(checkcode !== undefined){
                        code = checkcode
                        value = timesofjsons[1]
                    }
                    checkjsonvalue = validOptions.find(val => val === options[0])
                        if(checkjsonvalue !== undefined && checkjson === undefined){
                            json = checkjsonvalue
                            //depthlevel = timesofjsons[1]
                        }
                    if(checkjson !== undefined && checkjsonvalue !== undefined){
                        json = checkjson
                        depthlevel = timesofjsons[1]
                    }
                }else if(options[0].includes('=')){
                    timeofjson = options[1]
                    // console.log(options)
                    checkjsonvalue = validOptions.find(val => val === options[1])
                    timesofjsons = this.spliter(options[0], '=')
                    checkcode = timeOptions.find(val => val === `${timesofjsons[0]}=`)
                    checkjson = validOptions.find(val => (val === `${timesofjsons[0]}=` || val === `${checkjsonvalue} ${timesofjsons[0]}=`))
                    // console.log(timesofjsons)
                    // return 
                    isOK = this.isValid(this.regexes().jsonregex, timesofjsons[1])
                    if(isOK === false){
                        return this.emit('error', {error: `'${timesofjsons[1]}' must a positive number`})
                    }
                    if(checkcode === undefined && checkjson === undefined){
                        return this.emit('error', {error: `'${timesofjsons[0]}' is not a valid command option`})
                    }

                    if(checkcode !== undefined){
                        code = checkcode
                        value = timesofjsons[1]
                    }
                    checkjsonvalue = validOptions.find(val => val === options[1])
                        if(checkjsonvalue !== undefined && checkjson === undefined){
                            json = checkjsonvalue
                            //depthlevel = timesofjsons[1]
                        }
                    if(checkjson !== undefined && checkjsonvalue !== undefined){
                        json = checkjson
                        depthlevel = timesofjsons[1]
                    }
                }
            }else if(options.length === 3){
     
                //orders --get --phone=6122061307 --json --depth=0 --hours=2
                let equal = options.filter(opt => opt.includes('='))
                let noequal = options.filter(opt => !opt.includes('='))

                if(noequal !== undefined){
                    console.log(noequal)
                    if(equal !== undefined){
                        console.log(equal)
                    }
                }else{
                    console.log(equal)
                }

                return 
                let timeofjson1 = this.spliter(equal[0], '=')
                let timeofjson2 = this.spliter(equal[1], '=')
                let json1 = validOptions.find(val => val === `${timeofjson1[0]}=`)
                let time1 = timeOptions.find(val => val === `${timeofjson1[0]}=`)
                let json2 = validOptions.find(val => val === `${timeofjson2[0]}=`)
                let time2 = timeOptions.find(val => val === `${timeofjson2[0]}=`)

                console.log(options)

                console.log({json1, time1})
                console.log({json2,time2})
                return
                if(json  !== undefined){
                    isOK = this.isValid(this.regexes().jsonregex, timeofjson[1])
                    if(isOK === false){
                        return 'error'
                    }

                    json = `${noequal} ${timeofjson[0]}`
                    depthlevel = timeofjson[1]

                    let timer = this.spliter(equal[1], '=')
                    let isOK2 = this.isValid(this.regexes().jsonregex, timer[1])
                    let checkt = timeOptions.find(val => val === `${timer[0]}=`)
                    if(isOK2 === false){
                        return 'error'
                    }
                    if(checkt === undefined){
                        return 'error'
                    }
                    code = checkt
                    value = timer[1]
                }
                else if(json === undefined){
                    console.log(json, time)

                    isOK = this.isValid(this.regexes().jsonregex, timeofjson[1])
                    if(isOK === false){
                        return 'error'
                    }

                    code = timeofjson[0]
                    value = timeofjson[1]

                    let jsonn = this.spliter(equal[1], '=')
                    let isOK2 = this.isValid(this.regexes().jsonregex, jsonn[1])
                    let checkt = validOptions.find(val => val === `${jsonn[0]}=`)

                    if(isOK2 === false){
                        console.log('ok1')
                    }
                    if(checkt === undefined){
                        console.log('chekci')
                    }
                    json = `${noequal} ${checkt}`
                    depthlevel = jsonn[1]
                }

                
            }else if(options.length === 4){
                
            }else if(options.length === 5){
                
            }
            console.log(options)
             console.log({jsoned:{json, depthlevel}, time: {code, value}})
            return
             let option = options.join(' ')
            
            
             if (option && option !== undefined) {

                let jsondepth = validOptions.find(valid => option.startsWith(valid) && valid === '--json --depth=' && option.length === '--json --depth='.length)
                let jsond = validOptions.find(valid => option.startsWith(valid) && valid === '--json -d' && option.length === '--json -d')
                let jdepth = validOptions.find(valid => option.startsWith(valid) && valid === '-j --depth=' && option.length === '-j --depth=')
                let jd = validOptions.find(valid => option.startsWith(valid) && valid === '-j -d' && option.length ==='-j -d')
                let j = validOptions.find(valid => option.startsWith(valid) && valid === '-j' && option.length === '-j'.length)
                let json = validOptions.find(valid => option.startsWith(valid) && valid === '--json' && option.length === '--json'.length)

                let validityArray = [jsondepth, jsond, jdepth, jd, j, json].filter(val => val !== undefined)
            

                let validated = validOptions.find(valid => valid === validityArray[0])

               

                let timer  = this.spliter(option, validated)[0]
                let timerarray = this.spliter(timer, ' ')
                let code, value
                let argument = timerarray[0]
               
                    
                let validargument = parseInt(argument, 10)
   
                let isValidargumentOk = this.isValid(this.regexes().jsonregex, argument)

               if (timerarray && timerarray.length === 3) {
                    let tma = timeOptions.find(tm => tm === timerarray[1])
                    if(tma && tma !== undefined){
                        code = timerarray[1]
                        value = timerarray[2]
                    }else{
                        return this.emit('error', {error: `'${timerarray[1]}' is an invalid option.`})
                    }
        
               } else if (timerarray && timerarray.length == 2) {
                   for (let opt of timeOptions) {
                 
                       //console.log(RegExp(opt))
                       let target = this.spliter(timerarray[1], opt)[0]
                       let targetted = this.spliter(target, '=')[0]
                        
                       let checker = timeOptions.find(tm => tm === `${targetted}=`)
                       if(checker && checker !== undefined){
                           code = checker
                           value = this.spliter(target, '=')[1]
                           break;
                       }   
                   }
               
               }
              
               let checkcode = timeOptions.find(tm => tm === code)
       
               
               if( timerarray.length > 1 && (value === undefined || code === undefined )){
                return this.emit('error', {error: `'${timerarray.join(' ')}' is an invalid option!`})
               }
               if(code && (code.startsWith('-') && !code.includes('--') && code.length > 2 && checkcode === undefined)){
                   return this.emit('error', {error: `'${timerarray[1]}' is an invalid option.`})
               }
               if(code && checkcode === undefined && timerarray.length !==0){
                 return this.emit('error', {error: `'${timerarray[0]}' is not a command option`})
               }
              
        if(code === '--years=' || code === '-y' || code ==='--years=' || code ==='-y'){
            let ishOK = this.isValid(this.regexes().dregex, value)
            if(ishOK === false){
                return this.emit('error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of years must be a positive whole number.`
                })
            }
        }

        if(code === '--months=' || code === '-M' || code ==='--months=' || code ==='-M'){
            let ishOK = this.isValid(this.regexes().Mregex, value)
            if(ishOK === false){
                return this.emit('error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of month must be from 1 to 11.`
                })
            }
        }

        if(code === '--days=' || code === '-d' || code ==='--days=' || code ==='-d'){
            let ishOK = this.isValid(this.regexes().dregex, value)
            if(ishOK === false){
                return this.emit('error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of days must be from 1 to 30.`
                })
            }
        }

        if(code === '--hours=' || code === '-h' || code ==='--hours=' || code ==='-h'){
            let ishOK = this.isValid(this.regexes().hregex, value)
            if(ishOK === false){
                return this.emit('error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of hours must be from 1 to 23.`
                })
            }
        }
        if(code === '--minutes=' || code === '-m' || code ==='--minutes=' || code ==='-m'){
            let ishOK = this.isValid(this.regexes().mregex, value)
            if(ishOK === false || value === 0){
                return this.emit('error', {
                    error: `'${value}' is not a valid argument for '${code}'! Number of minutes must be from 1 to 59.`
                })
            }
        }
        console.log(validityArray)
        console.log(options)
        console.log(option)
        console.log({code, value})
        return 
    
                if (validityArray.length === 1 && validityArray[0] !== undefined) {
                   
                    if (validated === '-j' || validated === '--json') {
               
                        let datadum = {
                            phone: phonenumber,
                            depth: Infinity,
                            time: {code, value}
                        }
                       
                        this.loadByPhone(validated)
                        this.emit(validated, datadum)
                        //console.log({code,value})
                        
                    } else {
                        return this.emit('error', {
                            error: `'${validated}' is not valid`
                        })
                    }
                } else if ((validityArray.length === 2 && validityArray[0] !== undefined && validityArray[1] !== undefined)|| validityArray.length === 0) {

                    if (validated === '-j -d' || validated === '-j --depth=' || validated === '--json -d' || validated === '--json --depth=') {
                        console.log()
                        if (isValidargumentOk === false) {

                            let errormessage
                            if (argument === undefined) {
                                errormessage = `'${validityArray[0]}' requires an argument. It cannot be blink`
                            } else {
                                errormessage = `'${argument}' is not a valid argument for '${validityArray[0]}'! Arguement must be a positive whole number.`
                            }
                            return this.emit('error', {
                                error: errormessage
                            })
                        }
                        if (isValidargumentOk === true) {
                            let datum = {
                                phone: phonenumber,
                                depth: validargument,
                                time: {code, value}
                            }
                            
                            this.loadByPhone(validated)
                            this.emit(validated, datum)
                            //console.log({code,value})
                         
                        }
                    } else {
                        return this.emit('error', {
                            error: `'${validated}' is not valid`
                        })
                    }
                } else {
                    console.log(validityArray)
                    let err = validityArray.join(' ').trim().length == 0 ? option : validityArray.join(' ')
                    return this.emit('error', {
                        error: `'${err}' is not valid command ...`
                    })
                }

            } else {
                return this.emit('error', {
                    error: `'${option[0]}' invalid number of arguments!`
                })
            }
        }
      
    }


     // async singleGetBySingleID(string, args) {
    //     const option = this.spliter(string, 'orders')
    //     if(!option || option.length === 0) return 
    //     let idandoption = this.spliter(option[0], args)
    //     let details = this.spliter(idandoption[0], ' ')
    //     let orderId = details[0]

    //     let options = []
    //     for (let i = 1; i < details.length; i++) {
    //         options.push(details[i])
    //     }
    
    //     if (details[0] === undefined || !details[0].trim() || details[0].trim() === undefined) {
    //         return this.emit('orders:error', {
    //             error: 'Order id is required'
    //         })
    //     }
    //     if (details[0].trim().length !== 30 || typeof (details[0].trim()) !== 'string') {
    //         return this.emit('orders:error', {
    //             error: `${details} is not a valid order id`
    //         })
    //     }

    //     if (details[0].trim() !== undefined && details[0].trim().length === 30 && typeof (details[0].trim()) === 'string') {
    //         let path = `${this.base()}/orders/${orderId}.json`
    //         let readable = createReadStream(path, 'utf-8')
    //         let order = {}

    //         readable.on('error', error => {
    //             return this.emit('orders:error', {error: `Order with id ${orderId} does not exists.`})
    //         })
    //          readable.on('data', chunk => {
    //              order = JSON.parse(chunk)
    //          })
    //          readable.on('end', async () => {

    //             if (options.sort().length > 4) {
    //                 return this.emit('orders:error', {
    //                     error: 'invalid numbers of options or arguments'
    //                 })
    //             }else if(options.sort().length === 0){
    //                 // works
    //                 console.log(util.inspect(order, {showHidden:true, depth:Infinity, colors:true}))
    //                 return 
    //             }else if(options.sort().length > 0 && options.sort().length <= 4){
    //                 for (let opt of options.sort()) {
    //                     if (!this.orderOptions().includes(opt)) {
    //                         return this.emit('orders:error', {
    //                             error: `"${opt}" is not an option`
    //                         })
    //                     } else if(this.orderOptions().includes(opt)){
    //                         let code = this.spliter(options.join('-'), '-').sort().join('')
    //                         this.processOptions(code)
                            
                            
                            
    //                         // return this.commandHandler(orderId, code)

    //                         //Shipping 
    //                         //console.log(data.order)
    //                         let path = order.guest ? `guestshippings` : `shippings`

    //                         let data = {}
    //                         let billing = {}
    //                         let customer = {}
    //                         data.guest = order.guest

    //                         try {
    //                             let shippings = await this.findAll(path) //.then(shippings => {

    //                             for (let shipping of shippings) {
    //                                 let shippinpath = `${this.base()}/${path}/${shipping}`
    //                                 let readable = createReadStream(shippinpath, 'utf-8')

    //                                 readable.on('error', error => {
    //                                     return this.emit('orders:error', {
    //                                         error: `Shipping with id ${shipping} does not exist`
    //                                     })
    //                                 })
    //                                 readable.on('data', chunk => {
    //                                     let ship = JSON.parse(chunk)
    //                                     if (ship.cart && ship.cart.length > 0) {

    //                                         let ordershipping = ship.cart.find(orderId => orderId === order.id)
    //                                         if (ordershipping && ordershipping !== undefined) {

    //                                             billing['\x1b[35mBILLING\x1b[0m'] = []
    //                                             billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mADDRESS\x1b[0m`] = ship.billing.billing_address
    //                                             billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mCITY\x1b[0m`] = ship.billing.billing_city
    //                                             billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mSTATE\x1b[0m`] = ship.billing.billing_state
    //                                             billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mZIP\x1b[0m`]= ship.billing.billing_zip
    //                                             billing['\x1b[35mBILLING\x1b[0m'][`\x1b[37mPHONE\x1b[0m`] = ship.billing.billing_phone
                                               

    //                                             // billing.address = ship.billing.billing_address
    //                                             // billing.city = ship.billing.billing_city
    //                                             // billing.state = ship.billing.billing_state
    //                                             // billing.zip = ship.billing.billing_zip
    //                                             // billing.phone = ship.billing.billing_phone

                        
                                                
    //                                             ///customer.phone = ship.phone

    //                                             data.billing = billing
    //                                             data.customer = customer


    //                                         }
    //                                     }
    //                                 })
    //                                 readable.on('end', () => {
    //                                     // works
    //                                     this.emit('shipping-found', data)
                                        
    //                                 })
    //                             }

    //                         } catch (error) {
    //                             return this.emit('orders:error', {
    //                                 error: error
    //                             })
    //                         }

                          
    //                         // works
    //                         //this.once('shipping-found', data => console.log('shipping data', data))
    //                         //this.onShipping()
    //                         // Rest 
    //                         let orderproducts = []
    //                         let ordernumber = []
    //                         let ordercard = {}

    //                         if (order.products && order.products.length > 0) {
    //                             for (let product of order.products) {
    //                                 let prod = {}
    //                                 prod['pizza type'] = product.name.toUpperCase()
    //                                 prod.size = product.size
    //                                 prod['unit price'] = product.pricing.price
    //                                 prod.quantity = product.pricing.quantity
    //                                 prod['total price'] = product.pricing.total
    //                                 orderproducts.push(prod)
    //                             }
    //                         }
    //                         let prod ={}
    //                         for( let product of orderproducts){
                                
    //                             let name = product['pizza type']
    //                             let total  = product['total price']
    //                             let price = product['unit price']
    //                             prod[`\x1b[35m${name}\x1b[0m`] = []
    //                             prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mPIZZA TYPE\x1b[0m`] = name
    //                             prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mSIZE\x1b[0m`] = product.size
    //                             prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mUNIT PRICE\x1b[0m`] = price
    //                             prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mQUANTITY\x1b[0m`] = product.quantity
    //                             prod[`\x1b[35m${name}\x1b[0m`][`\x1b[37mTOTAL PRICE\x1b[0m`] = total
    //                         }
    //                         orderproducts = prod
                            
    //                         // Order number 

    //                         let time = this.elapsed(new Date(order.created_at), new Date())

    //                         let days = time.days
    //                         let hours = time.hours
    //                         let minutes = time.minutes
    //                         let seconds = time.seconds

    //                         // let message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} and ${seconds} ${this.pluralize('second', seconds)} ago.`
    //                         let message = `${days} ${this.pluralize('day', days)} ${hours} ${this.pluralize('hour', hours)} ${minutes} ${this.pluralize('minute', minutes)} ago.`

    //                         ordernumber['\x1b[35mORDER\x1b[0m'] = []
    //                         ordernumber['\x1b[35mORDER\x1b[0m']['\x1b[37mORDER#\x1b[0m'] = order.number
    //                         ordernumber['\x1b[35mORDER\x1b[0m']['\x1b[37mDATE\x1b[0m'] = order.created_at
    //                         ordernumber['\x1b[35mORDER\x1b[0m']['\x1b[37mAS OF NOW\x1b[0m'] = message

    //                         // Order card
    //                         delete order.card.tosAgrement
    //                         let card = {}
    //                         card['\x1b[35mCARD\x1b[0m'] = []
    //                         card['\x1b[35mCARD\x1b[0m']['\x1b[37mNUMBER\x1b[0m'] = order.card.number
    //                         card['\x1b[35mCARD\x1b[0m']['\x1b[37mEXPIRATION\x1b[0m'] =order.card.type
    //                         card['\x1b[35mCARD\x1b[0m']['\x1b[37mEXPIRATION\x1b[0m'] = order.card.expiration
    //                         card['\x1b[35mCARD\x1b[0m']['\x1b[37mCODE\x1b[0m'] = order.card.code
    //                         card['\x1b[35mCARD\x1b[0m']['\x1b[37mNAME\x1b[0m'] = order.card.name 
    //                         // card['\x1b[35mCARD\x1b[0m']['\x1b[37mTYPE\x1b[0m'] = order.card.type
    //                         card['\x1b[35mCARD\x1b[0m']['\x1b[37mAGREE TO PAY?\x1b[0m'] ='Yes' 
                            
                           
    //                         order.card['agreed to pay?'] = 'yes'
    //                         ordercard['0'] = order.card
                            
    //                         this.emit('order-products', orderproducts)
    //                         this.emit('order-card', card)
    //                         this.emit('order-number', ordernumber)
                            
    //                         return 
    //                     }
    //                     else {
    //                        console.log('An unknown error occured')
    //                     }
    //                 }
    //             }else{
    //                 console.log('unkown options length occurred')
    //             }
               
    //          })
    
        
            
          
    //     }

    // }

    //    ontime(event) {
//        let eventList = [
//            '-l -y',
//            '-l --years=',
//            '--load -y',
//            '--load --years=',

//            '-l -M',
//            '-l --months=',
//            '--load -M',
//            '--load --months=',

//            '-l -d',
//            '-l --days=',
//            '--load -d',
//            '--load --days=',
//            '-l -h',
//            '-l --hours=',
//            '--load -h',
//            '--load --hours=',

//            '-l -m',
//            '-l --minutes=',
//            '--load -m',
//            '--load --minutes='
//        ]


//        let timestring
//        let getTime

//        let gt = eventList.find(e => e === event)

//        if (gt !== undefined) {
//            if (gt === '-l -y' || gt === '-l --years=' || gt === '--load -y' || gt === '--load --years=') {
//                timestring = 'year'
//                getTime = (date, data) => (this.onyears(date) <= data)
//            }
//            if (gt === '-l -M' || gt === '-l --months=' || gt === '--load -M' || gt === '--load --months=') {
//                timestring = 'month'
//                getTime = (date, data) => (this.onmonths(date) <= data)
//            }
//            if (gt === '-l -d' || gt === '-l --days=' || gt === '--load -d' || gt === '--load --days=') {
//                timestring = 'day'
//                getTime = (date, data) => (this.ondays(date) <= data)
//            }
//            if (gt === '-l -h' || gt === '-l --hours=' || gt === '--load -h' || gt === '--load --hours=') {
//             timestring = 'hour'
//             getTime = (date, data) => (this.onhours(date) <= data)
//         }
//            if (gt === '-l -m' || gt === '-l --minutes=' || gt === '--load -m' || gt === '--load --minutes=') {
//                timestring = 'minute'
//                getTime = (date, data) => (this.onminutes(date) <= data)
//            }

//            return {
//             timestring,
//             getTime
//         }
//        }else{
//            return this.emit('orders:error', {error: `${event} IS AN INVALID OPTION`})
//        }

//    }




//             // users -g --phone

            //else if (command[1].match(/ -g --phone/)) {

            //    let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

            //     let check = string.split('=')

            //     if(check[0] !== 'users -g --phone'){
            //         return this.emit('error', {
            //             error: `'${check[0]}' is not command.`
            //         })
            //     }
            //     if(!phoneRegex.test(parseInt(check[1]))){
            //         return this.emit('error', {
            //             error: `'${check[1]}' is not a valid phone number.`
            //         })
            //     }
            //     if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
            //         return this.emit('error', {
            //             error: `'${check[1]}' is not a valid phone number.`
            //         })
            //     }
            //     if (string.length !== 'users -g --phone=6122071306'.length) return this.emit('error', {
            //         error: `'${string}' is not command.`
            //     })

            //     let phone = check[1].trim()
            //     let path = `${this.base()}/users/${phone}.json`
            //     let readable = createReadStream(path, 'utf-8')

            //     readable.on('data', chunk => {
            //         let user = JSON.parse(chunk)
            //         delete user.aToken
            //         delete user.password

            //         let data = [{firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone, registered: user.created_at}]
            //         console.clear()
            //         console.table(data)
            //         // this.emit('-g --phone', data)
            //     })
            //     readable.on('end', () => {
            //         // this.on('-get --phone' , data => {
            //         //     console.clear()
            //         //     console.table(data)
            //         // })
            //     })
            //     readable.on('error', error => {
            //         this.emit('error', {
            //             error: `could not find a user with this phone number.`
            //         })
            //     })
           // }



            // else if (command[1].match(/ -g --email/)) {

            //     let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
            //      let check = string.split('=')
 
            //      if(check[0] !== 'users -g --email'){
            //          return this.emit('error', {
            //              error: `'${check[0]}' is not command.`
            //          })
            //      }
            //      if(!emailRegex.test(check[1].trim())){
            //          return this.emit('error', {
            //              error: `'${check[1]}' is not a valid email address.`
            //          })
            //      }
             
            //      try{
            //         const users = await this.findAll('users')
            //         if(users && users.length > 0){
            //           users.forEach(user => {
            //              let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
            //              readable.on('error' , error => {
            //                  this.emit('error', {error: `Could not find user with phone number ${user}`})
            //              })
            //              console.log()
            //             readable.on('data', chunked => {

            //                let chunk = JSON.parse(chunked)
            //                if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
            //                 let user = {}
            //                 user.name = `${chunk.firstname} ${chunk.lastname}`
            //                 user.phone = chunk.phone
            //                 user.email = chunk.email
            //                 user.registered = chunk.created_at
            //                 console.log(user)
            //                // return 
            //                }
                           
            //             })
            //             readable.on('end', () => {
            //              console.log()
            //               this.prompt()
            //             })
            //           })
            //         }
            //     }catch(error){
            //      this.emit('error', {error: 'User not found'})
            //     }
            //  }
            //  else if (command[1].match(/ -d --email/)) {

            //      //users -d --email=ericson.weah@devoutprogrammer.com

            //     let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
            //      let check = string.split('=')
 
            //      if(check[0] !== 'users -d --email'){
            //          return this.emit('error', {
            //              error: `'${check[0]}' is not command.`
            //          })
            //      }
            //      if(!emailRegex.test(check[1].trim())){
            //          return this.emit('error', {
            //              error: `'${check[1]}' is not a valid email address.`
            //          })
            //      }
             
            //      try{
            //         const users = await this.findAll('users')
            //         if(users && users.length > 0){
            //           users.forEach(user => {
            //              let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
            //              readable.on('error' , error => {
            //                 this.emit('error', {error: `Could not find user with phone number ${user}`})
            //              })


            //              console.log()
            //             readable.on('data', chunked => {

            //                let chunk = JSON.parse(chunked)
            //                if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
            //                 // let path = `${this.base()}/users/${chunk.phone}.json`
            //                 let path = `${this.base()}/users/${user}`
            //                 promises.unlink(path)
            //                 .then(() => {
            //                  this.emit('success', {
            //                      message: `User deleted.`
            //                  })
            //                 })
            //                 .catch(error => {
            //                  this.emit('error', {
            //                      error: `User with this phone number does not even exist.`
            //                  })
            //                 })
            //                return 
            //                }
                           
            //             })
            //             readable.on('end', () => {
            //              console.log()
            //               this.prompt()
            //             })
            //           })
            //         }
            //     }catch(error){
            //      this.emit('error', {error: 'User not found'})
            //     }
            //  }

            //  else if (command[1].match(/ --get --email/)) {
            //     //users --get --email=ericson.weah@devoutprogrammer.com

            //     let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
            //      let check = string.split('=')
 
            //      if(check[0] !== 'users --get --email'){
            //          return this.emit('error', {
            //              error: `'${check[0]}' is not command.`
            //          })
            //      }
            //      if(!emailRegex.test(check[1].trim())){
            //          return this.emit('error', {
            //              error: `'${check[1]}' is not a valid email address.`
            //          })
            //      }
             
            //      try{
            //         const users = await this.findAll('users')
            //         if(users && users.length > 0){
            //           users.forEach(user => {
            //              let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
            //              readable.on('error' , error => {
            //                  this.emit('error', {error: `Could not find user with phone number ${user}`})
            //              })


            //              console.log()
            //             readable.on('data', chunked => {

            //                let chunk = JSON.parse(chunked)
            //                if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
            //                 let user = {}
            //                 user.name = `${chunk.firstname} ${chunk.lastname}`
            //                 user.phone = chunk.phone
            //                 user.email = chunk.email
            //                 user.registered = chunk.created_at
            //                 console.log(user)
            //                // return 
            //                }
                           
            //             })
            //             readable.on('end', () => {
            //              console.log()
            //               this.prompt()
            //             })
            //           })
            //         }
            //     }catch(error){
            //      this.emit('error', {error: 'User not found'})
            //     }
            //  }

            //  else if (command[1].match(/ --get -e/)) {
            //     //users --get -e ericson.weah@devoutprogrammer.com

            //     let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
            //      let check = string.split('-e')
 
            //      if(check[0].trim() !== 'users --get'){
            //          return this.emit('error', {
            //              error: `'${check[0].trim()}' is not command.`
            //          })
            //      }
            //      if(!emailRegex.test(check[1].trim())){
            //          return this.emit('error', {
            //              error: `'${check[1]}' is not a valid email address.`
            //          })
            //      }
             
            //      try{
            //         const users = await this.findAll('users')
            //         if(users && users.length > 0){
            //           users.forEach(user => {
            //              let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
            //              readable.on('error' , error => {
            //                  this.emit('error', {error: `Could not find user with phone number ${user}`})
            //              })


            //              console.log()
            //             readable.on('data', chunked => {

            //                let chunk = JSON.parse(chunked)
            //                if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
            //                 let user = {}
            //                 user.name = `${chunk.firstname} ${chunk.lastname}`
            //                 user.phone = chunk.phone
            //                 user.email = chunk.email
            //                 user.registered = chunk.created_at
            //                 console.log(user)
            //                // return 
            //                }
                           
            //             })
            //             readable.on('end', () => {
            //              console.log()
            //               this.prompt()
            //             })
            //           })
            //         }
            //     }catch(error){
            //      this.emit('error', {error: 'User not found'})
            //     }
            //  }

            //  else if (command[1].match(/ -g -e/)) {
            //     //users -g -e ericson.weah@devoutprogrammer.com

            //     let emailRegex = /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm
 
            //      let check = string.split('-e')
 
            //      if(check[0].trim() !== 'users -g'){
            //          return this.emit('error', {
            //              error: `'${check[0].trim()}' is not command.`
            //          })
            //      }
            //      if(!emailRegex.test(check[1].trim())){
            //          return this.emit('error', {
            //              error: `'${check[1]}' is not a valid email address.`
            //          })
            //      }
             
            //      try{
            //         const users = await this.findAll('users')
            //         if(users && users.length > 0){
            //           users.forEach(user => {
            //              let readable = createReadStream(`${this.base()}/users/${user}`, 'utf-8')
            //              readable.on('error' , error => {
            //                  this.emit('error', {error: `Could not find user with phone number ${user}`})
            //              })


            //              console.log()
            //             readable.on('data', chunked => {

            //                let chunk = JSON.parse(chunked)
            //                if(chunk.email.trim().toLocaleLowerCase() === check[1].trim().toLocaleLowerCase()){
            //                 let user = {}
            //                 user.name = `${chunk.firstname} ${chunk.lastname}`
            //                 user.phone = chunk.phone
            //                 user.email = chunk.email
            //                 user.registered = chunk.created_at
            //                 console.log(user)
            //                // return 
            //                }
                           
            //             })
            //             readable.on('end', () => {
            //              console.log()
            //               this.prompt()
            //             })
            //           })
            //         }
            //     }catch(error){
            //      this.emit('error', {error: 'User not found'})
            //     }
            //  }



            // users --get --phone
        //    else if (command[1].match(/ --get --phone/)) {

        //     let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
        //     let check = string.split('=')
        //     if(check[0] !== 'users --get --phone'){
        //         return this.emit('error', {
        //             error: `'${check[0]}' is not command.`
        //         })
        //     }
        //     if(!phoneRegex.test(parseInt(check[1]))){
        //         return this.emit('error', {
        //             error: `'${check[1]}' is not a valid phone number.`
        //         })
        //     }
        //     if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
        //         return this.emit('error', {
        //             error: `'${check[1]}' is not a valid phone number.`
        //         })
        //     }
        //         if (string.length !== 'users --get --phone=6122071306'.length) return this.emit('error', {
        //             error: `'${string}' is not command, users --get --phone`
        //         })
        //         let phone = check[1].trim()
        //         let path = `${this.base()}/users/${phone}.json`
        //         let readable = createReadStream(path, 'utf-8')

        //         readable.on('data', chunk => {
        //             let user = JSON.parse(chunk)
        //             delete user.aToken
        //             delete user.password
        //             console.log(user)
        //         })
        //         readable.on('end', () => {})
        //         readable.on('error', error => {
        //             this.emit('error', {
        //                 error: `could not find a user with this phone number.`
        //             })
        //         })
        //     }
            // users -g -p
        //     else if (command[1].match(/ -g -p/)) {

        //     let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
        //     let check = string.split('-p')
        //     if(check[0].trim() !== 'users -g'){
        //         return this.emit('error', {
        //             error: `'${check[0]} -p' is not command.`
        //         })
        //     }
        //     if(!phoneRegex.test(parseInt(check[1].trim()))){
        //         return this.emit('error', {
        //             error: `'${check[1].trim()}' is not a valid phone number.`
        //         })
        //     }
        //     if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
        //         return this.emit('error', {
        //             error: `'${check[1]}' is not a valid phone number.`
        //         })
        //     }
        //         if (string.length !== 'users -g -p 6122071306'.length) return this.emit('error', {
        //             error: `'${string}' is not command, users -g -p`
        //         })
        //         let phone = check[1].trim()
        //         let path = `${this.base()}/users/${phone}.json`
        //         let readable = createReadStream(path, 'utf-8')

        //         readable.on('data', chunk => {
        //             let user = JSON.parse(chunk)
        //             delete user.aToken
        //             delete user.password
        //             console.log(user)
        //         })
        //         readable.on('end', () => {})
        //         readable.on('error', error => {
        //             this.emit('error', {
        //                 error: `could not find a user with this phone number.`
        //             })
        //         })
        //     }

        //     // users --get -p
        //     if (command[1].match(/--get -p/)) {

        //         let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

        //         let check = string.split('-p')
        //         if(check[0].trim() !== 'users --get'){
        //             return this.emit('error', {
        //                 error: `'${check[0]} -p' is not command.`
        //             })
        //         }
        //         if(!phoneRegex.test(parseInt(check[1].trim()))){
        //             return this.emit('error', {
        //                 error: `'${check[1].trim()}' is not a valid phone number.`
        //             })
        //         }
        //         if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
        //             return this.emit('error', {
        //                 error: `'${check[1]}' is not a valid phone number.`
        //             })
        //         }
        //         if (string.length !== 'users --get -p 6122071306'.length) return this.emit('error', {
        //             error: `'${string}' is not command, users --get -p`
        //         })
        //         let phone = check[1].trim()
        //         let path = `${this.base()}/users/${phone}.json`
        //         let readable = createReadStream(path, 'utf-8')

        //         readable.on('data', chunk => {
        //             let user = JSON.parse(chunk)
        //             delete user.aToken
        //             delete user.password
        //             console.log(user)
        //         })
        //         readable.on('end', () => {})
        //         readable.on('error', error => {
        //             this.emit('error', {
        //                 error: `could not find a user with this phone number.`
        //             })
        //         })
        //     }

        //     // users -d --phone
        //     else if (command[1].match(/ -d --phone/)) {

        //         let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
        //         let check = string.split('=')
        //         if(check[0] !== 'users -d --phone'){
        //             return this.emit('error', {
        //                 error: `'${check[0]}' is not command.`
        //             })
        //         }
        //         if(!phoneRegex.test(parseInt(check[1]))){
        //             return this.emit('error', {
        //                 error: `'${check[1]}' is not a valid phone number.`
        //             })
        //         }
        //         if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
        //             return this.emit('error', {
        //                 error: `'${check[1]}' is not a valid phone number.`
        //             })
        //         }
        //         if (string.length !== 'users -d --phone=6122071306'.length) return this.emit('error', {
        //             error: `'${string}' is not command, users -d --phone`
        //         })
        //         let phone = check[1].trim()
 
        //          let path = `${this.base()}/users/${phone}.json`
        //         promises.unlink(path)
        //         .then(() => {
        //          this.emit('success', {
        //              message: `User deleted.`
        //          })
        //         })
        //         .catch(error => {
        //          this.emit('error', {
        //              error: `User with this phone number does not even exist.`
        //          })
        //         })
        //     }

        //  // users --delete --phone
        //     else if (command[1].match(/ --delete --phone/)) {

        //         let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm
        //         let check = string.split('=')
        //         if(check[0] !== 'users --delete --phone'){
        //             return this.emit('error', {
        //                 error: `'${check[0]}' is not command.`
        //             })
        //         }
        //         if(!phoneRegex.test(parseInt(check[1]))){
        //             return this.emit('error', {
        //                 error: `'${check[1]}' is not a valid phone number.`
        //             })
        //         }
        //         if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
        //             return this.emit('error', {
        //                 error: `'${check[1]}' is not a valid phone number.`
        //             })
        //         }
        //         if (string.length !== 'users --delete --phone=6122071306'.length) return this.emit('error', {
        //             error: `'${string}' is not command, users --delete --phone`
        //         })
        //         let phone = check[1].trim()
 
        //          let path = `${this.base()}/users/${phone}.json`
        //         promises.unlink(path)
        //         .then(() => {
        //          this.emit('success', {
        //              message: `User deleted.`
        //          })
        //         })
        //         .catch(error => {
        //          this.emit('error', {
        //              error: `User with this phone number does not even exist.`
        //          })
        //         })
        //     }

        //     // users -d -p
        //     else if (command[1].match(/ -d -p/)) {

        //         let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

        //         let check = string.split('-p')
        //         if(check[0].trim() !== 'users -d'){
        //             return this.emit('error', {
        //                 error: `'${check[0]} -p' is not command.`
        //             })
        //         }
        //         if(!phoneRegex.test(parseInt(check[1].trim()))){
        //             return this.emit('error', {
        //                 error: `'${check[1].trim()}' is not a valid phone number.`
        //             })
        //         }
        //         if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
        //             return this.emit('error', {
        //                 error: `'${check[1]}' is not a valid phone number.`
        //             })
        //         }
        //         if (string.length !== 'users -d -p 6122071306'.length) return this.emit('error', {
        //             error: `'${string}' is not command, users -d -p`
        //         })
        //         let phone = check[1].trim()
 
        //         let path = `${this.base()}/users/${phone}.json`
        //         promises.unlink(path)
        //         .then(() => {
        //          this.emit('success', {
        //              message: `User deleted.`
        //          })
        //         })
        //         .catch(error => {
        //          this.emit('error', {
        //              error: `User with this phone number does not even exist.`
        //          })
        //         })
        //     }

        //     // users --delete -p
        //     else if (command[1].match(/ --delete -p/)) {

        //         let phoneRegex =  /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm

        //         let check = string.split('-p')
        //         if(check[0].trim() !== 'users --delete'){
        //             return this.emit('error', {
        //                 error: `'${check[0]} -p' is not command.`
        //             })
        //         }
        //         if(!phoneRegex.test(parseInt(check[1].trim()))){
        //             return this.emit('error', {
        //                 error: `'${check[1].trim()}' is not a valid phone number.`
        //             })
        //         }
        //         if(check[1].trim().length !== 10 || typeof parseInt(check[1].trim(), 10) !== 'number'){
        //             return this.emit('error', {
        //                 error: `'${check[1]}' is not a valid phone number.`
        //             })
        //         }
        //         if (string.length !== 'users --delete -p 6122071306'.length) return this.emit('error', {
        //             error: `'${string}' is not command, users --delete -p`
        //         })
        //         let phone = check[1].trim()
 
        //         let path = `${this.base()}/users/${phone}.json`
        //         promises.unlink(path)
        //         .then(() => {
        //          this.emit('success', {
        //              message: `User deleted.`
        //          })
        //         })
        //         .catch(error => {
        //          this.emit('error', {
        //              error: `User with this phone number does not even exist.`
        //          })
        //         })
                
        //     }




            // onprocessphonecommand(command, code){
    //     // let cmd = this.spliter(command[0], '--get --phone=')
    //     // users --get --phone=6122071306
    //     let cmd = this.spliter(command[0], code)
    //     let cmds = this.spliter(cmd[0], ' ')
    //     let phone = cmds[0]
    //     let options = []

    //     if(this.isValid(this.regexes().phoneregex, phone) === false){
    //         return this.emit('users:error', {
    //             error: `'${phone}' is not a valid phone number.`
    //         })
    //     }
    //     //    if (phone.length !== 10 || typeof parseInt(phone.trim(), 10) !== 'number') {
    //     //     return this.emit('users:error', {
    //     //         error: `'${phone}' is not a valid phone number.`
    //     //     })
    //     // }    
    //     cmds.shift()
    //    if(cmds.length === 0){
    //     this.ongetuserbyphoneevent(phone, 'users:user-found')
    //     this.once('users:user-found', user => {
    //         // user.code = email
    //         let counter = 0
    //         if (user.orders && user.orders.length > 0) {
    //             user.data = []
    //             let dim = user.orders.length
    //             for (let id of user.orders) {
    //                 this.on('users:user-order-found', order => {
    //                     counter++
    //                     user.data.push(order.order)
    //                     if (counter === dim) {
    //                         this.emit('users:user-orders-found', user)
    
    //                     }
    //                 })
    //                 this.ongetorderbyid(id, 'users:user-order-found')
    //             }
    //             this.ondisplayuser('users:user-orders-found')
    //         } else {
    //             this.ondisplayuser('users:user-found-with-no-records')
    //             this.emit('users:user-found-with-no-records', user)
    //         }
    //     })
    //     }
    //    if (cmds.length > 0) {
    //        // users --get --phone=3852045167 -b -s -r -b -o -j -d 0
    //        let jsonned
    //        if (cmds.length > 8) {
    //            return this.emit('users:error', {
    //                error: `TO MANY ARGUMENTS. MUST NOT BE MORE THAN 8`
    //            })
    //        }
    //        // users --get --phone=3852045167 -b -s
    //        let tabular = this.onarraywalk(cmds, this.userDetailsEvents(), false)
    //        let equal = cmds.filter(str => str.includes('='))
    //        let noequal = this.exclude(tabular, cmds.filter(str => !str.includes('=')), false)
    //        let invalidnoequal = this.exclude(this.jsonEventList(), noequal, true)

    //        if (equal.length > 1) {
    //            return this.emit('users:error', {
    //                error: `'${equal.join(' ')}' is not a valid JSON option.`
    //            })
    //        }
    //        if (equal && equal.length === 1) {
    //            let jsoncode = this.spliter(equal[0], '=')
    //            if (jsoncode[0] !== '--depth') {
    //                return this.emit('users:error', {
    //                    error: `'${jsoncode[0]}' is not a valid JSON option.`
    //                })
    //            }
               
    //            if(this.isValid(this.regexes().positivenumber, jsoncode[1]) === false){
    //             if(jsoncode[1] === undefined){
    //              return this.emit('users:error', {
    //                  error: `'${noequal[0]} ${jsoncode[0]}=' requires an argument`
    //              })
    //             }
    //             if(jsoncode[1] !== undefined){
    //              return this.emit('users:error', {
    //                  error: `'${jsoncode[1]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
    //              })
    //             }
    //          }
    //        }
    //        if (noequal.length > 3) {
    //            return this.emit('users:error', {
    //                error: `'${noequal.join(' ')}' is not a valid JSON option.`
    //            })
    //        }

    //        // if equal.length === 0 and noequal.length === 0

    //        if (equal.length === 0 && noequal.length === 0) {
    //            if (tabular.length > 4) {
    //                return this.emit('users:error', {
    //                    error: `'${tabular.join(' ')}' is not a valid option for 'users ${event}'`
    //                })
    //            }

    //            for (let cmd of tabular) {
    //                if (cmd === '-r' || cmd === '--records') {
    //                    if (cmds.find(str => str === '-r') !== undefined) {
    //                        if (cmds.find(str => str === '--records') !== undefined) {
    //                            return this.emit('users:error', {
    //                                error: `Records option duplicated: both '-r' and '--records' are present.`
    //                            })
    //                        }
    //                    }
    //                    options.push('r')
    //                }
    //                if (cmd === '-o' || cmd === '-orders') {
    //                    if (cmds.find(str => str === '-o') !== undefined) {
    //                        if (cmds.find(str => str === '--orders') !== undefined) {
    //                            return this.emit('users:error', {
    //                                error: `Records option duplicated: both '-o' and '--orders' are present.`
    //                            })
    //                        }
    //                    }
    //                    options.push('o')
    //                }
    //                if (cmd === '-b' || cmd === '--billing') {
    //                    if (cmds.find(str => str === '-b') !== undefined) {
    //                        if (cmds.find(str => str === '--billing') !== undefined) {
    //                            return this.emit('users:error', {
    //                                error: `Records option duplicated: both '-b' and '--billing' are present.`
    //                            })
    //                        }
    //                    }
    //                    options.push('b')
    //                }
    //                if (cmd === '-s' || cmd === '--shipping') {
    //                    if (cmds.find(str => str === '-s') !== undefined) {
    //                        if (cmds.find(str => str === '--shipping') !== undefined) {
    //                            return this.emit('users:error', {
    //                                error: `Records option duplicated: both '-s' and '--shipping' are present.`
    //                            })
    //                        }
    //                    }
    //                    options.push('s')
    //                }
    //            }

    //            this.ongetuserbyphoneevent(phone, 'users:user-found')
    //            this.once('users:user-found', user => {
               
    //                let counter = 0
    //                if (user.orders && user.orders.length > 0) {
    //                    user.data = []
    //                    let dim = user.orders.length
    //                    for (let id of user.orders) {
    //                        this.on('users:user-order-found', order => {
    //                            counter++
    //                            user.data.push(order.order)
    //                            user.options = options
    //                            if (counter === dim) {
    //                                this.emit('users:user-orders-found', user)
    //                            }
    //                        })
    //                        this.ongetorderbyid(id, 'users:user-order-found')
    //                    }
    //                    this.ondisplayuser('users:user-orders-found')
    //                } else {
    //                    user.jsonned = jsonned
    //                 //    user.code = email
    //                    this.ondisplayuser('users:user-found-with-no-records')
    //                    this.emit('users:user-found-with-no-records', user)
    //                }
    //            })
    //        }else if(noequal.length > 0 && equal.length === 0){
            
    //             if(noequal.length === 1){
    //                 if(noequal[0] !== '-j' && noequal[0] !== '--json'){
    //                     return this.emit('users:error', {error: `'${noequal[0]}' is not valid JSON option`})
    //                 }
    //                 jsonned = {json: noequal[0],depth: Infinity}

    //                 for (let cmd of tabular) {
    //                     if (cmd === '-r' || cmd === '--records') {
    //                         if (cmds.find(str => str === '-r') !== undefined) {
    //                             if (cmds.find(str => str === '--records') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-r' and '--records' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('r')
    //                     }
    //                     if (cmd === '-o' || cmd === '-orders') {
    //                         if (cmds.find(str => str === '-o') !== undefined) {
    //                             if (cmds.find(str => str === '--orders') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-o' and '--orders' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('o')
    //                     }
    //                     if (cmd === '-b' || cmd === '--billing') {
    //                         if (cmds.find(str => str === '-b') !== undefined) {
    //                             if (cmds.find(str => str === '--billing') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-b' and '--billing' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('b')
    //                     }
    //                     if (cmd === '-s' || cmd === '--shipping') {
    //                         if (cmds.find(str => str === '-s') !== undefined) {
    //                             if (cmds.find(str => str === '--shipping') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-s' and '--shipping' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('s')
    //                     }
    //                 }
 
                   
    //                 this.ongetuserbyphoneevent(phone, 'users:user-found')
    //                 this.once('users:user-found', user => {
    //                     // user.code = email
    //                     let counter = 0
    //                     if (user.orders && user.orders.length > 0) {
    //                         user.data = []
    //                         let dim = user.orders.length
    //                         for (let id of user.orders) {
    //                             this.on('users:user-order-found', order => {
    //                                 counter++
    //                                 user.data.push(order.order)
    //                                 user.options = options
    //                                 user.jsonned = jsonned
    //                                 if (counter === dim) {
    //                                     this.emit('users:user-orders-found', user)
    //                                 }
    //                             })
    //                             this.ongetorderbyid(id, 'users:user-order-found')
    //                         }
    //                         this.ondisplayuser('users:user-orders-found')
    //                     } else {
    //                         user.jsonned = jsonned
    //                         // user.code = email
    //                         this.ondisplayuser('users:user-found-with-no-records')
    //                         this.emit('users:user-found-with-no-records', user)
    //                     }
    //                 })
                    
    //             }
    //             if(noequal.length === 2){
    //                 return this.emit('users:error', {error: `'${noequal.join(' ')}' is not valid JSON command`}) 
    //             }
    //             if(noequal.length === 3){

    //                 let depth = noequal.filter(str => this.isNumber(str))
    //                 let jcodes = noequal.filter(str => this.isNotNumber(str))
                 
    //                 let first = `${jcodes[0]} ${jcodes[1]}`
    //                 let second = `${jcodes[1]} ${jcodes[0]}`
                    
            
    //                 if(jcodes.length === 0 || jcodes.length !== 2){
    //                     return this.emit('users:error', {error: `'${jcodes.join(' ')}' is not valid JSON option `})
    //                 }
    //                 if(depth.length === 0 || depth.length > 1){
    //                     return this.emit('users:error', {error: `'${depth.join(' ')}' is not valid JSON option ..`})
    //                 }
    //                 if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
    //                     return this.emit('users:error', {
    //                         error: `'${depth[0]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
    //                     })
    //                 }
    //                 if(this.jsonEventList().find(str => str === first) !== undefined){
    //                     jsonned = {json: first, depth: depth[0]}
    //                 }else if(this.jsonEventList().find(str => str === second) !== undefined){
    //                     jsonned = {json: second, depth: depth[0]}
    //                 }else{
    //                     return this.emit('users:error', {error: `'${noequal.join(' ')}' is not valid JSON option.mok`})
    //                 }
                  
    //                 for (let cmd of tabular) {
    //                     if (cmd === '-r' || cmd === '--records') {
    //                         if (cmds.find(str => str === '-r') !== undefined) {
    //                             if (cmds.find(str => str === '--records') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-r' and '--records' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('r')
    //                     }
    //                     if (cmd === '-o' || cmd === '-orders') {
    //                         if (cmds.find(str => str === '-o') !== undefined) {
    //                             if (cmds.find(str => str === '--orders') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-o' and '--orders' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('o')
    //                     }
    //                     if (cmd === '-b' || cmd === '--billing') {
    //                         if (cmds.find(str => str === '-b') !== undefined) {
    //                             if (cmds.find(str => str === '--billing') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-b' and '--billing' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('b')
    //                     }
    //                     if (cmd === '-s' || cmd === '--shipping') {
    //                         if (cmds.find(str => str === '-s') !== undefined) {
    //                             if (cmds.find(str => str === '--shipping') !== undefined) {
    //                                 return this.emit('users:error', {
    //                                     error: `Records option duplicated: both '-s' and '--shipping' are present.`
    //                                 })
    //                             }
    //                         }
    //                         options.push('s')
    //                     }
    //                 }

    //                 this.ongetuserbyphoneevent(phone, 'users:user-found')
    //                 this.once('users:user-found', user => {
    //                     // user.code = email
    //                     let counter = 0
    //                     if (user.orders && user.orders.length > 0) {
    //                         user.data = []
    //                         let dim = user.orders.length
    //                         for (let id of user.orders) {
    //                             this.on('users:user-order-found', order => {
    //                                 counter++
    //                                 user.data.push(order.order)
    //                                 user.options = options
    //                                 user.jsonned = jsonned
    //                                 if (counter === dim) {
    //                                     this.emit('users:user-orders-found', user)
    //                                 }
    //                             })
    //                             this.ongetorderbyid(id, 'users:user-order-found')
    //                         }
    //                         this.ondisplayuser('users:user-orders-found')
    //                     } else {
    //                         user.jsonned = jsonned
    //                         // user.code = email
    //                         this.ondisplayuser('users:user-found-with-no-records')
    //                         this.emit('users:user-found-with-no-records', user)
    //                     }
    //                 })     
    //             }
    //        }else if(equal.length === 1 && noequal.length === 0){
             
    //        }else if(equal.length === 1 && noequal.length > 0){
    //           if(noequal.length !== 1 && (noequal[0] !=='-j' || noequal[0] !== '--json')){
    //             return this.emit('users:error', {error: `'${noequal.join(' ')}' is not valid JSON option.. `})
    //           }
    //           let jcode = this.spliter(equal[0], '=')
              
    //           if(jcode[0] !== '--depth'){
    //             return this.emit('users:error', {error: `'${jcode[0]}' is not valid JSON option`})
    //           }
              
    //           if(this.isValid(this.regexes().positivenumber, jcode[1]) === false){
    //            if(jcode[1] === undefined){
    //             return this.emit('users:error', {
    //                 error: `'${noequal[0]} ${jcode[0]}=' requires an argument`
    //             })
    //            }
    //            if(jcode[1] !== undefined){
    //             return this.emit('users:error', {
    //                 error: `'${jcode[1]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
    //             })
    //            }
    //         }
    //         jsonned = {json: `${noequal[0]} ${jcode[0]}=`, depth: jcode[1]}

           
    //         for (let cmd of tabular) {
    //             if (cmd === '-r' || cmd === '--records') {
    //                 if (cmds.find(str => str === '-r') !== undefined) {
    //                     if (cmds.find(str => str === '--records') !== undefined) {
    //                         return this.emit('users:error', {
    //                             error: `Records option duplicated: both '-r' and '--records' are present.`
    //                         })
    //                     }
    //                 }
    //                 options.push('r')
    //             }
    //             if (cmd === '-o' || cmd === '-orders') {
    //                 if (cmds.find(str => str === '-o') !== undefined) {
    //                     if (cmds.find(str => str === '--orders') !== undefined) {
    //                         return this.emit('users:error', {
    //                             error: `Records option duplicated: both '-o' and '--orders' are present.`
    //                         })
    //                     }
    //                 }
    //                 options.push('o')
    //             }
    //             if (cmd === '-b' || cmd === '--billing') {
    //                 if (cmds.find(str => str === '-b') !== undefined) {
    //                     if (cmds.find(str => str === '--billing') !== undefined) {
    //                         return this.emit('users:error', {
    //                             error: `Records option duplicated: both '-b' and '--billing' are present.`
    //                         })
    //                     }
    //                 }
    //                 options.push('b')
    //             }
    //             if (cmd === '-s' || cmd === '--shipping') {
    //                 if (cmds.find(str => str === '-s') !== undefined) {
    //                     if (cmds.find(str => str === '--shipping') !== undefined) {
    //                         return this.emit('users:error', {
    //                             error: `Records option duplicated: both '-s' and '--shipping' are present.`
    //                         })
    //                     }
    //                 }
    //                 options.push('s')
    //             }
    //         }

           
    //         this.ongetuserbyphoneevent(phone, 'users:user-found')
    //         this.once('users:user-found', user => {
    //             let counter = 0
    //             // user.code = email
    //             if (user.orders && user.orders.length > 0) {
    //                 user.data = []
    //                 let dim = user.orders.length
    //                 for (let id of user.orders) {
    //                     this.on('users:user-order-found', order => {
    //                         counter++
    //                         user.data.push(order.order)
    //                         user.options = options
    //                         user.jsonned = jsonned
    //                         if (counter === dim) {
    //                             this.emit('users:user-orders-found', user)
    //                         }
    //                     })
    //                     this.ongetorderbyid(id, 'users:user-order-found')
    //                 }
    //                 this.ondisplayuser('users:user-orders-found')
    //             } else {
    //                 user.jsonned = jsonned
    //                 // user.code = email
    //                 this.ondisplayuser('users:user-found-with-no-records')
    //                 this.emit('users:user-found-with-no-records', user)
    //             }
    //         })

    //        }else{
    //             console.log('I am not too sure about this')
    //        }
    //    }else{
    //        //console.log('CMDS LENGH IS LESS THAN ZERO ')
    //    }
    // }
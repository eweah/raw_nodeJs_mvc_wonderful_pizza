'use strict'
const readline = require('readline')
const {Transform} = require('stream')

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
    input(string){
        string = typeof (string) === 'string' && string.trim().length > 0 ? string.trim() : false
        if (string) {
            const eventsList = [
                'man',
                'help',
                '?',
                '-h',
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
                'stats --help',
                'stats -h',
                'stats -l',
                'stats --load',
                'stats --cpu',
                'stats -c',
                'stats --cpu-count',
                'stats -c -c',
                'stats --free-memory',
                'stats --fm',
                'stats -f',
                'stats -f -m',
                'stats --current-malloced-memory',
                'stats --cmm',
                'stats -c -m -m',
                'stats -cmm',
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
            let commandEvent = false
            let chosenEvent = eventsList.find(event => string.trim().toLowerCase() === event)

            if(chosenEvent){
                    commandEvent = true
                    this.emit(string, string)
                    return true
            }
            if (commandEvent === false) {
                this.emit('command-not-found', {
                    error: `'${string}' is not command.`
                })
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


    
}


module.exports = CLI

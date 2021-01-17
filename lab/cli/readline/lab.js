const readline = require('readline')
const {createWriteStream, createReadStream} = require('fs')
const  {PassThrough, Transform, Readable, Writable} = require('stream')
const events = require('events')

class _events extends events {}

const _e = new _events()



const cli = {}
cli.responders = {}
cli.responders.man = string => {
    console.log('man time', string)
}

_e.emit('man', string => {
    cli.responders.man(string)
})

cli.processInput = str => {
    str = typeof(str) === 'string' && str.trim().length > 0 ? str.trim(): false
    if(str){
        const uniqueStrings = [
            'man', 
            'help', 
            'exit', 
            'quit',
            'stats', 
            'list users', 
            'more user info',
            'list checks', 
            'more check info',
            'list logs', 
            'more log info'
        ]
        let matchFound = false 
        let counter = 0
        uniqueStrings.some(input => {
            if(str.toLowerCase().indexOf(input) > - 1){
                matchFound = true
                _e.emit(input, str)
                return true
            }
        })
        if(matchFound === false){
            console.log(str,'is not a valid command')
        }
    }
}
cli.init = () => {
    console.log('\x1b[34m%s\x1b[0m', 'cli is running')
    console.log('')
   
    const _interface = readline.createInterface({
        input: process.stdin, 
        output: process.stdout,
        prompt: ': ',
        // completer: line => {
        //     const completions = '.help .error .exit .quit .q'.split(' ');
        //     const hits = completions.filter((c) => c.startsWith(line));
        //     // Show all completions if none found
        //     return [hits.length ? hits : completions, line];
        // },
        terminal: true, 
        historySize: 100
        ,crlfDelay: 500,
        removeHistoryDuplicates: true,
        escapeCodeTimeout: 500

    })
    _interface.prompt()
    // _interface.setPrompt(':: ')
    // _interface.cursor = 10
    // _interface.clearLine(process.stdout, 0, fn)

    // _interface.prompt()

    _interface.on('line', string =>{
        cli.processInput(string)
        _interface.prompt()
    })
    // _interface.on('SIGINT', () =>{
    //     _interface.question('Are you sure you want to exit?: ' , answer =>{
    //         if (answer.match(/^y(es)?$/i)) _interface.pause();
    //     })
    // })
    _interface.on('exit', code => {
        process.exit(0)
    })
}
cli.init()
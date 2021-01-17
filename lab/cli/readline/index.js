const readline = require('readline')
const events = require('events')


// events 

class _events extends events {}

const command = new _events()

const cli = {}
cli.isLoggedIn = false

cli.verticalSpace = NumberOfLines => {
    NumberOfLines = typeof (NumberOfLines) === 'number' && NumberOfLines > 0 ? NumberOfLines : 1
    for (let i = 0; i < NumberOfLines; i++) {
        console.log('')
    }
}
// horizontal line accross the screen 
cli.horizontalLine = () => {
    const width = process.stdout.columns
    let line = ''
    for (let i = 0; i < width; i++) {
        line += '-'
    }
    console.log(line)
}

// create centered text on the screen 
cli.centered = str => {
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
cli.admin = {}
cli.admin.responders = {}
cli.admin.process = {}

cli.admin.process.input = string => {
    string = typeof (string) === 'string' && string.trim().length > 0 ? string.trim() : false
    if (string) {
        const eventsList = [
            'man',
            'help',
            'exit',
            'quit',
            'leave',
            'admin',
            'login',
            'user',
            'stats --help'
        ]
        let commandEvent = false
        eventsList.some(event => {
            if (string.toLowerCase().indexOf(event) > -1) {
                commandEvent = true
                command.emit(event, string)
                return true
            }
        })
        if (commandEvent === false) {
            command.emit('command-not-found', {
                error: `'${string}' is not command.`
            })
        }
    }
}
cli.admin.responders.exit = () => {
    process.exit(0)
}
// cli.admin.responders.login = () => {
//     cli.admin.responders.login()
// }
cli.admin.responders.quit = () => {
    process.exit(0)
}
cli.admin.responders.leave = () => {
    process.exit(0)
}
cli.admin.responders.commandNotFound = data => {
    console.log(data)
}
cli.admin.responders.man = () => {
    cli.admin.responders.help()
}
cli.admin.responders.help = () => {
    const commands = {
        'man': 'Show this help page',
        'help': 'Alias of the "man" command',
        'exit': 'Kill the CLI and the rest of the application',
        'quit': 'Kill the CLI and the rest of the application',
        'login': 'Login as an admin',
        'logout': 'Logout as an admin',
        'stats': 'Get statistics of the underlying operating system and resouce utilization',
        'list users': 'Show a list of all the registered users in the system',
        'list guests': 'Show a list of all the guest in the system',
        'list orders': 'Show a list of all the orders in the system',
        'more order info --orderId': 'Show a list of all the orders in the system',
        'more user info --phone': 'Show details of a specific user',
        'more guest info --phone': 'Show details of a specific user',
        'stats --help': 'Show stats command options and usage'
    }

    cli.horizontalLine()
    cli.centered('CLI MANUAL')
    cli.horizontalLine()
    cli.verticalSpace(2)

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
            cli.verticalSpace(1)
        }
    }
}

cli.admin.responders.statshelp = () => {
    const commands = {
        'man': 'Show this help page',
        'help': 'Alias of the "man" command',
        'exit': 'Kill the CLI and the rest of the application',
        'quit': 'Kill the CLI and the rest of the application',
        'login': 'Login as an admin',
        'logout': 'Logout as an admin',
        'stats': 'Get statistics of the underlying operating system and resouce utilization',
        'list users': 'Show a list of all the registered users in the system',
        'list guests': 'Show a list of all the guest in the system',
        'list orders': 'Show a list of all the orders in the system',
        'more order info --orderId': 'Show a list of all the orders in the system',
        'more user info --phone': 'Show details of a specific user',
        'more guest info --phone': 'Show details of a specific user',
        'stats --help': 'Show stats command options and usage'
    }

    cli.horizontalLine()
    cli.centered('STATS : show all the details of the application system level')
    cli.horizontalLine()
    cli.verticalSpace(2)

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
            cli.verticalSpace(1)
        }
    }
}

cli.credentials = {
    phone: '6122071306',
    password: 'password'
}
cli.admin.responders.listusers = () => {
    console.log('list all users')
}
command.on('exit', () => {
    cli.admin.responders.exit()
})

command.on('quit', () => {
    cli.admin.responders.quit()
})
command.on('leave', () => {
    cli.admin.responders.leave()
})
command.on('command-not-found', data => {
    cli.admin.responders.commandNotFound(data.error)
})
command.on('man', () => {
    cli.admin.responders.man()
})
command.on('help', () => {
    cli.admin.responders.help()
})
// command.on('user', () => {
//     cli.admin.responders.user()
// })
command.on('admin', () => {
    cli.admin.responders.admin()
})

command.on('list users', () => {
    cli.admin.responders.listusers()
})
command.on('stats --help', () => {
    // cli.admin.responders.statshelp()
    console.log('stats --help here')
})


cli.admin.init = () => {
    console.log('\x1b[34m%s\x1b[0m', 'cli is running')
    console.log('')

    const _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ':: '
    })
    // Create an initial prompt
    _interface.prompt()

    _interface.on('line', string => {
        cli.admin.process.input(string)
        _interface.prompt()
    })

    _interface.on('exit', () => {
        process.exit(0)
    })
    command.on('login', () => {
        cli.admin.responders.login()
        // cli.admin.responders.statshelp()
    })
    cli.lsanitize = string => string.trim().toLocaleLowerCase()
    cli.admin.responders.login = () => {
        // console.log('')
        // console.log('\x1b[34m%s\x1b[0m', 'phone number: ')
        // console.log('\x1b[34m%s\x1b[0m', 'password: ')
        // console.log('')
    
       _interface.question('Phone Number: ', phone => {
           if(phone.trim().length !== 10 || typeof(phone) !== 'string'){
              console.log('\x1b[31m%s\x1b[0m', 'Invalid phone number!')
               process.exit(0)
           }
        phone = typeof(phone) === 'string' && phone.trim().length === 10 ? phone.toLocaleLowerCase().trim() : false
        if(!phone){
            console.log('\x1b[31m%s\x1b[0m','admin phone number required') 
            process.exit(0)
        }
        if(phone){
           _interface.question('Password: ', password => {
               if(typeof(password) !== 'string' || password.trim().length < 8){
                   console.log('\x1b[31m%s\x1b[0m','Invalid password')
                   process.exit(0)
               }
            password = typeof(password) === 'string' && password.trim().length >= 8 ? password.trim(): false
            if(!password){
                console.log('\x1b[31m%s\x1b[0m','admin phone required') 
                process.exit(0)
            }
            if(password){
                if(phone.trim().toLocaleLowerCase() !== cli.credentials.phone.trim().toLocaleLowerCase()){
                    console.log('\x1b[31m%s\x1b[0m','Unrecognized phone number')
                    process.exit(0)
                }
                if(password.trim().toLocaleLowerCase() !== cli.credentials.password.trim().toLocaleLowerCase()){
                    console.log('\x1b[31m%s\x1b[0m','Incorrect password')
                    process.exit(0)
                }
                if(phone.trim().toLocaleLowerCase() === cli.credentials.phone.trim().toLocaleLowerCase()){
                    if(password.trim().toLocaleLowerCase() === cli.credentials.password.trim().toLocaleLowerCase()){
                        console.log('\x1b[32m%s\x1b[0m', 'You are logged in!')
                        cli.isLoggedIn = true
                        _interface.prompt()
                    }
                }
            }
            
        })
        }

       })
        
    
    }
}
cli.admin.init()


// login
   // phone number
   // password
//

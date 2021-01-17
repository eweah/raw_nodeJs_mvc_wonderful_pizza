'use strict'

const UserCommand = require('../users/command')

class HelpCommand extends UserCommand{
    constructor(){
        super()
        this.autobind(HelpCommand)
        this.autoinvoker(HelpCommand)
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
    Helpcommand(){
        this.on('help', string => {

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
 
            let event = this.help().find(event => event === command)

            if (event === undefined) {
                return this.emit('error', {
                    error: `'${string}' is not command.`
                })
            }
            if(event === 'help man'){
                console.clear()
                if (command.length !== 'help man'.length) return this.emit('error', {
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

            if(event === 'help'){
                console.clear()
                if (command.length !== 'help'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
        const helpcommands = {
            'man': 'Command Line Interface (CLI) Manual',
            'help': 'Alias of the "man" command',
            'exit': 'Kill the CLI and the rest of the application',
            'quit': 'Kill the CLI and the rest of the application',
            'stats': 'Manual for the tatistics of the underlying operating system and resouce utilization',
            'users': 'Manual for interacting with registered users in the system',
            'login': 'Login as an admin',
            'logout': 'Logout as an admin',
            'orders': 'Manual for interacting with orders in the system'
    
        }

                let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mhelp\x1b[0m - Alias of the "man" command 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mhelp\x1b[0m [\x1b[36mman\x1b[0m|\x1b[36mhelp\x1b[0m|\x1b[36morders\x1b[0m|\x1b[36musers\x1b[0m|\x1b[36mexit\x1b[0m|\x1b[36mquit\x1b[0m|\x1b[36mleave\x1b[0m|\x1b[36mlogin\x1b[0m|\x1b[36mlogout\x1b[0m] 

\x1b[36mDESCRIPTION\x1b[0m
    Command Line Interface (CLI) Manual.
 `
 
 this.centered(`\x1b[32mHELP COMMANDS AND USAGE MANUAL\x1b[0m`)
 
 this.description(centered)
 
 this.verticalSpace(2)

 let  options = {pad: 22, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, helpcommands)
 console.log()
            }

            if(event === 'help help'){
                console.clear()
                if (command.length !== 'help help'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
        const helpcommands = {
            'man': 'Command Line Interface (CLI) Manual',
            'help': 'Alias of the "man" command',
            'exit': 'Kill the CLI and the rest of the application',
            'quit': 'Kill the CLI and the rest of the application',
            'stats': 'Manual for the tatistics of the underlying operating system and resouce utilization',
            'users': 'Manual for interacting with registered users in the system',
            'login': 'Login as an admin',
            'logout': 'Logout as an admin',
            'orders': 'Manual for interacting with orders in the system'
    
        }

                let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mhelp\x1b[0m - Alias of the "man" command 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mhelp\x1b[0m [\x1b[36mman\x1b[0m|\x1b[36mhelp\x1b[0m|\x1b[36morders\x1b[0m|\x1b[36musers\x1b[0m|\x1b[36mexit\x1b[0m|\x1b[36mquit\x1b[0m|\x1b[36mleave\x1b[0m|\x1b[36mlogin\x1b[0m|\x1b[36mlogout\x1b[0m] 

\x1b[36mDESCRIPTION\x1b[0m
    Command Line Interface (CLI) Manual.
 `
 
 this.centered(`\x1b[32mHELP COMMANDS AND USAGE MANUAL\x1b[0m`)
 
 this.description(centered)
 
 this.verticalSpace(2)

 let  options = {pad: 22, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, helpcommands)
 console.log()
            }

            if(event === 'help man'){
                console.clear()
                if (command.length !== 'help man'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
        const helpcommands = {
            'man': 'Command Line Interface (CLI) Manual',
            'help': 'Alias of the "man" command',
            'exit': 'Kill the CLI and the rest of the application',
            'quit': 'Kill the CLI and the rest of the application',
            'stats': 'Manual for the tatistics of the underlying operating system and resouce utilization',
            'users': 'Manual for interacting with registered users in the system',
            'login': 'Login as an admin',
            'logout': 'Logout as an admin',
            'orders': 'Manual for interacting with orders in the system'
    
        }

                let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mman\x1b[0m - Command Line Interface (CLI) Manual 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mman\x1b[0m [\x1b[36mman\x1b[0m|\x1b[36mhelp\x1b[0m|\x1b[36morders\x1b[0m|\x1b[36musers\x1b[0m|\x1b[36mexit\x1b[0m|\x1b[36mquit\x1b[0m|\x1b[36mleave\x1b[0m|\x1b[36mlogin\x1b[0m|\x1b[36mlogout\x1b[0m] 

\x1b[36mDESCRIPTION\x1b[0m
    Command Line Interface (CLI) Manual.
 `
 
 this.centered(`\x1b[32mCOMMAND LINE INTERFACE AND USAGE MANUAL\x1b[0m`)
 
 this.description(centered)
 
 this.verticalSpace(2)

 let  options = {pad: 22, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, helpcommands)
 console.log()
            }
            if (event === 'help users') {
                console.clear()
                if (command.length !== 'help users'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                        
        const usercommands = {
            '-l': 'or \x1b[36m--load\x1b[0m        Load users',

            '-g': 'or \x1b[36m--get\x1b[0m         User by phone (or email): [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m| \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m]',


            '-p': 'or \x1b[36m--phone\x1b[0m       User with the specified phone: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m|\x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m]',

            '-e': 'or \x1b[36m--email\x1b[0m       User with the specified email: [\x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m|\x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m]',

            '-o': 'or \x1b[36m--users\x1b[0m       Orders of the specified User: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-o \x1b[0m| \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m--orders\x1b[0m]',

            '-s': 'or \x1b[36m--shipping\x1b[0m    Shipping details of the specified user: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-s \x1b[0m|\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m--shipping\x1b[0m]',

            '-b': 'or \x1b[36m--billing\x1b[0m     Billing details of the specified user: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-b \x1b[0m|\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m--billing\x1b[0m]',


            '-y': 'or \x1b[36m--years\x1b[0m       Users registered within the specified number of years: [\x1b[36m-l -y \x1b[0m\x1b[4mnumber_of_years\x1b[0m]',

            '-M': 'or \x1b[36m--months\x1b[0m      Users registered within the specified number of months: [\x1b[36m-l -M \x1b[0m\x1b[0m\x1b[4mnumber_of_months\x1b[0m]',

            '-d': 'or \x1b[36m--days\x1b[0m        Users registered within the specified number of days: [\x1b[36m-l -d \x1b[0m\x1b[0m\x1b[4mnumber_of_days\x1b[0m]',

            '-h': 'or \x1b[36m--hours\x1b[0m       Users registered within the specified number of hours: [\x1b[36m-l -d \x1b[0m\x1b[0m\x1b[4mnumber_of_hours\x1b[0m]',

            '-m': 'or \x1b[36m--minutes\x1b[0m     Users registered within the specified number of minutes: [\x1b[36m-l -m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',

            '-j': 'or \x1b[36m--json\x1b[0m        JSON format: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m',

            // '-h': 'or \x1b[36m--minutes\x1b[0m     Users placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',
            // '-z': 'or \x1b[36m--minutes\x1b[0m     Orders placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',
            // '-k': 'or \x1b[36m--minutes\x1b[0m     Orders placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]'
        }

                let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36musers\x1b[0m -- Application users and a user's details 

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
    by phone by records by shipping by billing and so on.
    A set of users can be selected by phone or by email. A set of orders can also be
    selected by phone by date or by email by date with or without the Json options and so on.

 `
 this.centered(`\x1b[32mUSERS COMMANDS AND USAGE MANUAL\x1b[0m`)
 this.description(centered)
 this.verticalSpace(2)

 let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, usercommands)
 console.log()

                
            }


if(event === 'help orders'){
    if (command.length !== 'help orders'.length) return this.emit('error', {
        error: `'${string}' is not command.`
    })
    const commands = {
        '-l': 'or \x1b[36m--load\x1b[0m        Load users',
        '-g': 'or \x1b[36m--get\x1b[0m         Order by id (phone, or email): [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m--get -i \x1b[0m\x1b[4morder_id\x1b[0m ]',
        '-i': 'or \x1b[36m--id\x1b[0m          Order with the specified id: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m | \x1b[36m-g --id=\x1b[0m\x1b[4morder_id\x1b[0m ]',
        '-p': 'or \x1b[36m--phone\x1b[0m       Orders with the specified phone: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m | \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m ]',
        '-e': 'or \x1b[36m--email\x1b[0m       Orders with the specified email: [\x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m | \x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m ]',
        '-n': 'or \x1b[36m--number\x1b[0m      Order number of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-n \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--number\x1b[0m]',
        '-s': 'or \x1b[36m--shipping\x1b[0m    Shipping details of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-s \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--shipping\x1b[0m]',
        '-c': 'or \x1b[36m--card\x1b[0m        Card of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-c \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--card\x1b[0m]',
        '-P': 'or \x1b[36m--products\x1b[0m    Products of the specified order: [\x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m-P \x1b[0m| \x1b[36m-g -i \x1b[0m\x1b[4morder_id\x1b[0m \x1b[36m--products\x1b[0m]',
        '-y': 'or \x1b[36m--years\x1b[0m       Orders placed within the specified number of years: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-y \x1b[0m\x1b[0m\x1b[4mnumber_of_years\x1b[0m]',
        '-M': 'or \x1b[36m--months\x1b[0m      Orders placed within the specified number of months: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-M \x1b[0m\x1b[0m\x1b[4mnumber_of_months\x1b[0m]',
        '-d': 'or \x1b[36m--days\x1b[0m        Orders placed within the specified number of days: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-d \x1b[0m\x1b[0m\x1b[4mnumber_of_days\x1b[0m]',
        '-h': 'or \x1b[36m--hours\x1b[0m       Orders placed within the specified number of hours: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-h \x1b[0m\x1b[0m\x1b[4mnumber_of_hours\x1b[0m]',
        '-m': 'or \x1b[36m--minutes\x1b[0m     Orders placed within the specified number of minutes: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-m \x1b[0m\x1b[0m\x1b[4mnumber_of_minutes\x1b[0m]',
        '-j': 'or \x1b[36m--json\x1b[0m        JSON format: [\x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m \x1b[36m-h \x1b[0m\x1b[0m\x1b[4mnumber_of_hours\x1b[0m [\x1b[36m-j\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m]',
    }


        console.clear()
                   let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36morders\x1b[0m -- Application orders and an order's details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36morders\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
    \x1b[36morders\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m][ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|\x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m] [\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|                 \x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36morders\x1b[0m [\x1b[36m--get --phone=\x1b[0m|\x1b[36m--get -p \x1b[0m|\x1b[36m-g --phone=\x1b[0m|\x1b[36m-g -p \x1b[0m]\x1b[4mphone\x1b[0m[ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|
        \x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m[\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36morders\x1b[0m [\x1b[36m--get --email=\x1b[0m|\x1b[36m--get -e \x1b[0m|\x1b[36m-g --email=\x1b[0m|\x1b[36m-g -e \x1b[0m]\x1b[4memail\x1b[0m [ \x1b[36m--years=\x1b[0m|\x1b[36m-y\x1b[0m|\x1b[36m--months=\x1b[0m|\x1b[36m-M\x1b[0m |\x1b[36m--days=\x1b[0m|\x1b[36m-d\x1b[0m|\x1b[36m--hours=\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36m--minutes=\x1b[0m|
        \x1b[36m-m\x1b[0m]\x1b[4mnumber\x1b[0m[\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m] [\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36morders\x1b[0m [\x1b[36m--get --id=\x1b[0m|\x1b[36m--get -i \x1b[0m|\x1b[36m-g --id=\x1b[0m|\x1b[36m-g -i \x1b[0m]\x1b[4morder_id\x1b[0m [\x1b[36m-n\x1b[0m|\x1b[36m--number\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m--card\x1b[0m|\x1b[36m-s\x1b[0m|\x1b[36m--shipping\x1b[0m|\x1b[36m-P\x1b[0m|\x1b[36m--products\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m]
       [\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json -d\x1b[0m|\x1b[36m--json --depth=\x1b[0m]\x1b[4mdepth_level\x1b[0m

\x1b[36mDESCRIPTION\x1b[0m
    Application orders and a user's details. An order or a set of orders can be viewed in 
    two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
    depending on how you want to view it. A single order is selected by id (order id). A single order
    can also be selected by id by date, by id by card, by id by products by shipping by card and so on.
    A set of orders can be selected by phone or by email. A set of orders can also be
    selected by phone by date or by email by date with or without the Json options and so on.

    `
    this.centered(`\x1b[32mORDERS COMMANDS HELP AND USAGE MANUAL\x1b[0m`)
    this.description(centered)
    this.verticalSpace(2)
    let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
    this.texAligner(options, commands)
    console.log()
}

            if (string  === 'help stats') {
                if (command.length !== 'help stats'.length) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                console.clear()
        const statscommands = {
            
            '-l': 'or \x1b[36m--load\x1b[0m                     Load application system statistics',

            '-u': 'or \x1b[36m--uptime\x1b[0m                   Uptime',


            '-c': 'or \x1b[36m--cpu-count\x1b[0m                CPU Count (same as \x1b[36m--cpu\x1b[0m or \x1b[36m-cpu\x1b[0m or \x1b[36m-c c\x1b[0m)',

            '-f': 'or \x1b[36m--free-memory\x1b[0m              Free Memory (same as \x1b[36m--fm\x1b[0m or \x1b[36m-fm\x1b[0m or \x1b[36m-f -f\x1b[0m)',

            '-C': 'or \x1b[36m--current-malloced-memory\x1b[0m  Current Malloced Memory (same as \x1b[36m--cmm\x1b[0m or \x1b[36m-cmm\x1b[0m or \x1b[36m-c -m -m\x1b[0m)',

            '-p': 'or \x1b[36m--peak-malloced-memory\x1b[0m     Peak Malloced Memory (same as \x1b[36m--pmm\x1b[0m or \x1b[36m-pmm\x1b[0m or \x1b[36m-p -m -m\x1b[0m)',

            '-a': 'or \x1b[36m--available-heap-used\x1b[0m      Available Heap Used (same as \x1b[36m--ahu\x1b[0m or \x1b[36m-ahu\x1b[0m or \x1b[36m-a -h -u\x1b[0m)',
            '-A': 'or \x1b[36m--available-heap-allocated\x1b[0m Available Heap allocated(same as \x1b[36m--aha\x1b[0m or \x1b[36m-aha\x1b[0m or \x1b[36m-a -h -a\x1b[0m)'
        }

                let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mstats\x1b[0m - Gives application system level statistics

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mstats\x1b[0m [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--uptime\x1b[0m|\x1b[36m-u\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--cpu-count\x1b[0m|\x1b[36m--cpu\x1b[0m|\x1b[36m-cpu\x1b[0m|\x1b[36m-c\x1b[0m|\x1b[36m-c -c\x1b[0m] 
    \x1b[36mstats\x1b[0m [\x1b[36m--free-memory\x1b[0m|\x1b[36m--fm\x1b[0m|\x1b[36m-fm\x1b[0m|\x1b[36m-f\x1b[0m|\x1b[36m-f -m\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--current-malloced-memory\x1b[0m|\x1b[36m--cmm\x1b[0m|\x1b[36m-cmm\x1b[0m|\x1b[36m-c -m -m\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--peak-malloced-memory\x1b[0m|\x1b[36m--pmm\x1b[0m|\x1b[36m-pmm\x1b[0m|\x1b[36m-p -m -m\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--allocated-heap-used\x1b[0m|\x1b[36m--ahu\x1b[0m|\x1b[36m-ahu\x1b[0m|\x1b[36m-a -h -u\x1b[0m]
    \x1b[36mstats\x1b[0m [\x1b[36m--available-heap-allocated\x1b[0m|\x1b[36m--aha\x1b[0m|\x1b[36m-ahu\x1b[0m|\x1b[36m-a -h -a\x1b[0m]

\x1b[36mDESCRIPTION\x1b[0m
    Gives application system level statistics.`
 
 console.clear()
 this.centered(`\x1b[32mSTATISTICS COMMANDS AND USAGE MANUAL\x1b[0m`)
 
 this.description(centered)
 
 this.verticalSpace(2)

 let  options = {pad: 14, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, statscommands)
 console.log()
                
            }
        })         
    }
 
}

module.exports = HelpCommand
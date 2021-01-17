'use strict'

const HelpCommand = require('../help')

class ManCommand extends HelpCommand{
    constructor(){
        super()
        this.autobind(ManCommand)
        this.autoinvoker(ManCommand)
    }
    
    man(){
        return [
            'man',
            'man man',
            'man menu',
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
   autoinvoked(){
    return [
        'mancommand', 'statscommand'
        ,'Helpcommand','login',
        'common', 'notACommand', 'cliInterface',
         'init', 
         'orderscommands','onorderscommand', 'ordersNotifications',
         'userscommands','onuserscommand', 'usersNotifications',
         'menucommands', 'onmenucommand', 'menuNotifications', 'manNotifications'
        ]
   }
   manNotifications() {
    this.on('man:error', data => {
        console.log()
        console.log(` \x1b[31m \x1b[4mERROR:\x1b[0m \x1b\[31m${data.error} \x1b[0m \x1b[0m`)
        console.log()
        this.prompt()
        // process.exit(0)
    })
    this.on('man:warning', data => {
        console.log()
        console.log(`\x1b[33m \x1b[4mATTENTION:\x1b[0m \x1b\[33m${data.error} \x1b[0m \x1b[0m`)
        console.log()
        this.prompt()
        // process.exit(0)
    })
    this.on('man:info', data => {
        console.log()
        console.log(`\x1b[36m \x1b[4mINFO\x1b[0m\x1b[36m:\x1b[0m \x1b\[36m${data.message} \x1b[0m \x1b[0m`)
        console.log()
        this.prompt()
        // process.exit(0)
    })
    this.on('man:success', data => {
        console.log()
        console.log(` \x1b[32m\x1b[36m\x1b[4mOK\x1b[0m\x1b[0m\x1b[36m:\x1b[0m \x1b\[32m${data.message} \x1b[0m \x1b[0m`)
        console.log()
        this.prompt()
        // process.exit(0)
    })
}
    mancommand(){
        this.on('frontend', string => {
            let command = string.split(' ').filter(str => str !== '').join(' ')
            if (command !== 'frontend') {
                return this.emit('menu:error', {
                    error: `'${comman}' is not command`
                })
            }
            return this.run(`open http://localhost:3000` )
            .then(() => {
                console.log()
                return this.emit('man:success', {message: 'App is now opened in browser (Safari browser is not supported)'} )
            })
            .catch(error =>{
                return this.emit('man:error', {error: `'${error.cmd}' is not a valid command`})
            })
        })
        this.on('logout', string =>{
            console.clear()
            let command = string.split(' ').filter(str => str !== '').join(' ')
            if (command !== 'logout') {
                return this.emit('menu:error', {
                    error: `'${comman}' is not command`
                })
            }
            if(this.auth === false){
                return this.emit('man:info', {message: 'You are not even logged in!'})
            }
            if(this.auth === true){
                this.auth = false 
               console.log('\x1b[36m%s\x1b[0m', 'Goobye. We hope you had fun!')
               return 
            }
            
            //process.exit(0)
        })
        this.on('man', string => {
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
 
            let event = this.man().find(event => event === command)
            // console.log(command)
            // console.log(event)
            // return
            if (event === undefined) {
                return this.emit('error', {
                    error: `'${string}' is not command.`
                })
            }

     
            if(event === 'man'){
                console.clear()
                if (command.length !== 3) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
        const mancommands = {
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
 this.texAligner(options, mancommands)
 console.log()
            }

                if(event === 'man menu'){
                console.clear()
                if (command.length !== 8) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                       const menucommands = {
            '-l': 'or \x1b[36m--load\x1b[0m        Load menu',

            '-s': 'or \x1b[36m--sizes\x1b[0m       Sizes of Menu by type: [\x1b[36m-l -s\x1b[0m|\x1b[36m-l --sizes\x1b[0m]',
            '-j': 'or \x1b[36m--json\x1b[0m        JSON format: [\x1b[36m-l -j\x1b[0m|\x1b[36m-l --json\x1b[0m]',

            '-T': 'or \x1b[36m--type\x1b[0m        Menu type: [\x1b[36m-T \x1b[0m|\x1b[36m-g --type=\x1b[0m]\x1b[4mtype\x1b[0m',
            '-t': 'or \x1b[36m--toppings\x1b[0m    Toppings of Menu by type: [\x1b[36m-l -t\x1b[0m|\x1b[36m-l --toppings\x1b[0m]',

        }

                let centered = `\x1b[36mNAME\x1b[0m
    \x1b[36mmenu\x1b[0m - Application menu and menu details 

\x1b[36mSYPNOSIS\x1b[0m
    \x1b[36mmenu\x1b[0m [\x1b[36m--load\x1b[0m|\x1b[36m-l\x1b[0m] [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 
    \x1b[36mmenu\x1b[0m [\x1b[36m-T \x1b[0m|\x1b[36m--type=\x1b[0m]\x1b[4mtype\x1b[0m [\x1b[36m-s\x1b[0m|\x1b[36m--sizes\x1b[0m|\x1b[36m-t\x1b[0m|\x1b[36m--toppings\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 

\x1b[36mDESCRIPTION\x1b[0m
    Application menu and a menu object details. All menu items or a single menu can be viewed in 
    two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
    depending on how you want to view it. A single menu item is selected by type. A single item
    can also be selected by type by size by price or by type by toppings.
 `
 this.centered(`\x1b[32mMENU COMMANDS AND USAGE MANUAL\x1b[0m`)
 this.description(centered)
 this.verticalSpace(2)

 let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, menucommands)
 console.log()
             }


            if(event === 'man man'){
                console.clear()
                if (command.length !== 7) return this.emit('error', {
                    error: `'${string}' is not command.`
                })
                        
        const mancommands = {
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
 this.texAligner(options, mancommands)
 console.log()
            }

            if(event === 'man help'){
                console.clear()
                if (command.length !== 8) return this.emit('error', {
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

            if (event === 'man users') {
                console.clear()
                if (command.length !== 9) return this.emit('error', {
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
 this.centered(`\x1b[32mUSERS COMMANDS AND USAGE MANUAL\x1b[0m`)
 this.description(centered)
 this.verticalSpace(2)

 let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
 this.texAligner(options, usercommands)
 console.log()
            }

            if (event === 'man stats') {
                console.clear()
                if (command.length !== 9) return this.emit('error', {
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
            if(event ==='man orders'){
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
    \x1b[36morders\x1b[0m - Application orders and an order's details 

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
    Application orders and a user's orders details. An order or a set of orders can be viewed in 
    two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
    depending on how you want to view it. A single order is selected by id (order id). A single order
    can also be selected by id by date, by id by card, by id by products by shipping by card and so on.
    A set of orders can be selected by phone or by email. A set of orders can also be
    selected by phone by date or by email by date with or without the Json options and so on.`

    this.centered(`\x1b[32mORDERS COMMANDS HELP AND USAGE MANUAL\x1b[0m`)
    this.description(centered)
    this.verticalSpace(2)
    let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
    this.texAligner(options, commands)
    console.log()
            }
        })         
    }
     
}


module.exports = ManCommand






'use strict'
const ByEmail = require('./byEmail')

class Command extends ByEmail{
    constructor(){
        super()
        this.autobind(Command)
        this.autoinvoker(Command)
        this.setMaxListeners(Infinity)
    }

    ongetuserbyevent(string){
        string = this.clean(string)
        // Phone
        if (string.trim().startsWith('users -g -p')) {
            if (string.trim().length > 'users -g -p'.length) {
                // this.userphonejson(string,'users -g -p' )
                this.getUserByPhone(string, '-g -p')
            }
            else if(string.trim() ==='users -g -p'){
                 let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-g -p'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                 let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m`
                 console.log()
                 console.log(error)
                 console.log(usage)
                 this.verticalSpace()
                 return 
            }
            else{
                this.removeDuplicateListeners('users:error')
                return this.emit('users:phone:error', {error: `'${string}' is not a users phone command`})
            }
            // if(string.trim() ==='users -g -p'){
            //     this.usermanphoneinfo(string)
            // }
        } else if (string.trim().startsWith('users -g --phone=')) {
            if (string.trim().length > 'users -g --phone='.length) {
                this.getUserByPhone(string, '-g --phone=')
                // this.userphonejson(string,'users -g --phone=' )
            }
            else if(string.trim() ==='users -g --phone='){
                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-g --phone='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-g --phone=\x1b[0m\x1b[4mphone\x1b[0m`
                console.log()
                console.log(error)
                console.log(usage)
                this.verticalSpace()
                return 
            }
            else{
                this.removeDuplicateListeners('users:error')
                return this.emit('users:phone:error', {error: `'${string}' is not a users phone command`})
            }
        
        } else if (string.trim().startsWith('users --get -p')) {
      
            if (string.trim().length > 'users --get -p'.length) {
                // this.userphonejson(string,'users --get -p' )
                this.getUserByPhone(string, '--get -p')
            }
            else if(string.trim() ==='users --get -p'){
                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--get -p'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m`
                console.log()
                console.log(error)
                console.log(usage)
                this.verticalSpace()
                return 
            }
            else{
                this.removeDuplicateListeners('users:error')
                return this.emit('users:phone:error', {error: `'${string}' is not  a users command`})
            }
           
        } else if (string.trim().startsWith('users --get --phone=')) {
            if(string.trim().length > 'users --get --phone='.length){
                this.getUserByPhone(string, '--get --phone=')
            }
            else if(string.trim() ==='users --get --phone='){
                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--get --phone='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m`
                console.log()
                console.log(error)
                console.log(usage)
                this.verticalSpace()
                return 
            }
            else{
                this.removeDuplicateListeners('users:error')
                return this.emit('users:phone:error', {error: `'${string}' is not a users phone command`})
            }
          
        } 
        else if (string.trim().startsWith('users --delete --phone=')) {
            if (string.trim().length  === 'users --delete --phone=3852045167'.length) {
                // this.userphonejson(string,'users --get -p' )
                this.getUserByPhone(string, '--delete --phone=')
            }
            else if(string.trim() ==='users --delete --phone='){
                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--delete --phone='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m`
                console.log()
                console.log(error)
                console.log(usage)
                this.verticalSpace()
                return 
            }
            else{
                this.removeDuplicateListeners('users:error')
                return this.emit('users:phone:error', {error: `'${string}' is not a users phone command`})
            }
           
        } 
        else if (string.trim().startsWith('users --delete -p')) {
            if (string.trim().length  === 'users --delete -p 3852045167'.length) {
                // this.userphonejson(string,'users --get -p' )
                this.getUserByPhone(string, '--delete -p')
            }
            else if(string.trim() ==='users --delete -p'){
                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--delete -p'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m`
                console.log()
                console.log(error)
                console.log(usage)
                this.verticalSpace()
                return 
            }
            else{
                this.removeDuplicateListeners('users:error')
                return this.emit('users:phone:error', {error: `'${string}' is not a users phone command`})
            }
          
        } 
        else if (string.trim().startsWith('users -d --phone=')) {
            if (string.trim().length  === 'users -d --phone=3852045167'.length) {
                // this.userphonejson(string,'users --get -p' )
                this.getUserByPhone(string, '-d --phone=')
            }
            else if(string.trim() ==='users -d --phone='){
                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-d --phone='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m`
                console.log()
                console.log(error)
                console.log(usage)
                this.verticalSpace()
                return 
            }
            else{
                this.removeDuplicateListeners('users:error')
                return this.emit('users:phone:error', {error: `'${string}' is not a users phone command`})
            }
           
        } 
        else if (string.trim().startsWith('users -d -p')) {
            if (string.trim().length  === 'users -d -p 3852045167'.length) {
                // this.userphonejson(string,'users --get -p' )
                this.getUserByPhone(string, '-d -p')
            }
            else if(string.trim() ==='users -d -p'){
                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-g -p'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m`
                console.log()
                console.log(error)
                console.log(usage)
                this.verticalSpace()
                return 
            }
            else{
                this.emit('users:phone:error', {error: `'${string}' is not a users phone command`})
            }
          
        }

    // Email
    else if (string.trim().startsWith('users -g -e')) {
        if (string.trim().length > 'users -g -e'.length) {
            // this.userphonejson(string,'users -g -e' )
            return this.getUserByEmail(string, '-g -e')
        }
        else if(string.trim() ==='users -g -e'){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-g -e'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-g -e \x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
        this.removeDuplicateListeners('users:error')
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    } else if (string.trim().startsWith('users -g --email=')) {
        if (string.trim().length > 'users -g --email='.length) {
            return this.getUserByEmail(string, '-g --email=')
            // this.userphonejson(string,'users -g --email=' )
        }
        else if(string.trim() ==='users -g --email='){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-g --email='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-g --email=\x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
        this.removeDuplicateListeners('users:error')
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    } else if (string.trim().startsWith('users --get -e')) {
        if (string.trim().length > 'users --get -e'.length) {
            // this.userphonejson(string,'users --get -e' )
            return this.getUserByEmail(string, '--get -e')
        }
        else if(string.trim() ==='users --get -e'){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--get -e'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--get -e \x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
        this.removeDuplicateListeners('users:error')
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    } else if (string.trim().startsWith('users --get --email=')) {
        if(string.trim().length > 'users --get --email='.length){
           return this.getUserByEmail(string, '--get --email=')
        }
        else if(string.trim() ==='users --get --email='){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--get --email='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--get --email=\x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
        this.removeDuplicateListeners('users:error')
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    } 
    else if (string.trim().startsWith('users --delete --email=')) {
        if (string.trim().length  === 'users --delete --email=3852045167'.length) {
            // this.userphonejson(string,'users --get -e' )
            return this.getUserByEmail(string, '--delete --email=')
        }
        else if(string.trim() ==='users --delete --email='){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--delete --email'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--delete --email=\x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
        this.removeDuplicateListeners('users:error')
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    } 
    else if (string.trim().startsWith('users --delete -e')) {
        if (string.trim().length  === 'users --delete -e 3852045167'.length) {
            // this.userphonejson(string,'users --get -e' )
            return this.getUserByEmail(string, '--delete -e')
        }
        else if(string.trim() ==='users --delete -e'){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--delete -e'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--delete -e \x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
        this.removeDuplicateListeners('users:error')
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    } 
    else if (string.trim().startsWith('users -d --email=')) {
        if (string.trim().length  === 'users -d --email=3852045167'.length) {
            // this.userphonejson(string,'users --get -e' )
            return this.getUserByEmail(string, '-d --email=')
        }
        else if(string.trim() ==='users -d --email='){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-d --email='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-d --email=\x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
        this.removeDuplicateListeners('users:error')
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    } 
    else if (string.trim().startsWith('users -d -e')) {
        if (string.trim().length  === 'users -d -e 3852045167'.length) {
            // this.userphonejson(string,'users --get -e' )
            return this.getUserByEmail(string, '-d -e')
        }
        else if(string.trim() ==='users -d -e'){
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-d -e'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-d -e \x1b[0m\x1b[4memail\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return 
       }
       else{
           return this.emit('users:email:error', {error: `'${string}' is not a users email command`})
       }
    }
    else if (string.trim().startsWith('users --load') === true || string.trim().startsWith('users -l') === true) {
        if (string.trim() === 'users --load --json --depth=') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--load --json --depth='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--load --json --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }
        if (string.trim() === 'users --load -j --depth=') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--load -j --depth='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--load -j --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }

        if (string.trim() === 'users --load --json -d') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--load --json -d'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--load --json -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }
        if (string.trim() === 'users --load -j -d') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '--load -j -d'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m--load -j -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }



        if (string.trim() === 'users -l --json --depth=') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-l --json --depth='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-l --json --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }
        if (string.trim() === 'users -l -j --depth=') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-l -j --depth='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-l -j --depth=\x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }


        if (string.trim() === 'users -l --json -d') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-l --json -d'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-l --json -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }
        if (string.trim() === 'users -l -j -d') {
            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '-l -j -d'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m-l -j -d \x1b[0m\x1b[4mdepth_level\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            this.verticalSpace()
            return
        }
        if(string.trim() === 'users --load' || string.trim() ==='users -l'){}
         else {
            return this.emit('users:email:error', {
                error: `'${string}' is not a users email command`
            })
        }
    }
    else{
        if(string.trim().startsWith('users') === true){}
        else{
            return this.emit('users:error', {
                error: `'${string}' is not a users command`
            })
        }       
    }
    }
    onuserscommand(){
        this.on('users', async string =>{
            
            string = this.clean(string)
            if (this.auth === false) {
                if (string.startsWith('users') && string.length > 'users'.length) {
                    if (string !== 'users -h' && string !== 'users --help') {

                        return this.emit('users:warning', {
                            error: 'You must be logged in to do this.'
                        })

                    }
                }
            }else{
                this.ongetuserbyevent(string)
                this.onglobalusermatch(string)
            }
           
        })
    }
}

module.exports = Command
'use strict'

const Users  = require('./')

const {createReadStream, promises} = require('fs')

class ByPhone extends Users {
    constructor(){
        super()
        this.autobind(ByPhone)
        this.autoinvoker(ByPhone)
        this.setMaxListeners(Infinity)
    }

   // users --get --phone=3852045167
    onprocessphonecommand(command, code){
        // let cmd = this.spliter(command[0], '--get --phone=')
        let cmd = this.spliter(command[0], code)
        let cmds = this.spliter(cmd[0], ' ')
        let phone = cmds[0]
        let options = []

        if(this.isValid(this.regexes().phoneregex, phone) === false){
            return this.emit('users:phone:error', {
                error: `'${phone}' is not a valid phone number.`
            })
        }
           if (phone.length !== 10 || typeof parseInt(phone.trim(), 10) !== 'number') {
            return this.emit('users:phone:error', {
                error: `'${phone}' is not a valid phone number.`
            })
        }    
        cmds.shift()
       if(cmds.length === 0){
        this.ongetuserbyphoneevent(phone, 'users:user-found')
        this.once('users:user-found', user => {

            let counter = 0
            if (user.orders && user.orders.length > 0) {
                user.data = []
                let dim = user.orders.length
                for (let id of user.orders) {
                    this.on('users:user-order-found', order => {
                        counter++
                        user.data.push(order.order)
                        if (counter === dim) {
                            this.emit('users:user-orders-found', user)
    
                        }
                    })
                    this.ongetorderbyid(id, 'users:user-order-found')
                }
                this.ondisplayuser('users:user-orders-found')
            } else {
                this.ondisplayuser('users:user-found-with-no-records')
                this.emit('users:user-found-with-no-records', user)
            }
        })
        }
       if (cmds.length > 0) {
           // users --get --phone=3852045167 -b -s -r -b -o -j -d 0
           let jsonned
           if (cmds.length > 8) {
               return this.emit('users:phone:error', {
                   error: `TO MANY ARGUMENTS. MUST NOT BE MORE THAN 8`
               })
           }
           // users --get --phone=3852045167 -b -s
           let tabular = this.onarraywalk(cmds, this.userDetailsEvents(), false)
           let equal = cmds.filter(str => str.includes('='))
           let noequal = this.exclude(tabular, cmds.filter(str => !str.includes('=')), false)
           let invalidnoequal = this.exclude(this.jsonEventList(), noequal, true)

           if (equal.length > 1) {
               return this.emit('users:phone:error', {
                   error: `'${equal.join(' ')}' is not a valid JSON option.`
               })
           }
           if (equal && equal.length === 1) {
               let jsoncode = this.spliter(equal[0], '=')
               if (jsoncode[0] !== '--depth') {
                   return this.emit('users:phone:error', {
                       error: `'${jsoncode[0]}' is not a valid JSON option.`
                   })
               }
               
               if(this.isValid(this.regexes().positivenumber, jsoncode[1]) === false){
                if(jsoncode[1] === undefined){
                 return this.emit('users:phone:error', {
                     error: `'${noequal[0]} ${jsoncode[0]}=' requires an argument`
                 })
                }
                if(jsoncode[1] !== undefined){
                 return this.emit('users:phone:error', {
                     error: `'${jsoncode[1]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
                 })
                }
             }
           }
           if (noequal.length > 3) {
               return this.emit('users:phone:error', {
                   error: `'${noequal.join(' ')}' is not a valid JSON option.`
               })
           }

           // if equal.length === 0 and noequal.length === 0

           if (equal.length === 0 && noequal.length === 0) {
               if (tabular.length > 4) {
                   return this.emit('users:phone:error', {
                       error: `'${tabular.join(' ')}' is not a valid option for 'users ${event}'`
                   })
               }

               

               for (let cmd of tabular) {
                   if (cmd === '-r' || cmd === '--records') {
                       if (cmds.find(str => str === '-r') !== undefined) {
                           if (cmds.find(str => str === '--records') !== undefined) {
                               return this.emit('users:phone:error', {
                                   error: `Records option duplicated: both '-r' and '--records' are present.`
                               })
                           }
                       }
                       options.push('r')
                   }
                   if (cmd === '-o' || cmd === '-orders') {
                       if (cmds.find(str => str === '-o') !== undefined) {
                           if (cmds.find(str => str === '--orders') !== undefined) {
                               return this.emit('users:phone:error', {
                                   error: `Records option duplicated: both '-o' and '--orders' are present.`
                               })
                           }
                       }
                       options.push('o')
                   }
                   if (cmd === '-b' || cmd === '--billing') {
                       if (cmds.find(str => str === '-b') !== undefined) {
                           if (cmds.find(str => str === '--billing') !== undefined) {
                               return this.emit('users:phone:error', {
                                   error: `Records option duplicated: both '-b' and '--billing' are present.`
                               })
                           }
                       }
                       options.push('b')
                   }
                   if (cmd === '-s' || cmd === '--shipping') {
                       if (cmds.find(str => str === '-s') !== undefined) {
                           if (cmds.find(str => str === '--shipping') !== undefined) {
                               return this.emit('users:phone:error', {
                                   error: `Records option duplicated: both '-s' and '--shipping' are present.`
                               })
                           }
                       }
                       options.push('s')
                   }
               }

               this.ongetuserbyphoneevent(phone, 'users:user-found')
               this.once('users:user-found', user => {
                   let counter = 0
                   if (user.orders && user.orders.length > 0) {
                       user.data = []
                       let dim = user.orders.length
                       for (let id of user.orders) {
                           this.on('users:user-order-found', order => {
                               counter++
                               user.data.push(order.order)
                               user.options = options
                               user.jsonned = jsonned
                               if (counter === dim) {
                                   this.emit('users:user-orders-found', user)
                               }
                           })
                           this.ongetorderbyid(id, 'users:user-order-found')
                       }
                       this.ondisplayuser('users:user-orders-found')
                   } else {
                       user.jsonned = jsonned
                       this.ondisplayuser('users:user-found-with-no-records')
                       this.emit('users:user-found-with-no-records', user)
                   }
               })
           }else if(noequal.length > 0 && equal.length === 0){
            
                if(noequal.length === 1){
                    if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                        return this.emit('users:phone:error', {error: `'${noequal[0]}' is not valid JSON option`})
                    }
                    jsonned = {json: noequal[0],depth: Infinity}

                    for (let cmd of tabular) {
                        if (cmd === '-r' || cmd === '--records') {
                            if (cmds.find(str => str === '-r') !== undefined) {
                                if (cmds.find(str => str === '--records') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-r' and '--records' are present.`
                                    })
                                }
                            }
                            options.push('r')
                        }
                        if (cmd === '-o' || cmd === '-orders') {
                            if (cmds.find(str => str === '-o') !== undefined) {
                                if (cmds.find(str => str === '--orders') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-o' and '--orders' are present.`
                                    })
                                }
                            }
                            options.push('o')
                        }
                        if (cmd === '-b' || cmd === '--billing') {
                            if (cmds.find(str => str === '-b') !== undefined) {
                                if (cmds.find(str => str === '--billing') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-b' and '--billing' are present.`
                                    })
                                }
                            }
                            options.push('b')
                        }
                        if (cmd === '-s' || cmd === '--shipping') {
                            if (cmds.find(str => str === '-s') !== undefined) {
                                if (cmds.find(str => str === '--shipping') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-s' and '--shipping' are present.`
                                    })
                                }
                            }
                            options.push('s')
                        }
                    }
 
                  
                    this.ongetuserbyphoneevent(phone, 'users:user-found')
                    this.once('users:user-found', user => {
                    
                        let counter = 0
                        if (user.orders && user.orders.length > 0) {
                            user.data = []
                            let dim = user.orders.length
                            for (let id of user.orders) {
                                this.on('users:user-order-found', order => {
                                    counter++
                                    user.data.push(order.order)
                                    user.options = options
                                    user.jsonned = jsonned
                                    
                                    if (counter === dim) {
                                        this.emit('users:user-orders-found', user)
                                    }
                                })
                                this.ongetorderbyid(id, 'users:user-order-found')
                            }
                       
                            this.ondisplayuser('users:user-orders-found')
                        } else {
                            user.jsonned = jsonned
                            this.ondisplayuser('users:user-found-with-no-records')
                            this.emit('users:user-found-with-no-records', user)
                        }
                    })
                    
                }
                if(noequal.length === 2){
                   if(this.jsonEventList().find(val => (val === noequal.join(' '))) !== undefined){
                    // return this.emit('users:phone:error', {error: `'${noequal.join(' ')}' requires an argument`}) 
                    let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31musers '${noequal.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                    let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36musers\x1b[0m \x1b[36m${noequal.join(' ')} \x1b[0m\x1b[4mphone\x1b[0m`
                    console.log()
                    console.log(error)
                    console.log(usage)
                    this.verticalSpace()
                    return 
                   }else{
                    return this.emit('users:phone:error', {error: `'${noequal.join(' ')}' is not valid JSON command`}) 
                   }
                }
                if(noequal.length === 3){

                    let depth = noequal.filter(str => this.isNumber(str))
                    let jcodes = noequal.filter(str => this.isNotNumber(str))
                 
                    let first = `${jcodes[0]} ${jcodes[1]}`
                    let second = `${jcodes[1]} ${jcodes[0]}`
                    
            
                    if(jcodes.length === 0 || jcodes.length !== 2){
                        return this.emit('users:phone:error', {error: `'${jcodes.join(' ')}' is not valid JSON option `})
                    }
                    if(depth.length === 0 || depth.length > 1){
                        return this.emit('users:phone:error', {error: `'${depth.join(' ')}' is not valid JSON option.`})
                    }
                    if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                        return this.emit('users:phone:error', {
                            error: `'${depth[0]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
                        })
                    }
                    if(this.jsonEventList().find(str => str === first) !== undefined){
                        jsonned = {json: first, depth: depth[0]}
                    }else if(this.jsonEventList().find(str => str === second) !== undefined){
                        jsonned = {json: second, depth: depth[0]}
                    }else{
                        return this.emit('users:phone:error', {error: `'${noequal.join(' ')}' is not valid JSON option.mok`})
                    }
                  
                    for (let cmd of tabular) {
                        if (cmd === '-r' || cmd === '--records') {
                            if (cmds.find(str => str === '-r') !== undefined) {
                                if (cmds.find(str => str === '--records') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-r' and '--records' are present.`
                                    })
                                }
                            }
                            options.push('r')
                        }
                        if (cmd === '-o' || cmd === '-orders') {
                            if (cmds.find(str => str === '-o') !== undefined) {
                                if (cmds.find(str => str === '--orders') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-o' and '--orders' are present.`
                                    })
                                }
                            }
                            options.push('o')
                        }
                        if (cmd === '-b' || cmd === '--billing') {
                            if (cmds.find(str => str === '-b') !== undefined) {
                                if (cmds.find(str => str === '--billing') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-b' and '--billing' are present.`
                                    })
                                }
                            }
                            options.push('b')
                        }
                        if (cmd === '-s' || cmd === '--shipping') {
                            if (cmds.find(str => str === '-s') !== undefined) {
                                if (cmds.find(str => str === '--shipping') !== undefined) {
                                    return this.emit('users:phone:error', {
                                        error: `Records option duplicated: both '-s' and '--shipping' are present.`
                                    })
                                }
                            }
                            options.push('s')
                        }
                    }

                    this.ongetuserbyphoneevent(phone, 'users:user-found')
                    this.once('users:user-found', user => {
                        let counter = 0
                        if (user.orders && user.orders.length > 0) {
                            user.data = []
                            let dim = user.orders.length
                            for (let id of user.orders) {
                                this.on('users:user-order-found', order => {
                                    counter++
                                    user.data.push(order.order)
                                    user.options = options
                                    user.jsonned = jsonned
                                    if (counter === dim) {
                                        this.emit('users:user-orders-found', user)
                                    }
                                })
                                this.ongetorderbyid(id, 'users:user-order-found')
                            }
                            this.ondisplayuser('users:user-orders-found')
                        } else {
                            user.jsonned = jsonned
                            this.ondisplayuser('users:user-found-with-no-records')
                            this.emit('users:user-found-with-no-records', user)
                        }
                    })     
                }
           }else if(equal.length === 1 && noequal.length === 0){
             
           }else if(equal.length === 1 && noequal.length > 0){
              if(noequal.length !== 1 && (noequal[0] !=='-j' || noequal[0] !== '--json')){
                return this.emit('users:phone:error', {error: `'${noequal.join(' ')}' is not valid JSON option.. `})
              }
              let jcode = this.spliter(equal[0], '=')
              
              if(jcode[0] !== '--depth'){
                return this.emit('users:phone:error', {error: `'${jcode[0]}' is not valid JSON option`})
              }
              
              if(this.isValid(this.regexes().positivenumber, jcode[1]) === false){
               if(jcode[1] === undefined){
                return this.emit('users:phone:error', {
                    error: `'${noequal[0]} ${jcode[0]}=' requires an argument`
                })
               }
               if(jcode[1] !== undefined){
                return this.emit('users:phone:error', {
                    error: `'${jcode[1]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
                })
               }
            }
            jsonned = {json: `${noequal[0]} ${jcode[0]}=`, depth: jcode[1]}

           
            for (let cmd of tabular) {
                if (cmd === '-r' || cmd === '--records') {
                    if (cmds.find(str => str === '-r') !== undefined) {
                        if (cmds.find(str => str === '--records') !== undefined) {
                            return this.emit('users:phone:error', {
                                error: `Records option duplicated: both '-r' and '--records' are present.`
                            })
                        }
                    }
                    options.push('r')
                }
                if (cmd === '-o' || cmd === '-orders') {
                    if (cmds.find(str => str === '-o') !== undefined) {
                        if (cmds.find(str => str === '--orders') !== undefined) {
                            return this.emit('users:phone:error', {
                                error: `Records option duplicated: both '-o' and '--orders' are present.`
                            })
                        }
                    }
                    options.push('o')
                }
                if (cmd === '-b' || cmd === '--billing') {
                    if (cmds.find(str => str === '-b') !== undefined) {
                        if (cmds.find(str => str === '--billing') !== undefined) {
                            return this.emit('users:phone:error', {
                                error: `Records option duplicated: both '-b' and '--billing' are present.`
                            })
                        }
                    }
                    options.push('b')
                }
                if (cmd === '-s' || cmd === '--shipping') {
                    if (cmds.find(str => str === '-s') !== undefined) {
                        if (cmds.find(str => str === '--shipping') !== undefined) {
                            return this.emit('users:phone:error', {
                                error: `Records option duplicated: both '-s' and '--shipping' are present.`
                            })
                        }
                    }
                    options.push('s')
                }
            }

           
            this.ongetuserbyphoneevent(phone, 'users:user-found')
            this.once('users:user-found', user => {
                let counter = 0
                if (user.orders && user.orders.length > 0) {
                    user.data = []
                    let dim = user.orders.length
                    for (let id of user.orders) {
                        this.on('users:user-order-found', order => {
                            counter++
                            user.data.push(order.order)
                            user.options = options
                            user.jsonned = jsonned
                            if (counter === dim) {
                                this.emit('users:user-orders-found', user)
                            }
                        })
                        this.ongetorderbyid(id, 'users:user-order-found')
                    }
                    this.ondisplayuser('users:user-orders-found')
                } else {
                    user.jsonned = jsonned
                    this.ondisplayuser('users:user-found-with-no-records')
                    this.emit('users:user-found-with-no-records', user)
                }
            })

           }else{
                console.log('I am not too sure about this')
           }
       }else{
           //console.log('CMDS LENGH IS LESS THAN ZERO ')
       }
    }
    ondeleteusercommand(command, event){
        let cmd = this.spliter(command[0], event)
            let cmds = this.spliter(cmd[0], ' ')
            let phone = cmds[0]

            if (this.isValid(this.regexes().phoneregex, phone) === false) {
                return this.emit('error', {
                    error: `'${phone}' is not a valid phone number.`
                })
            }
            if (phone.trim().length !== 10 || this.isNotNumber(phone)) {
                return this.emit('error', {
                    error: `'${phone}' is not a valid phone number.`
                })
            }
          

            let path = `${this.base()}/users/${phone}.json`
            promises.unlink(path)
                .then(() => {
                    this.emit('success', {
                        message: `User deleted.`
                    })
                })
                .catch(error => {
                    this.emit('error', {
                        error: `User with this phone number does not even exist.`
                    })
                })
    }

    async getUserByPhone(string, event) {
        let command = this.spliter(string, 'users')

        if (event.startsWith('-d') || event.startsWith('--delete')) {
            return this.ondeleteusercommand(command, event)
        }
        if (event.startsWith('-g') || event.startsWith('--get')) {
            return this.onprocessphonecommand(command, event)
        }
    }
    usermanphoneinfo(string){
        string = this.clean(string)
        if(string === 'users --get --phone='){
            let error = `\x1b[31musers: users \x1b[31m '--get --phone='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(string === 'users --get -p'){
            console.log('here ', string)
            let error = `\x1b[31musers: users \x1b[31m '--get -p'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m--get -p \x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(string === 'users -g --phone='){
            let error = `\x1b[31musers: users \x1b[31m '-g --phone='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m--get --phone=\x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(string === 'users -g -p'){
            let error = `\x1b[31musers: users \x1b[31m '-g -p'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m-g -p \x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(string === 'users -d -p'){
            let error = `\x1b[31musers: users \x1b[31m '-d -p'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m-d -p \x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(string === 'users -d --phone='){
            let error = `\x1b[31musers: users \x1b[31m '-d --phone='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m-d --phone=\x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(string === 'users --delete -p'){
            let error = `\x1b[31musers: users \x1b[31m '--delete -p'\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m--delete -p \x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        if(string === 'users --delete --phone='){
            let error = `\x1b[31musers: users \x1b[31m '--delete --phone='\x1b[0m \x1b[31moption requires a valid argument!\x1b[0m`
            let usage = `\x1b[32mUsage: \x1b[36musers\x1b[0m  \x1b[36m--delete --phone=\x1b[0m\x1b[4mphone\x1b[0m`
            console.log()
            console.log(error)
            console.log(usage)
            console.log()
            return 
        }
        
    }
}

module.exports = ByPhone
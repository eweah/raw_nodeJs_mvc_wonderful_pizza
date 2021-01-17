'use strict'

const ByPhone = require('./byPhone')

const {createReadStream, promises} = require('fs')

class ByEmail extends ByPhone{
    constructor(){
        super()
        this.autobind(ByEmail)
        this.autoinvoker(ByEmail)
        this.setMaxListeners(Infinity)
    }
        onprocessemailcommand(command, code){
            // let cmd = this.spliter(command[0], '--get --phone=')
            let cmd = this.spliter(command[0], code)
            let cmds = this.spliter(cmd[0], ' ')
            let email = cmds[0]
            let options = []

            if(this.isValid(this.regexes().emailregex, email) === false){
                return this.emit('users:email:error', {
                    error: `'${email}' is not a valid email address.`
                })
            }
           cmds.shift()
           if(cmds.length === 0){
            this.ongetuserbyemailevent(email, 'users:user-found')
            this.once('users:user-found', user => {
                user.code = email
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
                   return this.emit('users:email:error', {
                       error: `TO MANY ARGUMENTS. MUST NOT BE MORE THAN 8`
                   })
               }
               // users --get --phone=3852045167 -b -s
               let tabular = this.onarraywalk(cmds, this.userDetailsEvents(), false)
               let equal = cmds.filter(str => str.includes('='))
               let noequal = this.exclude(tabular, cmds.filter(str => !str.includes('=')), false)
               let invalidnoequal = this.exclude(this.jsonEventList(), noequal, true)
    
               if (equal.length > 1) {
                   return this.emit('users:email:error', {
                       error: `'${equal.join(' ')}' is not a valid JSON option.`
                   })
               }
               if (equal && equal.length === 1) {
                   let jsoncode = this.spliter(equal[0], '=')
                   if (jsoncode[0] !== '--depth') {
                       return this.emit('users:email:error', {
                           error: `'${jsoncode[0]}' is not a valid JSON option.`
                       })
                   }
                   
                   if(this.isValid(this.regexes().positivenumber, jsoncode[1]) === false){
                    if(jsoncode[1] === undefined){
                     return this.emit('users:email:error', {
                         error: `'${noequal[0]} ${jsoncode[0]}=' requires an argument`
                     })
                    }
                    if(jsoncode[1] !== undefined){
                     return this.emit('users:email:error', {
                         error: `'${jsoncode[1]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
                     })
                    }
                 }
               }
               if (noequal.length > 3) {
                   return this.emit('users:email:error', {
                       error: `'${noequal.join(' ')}' is not a valid JSON option.`
                   })
               }
    
               // if equal.length === 0 and noequal.length === 0
    
               if (equal.length === 0 && noequal.length === 0) {
                   if (tabular.length > 4) {
                       return this.emit('users:email:error', {
                           error: `'${tabular.join(' ')}' is not a valid option for 'users ${event}'`
                       })
                   }
    
                   for (let cmd of tabular) {
                       if (cmd === '-r' || cmd === '--records') {
                           if (cmds.find(str => str === '-r') !== undefined) {
                               if (cmds.find(str => str === '--records') !== undefined) {
                                   return this.emit('users:email:error', {
                                       error: `Records option duplicated: both '-r' and '--records' are present.`
                                   })
                               }
                           }
                           options.push('r')
                       }
                       if (cmd === '-o' || cmd === '-orders') {
                           if (cmds.find(str => str === '-o') !== undefined) {
                               if (cmds.find(str => str === '--orders') !== undefined) {
                                   return this.emit('users:email:error', {
                                       error: `Records option duplicated: both '-o' and '--orders' are present.`
                                   })
                               }
                           }
                           options.push('o')
                       }
                       if (cmd === '-b' || cmd === '--billing') {
                           if (cmds.find(str => str === '-b') !== undefined) {
                               if (cmds.find(str => str === '--billing') !== undefined) {
                                   return this.emit('users:email:error', {
                                       error: `Records option duplicated: both '-b' and '--billing' are present.`
                                   })
                               }
                           }
                           options.push('b')
                       }
                       if (cmd === '-s' || cmd === '--shipping') {
                           if (cmds.find(str => str === '-s') !== undefined) {
                               if (cmds.find(str => str === '--shipping') !== undefined) {
                                   return this.emit('users:email:error', {
                                       error: `Records option duplicated: both '-s' and '--shipping' are present.`
                                   })
                               }
                           }
                           options.push('s')
                       }
                   }
    
                   this.ongetuserbyemailevent(email, 'users:user-found')
                   this.once('users:user-found', user => {
                     user.code = email
                       let counter = 0
                       if (user.orders && user.orders.length > 0) {
                           user.data = []
                           let dim = user.orders.length
                           for (let id of user.orders) {
                               this.on('users:user-order-found', order => {
                                   counter++
                                   user.data.push(order.order)
                                   user.options = options
                                   if (counter === dim) {
                                       this.emit('users:user-orders-found', user)
                                   }
                               })
                               this.ongetorderbyid(id, 'users:user-order-found')
                           }
                           this.ondisplayuser('users:user-orders-found')
                       } else {
                           user.jsonned = jsonned
                           user.code = email
                           this.ondisplayuser('users:user-found-with-no-records')
                           this.emit('users:user-found-with-no-records', user)
                       }
                   })
               }else if(noequal.length > 0 && equal.length === 0){
                
                    if(noequal.length === 1){
                        if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                            return this.emit('users:email:error', {error: `'${noequal[0]}' is not valid JSON option`})
                        }
                        jsonned = {json: noequal[0],depth: Infinity}
    
                        for (let cmd of tabular) {
                            if (cmd === '-r' || cmd === '--records') {
                                if (cmds.find(str => str === '-r') !== undefined) {
                                    if (cmds.find(str => str === '--records') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-r' and '--records' are present.`
                                        })
                                    }
                                }
                                options.push('r')
                            }
                            if (cmd === '-o' || cmd === '-orders') {
                                if (cmds.find(str => str === '-o') !== undefined) {
                                    if (cmds.find(str => str === '--orders') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-o' and '--orders' are present.`
                                        })
                                    }
                                }
                                options.push('o')
                            }
                            if (cmd === '-b' || cmd === '--billing') {
                                if (cmds.find(str => str === '-b') !== undefined) {
                                    if (cmds.find(str => str === '--billing') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-b' and '--billing' are present.`
                                        })
                                    }
                                }
                                options.push('b')
                            }
                            if (cmd === '-s' || cmd === '--shipping') {
                                if (cmds.find(str => str === '-s') !== undefined) {
                                    if (cmds.find(str => str === '--shipping') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-s' and '--shipping' are present.`
                                        })
                                    }
                                }
                                options.push('s')
                            }
                        }
     
                       
                        this.ongetuserbyemailevent(email, 'users:user-found')
                        this.once('users:user-found', user => {
                            user.code = email
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
                                user.code = email
                                this.ondisplayuser('users:user-found-with-no-records')
                                this.emit('users:user-found-with-no-records', user)
                            }
                        })
                        
                    }
                    if(noequal.length === 2){
                        return this.emit('users:email:error', {error: `'${noequal.join(' ')}' is not valid JSON command`}) 
                    }
                    if(noequal.length === 3){
    
                        let depth = noequal.filter(str => this.isNumber(str))
                        let jcodes = noequal.filter(str => this.isNotNumber(str))
                     
                        let first = `${jcodes[0]} ${jcodes[1]}`
                        let second = `${jcodes[1]} ${jcodes[0]}`
                        
                
                        if(jcodes.length === 0 || jcodes.length !== 2){
                            return this.emit('users:email:error', {error: `'${jcodes.join(' ')}' is not valid JSON option `})
                        }
                        if(depth.length === 0 || depth.length > 1){
                            return this.emit('users:email:error', {error: `'${depth.join(' ')}' is not valid JSON option ..`})
                        }
                        if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                            return this.emit('users:email:error', {
                                error: `'${depth[0]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
                            })
                        }
                        if(this.jsonEventList().find(str => str === first) !== undefined){
                            jsonned = {json: first, depth: depth[0]}
                        }else if(this.jsonEventList().find(str => str === second) !== undefined){
                            jsonned = {json: second, depth: depth[0]}
                        }else{
                            return this.emit('users:email:error', {error: `'${noequal.join(' ')}' is not valid JSON option.mok`})
                        }
                      
                        for (let cmd of tabular) {
                            if (cmd === '-r' || cmd === '--records') {
                                if (cmds.find(str => str === '-r') !== undefined) {
                                    if (cmds.find(str => str === '--records') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-r' and '--records' are present.`
                                        })
                                    }
                                }
                                options.push('r')
                            }
                            if (cmd === '-o' || cmd === '-orders') {
                                if (cmds.find(str => str === '-o') !== undefined) {
                                    if (cmds.find(str => str === '--orders') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-o' and '--orders' are present.`
                                        })
                                    }
                                }
                                options.push('o')
                            }
                            if (cmd === '-b' || cmd === '--billing') {
                                if (cmds.find(str => str === '-b') !== undefined) {
                                    if (cmds.find(str => str === '--billing') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-b' and '--billing' are present.`
                                        })
                                    }
                                }
                                options.push('b')
                            }
                            if (cmd === '-s' || cmd === '--shipping') {
                                if (cmds.find(str => str === '-s') !== undefined) {
                                    if (cmds.find(str => str === '--shipping') !== undefined) {
                                        return this.emit('users:email:error', {
                                            error: `Records option duplicated: both '-s' and '--shipping' are present.`
                                        })
                                    }
                                }
                                options.push('s')
                            }
                        }
    
                        this.ongetuserbyemailevent(email, 'users:user-found')
                        this.once('users:user-found', user => {
                            user.code = email
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
                                user.code = email
                                this.ondisplayuser('users:user-found-with-no-records')
                                this.emit('users:user-found-with-no-records', user)
                            }
                        })     
                    }
               }else if(equal.length === 1 && noequal.length === 0){}
               else if(equal.length === 1 && noequal.length > 0){
                  if(noequal.length !== 1 && (noequal[0] !=='-j' || noequal[0] !== '--json')){
                    return this.emit('users:email:error', {error: `'${noequal.join(' ')}' is not valid JSON option.. `})
                  }
                  let jcode = this.spliter(equal[0], '=')
                  
                  if(jcode[0] !== '--depth'){
                    return this.emit('users:email:error', {error: `'${jcode[0]}' is not valid JSON option`})
                  }
                  
                  if(this.isValid(this.regexes().positivenumber, jcode[1]) === false){
                   if(jcode[1] === undefined){
                    return this.emit('users:email:error', {
                        error: `'${noequal[0]} ${jcode[0]}=' requires an argument`
                    })
                   }
                   if(jcode[1] !== undefined){
                    return this.emit('users:email:error', {
                        error: `'${jcode[1]}' is not a valid option. JSON depth level must be a zero or a number greater than zero`
                    })
                   }
                }
                jsonned = {json: `${noequal[0]} ${jcode[0]}=`, depth: jcode[1]}
    
               
                for (let cmd of tabular) {
                    if (cmd === '-r' || cmd === '--records') {
                        if (cmds.find(str => str === '-r') !== undefined) {
                            if (cmds.find(str => str === '--records') !== undefined) {
                                return this.emit('users:email:error', {
                                    error: `Records option duplicated: both '-r' and '--records' are present.`
                                })
                            }
                        }
                        options.push('r')
                    }
                    if (cmd === '-o' || cmd === '-orders') {
                        if (cmds.find(str => str === '-o') !== undefined) {
                            if (cmds.find(str => str === '--orders') !== undefined) {
                                return this.emit('users:email:error', {
                                    error: `Records option duplicated: both '-o' and '--orders' are present.`
                                })
                            }
                        }
                        options.push('o')
                    }
                    if (cmd === '-b' || cmd === '--billing') {
                        if (cmds.find(str => str === '-b') !== undefined) {
                            if (cmds.find(str => str === '--billing') !== undefined) {
                                return this.emit('users:email:error', {
                                    error: `Records option duplicated: both '-b' and '--billing' are present.`
                                })
                            }
                        }
                        options.push('b')
                    }
                    if (cmd === '-s' || cmd === '--shipping') {
                        if (cmds.find(str => str === '-s') !== undefined) {
                            if (cmds.find(str => str === '--shipping') !== undefined) {
                                return this.emit('users:email:error', {
                                    error: `Records option duplicated: both '-s' and '--shipping' are present.`
                                })
                            }
                        }
                        options.push('s')
                    }
                }
           
                this.ongetuserbyemailevent(email, 'users:user-found')
                this.once('users:user-found', user => {
                    let counter = 0
                    user.code = email
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
                        user.code = email
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
    
                if (this.isValid(this.regexes().emailregex,email) === false) {
                    return this.emit('error', {
                        error: `'${email}' is not a valid email address.`
                    })
                }
                // if (phone.trim().length !== 10 || this.isNotNumber(phone)) {
                //     return this.emit('error', {
                //         error: `'${phone}' is not a valid phone number.`
                //     })
                // }
              
    
                // let path = `${this.base()}/users/${phone}.json`
                // promises.unlink(path)
                //     .then(() => {
                //         this.emit('success', {
                //             message: `User deleted.`
                //         })
                //     })
                //     .catch(error => {
                //         this.emit('error', {
                //             error: `User with this phone number does not even exist.`
                //         })
                //     })
        }
    
        async getUserByEmail(string, event) {
    
            let command = this.spliter(string, 'users')
    
            // if (event.startsWith('-d') || event.startsWith('--delete')) {
            //     return this.ondeleteusercommand(command, event)
            // }
            if (event.startsWith('-g') || event.startsWith('--get')) {
                return this.onprocessemailcommand(command, event)
            }
        }
      
}

module.exports = ByEmail
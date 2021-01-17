'use strict'

const {createReadStream,promises} = require('fs')
const path = require('path')
const util = require('util')
const store = require('../../../resources/storage/menus/store')

const CLI = require('../')

class MenuCommand extends CLI {
    constructor() {
        super()
        this.autobind(MenuCommand)
        this.autoinvoker(MenuCommand)
        this.setMaxListeners(Infinity)
    }
    menus(){
       return store
    }
    types(){
        let pizzatypes = []
        for(let menu in this.menus().types){
            pizzatypes.push(menu)
        }
        return pizzatypes
    }
    menuEventList(){
        return [
            '-s', '--sizes',
            '-t', '--toppings' 
        ]
    }
    loadEventList(){
        return ['--load', '-l']
    }
    menucommands(){
        // menu --type=prairie --sizes --toppings --json --depth=0
        this.on('menu', async string => {

            string = this.clean(string)
            let jsonned, menuevents = [], equal, noequal, data = {}, command
            if(string.trim() === 'menu --load' || string.trim() === 'menu -l'){
               return this.displayMenu()
            }
            else if(string.trim() === 'menu --load -j' || string.trim() === 'menu -l -j' || string.trim() === 'menu --load --json' || string.trim() === 'menu -l --json'){
                console.clear()
                let menuoptions= {
                    string: ` ALL MENU ITEMS`,
                    number: process.stdout.columns,
                    color: 36
                }
                this.padding(menuoptions)
                return this.infos(this.menus(), Infinity)
             }else if(string.trim() !=='menu' && string.trim().startsWith('menu --type=') === false && string.trim().startsWith('menu -T') === false){
                 // menu --load --json --depth=0
                 command = this.spliter(string, ' ')
                 let cmd = this.spliter(string, ' ')
                 command.shift()
                 equal = command.filter(val => (val.includes('=')))
                 noequal = command.filter(val => (!val.includes('=')))

                 if(equal.length > 1){
                     return this.emit('menu:error', {error: `'${noequal.join(' ')}' is not a valid menu option.`})
                 }
                 if(equal.length === 1 && equal[0].startsWith('--depth=') === false){
                    return this.emit('menu:error', {error: `'${equal[0]}' is not a valid menu option.`})
                }
                 if(noequal.length > 4){
                    return this.emit('menu:error', {error: `'${noequal.join(' ')}' is not a valid menu option.`})
                }
                if(command.length !== 3 && command.length !== 4){
                    return this.emit('menu:error', {error: `'${command.join(' ')}' is not a valid menu option.`})
                }
                if(command.length === 3){
                    let jcode = this.onarraywalk(noequal, this.jsonEventList())
                    let lcode = this.onarraywalk(noequal, this.loadEventList())
                    let jscode = equal.filter(val => (val.includes('=')))
                    if(jcode[0] !== '-j' && jcode[0] !== '--json'){
                       
                        if(jscode[0] === undefined){
                            return this.emit('menu:error', {error: `'${command.join(' ')}' is not a valid menu option.`})
                        }else{
                            return this.emit('menu:error', {error: `'${jcode[0]}' is not a valid menu option.`})
                        }
                    }
                    if(lcode[0] !== '-l' && lcode[0] !== '--load'){
                        if(lcode[0] === undefined){
                            return this.emit('menu:error', {error: `'${command.join(' ')}' is not a valid menu option.`})
                        }else{
                            return this.emit('menu:error', {error: `'${lcode[0]}' is not a valid menu option.`})
                        }
                    }

                    if(jcode.length !== 1){
                        if(jcode.length === 0){
                            return this.emit('menu:error', {error: `'${command.join(' ')}' is not a valid menu option.`})
                        }else{
                            return this.emit('menu:error', {error: `'${jcode.join(' ')}' is not a valid menu option.`})
                        }
                    }
                    if(lcode.length !== 1){
                        // return this.emit('menu:error', {error: `'${lcode.join(' ')}' is not a valid menu option marco`})
                        if(jcode.length === 0){
                            return this.emit('menu:error', {error: `'${command.join(' ')}' is not a valid menu option.`})
                        }else{
                            return this.emit('menu:error', {error: `'${lcode.join(' ')}' is not a valid menu option.`})
                        }
                    }

                    if(jscode.length === 0 && equal.length !== 0){
                        return this.emit('menu:error', {error: `'${jscode.join(' ')}' is not a valid menu option.`})
                    }

                    let code = this.spliter(jscode[0], '=')[0]
                    let depth = this.spliter(jscode[0], '=')[1]

                    if(code !== '--depth'){
                 
                        const checkcmd = command => {
                            command.shift()
                            return this.jsonEventList().find(val => (val === command.join(' ')))
                        }
                       
                        if(checkcmd(command) !== undefined){
                            cmd.shift()
                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                            console.log()
                            console.log(error)
                            console.log(usage)
                            this.verticalSpace()
                            return 
                        }else{
                            return this.emit('menu:error', {error: `'${cmd.join(' ')}' is not a valid menu option`})
                        }
                        
                    }
                    if(this.isNotNumber(depth) === true){
                        if(depth === undefined){
                            cmd.shift()
                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')}\x1b[0m\x1b[4mdepth_level\x1b[0m`
                            console.log()
                            console.log(error)
                            console.log(usage)
                            this.verticalSpace()
                            return 
                        }else{
                            this.emit('menu:error', {error: `'${depth}' is not valid. Must be a number equal to zero or greater.`})
                        }
                    }
                    if(this.isValid(this.regexes().positivenumber, depth) === false){
                        return this.emit('menu:error', {error: `'${depth}' is not valid. Must be a number equal to zero or greater.`})
                    }
                    jsonned = {json: `${jcode[0]} ${code}=`, depth: depth}
                }
                if(command.length === 4){
                    // menu --load -j -d 0
                    let jcode = this.onarraywalk(noequal, this.jsonEventList())
                    let lcode = this.onarraywalk(noequal, this.loadEventList())
                    let jscode = this.exclude([...jcode,...lcode], noequal)
                    if(equal.length !== 0){
                        return this.emit('menu:error', {error: `'${equal.join(' ')}' is not a valid menu option.`})
                    }

                    let jsoncode = `${jcode[0]} ${jscode.find(val => (val === '-d'))}`
                    let jsondepth = jscode.filter(val => (val !== '-d'))
                    
                    let jss = []
                    let ld = []
                    for (let js of noequal){
                        jss.push(this.jsonEventList().find(val => val === js))
                        ld.push(this.loadEventList().find(val => val === js))
                        if(this.jsonEventList().find(val => val === js) === undefined){
                            if(js !== '-d'){
                                if(this.loadEventList().find(val => val === js) === undefined){
                                    if(this.isNotNumber(js) === true){
                                        if (js === undefined) {
                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return
                                        } else {
                                            this.emit('menu:error', {error: `'${js}' is not a valid menu option oksdfsd sdfsdfsd`})
                                        }
                                    }
                                }
                            }
                        }
                    }

                    jss = jss.filter(val => val !== undefined).map(val => val.trim())
                    ld = ld.filter(val => val !== undefined).map(val => val.trim())
                    if(jss.length > 1){
                        return this.emit('menu:error', {error: `'${jss[0]}' and '${jss[1]}' cannot be used together in the same command.`})
                    }
                    if(ld.length > 1){
                        return this.emit('menu:error', {error: `'${ld[0]}' and '${ld[1]}' cannot be used together in the same command.`})
                    }

                    if(this.jsonEventList().find(val => (val === jsoncode)) === undefined){
                        return this.emit('menu:error', {error: `'${jsoncode}' is not a valid JSON option.`})
                    }
                    if(jsondepth.length === 0 && this.jsonEventList().find(val => (val === jsoncode)) !== undefined){
                        // return this.emit('menu:error', {error: `'${jsoncode}' requires an argument`})
                        let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${jsoncode}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                        let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] ${jsoncode}  \x1b[0m\x1b[4mdepth_level\x1b[0m`
                        console.log()
                        console.log(error)
                        console.log(usage)
                        this.verticalSpace()
                        return 
                    }
                    if(jsondepth.length !== 0 && (this.isNotNumber(jsondepth[0])) === true){
                        return this.emit('menu:error', {error: `'${jsondepth}' is not valid. Must be a number equal to zero or greater`})
                    }
                    if(jsondepth.length !== 0 && (this.isNumber(jsondepth[0])) === true){
                        if(this.isValid(this.regexes().positivenumber, jsondepth[0]) === false){
                            return this.emit('menu:error', {error: `'${jsondepth}' is not valid. Must be zero or a number greater than zero`})
                        }
                    }

                    if(jsoncode !== '-j -d' && jsoncode !== '--json -d'){
                    
                        return this.emit('menu:error', {error: `'${jsoncode}' is not a valid menu option.`})
                    }
                    if(lcode[0] !== '-l' && lcode[0] !== '--load'){
                        return this.emit('menu:error', {error: `'${lcode[0]}' is not a valid menu option.`})
                    }
                    jsonned = {json: `${jsoncode}`, depth: jsondepth[0]}
                }
          
                this.verticalSpace()
                let menuoptions= {
                    string: ` ALL MENU ITEMS`,
                    number: process.stdout.columns,
                    color: 36
                }
          
                this.padding(menuoptions)
                this.infos({menu: store.types}, jsonned.depth)
             }

            else if(string.trim().startsWith('menu --type=')){
               
                let type = this.spliter(string, 'menu --type=')
                let cmd = this.spliter(string, 'menu')
                let options = this.spliter(type[0], ' ')
                let name = options.shift()
                let mevents = this.onarraywalk(options, this.menuEventList())
             
                let jevents = this.exclude(mevents, options)
               
                if(options.length === 0){
                    if (this.types().find(val => (val === name)) !== undefined) {
                        return this.displayType(name)
                    }
                    if (this.types().find(val => (val === name)) === undefined) {
                        if(string.trim() === 'menu --type='){
  
                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '--type='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m--type=\x1b[0m\x1b[4mtype\x1b[0m`
                            console.log()
                            console.log(error)
                            console.log(usage)
                            this.verticalSpace()
                            return 
                        }else{
                            return this.emit('menu:error', {
                                error: `'${name}' is not a menu type`
                            })
                        }

                    }
                }
                
                if (options.length > 0) {
                    if (this.types().find(val => (val === name)) === undefined) {
                        return this.emit('menu:error', {
                            error: `'${name}' is not a menu type`
                        })
                    }
                   
                    if(mevents && mevents.length > 0){
                        if(mevents.length > 2){
                            return this.emit('menu:error', {error: `'${mevents.join(' ')}' is not a valid menu option.`})
                        }
                        for(let _e of mevents){

                            if(_e ==='-s' || _e === '--sizes'){

                                if(jevents && jevents.length > 3){
                                    return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                }
                                if(jevents && jevents.length === 0){
                                    jsonned = {json: undefined, depth: undefined}
                                    menuevents.push('s')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name

                                }
                                if(jevents && jevents.length === 1){
                                    if(jevents[0] !== '-j' && jevents[0] !=='--json'){
                                        return this.emit('menu:error', {error: `'${jevents[0]}' is not a valid JSON option.`})
                                    }
                                    jsonned = {json: jevents[0], depth: Infinity}
                                    menuevents.push('s')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                    
                                }

                                if(jevents && jevents.length === 2){
                                    let checker, depth
                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))

                                    if(equal.length !== 1 && noequal.length !== 1){
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) === undefined){
                                            return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                        }
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) !== undefined){
                                            // return this.emit('menu:error', {error: `'${jevents.join(' ')}' require an argument.`})
                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')}\x1b[0m\x1b[4mdepth_level\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                        }
                                        
                                    }
                                    
                                    checker = this.spliter(equal[0], '=')[0]
                                    depth = this.spliter(equal[0], '=')[1]
                                   
                                    if(checker !== '--depth'){
                                        return this.emit('menu:error', {error: `'${checker}' is not a valid JSON option.`})
                                    }

                                    if(this.isNotNumber(depth)){
                                        
                                        if(depth === undefined){
                                            // return this.emit('menu:error', {error: `'${noequal[0]} ${checker}=' requires an argument`})

                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')}\x1b[0m\x1b[4mdepth_level\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                        }
                                        if(depth !== undefined){
                                            return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }

                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth) === false){
                                        return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                   
                                    if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                                        return this.emit('menu:error', {error: `'${noequal[0]}' is not a valid JSON option.`})
                                    }
                                
                                    jsonned = {json: `${noequal[0]} ${checker}=`, depth: depth}
                                    menuevents.push('s')
                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                }

                                if(jevents && jevents.length === 3){
                                    //menu --type=prairie --sizes --toppings -j -d 0
                                    let checker, depth
                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))
                                   
                                    let code1 = `${noequal[0]} ${noequal[1]}`
                                    let code2 = `${noequal[1]} ${noequal[0]}`

                                    if(equal.length !== 0 && noequal.length !== 2){
                                        return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                    }
                                    
                                    checker = noequal.filter(val => (this.isNotNumber(val)))
                                    depth = noequal.filter(val => (this.isNumber(val)))

                                    if(checker.length !== 2){
                                        return this.emit('menu:error', {error: `'${checker.join(' ')}' is not a valid JSON option.`})
                                    }
                                    if(depth.length !== 1){
                                        return this.emit('menu:error', {error: `'${depth.join(' ')}' is not a valid JSON option.`})
                                    }
                                   
                                    if(this.isNotNumber(depth[0])){
                                        
                                        if(depth[0] === undefined){
                                            if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                                // return this.emit('menu:error', {error: `'${code1} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                            
                                            }else{
                                                // return this.emit('menu:error', {error: `'${code2} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                            
                                            }
                                            
                                        }
                                        if(depth[0] !== undefined){
                                            return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }

                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                                        return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                    
                                    if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                        jsonned = {json: `${code1}`, depth: depth[0]}
                                        menuevents.push('s')
                                    }else{
                                        jsonned = {json: `${code2}`, depth: depth[0]}
                                        menuevents.push('s')
                                    }
                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                }
                                
                            }
                            if(_e === '-t' || _e === '--toppings'){
                                                                
                                if(jevents && jevents.length > 3){
                                    return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                }
                                if(jevents && jevents.length === 0){
                                    jsonned = {json: undefined, depth: undefined}
                                    menuevents.push('t')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                    
                                }
                                if(jevents && jevents.length === 1){
                                    if(jevents[0] !== '-j' && jevents[0] !=='--json'){
                                        return this.emit('menu:error', {error: `'${jevents[0]}' is not a valid JSON option.`})
                                    }
                                    jsonned = {json: jevents[0], depth: Infinity}
                                    menuevents.push('t')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                    
                                }
                                if(jevents && jevents.length === 2){
                                    let checker, depth

                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))
                                    if(equal.length !== 1 && noequal.length !== 1){
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) === undefined){
                                            return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                        }
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) !== undefined){
                                            // return this.emit('menu:error', {error: `'${jevents.join(' ')}' requires an argument`})
                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                            
                                        }
                                        
                                    }
                                    
                                    checker = this.spliter(equal[0], '=')[0]
                                    depth = this.spliter(equal[0], '=')[1]

                                    if(checker !== '--depth'){
                                        return this.emit('menu:error', {error: `'${checker}' is not a valid JSON option.`})
                                    }
                                    
                                    if(this.isNotNumber(depth)){
                                        
                                        if(depth === undefined){
                                            // return this.emit('menu:error', {error: `'${noequal[0]} ${checker}=' requires an argument`})
                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')}'\x1b[0m\x1b[4mdepth_level\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                        }
                                        if(depth !== undefined){
                                            return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }

                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth) === false){
                                        return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                  
                                    if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                                        return this.emit('menu:error', {error: `'${noequal[0]}' is not a valid JSON option.`})
                                    }

                                    jsonned = {json: `${noequal[0]} ${checker}=`, depth: depth}
                                    menuevents.push('t')
                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name

                                }

                                if(jevents && jevents.length === 3){
                             
                                    let checker, depth
                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))
                                    if(equal.length !== 0 && noequal.length !== 2){
                                        return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                    }
                                    
                                    checker = noequal.filter(val => (this.isNotNumber(val)))
                                    depth = noequal.filter(val => (this.isNumber(val)))

                                    let code1 = `${noequal[0]} ${noequal[1]}`
                                    let code2 = `${noequal[1]} ${noequal[0]}`

                                    if(checker.length !== 2){
                                        return this.emit('menu:error', {error: `'${checker.join(' ')}' is not a valid JSON option.`})
                                    }
                                    if(depth.length !== 1){
                                        return this.emit('menu:error', {error: `'${depth.join(' ')}' is not a valid JSON option`})
                                    }
                                    if(this.isNotNumber(depth[0])){
                                        
                                        if(depth[0] === undefined){
                                            if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                                // return this.emit('menu:error', {error: `'${code1} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                            }else{
                                                // return this.emit('menu:error', {error: `'${code2} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                            }
                                            
                                        }
                                        if(depth[0] !== undefined){
                                            return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }
                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                                        return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                    if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                        jsonned = {json: `${code1}`, depth: depth[0]}
                                        menuevents.push('t')
                                    }else{
                                        jsonned = {json: `${code2}`, depth: depth[0]}
                                        menuevents.push('t')
                                    }

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                }
                            }
                        }
                    }else if(mevents && menuevents.length === 0){
                        if(jevents && jevents.length > 3){
                            return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.sds`})
                        }
                        if(jevents && jevents.length === 0){
                            jsonned = {json: undefined, depth: undefined}
                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name
                            
                        }
                        if(jevents && jevents.length === 1){
                            if(jevents[0] !== '-j' && jevents[0] !=='--json'){
                                return this.emit('menu:error', {error: `'${jevents[0]}' is not a valid JSON option.`})
                            }
                            jsonned = {json: jevents[0], depth: Infinity}
                           

                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name
                            
                            
                        }
                        if(jevents && jevents.length === 2){
                            let checker, depth

                            equal = jevents.filter(val => val.includes('='))
                            noequal = jevents.filter(val => !val.includes('='))
                            if(equal.length !== 1 && noequal.length !== 1){
                                if(this.jsonEventList().find(val => (val === jevents.join(' '))) === undefined){
                                    return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                }
                                if(this.jsonEventList().find(val => (val === jevents.join(' '))) !== undefined){
                                    // return this.emit('menu:error', {error: `'${jevents.join(' ')}' requires an argument`})
                                    let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                    let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                    console.log()
                                    console.log(error)
                                    console.log(usage)
                                    this.verticalSpace()
                                    return 
                                }
                                
                            }
                            
                            checker = this.spliter(equal[0], '=')[0]
                            depth = this.spliter(equal[0], '=')[1]

                        
                    
                            if(checker !== '--depth'){
                                return this.emit('menu:error', {error: `'${checker}' is not a valid JSON option.`})
                            }
                            
                            if(this.isNotNumber(depth)){
                                
                                if(depth === undefined){
                                    // return this.emit('menu:error', {error: `'${noequal[0]} ${checker}=' requires an argument`})
                                    let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                    let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')}\x1b[0m\x1b[4mdepth_level\x1b[0m`
                                    console.log()
                                    console.log(error)
                                    console.log(usage)
                                    this.verticalSpace()
                                    return 
                                    
                                }
                                if(depth !== undefined){
                                    return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                }

                            }
                            if(this.isValid(this.regexes().positivenumber, depth) === false){
                                return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                            }
                          
                            if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                                return this.emit('menu:error', {error: `'${noequal[0]}' is not a valid JSON option.`})
                            }

                            jsonned = {json: `${noequal[0]} ${checker}=`, depth: depth}
                
                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name

                        }

                        if(jevents && jevents.length === 3){
                     
                            let checker, depth
                            equal = jevents.filter(val => val.includes('='))
                            noequal = jevents.filter(val => !val.includes('='))
                            if(equal.length !== 0 && noequal.length !== 2){
                                return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                            }
                            
                            checker = noequal.filter(val => (this.isNotNumber(val)))
                            depth = noequal.filter(val => (this.isNumber(val)))

                            let code1 = `${noequal[0]} ${noequal[1]}`
                            let code2 = `${noequal[1]} ${noequal[0]}`

                            if(checker.length !== 2){
                                return this.emit('menu:error', {error: `'${checker.join(' ')}' is not a valid JSON option .`})
                            }
                            if(depth.length !== 1){
                                return this.emit('menu:error', {error: `'${depth.join(' ')}' is not a valid JSON option.`})
                            }
                            if(this.isNotNumber(depth[0])){
                                
                                if(depth[0] === undefined){
                                    if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                        // return this.emit('menu:error', {error: `'${code1} ' requires an argument`})
                                        let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                        let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                        console.log()
                                        console.log(error)
                                        console.log(usage)
                                        this.verticalSpace()
                                        return 
                                    }else{
                                        // return this.emit('menu:error', {error: `'${code2} ' requires an argument`})
                                        let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                        let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                        console.log()
                                        console.log(error)
                                        console.log(usage)
                                        this.verticalSpace()
                                        return 
                                    }
                                    
                                }
                                if(depth[0] !== undefined){
                                    return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                }
                            }
                            if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                                return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                            }
                            if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                jsonned = {json: `${code1}`, depth: depth[0]}
                             
                            }else{
                                jsonned = {json: `${code2}`, depth: depth[0]}
                                
                            }

                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name
                        }
                    }
                }
                

                //menu --type=prairie --sizes --toppings

               return this.emit('menu-options', data)
            }

            else if(string.trim().startsWith('menu -T')){
               
                let type = this.spliter(string, 'menu -T')
                let cmd = this.spliter(string, 'menu')
                let options = this.spliter(type[0], ' ')
                let name = options.shift()
                let mevents = this.onarraywalk(options, this.menuEventList())
             
                let jevents = this.exclude(mevents, options)
               
                if(options.length === 0){
                    if (this.types().find(val => (val === name)) !== undefined) {
                        return this.displayType(name)
                    }
                    if (this.types().find(val => (val === name)) === undefined) {
                        if(string.trim() === 'menu -T'){
                            // return this.emit('menu:error', {
                            //     error: `'${string.trim()}' requires an argument`
                            // })
                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '-T'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m-T \x1b[0m\x1b[4mtype\x1b[0m`
                            console.log()
                            console.log(error)
                            console.log(usage)
                            this.verticalSpace()
                            return 
                        }else{
                            return this.emit('menu:error', {
                                error: `'${name}' is not a menu type.`
                            })
                        }
                    }
                }
                if (options.length > 0) {
                    if (this.types().find(val => (val === name)) === undefined) {
                        return this.emit('menu:error', {
                            error: `'${name}' is not a menu type.`
                        })
                    }
                   
                    if(mevents && mevents.length > 0){
                        if(mevents.length > 2){
                            return this.emit('menu:error', {error: `'${mevents.join(' ')}' is not a valid menu option.lkkss`})
                        }
                        for(let _e of mevents){

                            if(_e ==='-s' || _e === '--sizes'){

                                if(jevents && jevents.length > 3){
                                    return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                }
                                if(jevents && jevents.length === 0){
                                    jsonned = {json: undefined, depth: undefined}
                                    menuevents.push('s')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name

                                }
                                if(jevents && jevents.length === 1){
                                    if(jevents[0] !== '-j' && jevents[0] !=='--json'){
                                        return this.emit('menu:error', {error: `'${jevents[0]}' is not a valid JSON option.`})
                                    }
                                    jsonned = {json: jevents[0], depth: Infinity}
                                    menuevents.push('s')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name

                                }

                                if(jevents && jevents.length === 2){
                                    let checker, depth
                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))

                                    if(equal.length !== 1 && noequal.length !== 1){
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) === undefined){
                                            return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                        }
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) !== undefined){
                                            // return this.emit('menu:error', {error: `'${jevents.join(' ')}' require an argument`})

                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] kkk${cmd.join(' ')} \x1b[0m\x1b[4mtype\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                        }
                                        
                                    }
                                    
                                    checker = this.spliter(equal[0], '=')[0]
                                    depth = this.spliter(equal[0], '=')[1]
                                   
                                    if(checker !== '--depth'){
                                        return this.emit('menu:error', {error: `'${checker}' is not a valid JSON option.`})
                                    }

                                    if(this.isNotNumber(depth)){
                                        
                                        if(depth === undefined){
                                            // return this.emit('menu:error', {error: `'${noequal[0]} ${checker}=' requires an argument`})
                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] ${cmd.join(' ')}\x1b[0m\x1b[4mtype\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                        }
                                        if(depth !== undefined){
                                            return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }

                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth) === false){
                                        return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                   
                                    if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                                        return this.emit('menu:error', {error: `'${noequal[0]}' is not a valid JSON option.`})
                                    }
                                
                                    jsonned = {json: `${noequal[0]} ${checker}=`, depth: depth}
                                    menuevents.push('s')
                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                }

                                if(jevents && jevents.length === 3){
                                    //menu --type=prairie --sizes --toppings -j -d 0
                                    let checker, depth
                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))
                                   
                                    let code1 = `${noequal[0]} ${noequal[1]}`
                                    let code2 = `${noequal[1]} ${noequal[0]}`

                                    if(equal.length !== 0 && noequal.length !== 2){
                                        return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                    }
                                    
                                    checker = noequal.filter(val => (this.isNotNumber(val)))
                                    depth = noequal.filter(val => (this.isNumber(val)))

                                    if(checker.length !== 2){
                                        return this.emit('menu:error', {error: `'${checker.join(' ')}' is not a valid JSON option`})
                                    }
                                    if(depth.length !== 1){
                                        return this.emit('menu:error', {error: `'${depth.join(' ')}' is not a valid JSON option.`})
                                    }
                                   
                                    if(this.isNotNumber(depth[0])){
                                        
                                        if(depth[0] === undefined){
                                            if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                                // return this.emit('menu:error', {error: `'${code1} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] sdfsdf${cmd.join(' ')} \x1b[0m\x1b[4mtype\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                            }else{
                                                // return this.emit('menu:error', {error: `'${code2} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] kkkmms${cmd.join(' ')} \x1b[0m\x1b[4mtype\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                            }
                                            
                                        }
                                        if(depth[0] !== undefined){
                                            return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }

                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                                        return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                    
                                    if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                        jsonned = {json: `${code1}`, depth: depth[0]}
                                        menuevents.push('s')
                                    }else{
                                        jsonned = {json: `${code2}`, depth: depth[0]}
                                        menuevents.push('s')
                                    }
                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                }
                                
                            }
                            if(_e === '-t' || _e === '--toppings'){
                                                                
                                if(jevents && jevents.length > 3){
                                    return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                }
                                if(jevents && jevents.length === 0){
                                    jsonned = {json: undefined, depth: undefined}
                                    menuevents.push('t')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                    
                                }
                                if(jevents && jevents.length === 1){
                                    if(jevents[0] !== '-j' && jevents[0] !=='--json'){
                                        return this.emit('menu:error', {error: `'${jevents[0]}' is not a valid JSON option.`})
                                    }
                                    jsonned = {json: jevents[0], depth: Infinity}
                                    menuevents.push('t')

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                    
                                    
                                }
                                if(jevents && jevents.length === 2){
                                    let checker, depth

                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))
                                    if(equal.length !== 1 && noequal.length !== 1){
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) === undefined){
                                            return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                        }
                                        if(this.jsonEventList().find(val => (val === jevents.join(' '))) !== undefined){
                                            // return this.emit('menu:error', {error: `'${jevents.join(' ')}' requires an argument`})
                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] kkjhssks ${cmd.join(' ')}\x1b[0m\x1b[4mtype\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                        }
                                        
                                    }
                                    
                                    checker = this.spliter(equal[0], '=')[0]
                                    depth = this.spliter(equal[0], '=')[1]

                                
                            
                                    if(checker !== '--depth'){
                                        return this.emit('menu:error', {error: `'${checker}' is not a valid JSON option.`})
                                    }
                                    
                                    if(this.isNotNumber(depth)){
                                        
                                        if(depth === undefined){
                                            // return this.emit('menu:error', {error: `'${noequal[0]} ${checker}=' requires an argument`})
                                            let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${noequal[0]} ${checker}='\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                            let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] ppkkks${noequal[0]} ${checker}=\x1b[0m\x1b[4mtype\x1b[0m`
                                            console.log()
                                            console.log(error)
                                            console.log(usage)
                                            this.verticalSpace()
                                            return 
                                        }
                                        if(depth !== undefined){
                                            return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }

                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth) === false){
                                        return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                  
                                    if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                                        return this.emit('menu:error', {error: `'${noequal[0]}' is not a valid JSON option.`})
                                    }

                                    jsonned = {json: `${noequal[0]} ${checker}=`, depth: depth}
                                    menuevents.push('t')
                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name

                                }

                                if(jevents && jevents.length === 3){
                             
                                    let checker, depth
                                    equal = jevents.filter(val => val.includes('='))
                                    noequal = jevents.filter(val => !val.includes('='))
                                    if(equal.length !== 0 && noequal.length !== 2){
                                        return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                    }
                                    
                                    checker = noequal.filter(val => (this.isNotNumber(val)))
                                    depth = noequal.filter(val => (this.isNumber(val)))

                                    let code1 = `${noequal[0]} ${noequal[1]}`
                                    let code2 = `${noequal[1]} ${noequal[0]}`

                                    if(checker.length !== 2){
                                        return this.emit('menu:error', {error: `'${checker.join(' ')}' is not a valid JSON option.`})
                                    }
                                    if(depth.length !== 1){
                                        return this.emit('menu:error', {error: `'${depth.join(' ')}' is not a valid JSON option.`})
                                    }
                                    if(this.isNotNumber(depth[0])){
                                        
                                        if(depth[0] === undefined){
                                            if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                                // return this.emit('menu:error', {error: `'${code1} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] ksjsnds${cmd.join(' ')} \x1b[0m\x1b[4mtype\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                            }else{
                                                // return this.emit('menu:error', {error: `'${code2} ' requires an argument`})
                                                let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] ${cmd.join(' ')} \x1b[0m\x1b[4mtype\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                            }
                                            
                                        }
                                        if(depth[0] !== undefined){
                                            return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                        }
                                    }
                                    if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                                        return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                    }
                                    if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                        jsonned = {json: `${code1}`, depth: depth[0]}
                                        menuevents.push('t')
                                    }else{
                                        jsonned = {json: `${code2}`, depth: depth[0]}
                                        menuevents.push('t')
                                    }

                                    data.jsonned = jsonned
                                    data.menuevents = menuevents
                                    data.type = name
                                }
                            }
                        }
                    }else if(mevents && menuevents.length === 0){
                        if(jevents && jevents.length > 3){
                            return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                        }
                        if(jevents && jevents.length === 0){
                            jsonned = {json: undefined, depth: undefined}
                           

                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name
                            
                            
                        }
                        if(jevents && jevents.length === 1){
                            if(jevents[0] !== '-j' && jevents[0] !=='--json'){
                                return this.emit('menu:error', {error: `'${jevents[0]}' is not a valid JSON option.`})
                            }
                            jsonned = {json: jevents[0], depth: Infinity}
                           

                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name
                            
                            
                        }
                        if(jevents && jevents.length === 2){
                            let checker, depth

                            equal = jevents.filter(val => val.includes('='))
                            noequal = jevents.filter(val => !val.includes('='))
                            if(equal.length !== 1 && noequal.length !== 1){
                                if(this.jsonEventList().find(val => (val === jevents.join(' '))) === undefined){
                                    return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                                }
                                if(this.jsonEventList().find(val => (val === jevents.join(' '))) !== undefined){
                                    // return this.emit('menu:error', {error: `'${jevents.join(' ')}' requires an argument`})
                                    let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                                let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mtype\x1b[0m`
                                                console.log()
                                                console.log(error)
                                                console.log(usage)
                                                this.verticalSpace()
                                                return 
                                }
                                
                            }
                            
                            checker = this.spliter(equal[0], '=')[0]
                            depth = this.spliter(equal[0], '=')[1]

                        
                    
                            if(checker !== '--depth'){
                                return this.emit('menu:error', {error: `'${checker}' is not a valid JSON option.`})
                            }
                            
                            if(this.isNotNumber(depth)){
                                
                                if(depth === undefined){
                                    // return this.emit('menu:error', {error: `'${noequal[0]} ${checker}=' requires an argument`})
                                    let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                    let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')}\x1b[0m\x1b[4mdepth_level\x1b[0m`
                                    console.log()
                                    console.log(error)
                                    console.log(usage)
                                    this.verticalSpace()
                                    return 
                                    
                                }
                                if(depth !== undefined){
                                    return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                }

                            }
                            if(this.isValid(this.regexes().positivenumber, depth) === false){
                                return this.emit('menu:error', {error: `'${depth}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                            }
                          
                            if(noequal[0] !== '-j' && noequal[0] !== '--json'){
                                return this.emit('menu:error', {error: `'${noequal[0]}' is not a valid JSON option.`})
                            }

                            jsonned = {json: `${noequal[0]} ${checker}=`, depth: depth}
                
                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name

                        }

                        if(jevents && jevents.length === 3){
                     
                            let checker, depth
                            equal = jevents.filter(val => val.includes('='))
                            noequal = jevents.filter(val => !val.includes('='))
                            if(equal.length !== 0 && noequal.length !== 2){
                                return this.emit('menu:error', {error: `'${jevents.join(' ')}' is not a valid JSON option.`})
                            }
                            
                            checker = noequal.filter(val => (this.isNotNumber(val)))
                            depth = noequal.filter(val => (this.isNumber(val)))

                            let code1 = `${noequal[0]} ${noequal[1]}`
                            let code2 = `${noequal[1]} ${noequal[0]}`

                            if(checker.length !== 2){
                                return this.emit('menu:error', {error: `'${checker.join(' ')}' is not a valid JSON option .`})
                            }
                            if(depth.length !== 1){
                                return this.emit('menu:error', {error: `'${depth.join(' ')}' is not a valid JSON option.`})
                            }
                            if(this.isNotNumber(depth[0])){
                                
                                if(depth[0] === undefined){
                                    if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                        // return this.emit('menu:error', {error: `'${code1} ' requires an argument`})

                                        let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                        let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m[options] ${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                        console.log()
                                        console.log(error)
                                        console.log(usage)
                                        this.verticalSpace()
                                        return 
                                        
                                    }else{
                                        // return this.emit('menu:error', {error: `'${code2} ' requires an argument`})
                                        let error = `\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b[31mmenu '${cmd.join(' ')}'\x1b[0m \x1b\[31moption requires a valid argument! \x1b[0m \x1b[0m`
                                        let usage = ` \x1b[32m\x1b[4mUSAGE\x1b[0m\x1b[32m: \x1b[0m\x1b[36mmenu\x1b[0m \x1b[36m${cmd.join(' ')} \x1b[0m\x1b[4mdepth_level\x1b[0m`
                                        console.log()
                                        console.log(error)
                                        console.log(usage)
                                        this.verticalSpace()
                                        return 
                                    }
                                    
                                }
                                if(depth[0] !== undefined){
                                    return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                                }
                            }
                            if(this.isValid(this.regexes().positivenumber, depth[0]) === false){
                                return this.emit('menu:error', {error: `'${depth[0]}' is not a valid JSON option. JSON depth level must be a zero or a number greater than zero.`})
                            }
                            if(this.jsonEventList().find(val => (val === code1)) !== undefined){
                                jsonned = {json: `${code1}`, depth: depth[0]}
                             
                            }else{
                                jsonned = {json: `${code2}`, depth: depth[0]}
                                
                            }
                            data.jsonned = jsonned
                            data.menuevents = menuevents
                            data.type = name
                        }
                    }
                }
                
                //menu --type=prairie --sizes --toppings
               return this.emit('menu-options', data)
            }


            else if(string.trim() === 'menu'){
                console.clear()
                       const commands = {
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
 this.texAligner(options, commands)
 this.verticalSpace()
             }else{
                return this.emit('menu:error', {
                    error: `'${string.trim()}' is not a valid menu option ..sdsffsdfs`
                })
            }
        })

        this.on('menu-options', data => this.details(data))
    }
  
    menuNotifications() {
        this.on('menu:error', data => {
            console.log()
            console.log(`\x1b[31m \x1b[4mERROR\x1b[0m\x1b[31m:\x1b[0m \x1b\[31m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('menu:warning', data => {
            console.log()
            console.log(`\x1b[33m \x1b[4mATTENTION\x1b[0m\x1b[33m:\x1b[0m \x1b\[33m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('menu:info', data => {
            console.log()
            console.log(`\x1b[36m \x1b[4mINFO\x1b[0m\x1b[36m:\x1b[0m \x1b\[36m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
        this.on('menu:success', data => {
            console.log()
            console.log(`\x1b[32m \x1b[4mOK\x1b[0m\x1b[32m:\x1b[0m \x1b\[32m${data.error} \x1b[0m \x1b[0m`)
            console.log()
            this.prompt()
            // process.exit(0)
        })
    }

    displayMenu(){
        let appMenu = {}
        let counter = 1

        for (let menu in this.menus().types){
        appMenu[`\x1b[35mITEM ${counter}\x1b[0m`] = []
        appMenu[`\x1b[35mITEM ${counter}\x1b[0m`] = []
        appMenu[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mCODE\x1b[0m`] = this.menus().types[menu].name//.toUpperCase()
        appMenu[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mTYPE\x1b[0m`] = this.menus().types[menu].name//.toUpperCase()
        appMenu[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mNAME\x1b[0m`] = this.menus().types[menu].name.toUpperCase()
        appMenu[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mAVAILABLE QUANTITY IN STORAGE\x1b[0m`] = this.menus().types[menu].quantity
        // appMenu[`ITEM ${counter}`][`SIZES`] = this.menus().types[menu].sizes
        counter++
        }
        console.clear()
        let menuoptions= {
            string: ` ALL MENU ITEMS`,
            number: process.stdout.columns,
            color: 36
        }
        this.padding(menuoptions)
       console.table(appMenu)
    }


    details(data = {}){

        let pizza = {}
        let sizes = {}
        let chosenpizza = {}
        let toppings = {}
        let scounter = 1
        let tcounter = 1
        let counter = 1
        
        for (let menu in this.menus().types) {
            if (data.type.trim().toLocaleLowerCase() === this.menus().types[menu].name.toLowerCase()) {
                pizza = this.menus().types[menu]
                pizza.number = counter
                break
            }
            counter++
        }

        // chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`] = []
        // chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mCODE\x1b[0m`] = pizza.name
        // chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mNAME\x1b[0m`] = pizza.name.toUpperCase()
        // chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mAVAILABLE QUANTITY IN STORAGE\x1b[0m`] = pizza.quantity
    
    
        for(let size of pizza.sizes){
            sizes[`\x1b[35mSIZE ${scounter}\x1b[0m`] = []
            sizes[`\x1b[35mSIZE ${scounter}\x1b[0m`][`\x1b[37mSIZE\x1b[0m`] = size.size
            sizes[`\x1b[35mSIZE ${scounter}\x1b[0m`][`\x1b[37mPRICE\x1b[0m`] = `\$${size.price}`
            scounter++
        }

        for(let topping of pizza.toppings){
            toppings[`\x1b[35mTOPPING ${tcounter}\x1b[0m`] = []
            toppings[`\x1b[35mTOPPING ${tcounter}\x1b[0m`][`\x1b[37mCODE\x1b[0m`] = topping
            toppings[`\x1b[35mTOPPING ${tcounter}\x1b[0m`][`\x1b[37mNAME\x1b[0m`] = topping.toUpperCase()
            tcounter++
        }

        if(data.menuevents.length > 0){
            if(data.jsonned.json === undefined && data.jsonned.depth === undefined){
                for(let event of data.menuevents){
                    if(event === 's' || event === 'sizes'){
                        this.verticalSpace()
                        let sizeoptions = {
                            string: ` ${data.type.toUpperCase()} PIZZA PRICE PER SIZE`,
                            number: process.stdout.columns,
                            color: 36
                        }
           
                        this.padding(sizeoptions)
                        console.table(sizes)
                    }
                    if(event === 't' || event === 'toppings'){
                        this.verticalSpace()
                        let toppingoptions = {
                            string: ` ${data.type.toUpperCase()} PIZZA TOPPINGS`,
                            number: process.stdout.columns,
                            color: 36
                        }
                        this.padding(toppingoptions)
                        console.table(toppings)
                    }
                }
            }
            if(data.jsonned.json !== undefined && data.jsonned.depth !== undefined){
                for(let event of data.menuevents){
                    if(event === 's' || event === 'sizes'){
                        this.verticalSpace()
                        let sizeoptions = {
                            string: ` ${data.type.toUpperCase()} PIZZA PRICE PER SIZE`,
                            number: process.stdout.columns,
                            color: 36
                        }
           
                        this.padding(sizeoptions)
                        this.infos(pizza.sizes, data.jsonned.depth)
                    }
                    if(event === 't' || event === 'toppings'){
                        this.verticalSpace()
                        let toppingoptions = {
                            string: ` ${data.type.toUpperCase()} PIZZA TOPPINGS`,
                            number: process.stdout.columns,
                            color: 36
                        }
                        this.padding(toppingoptions)
                        this.infos(pizza.toppings, data.jsonned.depth)
                    }
                }
            }
        }

        if(data.menuevents.length  === 0){
    
            if (data.jsonned.json !== undefined && data.jsonned.depth !== undefined) {
                this.verticalSpace()
                 let chosenpizzaoptions = {
                     string: ` ${data.type.toUpperCase()} PIZZA`,
                     number: process.stdout.columns,
                     color: 36
                 }
                 this.padding(chosenpizzaoptions)
                 this.infos({pizza}, data.jsonned.depth)
            }
        }

    }




    displayType(type) {
        let pizza = {}
        let sizes = {}
        let chosenpizza = {}
        let toppings = {}
        let scounter = 1
        let tcounter = 1
        let counter = 1
        
        for (let menu in this.menus().types) {
            if (type.trim().toLocaleLowerCase() === this.menus().types[menu].name.toLowerCase()) {
                pizza = this.menus().types[menu]
                pizza.counter = counter
                break
            }
            counter++
        }

        chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`] = []
        chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mCODE\x1b[0m`] = pizza.name
        chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mNAME\x1b[0m`] = pizza.name.toUpperCase()
        chosenpizza[`\x1b[35mITEM ${counter}\x1b[0m`][`\x1b[37mAVAILABLE QUANTITY IN STORAGE\x1b[0m`] = pizza.quantity
    
    
        for(let size of pizza.sizes){
            sizes[`\x1b[35mSIZE ${scounter}\x1b[0m`] = []
            sizes[`\x1b[35mSIZE ${scounter}\x1b[0m`][`\x1b[37mSIZE\x1b[0m`] = size.size
            sizes[`\x1b[35mSIZE ${scounter}\x1b[0m`][`\x1b[37mPRICE\x1b[0m`] = `\$${size.price}`
            scounter++
        }

        for(let topping of pizza.toppings){
            toppings[`\x1b[35mTOPPING ${tcounter}\x1b[0m`] = []
            toppings[`\x1b[35mTOPPING ${tcounter}\x1b[0m`][`\x1b[37mCODE\x1b[0m`] = topping
            toppings[`\x1b[35mTOPPING ${tcounter}\x1b[0m`][`\x1b[37mNAME\x1b[0m`] = topping.toUpperCase()
            tcounter++
        }

        console.clear()

        let chosenpizzaoptions = {
            string: ` ${type.toUpperCase()} PIZZA`,
            number: process.stdout.columns,
            color: 36
        }
        this.padding(chosenpizzaoptions)
        console.table(chosenpizza)

        let toppingoptions = {
            string: ` ${type.toUpperCase()} PIZZA TOPPINGS`,
            number: process.stdout.columns,
            color: 36
        }
        this.padding(toppingoptions)
        console.table(toppings)

        let sizeoptions = {
            string: ` ${type.toUpperCase()} PIZZA PRICE PER SIZE`,
            number: process.stdout.columns,
            color: 36
        }
        this.padding(sizeoptions)
        console.table(sizes)
    }
}

module.exports = MenuCommand

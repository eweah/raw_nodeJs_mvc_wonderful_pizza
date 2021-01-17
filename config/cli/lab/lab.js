
const aligner = (...args) => {
    let first = Math.floor((process.stdout.columns - args[0].length)/process.stdout.columns)
    let numerator =  process.stdout.columns - args.map(string => string.length).reduce((x,y) => x +y, 0)
    let denominator = args.length - 1
    let division = Math.floor(numerator/denominator)
    let line = ''
    for (let i = 0; i < first; i++) {
        line += ' '
    }
    line += args[0]
    const loop = n => {
        for (let i = 0;i < division; i++) {
            line += ' '
        }
        line += args[n]
     }
    for(let j = 1; j < args.length; j++){
        loop(j)
    }    
    console.log(line)
}
const hline  = (length = process.stdout.columns, position = process.stdout.columns, type = '-')  =>{

    let pos = position <= 0 ? 1: position
    let len = length > process.stdout.columns ? process.stdout.columns: length
    let padding = Math.floor((process.stdout.columns - len) / pos)
    let line = ''
    for (let i = 0; i < padding; i++) {
        line += ' '
    }
    for(let i = 0; i < len; i++){
        line +=type
    }
 console.log(line)
}
const lvline = (n = 1, line = false, type = '|') => {
    for( let i = 0; i <n; i++){
        line === true ? console.log(type) : console.log('');
        if(i > process.stdout.rows){
            n = process.stdout.rows
        }
    }

}
const padding  = (string, number) => {
    
    // calculate left padding 
    let padding = Math.floor((process.stdout.columns - string.length) / number)
    // put in left padding space before the string 
    let line = ''
    for (let i = 0; i < padding; i++) {
        line += ' '
    }
    line += string
    console.log(line)
}

const left = string => padding(string, cols) 
const right = string => padding(string, 1)
const center = string => padding(string, 2)

const rvline = (n = 1, line = false, type = '|') => {
    for( let i = 0; i <n; i++){
        line === true ? right(type) : console.log('');
    }
}
const cvline = (n = 1, line = false, type = '|') => {
    for( let i = 0; i <n; i++){
        line === true ? center(type) : console.log('');
    }
}
const vline = (n = 1, position = process.stdout.columns, line = true, type = '|') => {
    let pos =  position <= 0 ? 1 : position
    for( let i = 0; i <n; i++){
        line === true ? padding(type, pos) : console.log('');
    }
}

const texAligner = ( ...args) => {
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

let  options = {pad: 70, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '33'}
let commands = {
    '--help, -h': 'Help',
    '--load, -l': 'Load users',

    '-g -i order_id, -g --id=order_id': 'Get the order with the specified order id',
    '--get -i order_id, --get --id=order_id': 'Get the order with the specified order id',

    '-g -p, -g --phone=phone': 'Get the order with the specified phone number',
    '--get -p phone, --get --phone=phone': 'Get the order with the specified phone number',

    '-g -e, -g --email=email': 'Get the order with the specified email address',
    '--get -e email, --get --email=email': 'Get the order with the specified email address',

    '-g -i order_id -c, -g -i order_id --card': 'Get the order with the specified order id',
    '-g --id=order_id -c, -g --id=order_id --card,': 'Get the order with the specified order id',

    '--get -i order_id -c,--get -i order_id --card': 'Get the order with the specified order id',
    '--get --id=order_id -c, --get --id=order_id --card': 'Get the order with the specified order id',

    '-g -i order_id -s, -g -i order_id --shipping': 'Get the order with the specified order id',
    '-g --id=order_id -s, -g --id=order_id --shipping,': 'Get the order with the specified order id',

    '--get -i order_id -s,--get -i order_id --shipping': 'Get the order with the specified order id',
    '--get --id=order_id -s, --get --id=order_id --shipping': 'Get the order with the specified order id',


    '-g -i order_id -n, -g -i order_id --number': 'Get the order with the specified order id',
    '-g --id=order_id -n, -g --id=order_id --number,': 'Get the order with the specified order id',

    '--get -i order_id -n,--get -i order_id --number': 'Get the order with the specified order id',
    '--get --id=order_id -n, --get --id=order_id --number': 'Get the order with the specified order id',
}




texAligner(options, commands)














// const util = require('util');

// console.log(util.inspect(aligner, { showHidden: true, depth: Infinity, colors: true }));





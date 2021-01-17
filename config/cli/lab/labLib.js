const lib = {}

lib.aligner = (...args) => {

    let first = Math.floor((process.stdout.columns - args[0].length)/process.stdout.columns)
    let numerator =  process.stdout.columns - args.map(string => string.length).reduce((x,y) => x +y, 0)
    let denominator = args.length - 1
    let division = Math.floor(numerator/denominator)
    let line = ''
    for (let i = 0; i < first; i++) {
        line += ' '
    }34
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

lib.hline  = (...args)  =>{

    let options = {length: process.stdout.columns, position: process.stdout.columns, type: '-'}

    if(args.length === undefined || args.length === 0){
    let pos = options.position <= 0 ? 1: options.position
    let len = options.length > process.stdout.columns ? process.stdout.columns: options.length
    let padding = Math.floor((process.stdout.columns - len) / pos)
    let line = ''
    for (let i = 0; i < padding; i++) {
        line += ' '
    }
    for(let i = 0; i < len; i++){
        line +=options.type
    }
     console.log(line)
     return 
    }

    for(let i = 0; i < args.length ; i++){
        if (typeof (args[i]) === 'object') {
            for (let prop in args[i]) {
                let checkProp = prop === 'position' && args[i][prop] <= 0 ? 1 :  prop
                if (options.hasOwnProperty(checkProp)) { 
                    options[checkProp] = args[i][checkProp]
                }
            }
        }else{
            let pos = options.position <= 0 ? 1: options.position
            let len = options.length > process.stdout.columns ? process.stdout.columns: options.length
            let padding = Math.floor((process.stdout.columns - len) / pos)
            let line = ''
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            for(let i = 0; i < len; i++){
                line +=options.type
            }
             console.log(line)
        }
        let pos = options.position <= 0 ? 1: options.position
        let len = options.length > process.stdout.columns ? process.stdout.columns: options.length
        let padding = Math.floor((process.stdout.columns - len) / pos)
        let line = ''
        for (let i = 0; i < padding; i++) {
            line += ' '
        }
        for(let i = 0; i < len; i++){
            line +=options.type
        }
         console.log(line)
         
    }
}
lib.lvline = (n = 1, line = false, type = '|') => {
    for( let i = 0; i <n; i++){
        line === true ? console.log(type) : console.log('');
        if(i > process.stdout.rows){
            n = process.stdout.rows
        }
    }
}
lib.padding = (...args) => {

    let options = {
        string: '-',
        number: process.stdout.columns,
        color: 37
    }
    if(args.length === undefined || args.length === 0){
         // calculate left padding 
         let padding = Math.floor((process.stdout.columns - options.string.length) / options.number)
         // put in left padding space before the string 
         let line = ''
         for (let i = 0; i < padding; i++) {
             line += ' '
         }
         line += `\x1b[${options.color}m${options.string}\x1b[0m`
         console.log(line)
        return 
    }
    
    for (let i = 0; i < args.length; i++) {
        if (typeof (args[i]) === 'object') {
            for (let prop in args[i]) {
                let checkProp = prop === 'number' && args[i][prop] <= 0 ? 1 :  prop
                if (options.hasOwnProperty(checkProp)) { 
                    options[checkProp] = args[i][checkProp]
                }
            }
        } else {
            // calculate left padding 
            let padding = Math.floor((process.stdout.columns - options.string.length) / options.number)
            // put in left padding space before the string 
            let line = ''
            for (let i = 0; i < padding; i++) {
                line += ' '
            }
            line += `\x1b[${options.color}m${options.string}\x1b[0m`
            console.log(line)
        }
        // calculate left padding 
        let padding = Math.floor((process.stdout.columns - options.string.length) / options.number)
        // put in left padding space before the string 
        let line = ''
        for (let i = 0; i < padding; i++) {
            line += ' '
        }
        line += `\x1b[${options.color}m${options.string}\x1b[0m`
        console.log(line)
    }

}

// works
lib.left = options => lib.padding({string: options.string,number: process.stdout.columns,color: options.color}) 
// works
lib.right = options => lib.padding({string: options.string,number: 1,color: options.color})
// works
lib.center = options => lib.padding({string: options.string,number: 2,color: options.color})


lib.rvline = (n = 1, line = false, type = '|') => {
    for( let i = 0; i <n; i++){
        line === true ? right(type) : console.log('');
    }
}
lib.cvline = (n = 1, line = false, type = '|') => {
    for( let i = 0; i <n; i++){
        line === true ? lib.center(type) : console.log('');
    }
}
lib.vline = (n = 1, position = process.stdout.columns, line = true, type = '|') => {
    let pos =  position <= 0 ? 1 : position
    for( let i = 0; i <n; i++){
        line === true ? lib.padding(type, pos) : console.log('');
    }
}

// Works
lib.texAligner = ( ...args) => {
    let  options = {pad: 75, position: process.stdout.columns, hline: false, keyColor: 36,valueColor: 37}
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
                    lib.hline(1,options.position, key)
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
                lib.hline(1,options.position, key)
            }else{
                console.log(key)
            }

        }

    }
}


module.export  = lib
// let options = {type: '---'}

// let options = {
//     string: 'PRODUCTS IN THIS ORDER',
//     number: 5,
//     color: 37
// }
// lib.padding(options)

// let start = new Date('Thu Jul 16 2020 10:40:45 AM')
// let end = Date.now()

// const date = new Date();
// // this.order.created_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
// // this.order.updated_at = `${date.toDateString()} ${date.toLocaleTimeString()}`
// // let time = new Date(end - start)
// // console.log(time.toLocaleTimeString())
// record start time

function elapsed(start = new Date(), end = new Date()) {


    // time difference in ms
    let timeDiff = end - start;

    // strip the ms
    timeDiff /= 1000;

    // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
    let seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    let minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    let hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    let days = timeDiff;

    let time = {
        seconds, minutes, hours, days
    }
    return time
}

function pluralize(item, quantiy) {
    return quantiy > 1 ? `${item}s`: `${item}`
}


// let  time = elapsed(new Date('Thu Jul 15 2020 2:40:45 AM'), new Date())
// let days = time.days
// let hours = time.hours
// let minutes = time.minutes
// let seconds = time.seconds

// let message = `${days} ${pluralize('day', days)} ${hours} ${pluralize('hour', hours)} ${minutes} ${pluralize('minute', minutes)} and ${seconds} ${pluralize('second', seconds)} ago.`
// console.log(message)

const getboth = (a, b) =>{
    let mod = a % b 
    let div = a / b 
    let diff = b - a
     return {number: Math.trunc(div), mod, diff,div}
    
}
const oncalculatetime = (start = new Date(), end = new Date()) =>{


let result = {}
// Get the time difference
let delatt = (end - start)/1000


let ymod = delatt / (60*60*24*365) 
let years = Math.trunc(delatt / (60*60*24*365))
let mmod = 12*(ymod - years)
let months = Math.trunc(mmod)
let dmod = (365 * (mmod - months))/12
let days =  Math.trunc(dmod)
let weeks = 7*days

let hmod = (24*(dmod - days))

let hours = Math.trunc(hmod) 

let minmod = 60*(hmod - hours)

let minutes = Math.trunc(minmod)

let smod = 60*(minmod - minutes)

let seconds = Math.trunc(smod)


result.years = years
result.months = months
result.weeks = weeks
result.days = days
result.hours = hours
result.minutes = minutes
result.seconds = seconds




    return result 
}



























// const util = require('util');

// console.log(util.inspect(aligner, { showHidden: true, depth: Infinity, colors: true }));





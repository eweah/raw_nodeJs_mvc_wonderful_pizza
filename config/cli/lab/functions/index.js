const jsonEventList = () =>{
    return [
        '-j',
        '-j -d',
        '-j --depth=',
        '--json',
        '--json --depth=',
        '--json -d'
    ]
}
let json =  [
    '-j',
    '-j -d',
    '-j --depth=',
    '--json',
    '--json --depth=',
    '--json -d'
]
const options = ['-P', '-s', '-n', '-j', '--json', '--json --depth=']
const params = ['-P', '-s', '-n', '-j', '--json', '--json --depth=0', '-j -d 0', ]

const walker = (searchIn =[], searchFor =[]) =>{
    if(!Array.isArray(searchIn) || !Array.isArray(searchFor)) return 

    let found = []

    for(let sin of searchIn){
       for(let sfor of searchFor){
           if( sin === sfor){
               found.push(sin)
           }
       }
    }
    return found
}
const walker = (searchIn =[], searchFor =[]) =>{
    if(!Array.isArray(searchIn) || !Array.isArray(searchFor)) return 

    let found = []

    for(let sin of searchIn){
       for(let sfor of searchFor){
           if( sin === sfor){
               found.push(sin)
           }
       }
    }
    return found
}
let numb = [1,2]
console.log(numb)
numb.shift()
console.log(numb)
numb.unshift(1)
console.log(numb)
numb.pop()
console.log(numb)

// let me = walker(json,  params)
// console.log(me)
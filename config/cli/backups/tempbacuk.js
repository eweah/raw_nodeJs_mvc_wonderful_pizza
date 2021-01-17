'use strict'

const {createReadStream, promises} = require('fs')
const path = require('path')
const util = require('util')

const CLI = require('.')



class OrderCommand extends CLI{

    constructor(){
        super()
        this.autobind(OrderCommand)
        this.autoinvoker(OrderCommand)
    }

    autobinder(className = {}){
        for(let method of Object.getOwnPropertyNames(className.prototype)){
          if(typeof(this[method]) === 'function' && method !=='constructor'){
              this[method] = this[method].bind(this)
          }
        }
    }
    autobind(className = {}){
        this.autobinder = this.autobinder.bind(this)
        this.autobinder(className)
    }

    autoinvoker(className = {}){
        for(let method of Object.getOwnPropertyNames(className.prototype)){
          if(typeof(this[method]) === 'function' && method !=='constructor' && method !== 'autoinvoker' && method !== 'autobinder' && method !== 'autobind' && method !== 'base' && method !=='findAll' && !method.startsWith('on')){
              this[method]()
              console.log(method)
            }
        }
    }
    init() {
        console.log('\x1b[34m%s\x1b[0m', 'cli is running')
        console.log('')
        this._interface.prompt()
        this._interface.on('line', string => {
            this.input(string)
            this._interface.prompt()
        })
    }
    base(){
        return path.join(__dirname, '../../resources/storage/.data')
    }
   async findAll(path){
     return await promises.readdir(`${this.base()}/${path}`);
    }
    hash(string) {
        if (typeof string == 'string' && string.trim().length > 0) {
            const hash = require('crypto').createHmac('sha256', 'HolyMole!IsThisTheHashingSecret?').update(string).digest('hex');
            return hash;
        } else {
            return false;
        }

    };
    login() {
        this.on('login', () => {
            this._interface.question('Phone Number: ', phone => {
                if (phone.trim().length !== 10 || typeof (phone) !== 'string') {
                    console.log('\x1b[31m%s\x1b[0m', 'Invalid phone number!')
                    process.exit(0)
                }
                phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone.toLocaleLowerCase().trim() : false
                if (!phone) {
                    console.log('\x1b[31m%s\x1b[0m', 'admin phone number required')
                    process.exit(0)
                }
                if (phone) {
                    this._interface.question('Password: ', password => {
                        if (typeof (password) !== 'string' || password.trim().length < 8) {
                            console.log('\x1b[31m%s\x1b[0m', 'Invalid password')
                            process.exit(0)
                        }
                        password = typeof (password) === 'string' && password.trim().length >= 8 ? password.trim() : false
                        if (!password) {
                            console.log('\x1b[31m%s\x1b[0m', 'admin phone required')
                            process.exit(0)
                        }
                        if (password) {

                            let path = `${this.base()}/users/${phone}.json`
                            let readable = createReadStream(path, 'utf-8')
                            readable.on('error', error => {
                               return  this.emit('error', {error: 'Unrecognized Phone number'})
                            })
                            readable.on('data', chunk => {
                                let user = JSON.parse(chunk)
                                 let hashed = this.hash(password)
                                 if(user.password !== hashed){
                                     return this.emit('error', {error: 'Incorrect password'})
                                 }
                                 if(user.password === hashed){
                                     this.emit('success', {message: 'You are logged in!'})
                                    console.clear()
                                     delete user.aToken
                                     delete user.password 
                                     console.log()
                                    //  console.log(user)
                                     this.auth = true
                                    let centered = `${user.firstname} ${user.lastname}`
                                    this.horizontalLine()
                                    this.centered(`\x1b[32m${centered}\x1b[0m`)
                                    this.horizontalLine()
                                    this.verticalSpace(2)
                                
                                    // Show each command followed by its explanation in white and yellow respectively
                                
                                    for (let key in user) {
                                        if (user.hasOwnProperty(key)) {
                                            let value = `\x1b[33m${user[key]}\x1b[0m`
                                            let line = `\x1b[36m${key}\x1b[0m`
                                            let padding = 60 - line.length
                                            for (let i = 0; i < padding; i++) {
                                                line += ' '
                                            }
                                            line += value
                                            console.log(line)
                                            this.verticalSpace(1)
                                        }
                                    }
                                    this.horizontalLine()
                                    this._interface.prompt()
                                    
                                    }
                            })
                            
                        }

                    })
                }

            })
        })


    }
    common(){
        this.on('clear', () => {
            console.clear()
        })
        this.on('exit', () => {
            process.exit(0)
        })
        this.on('leave', () => {
            process.exit(0)
        })
        this.on('quit', () => {
            process.exit(0)
        })
    }

    notACommand(){
        this.on('command-not-found', data => {
            console.log()
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            console.log()
            this._interface.prompt()
            //process.exit(0)
        })
        this.on('error', data => {
            console.log()
            console.log(`\x1b[31m${data.error}\x1b[0m`)
            console.log()
            this._interface.prompt()
            // process.exit(0)
        })
        this.on('success', data => {
            console.log(`\x1b[36m${data.message}\x1b[0m`)
        })
     
    }

    onProducts() {
        this.once('order-products', products => {
            console.log()
            this.horizontalLine()
            this.centered('PRODUCTS IN THIS ORDER')
            console.table(products)
            this.horizontalLine()
            this._interface.prompt()
        })
    }
    onNumber () {
        this.once('order-number', ordernumber => {
            console.log()
            this.horizontalLine()
            this.centered('ORDER NUMBER')
            console.table([ordernumber])
            this.horizontalLine()
            this._interface.prompt()
        })
     }
     onCard() {
        this.once('order-card', ordercard => {
            console.log()
            this.horizontalLine()
            this.centered('CARD DETAILS')
            //this.horizontalLine()
            console.table(ordercard)
            this.horizontalLine()
            this._interface.prompt()
            })
     }
     onGuestCustomer(){
        this.once('order-guest-customer', customer => {
            console.log()
             this.horizontalLine()
             this.centered('GUEST CUSTOMER SHIPPING DETAILS')
             //this.horizontalLine()
             this.centered(console.table([customer]))
             this.horizontalLine()
             this._interface.prompt()
        })
     }

      onGuestBilling(){
        this.once('order-guest-billing', billing => {
            console.log()
            this.horizontalLine()
            this.centered('GUEST CUSTOMER BILLING ADDRESS')
            //this.horizontalLine()
            console.table([billing])
            // this.horizontalLine()
            console.log()
        })
     }
      onAuthCustomer() {
        this.once('order-auth-customer', customer => {
            console.log()
            this.centered('REGISTERED USER SHIPPING DETAILS')
            //this.horizontalLine()
            this.centered(console.table([customer]))
           this.horizontalLine()
            this._interface.prompt()
        })
     }
      onAuthBilling() {
        this.once('order-auth-billing', billing => {
            console.log()
            this.horizontalLine()
            this.centered('REGISTERED USER BILLING ADDRESS')
            //this.horizontalLine()
            console.table([billing])
            // this.horizontalLine()
            console.log()
        })
     }
      onShipping() {
        onGuestCustomer()
        onGuestBilling()
        onAuthCustomer()
        onAuthBilling()
     }
      onPCNS() {
        onNumber()
        onProducts()
        onCard()
        onGuestCustomer()
        onGuestBilling()
        onAuthCustomer()
        onAuthBilling()
     }
      onPS() {
        onProducts()
        onGuestCustomer()
        onGuestBilling()
        onAuthCustomer()
        onAuthBilling()
     }
      onPC() {
        onProducts()
        onCard()
     }
      onPN(){
        onProducts()
        onNumber()
     }
      onCN() {
        onCard()
        onNumber()
     }
      onCS() {
        onCard() 
        onGuestCustomer()
        onGuestBilling()
        onAuthCustomer()
        onAuthBilling()
     }
    commands(){
        this.on('orders', async string => {
            let options =  [
               'h','help',
               'g','get',
               'i','id',
               'e','email',
               'p', 'phone',
               'n', 'number',
               'c','card',
               'P', 'products',
               'l', 'load',
               's','shipping'
              
            ]
            let validOptions = options.sort()
            let matches = [
                '--l','--load',
                '-g -i','-g -e', '-g -p',
                '-g --id=', '-g --email=', '-g --phone=',
                '--get -i', '--get -e', '--get -p',
                '--get --id=', '--get --email=', '--get --phone='
            ]
            // starts with 

            const spliter = (str, spl) => str.split(spl).filter(string => string !='').map(st => st.trim())
            let toSearch = string.split('orders').filter(str => str !=='').map(str => str.trim())

            let event 
            for(let match of matches){
                if(toSearch[0].startsWith(match)){
                    event = match
                    break
                }
            }
             if(!event || event === undefined){
                 this.emit('command-not-found', {error: `${string} is not a valid command`})
                 return 
             }


             // Products
            //  const  onProducts = () =>{
            //     this.once('order-products', products => {
            //         console.log()
            //         this.horizontalLine()
            //         this.centered('PRODUCTS IN THIS ORDER')
            //         console.table(products)
            //         this.horizontalLine()
            //         this._interface.prompt()
            //   })
            //  }


             /// On Number
            //  const onNumber = () => {
            //     this.once('order-number', ordernumber => {
            //         console.log()
            //         this.horizontalLine()
            //         this.centered('ORDER NUMBER')
            //         console.table([ordernumber])
            //         this.horizontalLine()
            //         this._interface.prompt()
            //     })
            //  }
             // On Card 
            //  const onCard = () => {
            //     this.once('order-card', ordercard => {
            //         console.log()
            //         this.horizontalLine()
            //         this.centered('CARD DETAILS')
            //         //this.horizontalLine()
            //         console.table(ordercard)
            //         this.horizontalLine()
            //         this._interface.prompt()
            //         })
            //  }
             // On Shipping 

            //  const onGuestCustomer = () => {
            //     this.once('order-guest-customer', customer => {
            //         console.log()
            //          this.horizontalLine()
            //          this.centered('GUEST CUSTOMER SHIPPING DETAILS')
            //          //this.horizontalLine()
            //          this.centered(console.table([customer]))
            //          this.horizontalLine()
            //          this._interface.prompt()
            //     })
            //  }
            //  const onGuestBilling = () =>{
            //     this.once('order-guest-billing', billing => {
            //         console.log()
            //         this.horizontalLine()
            //         this.centered('GUEST CUSTOMER BILLING ADDRESS')
            //         //this.horizontalLine()
            //         console.table([billing])
            //         // this.horizontalLine()
            //         console.log()
            //     })
            //  }
            //  const onAuthCustomer = () => {
            //     this.once('order-auth-customer', customer => {
            //         console.log()
            //         this.centered('REGISTERED USER SHIPPING DETAILS')
            //         //this.horizontalLine()
            //         this.centered(console.table([customer]))
            //        this.horizontalLine()
            //         this._interface.prompt()
            //     })
            //  }
            //  const onAuthBilling = () => {
            //     this.once('order-auth-billing', billing => {
            //         console.log()
            //         this.horizontalLine()
            //         this.centered('REGISTERED USER BILLING ADDRESS')
            //         //this.horizontalLine()
            //         console.table([billing])
            //         // this.horizontalLine()
            //         console.log()
            //     })
            //  }
            //  const onShipping = () => {
            //     onGuestCustomer()
            //     onGuestBilling()
            //     onAuthCustomer()
            //     onAuthBilling()
            //  }
            //  const onPCNS = () => {
            //     onNumber()
            //     onProducts()
            //     onCard()
            //     onGuestCustomer()
            //     onGuestBilling()
            //     onAuthCustomer()
            //     onAuthBilling()
            //  }
            //  const onPS = () => {
            //     onProducts()
            //     onGuestCustomer()
            //     onGuestBilling()
            //     onAuthCustomer()
            //     onAuthBilling()
            //  }
            //  const onPC = () => {
            //     onProducts()
            //     onCard()
            //  }
            //  const onPN = () =>{
            //     onProducts()
            //     onNumber()
            //  }
            //  const onCN = () => {
            //     onCard()
            //     onNumber()
            //  }
            //  const onCS = () => {
            //     onCard() 
            //     onGuestCustomer()
            //     onGuestBilling()
            //     onAuthCustomer()
            //     onAuthBilling()
            //  }

             // Command handler
             const commandHandler = (strToFilter = [], option) => {
                let authPath = `${this.base()}/orders/${strToFilter[0]}.json`
                let authReadable = createReadStream(authPath, 'utf-8')
                // event variables 
                let order 
                let orderproducts = []
                let ordernumber = {}
                let ordercard = {}
                let customer = {}
                let billing = {}
                authReadable.on('error', error => {
                    this.emit('error', {error: `could not find order with id: ${strToFilter[0]}`})
                })
                 authReadable.on('data', chunk => {

                     order = JSON.parse(chunk)

                     // Shipping
       
                     if(order.guest){
                       this.findAll('guestshippings').then(shippings => {
                           for(let shipping of shippings){

                               let shippingpath = `${this.base()}/guestshippings/${shipping}`
                               let shippingreadable = createReadStream(shippingpath, 'utf-8')
                               shippingreadable
                               .on('data', chunck => {
                                   let ship = JSON.parse(chunck)
                                   if(ship.cart && ship.cart.length > 0){
                                       let ordershipping = ship.cart.find(orderId => orderId === order.id)
                                       if(ordershipping && ordershipping !== undefined){
                                           console.log()
                                          
                                            billing.address = ship.billing.billing_address
                                            billing.city = ship.billing.billing_city
                                            billing.state = ship.billing.billing_state
                                            billing.zip = ship.billing.billing_zip
                                            billing.phone = ship.billing.billing_phone
                                          
                                            customer.firstname = ship.firstname
                                            customer.lastname = ship.lastname
                                            customer.address = ship.address
                                            customer.city = ship.city
                                            customer.state = ship.state
                                            customer.zip = ship.zip
                                            //customer.email = ship.email
                                            customer.phone = ship.phone
                                       }
                                   }
                               })
                               .on('error', () => {
                                   this.emit('error', {error: `Could not find shipping with phone number ${shipping}`})
                               })
                               .on('end', () => {
                                   this.emit('order-guest-customer', customer)
                                   this.emit('order-guest-billing', billing)
                               })
                              }
                       })
                       .catch(error => {

                       })
                 
               }
               
                  if (order.guest === false) {
                      this.findAll('shippings').then(authshippings =>{
                       for (let shipping of authshippings) {

                           let shippingpath = `${this.base()}/shippings/${shipping}`
                           let shippingreadable = createReadStream(shippingpath, 'utf-8')
                           shippingreadable
                               .on('data', chunck => {
                                   let ship = JSON.parse(chunck)
                                   if (ship.cart && ship.cart.length > 0) {
                                       let ordershipping = ship.cart.find(orderId => orderId === order.id)
                                       if (ordershipping && ordershipping !== undefined) {
                                           console.log()
                                           billing.address = ship.billing.billing_address
                                           billing.city = ship.billing.billing_city
                                           billing.state = ship.billing.billing_state
                                           billing.zip = ship.billing.billing_zip
                                           billing.phone = ship.billing.billing_phone
                                           customer.firstname = ship.firstname
                                           customer.lastname = ship.lastname
                                           customer.address = ship.address
                                           customer.city = ship.city
                                           customer.state = ship.state
                                           customer.zip = ship.zip
                                           //customer.email = ship.email
                                           customer.phone = ship.phone
                                           //return
                                       }
                                   }
                               })
                               .on('error', () => {
                                   this.emit('error', {
                                       error: `Could not find shipping with phone number ${shipping}`
                                   })
                               })
                               .on('end', () => {
                                   this.emit('order-auth-customer', customer)
                                   this.emit('order-auth-billing', billing)
                               })
                       }

                      })
                      .catch(error => {

                      })

                     
                  }
               
                     // Order Products
                     if(order.products && order.products.length > 0){
                         for(let product of order.products){
                             let prod = {}
                             prod['pizza type'] = product.name.toUpperCase()
                             prod.size = product.size
                             prod['unit price'] = product.pricing.price
                             prod.quantity = product.pricing.quantity
                             prod['total price'] = product.pricing.total
                             orderproducts.push(prod)
                         }
                     }
                     // Order number 
                   ordernumber['ORDER#'] = order.number

                   // Order card
                   ordercard['card'] = order.card
                 })
                 authReadable.on('end', () => {
                     this.emit('order-found', order)
                     this.emit('order-products', orderproducts)
                     this.emit('order-number', ordernumber)
                     this.emit('order-card', ordercard)
                 })
       
               // Pcns /// productscardnumbershipping
               if(option ==='P' || option === 'products'){this.onProducts()}
               else if (option === 'n' || option === 'number') {
                   onNumber()
               } else if (option === 'c' || option === 'card') {
                   onCard()
               } else if (option === 's' || option === 'shipping') {
                   onShipping()
               } else if (option === 'Pc' || option === 'productsc' || option === 'Pcard' || option === 'productscard') {
                   onPC()
               } else if (option === 'Pn' || option === 'productsn' || option === 'Pnumber' || option === 'productsnumber') {
                   onPN()
               } else if (option === 'Ps' || option === 'productss' || option === 'Pshipping' || option === 'productsshipping') {
                   onPS()
               } else if (option === 'cn' || option === 'cnumber' || option === 'cardn' || option === 'cardnumber') {
                   onCN()
               } else if (option === 'cs' || option === 'cshipping' || option === 'cards' || option === 'cardshipping') {
                   onCS()
               } else if (option === 'Pcns') {
                   // Number
                   onPCNS()
               } else if (option === '' || !option) {
                   this.once('order-found', order => {
                       console.log(order)
                       this._interface.prompt()
                   })
               } else {
                   this.emit('command-not-found', {
                       error: 'Invalid options'
                   })
               }
             }


             if(event === '-g -i'){
                let strToFilter = spliter(spliter(toSearch[0], '-g -i')[0], '-')
                if(strToFilter.length > 5){
                    this.emit('error', {error: `Invalid number of arguments`})
                }else{
                    if(strToFilter[0] && strToFilter[0].length !== 30){
                        this.emit('error', {error: `${strToFilter[0]} is not a valid order id`})
                    }
                    if(!strToFilter[0] || strToFilter[0] === undefined){
                        this.emit('error', {error: `An order id is required!`})
                    }
                    if(strToFilter[0] && strToFilter[0].length === 30){
                        console.log(strToFilter[0])
                        let commands = []
                        for(let i = 1; i < strToFilter.length; i++){
                            commands.push(strToFilter[i])
                        }
                        let option = commands.sort().join('')

                        console.log('OPTION', option)
                        commandHandler(strToFilter, option)
                       
                    }
                }
                
             }
        })
    }
    
     
}


module.exports = OrderCommand

new OrderCommand()












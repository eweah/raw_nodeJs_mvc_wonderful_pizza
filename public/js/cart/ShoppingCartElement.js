'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module ShoppingCartElement
 * @kind class
 * 
 * @extends PizzaElement
 * 
 * @requires PizzaElement
 * 
 * @classdesc ShoppingCartElement class for the cart page
 * 
 */

import PizzaElement from '../menu/pizza/PizzaElement.js'

class ShoppingCartElement extends PizzaElement {
    constructor() {
        super();
        // element create
        // auto bind methods
        this.autobind(ShoppingCartElement)
                     // Creates or opens the application indexeDB database (the front end database)
  
    }

    setVariables() {
        this.prices()
        this.priceRanges()

        this.carts = ['yummy', 'prairie', 'bronco', 'texan', 'roma', 'roundup', 'italian', 'wês', 'hawaiian', 'canadian', 'szran', 'gnonsoa', 'wonderful', 'tasmanian', 'ivorian', 'ausie', 'happy', 'chicken', 'bbq', 'beef', 'cheese', 'buffalo', 'bacon', 'lago']
        this.carts.forEach(item => {
            this.onCartItemInit(item)
        })

        this.removeBtn = this.shadowRoot.getElementById('remove')
        this.editBtn = this.shadowRoot.getElementById('edit')
        this.optionsForm = this.shadowRoot.getElementById('options-form')
        this.editContainer = this.shadowRoot.getElementById('edit-container')
    }
    clearAuthCartHandler() {
        this.authCartItemCounter = 0;
        this.clearAuthCartChannel.addEventListener('message', event => {

            const data = event.data
            for (let item of data.cart) {

                if (item.id) {
                    const datum = {
                        id: item.id
                    }

                    this.deletedAuthCartItem(datum)

                    // this.removeCartItem(item.id)
                    if (this.authCartItemCounter === data.cart.length) {
                        break
                    }
                } else {
                    this.authCartItemCounter += 1
                    if (this.authCartItemCounter === data.cart.length) {
                        break
                    }
                    const productId = this.shadowRoot.getElementById('productId')
                    if (productId.getAttribute('value') !== null) {
                        if (this.authCartItemCounter <= data.cart.length) {
                            this.removeCartItem()
                        }
                    }
                }
            }

        }, {
            once: true
        })
    }

    /**
     * @name onMounted 
     * @function
     * 
     * @description create shopping-cart elements and mounts them to the DOM
     * 
     * @return does not return anything
     * 
     */
    onMounted() {
        if (this.authCheck()) {
            this.authOrders()
                .then(data => {

                    const orders = data
                    const totalOrder = 0
                    for (let datum of orders) {
                        totalOrder += 1
                        const order = {}
                        order.phone = datum.user.phone
                        order.pricing = datum.pricing
                        order.name = datum.name
                        order.size = datum.size
                        order.toppings = datum.toppings
                        order.placed = datum.placed
                        order.created_at = datum.created_at
                        order.updated_at = datum.updated_at
                        order.id = datum.id
                        order.user = datum.user
                        // this.offlineOrders.push(order)
                        const appcart = document.createElement('shopping-cart')
                        const responsive = appcart.shadowRoot.querySelector('.responsive')
                        responsive.style.display = 'block'
                        const productId = appcart.shadowRoot.querySelector('#productId')
                        const newElquantity = appcart.shadowRoot.querySelector('.newElquantity')
                        const newElsize = appcart.shadowRoot.querySelector('.newElsize')
                        const newEltype = appcart.shadowRoot.querySelector('.newEltype')
                        const newElprice = appcart.shadowRoot.querySelector('.newElprice')
                        const choice = appcart.shadowRoot.getElementById('size')

                        const types = this.types[`${datum.name}`]

                        for (let child of choice.children) {
                            child.setAttribute('type', `${datum.name}`)
                            child.setAttribute('name', `${datum.name.toUpperCase()}`)

                            if (child.getAttribute('value') === 'small') {
                                child.setAttribute('price', `${types.sizes[0].price}`)
                            }
                            if (child.getAttribute('value') === 'medium') {
                                child.setAttribute('price', `${types.sizes[1].price}`)
                            }
                            if (child.getAttribute('value') === 'large') {
                                child.setAttribute('price', `${types.sizes[2].price}`)
                            }
                            if (child.getAttribute('value') === 'xlarge') {
                                child.setAttribute('price', `${types.sizes[3].price}`)
                            }
                        }

                        newElquantity.innerHTML = `${datum.pricing.quantity}`
                        newElsize.innerHTML = `${datum.size}`
                        newEltype.innerHTML = `${datum.name}`
                        newEltype.setAttribute('type', `${datum.name}`)
                        newElprice.innerHTML = `${datum.pricing.subtotal}`
                        productId.setAttribute('value', `${datum.id}`)

                        document.body.appendChild(appcart)

                        if (totalOrder === orders.length) {
                            break
                        }
                    }


                })
                .catch(error => {
                    console.log('no order found ....')
                    // this.showCartDetails()
                })
        }

    }
    /**
     * @name onLoadAuthCartData
     * @function
     * 
     * @description creates  authenticated user's shopping-cart elements and mounts them to the DOM upon load event
     * 
     * @return does not return anything
     * 
     */
    onLoadAuthCartData() {
        this.setAuthCartData()
        window.addEventListener('load', event => {

            this.offlineOrders.forEach(order => {
                const appcart = document.createElement('shopping-cart')
                const responsive = appcart.shadowRoot.querySelector('.responsive')
                responsive.style.display = 'block'
                const productId = appcart.shadowRoot.querySelector('#productId')
                const newElquantity = appcart.shadowRoot.querySelector('.newElquantity')
                const newElsize = appcart.shadowRoot.querySelector('.newElsize')
                const newEltype = appcart.shadowRoot.querySelector('.newEltype')
                const newElprice = appcart.shadowRoot.querySelector('.newElprice')
                const choice = appcart.shadowRoot.getElementById('size')

                const types = this.types[`${order.name}`]

                for (let child of choice.children) {
                    child.setAttribute('type', `${order.name}`)
                    child.setAttribute('name', `${order.name.toUpperCase()}`)

                    if (child.getAttribute('value') === 'small') {
                        child.setAttribute('price', `${types.sizes[0].price}`)
                    }
                    if (child.getAttribute('value') === 'medium') {
                        child.setAttribute('price', `${types.sizes[1].price}`)
                    }
                    if (child.getAttribute('value') === 'large') {
                        child.setAttribute('price', `${types.sizes[2].price}`)
                    }
                    if (child.getAttribute('value') === 'xlarge') {
                        child.setAttribute('price', `${types.sizes[3].price}`)
                    }
                }
                newElquantity.innerHTML = `${order.pricing.quantity}`
                newElsize.innerHTML = `${order.size}`
                newEltype.innerHTML = `${order.name}`
                newEltype.setAttribute('type', `${order.name}`)
                newElprice.innerHTML = `${order.pricing.subtotal}`

                productId.setAttribute('value', `${order.id}`)

                document.body.appendChild(appcart)
                //  this.addCartChannel.close()
            })

        }, {
            once: true
        })
    }
    /**
     * @name onAuthAddCartItem
     * @function
     * 
     * @description creates authenticated user's shopping-cart elements, add them to the cart, and mounts them to the DOM
     * 
     * @return does not return anything
     * 
     */
    onAuthAddCartItem(event) {
        // console.log('event', event)
        const appcart = document.createElement('shopping-cart')
        const responsive = appcart.shadowRoot.querySelector('.responsive')
        responsive.style.display = 'block'
        const productId = appcart.shadowRoot.querySelector('#productId')
        const newElquantity = appcart.shadowRoot.querySelector('.newElquantity ')
        const newElsize = appcart.shadowRoot.querySelector('.newElsize')
        const newEltype = appcart.shadowRoot.querySelector('.newEltype')
        const newElprice = appcart.shadowRoot.querySelector('.newElprice')
        const choice = appcart.shadowRoot.getElementById('size')

        const data = event.data.order
        const menuTypes = event.data.types
        const types = menuTypes[`${data.name}`]

        for (let child of choice.children) {
            child.setAttribute('type', `${data.name}`)
            child.setAttribute('name', `${data.name.toUpperCase()}`)

            if (child.getAttribute('value') === 'small') {
                child.setAttribute('price', `${types.sizes[0].price}`)
            }
            if (child.getAttribute('value') === 'medium') {
                child.setAttribute('price', `${types.sizes[1].price}`)
            }
            if (child.getAttribute('value') === 'large') {
                child.setAttribute('price', `${types.sizes[2].price}`)
            }
            if (child.getAttribute('value') === 'xlarge') {
                child.setAttribute('price', `${types.sizes[3].price}`)
            }
        }
        newElquantity.innerHTML = `${data.pricing.quantity}`
        newElsize.innerHTML = `${data.size}`
        newEltype.innerHTML = `${data.name}`
        newEltype.setAttribute('type', `${data.name}`)
        newElprice.innerHTML = `${data.pricing.subtotal}`
        productId.setAttribute('value', `${data.id}`)
        // console.log(data)

        document.body.appendChild(appcart)
        // this.addCartChannel.close()
    }
    /**
     * @name onGuestAddCartItem
     * @function
     * 
     * @description creates guest user's shopping-cart elements, add them to the cart, and mounts them to the DOM
     * 
     * @return does not return anything
     * 
     */
    onGuestAddCartItem() {
        const appcart = document.createElement('shopping-cart')
        const responsive = appcart.shadowRoot.querySelector('.responsive')
        responsive.style.display = 'block'
        const productId = appcart.shadowRoot.querySelector('#productId')
        const newElquantity = appcart.shadowRoot.querySelector('.newElquantity ')
        const newElsize = appcart.shadowRoot.querySelector('.newElsize')
        const newEltype = appcart.shadowRoot.querySelector('.newEltype')
        const newElprice = appcart.shadowRoot.querySelector('.newElprice')
        const choice = appcart.shadowRoot.getElementById('size')

        const data = event.data.order
        // const data = event.data.item
        const menuTypes = event.data.types
        const types = menuTypes[`${data.name}`]
        // const types = this.types[`${data.name}`]

        for (let child of choice.children) {
            child.setAttribute('type', `${data.name}`)
            child.setAttribute('name', `${data.name.toUpperCase()}`)

            if (child.getAttribute('value') === 'small') {
                child.setAttribute('price', `${types.sizes[0].price}`)
            }
            if (child.getAttribute('value') === 'medium') {
                child.setAttribute('price', `${types.sizes[1].price}`)
            }
            if (child.getAttribute('value') === 'large') {
                child.setAttribute('price', `${types.sizes[2].price}`)
            }
            if (child.getAttribute('value') === 'xlarge') {
                child.setAttribute('price', `${types.sizes[3].price}`)
            }
        }
        newElquantity.innerHTML = `${data.pricing.quantity}`
        newElsize.innerHTML = `${data.size}`
        newEltype.innerHTML = `${data.name}`
        newEltype.setAttribute('type', `${data.name}`)
        newElprice.innerHTML = `${data.pricing.subtotal}`
        productId.setAttribute('value', `${data.id}`)

        document.body.appendChild(appcart)
        // this.addCartChannel.close()
    }

    /**
     * @name onGuestLoadCartData
     * @function
     * 
     * @description creates guest user's shopping-cart elements and mounts them to the DOM upon load event
     * 
     * @return does not return anything
     * 
     */
    onGuestLoadCartData() {
        window.addEventListener('reload', event => {

        }, {
            once: true
        })
        return window.addEventListener('load', async event => {

            try {
                // console.log('event')
                const store = this.store('orders', 'readwrite')

                const request = store.getAll()

                request.onerror = event => {
                    console.log('ERROR')
                }
                request.onsuccess = event => {
                    // console.log('SUCCESS')
                    const data = request.result
                    if (data && data.length > 0) {
                        data.forEach(datum => {

                            const appcart = document.createElement('shopping-cart')
                            const responsive = appcart.shadowRoot.querySelector('.responsive')
                            responsive.style.display = 'block'
                            const productId = appcart.shadowRoot.querySelector('#productId')
                            const newElquantity = appcart.shadowRoot.querySelector('.newElquantity')
                            const newElsize = appcart.shadowRoot.querySelector('.newElsize')
                            const newEltype = appcart.shadowRoot.querySelector('.newEltype')
                            const newElprice = appcart.shadowRoot.querySelector('.newElprice')
                            const choice = appcart.shadowRoot.getElementById('size')

                            const types = this.types[`${datum.name}`]
                            //  console.log('datum', datum)
                            for (let child of choice.children) {
                                child.setAttribute('type', `${datum.name}`)
                                child.setAttribute('name', `${datum.name.toUpperCase()}`)

                                if (child.getAttribute('value') === 'small') {
                                    child.setAttribute('price', `${types.sizes[0].price}`)
                                }
                                if (child.getAttribute('value') === 'medium') {
                                    child.setAttribute('price', `${types.sizes[1].price}`)
                                }
                                if (child.getAttribute('value') === 'large') {
                                    child.setAttribute('price', `${types.sizes[2].price}`)
                                }
                                if (child.getAttribute('value') === 'xlarge') {
                                    child.setAttribute('price', `${types.sizes[3].price}`)
                                }
                            }

                            newElquantity.innerHTML = `${datum.pricing.quantity}`
                            newElsize.innerHTML = `${datum.size}`
                            newEltype.innerHTML = `${datum.name}`
                            newEltype.setAttribute('type', `${datum.name}`)
                            newElprice.innerHTML = `${datum.pricing.subtotal}`
                            productId.setAttribute('value', `${datum.id}`)

                            document.body.appendChild(appcart)
                            // this.addCartChannel.close()
                        })
                    }
                }
            } catch (error) {
                window.location.reload()

                // console.log('event')
                const store = this.store('orders', 'readwrite')


                const request = store.getAll()

                request.onerror = event => {
                    console.log('ERROR')
                }
                request.onsuccess = event => {
                    // console.log('SUCCESS')
                    const data = request.result
                    if (data && data.length > 0) {
                        data.forEach(datum => {

                            const appcart = document.createElement('shopping-cart')
                            const responsive = appcart.shadowRoot.querySelector('.responsive')
                            responsive.style.display = 'block'
                            const productId = appcart.shadowRoot.querySelector('#productId')
                            const newElquantity = appcart.shadowRoot.querySelector('.newElquantity')
                            const newElsize = appcart.shadowRoot.querySelector('.newElsize')
                            const newEltype = appcart.shadowRoot.querySelector('.newEltype')
                            const newElprice = appcart.shadowRoot.querySelector('.newElprice')
                            const choice = appcart.shadowRoot.getElementById('size')

                            const types = this.types[`${datum.name}`]
                            //  console.log('datum', datum)
                            for (let child of choice.children) {
                                child.setAttribute('type', `${datum.name}`)
                                child.setAttribute('name', `${datum.name.toUpperCase()}`)

                                if (child.getAttribute('value') === 'small') {
                                    child.setAttribute('price', `${types.sizes[0].price}`)
                                }
                                if (child.getAttribute('value') === 'medium') {
                                    child.setAttribute('price', `${types.sizes[1].price}`)
                                }
                                if (child.getAttribute('value') === 'large') {
                                    child.setAttribute('price', `${types.sizes[2].price}`)
                                }
                                if (child.getAttribute('value') === 'xlarge') {
                                    child.setAttribute('price', `${types.sizes[3].price}`)
                                }
                            }

                            newElquantity.innerHTML = `${datum.pricing.quantity}`
                            newElsize.innerHTML = `${datum.size}`
                            newEltype.innerHTML = `${datum.name}`
                            newEltype.setAttribute('type', `${datum.name}`)
                            newElprice.innerHTML = `${datum.pricing.subtotal}`
                            productId.setAttribute('value', `${datum.id}`)

                            document.body.appendChild(appcart)
                            // this.addCartChannel.close()
                        })
                    }
                }
            }
        }, {
            once: true
        })
    }
    /**
     * @name init
     * @function
     * 
     * @description creates  authenticated user's shopping-cart elements from his/her orders and mounts them to the DOM upon load event
     * 
     * @return does not return anything
     * 
     */
    async onInit() {
        const auth = await this.authUser()
        const orders = await this.authOrders()
        if (auth && auth !== null && orders && orders.length) {

            orders.forEach(order => {
                // console.log('on load order', order)
                const appcart = document.createElement('shopping-cart')
                const responsive = appcart.shadowRoot.querySelector('.responsive')
                responsive.style.display = 'block'
                const productId = appcart.shadowRoot.querySelector('#productId')
                const newElquantity = appcart.shadowRoot.querySelector('.newElquantity')
                const newElsize = appcart.shadowRoot.querySelector('.newElsize')
                const newEltype = appcart.shadowRoot.querySelector('.newEltype')
                const newElprice = appcart.shadowRoot.querySelector('.newElprice')
                const choice = appcart.shadowRoot.getElementById('size')

                const types = this.types[`${order.name}`]

                for (let child of choice.children) {
                    child.setAttribute('type', `${order.name}`)
                    child.setAttribute('name', `${order.name.toUpperCase()}`)

                    if (child.getAttribute('value') === 'small') {
                        child.setAttribute('price', `${types.sizes[0].price}`)
                    }
                    if (child.getAttribute('value') === 'medium') {
                        child.setAttribute('price', `${types.sizes[1].price}`)
                    }
                    if (child.getAttribute('value') === 'large') {
                        child.setAttribute('price', `${types.sizes[2].price}`)
                    }
                    if (child.getAttribute('value') === 'xlarge') {
                        child.setAttribute('price', `${types.sizes[3].price}`)
                    }
                }
                newElquantity.innerHTML = `${order.pricing.quantity}`
                newElsize.innerHTML = `${order.size}`
                newEltype.innerHTML = `${order.name}`
                newEltype.setAttribute('type', `${order.name}`)
                newElprice.innerHTML = `${order.pricing.subtotal}`
                productId.setAttribute('value', `${order.id}`)

                document.body.appendChild(appcart)
                //  this.addCartChannel.close()
            })
        }
    }
    /**
     * @name init
     * @function
     * 
     * @description loads authentacted user's shopping cart elements to the DOM
     * 
     * @return does not return anything
     * 
     */
    async onAuth() {

        window.addEventListener('DOMContentLoaded', async event => {
            await this.onInit()
        })
        this.addCartChannel.addEventListener('message', this.onAuthAddCartItem, {
            once: true
        })
        this.showCartItemUpdateForm()
        this.updateCartItem()
        this.removeCartItem()
    }
    /**
     * @name onGuest
     * @function
     * 
     * @description loads guest user's shopping cart elements to the DOM
     * 
     * @return does not return anything
     * 
     */
    async onGuest() {
        const auth = await this.auth()
        if (!auth || auth === null) {
            this.addCartChannel.addEventListener('message', this.onGuestAddCartItem, {
                once: true
            })
            this.onGuestLoadCartData()
            this.showCartItemUpdateForm()
        }
    }
    /**
     * @name setAuthCartData
     * @function
     * 
     * @description set authenticated user's orders details
     * 
     * @return does not return anything
     * 
     */
    setAuthCartData() {
        this.authOrders()
            .then(data => {
                const orders = data
                //  console.log('authOrders', data)
                for (let datum of orders) {
                    const order = {}
                    order.phone = datum.user.phone
                    order.pricing = datum.pricing
                    order.name = datum.name
                    order.size = datum.size
                    order.toppings = datum.toppings
                    order.placed = datum.placed
                    order.created_at = datum.created_at
                    order.updated_at = datum.updated_at
                    order.id = datum.id
                    order.user = datum.user
                    this.offlineOrders.push(order)
                }
                // console.log(this.offlineOrders)

            })
            .catch(error => {
                console.log('no order found')
                // this.showCartDetails()
            })

    }

    /**
     * @name showCartItemUpdateForm
     * @function
     * 
     * @description shows and hide cart item form
     * 
     * @return {Event} a click event
     * 
     */
    showCartItemUpdateForm() {

        return this.editBtn.addEventListener('click', event => {
            event.preventDefault()
            this.editContainer.style.display = 'none'
            this.optionsForm.style.display = 'flex'
        })
    }

    /**
     * @name updateCartItem
     * @function
     * 
     * @description updates shopping cart items
     * 
     * @return {Event} a submit event
     * 
     */
    updateCartItem() {
        return this.optionsForm.addEventListener('submit', event => {
            event.preventDefault()
            this.editContainer.style.display = 'flex'
            this.optionsForm.style.display = 'none'

            const productId = this.shadowRoot.getElementById('productId')

            if (this.authCheck()) {

                // console.log('deleted')
                this.authUser()
                    .then(auth => {
                        //  console.log('auth', auth)
                        //  const objectToUpdate = event.target.result
                        const quantity = this.shadowRoot.getElementById('quantity')

                        const choice = this.shadowRoot.getElementById('size')

                        let thisChild
                        for (let child of choice.children) {
                            if (child.getAttribute('value') === choice.value) {
                                thisChild = child
                                break
                            }
                        }

                        const type = thisChild.getAttribute('type')
                        const size = thisChild.getAttribute('value')
                        const amount = parseInt(quantity.value)
                        const id = productId.value

                        const data = {
                            id: id,
                            type: type,
                            size: size,
                            quantity: amount,
                            placed: false
                        }

                        this.updateAuthCartItem(data)
                            .then(response => {
                                const newElquantity = this.shadowRoot.querySelector('.newElquantity')
                                const newElsize = this.shadowRoot.querySelector('.newElsize')
                                const newEltype = this.shadowRoot.querySelector('.newEltype')
                                const newElprice = this.shadowRoot.querySelector('.newElprice')
                                productId.setAttribute('value', response.data.id)
                                newElquantity.innerHTML = `${response.data.pricing.quantity}`
                                newElsize.innerHTML = `${response.data.size}`
                                newEltype.innerHTML = `${response.data.name}`
                                newEltype.setAttribute('type', `${response.data.name}`)
                                newElprice.innerHTML = `${response.data.pricing.subtotal}`

                                this.updateCartChannel.postMessage({
                                    response: response.data
                                })
                            })
                            .catch(error => console.log('error', error))

                        //  this.removeCartItem({id: productId.value})
                        // //  this.parentNode.removeChild(this)
                        this.updateCartChannel.postMessage({
                            id: productId.value
                        })
                    })
                    .catch(console.error)
            } else {

                try {
                    const store = this.store('orders', 'readwrite')

                    const id = parseInt(productId.value)
                    const request = store.get(id)
                    request.onerror = event => {
                        console.log('error')
                    }

                    request.onsuccess = event => {
                        const objectToUpdate = event.target.result
                        const quantity = this.shadowRoot.getElementById('quantity')

                        const choice = this.shadowRoot.getElementById('size')

                        let thisChild
                        for (let child of choice.children) {
                            if (child.getAttribute('value') === choice.value) {
                                thisChild = child
                                break
                            }
                        }

                        const type = thisChild.getAttribute('type')
                        const size = thisChild.getAttribute('value')

                        const order = this.select(type, size, quantity.value, false)
                        objectToUpdate.pricing = order.pricing
                        objectToUpdate.size = order.size
                        const updating = store.put(objectToUpdate)

                        updating.onerror = event => {
                            console.log("Error updating ..")
                        }
                        updating.onsuccess = event => {
                            const updated = store.get(id)
                            updated.onerror = event => {
                                console.log('error fetching updated')
                            }
                            updated.onsuccess = event => {
                                const updatedObject = event.target.result
                                const newElquantity = this.shadowRoot.querySelector('.newElquantity')
                                const newElsize = this.shadowRoot.querySelector('.newElsize')
                                const newEltype = this.shadowRoot.querySelector('.newEltype')
                                const newElprice = this.shadowRoot.querySelector('.newElprice')
                                productId.setAttribute('value', updatedObject.id)
                                newElquantity.innerHTML = `${updatedObject.pricing.quantity}`
                                newElsize.innerHTML = `${updatedObject.size}`
                                newEltype.innerHTML = `${updatedObject.name}`
                                newEltype.setAttribute('type', `${updatedObject.name}`)
                                newElprice.innerHTML = `${updatedObject.pricing.subtotal}`
                                this.updateCartChannel.postMessage({
                                    updatedObject
                                })
                            }
                        }

                    }
                } catch (error) {
                    window.location.reload()
                    window.location.reload()
                    window.location.reload()
                    window.location.reload()
                    const store = this.store('orders', 'readwrite')
                    window.location.reload()
                    window.location.reload()
                    window.location.reload()
                    window.location.reload()

                    const id = parseInt(productId.value)
                    const request = store.get(id)
                    request.onerror = event => {
                        console.log('error')
                    }

                    request.onsuccess = event => {
                        const objectToUpdate = event.target.result
                        const quantity = this.shadowRoot.getElementById('quantity')

                        const choice = this.shadowRoot.getElementById('size')

                        let thisChild
                        for (let child of choice.children) {
                            if (child.getAttribute('value') === choice.value) {
                                thisChild = child
                                break
                            }
                        }

                        const type = thisChild.getAttribute('type')
                        const size = thisChild.getAttribute('value')

                        const order = this.select(type, size, quantity.value, false)
                        objectToUpdate.pricing = order.pricing
                        objectToUpdate.size = order.size
                        const updating = store.put(objectToUpdate)

                        updating.onerror = event => {
                            console.log("Error updating ..")
                        }
                        updating.onsuccess = event => {
                            const updated = store.get(id)
                            updated.onerror = event => {
                                console.log('error fetching updated')
                            }
                            updated.onsuccess = event => {
                                const updatedObject = event.target.result
                                const newElquantity = this.shadowRoot.querySelector('.newElquantity')
                                const newElsize = this.shadowRoot.querySelector('.newElsize')
                                const newEltype = this.shadowRoot.querySelector('.newEltype')
                                const newElprice = this.shadowRoot.querySelector('.newElprice')
                                productId.setAttribute('value', updatedObject.id)
                                newElquantity.innerHTML = `${updatedObject.pricing.quantity}`
                                newElsize.innerHTML = `${updatedObject.size}`
                                newEltype.innerHTML = `${updatedObject.name}`
                                newEltype.setAttribute('type', `${updatedObject.name}`)
                                newElprice.innerHTML = `${updatedObject.pricing.subtotal}`
                                this.updateCartChannel.postMessage({
                                    updatedObject
                                })
                            }
                        }

                    }
                }
            }




        }, {
            once: true
        })
    }
    /**
     * @name updateCartItem
     * @function
     * 
     * @description removes items from shopping cart
     * 
     * @return {Event} a click event
     * 
     */
    deletedAuthCartItem(data) {
        const url = 'https://wonderfulpizza.devoutprogrammer.com/api/orders/remove'
        const token = JSON.parse(window.localStorage.getItem('window number'))
        const options = {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'token': `${token.id}`,
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
        fetch(url, options)
            .then(response => response.json())
            .catch(error => console.log('error deleting', error))
    }
    removeCartItem(elementId = this.shadowRoot.getElementById('productId').value) {
        return this.removeBtn.addEventListener('click', event => {
            event.preventDefault()
            // const productId = this.shadowRoot.getElementById('productId')

            if (this.authCheck()) {
                // console.log('deleted')
                this.authUser()
                    .then(auth => {
                        // console.log('auth', auth, 'productId', productId)
                        this.deletedAuthCartItem({
                            id: elementId
                        })
                        console.log('deleted item', elementId)

                        this.removeCartItem({
                            id: elementId
                        })

                        this.parentNode.removeChild(this)
                        this.removeCartChannel.postMessage({
                            id: elementId
                        })
                    })
                    .catch(console.error)
            } else {
                const id = parseInt(elementId)
                const store = this.store('orders', 'readwrite')
                const request = store.delete(id)
                request.onerror = event => {
                    console.log('ERROR REMOVING...')
                }
                request.onsuccess = event => {
                    this.parentNode.removeChild(this)
                    console.log('ITEM REMOVED')
                    this.removeCartChannel.postMessage({
                        id
                    })
                }
            }
        })
    }

    /**
     * @name cartItemDetails
     * @function
     * 
     * @description gets details object of selected pizza objects
     * 
     * @param {String} type pizza type
     * 
     * @return {Object} selected pizza object details
     * 
     */
    cartItemDetails(type) {
        const details = {
            subtitle: `${this[`${type}Details`]().subtitle}`,
            description: `${this[`${type}Details`]().description}`
        }
        return details
    }

    /**
     * @name addCartItemToppings
     * @function
     * 
     * @description add topping details of selected pizza objects
     * 
     * @param {Array} toppingArray selected pizza toppings
     * 
     * @return does not return anything
     * 
     */

    addCartItemToppings = (toppingArray = []) => {
        if (!Array.isArray(toppingArray) || !toppingArray.length || toppingArray.length == 0) return
        const toppings = this.formField('toppings')
        toppingArray.forEach(topping => {
            const li = document.createElement('li')
            li.innerHTML = `${topping}`
            toppings.appendChild(li)
        })
    }

    /**
     * @name onCartItemInit
     * @function
     * 
     * @description Initiates and builds all attributes for the pizza object of the cart page 
     * 
     * @param {String} typePizza pizza type
     * 
     * @return Does not return anything
     * 
     */

    onCartItemInit(typePizza) {
        if (typeof typePizza !== 'string' || !typePizza.trim().length || typePizza.trim().length === 0) return
        const pizzaType = typePizza.trim().toLowerCase()

        this.cartItemToppings = this.callFirstOnlyNTimes(this.addCartItemToppings)

        const image = this.shadowRoot.getElementById('image')
        const link = this.shadowRoot.getElementById('image-link')
        const type = this.shadowRoot.getElementById('pizza-name')
        if (type.getAttribute('type') !== null) {
            if (type.getAttribute('type').toLowerCase().trim() === pizzaType) {
                image.setAttribute('src', `../../../../public/images/menu/${pizzaType}.jpg`)
                image.setAttribute('alt', `${pizzaType}`)
                // link.setAttribute('href', '../../../../public/images/menu/yummy.jpg')
                link.setAttribute('href', 'pizza')
                const topping = this.types[`${pizzaType}`]
                this.cartItemToppings(topping.toppings)
                if (pizzaType === 'wês') {
                    image.setAttribute('src', `../../../../public/images/menu/wes.jpg`)
                } else {
                    image.setAttribute('src', `../../../../public/images/menu/${pizzaType}.jpg`)
                }
                let pizzaImage
                if (pizzaType === 'wês') {
                    pizzaImage = `../../../../public/images/menu/swes.jpg`
                } else {
                    pizzaImage = `../../../../public/images/menu/s${pizzaType}.jpg`
                }
                link.addEventListener('click', event => {

                    const data = {
                        type: type.getAttribute('type').toLowerCase().trim(),
                        name: type.getAttribute('type').toUpperCase().trim(),
                        image: pizzaImage,
                        alt: image.getAttribute('alt'),
                        toppings: topping,
                        details: this.cartItemDetails(pizzaType)
                    }

                    window.localStorage.setItem('pizza', JSON.stringify(data))
                    this.sendRouteDataChanel.postMessage(data)
                })

            }
        }

    }
    init() {
        this.setVariables()
        this.onAuth()
        this.onGuest()
        this.clearAuthCartHandler()
    }
    /**
     * @name connectedCallback (element's life cycle)
     * @function
     * 
     * @description browser calls this method when the element is added or mounted to the document or DOM
     * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
    connectedCallback() {}

    /**
     * @name disconnectedCallback (element's life cycle)
     * @function 
     * 
     * @description browser calls this method when the element is removed or disconnect from the document or DOM
     * (can be called many times if an element is repeatedly added/removed)
     * 
     * @return does not return anything
     * 
     */
    disconnectedCallback() {}

    /**
     * @name observedAttributes (element's life cycle)
     * @function
     * 
     * @description array of attribute names to monitor for changes
     * 
     * @return does not return anything
     * 
     */
    static get observedAttributes() {
        return []
    }

    /**
     * @name attributeChangedCallback (element's life cycle)
     * @function
     * 
     * @description called when one of attributes listed above is modified (the attributes listed in the array returned by the observedAttribues method above)
     * 
     * @return does not return anything
     * 
     */

    attributeChangedCallback(name, oldValue, newValue) {}

    /**
     * @name adoptedCallback (element's life cycle)
     * @function
     * 
     * @description called when the element is moved to a new document
     * 
     * @return does not return anything
     * 
     */
    adoptedCallback() {}
}
customElements.define("shopping-cart-element", ShoppingCartElement);
export default ShoppingCartElement
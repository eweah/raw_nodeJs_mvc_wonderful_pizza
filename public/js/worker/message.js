'use strict'


self.addEventListener('message', event => {
    const url = 'https://wonderful-pizza-752d5.firebaseio.com/orders.json'
    const getOptions = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(event.data.order_placed)
    }
    fetch(url, getOptions)
        .then(response => response)
        .then(console.log)
        .catch(error => console.log('Failed to fetch', error))


    const store = DB.transaction('orders', 'readwrite').objectStore('orders')
    store.add(event.data.order_placed)

    const products = store.getAll()
    products.onerror = event => {
        console.log('ERROR FECTHING PRODUCTS')
    }
    products.onsuccess = event => {
        self.clients.matchAll({
            includeUncontrolled: false,
            type: 'window'
        }).then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    action: 'all-records',
                    data: products.result
                })
            })
        })
    }

    const OrdersStores = DB.transaction('orders').objectStore('orders')

    const request = OrdersStores.openCursor()
    const items = []
    request.onsuccess = function(event) {
        const cursor = event.target.result
        if (cursor) {
            items.push({ key: cursor.key, value: cursor.value })
            cursor.continue()
        } else {
            const latest = items.find(item => item.key === Math.max(...items.map(item => item.key)))
            self.clients.matchAll({
                includeUncontrolled: false,
                type: 'window'
            }).then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        action: 'latest-record',
                        data: latest
                    })
                })
            })
        }
    }
})
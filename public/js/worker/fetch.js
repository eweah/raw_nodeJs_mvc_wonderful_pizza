'use strict'


self.addEventListener('fetch', event => {
    console.log('[Service Worker] fetching ...')
    const url = 'https://wonderful-pizza-752d5.firebaseio.com/orders.json'

    if (event.request.url.indexOf(url) > -1) {
        event.respondWith(
            caches.open(CACHE_DYNAMIC_NAME)
            .then(function(cache) {
                return fetch(event.request)
                    .then(function(res) {
                        // trimCache(CACHE_DYNAMIC_NAME, 3);
                        console.log(res)
                        cache.put(event.request, res.clone());
                        return res;
                    });
            })
        );
    } else if (isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        );
    } else {
        event.respondWith(
            caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function(res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function(cache) {
                                    // trimCache(CACHE_DYNAMIC_NAME, 3);
                                    console.log(cache)
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        })
                        .catch(function(err) {
                            return caches.open(CACHE_STATIC_NAME)
                                .then(function(cache) {
                                    if (event.request.headers.get('accept').includes('text/html')) {
                                        return cache.match('/offline.html');
                                    }
                                });
                        });
                }
            })
        );
    }

//     console.log('[SERVICE WORKER] FECHTING  ....')
//     const store = DB.transaction('orders', 'readwrite').objectStore('orders')

//     const products = store.getAll()
//     products.onerror = event => {
//         console.log('ERROR FECTHING PRODUCTS')
//     }
//     products.onsuccess = event => {
//         self.clients.matchAll({
//             includeUncontrolled: false,
//             type: 'window'
//         }).then(clients => {
//             clients.forEach(client => {
//                 client.postMessage({
//                     action: 'all-records',
//                     data: products.result
//                 })
//             })
//         })
//     }
// })
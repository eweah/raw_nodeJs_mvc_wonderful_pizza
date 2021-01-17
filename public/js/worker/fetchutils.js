'use strict'

const broadcastData = data => {
    clients.matchAll({
        includeUncontrolled: false,
        type: 'window'
    }).then(clients => {
        clients.forEach(client => {
            client.postMessage({
                action: 'Data Fetched from dababase',
                data
            })
        })
    })
}
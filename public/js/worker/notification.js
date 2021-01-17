'use strict'

self.addEventListener('notificationclick', event => {
    console.log('[SERVICE WORKER] NOTIFYING ....')
    const notificatin = event.notification
    const action = event.action
    console.log(notificatin)
    if (action === 'confirm') {
        console.log('User confirmed')
        notificatin.close()
    } else if (action === 'cancel') {
        console.log('User canceled')
        notificatin.close()
    }

})

self.addEventListener('notificationclose', event => {
    console.log('[SERVICE WORKER] CLOSING ....', event)


})
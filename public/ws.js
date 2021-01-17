'use strict'
try {
    importScripts('../public/js/worker/variables.js')
    importScripts('../public/js/worker/install.js')
    importScripts('../public/js/worker/activate.js')
    importScripts('../public/js/worker/message.js')
    importScripts('../public/js/worker/fetch.js')
    importScripts('../public/js/worker/notification.js')
} catch (error) {
    console.log('FAILED TO LOAD WORKER FILES', error)
}
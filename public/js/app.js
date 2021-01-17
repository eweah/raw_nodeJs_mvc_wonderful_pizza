if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('../../public/ws.js')
    .then(registration => {
        // console.log(registration)
        // console.log(navigator.serviceWorker)
    })
    .catch(error => console.log('error', error))
}
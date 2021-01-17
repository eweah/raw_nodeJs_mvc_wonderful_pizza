function  byTimeEventList(){
    return [
           'orders:month',
           'orders:year',
           'orders:day',
           'orders:hour',
           'orders:minute',

           'users:month-months',
           'users:year-years',
           'users:day-days',
           'users:hour-hours',
           'users:minute-minutes'
       ]
   }


function byTimeEvent(event){
   return byTimeEventList().find(e => e === event)
}


function eventMethodFromString(event){
    return `on${byTimeEvent(event).split(':')[1]}s`
}
console.log(eventMethodFromString('orders:minute'))


'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module BaseElement
 * @kind class
 * 
 * @extends HTMLElement
 * 
 * @requires HTMLElement
 * 
 * @classdesc Base class for the front end system. The main and only ancestor of all the classes of the whole front end system (the entire frontend code base)
 * 
 * @typedef {Object} bdRequest (or db) the request instance of an indexedDB database
 * @typedef {Object} store an indexedDB database store
 * @typedef {Object} options indexedDB database settup options
 * 
 */
class BaseElement extends HTMLElement {
  constructor() {
    super()
    // auto bind methods
    this.autobind(BaseElement)

    // Creates or opens the application indexeDB database (the front end database)
    this.createDatabase('Wonderfull Pizza', 1, this.dbInitiatioinOptions())
 
    // Broadcasting channesl for communication between pages or navigation contexts
    this.addCartChannel = new BroadcastChannel('cart_add_channel')
    this.updateCartChannel = new BroadcastChannel('cart_update_channel')
    this.removeCartChannel = new BroadcastChannel('cart_remove_channel')
    this.clearAuthCartChannel = new BroadcastChannel('cart_auth_clear_channel')
    this.updateReviewChannel = new BroadcastChannel('review_update_channel')
    this.sendChatChannel = new BroadcastChannel('send_chat_channel')
    this.sendRouteDataChanel = new BroadcastChannel('send_route_data_channel')
    this.registationChannel = new BroadcastChannel('registration_channel')
    this.routeModelChannel = new BroadcastChannel('route_model_channel')

  }

    /**
     * @name autobinder
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     * 
     * @description auto sets and auto binds every and all methods for the corresponding class (except the constructor)
     * @return does not return anything
     * 
     */

    autobinder(className = {}){
      for(let method of Object.getOwnPropertyNames(className.prototype)){
        if(typeof(this[method]) === 'function' && method !=='constructor'){
            this[method] = this[method].bind(this)
        }
      }
  }
  /**
   * @name autobind
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   * 
   * @description auto mounts and auto binds every and all methods for the corresponding class including itself(it self mounts and self binds)
   * @return does not return anything
   * 
   */
 autobind(className = {}){
      this.autobinder = this.autobinder.bind(this)
      this.autobinder(className)
  }

    /**
     * @name promisify
     * @function
     *
     * @param {Function|Object} fn the function or object to be promisified
     *  
     * @description promisified functions or objects
     * @return {Function|Object} fn, the promisified function
     * 
     */
    promisify(fn){
      return (...args) => new Promise((resolve, reject) => fn(...args), (err, data) => (err ? reject(err) : resolve(data)))
  }

  
  /**
   * @name getField
   * @function
   *
   * @param {String|Object} attribute the attribute to extract
   *  
   * @description Receive the name of an attribute  and produce a new function that will be able to extract  an attribute from an object
   * 
   * @return {Function|Object} object, the function that will be able to extract an attribute from an object
   * 
   */
  getField (attribute){
      return object => object[attribute]
  }

  /**
   * @name pluckOff
   * @function
   *
   * @param {Function|Object} fn  the function to bind to object method
   *  
   * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
   * 
   *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
   * 
   * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
   * 
   * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
   * 
   */

  pluckOff(fn){
      return (...args) => fn.bind(...args)()
  }

   /**
   * @name callOnlyNTimes
   * @function
   *
   * @param {Function|Object} f the function to be called only n times

   * @param {Number} n number of time the function f() should be called
   *  
   * @description creates a function that calls and runs the function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times. For instance if n = 1 and the function is called 200 times, it would call or execute f() only once (no more than once). If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and no more than 5 times.
   * 
   * @return {Function|Object} a function that calls fn() only n times
   * 
   */
  callOnlyNTimes(fn, n = 1) {
      let done = false
      return (...args) => {
          if (!done) {
              done = true
              for (let i = 0; i < Math.abs(n); i++) {
                  fn(...args)
              }
          }
      }
  }

   /**
   * @name callFirstOnlyNTimes
   * @function
   *
   * @param {Function|Object} f the function to be called only n times
   * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
   * @param {Number} n number of time the function f() should be called
   *  
   * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
   * 
   * @return {Function|Object} a function that calls fn() only n times and g() afterward
   * 
   */
  callFirstOnlyNTimes(f = () => {}, g = () => {}, n = 1) {
      let done = false
      return (...args) => {
        if (!done) {
          done = true
          if (typeof n !== 'number' || n % 1 !== 0) {
            f(...args)
          } else {
            for (let i = 1; i <= Math.abs(n); i++) {
              f(...args)
            }
          }
        } else {
          g(...args)
        }
      }
    }

  /**
   * @name inputsValid
   * @function
   *
   * @param {Function} arr  the array to validate
   * @param {Function} fn  the call back function to validate
   * @param {Number} flat arr flattening depth to validate
   *  
   * @description validates inputs
   * 
   * @return {Boolean} true if inputs are valid and false if inputs are invalid
   * 
   */
    inputsValid(arr = [], fn = () => {}, flat = 1){
      if (!Array.isArray(arr)) return false
      if (typeof fn !== 'function') return false;
      if (typeof flat !== 'number' || flat < 0 || (flat % 1 !== 0 && flat !== Infinity)) return false;
      return true
    }

   /**
   * @name none
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array
   * 
   * @return {Array|Object} array, the filtered array for which the predicate is true
   * 
   */
    none (arr = [], fn = () => false, flat = 0){
     return this.inputsValid(arr, fn, flat) ? arr.flat(flat).every(v => !fn(v)) : false
  };

   /**
   * @name forEachAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  loops an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successfull
   * 
   */
  forEachAsync (arr = [], fn = () => false, flat = 0){
      if(this.inputsValid(arr, fn, flat)){
          return arr.flat(flat).reduce((promise, value) => promise.then(() => fn(value)), Promise.resolve());
      }else{
          return undefined
      }
     
  }
      
  /**
   * @name mapAsync
   * @function
   *
   * @param {Array|Object} arr the array to loop throug
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  maps an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successfull
   * 
   */
  mapAsync(arr = [],fn = () => [], flat = 0){
      return  this.inputsValid(arr, fn, flat)? Promise.all(arr.flat(flat).map(fn)): []
  }

  /**
   * @name filterAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  filters an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successfull
   * 
   */

  filterAsync (arr = [], fn = () => [], flat = 0){
      if(this.inputsValid(arr, fn, flat)){
          return this.mapAsync(fn, flat).then(array => arr.flat(flat).filter((v, i) => Boolean(array[i])));
      }else{
          return []
      }
  }

  /**
   * @name reduceAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description asynchronously  reduces an array
   * 
   * @return {Promise}  a promise if promise is fulfilled and successfull
   * 
   */

  async reduceAsync (arr =[], fn = () => {}, init, flat = 0){
     if(this.inputsValid(arr, fn, flat)){
      return Promise.resolve(init).then(accumulator => this.forEachAsync(arr.flat(flat), async (v, i) => {
          accumulator = fn(accumulator, v, i)
      }).then(() => accumulator));
     }else{
         return 0
     }
  }
  /**
   * @name filter
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array
   * 
   * @return {Array|Object} array, the filtered array
   * 
   */
  filtered (arr = [], fn = () => [], flat = 1){
      return this.inputsValid(arr, fn, flat) ? arr.flat(flat).filter(x => fn(x)) : []
  }

  /**
   * @name filterItems
   * @function
   * 
   * @param {Array|Object} arr the array to filter
   * @param {String} query any fitlering query
   *  
   * @description asynchronously read a query and filter arrays according to the query
   * 
   * @return {Array}  the query filtered array
   * 
   */
  filterItems(query, arr = []){
      if (!Array.isArray(arr)) return []
      return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 

   /**
   * @name some
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array according to the thruthiness of the predicate
   * 
   * @return {Boolean} true if at least one of the array items for which the predicate is true if found. false otherwise
   * 
   */
  some(arr = [], fn = () => false, flat = 0){
      return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x || fn(y), false) : false
  } 

  /**
   * @name every
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array according to the thruthiness of the predicate
   * 
   * @return {Boolean} true if each one of the array items for which the predicate is true if found. false otherwise
   * 
   */
  every(arr = [], fn = () => false, flat = 0) {
     if(this.inputsValid(arr, fn, falt)){
      let result = [];
      arr.flat(flat).reduce((x, y) => (x === false && fn(y) ? result.push(y) : result.pop()), false);
      return result.length === arr.flat(flat).length ? true : false;
     }else{
         return false
     }
  }

  /**
   * @name forEach
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back funcction
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description performs fn() operation for each of the array elements
   * 
   * @return {Function|Object} the resulting object or array or element from the fn() operation 
   * 
   */

  forEach(arr = [], fn = () => false, flat = 0) {
      if(this.inputsValid(arr, fn, flat)){
          for (let i = 0; i < arr.flat(flat).length; i++) {
              fn(arr.flat(flat)[i]);
          }
      }else{
          return undefined
      }
  };

  /**
   * @name filter
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back funcction
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description filters an array according to the thruthiness of the predicate
   * 
   * @return {Array} the resulting array
   * 
   */

  filter(arr = [], fn = () => false, flat = 0) {
     if(this.inputsValid(arr, fn, flat)){
      let result = [];
      for (let i = 0; i < this.flat(flat).length; i++) {
          fn(arr.flat(flat)[i]) ? result.push(arr.flat(flat)[i]) : [];
      }
      return result.length > 0 ? result : [];
     }else{
         return []
     }
  };

  /**
   * @name flatten
   * @function
   *
   * @param {Array} arr the array to flatten
   *  
   * @description filten an array to whatsover depth or level it has
   * 
   * @return {Array} the resulting flattened array
   * 
   */

  flatten (arr =[]) {
      const result = [];
      arr.forEach(el => (Array.isArray(el) ? result.push(...flatten(el)) : result.push(el)));
      return result;
  };

   /**
   * @name findIndex
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back funcction
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description find the index of an array element
   * 
   * @return {Array} the resulting array element
   * 
   */
  findIndex (arr = [], fn = () => false, flat = 0) {
      if(this.inputsValid(arr, fn, flat)){
          return arr.flat(flat).reduce((x, y, z) => (x === -1 && fn(y) ? z : x), -1);
      }else{
          return undefined
      }

      
  };

  /**
   * @name map
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description maps each element with the resulting operation of the callback function
   * 
   * @return {Array} the resulting array 
   * 
   */
  map (arr = [], fn = () => [], flat = 0) {
      return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x.concat(fn(y)), []) : []
  };

  /**
   * @name find
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *  
   * @description find the first array element for which the predicate is true
   * 
   * @return {Array} the resulting array element
   * 
   */
  find (arr = [], fn = () => false, flat = 0) {
       if(this.inputsValid(arr,fn,flat)){
          return arr.flat(flat).reduce((x, y) => (x === undefined && fn(y) ? y : x), undefined);
       }else{
           return undefined
       }
  };

   /**
   * @name billOnceAndOnlyOnce
   * @function
   *
   * @param {Function|Object} bill the function to call for billing

   * @param {Function|Object} dontBill the function to call to avoid billing
   *  
   * @description creates a function that is called and runs only onces no matter how many times the function is called or used in the loop. For instance if the function is called 200 times, it would be called or executed only the first round (no more than once); that is it would 1 time and not run the rest of 199 times.
   * 
   * @return {Function|Object} a function that bills only once not matter what
   * 
   */

  billOnceAndOnlyOnce(bill, dontBill) {
    let timeToBill = bill
    return (...args) => {
      let result = timeToBill(...args)
      timeToBill = dontBill
      return result
    }
  }

  /**
   * @name authCheck
   * @function
   *  
   * @description checks for the presence of an authenticated user
   * 
   * @return {Boolean} true if an authenticated user is found; false otherwise
   * 
   */
  authCheck() {
    try {
      if (JSON.parse(window.localStorage.getItem('window number')) !== null) {
        const token = JSON.parse(window.localStorage.getItem('window number'))
        if (token.id && token.phone) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  /**
   * @name authCheck
   * @function
   *  
   * @description gets the token of the authenticated user
   * 
   * @return {Object} the token of the authenticated user
   * 
   */
  token() {
    try {
      if (this.authCheck()) {
        return JSON.parse(window.localStorage.getItem('window number'))
      } else {
        return {}
      }
    } catch (error) {
      return {}
    }
  }
  /**
   * @name forceLogout
   * @function
   *  
   * @description forcefully logs the user out when the token expires
   * 
   * @return does not return anything
   * 
   */
  forceLogout(){
    if(this.authCheck()){
      if(this.token().expires < Date.now()){
        window.localStorage.removeItem('window number')
        window.location.reload()
        return
      }
    }
  }


  /**
   * --------------------------------------------------------
   *
   *               API END POINTS
   * 
   * --------------------------------------------------------
   */
  /**
   * @name orders
   * @function
   *  
   * @description gets all the orders of the authenticated user
   * 
   * @return {Object} orders object
   * 
   */
  async orders() {
    if (this.authCheck()) {
      const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/auth/orders'
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'token': this.token().id,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } else {
      return {}
    }
  }
   /**
   * @name orders
   * @function
   *  
   * @param {Object} data all orders request object or details
   * 
   * @description gets all orders
   * 
   * @return {Object} orders object
   * 
   */
  async getUserOrders(data = {}) {
    if (this.authCheck()) {
      // Default options are marked with *
      const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/all'
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'token': this.token().id,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
  }

 /**
   * @name updatedCartItem
   * @function
   *  
   * @param {Object} data the request data
   * @param {String} url the fecthing url
   * 
   * @description updates cart item
   * 
   * @return {Promise} the updated cart item uppon fullfil
   * 
   */
  async updatedCartItem(url = '', data = {}) {
    if (this.authCheck()) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'token': this.token().id,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
  }

  /**
   * @name removeCartItem
   * @function
   *  
   * @param {Object} data the request data
   * 
   * @description remove or delete cart item
   * 
   * @return {Promise} the removed or deleted cart item uppon fullfil
   * 
   */
  async removeCartItem(data = {}) {
    const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/remove'
    if (this.authCheck()) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'token': this.token().id,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
  }

  /**
   * @name onAuthPlacedOrder
   * @function
   *  
   * @param {Object} data the request data
   * 
   * @description places on order on behalf of the authenticated user
   * 
   * @return {Promise} the purchsed order item uppon fullfil
   * 
   */
  async onAuthPlacedOrder(data = {}) {
    if (this.authCheck()) {
      const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/auth/order'
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'token': this.token().id,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
  }

  /**
   * @name deleteAccount
   * @function
   *  
   * @param {Object} data the request data
   * @param {String} url the fecthing url
   * 
   * @description removes or deletes the authenticated user's account
   * 
   * @return {Promise} the deleted user object uppon fullfil
   * 
   */
  async deleteAccount(url = '', data = {}) {
    if (this.authCheck()) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'token': this.token().id,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
  }
  /**
   * @name getAuthUser
   * @function
   *  
   * @description gets the authenticated user
   * 
   * @return {Object} the authenticated user object
   * 
   */
  async getAuthUser() {
    if (this.authCheck()) {
      const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/users/user'
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'token': this.token().id,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } else {
      return {}
    }

  }

  addToAuthCart(data) {
    const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/add'
    const token = JSON.parse(window.localStorage.getItem('window number'))
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        .then(response => {
            if (!response.Error) {
                const order = response.cartItem
                // console.log(order)
                window.localStorage.setItem('window', order.name)
                const types = this.storage().types
                this.addCartChannel.postMessage({
                    order,
                    types: types
                }, {
                    once: true
                })

                // CacheStorage
                // .open(this.CURRENT_ORDER_CACHE)
                // .then(console.log)
                // .catch(console.error)
                // console.log('storage ...', this.storage().types)
            }
        })
        .catch(error => console.log('error ', error))
}
addToGuestCart(data) {
    const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/guest/cart/add'
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            if (!response.Error) {
                const order = response.cartItem
                // console.log(order)
                window.localStorage.setItem('window', order.name)
                const types = this.storage().types
                this.addCartChannel.postMessage({
                    order,
                    types: types
                }, {
                    once: true
                })

                // CacheStorage
                // .open(this.CURRENT_ORDER_CACHE)
                // .then(console.log)
                // .catch(console.error)
                // console.log('storage ...', this.storage().types)
            }
        })
        .catch(error => console.log('error ', error))
}
deletedAuthCartItem(data) {
    const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/remove'
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
async updateAuthCartItem(data) {
    const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/edit '
    const token = JSON.parse(window.localStorage.getItem('window number'))
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
    const response = await fetch(url, options)
    // console.log('response.json()', response)
    return response.json()

}
   /**
     * @name updateAccount
     * @function
     * 
     * @param {String} url the account update url 
     * @param {Object} data the account update request data
     * 
     * @description updates the authenticated user's account
     * 
     * @return {Promise} the updated authenticated user's account upon fulfillment
     * 
     */
    async updateAccount(url = '', data = {}) {
      if (this.authCheck()) {
          // Default options are marked with *
          const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                  'token': this.token().id,
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
          return response.json(); // parses JSON response into native JavaScript objects
      }
    
    }
     /**
       * @name deleteAccount
       * @function
       * 
       * @description deletes the authenticated user's account
       * 
       * @return {Promise} nothing account upon fulfillment
       * 
       */
    async deleteAccount() {
      if (this.authCheck()) {
          // Default options are marked with *
          const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/users/remove'
          const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                  'token': this.token().id,
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify({id: this.token().id}) // body data type must match "Content-Type" header
          });
          this.logout()
          return response.json(); // parses JSON response into native JavaScript objects
      }
    
    }

     /**
     * @name deletedCartItem
     * @function
     * 
     * @description removes or deletes shopping cart items
     * 
     * @return {Promise} nothing upon successful fulfillment
     * 
     */
    deletedCartItem(data){
      const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/remove'
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

    /**
     * @name contact
     * @function
     * 
     * @param data
     * @description process the user's contacting actions
     * 
     * @return {Promise} nothing upon successfull fulfillment
     * 
     */
    async contact(data) {
      const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/contact'
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
   

  }


  /**
   * @name login
   * @function
   * 
   * @param {String} url the request url 
   * @param {Object} data the request data
   * 
   * @description logs the user in
   * 
   * @return {Promise} requested token upon fulfilment
   * 
   */
  async login(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async onGuestPlacedOrder(data = {}) {
    const url = 'https://www.wonderfulpizzas.ericsonweah.com/api/orders/guest/add'
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async register(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  /**
   * @name authUser
   * @function
   *  
   * @description sets the authenticated user
   * 
   * @return {Object}  the authenticated user object
   * 
   */
  async authUser() {
    if (this.authCheck()) {
      const response = await this.getAuthUser()
      return response
    } else {
      return null
    }
  }

   /**
   * @name authUser
   * @function
   *  
   * @description sets the authenticated user
   * 
   * @return {Object}  the authenticated user object
   * 
   */
  auth = async () => await this.authUser()

   /**
   * @name isLoggedIn
   * @function
   *  
   * @description checks and verifies if the current user is actually authenticated
   * 
   * @return {Boolean}  true is user has acctually been authenticated; false otherwise
   * 
   */
  isLoggedIn() {
    if (this.authCheck()) {
      return this.authUser()
        .then(() => true)
        .catch(() => false)
    } else {
      return false
    }
  }

 

  /**
   * @name authOrders
   * @function
   *  
   * @description gets all orders for the authenticated user
   * 
   * @return {Promise} the orders item uppon fullfil
   * 
   */
  async authOrders() {
    if (this.authCheck()) {
      const auth = await this.authUser()
      const data = {
        phone: auth.phone
      }
      const orderObeject = await this.getUserOrders(data)

      const orders = orderObeject.items
      // console.log('auth orders', orders)

      return orders
    } else {
      return {}
    }
  }

   /**
   * @name broadcast
   * @function
   *
   * @param {String} channel the broadcasting channel
   * 
   * @description creates a new broadcasting channel
   * 
   * @return {Object} the broadcasting object
   * 
   */
  broadcast(channel) {
    return new BroadcastChannel(channel)
  }

  /**
   * @name receive
   * @function
   *
   * @param {String} channel the broadcasting channel
   * 
   * @description receives a new broadcasting channel message
   * 
   * @return {Object} the event data object
   * 
   */
  receive(channel) {
    this.broadcast(channel).onmessage = event => {
      return event.data
    }
  }

  /**
   * @name send
   * @function
   *
   * @param {Object} message the broadcasting channel message
   * @param {String} channel the broadcasting channel
   * 
   * @description post messages to broadcasting channel
   * 
   * @return {Object} the broadcasting object
   * 
   */
  send(message, channel) {
    this.broadcast(channel).postMessage(message)
  }

    /**
   * @name events
   * @function
   *
   * @param {String} name name of the custom event 
   * @param {Object} detail detail options or data of the custom event
   * @param {Object} options options for the custom event
   * 
   * @description  create a new custom event
   * 
   * @return {Event} the new custom event
   * 
   */
  events(name, detail = {}, options = {
    bubbles: true,
    composed: true,
    detail: detail
  }) {
    return new CustomEvent(name, options)
  }

    /**
   * @name isNotEmpty
   * @function
   *
   * 
   * @description checks to see if window.localStorage is empty
   * 
   * @return {Boolen} true if it is empty; false otherwise
   * 
   */
  isNotEmpty() {
    return !!(localStorage.length > 0)
  }

   /**
   * @name isPresent
   * @function
   *
   * @param {String} localObject string representing the same of the local storage object/item
   * 
   * @description checks for the presence of an item in local storage
   * 
   * @return {Boolean} true if the object is found; false otherwise
   * 
   */
  isPresent(localObject) {
    return !!(window.localStorage.getItem(localObject) !== null)
  }

   /**
   * @name getLocalData
   * @function
   *
   * @param {String} data string representing the same of the local storage object/item
   * 
   * @description gets item from local storage
   * 
   * @return {String|Object} the local storage item 
   * 
   */
  getLocalData(data) {
    return JSON.parse(window.localStorage.getItem(data))
  }

    /**
     * @name callFirstOnlyNTimes
     * @function
     *
     * @param {Function|Object} f the function to be called only n times
     * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
     * @param {Number} n number of time the function f() should be called
     *  
     * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
     * 
     * @return {Function|Object} a function that calls fn() only n times and g() afterward
     * 
     */
  callFirstOnlyNTimes(f, g = () => {}, n = 1) {
    let done = false
    return (...args) => {
      if (!done) {
        done = true
        if (typeof n !== 'number' || n % 1 !== 0) {
          f(...args)
        } else {
          for (let i = 1; i <= Math.abs(n); i++) {
            f(...args)
          }
        }
      } else {
        g(...args)
      }
    }
  }


  // setIndexedDB() {
  //   window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  //   window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  //   window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  // }

  /**
     * @name createDatabase
     * @function
     *
     * @param {String} dbName the indexedDB database name. It defaults to App
     * @param {String} dbVersion the indexedDB database version. It defaults to 1
     * @param {Object} options the indexedDB database initiation options.
     *    ** the options has three main components:
     * 
     *        1. store: an array of strings representing store names. You can pass as many store names as  you want to use when creating or opening the indexedDB database. It defaults to empty array (meaning no store names)
     *       2. storeOptions: an array of object containing options for all and each of the store names passed to the store array of the names of all the database stores. Each element of this array represents the options for each of the store named in (1.store) above. This must be of the same length as the store array above
     *       3. indexes: an array of arrays containing all the indexes for all and each store name passed to the store array of names of the database stores. Each array in this array is the index options of each store names in (1. store) above. Must be of the same length as the store and storeOptions arrays. Each index array in this array can also be an array. So indexes  is an array of arrays of arrays (3 levels)
     *      *** see  above options for initialization (in the constructor)
     * 
     * @description sets, creates, opens, and initiallized indexedDB database with stores names, options, etc ...
     * 
     * @return {Object} an indexedDB Database instance
     * 
     */
  createDatabase(dbName = 'App', dbVersion = 1, options = {store: [],storeOptions: [], indexes: [[]]}) {

    // open or create indexedDB database
    this.dbRequest = window.indexedDB.open(dbName, dbVersion)
    this.DB
    this.db
    this.schema = []
   
    // on error event 
    this.dbRequest.onerror = event => {
        console.log('ERROR CREATING DATABASE ...', this.dbRequest.errorCode)
    }
    // on success event 
    this.dbRequest.onsuccess = event => {
       
        this.DB = event.target.result
        this.db = event.target.result
 
        this.DB_VERSION = parseInt(dbVersion)
        this.store = (store, flag) => this.db.transaction([store], flag).objectStore(store)
    }
    
 
    // on upgradeneeded event 
    this.dbRequest.onupgradeneeded = event => {
        this.db = event.target.result
    if (options && Array.isArray(options.store) && Array.isArray(options.storeOptions) && Array.isArray(options.indexes)) {
      // check and verify that the options argument object passed has a store, a storeOptions, and an indexes property
        if(!options.hasOwnProperty('store')) throw new Error('options must have a store property and it must be an array')
        if(!options.hasOwnProperty('storeOptions')) throw new Error('options must have a storeOptions property and it must be an array')
        if(!options.hasOwnProperty('indexes')) throw new Error('options must have an indexes property and it must be an array')
       // the store array, the storeOptions array, and the indexes array must have to same length
          if(options.store.length === options.storeOptions.length && options.storeOptions.length === options.indexes.length){
 
            this.countOptions = 0
            this.storesOptions = 0
            this.storeIndexingOptions = 0
            for (let name of options.store) {
 
                this.countOptions += 1
                // store schema names
                this.schema.push(`${name.slice(-name.length, -1)}Schema`)
                if (this.dbRequest.result.objectStoreNames[`${name}`] === name) {
                    this.db.transaction([name], 'readwrite').objectStore(name)
                } else {
                    if (typeof name !== 'string') {
                        throw new Error('store name must be a string')
                    }
 
                    // create schema store
                    this.schema[`${name.slice(-name.length, -1)}Schema`] = this.db.createObjectStore(name, options.storeOptions[this.storesOptions])
                    this.storesOptions++
 

                    // create schema store indexes
                      let indexOption = options.indexes[this.storeIndexingOptions]
                      if(Array.isArray(indexOption)){
                          for(let index of indexOption){
                              if(Array.isArray(index)){
                                for ( let indexOfIndex of index ){
                                    if(Array.isArray(indexOfIndex)){
                                    
                                        if(typeof indexOfIndex[0] === 'string' && typeof indexOfIndex[1] ==='string' && typeof indexOfIndex[2] === 'object'){
                                            this.schema[`${name.slice(-name.length, -1)}Schema`].createIndex(indexOfIndex[0], indexOfIndex[1], indexOfIndex[2])
                                        }
                                       
                                    }
                                }
                             
                                if(typeof index[0] === 'string' && typeof index[1] ==='string' && typeof index[2] === 'object'){
                                    this.schema[`${name.slice(-name.length, -1)}Schema`].createIndex(index[0], index[1], index[2])
                                }
        
                              }
                          }
                         
                        if(typeof indexOption[0] === 'string' && typeof indexOption[1] ==='string' && typeof indexOption[2] === 'object'){
                            this.schema[`${name.slice(-name.length, -1)}Schema`].createIndex(indexOption[0], indexOption[1], indexOption[2])
                        }
                          this.storeIndexingOptions++
 
                      }else{
                          throw new Error('store index set must be an array')
                      }

                      // make sure schema stores are ready before interacting with it for a data flow
                    this.schema[`${name.slice(-name.length, -1)}Schema`].transaction.oncomplete = event => {
                        this.db.transaction([name], 'readwrite').objectStore(name)
                        this.store = (store, flag) => this.db.transaction([store], flag).objectStore(store)
                    }
                }
                if (this.countOptions === options.store.length)
                    break
            }
 
          }else{
            throw new Error('options properties must be arrays of the same length')
            
          }
 
        } else {
            throw new Error('INVALID ARGUMENTS! Options must be an object with at the least three array properties: store, storeOptions, and indexes')
        }
 
    }   
 }
 
  /**
   * @name dbInitiatioinOptions
   * @function
   * 
   * @description crafts and sets indexedDB database options
   * 
   * @return {Object} the indexedDB database initiation options
   * 
   */
 dbInitiatioinOptions() {
   return {
     store: ['orders', 'carts', 'cards'],
     storeOptions: [{
       autoIncrement: true,
       keyPath: 'id'
     }, {
       autoIncrement: true,
       keyPath: 'id'
     }, {
       autoIncrement: true,
       keyPath: 'id'
     }],
     indexes: [
       ['number', 'number', {
         unique: true
       }],
 
       [
         ['type', 'type', {
           unique: false
         }],
         ['size', 'size', {
           unique: false
         }],
       ],
       ['type', 'type', {
         unique: false
       }]
     ]
   }
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
	  static get observedAttributes() {return []}

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
customElements.define("base-element", BaseElement);
export default BaseElement
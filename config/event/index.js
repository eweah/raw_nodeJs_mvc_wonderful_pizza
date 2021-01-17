'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Emitter
 * @kind class
 * 
 * 
 * @classdesc Emitter class for storing, emitting, keeping track of event types with their corresponding listeners
 * 
 */

class Emitter {
    constructor() {
        this.events = {}
    }

    /**
     * @name $on
     * @function
     *
     * @param {String} type event type or event name
     * @param {String} listener event listener name
     * 
     * @description listens to emitted event
     * @return does not return anything
     * 
     */

    $on(type, listener){
        this.events[type] = this.events[type] || []
        this.events[type].push(listener)
    }

    /**
     * @name $emit
     * @function
     *
     * @param {String} type event type or event name
     * 
     * @description emits event or event type
     * @return does not return anything
     * 
     */
    $emit(type) {
        if (this.events[type]) {
            this.events[type].forEach(listener => { listener() })
        }
    }
}

// Export Emitter

module.exports = Emitter
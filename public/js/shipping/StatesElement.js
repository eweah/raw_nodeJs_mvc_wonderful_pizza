'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module StateElement
 * @kind class
 * 
 * @extends Validator
 * 
 * @requires Validator
 * 
 * @classdesc stores all menu items details
 * 
 */
import Validator from '../common/Validator.js'

class StatesElement extends Validator{
  constructor() {
    super();
    // element created
  }

    /**
     * @name states
     * @function
     * 
     * @description holds all menu item details
     * 
     * @return {Array} all menu items
     * 
     */
    
  states(){return [{
      id: 6,
      name: 'Alaska',
      code: 'AK',
      zip: {
        min: 99501,
        max: 99950
      }
    },
    {
      id: 5,
      name: 'Alabama',
      code: 'AL',
      zip: {
        min: 35004,
        max: 36925
      }
    },
    {
      id: 8,
      name: 'Arkansas',
      code: 'AR',
      zip: {
        min: 71601,
        max: 75502
      }
    },
    {
      id: 7,
      name: 'Arizona',
      code: 'AZ',
      zip: {
        min: 85001,
        max: 86556
      }
    },
    {
      id: 9,
      name: 'California',
      code: 'CA',
      zip: {
        min: 90001,
        max: 96162
      }
    },
    {
      id: 10,
      name: 'Colorado',
      code: 'CO',
      zip: {
        min: 80001,
        max: 81658
      }
    },
    {
      id: 73,
      name: 'Connecticut',
      code: 'CT',
      zip: {
        min: 6001,
        max: 6928
      }
    },
    {
      id: 63,
      name: 'Dist of Columbia',
      code: 'DC',
      zip: {
        min: 20001,
        max: 20799
      }
    },
    {
      id: 12,
      name: 'Delaware',
      code: 'DE',
      zip: {
        min: 19701,
        max: 19980
      }
    },
    {
      id: 14,
      name: 'Florida',
      code: 'FL',
      zip: {
        min: 32004,
        max: 34997
      }
    },
    {
      id: 65,
      name: 'Georga',
      code: 'GA',
      zip: {
        min: 30001,
        max: 39901
      }
    },
    {
      id: 16,
      name: 'Hawaii',
      code: 'HI',
      zip: {
        min: 96701,
        max: 96898
      }
    },
    {
      id: 66,
      name: 'Iowa',
      code: 'IA',
      zip: {
        min: 50001,
        max: 68120
      }
    },
    {
      id: 17,
      name: 'Idaho',
      code: 'ID',
      zip: {
        min: 83201,
        max: 83876
      }
    },
    {
      id: 18,
      name: 'Illinois',
      code: 'IL',
      zip: {
        min: 60001,
        max: 62999
      }
    },
    {
      id: 19,
      name: 'Indiana',
      code: 'IN',
      zip: {
        min: 46001,
        max: 47997
      }
    },
    {
      id: 21,
      name: 'Kansas',
      code: 'KS',
      zip: {
        min: 66002,
        max: 67954
      }
    },
    {
      id: 22,
      name: 'Kentucky',
      code: 'KY',
      zip: {
        min: 40003,
        max: 42788
      }
    },
    {
      id: 23,
      name: 'Louisiana',
      code: 'LA',
      zip: {
        min: 70001,
        max: 71497
      }
    },
    {
      id: 58,
      name: 'Massachusetts',
      code: 'MA',
      zip: {
        min: 1001,
        max: 5544
      }
    },
    {
      id: 25,
      name: 'Maryland',
      code: 'MD',
      zip: {
        min: 20331,
        max: 21930
      }
    },
    {
      id: 24,
      name: 'Maine',
      code: 'ME',
      zip: {
        min: 3901,
        max: 4992
      }
    },
    {
      id: 27,
      name: 'Michigan',
      code: 'MI',
      zip: {
        min: 48001,
        max: 49971
      }
    },
    {
      id: 28,
      name: 'Minnesota',
      code: 'MN',
      zip: {
        min: 55001,
        max: 56763
      }
    },
    {
      id: 57,
      name: 'Missouri',
      code: 'MO',
      zip: {
        min: 63001,
        max: 65899
      }
    },
    {
      id: 59,
      name: 'Mississippi',
      code: 'MS',
      zip: {
        min: 38601,
        max: 71233
      }
    },
    {
      id: 31,
      name: 'Montana',
      code: 'MT',
      zip: {
        min: 59001,
        max: 59937
      }
    },
    {
      id: 38,
      name: 'North Carolina',
      code: 'NC',
      zip: {
        min: 27006,
        max: 28909
      }
    },
    {
      id: 39,
      name: 'North Dakota',
      code: 'ND',
      zip: {
        min: 58001,
        max: 58856
      }
    },
    {
      id: 32,
      name: 'Nebraska',
      code: 'NE',
      zip: {
        min: 68001,
        max: 69367
      }
    },
    {
      id: 34,
      name: 'New Hampshire',
      code: 'NH',
      zip: {
        min: 3031,
        max: 3897
      }
    },
    {
      id: 35,
      name: 'New Jersey',
      code: 'NJ',
      zip: {
        min: 7001,
        max: 8989
      }
    },
    {
      id: 36,
      name: 'New Mexico',
      code: 'NM',
      zip: {
        min: 87001,
        max: 88441
      }
    },
    {
      id: 33,
      name: 'Nevada',
      code: 'NV',
      zip: {
        min: 88901,
        max: 89883
      }
    },
    {
      id: 37,
      name: 'New York',
      code: 'NY',
      zip: {
        min: 6390,
        max: 14975
      }
    },
    {
      id: 40,
      name: 'Ohio',
      code: 'OH',
      zip: {
        min: 43001,
        max: 45999
      }
    },
    {
      id: 41,
      name: 'Oklahoma',
      code: 'OK',
      zip: {
        min: 73001,
        max: 74966
      }
    },
    {
      id: 42,
      name: 'Oregon',
      code: 'OR',
      zip: {
        min: 97001,
        max: 97920
      }
    },
    {
      id: 43,
      name: 'Pennsylvania',
      code: 'PA',
      zip: {
        min: 15001,
        max: 19640
      }
    },
    {
      id: 45,
      name: 'Rhode Island',
      code: 'RI',
      zip: {
        min: 2801,
        max: 2940
      }
    },
    {
      id: 46,
      name: 'South Carolina',
      code: 'SC',
      zip: {
        min: 29001,
        max: 29948
      }
    },
    {
      id: 47,
      name: 'South Dakota',
      code: 'SD',
      zip: {
        min: 57001,
        max: 57799
      }
    },
    {
      id: 48,
      name: 'Tennessee',
      code: 'TN',
      zip: {
        min: 37010,
        max: 38589
      }
    },
    {
      id: 61,
      name: 'Texas',
      code: 'TX',
      zip: {
        min: 73301,
        max: 88589
      }
    },
    {
      id: 50,
      name: 'Utah',
      code: 'UT',
      zip: {
        min: 84001,
        max: 84784
      }
    },
    {
      id: 52,
      name: 'Virginia',
      code: 'VA',
      zip: {
        min: 20040,
        max: 24658
      }
    },
    {
      id: 62,
      name: 'Vermont',
      code: 'VT',
      zip: {
        min: 5001,
        max: 5907
      }
    },
    {
      id: 53,
      name: 'Washington',
      code: 'WA',
      zip: {
        min: 98001,
        max: 99403
      }
    },
    {
      id: 55,
      name: 'Wisconsin',
      code: 'WI',
      zip: {
        min: 53001,
        max: 54990
      }
    },
    {
      id: 54,
      name: 'West Virginia',
      code: 'WV',
      zip: {
        min: 24701,
        max: 26886
      }
    },
    {
      id: 56,
      name: 'Wyoming',
      code: 'WY',
      zip: {
        min: 82001,
        max: 83128
      }
    },
  ]}

    /**
     * @name option
     * @function
     * 
     * @description gets the selected element in a select html 
     * 
     * @return {HTMLElement} the selected HTML element
     * 
     */

  option(elementId) {
    try {
      const choice = this.shadowRoot.getElementById(elementId)
      let thisChild
      for (let child of choice.children) {
        if (child.getAttribute('value') === choice.value) {
          thisChild = child
          break
        }
      }
      return thisChild
    } catch (error) {
      return []
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
customElements.define("app-states", StatesElement);
export default StatesElement
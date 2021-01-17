/**
 *  Storage: units  of each pizza type in stock or storage
 */
const menus = {
    types: {
        prairie: {
            toppings: ['Broccoli', 'Red Onions', 'Black Olives', 'Green Olives', 'Green Peppers', 'Spinach', 'Sliced Tomatoes', 'American Cheese'],
            name: 'prairie',
            sizes: [{
                size: 'small',
                price: '9.95'
            }, {
                size: 'medium',
                price: '12.75'
            }, {
                size: 'large',
                price: '17.45'
            }, {
                size: 'xlarge',
                price: '23.57'
            }],
            quantity: 600
        },
        texan: {
            toppings: ['Beef', 'Lettuce', 'Tomatoes', 'Taco Sauce', 'Red Onions', 'Pepperoni', 'Cheese'],
            name: 'texan',
            sizes: [{
                size: 'small',
                price: '10.45'
            }, {
                size: 'medium',
                price: '15.95'
            }, {
                size: 'large',
                price: '20.75'
            }, {
                size: 'xlarge',
                price: '25.69'
            }],
            quantity: 550
        },
        bronco: {
            toppings: ['Beef', 'Pepperoni', 'Canadian Bacon', 'Bacon Pieces', 'Black Olives', 'Lettuce', 'Tomatoes', 'Red Pepper'],
            name: 'bronco',
            sizes: [{
                size: 'small',
                price: '8.95'
            }, {
                size: 'medium',
                price: '11.85'
            }, {
                size: 'large',
                price: '14.45'
            }, {
                size: 'xlarge',
                price: '17.98'
            }],
            quantity: 500
        },
        roma: {
            toppings: ['Sliced Tomatoes', 'Green Pepper', 'Alfredo Sauce', 'Pineapple', 'Black Olives', 'Red Chilis'],
            name: 'roma',
            sizes: [{
                size: 'small',
                price: '9.97'
            }, {
                size: 'medium',
                price: '15.57'
            }, {
                size: 'large',
                price: '18.75'
            }, {
                size: 'xlarge',
                price: '22.69'
            }],
            quantity: 150
        },
        //this.italianPrices = [11.65, 13.45, 17.85, 27.85]
        italian: {
            toppings: ['Pepperoni', 'Spinach', 'Red Onins', 'Red Chilis', 'Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
            name: 'italian',
            sizes: [{
                size: 'small',
                price: '11.65'
            }, {
                size: 'medium',
                price: '13.45'
            }, {
                size: 'large',
                price: '17.85'
            }, {
                size: 'xlarge',
                price: '27.85'
            }],
            quantity: 100
        },
        //this.hawaiianPrices = [7.25, 9.75, 15.95, 19.99]
        hawaiian: {
            toppings: ['Pepperoni', 'Chicken', 'Bacon', 'Ground Tomatoes', 'Red Onions'],
            name: 'hawaiian',
            sizes: [{
                size: 'small',
                price: '7.25'
            }, {
                size: 'medium',
                price: '9.75'
            }, {
                size: 'large',
                price: '15.95'
            }, {
                size: 'xlarge',
                price: '19.99'
            }],
            quantity: 100
        },
        //this.tasmanianPrices = [4.95, 7.85, 10.95, 12.87]
        tasmanian: {
            toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes', 'Mushroom', 'Spinach', 'Black Olives'],
            name: 'tasmanian',
            sizes: [{
                size: 'small',
                price: '4.95'
            }, {
                size: 'medium',
                price: '7.85'
            }, {
                size: 'large',
                price: '10.95'
            }, {
                size: 'xlarge',
                price: '12.87'
            }],
            quantity: 100
        },
        //this.ivorianPrices = [7.55, 10.85, 13.97, 18.99]
        ivorian: {
            toppings: ['Black Olives', 'Spinach', 'Tomatoes', 'Mushroom', 'Garlic', 'Perilla', 'icecream'],

            name: 'ivorian',
            sizes: [{
                size: 'small',
                price: '7.55'
            }, {
                size: 'medium',
                price: '10.85'
            }, {
                size: 'large',
                price: '13.97'
            }, {
                size: 'xlarge',
                price: '18.99'
            }],
            quantity: 100
        },
        //this.canadianPrices = [6.69, 9.99, 15.87, 20.55]
        canadian: {
            toppings: ['Canadian Bacon', 'Beef', 'Mushrooms', 'Black Olives', 'Red Onions', 'Green Peppers'],
            name: 'canadian',
            sizes: [{
                size: 'small',
                price: '6.69'
            }, {
                size: 'medium',
                price: '9.99'
            }, {
                size: 'large',
                price: '15.87'
            }, {
                size: 'xlarge',
                price: '20.55'
            }],
            quantity: 450
        },
        //this.chickenPrices = [7.98, 13.95, 17.75, 21.69]
        chicken: {
            toppings: ['Chicken', 'BBQ Sauce', 'Red Onions', 'Pineapple', 'Red Pepper', 'Tomatoes', 'Green Pepper'],
            name: 'chicken',
            sizes: [{
                size: 'small',
                price: '7.98'
            }, {
                size: 'medium',
                price: '13.95'
            }, {
                size: 'large',
                price: '17.75'
            }, {
                size: 'xlarge',
                price: '21.69'
            }],
            quantity: 400
        },
        //this.cheesePrices = [7.98, 9.95, 13.75, 15.69]
        cheese: {
            toppings: ['Cheese', 'Mushroom', 'Macaroni', 'Black Olives', 'Green Pepper'],
            name: 'cheese',
            sizes: [{
                size: 'small',
                price: '7.98'
            }, {
                size: 'medium',
                price: '9.95'
            }, {
                size: 'large',
                price: '13.75'
            }, {
                size: 'xlarge',
                price: '15.69'
            }],
            quantity: 300
        },
        //this.beefPrices = [6.97, 11.99, 15.75, 22.98]
        beef: {
            toppings: ['Beef', 'Red Pepper', 'Pepperoni', 'Bacon', 'Green Jelapeños', 'Cheese'],
            name: 'beef',
            sizes: [{
                size: 'small',
                price: '6.97'
            }, {
                size: 'medium',
                price: '11.99'
            }, {
                size: 'large',
                price: '15.75'
            }, {
                size: 'xlarge',
                price: '22.98'
            }],
            quantity: 250
        },
        //this.buffaloPrices = [7.15, 9.99, 13.65, 18.85]
        buffalo: {
            toppings: ['Buffalo', 'Hot Sauce', 'Mushroom', 'BBQ Saurce', 'Black Olives'],
            name: 'buffalo',
            sizes: [{
                size: 'small',
                price: '7.15'
            }, {
                size: 'medium',
                price: '9.99'
            }, {
                size: 'large',
                price: '13.65'
            }, {
                size: 'xlarge',
                price: '18.85'
            }],
            quantity: 200
        },
        // this.roundupPrices = [5.98, 8.95, 14.75, 19.69]
        roundup: {
            toppings: ['Beef', 'Bacon', 'Sausage', 'Tomatoes', 'Mushrooms', 'Black Olives', 'Perilla'],
            name: 'roundup',
            sizes: [{
                size: 'small',
                price: '5.98'
            }, {
                size: 'medium',
                price: '8.95'
            }, {
                size: 'large',
                price: '14.75'
            }, {
                size: 'xlarge',
                price: '19.69'
            }],
            quantity: 350
        },
        //this.baconPrices = [6.98, 8.95, 14.75, 18.69]
        bacon: {
            toppings: ['Bacon', 'Pineapple', 'Tomatoes', 'Tomatoes', 'Red Onions', 'pumpkin'],
            name: 'bacon',
            sizes: [{
                size: 'small',
                price: '6.98'
            }, {
                size: 'medium',
                price: '8.95'
            }, {
                size: 'large',
                price: '14.75'
            }, {
                size: 'xlarge',
                price: '18.69'
            }],
            quantity: 100
        },

        //this.wêsPrices = [6.55, 10.87, 13.95, 18.35]
        wês: {
            toppings: ['Purple Onions', 'Tomatoes', 'cucomber', 'Tomatoes', 'Pickles', 'Cerelis', 'Potatoes'],
            name: 'wês',
            sizes: [{
                size: 'small',
                price: '6.55'
            }, {
                size: 'medium',
                price: '10.87'
            }, {
                size: 'large',
                price: '13.95'
            }, {
                size: 'xlarge',
                price: '18.35'
            }],
            quantity: 100
        },
        //this.happyPrices = [6.27, 8.99, 13.75, 19.97]
        happy: {
            toppings: ['Green Pepper', 'Cheese', 'Eggs', 'Tomatoes', 'Red Onions'],
            name: 'happy',
            sizes: [{
                size: 'small',
                price: '6.27'
            }, {
                size: 'medium',
                price: '8.99'
            }, {
                size: 'large',
                price: '13.75'
            }, {
                size: 'xlarge',
                price: '19.97'
            }],
            quantity: 100
        },
        // this.ausiePrices = [5.99, 8.85, 12.87, 17.97]
        ausie: {
            toppings: ['Mushroom', 'Perilla', 'Black Olives', 'Onions', 'Tomatoes'],
            name: 'ausie',
            sizes: [{
                size: 'small',
                price: '5.99'
            }, {
                size: 'medium',
                price: '8.85'
            }, {
                size: 'large',
                price: '12.87'
            }, {
                size: 'xlarge',
                price: '17.97'
            }],
            quantity: 100
        },
        //this.bbqPrices = [5.87, 7.95, 12.85, 17.89]
        bbq: {
            toppings: ['BBQ', 'Mushroom', 'Red Pepper', 'Tomatoes', 'Perilla', 'Yellow Jelapeños'],
            name: 'bbq',
            sizes: [{
                size: 'small',
                price: '5.87'
            }, {
                size: 'medium',
                price: '7.95'
            }, {
                size: 'large',
                price: '12.85'
            }, {
                size: 'xlarge',
                price: '17.89'
            }],
            quantity: 100
        },
        //this.wonderfulPrices = [5.00, 7.00, 9.00, 12.00]
        wonderful: {
            toppings: ['Peperoni', 'Bacon', 'Perialla', 'Tomatoes', 'Black Olives', 'American Cheese'],
            name: 'wonderful',
            sizes: [{
                size: 'small',
                price: '5.00'
            }, {
                size: 'medium',
                price: '7.00'
            }, {
                size: 'large',
                price: '9.00'
            }, {
                size: 'xlarge',
                price: '12.00'
            }],
            quantity: 100
        },
        //this.szranPrices = [5.98, 8.95, 12.75, 17.95]
        szran: {
            toppings: ['Tomatoes', 'Green Pepper', 'Black Olvie', 'Chilis', 'White Onions', 'Orange Papper'],
            name: 'szran',
            sizes: [{
                size: 'small',
                price: '5.98'
            }, {
                size: 'medium',
                price: '8.95'
            }, {
                size: 'large',
                price: '12.75'
            }, {
                size: 'xlarge',
                price: '17.95'
            }],
            quantity: 100
        },
        //this.lagoPrices = [5.15, 7.55, 9.35, 15.55]
        lago: {
            toppings: ['Tomatoes', 'Black Olives', 'Perilla', 'Onions', 'Yellow Jelapeños'],
            name: 'lago',
            sizes: [{
                size: 'small',
                price: '5.15'
            }, {
                size: 'medium',
                price: '7.55'
            }, {
                size: 'large',
                price: '9.35'
            }, {
                size: 'xlarge',
                price: '15.55'
            }],
            quantity: 100
        },
        //this.gnonsoaPrices = [4.75, 7.85, 12.45, 15.99]
        gnonsoa: {
            toppings: ['Mushroom', 'Tomatoes', 'Peperoni', 'Perilla', 'Black Olives', 'Bacon'],
            name: 'gnonsoa',
            sizes: [{
                size: 'small',
                price: '4.75'
            }, {
                size: 'medium',
                price: '7.85'
            }, {
                size: 'large',
                price: '12.45'
            }, {
                size: 'xlarge',
                price: '15.99'
            }],
            quantity: 100
        },
        //this.yummyPrices = [6.45, 10.95, 15.35, 20.85]
        yummy: {
            toppings: ['Fresh Salmon', 'Lettuce', 'Crab Meat', 'Tomatoes', 'Purple Leaves', 'Fresh Sushi'],
            name: 'yummy',
            sizes: [{
                size: 'small',
                price: '6.45'
            }, {
                size: 'medium',
                price: '10.95'
            }, {
                size: 'large',
                price: '15.35'
            }, {
                size: 'xlarge',
                price: '20.85'
            }],
            quantity: 100
        },
    }
}

// const menus = {
//     types: {
//         prairie: {
//             toppings: ['Broccoli', 'Red Onions', 'Black Olives', 'Green Olives', 'Green Peppers', 'Spinach', 'Sliced Tomatoes'],
//             name: 'prairie',
//             sizes: [{
//                 size: 'small',
//                 price: '9.95'
//             }, {
//                 size: 'medium',
//                 price: '12.75'
//             }, {
//                 size: 'large',
//                 price: '17.45'
//             }
//             , {
//                 size: 'xlarge',
//                 price: '23.57'
//             }
//         ],
//             quantity: 600
//         },
//         texan: {
//             toppings: ['Beef', 'Lettuce', 'Tomatoes', 'Two Cheeses', 'Taco Sauce', 'Red Onions', 'Taco Chips'],
//             name: 'texan',
//             sizes: [{
//                 size: 'small',
//                 price: '10.45'
//             }, {
//                 size: 'medium',
//                 price: '15.95'
//             }, {
//                 size: 'large',
//                 price: '20.75'
//             }, {
//                 size: 'xlarge',
//                 price: '25.69'
//             }
//         ],
//             quantity: 550
//         },
//         bronco: {
//             toppings: ['Beef', 'Sausage', 'Pepperoni', 'Canadian Bacon', 'Bacon Pieces'],
//             name: 'bronco',
//             sizes: [{
//                 size: 'small',
//                 price: '8.95'
//             }, {
//                 size: 'medium',
//                 price: '11.85'
//             }, {
//                 size: 'large',
//                 price: '14.45'
//             }, {
//                 size: 'xlarge',
//                 price: '17.98'
//             }],
//             quantity: 500
//         },
//         roma: {
//           toppings: ['Roma Tomatoes', 'Spinach', 'Alfredo Sauce'],
//           name: 'roma',
//           sizes: [{
//               size: 'small',
//               price: '9.97'
//           }, {
//               size: 'medium',
//               price: '15.57'
//           }, {
//               size: 'large',
//               price: '18.75'
//           }, {
//               size: 'xlarge',
//               price: '22.69'
//           }],
//           quantity: 150
//       },
//       //this.italianPrices = [11.65, 13.45, 17.85, 27.85]
//       italian: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'italian',
//           sizes: [{
//               size: 'small',
//               price: '11.65'
//           }, {
//               size: 'medium',
//               price: '13.45'
//           }, {
//               size: 'large',
//               price: '17.85'
//           }, {
//               size: 'xlarge',
//               price: '27.85'
//           }],
//           quantity: 100
//       },
//       //this.hawaiianPrices = [7.25, 9.75, 15.95, 19.99]
//       hawaiian: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'hawaiian',
//           sizes: [{
//               size: 'small',
//               price: '7.25'
//           }, {
//               size: 'medium',
//               price: '9.75'
//           }, {
//               size: 'large',
//               price: '15.95'
//           }, {
//               size: 'xlarge',
//               price: '19.99'
//           }],
//           quantity: 100
//       },
//       //this.tasmanianPrices = [4.95, 7.85, 10.95, 12.87]
//       tasmanian: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'tasmanian',
//           sizes: [{
//               size: 'small',
//               price: '4.95'
//           }, {
//               size: 'medium',
//               price: '7.85'
//           }, {
//               size: 'large',
//               price: '10.95'
//           }, {
//               size: 'xlarge',
//               price: '12.87'
//           }],
//           quantity: 100
//       },
//       //this.ivorianPrices = [7.55, 10.85, 13.97, 18.99]
//       ivorian: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'ivorian',
//           sizes: [{
//               size: 'small',
//               price: '7.55'
//           }, {
//               size: 'medium',
//               price: '10.85'
//           }, {
//               size: 'large',
//               price: '13.97'
//           }, {
//               size: 'xlarge',
//               price: '18.99'
//           }],
//           quantity: 100
//       },
//       //this.canadianPrices = [6.69, 9.99, 15.87, 20.55]
//         canadian: {
//             toppings: ['Canadian Bacon', 'Pepperoni', 'Sausage', 'Beef', 'Mushrooms', 'Green and Black Olives', 'Red Onions', 'Green Peppers'],
//             name: 'canadian',
//             sizes: [{
//                 size: 'small',
//                 price: '6.69'
//             }, {
//                 size: 'medium',
//                 price: '9.99'
//             }, {
//                 size: 'large',
//                 price: '15.87'
//             }, {
//                 size: 'xlarge',
//                 price: '20.55'
//             }],
//             quantity: 450
//         },
//         //this.chickenPrices = [7.98, 13.95, 17.75, 21.69]
//         chicken: {
//             toppings: ['Chicken', 'BBQ Sauce', 'Red Onions'],
//             name: 'chicken',
//             sizes: [{
//                 size: 'small',
//                 price: '7.98'
//             }, {
//                 size: 'medium',
//                 price: '13.95'
//             }, {
//                 size: 'large',
//                 price: '17.75'
//             }, {
//                 size: 'xlarge',
//                 price: '21.69'
//             }],
//             quantity: 400
//         },
//         //this.cheesePrices = [7.98, 9.95, 13.75, 15.69]
//         cheese: {
//           toppings: ['Macaroni', 'Cheese'],
//           name: 'cheese',
//           sizes: [{
//               size: 'small',
//               price: '7.98'
//           }, {
//               size: 'medium',
//               price: '9.95'
//           }, {
//               size: 'large',
//               price: '13.75'
//           }, {
//               size: 'xlarge',
//               price: '15.69'
//           }],
//           quantity: 300
//       },
//       //this.beefPrices = [6.97, 11.99, 15.75, 22.98]
//       beef: {
//           toppings: ['Beef', 'Red Onions', 'Pickles', 'Bacon'],
//           name: 'beef',
//           sizes: [{
//               size: 'small',
//               price: '6.97'
//           }, {
//               size: 'medium',
//               price: '11.99'
//           }, {
//               size: 'large',
//               price: '15.75'
//           }, {
//               size: 'xlarge',
//               price: '22.98'
//           }],
//           quantity: 250
//       },
//       //this.buffaloPrices = [7.15, 9.99, 13.65, 18.85]
//       buffalo: {
//           toppings: ['Chicken', 'Hot Sauce', 'Ranch Dressing'],
//           name: 'buffalo',
//           sizes: [{
//               size: 'small',
//               price: '7.15'
//           }, {
//               size: 'medium',
//               price: '9.99'
//           }, {
//               size: 'large',
//               price: '13.65'
//           }, {
//               size: 'xlarge',
//               price: '18.85'
//           }],
//           quantity: 200
//       },
//      // this.roundupPrices = [5.98, 8.95, 14.75, 19.69]
//         roundup: {
//             toppings: ['Beef', 'Pepperoni', 'Sausage', 'Red Onions', 'Mushrooms', 'Black Olives'],
//             name: 'roundup',
//             sizes: [{
//                 size: 'small',
//                 price: '5.98'
//             }, {
//                 size: 'medium',
//                 price: '8.95'
//             }, {
//                 size: 'large',
//                 price: '14.75'
//             }, {
//                 size: 'xlarge',
//                 price: '19.69'
//             }],
//             quantity: 350
//         },
//         //this.baconPrices = [6.98, 8.95, 14.75, 18.69]
//         bacon: {
//             toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//             name: 'bacon',
//             sizes: [{
//                 size: 'small',
//                 price: '6.98'
//             }, {
//                 size: 'medium',
//                 price: '8.95'
//             }, {
//                 size: 'large',
//                 price: '14.75'
//             }, {
//                 size: 'xlarge',
//                 price: '18.69'
//             }],
//             quantity: 100
//         },
       
//       //this.wêsPrices = [6.55, 10.87, 13.95, 18.35]
//       wês: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'wês',
//           sizes: [{
//               size: 'small',
//               price: '6.55'
//           }, {
//               size: 'medium',
//               price: '10.87'
//           }, {
//               size: 'large',
//               price: '13.95'
//           }, {
//               size: 'xlarge',
//               price: '18.35'
//           }],
//           quantity: 100
//       },
//       //this.happyPrices = [6.27, 8.99, 13.75, 19.97]
//       happy: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'happy',
//           sizes: [{
//               size: 'small',
//               price: '6.27'
//           }, {
//               size: 'medium',
//               price: '8.99'
//           }, {
//               size: 'large',
//               price: '13.75'
//           }, {
//               size: 'xlarge',
//               price: '19.97'
//           }],
//           quantity: 100
//       },
//      // this.ausiePrices = [5.99, 8.85, 12.87, 17.97]
//       ausie: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'ausie',
//           sizes: [{
//               size: 'small',
//               price: '5.99'
//           }, {
//               size: 'medium',
//               price: '8.85'
//           }, {
//               size: 'large',
//               price: '12.87'
//           }, {
//               size: 'xlarge',
//               price: '17.97'
//           }],
//           quantity: 100
//       },
//       //this.bbqPrices = [5.87, 7.95, 12.85, 17.89]
//       bbq: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'bbq',
//           sizes: [{
//               size: 'small',
//               price: '5.87'
//           }, {
//               size: 'medium',
//               price: '7.95'
//           }, {
//               size: 'large',
//               price: '12.85'
//           }, {
//               size: 'xlarge',
//               price: '17.89'
//           }],
//           quantity: 100
//       },
//       //this.wonderfulPrices = [5.00, 7.00, 9.00, 12.00]
//       wonderful: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'wonderful',
//           sizes: [{
//               size: 'small',
//               price: '5.00'
//           }, {
//               size: 'medium',
//               price: '7.00'
//           }, {
//               size: 'large',
//               price: '9.00'
//           }, {
//               size: 'xlarge',
//               price: '12.00'
//           }],
//           quantity: 100
//       },
//       //this.szranPrices = [5.98, 8.95, 12.75, 17.95]
//       szran: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'szran',
//           sizes: [{
//               size: 'small',
//               price: '5.98'
//           }, {
//               size: 'medium',
//               price: '8.95'
//           }, {
//               size: 'large',
//               price: '12.75'
//           }, {
//               size: 'xlarge',
//               price: '17.95'
//           }],
//           quantity: 100
//       },
//       //this.lagoPrices = [5.15, 7.55, 9.35, 15.55]
//       lago: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'lago',
//           sizes: [{
//               size: 'small',
//               price: '5.15'
//           }, {
//               size: 'medium',
//               price: '7.55'
//           }, {
//               size: 'large',
//               price: '9.35'
//           }, {
//               size: 'xlarge',
//               price: '15.55'
//           }],
//           quantity: 100
//       },
//       //this.gnonsoaPrices = [4.75, 7.85, 12.45, 15.99]
//       gnonsoa: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'gnonsoa',
//           sizes: [{
//               size: 'small',
//               price: '4.75'
//           }, {
//               size: 'medium',
//               price: '7.85'
//           }, {
//               size: 'large',
//               price: '12.45'
//           }, {
//               size: 'xlarge',
//               price: '15.99'
//           }],
//           quantity: 100
//       },
//       //this.yummyPrices = [6.45, 10.95, 15.35, 20.85]
//       yummy: {
//           toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//           name: 'yummy',
//           sizes: [{
//               size: 'small',
//               price: '6.45'
//           }, {
//               size: 'medium',
//               price: '10.95'
//           }, {
//               size: 'large',
//               price: '15.35'
//           }, {
//               size: 'xlarge',
//               price: '20.85'
//           }],
//           quantity: 100
//       },
//     }
// }
// const menus = {
//     types: {
//         prairie: {
//             toppings: ['Broccoli', 'Red Onions', 'Black Olives', 'Green Olives', 'Green Peppers', 'Spinach', 'Sliced Tomatoes'],
//             name: 'prairie',
//             sizes: [{
//                 size: 'small',
//                 price: '9.95'
//             }, {
//                 size: 'medium',
//                 price: '12.75'
//             }, {
//                 size: 'large',
//                 price: '17.45'
//             }
//             , {
//                 size: 'xlarge',
//                 price: '23.57'
//             }
//         ],
//             quantity: 600
//         },
//         texan: {
//             toppings: ['Beef', 'Lettuce', 'Tomatoes', 'Two Cheeses', 'Taco Sauce', 'Red Onions', 'Taco Chips'],
//             name: 'texan',
//             sizes: [{
//                 size: 'small',
//                 price: '10.45'
//             }, {
//                 size: 'medium',
//                 price: '15.95'
//             }, {
//                 size: 'large',
//                 price: '20.75'
//             }, {
//                 size: 'xlarge',
//                 price: '25.69'
//             }
//         ],
//             quantity: 550
//         },
//         bronco: {
//             toppings: ['Beef', 'Sausage', 'Pepperoni', 'Canadian Bacon', 'Bacon Pieces'],
//             name: 'bronco',
//             sizes: [{
//                 size: 'small',
//                 price: '8.95'
//             }, {
//                 size: 'medium',
//                 price: '11.85'
//             }, {
//                 size: 'large',
//                 price: '14.45'
//             }, {
//                 size: 'xlarge',
//                 price: '17.98'
//             }],
//             quantity: 500
//         },
//         stampeded: {
//             toppings: ['Canadian Bacon', 'Pepperoni', 'Sausage', 'Beef', 'Mushrooms', 'Green and Black Olives', 'Red Onions', 'Green Peppers'],
//             name: 'stampeded',
//             sizes: [{
//                 size: 'small',
//                 price: '15'
//             }, {
//                 size: 'medium',
//                 price: '18'
//             }, {
//                 size: 'large',
//                 price: '27'
//             }, {
//                 size: 'xlarge',
//                 price: '35'
//             }],
//             quantity: 450
//         },
//         bbqchicken: {
//             toppings: ['Chicken', 'BBQ Sauce', 'Red Onions'],
//             name: 'bbqchicken',
//             sizes: [{
//                 size: 'small',
//                 price: '7'
//             }, {
//                 size: 'medium',
//                 price: '19'
//             }, {
//                 size: 'large',
//                 price: '15'
//             }, {
//                 size: 'xlarge',
//                 price: '20'
//             }],
//             quantity: 400
//         },
//         roundup: {
//             toppings: ['Beef', 'Pepperoni', 'Sausage', 'Red Onions', 'Mushrooms', 'Black Olives'],
//             name: 'roundup',
//             sizes: [{
//                 size: 'small',
//                 price: '5.98'
//             }, {
//                 size: 'medium',
//                 price: '8.95'
//             }, {
//                 size: 'large',
//                 price: '14.75'
//             }, {
//                 size: 'xlarge',
//                 price: '19.69'
//             }],
//             quantity: 350
//         },
//         macandcheese: {
//             toppings: ['Macaroni', 'Cheese'],
//             name: 'macandcheese',
//             sizes: [{
//                 size: 'small',
//                 price: '6'
//             }, {
//                 size: 'medium',
//                 price: '8'
//             }, {
//                 size: 'large',
//                 price: '13'
//             }, {
//                 size: 'xlarge',
//                 price: '17'
//             }],
//             quantity: 300
//         },
//         baconcheeseburger: {
//             toppings: ['Beef', 'Red Onions', 'Pickles', 'Bacon'],
//             name: 'baconcheeseburger',
//             sizes: [{
//                 size: 'small',
//                 price: '7'
//             }, {
//                 size: 'medium',
//                 price: '10'
//             }, {
//                 size: 'large',
//                 price: '13'
//             }, {
//                 size: 'xlarge',
//                 price: '19'
//             }],
//             quantity: 250
//         },
//         buffalochicken: {
//             toppings: ['Chicken', 'Hot Sauce', 'Ranch Dressing'],
//             name: 'buffalochicken',
//             sizes: [{
//                 size: 'small',
//                 price: '9'
//             }, {
//                 size: 'medium',
//                 price: '11'
//             }, {
//                 size: 'large',
//                 price: '14'
//             }, {
//                 size: 'xlarge',
//                 price: '19'
//             }],
//             quantity: 200
//         },

//         tuscanroma: {
//             toppings: ['Roma Tomatoes', 'Spinach', 'Alfredo Sauce'],
//             name: 'tuscanroma',
//             sizes: [{
//                 size: 'small',
//                 price: '5'
//             }, {
//                 size: 'medium',
//                 price: '8'
//             }, {
//                 size: 'large',
//                 price: '13'
//             }, {
//                 size: 'xlarge',
//                 price: '18'
//             }],
//             quantity: 150
//         },


//         chickenbaconranch: {
//             toppings: ['Chicken', 'Bacon', 'Ranch Dressing', 'Tomatoes'],
//             name: 'chickenbaconranch',
//             sizes: [{
//                 size: 'small',
//                 price: '8'
//             }, {
//                 size: 'medium',
//                 price: '13'
//             }, {
//                 size: 'large',
//                 price: '19'
//             }, {
//                 size: 'xlarge',
//                 price: '25'
//             }],
//             quantity: 100
//         }
//     }

// }

module.exports = menus

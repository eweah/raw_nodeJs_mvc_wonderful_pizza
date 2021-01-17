'use strict'
/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module View
 * @kind class
 * 
 * @extends Model
 * @requires Model
 * @requires fs NodeJs native File System API
 * @requires path NodeJs natve Path API
 * 
 * @classdesc Base View class for the Model-View-Controller (the models, views, and controllers) for view configurations and string interpolations
 * 
 */

const fs = require('fs')
const path = require('path')
const Model = require('../model')

class View extends Model {
    constructor() {
        super()

        // auto bind methods 
        this.autobind(View)
    }

    /**
     * @name assets
     * @function
     *
     * @param {String} filename  file to serve
     * @param {Function} fn  the call back function
     *  
     * @description serves static files
     * 
     * @return {Function} the callback function with the resulting data
     * 
     */
    assets(filename, fn) {
        filename = typeof filename === 'string' && filename.trim().length > 0 ? filename.trim() : false;
        if (filename) {
            const publicDir = path.join(__dirname, '../../../public/');
            fs.readFile(`${publicDir}${filename}`, (err, data) => {
                if (!err && data) {
                    fn(false, data);
                } else {
                    fn('No file could be found.');
                }
            });
        } else {
            fn('A valid filename was not specified.');
        }
    };
   
     /**
     * @name workers
     * @function
     *
     * @param {String} filename  file to serve
     *  
     * @description serves worker files
     * 
     * @return {Object|String} the content of the file
     * 
     */
    workers (filename) {return fs.promises.readFile(`${path.join(__dirname, '/')}${filename}`, 'utf8')}

     /**
     * @name view
     * @function
     *
     * @param {String} filename  file to serve
     *  
     * @description sets and configures view data and view string interpolation
     * 
     * @return {String} the template name
     * 
     */
    view (templateName = '', data = {}) {
        return  fs.promises.readFile(`${path.join(__dirname, '../../../app/Views/')}${templateName}.html`, 'utf8')
        .then(string => {
            //Add  the global views to the data object, pre-pending  their key name with 'global'
            for (let keyName in this.environmentToExport().globalViews) {
                data[`global.${keyName}`] = this.environmentToExport().globalViews[keyName];
            }
            //For each key in the data object we want to insert its value in the string at the corresponding placeholder 

            for (let key in data) {
                if (data.hasOwnProperty(key) && typeof data[key] == 'string') {
                    const replace = data[key];

                    // Interpolating
                    const find = '{' + key + '}';
                    string = string.replace(find, replace);
                }
            }
            return string
        })
        .catch(() => console.log('Template name not found.'))
    }
       
    /**
     * @name uview
     * @function
     *
     * @param {String} string  template name
     * @param {String} data  data to pass to the data
     * @param {String} header  header template
     * @param {String} footer  footer template
     * @description sets and configures view data and view string interpolation
     * 
     * @return {String} template name
     * 
     */
    uview (string = '', data = {}, _header = 'default/_header', _footer = 'default/_footer'){
        return new Promise((resolve, reject) => {
            this.view(_header, data)
                .then(headerString => {
                    this.view(_footer, data)
                        .then(footerString => {
                            const fullString = `${headerString}${string}${footerString}`
                            return resolve(fullString)
                        })
                        .catch(() => reject('Could not find the footer template'))
                })
                .catch(() => reject('Could not find the header template'))
    
        })
    } 


    // async view (templateName = '', data = {}) {
    //     try {
    //         const string = await fs.promises.readFile(`${path.join(__dirname, '../../../app/Views/')}${templateName}.html`, 'utf8')
    //         //Add  the global views to the data object, pre-pending  their key name with 'global'
    //         for (let keyName in this.environmentToExport().globalViews) {
    //             data[`global.${keyName}`] = this.environmentToExport().globalViews[keyName]
    //         }
    //         //For each key in the data object we want to insert its value in the string at the corresponding placeholder 
    //         for (let key in data) {
    //             if (data.hasOwnProperty(key) && typeof data[key] == 'string') {
    //                 const replace = data[key]

    //                 // Interpolating
    //                 const find = '{' + key + '}'
    //                 string = string.replace(find, replace)
    //             }
    //         }
    //         return string
    //     }
    //     catch (e) {
    //         return console.log('Template name not found.')
    //     }
    // }
       

}

// Export Default

module.exports = View

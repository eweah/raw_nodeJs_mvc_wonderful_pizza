'use strict';

/** 
 * @author Ericson S. Weah  <ericson.weah@gmail.com>
 * 
 * @module Model
 * @kind class
 * 
 * @extends BaseController
 * 
 * @requires Model
 * @requires fs node native File System API
 * @requires path node native Path API
 * 
 * @classdesc Resourceful Model for interacting with the File System
 * 
 * @typedef {string|Buffer|URL} path  the path or filename or fileHandle
 * @typedef {Object|integer} options the options conditioning file system  
 * @typedef {Promise} Promise The returned Promise (resolved or rejected) 
 */

const fs = require('fs');
const path = require('path');

const Model = require('../../Models');
const basedDir = path.join(__dirname, '../../../resources/storage/.data');

class Data extends Model {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()

        // auto bind methods
        this.autobind(Data)
    }

   
    async fsDelete(path) {
        return await fs.promises.unlink(`${basedDir}/${path}`).catch(error => console.log('could not delete file'))
    }
    
    /*** 
     * @name rsCreate
     * @function
     * 
     * @description  
     * Creates a readable stream.
     *
     * Creates a readable stream, which contains all further functions for reading from and piping into other writable streams.
     * The encoding option sets the encoding for the path while opening the directory and subsequent read operations.
     *
     * @param {string|Buffer|URL} path - path or name of the directory
     * @param {Object|integer} options - options
     * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
     * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
     * @return {Object} - fs.createReadableStream()
     *
     */

    rsCreate(path, flags = 'r', encoding = 'utf8', fd = null, mode = 0o66, autoClose = true, emitClose = false, start, end = Infinity, highWaterMark = 64 * 1024) {
        fs.createReadStream(path, {
            flags: flags,
            encoding: encoding,
            fd: fd,
            mode: mode,
            autoClose: autoClose,
            emitClose: emitClose,
            start: start,
            end: end,
            highWaterMark: highWaterMark
        })
    }

    /**
     * @name wsCreate
     * @function
     * 
     * @description  
     * Create a writable stream.
     *
     * Creates a writable stream, which contains all further functions for writing to the stream .
     * The encoding option sets the encoding for the path while opening the directory and subsequent read operations.
     *
     * @param {string|Buffer|URL} path - path or name of the directory
     * @param {Object|integer} options - options
     * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
     * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
     * @return {Object} - fs.createWritableStream()
     *
     */

    wsCreate(path, flags = 'w', encoding = 'utf8', fd = null, mode = 0o66, autoClose = true, emitClose = false, start) {
        fs.createWriteStream(path, {
            flags: flags,
            encoding: encoding,
            fd: fd,
            mode: mode,
            autoClose: autoClose,
            emitClose: emitClose,
            start: start
        })
    }
    /**
     *   USING PROMISES : fs.promises
     */

    // DIR (FOLDER) RELATED
    /*** 
     * @name dirCreate
     * @function
     * 
     * @description  
     * Asynchronously creates a directory then resolves the Promise with no arguments upon success.
     *
     * The optional options argument can be an integer specifying mode(permission and sticky bits),
     * or an object with a mode property and a recursive property indicating whether parent folders should be created.
     * Calling fsPromises.mkdir() when path is a directory that exists results in a rejection only when recursive is false.
     *
     * @param  path  {string|Buffer|URL} - path or name of the directory
     * @param  options {Object|integer} - options
     * @param  {boolean} [options.recursive = false]
     * @param  {string | integer} [options.mode = 0o777] Not supported on Windows.Default: 0o777.
     * @return {Promise} - The promise with no arguments upon success
     *
     */

    async dirCreate (path, rec = false, mode = 0o777)
       {return await fs.promises.mkdir(`${basedDir}/${path}`, {
            recursive: rec,
            mode: mode,
        })}


    /**
     * @name dirOpen
     * @function
     * 
     * @description  
     * Asynchronously open a directory.
     *
     * Creates an fs.Dir, which contains all further functions for reading from and cleaning up the directory.
     * The encoding option sets the encoding for the path while opening the directory and subsequent read operations.
     *
     * @param {string|Buffer|URL} path - path or name of the directory
     * @param {Object|integer} options - options
     * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
     * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
     * @return {Promise} - The promise containing fs.Dir
     *
     */

    async dirOpen(path = 'default', encoding = 'utf8', bufferSize = 32) {
        return await fs.promises.opendir(`${basedDir}/${path}`, {
            encoding: encoding,
            bufferSize: bufferSize,
        })
    }
    
    /**
     * @name dirRead
     * @function
     * 
     * @description  
     * Reads the contents of a directory then resolves the Promise with an array of the names of the files
     * in the directory excluding '.' and '..'.
     *
     * The optional options argument can be a string specifying an encoding, or an object with an encoding property
     * specifying the character encoding to use for the filenames.If the encoding is set to 'buffer',
     * the filenames returned will be passed as Buffer objects.
     *
     * If options.withFileTypes is set to true, the resolved array will contain fs.Dirent objects
     *
     * @param {string|Buffer|URL} path - path or name of the directory
     * @param {Object|integer} options - options
     * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
     * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
     * @return {Promise} - The resolved Promise with an array of the names of the files in the directory excluding '.' and '..'.
     *
     */

    async dirRead(path = 'default', encoding = 'utf8', withFileTypes = true) {
        return await fs.promises.readdir(`${basedDir}/${path}`, {
            encoding: encoding,
            withFileTypes: withFileTypes,
        })
    }

    /**
     * @name dirUpdate
     * @function
     * 
     * @description  
     * Renames oldPath to newPath and resolves the Promise with no arguments upon success.
     *
     * @param  {string|Buffer|URL} oldPath - path or name of the directory
     * @param  {string|Buffer|URL}  newPath - options
     * @return {Promise} - The promise with no arguments upon success
     *
     */

    async dirUpdate(oldPath, newPath) {
        return await fs.promises.rename(`${basedDir}/${oldPath}`, `${basedDir}/${newPath}`);
    }


    /**
     * @name dirDelete
     * @function
     * 
     * @description  
     * Removes the directory identified by path then resolves the Promise with no arguments upon success.
     *
     * maxReties: If an EBUSY, EMFILE, ENFILE, ENOTEMPTY, or EPERM error is encountered, Node.js will retry the operation
     * with a linear back off wait of retryDelay ms longer on each try.This option represents the number of retries.
     * This option is ignored if the recursive option is not true
     * recursive: If true, perform a recursive directory removal.In recursive mode, errors are not reported
     * if path does not exist, and operations are retried on failure.
     * retryDelay: The amount of time in milliseconds to wait between retries.
     * This option is ignored if the recursive option is not true
     *
     * @param  {string|Buffer|URL} path - path or name of the directory
     * @param  {Object|integer} options - options
     * @param {integer} [options.maxRetries = 0] - the number of retries.
     * @param  {boolean} [options.recursive = false] -  perform a recursive directory removal
     * @param  {integer} [options.retryDelay = 100] - The amount of time in milliseconds to wait between retries
     * @return {Promise} - The promise with no arguments upon success
     *
     */

    async dirDelete(path = 'default', max = 5) {
        return await fs.promises.rmdir(`${basedDir}/${path}`, {
            maxRetries: max,
        })
    }

    // FILE RELATED

    /**
     * @name fileCreate
     * @function
     * 
     * @description  
     * Asynchronously writes data to a file, replacing the file if it already exists
     * data can be a string or a buffer.
     *
     *
     * The encoding option is ignored if data is a buffer.
     * If options is a string, then it specifies the encoding.
     * Any specified FileHandle has to support writing.
     * It is unsafe to use fs.promises.writeFile() multiple times on the same file without waiting
     * for the Promise to be resolved(or rejected).
     *
     * @param  {string|Buffer|URL|FileHandle} file - filename or FileHandle
     * @param  {string|Buffer|Unit8Array} data - data to write to file
     * @param  {Object|string} options - options
     * @param  {string|null} [options.encoding = 'utf8'] - the number of retries
     * @param  {integer} [options.mode = 0o666] -  perform a recursive directory removal
     * @param  {string} [options.flag = 'w'] - The amount of time in milliseconds to wait between retries
     * @return {Promise} - The Promise will be resolved with no arguments upon success
     *
     */
    async fileCreate(file = 'nothing', data = {}, encoding = 'utf8', mode = 0o666, flag = 'w') {
        return await fs.promises.writeFile(`${basedDir}/${file}`, JSON.stringify(data), encoding, mode, flag)
    }

    /**
     * @name fileOpen
     * @function
     * 
     * @description  
     * Asynchronous file open that returns a Promise that, when resolved, yields a FileHandle object
     *
     * mode sets the file mode(permission and sticky bits), but only if the file was created.
     * Some characters( < >: " / \ | ? *) are reserved under Windows as documented by Naming Files,
     * Paths, and Namespaces. Under NTFS, if the filename contains a colon, Node.js will open a file system stream,
     * as described by the MSDN page.
     *
     * @param  {string|Buffer|URL} path - filename or file path or FileHandle
     * @param  {string|number} [flags = 'r'] -
     * @param  {string|integer} [mode = 0o666] - sets the file mode (permission and sticky bits), but only if the file was created.
     * @return {Promise} - The Promise that, when resolved, yields a FileHandle object.
     *
     */
    async fileOpen(path = 'nothing', flags = 'r', mode = 0o666) {
        return await fs.promises.open(`${basedDir}/${path}`, flags, mode)
    }

    /**
     * @name fileRead
     * @function
     * 
     * @description  
     * Asynchronously reads the entire contents of a file.
     *
     * The Promise is resolved with the contents of the file.If no encoding is specified(using options.encoding),
     * the data is returned as a Buffer object.Otherwise, the data will be a string.
     * If options is a string, then it specifies the encoding.
     * When the path is a directory, the behavior of fs.promises.readFile() is platform - specific.On macOS, Linux, and Windows,
     * the promise will be rejected with an error.On FreeBSD, a representation of the directory 's contents will be returned.
     * Any specified FileHandle has to support reading.
     *
     * @param {string|Buffer|URL|FileHandle} path - filename or FileHandle
     * @param {Object|string} options - options
     * @param {string | null} [options.encoding = null] - sets the encoding for the path while opening the directory and subsequent read operations.
     * @param {string} [options.flag = 'r']
     * @return {Promise} - The Promise is resolved with the contents of the file.
     *                     If no encoding is specified(using options.encoding),
     *                     the data is returned as a Buffer object.Otherwise,
     *                     the data will be a string.
     *
     */

    fileRead(path = 'default', encoding = 'utf8', flag = 'r') {
        return fs.promises.readFile(`${basedDir}/${path}`, encoding, flag)
    }

    /**
     * @name fileUpdateMore
     * @function
     * 
     * @description  
     * Asynchronously append data to a file, creating the file if it does not yet exist.
     *
     * The path may be specified as a FileHandle that has been opened for appending(using fsPromise.open())
     * If options is a string, then it specifies the encoding.
     *
     * @param  {string|Buffer|URL|FileHandle} file - filename or FileHandle
     * @param  {string|Buffer} data - data to append to file
     * @param  {Object|string} options - options
     * @param  {string|null} [options.encoding = 'utf8'] - the number of retries
     * @param  {integer} [options.mode = 0o666] -  perform a recursive directory removal
     * @param  {string} [options.flags = 'a'] - The amount of time in milliseconds to wait between retries
     * @return {Promise} - The Promise will be resolved with no arguments upon success
     *
     */

    async fileUpdateMore(path = 'default', data = {}, encoding = 'utf8', flags = 'a') {
        return await fs.promises.appendFile(`${basedDir}/${path}`, JSON.stringify(data) + '\n', encoding, flags)
    }

    /**
     *  
     * @name fileUpdate
     * @function
     * 
     * @description  
     * Asynchronously writes data to a file, replacing the file if it already exists
     * data can be a string or a buffer.
     *
     * The encoding option is ignored if data is a buffer.
     * If options is a string, then it specifies the encoding.
     * Any specified FileHandle has to support writing.
     * It is unsafe to use fs.promises.writeFile() multiple times on the same file without waiting
     * for the Promise to be resolved(or rejected).
     *
     * @param  {string|Buffer|URL|FileHandle} file - filename or FileHandle
     * @param  {string|Buffer|Unit8Array} data - data to write to file
     * @param  {Object|string} options - options
     * @param  {string|null} [options.encoding = 'utf8'] - the number of retries
     * @param  {integer} [options.mode = 0o666] -  perform a recursive directory removal
     * @param  {string} [options.flag = 'w'] - The amount of time in milliseconds to wait between retries
     * @return {Promise} - The Promise will be resolved with no arguments upon success
     *
     */
    async fileUpdate(file = 'nothing', data = {}, encoding = 'utf8', mode = 0o666, flag = 'w') {
        return await fs.promises.writeFile(`${basedDir}/${file}`, JSON.stringify(data), encoding, mode, flag)
    }

    /**
     * @name fileRenameOrMove
     * @function
     * 
     * @description Renames oldPath to newPath and resolves the Promise with no arguments upon success.
     * 
     * @param  {string|Buffer|URL} oldPath - path or name of the directory
     * @param  {string|Buffer|URL}  newPath - options
     * 
     * @return {Promise} - The promise with no arguments upon success
     *
     */

    async fileRenameOrMove(oldPath, newPath) {
        return await fs.promises.rename(`${basedDir}/${oldPath}`, `${basedDir}/${newPath}`)
    }

    /**
     * @name fileDelete
     * @function
     * 
     * @description Delete file
     *
     * @param  {string|Buffer|URL} path - path or name of the file

     * @return {Promise} - The Promise is resolved with no arguments upon success
     *
     */

    async fileDelete(path) {
        return await fs.promises.unlink(`${basedDir}/${path}`)
    }

    /**
     *  USING new Promise: return new Promise((resolve, reject))
     */

    /**
     * @name create
     * @function
     * 
     * @param {String}  dir the path to the directory or the directory name
     * @param {String}  file the path to the file or the name of the file
     * @param {Object}  data the data object to update
     *
     * @description create a file in a directory
     * @return {Promise}  resolves to nothing when successfull
     * 
     */


    create(dir, file, data) {
        return new Promise((resolve, reject) => {
            // Open the file for writing
            fs.open(`${basedDir}${dir}/${file}.json`, `wx`, (err, fileDescriptor) => {
                if (!err && fileDescriptor) {
                    // convert data to a string
                    const stringData = this.helper.jString(data);
                    // Write to file and close it
                    fs.writeFile(fileDescriptor, stringData, err => {
                        if (err) {
                            reject('Error writing to new file')
                        } else {
                            fs.close(fileDescriptor, error => {
                                if (error) {
                                    reject('Error new closing file')
                                } else {
                                    resolve()
                                }
                            })
                        }
                    })
                } else {
                    reject(`Could not create a new file; it may already exist.`);
                }
            });

        })
    }

     /**
     * @name read
     * @function
     * 
     * @param {String}  dir the path to the directory or the directory name
     * @param {String}  file the path to the file or the name of the file
     *
     * @description reads a file in a directory
     * @return {Promise}  resolves to the content of the file read
     * 
     */


    readf(dir, file) {
        return new Promise((resolve, reject) => {
            fs.readFile(`${basedDir}${dir}/${file}.json`, 'utf8', (err, data) => {
                if (!err && data) {
                    const parseData = this.helper.parseJSON(data);
                    resolve(parseData)
                } else {
                    reject(err);
                }
            });
        })
    }

    /**
     * @name update
     * @function
     * 
     * @param {String}  dir the path to the directory or the directory name
     * @param {String}  file the path to the file or the name of the file
     * @param {Object}  data the data object to update
     *
     * @description updates a file in a directory
     * @return {Promise}  resolves to nothing when successfull
     * 
     */

    update(dir, file, data) {
        return new Promise((resolve, reject) => {
            fs.open(`${basedDir}${dir}/${file}.json`, `r+`, (err, fileDescriptor) => {
                if (!err && fileDescriptor) {
                    // convert data to a string
                    const stringData = this.helper.jString(data);

                    // Truncate the content of the file and close it

                    fs.ftruncate(fileDescriptor, (err) =>
                        err ?
                        reject('Error Editing file') :
                        fs.writeFile(fileDescriptor, stringData, (err) =>
                            err ?
                            reject('Error writing to file') :
                            fs.close(fileDescriptor, (error) =>
                                error ? reject('Error closing file') : resolve()
                            )
                        )
                    );
                } else {
                    reject(`Could not open the file for updating; file may not exist yet.`);
                }
            });
        })
    }

    /**
     * @name delete
     * @function
     * 
     * @param {String}  dir the path to the directory or the directory name
     * @param {String}  file the path to the file or the name of the file
     *
     * @description deletes a file from a directory
     * @return {Promise}  resolves to nothing when successfull
     * 
     */

    delete(dir, file) {
        return new Promise((resolve, reject) => {
            fs.unlink(`${basedDir}${dir}/${file}.json`, (err) =>
                err ? reject('Error deleting file; File may not exist.') : resolve()
            );
        })
    }
   /**
     * @name all
     * @function
     * 
     * @param {String}  dir the path to the directory or the directory name
     *
     * @description list all file names in the corresponding directory
     * @return {Promise}  trimmedFileNames the list of file names found in the directory
     * 
     */

    all(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(`${basedDir}/${dir}/`, (err, itemList) => {
                if (!err && itemList && Array.isArray(itemList)) {
                    if (itemList.length > 0) {
                        const trimmedFileNames = [];
                        itemList.forEach((filename) => {
                            trimmedFileNames.push(filename.replace('.json', ''));
                        });
                        resolve(trimmedFileNames)
                    } else {
                        reject('Not data found')
                    }
                } else {
                    reject(err)
                }
            });
        })
    }
     /**
     * @name track
     * @function
     * 
     * @param {String}  filename the path to the file
     * @param {Boolean}  persistent  true or false
     * @param {Boolean} recursive true or false
     * @param {String} encoding 'utf-8' by default
     * @param {Function} fn the callback response function
     *
     * @description watches and track file for changes
     * @return {Function} fn the callback function with eventType and listener
     * 
     */

    track(filename, persistent = false, recursive = false, encoding = 'utf8', fn) {
        fs.watch(filename, {
            persistent,
            recursive,
            encoding
        }, fn(evenType, listener))
    }
    
}
// Export Data
module.exports = Data;




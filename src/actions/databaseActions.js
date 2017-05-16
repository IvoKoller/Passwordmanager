import zxcvbn from 'zxcvbn';
import { encrypt, decrypt } from '../crypto';
import Datastore from 'nedb';
var database;

/*
* The database reducer handles all requests to the NeDB database.
*/


/**
* Loads/Creates the database after a masterPassword has been defined.
* NeDB handles encryption/ decryption automatically using the callback functions
* defined in 'crypto.js'. The datastore gets loaded automatically and
* synchronously - requests to the database can be issued immediately.
*
* @returns {action} of type 'DATABASE_LOADED', with payload true
*
* If store.database.loaded == true, the layout component switches from the login
* screen to the 'application-home-screen'.
*/

export function load(){
    database = new Datastore({
       filename: './app/db/database.db',
       autoload: true,
       afterSerialization: encrypt,
       beforeDeserialization: decrypt,
    });

    return {
        type: 'DATABASE_LOADED',
        payload: true,
    }
}

/**
* Fetches data from the database.
* Fetching from the NeDB database happens asyncronously, as redux works synchronously,
* the thunk-middleware is utilized.
*
* @param {object} query (optional) An object containing the field to query, if
* left empty, all entries of the database are returned
*
* if fetching happens successfully, the function
* dispatches an action of type 'UPDATE_DATABASE', with an array of the found entries as a payload.
* Should something go wrong, it dispatches an action of type 'ERROR', with the error as a payload.
*
* @returns {dispatchFunction}
*
* The dispatch function itself
* @returns {Promise} In order to issue commands which depend on fetch() having finished
* see: @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/

export function fetch(query) {
    return function(dispatch){
        return new Promise((resolve, reject)=>{
            database.find(query, (err, docs)=>{
                if(err){
                    dispatch({
                        type: 'ERROR',
                        payload: err,
                    });
                    reject(err);
                } else {
                    dispatch({
                        type: 'UPDATE_DATABASE',
                        payload: docs,
                    });
                    resolve(docs);
                }
            })
        })
    }
}

/**
* Evaluates the securityScore
* It checks every password using the zxcvbn() function and adds the resulting scores.
*
* If fetching happens successfully, the function dispatches an action
* of type 'UPDATE_SCORE', with an object containing the score, the number of weak
* passwords and an array of the corrisponding weak entries as a payload.
* Should something go wrong, it dispatches an action of type 'ERROR', with the error as a payload.
* @returns {dispatchFunction}
*/

export function evaluate(){
    return function(dispatch){
        database.find({}, (err, docs)=>{
            if(err){
                dispatch({
                    type: 'ERROR',
                    payload: err,
                });
            } else {
                var score = 0, count = 0, entries = [];
                docs.map((item)=>{
                    if(item.type == 2){
                        score += 4;
                        return;
                    }
                    var result = zxcvbn(item.password).score;
                    if(result < 4){
                        count++;
                        entries.push(item);
                    }
                    score += result;
                });
                const percentage = score / (docs.length * 4);
                dispatch({
                    type: 'UPDATE_SCORE',
                    payload: {
                        score: percentage,
                        count: count,
                        entries: entries,
                    }
                });
            }
        })
    }
}

/**
* Inserts entry into database
* @param entry the entry to be inserted
* @returns {action} of type null, as action doesn't have to change anything
*/

export function insert(entry) {
    database.insert(entry);
    return { type: null }
}

/**
* Updates entry of database
* @param id id of the entry to be updated
* @param entry the entry to be updated
* @returns {action} of type null, as action doesn't have to change anything
*/

export function update(id, entry) {
    database.update({_id: id}, entry);
    return { type: null }
}

/**
* Removes entry of database
* @param id id of the entry to be deleted
* @returns {action} of type null, as action doesn't have to change anything
*/

export function remove(id) {
    database.remove({_id: id});
    return { type: null }
}

/**
* Searches entry and sets result as active entry
* @param id id of the entry to be deleted
* If fetching happens successfully, the function dispatches an action
* of type 'UPDATE_ACTIVE_ENTRY', with an the entry as a payload.
* @returns {dispatchFunction}
* @returns {Promise} In order to issue commands which depend on fetch() having finished
*/


export function setActiveEntry(id){
    return function(dispatch){
        return new Promise((resolve, reject)=>{
            database.findOne({_id: id}, (err, doc)=>{
                if(err){
                    dispatch({
                        type: 'ERROR',
                        payload: err,
                    });
                    reject(err);
                } else {
                    dispatch({
                        type: 'UPDATE_ACTIVE_ENTRY',
                        payload: doc,
                    });
                    resolve(doc);
                }
            })
        })
    }
}

/**
* Updates the active entry
* @param id id of the entry to be deleted
*
* @returns {action} of type 'UPDATE_ACTIVE_ENTRY', with the entry as a payload
*/

export function updateActiveEntry(entry){
    return {
            type: 'UPDATE_ACTIVE_ENTRY',
            payload: entry,
        }
}

/*********************************************************/
/******** Utilities **************************************/
const fs = require('fs');


/* 
String, Function, Function -> [Error, Object -> Error or [Object -> X]]
  takes in a string denoting the error location and can optionally take
  a success callback and failure callback,
  if no error is present, success callback is called,
  if their is a failure callback, it is called to prevent the operation from
  hanging 
*/
function result(location, success, failure){
    return function(err, obj){
        if(err) {
            if(failure){
                return failure(new Error(`${location}: ${err}`));
            } else {
                return console.log(`${location}: ${err}`);
            }
        } else if(success){
            return success(obj);
        } else {
            return;
        }
    }
}


/*
Date, String -> String
  takes in a Date and a descriptive phrase ('langs', 'tools', etc...)
  and creates a string for the filename of a JSON output
*/
function formatDate(d, desc){  
    return `${new Date().getTime()}-${desc}.json`;
}


// Array -> Array
// filters array of duplicate IDs
function uniqueIDs(arr){
    let cache = {};
    return arr.filter((item) => {
        return cache.hasOwnProperty(item) ? false : (cache[item] = true);
    });
}


module.exports = {
    result: result  
};

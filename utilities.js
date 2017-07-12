/*********************************************************/
/******** Utilities **************************************/
const fs = require('fs');


/* 
String, Function, Function -> [Error, Object -> Error or [Object -> X]]
  passed as error callback for async operations
  allows logging of error location
  success/failure callbacks optional
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
  for logging json output
  still necessary?
*/
function formatDate(d, desc){  
    return `${new Date().getTime()}-${desc}.json`;
}


/*
Array -> Array
  probably not necessary when using a Map vs an Object
*/
function uniqueIDs(arr){
    let cache = {};
    return arr.filter((item) => {
        return cache.hasOwnProperty(item) ? false : (cache[item] = true);
    });
}


module.exports = {
    result: result  
};

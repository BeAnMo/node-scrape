/*********************************************************/
/******** Utilities **************************************/
const fs = require('fs');


/* String, Function, Function -> [Error, Object -> Error or [Object -> X]]
    passed as error callback for async operations
    allows logging of error location
    success/failure callbacks optional  */
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


module.exports = {
    result: result  
};

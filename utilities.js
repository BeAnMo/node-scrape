/*********************************************************/
/******** Utilities **************************************/
const fs = require('fs');


/* Map -> JSON:
 * JSON.stringify([...mapName]);
 *
 * JSON -> Map:
 * new Map(JSON.parse(jsonName));
 */

// String, Object -> Void
// saves JSON to specified path
function outputJSON(path, obj){
    return fs.writeFile(path, JSON.stringify(obj), (err) => {
        if(err) throw new Error(err);

        return console.log('JSON written to', path);
    }); 
}


// String, [Object -> X] -> [String, [Error, Object] -> [Object -> X]]
// imports a JSON file to a JS Object and passes the
// loaded Object to the callback
function inputJSON(path, callback){
    return fs.readFile(path, 'utf-8', (err, data) => {
        if(err) throw new Error(err);

        return callback(JSON.parse(data));
    });
}


// Date -> String
// returns a formatted string for output log filename
// 'YYYY-MM-DD_HH-MM'
function formatDate(d){
    var d = new Date();
    var adjust = (dSpec) => { if(dSpec < 10) return '0' + dSpec;
                              else return dSpec; }
    
    var hours = adjust(d.getHours());
    var mins  = adjust(d.getMinutes());
    var day   = adjust(d.getDate());
    var month = adjust(d.getMonth() + 1);
    var year  = d.getFullYear();
    
    return year + '-' + month + '-' + day + '_H' + hours + '-M' + mins;
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
    outputJSON:  outputJSON,
    inputJSON:   inputJSON,  
};

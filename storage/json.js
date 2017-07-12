const utility = require('../utilities'),
      fs      = require('fs');


/* 
String, Object -> Void
  saves JSON of given description to the output folder
*/
function outputJSON(desc, obj){
    return fs.writeFile(createFileName(path), JSON.stringify(obj), (err) => {
        if(err) return console.error(err);

        return console.log(`JSON written to ${path}`);
    });
}


/*
String, [Object -> X] -> [String, [Error, Object] -> [Object -> X]]
  imports a JSON file to a JS Object and passes the
  loaded Object to the callback
*/
function inputJSON(path, callback){
    return fs.readFile(path, 'utf-8', (err, data) => {
        if(err) return console.error(err);

        return callback(JSON.parse(data));
    });
}


/*
Date, String -> String
  takes in a Date and a descriptive phrase ('langs', 'tools', etc...)
  and creates a string for the filename of a JSON output
  assumes CWD is project root
*/
function createFileName(desc){
    let date = new Date();
    let dateStr = `${date.getMonth() + 1}-${date.getDate()}`;
    
    return `./storage/data/${dateStr}-${desc}.json`;
}


module.exports = {
    outputJSON: outputJSON,
    inputJSON:  inputJSON
};

const utility = require('../utilities'),
      fs      = require('fs');


/* 
String, Object -> Void
  writes to ./storage/data/
*/
function outputJSON(desc, obj){
    return fs.writeFile(createFileName(path), JSON.stringify(obj), (err) => {
        if(err) return console.error(err);

        return console.log(`JSON written to ${path}`);
    });
}


/*
String, [Object -> X] -> [String, [Error, Object] -> [Object -> X]]
*/
function inputJSON(path, callback){
    return fs.readFile(path, 'utf-8', (err, data) => {
        if(err) return console.error(err);

        return callback(JSON.parse(data));
    });
}


/*
Date, String -> String
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

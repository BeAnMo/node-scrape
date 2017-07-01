/*********************************************************/
/******** HTTP(S) & Cheerio ******************************/
const https   = require('https'),
      http    = require('http'),
      url     = require('url'),
      fs      = require('fs'),
      cheerio = require('cheerio');
      

// String -> [Object -> X]
// makes a get request to a given page and uses the callback to access the HTML
function getHTML(input){
    var parsed = url.parse(input);
    var protocol;
    
    if(parsed.protocol === 'http:'){
        protocol = http;
    } else {
        protocol = https;
    }
    
    return new Promise((succeed, fail) => {
        protocol.get(input, (res) => {
            res.setEncoding('utf-8');
            
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                return succeed(data);
            });
        }).on('error', (err) => {
            return fail(err);
        });
    });
}

// String -> [String -> [Object -> X]]
// takes in an Object of a URL string, callback, and an options object
// performs a GET request to the Object's URL, 
// if successful, loads the HTML output as a cheerio Object and returns a
// Promise
function create$Obj(url){
    return getHTML(url).then((res) => {
        var $ = cheerio.load(res);
        return new Promise((succeed, fail) => {
            succeed($);
        });
    }).catch(console.error);
}


module.exports = {
    getHTML: getHTML,
    create$: create$Obj,
    cheerio: cheerio
};

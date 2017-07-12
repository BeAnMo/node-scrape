/*********************************************************/
/******** HTTP(S) & Cheerio ******************************/
const https   = require('https'),
      http    = require('http'),
      url     = require('url'),
      fs      = require('fs'),
      cheerio = require('cheerio');
      

/* 
String -> [Object -> X]
*/
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

/* 
String -> [String -> [Object -> X]]
*/
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

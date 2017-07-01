/*********************************************************/
/******** Filtering data from pages **********************/
const fs      = require('fs'),
      utility = require('./utilities'),
      input   = require('./input');

/*-------------------------------------------------------*/
/*------- Data Definitions ------------------------------*/
// Information for languages
const DATA = input.TOOLS

DATA.RXS = {
    //dotnet:       createRX('.net'), // account for various .net frameworks, but also exclude URL? 
    awk:          createRX('awk'),
    bash:         createRX('bash'),
    c_lang:       createRXExtended('c(?=lang|\\s|[^A-Za-z#\\+])'),
    csharp:       createRX('c#'),
    cpp:          createRX('c\\+\\+'),
    clojure:      createRX('clojure'),
    cobol:        createRX('cobol'),
    erlang:       createRX('erlang'),
    haskell:      createRX('haskell'),
    java:         createRXExtended('java(?!\\sscript|[A-Za-z])'),
    javascript:   createRXExtended('java(?=script|\\script)|([^A-Za-z])js(?![A-Za-z])'),
    lisp:         createRX('lisp'),
    //'Objective-C': createRX()
    pascal:       createRX('pascal'),
    perl:         createRX('perl'),
    php:          createRX('php'),
    //powershell
    python:       createRX('python'),
    ruby:         createRX('ruby'),
    //rust
    scala:        createRX('scala'),
    //scheme: createRX('scheme'),
    sql:          createRX('sql'),
    visualbasic:  createRX('visual basic|\\svb\\s'),
}

DATA.LANG_KEYS = Object.keys(DATA.RXS);
//const node_RX = /(^|\b|\s|[^A-Za-z])node(?=[js|.js|\W])/gi;


/*-------------------------------------------------------*/
/*------- Functions -------------------------------------*/
// String -> RegExp
// given the tail of a RX string, build a new RegExp
// start of RX pattern only matchs for beginning of string,
// a space in front of a term, and ignores any letters immediately
// preceeding the term
// - be sure to include extra '\' in rxStr arg when using 
// patterns like '\b', '\s', etc...
// - must convert RXs to strings to test equality, 
// RX1 === RX2 -> always false, RX1.toString() === RX2.toString() -> maybe true
function createRX(rxStr){
    return new RegExp('(^|\\s|[^A-Za-z])' + rxStr + '(?=[^A-Za-z])', "gi");
}


// String -> RegExp
function createRXExtended(rxStr){
    return new RegExp('(^|\\s|[^A-Za-z])' + rxStr, 'gi');
}


// RegExp -> String
// converts a regexp string into a normal string, no '/'
function regExpToString(re){
	var rStr = re.toString();
	return rStr.substring(1, rStr.length - 1);
}


// String, Array -> Array
// takes in an array of RegExps and an HTML string,
// returns an array of Strings of the present RegExps
function presentTerms(html){
    return DATA.LANG_KEYS.filter((lang) => {
        return DATA.RXS[lang].test(html);
    });
}


/*-------------------------------------------------------*/
/*------- Exports ---------------------------------------*/

module.exports = {
    DATA:         DATA,
    presentTerms: presentTerms
};

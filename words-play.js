/*********************************************************/
/******** Filtering data from pages **********************/
const fs      = require('fs'),
      utility = require('./utilities'),
      input   = require('./input');

/*-------------------------------------------------------*/
/*------- Data Definitions ------------------------------*/
// Information for languages
const DATA = {};
DATA.LANGS = input.TERMS.LANGS;
DATA.LANG_KEYS = Object.keys(DATA.LANGS);
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
function createRX1(rxStr){
    return new RegExp('(^|\\s|[^A-Za-z])' + rxStr + '(?=[^A-Za-z])', "gi");
}


// String -> RegExp
function createRXExtended(rxStr){
    return new RegExp('(^|\\s|[^A-Za-z])' + rxStr, 'gi');
}

// Array -> RegExp
// takes an array of search phrases that might be found in a job post
// and creates a single RegExp based on those phrases to be used in
// scraping job posts
function createRX(phrases){
    // creates a RegExp pattern from a string
    let rx = `${phrases.reduce((base, phrase, i) => {
        // check phrase for spaces & '+'
        if(phrase === 'c++'){
            phrase = 'c\\+\\+';
        } else if(phrase.indexOf(' ') > -1){
            phrase = phrase.split(' ').join('\\s');
        }
        // patterns match a given phrase surrounded by non letter characters
        // so 'scheme' will pass but not 'schemer'
        if(phrase === 'sql'){
            return phrase;
        } else if(i === 0){
            return base + `(^|[^A-Za-z])${phrase}[^A-Za-z]`;
        } else {
            return base + `|(^|[^A-Za-z])${phrase}[^A-Za-z]`;
        }
        
    }, '')}`;
    
    return new RegExp(rx, 'gi');
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
        return LANGS[lang].test(html);
    });
}


/*-------------------------------------------------------*/
/*------- Exports ---------------------------------------*/

module.exports = {
    DATA:         DATA,
    createRX:     createRX,
    presentTerms: presentTerms
};

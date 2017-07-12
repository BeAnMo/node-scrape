/*********************************************************/
/******** Filtering data from pages **********************/
const fs      = require('fs'),
      //utility = require('./utilities'),
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
/* 
String -> RegExp
  old version
*/
function createRX1(rxStr){
    return new RegExp('(^|\\s|[^A-Za-z])' + rxStr + '(?=[^A-Za-z])', "gi");
}


/*
String -> RegExp
  old version
  allowed for custom RegExp tails
*/
function createRXExtended(rxStr){
    return new RegExp('(^|\\s|[^A-Za-z])' + rxStr, 'gi');
}

/*
Array -> RegExp
  builds a RegExp from an array of phrases to allow for multiple cases
  such as 'c#' or 'c sharp', 'javascript' or 'js'
*/
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


/* 
RegExp -> String
  old, not necessary
*/
// converts a regexp string into a normal string, no '/'
function regExpToString(re){
	var rStr = re.toString();
	return rStr.substring(1, rStr.length - 1);
}


/* 
String, Array -> Array
  checks if given terms exist on given web page
  called in indeed.js
  parameterize DATA.LANGS/_KEYS
*/
// takes in an array of RegExps and an HTML string,
// returns an array of Strings of the present RegExps
function presentTerms(html){
    return DATA.LANG_KEYS.filter((lang) => {
        let rx = createRX(DATA.LANGS[lang].searches);
        return rx.test(html);
    });
}


/*-------------------------------------------------------*/
/*------- Exports ---------------------------------------*/

module.exports = {
    DATA:         DATA,
    createRX:     createRX,
    presentTerms: presentTerms
};

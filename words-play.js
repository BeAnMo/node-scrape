/*********************************************************/
/******** Filtering data from pages **********************/
const fs      = require('fs'),
      //utility = require('./utilities'),
      input   = require('./input');


const DATA = {};
DATA.LANGS = input.TERMS.LANGS;
DATA.LANG_KEYS = Object.keys(DATA.LANGS);
// to be incorporated into the tools' terms
//const node_RX = /(^|\b|\s|[^A-Za-z])node(?=[js|.js|\W])/gi;


/* Array -> RegExp
    builds a RegExp from an array of phrases to allow for multiple cases
    such as 'c#' or 'c sharp', 'javascript' or 'js'  */
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


/* String, Array -> Array
    checks if given terms exist on given web page
    called in indeed.js  */
function presentTerms(html){
    return DATA.LANG_KEYS.filter((lang) => {
        let rx = createRX(DATA.LANGS[lang].searches);
        return rx.test(html);
    });
}


module.exports = {
    DATA:         DATA,
    createRX:     createRX,
    presentTerms: presentTerms
};

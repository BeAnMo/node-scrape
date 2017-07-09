/*********************************************************/
/******** RegExp testing *********************************/
const expect  = require('chai').expect,
      words   = require('../words-play'),
      utility = require('../utilities');
      
/*

- Notes 2017-07-08:
  - c
    - passes & fails but only tests for 'c_lang', not 'c'
  - javascript & visual basic tests need to account for separate words and initials

- Not passing:
  c#
  go
  javascript
  objective-c
  powershell
  sql
  visualbasic
  - basically anything that has more than 1 search
    
- Not failing:
  sql
      
*/

const LANG_KEYS = words.DATA.LANG_KEYS;
const LANGS = words.DATA.LANGS;
// initialize the test object
// contains both passing & failing strings to be matched to a corresponding
// regexp
const TEST_STRINGS = (() => {
    let result = [];
    for(let lang in LANGS){
        result.push({
            lang: lang,
            pass: createTestString(LANGS[lang].searches, createPassString),
            fail: createTestString(LANGS[lang].searches, createFailString),
        });
    }
    
    return result;
})();


/*------- Test suite ------------------------------------*/
describe('RegExp patterns for languages', () => {
    langsRXTest('pass');
    langsRXTest('fail');
});


/*------- Testing functions -----------------------------*/
// String -> Void
// Takes in a test string ('pass' or 'fail') and runs the specified test
// through the its RegExp patterns supplied by each term
function langsRXTest(testStr){
    describe('should ' + testStr + ':', () => {
        TEST_STRINGS.forEach((obj) => {
            it(obj.lang, () => {
                // creates the appropriate RegExp
                let searches = words.DATA.LANGS[obj.lang].searches;
                let rxs = words.createRX(searches);     
                let result = obj[testStr].match(rxs);
                
                if(testStr === 'pass'){
                    // all tests pass
                    expect(result.length).to.equal(9 * searches.length);
                } else {
                    expect(result).to.equal(null);
                }
            });
        });
    });
}


/*------- Helper functions ------------------------------*/
// String -> String
// creates a test string of 9 matches for a given word
function createPassString(word){
    var borders = [
        '/', ',', '-', '_', '.', ':', '*', '\\'
    ];
    
    return borders.reduce((base, border) => {
        return base + ' ' + border + word + border;
    }, word);
}


// String -> String
// creates a test string that fails for a given word
function createFailString(word){
    var borders = [
        '/', ',', '-', '_', '.', ':', '*', '\\'
    ];
    
    return borders.concat(borders).reduce((base, border, i) => {
        if(i % 2 === 0){
            return base + border + 'q' + word + border;
        } else {
            return base + ' ' + border + word + 'q' + border;
        }      
    }, 'q' + word + ' ' + word + 'q');
}


// Array -> String
// generates a single string from each of the given language's searches
// in order to be tested with the languages RegExp
function createTestString(arr, func){
    let result = '';
    for(let i = 0; i < arr.length; i++){
        result = result + func(arr[i]);
    }
    
    return result;
}


// output testing objects
//let path = '/home/bammer/myProjects/scraperv2/output/';
//utility.outputJSON(path + 'testing-strings.json', TEST_STRINGS);



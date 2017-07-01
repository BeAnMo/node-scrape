/*********************************************************/
/******** RegExp testing *********************************/
const expect  = require('chai').expect,
      words   = require('../words-play'),
      utility = require('../utilities');
      
/*

- Notes 2017-06-30:
  - c
    - passes & fails but only tests for 'c_lang', not 'c'
  - javascript & visual basic tests need to account for separate words and initials

- Not passing:
  c#
  c++
  visualbasic
    
- Not failing:
  c
  javascript
      
*/

const LANG_KEYS = Object.keys(words.DATA.RXS);
// initialize the test object
const TEST_STRINGS = LANG_KEYS.map((lang) => {
    return { 
        lang: lang, 
        pass: createPassString(lang),
        fail: createFailString(lang)
    };
});


/*------- Test suite ------------------------------------*/
describe('RegExp patterns for languages', () => {
    langsRXTest('pass');
    langsRXTest('fail');
});


/*------- Testing functions -----------------------------*/
// String -> Void
// Takes in a test string ('pass' or 'fail') and runs the specified string
// through the its RegExp pattern supplied by each term
function langsRXTest(testStr){
    describe('should ' + testStr + ':', () => {
        TEST_STRINGS.forEach((obj) => {
            it(obj.lang, () => {         
                let result = obj[testStr].match(words.DATA.RXS[obj.lang]);
                
                if(testStr ===  'pass'){
                    // all tests pass
                    expect(result.length).to.equal(9);
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
        '/', ',', '-', '_', ' ', '.', ':', '*', '\\'
    ];
    
    return borders.map((border) => {
        return border + word + border;
    }).join(' ');
}


// String -> String
// creates a test string that fails for a given word
function createFailString(word){
    var borders = [
        '/', ',', '-', '_', ' ', '.', ':', '*', '\\'
    ];
    
    var b2 = borders.concat(borders);
    
    return b2.map((border, i, arr) => {
        if(i % 2 === 0){
            return border + 'a' + word + border;
        } else {
            return border + word + 'a' + border;
        }      
    }).join(' ');
}


// output testing objects
let path = '/home/bammer/myProjects/scraperv2/output/';
utility.outputJSON(path + 'testing-strings.json', TEST_STRINGS);



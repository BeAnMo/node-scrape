/*********************************************************/
/******** Main *******************************************/
const utility   = require('./utilities'),
      words     = require('./words-play'),
      db        = require('./storage'),
      indeed    = require('./indeed'),
      input     = require('./input');

// sqlite3 issues with Node 8.1
// use 6.*

// current test files
//const POSTS_JSON = './output/filter-posts.json';
//const TERMS_JSON = './output/filter-terms.json';

// current usage
// all const can go to input.js:
const CITY = input.CITY; // nashville ATM
const SEARCH_TERMS = input.TERMS.SEARCHES;

const LINKS = SEARCH_TERMS.map((term) => {
    return indeed.searchPath(CITY, term);
});


// initiate scraping
// scrape -> insert POSTS -> insert TERMS
function scrapeIndeed(){
    return LINKS.forEach((link) => {
        indeed.searchPages(link, { city: CITY });
    });
}


// move to gp.js?
/*-------------------------------------------------------*/
/*------- Converting to/from JSON files -----------------*/
// String, String -> Object
// takes in strings as paths to JSON info and returns
// an object
function results(posts, terms){
    return {
        POSTS: {
            path: posts,
            data: null,
        },
        TERMS: {
            path: terms,
            data: null,
        }
    };
}

// Object -> Void
// takes in results and loads the appropriate JSON files
function loadResults(results){
    const getData = (KEY) => {
        utility.importJSON(KEY.path, (data) => {
            KEY.data = data;
            return console.log('RETRIEVED', KEY.path);
        });
    };

    getData(results.POSTS);
    getData(results.TERMS);
}

// test data for export
//const TEST = results(POSTS_JSON, TERMS_JSON);
// initialize JSON load
//loadResults(TEST);


module.exports = {
    scrapeIndeed: scrapeIndeed,
    //results:      results,
    //loadResults:  loadResults,
    POSTS:        indeed.DATA.POSTS,
    LANGS:        indeed.DATA.LANGS,
    DB:           db,
    Utils:        utility,
    //TEST_DATA:    TEST,
    //TEST_CACHE:  indeed.CACHE,
};

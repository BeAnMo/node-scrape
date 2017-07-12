/*********************************************************/
/******** Main *******************************************/
const utility   = require('./utilities'),
      words     = require('./words-play'),
      store     = require('./storage/index'),
      indeed    = require('./indeed'),
      input     = require('./input');

/* sqlite3 issues with Node 8.1, use 6.x */

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


module.exports = {
    scrapeIndeed: scrapeIndeed,
    POSTS:        indeed.DATA.POSTS,
    LANGS:        indeed.DATA.LANGS,
    DB:           store.DB,
    JSON:         store.JSON,
    Utils:        utility,
};

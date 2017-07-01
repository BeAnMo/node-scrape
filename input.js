/**********************************************************/
/******** Input data **************************************/

const CITY = 'nashville';

const CITY_TERMS = [
    'atlanta',
    'austin',
    'chicago',
    'denver',
    'nashville',
];

const SEARCH_TERMS = [
    'developer', 
    'frontend+developer',
    'web+developer',
    'frontend+engineer',
];

// a Post {} is made of:
// postID: String
// title:  String
// link:   String
// city:   String

// POSTS is made of:
// Array-of-Post

// a Term {} is made of:
// search-term: Array-of-postID

// TERMS {} is made of:
// Term
// * DB issues with storing '.net' & 'c#'
// * issues with scraping for 'go' & 'swift' 
//   - not enough context to distinguish computer 
//     related posts vs else
// * issues with scraping 'html' 
//   - regexp will pick up DOCTYPE and/or <html> tags
//     on off site posts (ex: not posts hosted on indeed or
//     craigslist)
// * issues with scraping 'java'
//   - will pick up 'javascript' as well
const LANG_TERMS = {
    //dontnet:    [], move into lang_tools
    awk:        [],
    bash:       [],
    c_lang:     [],
    csharp:     [],
    cpp:        [],
    clojure:    [],
    cobol:      [],
    erlang:     [],
    go:         [],
    haskell:    [],
    java:       [],
    javascript: [],
    lisp:       [],
    objc:       [],
    pascal:     [],
    perl:       [],
    php:        [],
    powershell: [],
    python:     [],
    rust:       [],
    ruby:       [],
    scala:      [],
    scheme:     [],
    sql:        [],
    swift:      [],
    visualbasic:[],
};

// for words-play.js to set up regex filtering
const TOOLS = {
    LANGS: {},
    LANG_KEYS: Object.keys(LANG_TERMS),
    // Information of language tools (libraries/frameworks/etc...)
    LANG_TOOLS: {},
    // Information of non-language tools (server software/OSs/DBs/etc...)
    TOOLS: {},
    // Arrary-of-Array, [String of language, RegExp tail]
    // temp only, will be destroyed when DATA.LANGS is loaded
};


module.exports = {
    TOOLS:  TOOLS,
    CITY:  CITY,
    POSTS: [],
    TERMS: {
        LANGS: LANG_TERMS,
        CITIES: CITY_TERMS,
        SEARCHES: SEARCH_TERMS
    },
};

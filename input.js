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

const LANG_TERMS = {
    //!!! remeber to update functions that rely on LANG_TERMS to
    // account for the switch from array to object !!!
    //dontnet:    [], move into lang_tools
    awk:        { ids: [], searches: ['awk'] },
    bash:       { ids: [], searches: ['bash'] },
    c_lang:     { ids: [], searches: ['c'] },
    csharp:     { ids: [], searches: ['c#', 'csharp', 'c sharp'] },
    cpp:        { ids: [], searches: ['c++'] },
    clojure:    { ids: [], searches: ['clojure'] },
    cobol:      { ids: [], searches: ['cobol'] },
    erlang:     { ids: [], searches: ['erlang'] },
    go:         { ids: [], searches: ['go', 'golang'] },
    haskell:    { ids: [], searches: ['haskell'] },
    java:       { ids: [], searches: ['java'] },
    javascript: { ids: [], searches: ['javascript', 'java script', 'js'] },
    lisp:       { ids: [], searches: ['lisp'] },
    objc:       { ids: [], searches: ['objective-c', 'objective c'] },
    pascal:     { ids: [], searches: ['pascal'] },
    perl:       { ids: [], searches: ['perl'] },
    php:        { ids: [], searches: ['php'] },
    powershell: { ids: [], searches: ['powershell', 'power shell'] },
    python:     { ids: [], searches: ['python'] },
    ruby:       { ids: [], searches: ['ruby'] },
    rust:       { ids: [], searches: ['rust'] },
    scala:      { ids: [], searches: ['scala'] },
    scheme:     { ids: [], searches: ['scheme'] },
    sql:        { ids: [], searches: ['sql'] }, // RegExp should account for mysql, t-sql, mssql
    swift:      { ids: [], searches: ['swift'] },
    visualbasic:{ ids: [], searches: ['visual basic', 'visualbasic', 'vb', 'vba'] },
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

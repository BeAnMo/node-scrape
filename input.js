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
    sql:        { ids: [], searches: ['sql'] },
    swift:      { ids: [], searches: ['swift'] },
    visualbasic:{ ids: [], searches: ['visual basic', 'visualbasic', 'vb', 'vba'] },
};


module.exports = {
    CITY:  CITY,
    POSTS: [],
    TERMS: {
        LANGS: LANG_TERMS,
        CITIES: CITY_TERMS,
        SEARCHES: SEARCH_TERMS
    },
};

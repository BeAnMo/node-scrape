/******** scraper ********/

/*** CONSTANTS ***/
var TEST = makeRequest('http://localhost:1337');
var BASE = 'www.indeed.com';
var CITY = 'nashville';

/*
String -> Request
*/
function makeRequest(url){
    return new Request(url, {
        method: 'get',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });
}


/*** FUNCTIONS ***/
/*
String -> Promise
*/
async function getHTML(req){
    var fetched = await fetch(req)
        .then((res) => {
            return res.text();
        });    
    return fetched;
}

// String, String -> String
// creates an indeed search URL from a given city and term
function searchPath(city, term){
    return "/jobs?q=" + term +  "&l=" + city + "&utm_source=publisher&utm_medium=organic_listings&utm_campaign=affiliate";
}

/*
undefined
*/
/*
undefined
*/
/*
undefined
*/
/*
undefined
*/
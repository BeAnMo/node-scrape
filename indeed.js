/*********************************************************/
/******** Indeed.com scraper *****************************/
const cheerio   = require('cheerio'),
      words     = require('./words-play'),
      input     = require('./input'),
      hyperText = require('./http-methods');

const DATA = {
    CITY:  'nashville',
    BASE:  'www.indeed.com',
    LANGS: input.TERMS.LANGS,
    POSTS: new Map(),
    CACHE: {},
};


/*-------------------------------------------------------*/
/*------- Functions -------------------------------------*/
// String, String -> String
// creates an indeed search URL from a given city and term
function searchPath(city, term){
    return "/jobs?q=" + term +  "&l=" + city + "&utm_source=publisher&utm_medium=organic_listings&utm_campaign=affiliate";
}


// String -> [String -> Void]
// takes in a city & Options, and retrieves all available job posts,
// (goes through result pagination until end)
function searchPages(path){ // no callback? 
    return hyperText.create$('https://' + DATA.BASE + path).then(($) => {
        return getSearchPageInfo($);
    });
}


// Object -> [String -> Void]
// takes in a cheerio Object and initiates scraping for PostLinkInfo
function getSearchPageInfo($){
    var next = getNextPage($);
    
    getPostLinksInfo($);
    
    if(next === null){
        return console.log('END OF SEARCH');
    } else {
        return searchPages(next);
    }
}


// Object -> [String, String -> Void]
// takes in a cheerio Object, retrieves individual post link info from 
//a single Indeed search results page, and stores the info into POSTS
function getPostLinksInfo($){
    return $('.result').each(function(i, job){
        let postID = job.attribs['data-jk'];
        // check to make sure data-tn-component is a String
        // if not, ignore, no need for makePostLinkInfo
        let postInfo = makePostLinkInfo(job);
        
        if(postInfo.title === null){
            return console.log('AD DETECTED, LINK SKIPPED');
        }
        
        postInfo.city = DATA.CITY;
        postInfo.postID = postID
        
        let url = 'https://' + DATA.BASE + postInfo.link;
        postInfo.link = url;
        DATA.POSTS.set(postID, postInfo);
          
        return getTerms(url, postInfo.postID);    
    });
}


// Object -> Object
// takes in a HTML Object and returns the appropriate job post information
function makePostLinkInfo(html){
    let post = {
        postID: null,
        title:  null,
        city:   null,
        link:   null
    };
    
    switch(typeof(html.attribs['data-tn-component'])){
        // ./pagead/clk?...
        // sponsored ad?
        case 'undefined':
            //post.title = html.children[1].next.next.attribs.title;
            //post.link = html.children[1].next.next.attribs.href;
            break;
        // ./rc/clk?... or ./company/...    
        case 'string':
            post.title = html.children[0].next.children[1].attribs.title;
            post.link = html.children[0].next.children[1].attribs.href;
            break;
        default:
            post.title = 'TITLE NOT FOUND';
    }
    
    return post;
}


// Object -> String or Null
// takes in a cheerio Object and retrieves the 'Next' page link on an 
// Indeed search results page, if the 'next' link exists
function getNextPage($){
    var pages = $('.pagination a');
    var $last = $(pages[pages.length - 1]);
    var next = $last.attr('href');
    var flag = $last.text().substring(0, 4) === 'Next';
    
    if(!flag){
        return null;
    } else {
        return next;
    }
}


// String, String -> [String -> [Object -> Void]]
// takes in a URL string and a Indeed post ID, loads the page, and filters
// it for the given search terms from input.js
// !!! need to limit/delay retrying a 302 link
function getTerms(url, id){
    return hyperText.getHTML(url).then((data) => {
        var $ = cheerio.load(data);
        
        if($('title').text() === '302 Moved'){
            console.log('RETRYING:', id);
            // find a way to space out retry
            getTerms($('a').attr('href'), id);
            return;
        } else {
            return words.presentTerms(data).forEach((term) => {
                console.log('SCRAPING:', id);
                let termArr = DATA.LANGS[term];
                if(termArr.indexOf(id) === -1){
                    return DATA.LANGS[term].push(id);
                }
            });
        }
    }).catch(console.error);
}


module.exports = {
    searchPath:  searchPath,
    searchPages: searchPages,
    nash:        searchPath('nashville', 'web+developer'),
    DATA:        DATA,
}

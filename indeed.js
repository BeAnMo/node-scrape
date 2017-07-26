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


/* String, String -> String
    only provides the query string, append to protocl/host  */
function searchPath(city, term){
    return "/jobs?q=" + term +  "&l=" + city + "&utm_source=publisher&utm_medium=organic_listings&utm_campaign=affiliate";
}


/* String -> [String -> Void]
    initiates scraping  */
function searchPages(path){
    return hyperText.create$('https://' + DATA.BASE + path).then(($) => {
        return getSearchPageInfo($);
    });
}


/* Object -> [String -> Void]
    initiates scrape of current page and 
    advancement to next page if present  */
function getSearchPageInfo($){
    var next = getNextPageIfExists($);
    
    getSearchResults($);
    
    if(next === null){
        return console.log('END OF SEARCH');
    } else {
        return searchPages(next);
    }
}


/* Object -> [String, String -> Void]
    retrieves all job post links and stores them in POSTS  */
function getSearchResults($){
    return $('.result').each(function(i, job){
        let postID = job.attribs['data-jk'];
        // check to make sure data-tn-component is a String
        // if not, ignore, no need for makePostLinkInfo
        let postInfo = getPostLinkInfo(job);
        
        if(postInfo.title === null){
            return console.log('AD DETECTED, LINK SKIPPED');
        }
        
        postInfo.city = DATA.CITY;
        postInfo.postID = postID
        
        let url = 'https://' + DATA.BASE + postInfo.link;
        postInfo.link = url;
        DATA.POSTS.set(postID, postInfo);
          
        return filterForTerms(url, postInfo.postID);    
    });
}


/* Object -> Object */
function getPostLinkInfo(html){
    let post = {
        postID: null,
        title:  null,
        city:   null,
        link:   null
    };
    
    switch(typeof(html.attribs['data-tn-component'])){
        // if undefined it is most likely an ad, with a good chance of
        // being a duplicate   
        case 'string':
            post.title = html.children[0].next.children[1].attribs.title;
            post.link = html.children[0].next.children[1].attribs.href;
            break;
        default:
            post.title = 'TITLE NOT FOUND';
    }
    
    return post;
}


/* Object -> String or Null */
function getNextPageIfExists($){
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


/* String, String -> [String -> [Object -> Void]]
    places post ID into every matching term array  */
function filterForTerms(url, id){
    return hyperText.getHTML(url).then((data) => {
        var $ = cheerio.load(data);
        
        if($('title').text() === '302 Moved'){
            console.log('RETRYING:', id);
            // what is a better way to handle retries?
            filterForTerms($('a').attr('href'), id);
            return;
        } else {
            return words.presentTerms(data).forEach((term) => {
                console.log('SCRAPING:', id);
                let termArr = DATA.LANGS[term].ids;
                if(termArr.indexOf(id) === -1){
                    return termArr.push(id);
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

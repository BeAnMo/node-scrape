# Job Scraper
### (Personal quick reference)

---

#### From the Node REPL:

    const app = require('./app')
    
#### Initiate Indeed.com scrape:

    app.scrapeIndeed()

#### Load results into in memory stores:
- app.POSTS: a Map of individual job post information collected
 - app.LANGS: an Object whose keys are the languages searched, and whose values are arrays of post IDs referenced from app.POSTS
    
#### Insert app.POSTS into SQLite DB:

    app.DB.insertPosts(app.POSTS)
    
#### Store app.LANGS or app.POSTS as JSON file (trying to get JSON support for SQLite):

    app.JSON.output('path/to/file.json', app.[LANGS|POSTS])

#### Import data from JSON file:

    app.JSON.input('path/to/file.json', callback)

 - The callback takes JSON file as parameter.
 
#### app.POSTS input/output:
Map -> JSON:
     
    JSON.stringify([...mapName]);
        
JSON -> Map:
     
    new Map(JSON.parse(jsonName));

---

### False positives:
Context is critical. 'Ruby' can appear embedded within HTML/JS files loaded into page, while 'go' & 'swift' are too general. Don't rely on RegExp to filter an entire HTML file, try targeting the body at the very least for third party sites.
- 'c'
- 'go'
- 'ruby'
- 'swift'

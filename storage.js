/*********************************************************/
/******** Database ***************************************/
const sqlite3 = require('sqlite3').verbose(),
      input   = require('./input');

/*
- Posts:
  id PRIMARY KEY INTEGER,
  post_title TEXT,
  post_link TEXT,
  post_id TEXT

- Lang (1 TABLE for each term):
  post_ref INTEGER FOREIGN KEY REFERENCES posts(id)
*/
const db = new sqlite3.Database('scraped.db');
const LANGS = Object.keys(input.TERMS.LANGS) 
//const dbRunErr = function(err){ 
//    if(err) return new Error(err); 
//};

// String -> [Error -> Error]
const dbErr = function(path){
    return function(err){
        if(err) return new Error(path + ': ' + err);
    }
}

// ensures DB is set up
db.serialize(() => {

    const postTable = 'CREATE TABLE IF NOT EXISTS posts ' +
        '(db_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'post_id TEXT, post_title TEXT, post_city TEXT, post_link TEXT)';
    const langTable = (lang) => {
        return 'CREATE TABLE IF NOT EXISTS "' + lang + '" ' +
            '(post_ref INTEGER, FOREIGN KEY(post_ref) REFERENCES posts(db_id))';
    };
    
    db.run('PRAGMA foreign_keys=on', dbErr('PRAGMA'));
    db.run(postTable, dbErr('CREATE TABLE posts'));
    LANGS.forEach((term) => {
        db.run(langTable(term), dbErr('CREATE TABLE langs'));
    });
});


// Object -> Void
function insertPost(statement, post){ 
    let params =  [
        post.postID,
        post.title,
        post.city,
        post.link
    ];

    //return statement.run(params, (err) => {
    //    if(err) return new Error('insertPost:', err);

    //    console.log('INSERTED:', params[0]);
    //});
    return statement.run(params, dbErr('insertPost()'))
}

// Array -> Void
function insertAllPosts(postMap){
    // look into BEGIN/COMMIT to speed up insertions
    db.serialize(() => {
        const query = 'INSERT INTO posts (' +
            'post_id, post_title, post_city, post_link) ' +
            'VALUES(?, ?, ?, ?)';
            
        // begin DB transaction
        db.run('BEGIN');

        var statement = db.prepare(query);

        for(post of postMap){
            console.log(post[0]);
            insertPost(statement, post[1]);
        }

        statement.finalize(() => {
            // end DB transaction
            db.run('COMMIT');
            let f = 'Inserted ' + postMap.size + ' posts';
            console.log(f);
        });
    });   

    return;
}

// String, String, String, String -> [String -> [Error -> Void]]
function insertTerm(statement, post_id, db_id, term){
    console.log('INSERTING ' + post_id + ' INTO ' + term);
    //return statement.run(db_id, (err) => {
    //    if(err) return new Error('insertTerm:', err);

    //    return console.log('INSERTING ' + post_id + ' INTO ' + term);
    //});
    return statement.run(db_id, dbErr('insertTerm()'));
}


// Object -> 
//  [String -> [[Error, Object -> Void], [Error, Number -> 
//      [Array -> [Void -> [Void -> Void]]]]]]
// inserts pointers to posts into each term table
function insertAllTerms(termsObj){
    // need to review scoping with let/const
    const postsQuery = 'SELECT db_id, post_id FROM posts';
    var terms = Object.keys(termsObj);
    
    // reference for db_id's
    var posts = {};
    
    // using db.each instead of db.all
    db.each(postsQuery, (err, row) => {
        if(err) return new Error('db.each.callback ERR:', err);

        // creates an reference object to grab db_id's
        // { ..., { post_id: db_id }, ... }
        posts[row.post_id] = row.db_id;
        return;
    }, (err, num) => {
        // completed callback, call after end of db.each
        if(err) return new Error('db.each.completed ERR:', err);
       
        // for each term, insert all post_id's present
        return terms.forEach((term) => {
            db.serialize(() => {
                // begin DB transaction
                db.run('BEGIN');
                
                var insert = 'INSERT INTO "' + term + 
                    '" (post_ref) VALUES (?)';
                var statement = db.prepare(insert);
                
                // local cache, to prevent duplicate entries
                // necessary if serialized?
                var cache = {};
                var termArr = termsObj[term];

                for(let i = 0; i < termArr.length; i++){
                    let postID = termArr[i];
                    
                    // if cache has post_id, skip
                    // else insert into DB, add post_id to cache
                    if(cache.hasOwnProperty[postID]){
                        console.log('ALREADY INSERTED', postID);
                    } else {
                        cache[postID] = true;
                        insertTerm(statement, postID, posts[postID], term);
                    }
                } 
                statement.finalize(() => {
                    // end DB transaction
                    db.run('COMMIT');
                });
            });// end db.serialize        
        });// end terms.forEach
    });// end db.each completion callback
}


module.exports = {
    insertPosts: insertAllPosts,
    insertTerms: insertAllTerms
}

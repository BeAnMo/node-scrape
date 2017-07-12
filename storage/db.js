const sqlite3 = require('sqlite3').verbose(),
      command = require('./command'),
      utility = require('../utilities'),
      path    = require('path');
      
const db = new sqlite3.Database('./storage/data/scraped.db',
                                utility.result('new sqlite DB'));
//console.log(process.cwd());

/*------- DB Functions ----------------------------------*/
/* initialize the DB, create posts table if not created */
db.serialize(() => {
    db.run('PRAGMA foreign_keys=on', utility.result('PRAGMA'))
      .run(command.createPostTable,  utility.result('CREATE TABLE posts'));
    
    console.log('DB Initialized');
});


/*
Object, Object, Number -> Void
  takes in a DB statement and post information and inserts
  the post into the DB, and increases the insert counter by 1
*/
function insertPost(statement, post, count){ 
    let params =  [
        post.postID,
        post.title,
        post.city,
        post.link
    ];
    let success = () => {
        count += 1;
        return console.log(`Inserted: ${params[0]}`);
    };
    
    return statement.run(params, utility.result('insertPost', success))
}


/*
Map -> Void
  takes in a Map of posts and inserts all into the DB
*/
function insertAllPosts(postMap){
    db.serialize(() => {
        // begin DB transaction
        db.run('BEGIN');

        let statement = db.prepare(command.insertPost);
        // increased for every sucessful insertion
        let totalInserts = 0;
        
        for(post of postMap){
            insertPost(statement, post[1], totalInserts);  
        }

        statement.finalize(() => {
            // end DB transaction
            db.run('COMMIT');
            console.log(`Inserted ${totalInserts} posts`);
        });
    });   
}


module.exports = {
    DB:          db,
    insertPosts: insertAllPosts
};

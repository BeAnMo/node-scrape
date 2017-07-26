const sqlite3 = require('sqlite3').verbose(),
      command = require('./command'),
      utility = require('../utilities');
      
const db = new sqlite3.Database('./storage/data/scraped.db',
                                utility.result('new sqlite DB'));


/* initialize the DB, create posts table if not created */
db.serialize(() => {
    db.run('PRAGMA foreign_keys=on', utility.result('PRAGMA'))
      .run(command.createPostTable,  utility.result('CREATE TABLE posts'));
    
    console.log('DB Initialized');
});


/* Object, Object, Number -> Void
    called in insertAllPosts  */
function insertPost(statement, post, count){ 
    let params =  [
        post.postID,
        post.title,
        post.city,
        post.link
    ];
    let insertSuccess = () => {
        count += 1;
        return console.log(`Inserted: ${params[0]}`);
    };
    
    return statement.run(params, utility.result('insertPost', insertSuccess))
}


/* Map -> Void */
function insertAllPosts(postMap){
    db.serialize(() => {
        db.run('BEGIN');

        let statement = db.prepare(command.insertPost);
        let insertSuccesses = 0;
        
        for(post of postMap){
            insertPost(statement, post[1], insertSuccesses);  
        }

        statement.finalize(() => {
            db.run('COMMIT');
            console.log(`Inserted ${insertSuccesses} posts`);
        });
    });   
}


module.exports = {
    DB:          db,
    insertPosts: insertAllPosts
};

const modDB   = require('./db'),
      modJSON = require('./json');

/* check if JSON1 is availbable with sqlite3 */

module.exports = {
    DB: {
        insertPosts: modDB.insertPosts,
        database:    modDB.DB
    },
    JSON: {
        output:      modJSON.outputJSON,
        input:       modJSON.inputJSON 
    }
}

const modDB   = require('./db'),
      modJSON = require('./json');

/* Juntion for all data stroage related functionality */

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

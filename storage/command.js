exports.createPostTable = `\
CREATE TABLE IF NOT EXISTS posts (\
db_id INTEGER PRIMARY KEY AUTOINCREMENT, \
post_id TEXT, \
post_title TEXT, \
post_city TEXT, \
post_link TEXT, \
CONSTRAINT uniq_post UNIQUE (post_id, post_title)\
)`;


exports.insertPost = `\
INSERT INTO posts (\
post_id, \
post_title, \
post_city, \
post_link\
) \
VALUES(?, ?, ?, ?)`;

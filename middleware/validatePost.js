const db = require('../connection/connection');

// this middleware check the post parametter to be valid before proceeding to insert the comment in the database
module.exports = (req, res, next) => {
    const postId = req.params.id;
    
    const sql = `SELECT * FROM likes WHERE
                 post_ID = '${postId}'`;
 
    db.query(sql, (error, results) => {
        if (error) {
            return res.sendStatus(500);
        }

        if (results.length == 0) {
            return res.sendStatus(404);
        }

        else if (results.length > 0) {
            next();
        }
    })
};
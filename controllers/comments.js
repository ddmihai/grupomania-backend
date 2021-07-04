const db = require('../connection/connection');

// create comment
exports.createPost = (req, res, next) => {
    const postID   = req.params.id;
    const userID   =  req.body.author;
    const text     = req.body.comment

    const sql = `INSERT INTO comments (post_ID, author, comment_text)
                 VALUES ('${postID}', '${userID}', '${text}')`;


    db.query(sql, (error, result) => {
        if (error) {
            res.send(error)
        }

        res.json({ message: 'User ' + userID + ' added a comment!'})
    })
}

exports.deleteComment= (req, res, next) => {
    const commid = req.params.id;
    const sql = `DELETE FROM comments WHERE comm_ID = '${commid}'`;

    db.query(sql, (error, result) => {
        if (error) throw error;
        
        res.json({message: 'Deleted comment!'})
    })
}
,

// get a post comments 
exports.getPostComments =(req, res, next) => {
    const postID = req.params.id;

    const sql = `
    SELECT * FROM comments 
        INNER JOIN employees
        ON employees.emp_ID = comments.author
        WHERE comments.post_ID = ${postID}
    `;

    db.query(sql, (error, result) =>{
        if (error) throw error;
        res.send(result)
 })
}


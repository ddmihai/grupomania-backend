const db = require('../connection/connection');

// create post 
// need the authorization token from the login of the user to be send each time when the user loggins
exports.createPost = (req, res, next) => {
const {emp_ID, post_title, post_subtitle, post_content} = req.body      
   
const create = `INSERT INTO posts (emp_ID, post_title, post_subtitle, post_content) 
                VALUES 
                ('${emp_ID}', '${post_title}', '${post_subtitle}', '${post_content}')`;

db.query(create, (error, result) => {
    if (error) {
        res.status(500).json({ message: 'Whoops!'})
    }

   else if (result.insertId > 0) {
       res.status(201).json({
           authorID:    emp_ID,
           postID:      result.insertId
       })
   }
})
};

// delete post using req.params and the post ID
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;

    const sql = `DELETE FROM posts WHERE post_ID = '${postId}'`

    db.query(sql, (error, result) => {
        if (error) throw error;

        if (result.affectedRows > 0) {
            res.send('Post deleted!')
        }

        else if (result.affectedRows == 0) {
            res.send('Please check the post ID');
        }
    })
    };

// like a post
exports.likePost = (req, res, next) => {
    const postID            = req.params.id;
    const like              = req.body.like;      //int 
    const readedByUsername  = req.body.readByusername;
    const seenBy            = [];

    if (seenBy.includes(readedByUsername) == false) {
        
        const stringified = JSON.parse(seenBy);

       const sql    = `UPDATE posts
                       SET post_likes = post_likes + '${like}',
                       seen_by    = '${seen}'
                       WHERE post_ID  = '${postID}'`;

        db.query(sql, (error, result) => {
        if (error) return res.sendStatus(500);

        else {
            res.send('created')
        }
    })
}

    else {
        res.json({ error: 'Allready liked post'})
    }

}
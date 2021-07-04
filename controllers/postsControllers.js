const e = require('express');
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
// this inserts a like in the Bridge sql table 
    const postID        = req.params.id;
    const employeeID    = req.body.employeeID;
    const sql           = `INSERT INTO likes
                           VALUES (1 , ${employeeID}, ${postID})`;

    db.query(sql, (error, result) =>{
        if (error) {
            throw error;
        }

        else {
            res.send(result);
        }
    })
}

exports.getPost = (req, res, next) => {
    const postID = req.params.id;
    const sql = `
    SELECT posts.post_ID, posts.post_title, posts.post_subtitle, posts.post_content, employees.emp_username 
    FROM posts
    INNER JOIN employees 
    ON posts.emp_ID = employees.emp_ID
    WHERE
    posts.post_ID = '${postID}'

    `;

    db.query(sql, (error, result) =>{
    if (error) throw error;
    res.send(result)
})
}

exports.getAllPosts = (req, res, next) => {
    const sql = `
    SELECT posts.post_ID, posts.post_title, posts.post_subtitle, posts.post_content, employees.emp_username 
    FROM posts
    INNER JOIN employees 
    ON posts.emp_ID = employees.emp_ID
    `

    db.query(sql, (error, result) =>{
        if (error) throw error;
        res.send(result)
    })
}

// DELETE COMMENT


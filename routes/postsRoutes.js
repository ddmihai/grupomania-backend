const express           =               require('express');
const router            =               express.Router();
const postsController   =               require('../controllers/postsControllers');

const auth              =               require('../middleware/jwt');
const validatePost      =               require('../middleware/validatePost');


// post operations
router.post('/create/post',         auth, postsController.createPost);
router.delete('/delete/post/:id',   auth, postsController.deletePost);
//router.post('/like/post/:id',       auth, postsController.likePost);
//router.get('/post/comments/',       auth, postsController.getPostComments);
router.get('/get/posts',            auth, postsController.getAllPosts);
router.get('/post/:id',             auth, validatePost, postsController.getPost);


module.exports = router;
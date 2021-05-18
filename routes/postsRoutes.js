const express =             require('express');
const router =              express.Router();
const postsController =     require('../controllers/postsControllers');

const auth = require('../middleware/jwt');

// post operations
router.post('/create/post',         auth, postsController.createPost);
router.post('/delete/post/:id',     auth, postsController.deletePost);
router.post('/like/post/:id',       auth, postsController.likePost);


module.exports = router;
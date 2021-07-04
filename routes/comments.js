const express =             require('express');
const router =              express.Router();
const commentsRouter =     require('../controllers/comments');

const auth          = require('../middleware/jwt');
const validatePost  = require('../middleware/validatePost');
// post operations
router.post('/create/comment/:id',          auth, commentsRouter.createPost);
router.delete('/delete/comment/:id',        auth, commentsRouter.deleteComment);
router.get('/get/comments/:id',             auth, commentsRouter.getPostComments);


module.exports = router;

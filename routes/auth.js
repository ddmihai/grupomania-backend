const express =             require('express');
const router =              express.Router();
const authController =      require('../controllers/auth');


// signup route and login
router.post('/signup', authController.signup);
router.post('/login', authController.login);


module.exports = router;
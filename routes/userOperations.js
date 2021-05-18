const express  =             require('express');
const router   =             express.Router();
const userOps  =             require('../controllers/userOperations');
const userEdit =             require('../controllers/userEdit');

// authorization
const auth     =             require('../middleware/jwt');
// Verify admin
const admin    =             require('../middleware/adminCheck');


router.get('/:id', auth,                    userOps.getUser);                                      //get a user                            using USERNAME
router.delete('/delete/:id', auth,          userOps.deleteUser);                             //delete a user                         using USERNAME
 

router.post('/status/:id', auth, admin, userEdit.editUser);                                  //change status of a user               using USERNAME



module.exports = router;

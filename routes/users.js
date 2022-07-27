const {Router, application} = require('express');
const{check} = require('express-validator');
const {validation} = require('../middleware/validations');

const router = Router();
const {getUsers, newUser, updateUser,deleteUser} = require('../controllers/users');
const { validateJWT } = require('../middleware/validation-jwt');

router.get('/',validateJWT,getUsers);
router.post('/', 
    [
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        validation
    ],

    newUser
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('rol', 'rol is required').not().isEmpty(),
        validation
    ],
    updateUser

);
router.delete('/:id',[validateJWT,deleteUser]);

// 62e00a11f72f72050d7bb363

module.exports = router;
const {Router} = require('express');
const router = Router();
const{check} = require('express-validator');
const {validation} = require('../middleware/validations');

const {login} = require('../controllers/auth')

router.post('/', 
    [
        check('email', 'email is required').isEmail(),
        check('password', 'password is required').not().isEmpty(),
        validation
    ],
    login
)


module.exports = router;
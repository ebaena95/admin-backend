const {Router, application} = require('express');
const{check} = require('express-validator');
const {validation} = require('../middleware/validations');

const router = Router();
const {getDoctors,newDoctor,deleteDoctor,updateDoctor} = require('../controllers/Doctor');
const { validateJWT } = require('../middleware/validation-jwt');

router.get('/',getDoctors);
router.post('/', 
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('hospital', 'valid hospital id is required').isMongoId(),
        validation
    ],
    newDoctor

    
);

router.put('/:id',
    [

    ],
    updateDoctor
    

);
router.delete('/:id',deleteDoctor);


module.exports = router;
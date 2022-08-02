const {Router, application} = require('express');
const{check} = require('express-validator');
const {validation} = require('../middleware/validations');
const {validateID} = require('../middleware/validateID');
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
        validateID,
        validateJWT,
        check('name', 'name of doctor is required').not().isEmpty(),
        validation
    ],
    updateDoctor
);
router.delete('/:id',[
    validateJWT,
    validateID 
],deleteDoctor);


module.exports = router;
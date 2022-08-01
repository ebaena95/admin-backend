const {Router, application} = require('express');
const{check} = require('express-validator');
const {validation} = require('../middleware/validations');
const {validateID} = require('../middleware/validateID');

const router = Router();
const {getHospitals,newHospital,deleteHospital,updateHospital} = require('../controllers/hospital');
const { validateJWT } = require('../middleware/validation-jwt');

router.get('/',getHospitals);
router.post('/', 
    [
        validateJWT,
        check('name', 'name of hospital is required').not().isEmpty(),
        validation
    ],
    newHospital
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'name of hospital is required').not().isEmpty(),
        validateID,
        validation
    ],
    updateHospital
);
router.delete('/:id',[
    validateJWT,
    validateID 
],deleteHospital);

// 62e00a11f72f72050d7bb363

module.exports = router;
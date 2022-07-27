const {Router, application} = require('express');
const{check} = require('express-validator');
const {validation} = require('../middleware/validations');

const router = Router();
const {getHospitals,newHospital,deleteHospital,updateHospital} = require('../controllers/hospital');
const { validateJWT } = require('../middleware/validation-jwt');

router.get('/',getHospitals);
router.post('/', 
    [
        

    ],
    newHospital

    
);

router.put('/:id',
    [

    ],
    updateHospital
    

);
router.delete('/:id',deleteHospital);

// 62e00a11f72f72050d7bb363

module.exports = router;
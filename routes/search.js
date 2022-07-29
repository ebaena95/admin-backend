const {Router} = require('express');

const router = Router();
const {searchAll,searchAllofCollection} = require('../controllers/search');
const { validateJWT } = require('../middleware/validation-jwt');

router.get('/:str',validateJWT,searchAll);
router.get('/colection/:table/:str',validateJWT,searchAllofCollection);


// 62e00a11f72f72050d7bb363

module.exports = router;
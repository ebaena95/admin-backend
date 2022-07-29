const {Router} = require('express');
const expressfileUpload = require('express-fileupload');

const router = Router();
const{fileupload, getImage} = require('../controllers/uploads')
const { validateJWT } = require('../middleware/validation-jwt');
router.use(expressfileUpload());

router.put('/:type/:id',validateJWT,fileupload);
router.get('/:type/:img', getImage);


// 62e00a11f72f72050d7bb363

module.exports = router;
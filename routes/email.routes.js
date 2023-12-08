const { Router } = require('express');
const { 
    verifyEmail, 
    startEmailVerification,
    getVerified
 } = require('../controllers/email.controller');

const router = Router();

router.get('/verifyEmail', verifyEmail);
router.get('/getVerified', getVerified);
router.post('/startEmailVerification', startEmailVerification);

module.exports = router;
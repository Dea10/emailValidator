const { Router } = require('express');
const { verifyEmail, startEmailVerification } = require('../controllers/email.controller');

const router = Router();

router.get('/verifyEmail', verifyEmail);
router.post('/startEmailVerification', startEmailVerification);

module.exports = router;
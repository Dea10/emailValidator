const { Router } = require('express');
const { getUsers, registerUser, deactivateUser } = require('../controllers/user.controller');

const router = Router();

router.get('/getUsers', getUsers);
router.post('/registerUser', registerUser);
router.post('/deactivateUser', deactivateUser);

module.exports = router;
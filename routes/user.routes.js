const { Router } = require('express');
const { getUsers, registerUser } = require('../controllers/user.controller');

const router = Router();

router.get('/getUsers', getUsers);
router.post('/registerUser', registerUser);

module.exports = router;
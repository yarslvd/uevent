const express = require('express');
const auth = require('../controllers/auth-controller');

const router = express.Router();

router.post('/api/auth/register', auth.register);
// router.post('/api/auth/login', auth.login);
// router.post('/api/auth/logout', auth.logout);

module.exports = router;
const express = require('express');
const auth = require('../controllers/auth-controller');

const router = express.Router();

router.post('/api/auth/register', auth.register);
router.post('/api/auth/login', auth.login);
router.post('/api/auth/logout', auth.logout);
router.post('/api/auth/refresh', auth.refresh);

router.post('/api/auth/password-reset', auth.passwordReset);

router.post('/api/auth/password-reset/:confirm_token', auth.passwordResetConfirm);
router.get('/api/auth/email-confirm/:confirm_token', auth.emailConfirm)

module.exports = router;
const express = require('express');
const controller = require('../controllers/users-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

//  api/users/
router.get('/me', jwtMiddleware, controller.getMe)
router.get('/:id', controller.getOne)

module.exports = router;
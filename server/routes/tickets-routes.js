const express = require('express');
const controller = require('../controllers/tickets-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

//  api/tickets/
router.route('/')
    .post(jwtMiddleware, controller.create)
    .get(controller.get)

module.exports = router;
const express = require('express');
const controller = require('../controllers/tickets-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

//  api/tickets/
router.route('/')
    .post(jwtMiddleware, controller.create)
    .get(controller.get)

router.post('/unauthorized', controller.createUnauth);    
router.get('/user-tickets', jwtMiddleware, controller.getUserTickets);
router.get('/pdf', jwtMiddleware, controller.getPdf);

module.exports = router;
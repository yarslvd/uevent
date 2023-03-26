const express = require('express');
const controller = require('../controllers/events-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

//  api/events/
router.route('/')
    .post(jwtMiddleware, controller.create)
    .get(controller.getAll)
router.route('/:id')
    .get(controller.getOne)
    .patch(jwtMiddleware, controller.update)
    .delete(jwtMiddleware, controller.delete);


module.exports = router;
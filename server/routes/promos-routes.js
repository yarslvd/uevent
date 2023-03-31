const express = require('express');
const controller = require('../controllers/promos-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

//  api/promos/
router.route('/')
    .post(jwtMiddleware, controller.create)
    .post(controller.validate)
    .get(controller.getAll)
router.route('/:text')
    .get(controller.getOne)
    .patch(jwtMiddleware, controller.update)
    .delete(jwtMiddleware, controller.delete);


module.exports = router;
const express = require('express');
const controller = require('../controllers/promos-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

//  api/promos/
router.route('/')
    .post(jwtMiddleware, controller.create)
    .get(controller.getAll)
router.post('/validate', controller.validate)
router.route('/:text')
    .get(controller.getOne)
    .patch(jwtMiddleware, controller.update)
    .delete(jwtMiddleware, controller.delete);


module.exports = router;
const express = require('express');
const controller = require('../controllers/organizers-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

// api/organizers
router.route('/')
      // .post(jwtMiddleware, controller.create)
      .post(controller.create)
      .get(controller.getAll)
router.route('/:id')
      .get(controller.getOne)
      .patch(jwtMiddleware, controller.update)
      .delete(jwtMiddleware, controller.delete)

module.exports = router;
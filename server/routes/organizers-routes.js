const express = require('express');
const controller = require('../controllers/organizers-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

router.route('/')
      .post(jwtMiddleware, controller.create)
      .get(controller.getAll)
router.route('/:id')
      .get(controller.getOne)
      .patch(jwtMiddleware, controller.update)
      .delete(jwtMiddleware, controller.delete);

// 
// router.get('/organizers/:id/events')
// 

module.exports = router;
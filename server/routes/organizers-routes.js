const express = require('express');
const multer = require('multer');
const controller = require('../controllers/organizers-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

const upload = multer({
      dest: "./public/organizers/"
    });

// api/organizers
router.route('/')
      .post(jwtMiddleware, controller.create)
      .get(controller.getAll)
router.route('/:id')
      .get(controller.getOne)
      .patch(jwtMiddleware, controller.update)
      .delete(jwtMiddleware, controller.delete)
router.post('/:id/avatar', jwtMiddleware, upload.single("avatar"), controller.updateAvatar);

module.exports = router;
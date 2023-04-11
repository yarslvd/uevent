const express = require('express');
const controller = require('../controllers/events-controller');
const {jwtMiddleware} = require("../utils/jwt")

const multer = require('multer');

const upload = multer({
    dest: "./public/posters/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });
  

const router = express.Router();

//  api/events/
router.route('/')
    .post(jwtMiddleware, controller.create)
    .get(controller.getAll)
router.route('/upcoming')
router.route('/:id')
    .get(controller.getOne)
    .patch(jwtMiddleware, controller.update)
    .delete(jwtMiddleware, controller.delete);

router.post('/:id/poster', upload.single("poster"), controller.updatePoster);

module.exports = router;
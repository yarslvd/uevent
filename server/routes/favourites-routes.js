const express = require('express');
const subscription = require('../controllers/favourites-controller');
const {jwtMiddleware} = require("../utils/jwt");

const router = express.Router();

// /api/favourites/
router.post('/', jwtMiddleware, subscription.add);
router.get( '/', jwtMiddleware, subscription.getAll);
router.delete('/:event_id', jwtMiddleware, subscription.delete);
router.get( '/:event_id', jwtMiddleware, subscription.getOne);

module.exports = router;
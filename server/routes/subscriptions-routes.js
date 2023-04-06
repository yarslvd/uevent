const express = require('express');
const subscription = require('../controllers/subscription-controller');
const {jwtMiddleware} = require("../utils/jwt");

const router = express.Router();

// /api/subscriptions/
router.post('/', jwtMiddleware, subscription.subscribe);
router.delete('/:organizer_id', jwtMiddleware, subscription.unsubscribe);
router.get( '/', jwtMiddleware, subscription.get);

module.exports = router;
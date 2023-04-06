const express = require('express');
const controller = require('../controllers/payments-controller');
const {jwtMiddleware} = require("../utils/jwt")

const router = express.Router();

//  /api/payments/
router.post(controller.confirmPay); // for liqpay server
router.get('/:id', jwtMiddleware, controller.checkPayment);  

module.exports = router;
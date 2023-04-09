
const {uid} = require('uid');
const LiqPay = require("../libs/liqpay/liqpay");
const db = require('../models/db');

const liqpay = new LiqPay(process.env.LIQPAY_PUB, process.env.LIQPAY_PRIV);

async function createPayment(event, userId, count, redirect_url) {
  const order_id = 'order_id_' + uid();

  const paymentOptions = {
      'action'         : 'pay',
      'amount'         : event.price * count,
      'currency'       : event.iso_currency,
      'description'    : `uevent. ${event.title}. Payment for an event tickets`,
      'order_id'       : order_id,
      'version'        : '3',
      'result_url'     : redirect_url, 
      'server_url'     : process.env.HOST_URI + '/api/tickets/'+ order_id +'/confirm-pay'
  };
  const paymentObj = liqpay.cnb_object(paymentOptions);
  
  const payment = await db.payments.create({
      payer_id: userId,
      event_id: event.id,
      order_id: order_id,
      signature: paymentObj.signature,
      status: "pending",
      timestamp: Date.now()
  });

  paymentObj.orderId = payment.dataValues.order_id;
  paymentObj.paymentId = payment.dataValues.id;
  console.log(paymentObj);
  return paymentObj;
}

module.exports = {
  createPayment
}
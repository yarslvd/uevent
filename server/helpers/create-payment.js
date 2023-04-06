
const {uid} = require('uid');
const LiqPay = require("../libs/liqpay/liqpay");
const db = require('../models/db');

const liqpay = new LiqPay(process.env.LIQPAY_PUB, process.env.LIQPAY_PRIV);

async function createPayment(event, userId, count) {
  const uid_ = uid();

  const paymentOptions = {
      'action'         : 'pay',
      'amount'         : event.price * count,
      'currency'       : event.iso_currency,
      'description'    : `uevent. ${event.title}. Payment for an event tickets`,
      'order_id'       : 'order_id_' + uid_,
      'version'        : '3',
      'result_url'     : process.env.WEBCLIENT_URI + '/pay', // change /pay 
      'server_url'     : process.env.HOST_URI + '/api/events/'+ event.id +'/confirm-pay'
  };
  const paymentObj = liqpay.cnb_object(paymentOptions);
  
  const payment = await db.payments.create({
      payer_id: userId,
      order_id: 'order_id_'+uid_,
      signature: paymentObj.signature,
      status: "pending"
  });

  paymentObj.orderId = payment.dataValues.order_id;
  paymentObj.paymentId = payment.dataValues.id;
  console.log(paymentObj);
  return paymentObj;
}

module.exports = {
  createPayment
}
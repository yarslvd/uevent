const { StatusCodes } = require('http-status-codes');
const {uid} = require('uid');
const LiqPay = require("../libs/liqpay/liqpay");
const db = require('../models/db');

const liqpay = new LiqPay(process.env.LIQPAY_PUB, process.env.LIQPAY_PRIV);

const getPayment = async (req, res) => {
  const uid_ = uid();
  const id = req.params.id;
  const paymentOptions = {
      'action'         : 'pay',
      'amount'         : '1',
      'currency'       : 'USD',
      'description'    : 'description text',
      'order_id'       : 'order_id_' + uid_,
      'version'        : '3',
      'result_url'     : process.env.HOST_URI + '/pay',
      'server_url'     : process.env.HOST_URI + '/api/events/'+ id +'/confirm-pay'
  };
  const paymentObj = liqpay.cnb_object(paymentOptions);
  
  await db.payments.create({
      payer_id: req.user.id,
      order_id: 'order_id_'+uid_,
      signature: paymentObj.signature,
      status: "in progress"
  });

  res.json(paymentObj);
}

const confirmPay = (req, res) => {
  console.log("confirm-pay", req.body);
  const { data, signature } = req.body;
  const isValid = liqpay.str_to_sign(private_key + data + private_key) === signature;

  if (isValid) {
      const paymentInfo = JSON.parse(Buffer.from(data, 'base64').toString());

      // Далі ви можете виконати будь-які дії з отриманими даними платежу
      console.log(paymentInfo);
  }

  res.sendStatus(StatusCodes.OK);
}

const checkPayment = async (req,res) => {
  try{
      const paymentId = req.params.id;
      const payment = await db.payments.findByPk(paymentId);
      if(payment.status === 'success') {
        return res.status(StatusCodes.OK).json({
          status: payment.status,
          error: ""
        })
      }

      liqpay.api("request", {
          "action"   : "status",
          "version"  : "3",
          "order_id" : payment.order_id
      }, async (data) => {
        switch(data.status) {
          case "success": {
            await db.payments.update({status: "success"}, {where:{id: paymentId}, plain: true});

            return res.status(StatusCodes.OK).json({
              status: "success",
              error: ""
            })
          }
          case "processing":
          case "prepared":
            await db.payments.update({status: "pending"}, {where:{id: paymentId}, plain: true});

            return res.status(StatusCodes.OK).json({
              status: "pending",
              error: ""
            });
          default:
            await db.payments.update({status: "reverted"}, {where:{id: paymentId}, plain: true});
            return res.status(StatusCodes.OK).json({
              status: "reverted",
              error: data.err_description
            });
        }
      });
  }
  catch(error) {
      console.log("Some error while checking payment: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while checking payment: " + error.message
      });
  }
}

module.exports = {
  getPayment,
  confirmPay,
  checkPayment
}
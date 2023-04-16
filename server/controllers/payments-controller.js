const { StatusCodes } = require('http-status-codes');
const { Sequelize } = require('sequelize');
const {uid} = require('uid');
const { generateTicketPdf } = require('../helpers/generate-pdf');
const LiqPay = require("../libs/liqpay/liqpay");
const db = require('../models/db');
const { sendLetter } = require('../utils/nodemailer');

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

      
      console.log(paymentInfo);
  }

  res.sendStatus(StatusCodes.OK);
}

const checkPayment = async (req,res) => {
  try{
      const eventId = req.params.event_id;
      const payments = await db.payments.findAll({
        include: [
          {
            model: db.users,
            as: "payer",
            where: {
              id: req.user.id
            }
          },
          {
            model: db.events,
            as: "event",
            where: {
              id: eventId
            }
          }
        ],
      });
      
      
      let resultPayments = await checkPayments(payments);
      
      res.json({payments: resultPayments})
  }
  catch(error) {
      console.log("Some error while checking payment: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while checking payment: " + error.message
      });
  }
}

const checkPaymentUnauth = async (req, res) => {
  try{
    console.log("unauth");
    const eventId = req.params.event_id;
    const orderId = req.query.orderId;
    console.log({eventId, orderId});
    const payments = await db.payments.findAll({
      where: {order_id: orderId},
      include: [
        {
          model: db.events,
          as: "event",
          where: {
            id: eventId
          }
        }
      ],
    });
    
    console.log(payments);
    let resultPayments = await checkPayments(payments);

    res.json({payments: resultPayments})
  }
  catch(error) {
      console.log("Some error while checking payment: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while checking payment: " + error.message
      });
  }
}

const checkPayments = async (payments) => {
  let resultPayments = [];
  for (let payment of payments) {
    if(payment.status === 'success') {
      resultPayments.push({
        id: payment.id,
        status: "success"
      })
      continue;
    }
    let liqpayCheck = () => new Promise((resolve) => {
      liqpay.api("request", {
        "action"   : "status",
        "version"  : "3",
        "order_id" : payment.order_id
      }, async (data) => {
        console.log("check:", data);
        payment.error = data.err_description;
        switch(data.status) {
        case "success": {
          await db.payments.update({status: "success"}, {where:{id: payment.id}, plain: true});
          payment.status = "success"

          let event = await db.events.findByPk(payment.event_id);
          let userTickets = await db.tickets.findAll({
            where: {
              event_id: event.id,
              ...(payment.payer_id ? {user_id: payment.payer_id} : {payment_id: payment.id})
            }
          });

          let user = payment.payer_id ? await db.users.findByPk(payment.payer_id) : {username: payment.email.split("@")[0], first_name: "", last_name: "", email: payment.email}
          let pdf = await generateTicketPdf(user, event, userTickets.length);
          let options = {
            attachments: [
              {
                filename: "tickets.pdf",
                content: pdf,
                contentType: "application/pdf"
              }
            ]
          }
          sendLetter(payment.email, `uevent. Tickets for "${event.title}" event`, "", options);

          break;
        }
        case "processing":
        case "prepared":
          await db.payments.update({status: "pending"}, {where:{id: payment.id}, plain: true});
          payment.status = "pending";
          break;
        default:
          await db.payments.update({status: "reverted"}, {where:{id: payment.id}, plain: true});
          payment.status = "reverted"
          payment.error = data.err_description;
          let ticketsCount = await db.tickets.destroy({
            where: {
              payment_id: payment.id,
              event_id: payment.event_id
            }
          });
          await db.events.update({ticket_amount: Sequelize.literal(`ticket_amount + ${ticketsCount}`)}, {where:{id: payment.event_id}, plain: true});
        }
        resultPayments.push({
          id: payment.id,
          status: payment.status,
          error: payment.error
        })
        resolve();
      });
    }).catch((err) => {throw err})

    await liqpayCheck();
  }
  return resultPayments;
}

module.exports = {
  getPayment,
  confirmPay,
  checkPayment,
  checkPaymentUnauth
}
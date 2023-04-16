const { Sequelize } = require("sequelize");
const { checkPayment } = require("../helpers/check-payment");
const { generateTicketPdf } = require("../helpers/generate-pdf");
const { sendLetter } = require("../utils/nodemailer");

function startPaymentChecker(payments, users, events, tickets) {
  setInterval(async () => {
    console.log("check payment");
    const pendingPayments = await payments.findAll({
      where: {
        status: "pending"
      }
    })
    for (const payment of pendingPayments) {
      let result = await checkPayment(payment);
      
      if(result.status == 'success'){
        let event = await events.findByPk(payment.event_id);
        let userTickets = await tickets.findAll({
          where: {
            event_id: event.id,
            ...(payment.payer_id ? {user_id: payment.payer_id} : {payment_id: payment.id})
          }
        });
        console.log("rrrrr", {
          event_id: event.id,
          ...(payment.payer_id ? {user_id: payment.payer_id} : {payment_id: payment.id})
        });
        let user = payment.payer_id ? 
        await users.findByPk(payment.payer_id) 
        : 
        {username: payment.email.split("@")[0], first_name: "", last_name: "", email: payment.email}
        
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
      }
      if(result.status == 'reverted'){
        let ticketsCount = await tickets.destroy({
          where: {
            payment_id: payment.id,
            event_id: payment.event_id
          }
        });
        await events.update({ticket_amount: Sequelize.literal(`ticket_amount + ${ticketsCount}`)}, {where:{id: payment.event_id}, plain: true});
      }
      await payments.update({status: result.status}, {where:{id: payment.id}, plain: true});
    }
  }, 20000);
}

module.exports = {
  startPaymentChecker
}
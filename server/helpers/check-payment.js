const LiqPay = require("../libs/liqpay/liqpay");

const liqpay = new LiqPay(process.env.LIQPAY_PUB, process.env.LIQPAY_PRIV);

let checkPayment = (payment) => new Promise((resolve) => {
  liqpay.api("request", {
    "action"   : "status",
    "version"  : "3",
    "order_id" : payment.order_id
  }, async (data) => {
    console.log("check:", data);
    payment.error = data.err_description;
    switch(data.status) {
    case "success": {
      payment.status = "success"
      break;
    }
    case "processing":
    case "prepared":
      payment.status = "pending";
      break;
    default:
      if(data.code == "payment_not_found") {
        break;
      }
      payment.status = "reverted"
      payment.error = data.err_description;
    }
    
    resolve(
      payment
    );
  });
})

module.exports = {
  checkPayment
}
const db = require("../models/db");
const {StatusCodes} = require('http-status-codes');
const LiqPay = require("../libs/liqpay/liqpay");

const liqpay = new LiqPay(process.env.LIQPAY_PUB, process.env.LIQPAY_PRIV);

module.exports = function waitTx(status, orderId) {
    return new Promise((resolve, reject) => {
        let txStatus = status
        while (txStatus === status) {
            liqpay.api("request", {
                "action"   : "status",
                "version"  : "3",
                "order_id" : orderId
            }, async (data) => {
                switch(data.status) {
                    case "success":
                        txStatus = "success"
                        break
                    case "processing":
                        break
                    case "prepared":
                        break
                    default:
                        txStatus = "reverted"
                        break
                }
            });
        }
        resolve(txStatus);
    });
}
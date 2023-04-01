const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");
const {checkEventByUser} = require("./check-event-organizer");

async function checkPromoByUser(res, promoText, userId) {
    const promo = await db.promos.findByPk(promoText);
    if (promo === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "No promo with such text",
        });

        return null
    }

    let event = checkEventByUser(res, promo.dataValues.event_id, userId)
    if (event === null) {
        return null
    }

    return promo
}

module.exports = {
    checkPromoByUser,
}
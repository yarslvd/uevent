const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");

async function checkUserAndEvent(res, userId, eventId) {
    const user = await db.users.findByPk(userId);
    if (user === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No user with such id"
        })

        return null
    }

    const event = await db.events.findByPk(eventId)
    if (event === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No event with such id"
        })

        return null
    }

    return {
        user : user,
        event : event,
    }
}

module.exports = {
    checkUserAndEvent,
}
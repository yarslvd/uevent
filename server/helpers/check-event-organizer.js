const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");

async function checkEventByUser(res, eventId, userId) {
    const event = await db.events.findByPk(eventId);

    if (event === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "No event with such id",
        });

        return null
    }

    const organizer = await db.organizers.findByPk(event.organizer_id);
    if (organizer === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "No organizer with such id",
        });

        return null
    }

    if (organizer.user_id !== userId) {
        res.status(StatusCodes.FORBIDDEN).json({
            error: "You do not have access to this organizer for manipulating event",
        });

        return null
    }

    return event
}

module.exports = {
    checkEventByUser,
}
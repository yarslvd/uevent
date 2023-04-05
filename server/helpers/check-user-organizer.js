const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");

async function checkUserAndOrganizer(res, organizerId, userId) {
    const user = await db.users.findByPk(userId);
    if (user === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No user with such id"
        })

        return null
    }

    const organizer = await db.organizers.findByPk(organizerId)
    if (organizer === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No organizer with such id"
        })

        return null
    }

    return {
        user : user,
        organizer : organizer,
    }
}

module.exports = {
    checkUserAndOrganizer,
}
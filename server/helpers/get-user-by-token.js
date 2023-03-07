const {tokens, users} = require("../models/db");
const {StatusCodes} = require("http-status-codes");

async function getUserByToken(token, res) {
    const dbToken = await tokens.findByPk(token);

    if (dbToken === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No such token",
        })
        return null
    }

    let decodedToken = await decodeToken(dbToken)

    let user = users.findByPk(decodedToken.id)

    if (user === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No such user",
        })
        return null
    }

    return user
}

module.exports = {
    getUserByToken,
}
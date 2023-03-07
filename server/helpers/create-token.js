const {tokens} = require("../models/db");
const {StatusCodes} = require("http-status-codes");


async function createToken(token, res) {
    const [, isTokenCreated] = await tokens.findOrCreate({
        where: { token:token },
        defaults : {
            token: token,
        },
    })

    if (!isTokenCreated) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error : `Something strange happened`,
        });
        return null
    }

    return token
}

module.exports = {
    createToken,
}
const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");

async function checkCommentByUser(res, commentId, userId) {
    const comment = await db.comments.findByPk(commentId);
    if (comment === null) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "No such comment",
        });

        return null
    }

    if (comment.user_id !== userId) {
        res.status(StatusCodes.FORBIDDEN).json({
            error: "You do not have access to this comment",
        });

        return null
    }

    return comment
}

module.exports = {
    checkCommentByUser,
}
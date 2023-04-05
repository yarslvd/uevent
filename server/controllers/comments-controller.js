const {StatusCodes}  = require ('http-status-codes');
const {checkFields}  = require ("../helpers/object-fields");
const {processPagination} = require('../helpers/db-helper')
const {filterEventId} = require("../helpers/filters-orders")
const {createUrlParams} = require("../helpers/url-helpers")

const db = require('../models/db.js');
const {checkCommentByUser} = require("../helpers/check-coment-creator");

const getAll = async (req, res) => {
    try {
        let page = req.query.page ?? 0;
        let limit = req.query.limit ?? 15;
        page = Number(page);
        limit = Number(limit);

        let parametrs = Object.assign({},
            req.query.events ? {...filterEventId(req.query.events)} : {}
        );

        let url = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
        let path = req.originalUrl.split('?')[0] + createUrlParams(req.query)
        const comments = await processPagination(
            url, path, db.comments, limit, page, parametrs);

        return res.status(StatusCodes.OK).json({
            comments
        })
    }
    catch(error) {
        console.log("Some error while getting comments: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting comments: " + error.message
        });
    }
}

const getOne = async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await db.comments.findOne({
            where: {
                id : commentId
            }
        });

        return res.json ({
            comment
        });
    }
    catch(error) {
        console.log("Some error while getting comment: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting comment: " + error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const request = checkFields(req.body, ['event_id', 'comment'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let event = db.events.findByPk(request.event_id)
        if (event === null) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: `No event with id '${request.event_id}' to add comment`,
            });
        }

        const comment = await db.comments.create({
            event_id : request.event_id,
            user_id : req.user.id,
            comment : request.comment,
            parent_id : req.body.parent_id ? req.body.parent_id : null,
        });

        res.json({
            comment
        });
    }
    catch(error) {
        console.log("Some error while creating comment: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating comment: " + error.message
        });
    }
}

const update = async (req, res) => {
    try {
        const request = checkFields(req.body, ['comment'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        const commentId = req.params.id;

        let comment = checkCommentByUser(res, commentId, req.user.id)
        if (comment === null) {
            return null
        }


        await db.comments.update(request, {where: {id: commentId}, plain: true});

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while updating comment: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while updating comment: " + error.message
        });
    }
}

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

       let comment = checkCommentByUser(res, commentId, req.user.id)
        if (comment === null) {
            return null
        }

        await db.comments.destroy({where: {id: comment.dataValues.id}});

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while deleting comment: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while deleting comment: " + error.message
        });
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    delete: deleteComment,
}
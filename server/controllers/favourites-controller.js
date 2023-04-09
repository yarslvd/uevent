const db = require("../models/db");
const {checkFields} = require("../helpers/object-fields");
const {StatusCodes} = require("http-status-codes");
const {checkUserAndOrganizer} = require("../helpers/check-user-organizer");
const {createUrlParams} = require("../helpers/url-helpers");
const {processPagination} = require("../helpers/db-helper");
const {checkUserAndEvent} = require("../helpers/check-user-event");
const {filterUserId} = require("../helpers/filters-orders");


const add = async (req, res) => {
    try {
        console.log(req.body);
        const request = checkFields(req.body, [
            'event_id',
        ])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let result = await checkUserAndEvent(res, req.user.id, request.event_id);

        if (result === null) {
            return
        }

        //TODO: add some notifications
        const favourite = await db.favorites.create({
            event_id : result.event.dataValues.id,
            user_id : result.user.dataValues.id,
        });

        return res.status(StatusCodes.CREATED).json({
            favourite
        });
    }
    catch(error) {
        console.log("Some error while adding favourite: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while adding favourite: " + error.message
        });
    }
}

const remove = async (req, res) => {
    try {
        const eventId = req.params.event_id;

        let result = await checkUserAndEvent(res, req.user.id, eventId)
        if (result === null) {
            return
        }

        await db.favorites.destroy({
            where : {
                event_id: result.event.dataValues.id,
                user_id: result.user.dataValues.id,
            }
        });

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while removing favourite: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while removing favourite: " + error.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        let page = req.query.page ?? 0;
        let limit = req.query.limit ?? 15;
        page = Number(page);
        limit = Number(limit);

        let parameters = Object.assign({},
            {...filterUserId(req.user.id)},
            {
                ...{
                    include: [{
                        model: db.events,
                        as: 'event'
                    }]
                },
            },
        );

        let url = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
        let path = req.originalUrl.split('?')[0] + createUrlParams(req.query)
        const favourites = await processPagination(
            url, path, db.favorites, limit, page, parameters);

        return res.status(StatusCodes.OK).json({
            favourites
        })
    }
    catch(error) {
        console.log("Some error while getting favourites: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting favourites: " + error.message
        });
    }
}

const getOne = async (req, res) => {
    try {
        const eventId = req.params.event_id;

        let result = await checkUserAndEvent(res, req.user.id, eventId)
        if (result === null) {
            return
        }

        let favourite = await db.favorites.findOne({
            where : {
                event_id: result.event.dataValues.id,
                user_id: result.user.dataValues.id,
            }
        });

        return res.status(StatusCodes.OK).json({
            favourite
        });
    }
    catch(error) {
        console.log("Some error while getting favourite: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting favourite: " + error.message
        });
    }
}

module.exports = {
    add,
    delete : remove,
    getAll,
    getOne,
}

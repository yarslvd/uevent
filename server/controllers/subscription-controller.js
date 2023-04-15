const db = require("../models/db");
const {checkFields} = require("../helpers/object-fields");
const {StatusCodes} = require("http-status-codes");
const {checkUserAndEvent} = require("../helpers/check-user-event");
const {response} = require("express");
const {checkUserAndOrganizer} = require("../helpers/check-user-organizer");
const {filterEventId, filterUserId} = require("../helpers/filters-orders");
const {createUrlParams} = require("../helpers/url-helpers");
const {processPagination} = require("../helpers/db-helper");


const subscribe = async (req, res) => {
    try {
        const request = checkFields(req.body, [
            'organizer_id',
        ])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let result = checkUserAndOrganizer(res, request.organizer_id, req.user.id)
        if (result === null) {
            return
        }

        //TODO: add some notifications
        const subscription = await db.subscriptions.create({
            organizer_id : result.organizer.dataValues.id,
            user_id : result.user.dataValues.id,
        });

        return res.status(StatusCodes.CREATED).json({
            subscription
        });
    }
    catch(error) {
        console.log("Some error while subscribing: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while subscribing: " + error.message
        });
    }
}

const unsubscribe = async (req, res) => {
    try {
        const organizerId = req.params.organizer_id;

        let result = await checkUserAndOrganizer(res, organizerId, req.user.id)
        if (result === null) {
            return
        }

        await db.subscriptions.destroy({
            where : {
                organizer_id: result.organizer.dataValues.id,
                user_id: result.user.dataValues.id,
            }
        });

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while unsubscribing: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while unsubscribing: " + error.message
        });
    }
}

const get = async (req, res) => {
    try {
        let page = req.query.page ?? 0;
        let limit = req.query.limit ?? 1;
        page = Number(page);
        limit = Number(limit);

        let parameters = Object.assign({},
            {...filterUserId(req.user.id)},
            {
                    ...{
                        include: [{
                            model: db.organizers,
                            as: 'organizer'
                        }]
                    },
            },
        );

        let url = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
        let path = req.originalUrl.split('?')[0] + createUrlParams(req.query)
        const subscriptions = await processPagination(
            url, path, db.subscriptions, limit, page, parameters);

        return res.status(StatusCodes.OK).json({
            subscriptions
        })
    }
    catch(error) {
        console.log("Some error while getting subscription: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting subscription: " + error.message
        });
    }
}

const getOne = async (req, res) => {
    try {
        const request = checkFields(req.query, [
            'organizer_id', 'user_id'
        ])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        const subscription = await db.subscriptions.findOne({
            where: {
                organizer_id : request.organizer_id,
                user_id : request.user_id,
            },
            include: [
                {
                    model: db.organizers,
                    as: 'organizer',
                    attributes: ['id', 'name', 'description', 'email', 'user_id']
                },
            ]
        });

        console.log(subscription);
        console.log('----------------------------------------------------------------------')

        return res.status(StatusCodes.OK).json({
            subscription
        })
    }
    catch(error) {
        console.log("Some error while getting subscription: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting subscription: " + error.message
        });
    }
}

module.exports = {
    subscribe,
    unsubscribe,
    get,
    getOne,
}

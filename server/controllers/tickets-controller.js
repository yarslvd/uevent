const {checkFields} = require("../helpers/object-fields");
const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");
const {Op} = require("sequelize");
const {checkUserAndEvent} = require("../helpers/check-user-event");
const { createPayment } = require("../helpers/create-payment");
const {waitTx} = require("../helpers/wait-tx");

const create = async (req, res) => {
    try {
        const request = checkFields(req.body, [
            'event_id',
            'count'
        ])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let result = await checkUserAndEvent(res, req.user.id, request.event_id)
        if (result === null) {
            return
        }

        if (result.event.dataValues.ticket_amount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error : "Tickets are out of stock"
            })
        }

        let event = await db.events.findByPk(request.event_id);
        if (event.dataValues.ticket_amount - request.count < 0) {
            return res.status(StatusCodes.FORBIDDEN).json({
                error : "Not enough tickets on sale"
            })
        }

        const paymentObj = await createPayment(event, req.user.id, request.count);

        const paymentStatus = await waitTx("pending", paymentObj.orderId)
        if (paymentStatus === "reverted") {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error : "Failed to make transaction"
            })
        }

        event.dataValues.ticket_amount -= request.count;
        await db.events.update(event.dataValues, {where: {id: event.dataValues.id}, plain: true})

        for (let i = 0; i < request.count; i++) {
            await db.tickets.create({
                event_id : request.event_id,
                user_id : req.user.id,
                payment_id: paymentObj.paymentId
            });
        }

        res.json(paymentObj);
    }
    catch(error) {
        console.log("Some error while creating ticket: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating ticket: " + error.message
        });
    }
}

const get = async (req, res) => {
    try {
        if (req.query.event_id === null) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let event = db.events.findByPk(req.query.event_id)
        if (event === null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "No such event to get ticket",
            });
        }

        if (event.dataValues.visibility === 'private') {
            if (req.query.user_id === null) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: "You are not allowed to see tickets",
                });
            }

            let user = await db.users.findByPk(req.query.user_id)
            if (user === null) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: "No such user to get tickets",
                });
            }

            let ticket = await db.tickets.findOne({
                where : {
                    [Op.and]: [
                        { event_id: event.id },
                        { user_id: user.id },
                    ]
                }
            })

            if (ticket === null) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: "You are not allowed to see tickets",
                });
            }
        }

        let tickets = await db.tickets.findAll({
                where: { event_id: req.query.event_id },
                include: [ {
                    model:db.users,
                    as: 'user'
                } ]
        })

        return res.json ({
            tickets
        });
    }
    catch(error) {
        console.log("Some error while getting tickets: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting tickets: " + error.message
        });
    }
}

const getTicketsByPayment = async (req, res) => {
    // return pdf
}

module.exports = {
    get,
    create,
}

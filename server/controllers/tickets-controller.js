const {checkFields} = require("../helpers/object-fields");
const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");
const {Op} = require("sequelize");

//TODO: We need to add payment information here, maybe to save payment sig?
const create = async (req, res) => {
    try {
        const request = checkFields(req.body, [
            'event_id',
            'signature',
        ])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        const user = await db.organizers.findByPk(req.user.id);
        if (user === null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error : "No user with such id"
            })
        }

        const event = await db.events.findByPk(request.event_id)
        if (event === null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error : "No event with such id"
            })
        }

        const ticket = await db.tickets.create({
            event_id : request.event_id,
            user_id : req.user.id,
        });

        await db.payments.create({
            signature : request.signature,
        });

        res.json({
            ticket
        });
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

        if (event.dataValues.visability === 'private') {
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
                        { event_id: event.dataValues.id },
                        { user_id: user.dataValues.id },
                    ]
                }
            })

            if (ticket === null) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: "You are not allowed to see tickets",
                });
            }
        }

        //TODO: test this govno
        let tickets = await db.tickets.findAll({
                where: { event_id: req.query.event_id },
                include: [ db.users ]
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

module.exports = {
    get,
    create,
}

const fs = require('fs');
const {checkFields} = require("../helpers/object-fields");
const {StatusCodes} = require("http-status-codes");
const db = require("../models/db");
const {Op, Sequelize} = require("sequelize");
const {checkUserAndEvent} = require("../helpers/check-user-event");
const { createPayment } = require("../helpers/create-payment");
const {waitTx} = require("../helpers/wait-tx");
const { createUrlParams } = require("../helpers/url-helpers");
const { processPagination } = require("../helpers/db-helper");
const { generatePdf, generateTicketPdf } = require("../helpers/generate-pdf");
const { sequelize } = require('../models/db');


const create = async (req, res) => {
    try {
        console.log("tickets controller/create:", req.body);
        const request = checkFields(req.body, [
            'event_id',
            'count',
            'redirect_url'
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

        let price = event.price;
        if (req.body.promo && req.body.promo.length > 0) {
            let promo = await db.promos.findByPk(req.body.promo);
            if (!promo || promo.event_id != event.id) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    error: "No such promo"
                })
            }
            price *= (1 - +promo.discount/100)
        }
        
        const paymentObj = await createPayment(event, req.user.id, request.count, price, request.redirect_url, req.user.email);
    
        // const paymentStatus = await waitTx("pending", paymentObj.orderId)
        // if (paymentStatus === "reverted") {
        //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //         error : "Failed to make transaction"
        //     })
        // }

        event.dataValues.ticket_amount -= request.count;
        await db.events.update(event.dataValues, {where: {id: event.dataValues.id}, plain: true})

        const can_show = req.body.hasOwnProperty("can_show") ? Boolean(req.body.can_show) : true;
        console.log({request});
        for (let i = 0; i < request.count; i++) {
            await db.tickets.create({
                event_id : request.event_id,
                user_id : req.user.id,
                payment_id: paymentObj.paymentId,
                can_show: can_show
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

const createUnauth = async (req, res) => {
    try {
        console.log(req.body)
        const request = checkFields(req.body, [
            'event_id',
            'email',
            'count',
            'redirect_url'
        ])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let event = await db.events.findByPk(request.event_id);
        if (!event) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error : "No such event"
            })
        }

        if (event.ticket_amount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error : "Tickets are out of stock"
            })
        }

        if (event.dataValues.ticket_amount - request.count < 0) {
            return res.status(StatusCodes.FORBIDDEN).json({
                error : "Not enough tickets on sale"
            })
        }

        let price = event.price;
        if (req.body.promo && req.body.promo.length > 0) {
            let promo = await db.promos.findByPk(req.body.promo);
            if (!promo || promo.event_id != event.id) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    error: "No such promo"
                })
            }
            price *= (1 - +promo.discount/100)
        }
        
        const existUser = await db.users.findOne({where: {email: request.email}});
        const userId = existUser ? existUser.id : null;
        const paymentObj = await createPayment(event, userId, request.count, price, request.redirect_url, request.email);
    
        // const paymentStatus = await waitTx("pending", paymentObj.orderId)
        // if (paymentStatus === "reverted") {
        //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //         error : "Failed to make transaction"
        //     })
        // }

        event.dataValues.ticket_amount -= request.count;
        await db.events.update(event.dataValues, {where: {id: event.dataValues.id}, plain: true})
        
        for (let i = 0; i < request.count; i++) {
            await db.tickets.create({
                user_id: userId,
                event_id : request.event_id,
                payment_id: paymentObj.paymentId,
                can_show: false
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

        let event = await db.events.findByPk(req.query.event_id)
        if (!event) {
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
            attributes: ["user_id", "can_show", "event_id"],
            where: { event_id: req.query.event_id, can_show: true },
            include: [ {
                model:db.users,
                as: 'user',
                attributes: ['id', 'image', 'first_name', 'last_name', 'username', 'birthdate']
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


const getUserTickets = async (req, res) => {
    try {
        let page = req.query.page ?? 0;
        let limit = req.query.limit ?? 15;
        page = Number(page);
        limit = Number(limit);

        let parameters = {
            attributes: ["event_id",[Sequelize.fn("COUNT", "event_id"), "count"]],
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: db.events,
                    as: 'event',
                    required: true,
                    order: [[sequelize.col("tickets.id")]],
                }
            ],
            // raw:true,
            group: ["event_id", "event.id"],
        }

        const tickets = await db.tickets.findAll(parameters);
        // let url = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
        // let path = req.originalUrl.split('?')[0] + createUrlParams(req.query)
        // const tickets = await processPagination(url, path, db.tickets, limit, page, parameters);
        // console.log(tickets.rows)
        res.json({
            tickets
        })
    }
    catch(error) {
        console.log("Some error while getting tickets: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting tickets: " + error.message
        });
    }
}

const getPdf = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("getPDF")
        if (req.query.event_id === null) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let event = await db.events.findByPk(req.query.event_id)
        if (!event) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "No such event to get ticket",
            });
        }

        

        let tickets = await db.tickets.findAll({
            where: { event_id: req.query.event_id, user_id: userId },
            include: [ {
                model:db.users,
                as: 'user',
                attributes: ['id', 'image', 'first_name', 'last_name', 'username', 'birthdate']
            } ]
        })

        if (tickets.length == 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "User does not have tickets for this event",
            });
        }

        let userTickets = await db.tickets.findAll({
            where: {
                event_id: event.id,
                user_id: req.user.id
            }
        });

        let user = req.user;
        let pdf = await generateTicketPdf(user, event, userTickets.length);

        return res.status(StatusCodes.OK).contentType("application/pdf").send(pdf);
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
    createUnauth,
    getUserTickets,
    getPdf
}

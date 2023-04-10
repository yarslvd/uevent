const {StatusCodes}  = require ('http-status-codes');
const {checkFields, getDesiredFields}  = require ("../helpers/object-fields");
const {processPagination} = require('../helpers/db-helper')
const {filterEventId} = require("../helpers/filters-orders")
const {createUrlParams} = require("../helpers/url-helpers")

const db = require('../models/db.js');
const {text} = require("pg/lib/native/query");
const {checkPromoByUser} = require("../helpers/check-promo-creator");

const getAll = async (req, res) => {
    try {
        if (req.query.event_id === null) {
            return res.status(StatusCodes.BAD_REQUEST).json ({
                error : "You must provide event id"
            });
        }

        let promos = await db.promos.findAndCountAll({
            where : {
                event_id : req.query.event_id,
            }
        })

        res.json({
            promos
        })
    }
    catch(error) {
        console.log("Some error while getting promos: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting promos: " + error.message
        });
    }
}

const getOne = async (req, res) => {
    try {
        const promoText = req.params.text;

        const promo = await db.promos.findByPk(promoText);

        return res.json ({
            promo
        });
    }
    catch(error) {
        console.log("Some error while getting promo: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting promo: " + error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const request = checkFields(req.body, ['event_id', 'text', 'discount', 'valid_till'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        let event = db.events.findByPk(request.event_id)
        if (event === null) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: `No event with id '${request.event_id}' to add promo`,
            });
        }

        const promo = await db.promos.create({
            event_id : request.event_id,
            text : request.text,
            discount : request.discount,
            valid_till : request.valid_till,
        });

        res.json({
            promo
        });
    }
    catch(error) {
        console.log("Some error while creating promo: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating promo: " + error.message
        });
    }
}

const update = async (req, res) => {
    try {
        const promoText = req.params.text;

        let promo = checkPromoByUser(res, promoText, req.user.id)
        if (promo === null) {
            return null
        }

        let toUpdate = getDesiredFields(req.body, [
            'event_id',
            'text',
            'discount'
        ])

        await db.promos.update(toUpdate, {where: {text: promoText}, plain: true});

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while updating promo: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while updating promo: " + error.message
        });
    }
}

const deletePromo = async (req, res) => {
    try {
        const promoText = req.params.text;

        let promo = await checkPromoByUser(res, promoText, req.user.id)
        if (promo === null) {
            return null
        }
        
        await db.promos.destroy({where: {text: promoText}});

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while deleting promo: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while deleting promo: " + error.message
        });
    }
}

const validate = async (req, res) => {
    try {
        const request = checkFields(req.body, ['promo_text', 'event_id'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        if (request.promo_text.length > 10) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Promo must be valid format",
            });
        }

        const promo = await db.promos.findByPk(request.promo_text);
        if (promo === null) {
            return res.status(StatusCodes.NOT_FOUND).json ({
                error : "No such promo"
            })
        }

        if (promo.event_id !== request.event_id) {
            return res.status(StatusCodes.BAD_REQUEST).json ({
                error : "Promo is wrong"
            })
        }

        let event = await db.events.findByPk(request.event_id)
        if (event === null) {
            return res.status(StatusCodes.BAD_REQUEST).json ({
                error : "Wrong promo event"
            })
        }

        if (new Date().getTime() < new Date(promo.valid_till).getTime()) {
            return res.status(StatusCodes.BAD_REQUEST).json ({
                error : "Promo is expired"
            })
        }


        return res.json ({
            promo
        });
    }
    catch(error) {
        console.log("Some error while getting promo: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting promo: " + error.message
        });
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    delete: deletePromo,
    validate,
}
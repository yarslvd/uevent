const fs = require('fs');
const path = require('path');
const {checkFields, getDesiredFields} = require("../helpers/object-fields");
const {StatusCodes} = require("http-status-codes");
const db = require("../models/db"); 
const {checkEventByUser} = require("../helpers/check-event-organizer");
const {filterDateBetween, filterPriceBetween, filterOrganizerId} = require("../helpers/filters-orders");
const {processPagination} = require("../helpers/db-helper");
const {createUrlParams} = require("../helpers/url-helpers");
const {uid} = require('uid');

const LiqPay = require("../libs/liqpay/liqpay")

const public_key = "sandbox_i21219449436";
const private_key = "sandbox_AUXlhjhdWqj9lmS7f4vC3g1OdDaoBlHwIXwxxAad";

const liqpay = new LiqPay(public_key, private_key);

const { ImgurClient } = require('imgur'); 

const imgurClient = new ImgurClient({ clientId: process.env.IMGUR_ID });

const create = async (req, res) => {
    try {
        const request = checkFields(req.body, [
            'title',
            'description',
            'price',
            'iso_currency',
            'address',
            'location',
            'date',
            'publish_date',
            'organizer_id',
            'ticket_amount',
            'visability'
        ])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        const organizer = await db.organizers.findByPk(request.organizer_id);

        if (organizer === null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error : "No organizer with such id"
            })
        }

        const currencyRegex = /^[A-Z]{3}$/;

        if (!currencyRegex.test(request.iso_currency)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: `Wrong iso currency code '${request.iso_currency}'`,
            });
        }

        if (request.visability !== 'private' && request.visability !== 'public') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Wrong visability (only `private` or `public`)",
            });
        }

        const point = {
            type: 'Point',
            coordinates: request.location, // GeoJson format: [lng, lat]
        };

        const event = await db.events.create({
            poster : req.body.poster,
            title : request.title,
            description : request.description,
            price : request.price,
            iso_currency : request.iso_currency,
            address : request.address,
            location : point,
            date : request.date,
            publish_date : request.publish_date,
            organizer_id : request.organizer_id,
            ticket_amount : request.ticket_amount,
            visability : request.visability,
        });

        res.json({event});
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

const update = async (req, res) => {
    try {
        const eventId = req.params.id;

        let event = await checkEventByUser(res, eventId, req.user.id)
        if (event === null) {
            return
        }

        //we can give ability all fields except `organizer_id`
        let toUpdate = getDesiredFields(req.body, [
            'title',
            'description',
            'price',
            'iso_currency',
            'address',
            'location',
            'date',
            'publish_date',
            'ticket_amount',
            'visability'
        ])

        await db.events.update(toUpdate, {where: { id: event.dataValues.id}, plain: true });

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while updating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while updating event: " + error.message
        });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        let event = await checkEventByUser(res, eventId, req.user.id)
        if (event === null) {
            return
        }

        await db.events.destroy({where: {id: event.dataValues.id}});

        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch(error) {
        console.log("Some error while deleting event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while deleting event: " + error.message
        });
    }
}

const getOne = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await db.events.findByPk(eventId);
        if (event === null) {
            return res.status(StatusCodes.NOT_FOUND).json ({
                error : "No event with id " + eventId,
            });
        }

        return res.json ({
            event
        });
    }
    catch(error) {
        console.log("Some error while getting event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting event: " + error.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        let page = req.query.page ?? 0;
        let limit = req.query.limit ?? 15;
        page = Number(page);
        limit = Number(limit);
        console.log(req.query.organizers)
        let parameters = Object.assign({},
            req.query.organizers ? {...filterOrganizerId(req.query.organizers)} : {},
            req.query.date_between ? {...filterDateBetween(req.query.date_between.from, req.query.date_between.to)} : {},
            req.query.price_between ? {...filterPriceBetween(req.query.price_between.from, req.query.price_between.to)} : {},
        );

        let url = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
        let path = req.originalUrl.split('?')[0] + createUrlParams(req.query)
        const events = await processPagination(url, path, db.events, limit, page, parameters);

        res.json({
            events
        })
    }
    catch(error) {
        console.log("Some error while getting events: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while getting events: " + error.message
        });
    }
}

const getPayForm = async (req, res) => {
    const uid_ = uid();
    const id = req.body.id;
    const payObj = {
        'action'         : 'pay',
        'amount'         : '1',
        'currency'       : 'USD',
        'description'    : 'description text',
        'order_id'       : 'order_id_' + uid_,
        'version'        : '3',
        'result_url'     : process.env.HOST_URI + '/pay',
        'server_url'     : process.env.HOST_URI + '/api/events/'+ id +'/confirm-pay'
    };
    
    const signature = liqpay.cnb_signature(payObj);
    await db.payments.create({
        payer_id: req.user.id,
        signature: signature,
        status: "in progress"
    });

    res.json({html: liqpay.cnb_form(payObj).toString()});
}

const confirmPay = (req, res) => {
    console.log("confirm-pay", req.body);
    const { data, signature } = req.body;
    const isValid = liqpay.str_to_sign(private_key + data + private_key) === signature;

    if (isValid) {
        const paymentInfo = JSON.parse(Buffer.from(data, 'base64').toString());

        // Далі ви можете виконати будь-які дії з отриманими даними платежу
        console.log(paymentInfo);
    }

    res.sendStatus(StatusCodes.OK);
}

const updatePoster = async (req,res) => {
    try{
        console.log(req.file);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../public/posters/" + req.params.id + path.extname(req.file.originalname));

        fs.renameSync(tempPath, targetPath);
        
        const response = await imgurClient.upload({
            image: fs.createReadStream(targetPath),
            type: 'stream',
        });
        console.log(response.data);

        await db.events.update({poster: response.data.link}, {where: { id: req.params.id}, plain: true });

        res.sendStatus(StatusCodes.OK);
    }
    catch(error) {
        console.log("Some error while updating events poster: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while updating events poster: " + error.message
        });
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    delete: deleteEvent,
    getPayForm,
    confirmPay,
    updatePoster
}

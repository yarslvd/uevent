const {StatusCodes}  = require ('http-status-codes');
const {checkFields}  = require ("../helpers/object-fields");

const {processPagination} = require('../helpers/db-helper')
const {filterOrganizerName} = require("../helpers/filters-orders")
const {createUrlParams} = require("../helpers/url-helpers")

const db = require('../models/db.js');

const getAll = async (req, res) => {
  try {
    let page = req.query.page ?? 0;
    let limit = req.query.limit ?? 15;
    page = Number(page);
    limit = Number(limit);

    let parametrs = Object.assign({},
        // req.query.byLikes ? { ...byLikes('posts', req.query.byLikes) } : {},
        req.query.name ? {...filterOrganizerName(req.query.name)} : {}
    );

    let url = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
    let path = req.originalUrl.split('?')[0] + createUrlParams(req.query)
    const organizers = await processPagination(
        url, path, db.organizers, limit, page, parametrs);

    res.json({
      organizers
    })
  }
  catch(error) {
      console.log("Some error while getting organizers: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while getting organizers: " + error.message
      });
  }
}

const getOne = async (req, res) => {
  try {
    const organizerId = req.params.id;

    const organizer = await db.organizers.findOne({
        where: { 
            id : organizerId
        } 
    });
    
    return res.json ({
        organizer
    });
  }
  catch(error) {
      console.log("Some error while getting organizer: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while getting organizer: " + error.message
      });
  }
}

const create = async (req, res) => {
  try {
    const request = checkFields(req.body, ['name', 'email', 'description'])
    if (!request) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Some fields are missed",
        });
    }

    const organizer = await db.organizers.create({
        name : request.name,
        email : request.email,
        user_id: req.user.id,
        description : request.description,
    });

    res.json({organizer});
  }
  catch(error) {
      console.log("Some error while creating organizer: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while creating organizer: " + error.message
      });
  }
}

const update = async (req, res) => {
  try {
    const request = checkFields(req.body, ['name', 'email'])
    if (!request) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Some fields are missed",
        });
    }

    const organizerId = req.params.id;

    const organizer = await db.organizers.findOne({where: {id: organizerId}});

    if (organizer.user_id !== req.user.id) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error: "You do not have access to this organizer",
      });
    }

    await db.organizers.update(request, {where: {id: organizerId}, plain: true});
    
    return res.status(StatusCodes.NO_CONTENT).send();
  }
  catch(error) {
      console.log("Some error while updating organizer: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while updating organizer: " + error.message
      });
  }
}


const deleteOrganizer = async (req, res) => {
  try {
    const organizerId = req.params.id;

    const organizer = await db.organizers.findOne({where: {id: organizerId}});

    if (organizer.user_id != req.user.id) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: "You do not have access to this organizer",
    });
  }

   await db.organizers.destroy({where: {id: organizerId}});

   return res.status(StatusCodes.NO_CONTENT).send();
  }
  catch(error) {
      console.log("Some error while deleting organizer: ", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
          error : "Some error while deleting organizer: " + error.message
      });
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  delete: deleteOrganizer
}

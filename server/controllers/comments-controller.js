const {StatusCodes}  = require ('http-status-codes');
const {checkFields}  = require ("../helpers/object-fields");
const {processPagination} = require('../helpers/db-helper')
const {filterOrganizerName} = require("../helpers/filters-orders")
const {createUrlParams} = require("../helpers/url-helpers")

const db = require('../models/db.js');
const {QueryTypes} = require("sequelize");

const getAll = async (req, res) => {
    try {
        // let page = req.query.page ?? 0;
        // let limit = req.query.limit ?? 15;
        // page = Number(page);
        // limit = Number(limit);
        //
        // let parametrs = Object.assign({},
        //     // req.query.byLikes ? { ...byLikes('posts', req.query.byLikes) } : {},
        //     req.query.name ? {...filterOrganizerName(req.query.name)} : {}
        // );
        //
        // let url = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`
        // let path = req.originalUrl.split('?')[0] + createUrlParams(req.query)
        // const organizers = await processPagination(
        //     url, path, db.organizers, limit, page, parametrs);

        let comments = await db.sequelize.query(`
            WITH RECURSIVE nested_comments AS (
                SELECT id, event_id, user_id, comment, parent_id
                FROM comments
                WHERE parent_id IS NULL
                UNION ALL
                SELECT c.id, c.event_id, c.user_id, c.comment, c.parent_id
                FROM comments c
                         INNER JOIN nested_comments nc ON c.parent_id = nc.id
            )
            SELECT parent.id, child.* AS children
            FROM nested_comments parent
                     LEFT JOIN nested_comments child ON child.parent_id = parent.id
--             GROUP BY parent.id;
        `,{
            type: QueryTypes.SELECT,
        })

        res.json({
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


module.exports = {
    getAll,
    // getOne,
    // create,
    // update,
    // delete: deleteOrganizer
}







// WITH RECURSIVE nested_comments AS (
//     SELECT id, event_id, user_id, comment, parent_id
// FROM comments
// WHERE parent_id IS NULL
// UNION ALL
// SELECT c.id, c.event_id, c.user_id, c.comment, c.parent_id
// FROM comments c
// INNER JOIN nested_comments nc ON c.parent_id = nc.id
// )
// SELECT *
// FROM nested_comments
// ORDER BY id
// OFFSET 0 LIMIT 10;

// WITH RECURSIVE nested_comments AS (
//     SELECT id, event_id, user_id, comment, parent_id,
// FROM comments
// UNION
// SELECT nc.id, nc.event_id, nc.user_id, nc.comment, nc.parent_id,
// FROM
// nested_comments nc
// INNER JOIN comments s ON s.parent_id = nested_comments.parent_id
// ) SELECT
// *
// FROM
// comments;
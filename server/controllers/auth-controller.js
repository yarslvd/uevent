import {StatusCodes} from 'http-status-codes';
import {checkFields} from "../helpers/check-fields";
import {hashPassword} from "../helpers/bcrypt-helpers";
import {Op} from "sequelize";

const db = require('../models/db.js');
const register = async (req, res) => {
    try {
        const request = checkFields(req.body, ['login', 'email', 'password'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error : "Some fields are missed",
            });
        }

        //TODO: do we need extra validation (isEmail, isPhoneNumber etc.)?

        const [user, created] = await db.users.findOrCreate({
            where: {
                [Op.or]: [
                    { login : request.login },
                    { email : request.email },
                ]
            },
            defaults: {
                login : request.login,
                password : hashPassword(request.password),
                full_name : req.body.full_name ? req.body.full_name : "",
                email : request.email,
            }
        });

        if (!created) {
            let errMsg = '';
            if (request.login.toLowerCase() === user.dataValues.login.toLowerCase()) {
                errMsg += 'login';
            }
            if (request.email.toLowerCase() === user.dataValues.email.toLowerCase()) {
                if (errMsg.length !== 0) {
                    errMsg += ' and ';
                }
                errMsg += 'email';
            }

            return res.status(StatusCodes.BAD_REQUEST).json({
                error : `User with such ${errMsg} exists`,
            });
        }

        return res.status(StatusCodes.CREATED).json({
            error : null,
            user : created,
            email : result
        });
    }
    catch(error) {
        console.log("Some error while register: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while register: " + error.message
        });
    }
}

module.exports = {
    register,
}
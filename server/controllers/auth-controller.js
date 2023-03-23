const {StatusCodes}  = require ('http-status-codes');
const {checkFields}  = require ("../helpers/check-fields");
const {checkPassword, hashPassword}  = require ("../utils/bcrypt");
const {decodeToken, generateAccessToken, generateRefreshToken, verifyToken}  = require( "../utils/jwt");
const {Op}  = require( "sequelize");
const {getUserByToken}  = require ("../helpers/get-user-by-token");
const {createToken}  = require( "../helpers/create-token");
const {users}  = require( "../models/db");

const db = require('../models/db.js');
const sendLetter = require('../utils/nodemailer');

const register = async (req, res) => {
    try {
        const request = checkFields(req.body, ['username', 'email', 'password'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }
        //TODO: do we need extra validation (isEmail, isPhoneNumber etc.)?

        const [user, isUserCreated] = await db.users.findOrCreate({
            where: {
                [Op.or]: [
                    { username : request.username },
                    { email : request.email },
                ],
            },
            defaults: {
                username : request.username,
                email : request.email,
                password : hashPassword(request.password),
                first_name : req.body.first_name ? req.body.first_name : "",
                last_name : req.body.last_name ? req.body.last_name : "",
                birthdate : req.body.birthdate ? req.body.birthdate : null,
            }
        });

        if (!isUserCreated) {
            let errMsg = '';
            if (request.username.toLowerCase() === user.dataValues.username.toLowerCase()) {
                errMsg += 'username';
            }
            if (request.email.toLowerCase() === user.dataValues.email.toLowerCase()) {
                if (errMsg.length !== 0) {
                    errMsg += ' and ';
                }
                errMsg += 'email';
            }

            return res.status(StatusCodes.CONFLICT).json({
                error : `User with such ${errMsg} exists`,
            });
        }

        let token = generateRefreshToken(user.dataValues.id, user.dataValues.username, user.dataValues.email);
        const link = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/api/auth/email-confirm/${token}`;
        console.log("check 3");

        let dbToken = await createToken(token, res)
        if (dbToken === null) {
            return
        }

        let message = `
            <h2 style='font-size: 30px; font-family: Verdana , sans-serif; font-weight: 800; color:#3D405B'>weekly.</h2><br>
            <h1 style='font-size: 26px; font-family: Verdana;'>Email Confirmation</h1>
            <p>We just need one small favor from you - please confirm your email to continue.</p><br><br>
            <a href='${link}' target='_blank' style='outline:none; background-color:#3D405B; font-size: 16px; color: #fff;
            border: none; padding: 10px 40px; border-radius: 10px; margin: 10px 0;'>Confirm</a><br><br>
            <p>If the button don't work <a target='_blank' href='${link}'>Click here</a>.</p>
        `;
        sendLetter(user.dataValues.email, "Confirm email", message);

        return res.status(StatusCodes.CREATED).json({
            error : null,
            user : user,
        });
    }
    catch(error) {
        console.log("Some error while register: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while register: " + error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const request = checkFields(req.body, ['username', 'email', 'password'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        const user = await users.findOne({
            where: {
                username : request.username,
                email : request.email
            }
        });

        if (user === null) {
            res.status(StatusCodes.NOT_FOUND).json({
                error : "No such user"
            })

            return
        }

        const isCorrectPass = await checkPassword(request.password, user.dataValues.password);

        if (!isCorrectPass) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error : "Wrong password"
            })
        }

        const accessToken = generateAccessToken(user.dataValues.id, user.dataValues.login);
        const refreshToken = generateRefreshToken(user.dataValues.id, user.dataValues.login);

        let dbToken = await createToken(refreshToken, res)
        if (dbToken === null) {
            return
        }

        res.header("Authorization", `Bearer ${refreshToken}`);

        res.cookie("access_token", accessToken);
        res.cookie("refresh_token", refreshToken);

        return res.status(StatusCodes.OK).json ({
            error : null,
            access_token : accessToken,
            refresh_token : refreshToken,
        })
    }
    catch (error){
        console.log("Some error while login: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while login: " + error.message
        });
    }
};

const refresh = async (req, res) => {
    try {
        const request = checkFields(req.body, ['refresh_token'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Some fields are missed",
            });
        }

        const user = await verifyToken(request.refresh_token)
        if (user === null) {
            return
        }

        await db.tokens.destroy({
            where: {
                token: request.refresh_token,
            }
        });

        const accessToken = generateAccessToken(user.dataValues.id, user.dataValues.login);
        const refreshToken = generateRefreshToken(user.dataValues.id, user.dataValues.login);

        let dbToken = await createToken(refreshToken, res)
        if (dbToken === null) {
            return
        }

        res.header("Authorization", `Bearer ${refreshToken}`);

        res.cookie("access_token", accessToken);
        res.cookie("refresh_token", refreshToken);

        return res.status(StatusCodes.OK).json ({
            error : null,
            access_token : accessToken,
            refresh_token : refreshToken,
        })
    }
    catch (error){
        console.log("Some error while refresh: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while refresh: " + error.message
        });
    }
};

const logout = (req, res) => {
    if (!req.get("Authorization")) {
        return res.status(StatusCodes.UNAUTHORIZED).json ({
            error : 'User is not authorized'
        })
    }

    res.header("Authorization", "");
    res.sendStatus(StatusCodes.NO_CONTENT);
}
const emailConfirm = async (req, res) => {
    try {
        const token = req.params.confirm_token;
        let user = await getUserByToken(token, res)
        if (user === null) {
            return
        }

        await db.users.update({ confirmedEmail: true }, {
            where : {
                id: user.dataValues.id,
            }
        });
        
        await db.tokens.destroy({
            where: {
                token: token,
            }
        });
        
        user.confirmedEmail = true;

        return res.status(StatusCodes.OK).json ({
            error : null,
            user : user,
            message : "email was confirmed"
        });
    }
    catch (error){
        console.log("Some error while confirming email: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while confirming email: " + error.message
        });
    }
};


const passwordResetConfirm = async(req, res) => {
    try {
        const token = req.params.confirm_token;

        const request = checkFields(req.body, ['password'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error : "Some fields are missed",
            });
        }

        let user = await getUserByToken(token, res)
        if (user === null) {
            return
        }

        await db.users.update({ password: hashPassword(request.password) }, {
            where : {
                id: user.dataValues.id,
            }
        });

        await db.tokens.destroy({
            where: {
                token: token,
            }
        });

        return res.status(StatusCodes.OK).json ({
            error : null,
            message : "password was updated"
        });
    }
    catch (error){
        console.log("Some error while confirming reseted password: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while confirming reseted password: " + error.message
        });
    }
};

const passwordReset = async (req, res) => {
    try {
        const request = checkFields(req.body, ['email'])
        if (!request) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error : "Some fields are missed",
            });
        }

        const user = await db.users.findOne({
            where: {
                email : request.email
            }
        });

        if (user === null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error : "No user with such email",
            })
        }

        let token = generateRefreshToken(user.dataValues.id, user.dataValues.username, user.dataValues.email);
        const link = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/api/auth/password-reset/${token}`;

        let dbToken = await createToken(token, res)
        if (dbToken === null) {
            return
        }

        let message = `
            <h2 style='font-size: 30px; font-family: Verdana , sans-serif; font-weight: 800; color:#3D405B'>weekly.</h2><br>
            <h1 style='font-size: 26px; font-family: Verdana;'>Password Reset</h1>
            <p style='font-family: Verdana; '>Hello, ${req.body.email}. We have received a request to reset the password for your account.
            No changes have been made for your account yet. <b>If you did not request a password reset, ignore this message</b></p><br/>
            <p style='font-family: Verdana;'>Tap on the button to change password</p><br/>
            <a href='${link}' target='_blank' style='outline:none; background-color:#3D405B; font-size: 16px; color: #fff;
            border: none; padding: 10px 40px; border-radius: 10px; margin: 10px 0;'>Reset password</a><br><br>
            <p>If the button don't work <a target='_blank' href='${link}'>Click here</a>.</p>
        `;
        sendLetter(request.email, "Password Reset", message);

        return res.status(StatusCodes.ACCEPTED).json({
            error : null,
            message : "accepted reseting password"
        });

    }
    catch (error){
        console.log("Some error while reseting password: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while reseting password: " + error.message
        });
    }
};

module.exports = {
    register,
    login,
    logout,
    refresh,
    passwordReset,
    emailConfirm,
    passwordResetConfirm,
}

const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes');

const {users, tokens} = require('../models/db.js');

const generateAccessToken = (id, username, email) => {
    const payload = {
        username,
        id,
        email,
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE } );
};

const generateRefreshToken = (id, username, email) => {
    const payload = {
        id,
        username,
        email,
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE } );
};

const decodeToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

async function verifyToken(token) {
    let user = null

    tokens.findByPk(token)
        .then(token => {
            if (token == null) {
                return null
            }
        })
        .catch(err => {
            return null
        })

    user = await new Promise((res, rej) => jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        user = await users.findByPk(decoded.id)

        if (err || user == null) {
            rej(null);
        }

        res(user);
    }))

    // console.log(user);
    return user
}
async function jwtMiddleware(req, res, next) {
    try {
        if (!req.get("Authorization") && !req.cookies.access_token) {
            return res.status(StatusCodes.UNAUTHORIZED).json ({
                error : 'User is not authorized'
            })
        }

        const token = req.get("Authorization")?.split(" ")[1] || req.cookies.access_token;

        let user = await verifyToken(token)
        if (user == null) {
            return res.status(StatusCodes.UNAUTHORIZED).json ({
                error : 'Token is invalid'
            })
        }

        req.user = user;
        next();
    } catch(err) {
        console.log("jwt middleware", err)
        return res.status(StatusCodes.UNAUTHORIZED).json ({
            error : 'User is not authorized'
        })
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    jwtMiddleware,
    decodeToken,
}
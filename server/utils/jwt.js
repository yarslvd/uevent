const jwt = require("jsonwebtoken");
import {StatusCodes} from 'http-status-codes';

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
        username,
        id,
        email,
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE } );
};

const decodeToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

function verifyToken(token) {
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

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        user = await users.findByPk(decoded.id)
        if (err || user == null) {
            return null;
        }
    })

    return user
}
function jwtMiddleware(req, res, next) {
    try {
        if (!req.headers.get("Authorization")) {
            return res.status(StatusCodes.UNAUTHORIZED).json ({
                error : 'User is not authorized'
            })
        }

        const token = req.headers.get("Authorization").split(" ")[1];

        let user = verifyToken(token)
        if (user == null) {
            return res.status(StatusCodes.UNAUTHORIZED).json ({
                error : 'Token is invalid'
            })
        }

        req.user = user;
        next();
    } catch {
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
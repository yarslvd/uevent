const { StatusCodes } = require("http-status-codes");
const db = require("../models/db");

const getOne = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await db.users.findByPk(userId, {
        attributes: ['id', 'first_name', 'last_name', 'username', 'birthdate', 'email']
    });
    if (user === null) {
        return res.status(StatusCodes.NOT_FOUND).json ({
            error : "No user with id " + eventId,
        });
    }

    return res.json ({
        user
    });
}
catch(error) {
    console.log("Some error while getting user: ", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
        error : "Some error while getting user: " + error.message
    });
}
}

const getMe = (req, res) => {
    req.params.id = req.user.id;
    getOne(req, res);
    return;
}

module.exports = {
  getOne,
  getMe
}
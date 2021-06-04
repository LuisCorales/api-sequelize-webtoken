const jwt = require('jsonwebtoken');
const { User } = require('../db/models/index')

/** Verify if the user already exists */
exports.verifyIfUserExists = async (req, res, next) => {
    try{
        const users = await User.findAll({
            where: {
                username: req.body.username
            }
        });

        if(users.length > 0) {
            req.userExists = true;
            req.user = users;
            req.userPassword = users[0].password;
        } else {
            req.userExists = false;
        }

        next();
    } catch(e) {
        return res.sendStatus(401);
    }
};


/** Verify the token attached to the request */
exports.verifyToken = async (req, res, next) => {
    try{
        // Get the auth header value
        const bearerHeader = req.headers['authorization'];

        // Check if undefined
        if(typeof bearerHeader === 'undefined') {
            // Send 401 error: unauthorized
            throw new error;
        }

        // Asign the token to the request
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];

        jwt.verify(req.token, 'secretkey', (err) => {
            if(err) {
                throw err;
            }
        });

        req.userRole = jwt.decode(req.token, "secretkey").user[0].role;

        next();
    } catch(e) {
        return res.sendStatus(401);
    }
};
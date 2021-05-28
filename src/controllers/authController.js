const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../db/models/index')

/** To POST authorization route, login */
module.exports.post = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                username: req.body.username
            }
        });
    
        // If there are no users with the same username, throw error
        if(user.length < 1) {
            throw new Error;
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.sendStatus(401);
            }

            // If they are the same, create token
            if (result) {
                jwt.sign({user}, 'secretkey', (err, token) => {
                    if(err) {
                        throw err;
                    }
            
                    return res.status(200).json({
                        token
                    });
                });
            } else {
                return res.sendStatus(401);
            }
        });    
    } catch(e) {
        return res.sendStatus(401);
    }
}
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/** To POST authorization route, login */
module.exports.post = async (req, res) => {
    try {
        // If there are no users with the same username, throw error
        if(!req.userExists) {
            throw new Error;
        }

        bcrypt.compare(req.body.password, req.userPassword, (err, result) => {
            if (err) {
                return res.sendStatus(401);
            }

            const user = req.user;

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
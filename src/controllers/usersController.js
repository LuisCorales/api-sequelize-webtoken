const bcrypt = require('bcryptjs');
const { User } = require('../db/models/index');

/** To POST user route, signup or register */
module.exports.post = async (req, res) => {
    try{
        const users = await User.findAll({
            where: {
                username: req.body.username
            }
        });

        // If there is one user with same username, throw error
        if(users.length > 0) {
            throw new Error;
        }

        // TO DO: encrypt password before creating user
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if(err) {
                throw err;
            }

            const result = await User.create({
                username: req.body.username,
                password: hash
            });
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}
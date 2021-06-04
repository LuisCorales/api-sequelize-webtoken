const bcrypt = require('bcryptjs');
const { User } = require('../db/models/index');

/** To POST user route, signup or register */
module.exports.post = async (req, res) => {
    try{
        if(req.userExists) {
            throw new Error;
        }

        // TO DO: encrypt password before creating user
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if(err) {
                throw err;
            }

            const result = await User.create({
                username: req.body.username,
                password: hash,
                role: req.body.role
            });
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(401);
    }
}
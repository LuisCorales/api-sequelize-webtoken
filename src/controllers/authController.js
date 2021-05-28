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
        })

        console.log('Test1')
    
        // If there are no users with the same username, throw error
        if(user.length < 1) {
            throw new Error;
        }

        console.log('Test2')

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.sendStatus(401);
            }

            console.log('Test3')

            // If they are the same, create token
            if (result) {
                console.log('Test4')
                jwt.sign({user}, 'secretkey', (err, token) => {
                    if(err) {
                        throw err;
                    }
                    console.log('Test5')
            
                    return res.status(200).json({
                        token
                    })
                });
            } else {
                return res.sendStatus(401);
            }
        });    
    } catch(e) {
        return res.sendStatus(401);
    }
}
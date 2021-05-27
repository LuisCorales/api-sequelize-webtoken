const jwt = require('jsonwebtoken');

/** To POST users route */
module.exports.post = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    jwt.sign({user}, 'secretkey', (err, token) => {
        if(err) {
            return res.sendStatus(500);
        }

        return res.json({
            token
        })
    });
}
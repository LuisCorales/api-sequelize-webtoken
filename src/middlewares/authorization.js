const jwt = require('jsonwebtoken')

/** Verify the token attached to the request */
exports.verifyToken = (req, res, next) => {
    try{
        // Get the auth header value
        const bearerHeader = req.headers['authorization'];

        // Check if undefined
        if(typeof bearerHeader === 'undefined') {
            // Send 403 error: Forbidden
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

        next();
    } catch(e) {
        return res.sendStatus(403);
    }
};
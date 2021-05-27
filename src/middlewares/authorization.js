/** Verify the token attached to the request */
exports.verifyToken = (req, res, next) => {
    // Get the auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if undefined
    if(typeof bearerHeader === 'undefined') {
        // Send 403 error: Forbidden
        return res.sendStatus(403);
    }

    // Asign the token to the request
    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];
    next();
};
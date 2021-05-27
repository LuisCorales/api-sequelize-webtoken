const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authorization');
const jwt = require('jsonwebtoken')

const authorizationRoutes = require('./authorization')
const dashboardRoutes = require('./dashboard')

router.use("/auth", authorizationRoutes);
router.use("/dashboard", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            return res.sendStatus(403);
        }

        return res.json({
            authData
        });
    });
}, dashboardRoutes);

module.exports = router;
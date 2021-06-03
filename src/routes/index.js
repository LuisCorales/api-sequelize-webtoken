const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddlewares');

const authorizationRoutes = require('./authorization')
const dashboardRoutes = require('./dashboard')

router.use("/auth", authorizationRoutes);
router.use("/dashboard", verifyToken, dashboardRoutes);

module.exports = router;
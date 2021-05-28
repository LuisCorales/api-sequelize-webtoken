const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoute')
const usersRoutes = require("./usersRoute");

router.use("/", authRoutes);
router.use("/", usersRoutes);

module.exports = router;
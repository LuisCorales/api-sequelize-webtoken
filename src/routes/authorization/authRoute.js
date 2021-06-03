const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const {verifyIfUserExists} = require('../../middlewares/authMiddlewares');

router.post("/login", verifyIfUserExists, authController.post);

module.exports = router;
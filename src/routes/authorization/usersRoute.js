const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const {verifyIfUserExists} = require('../../middlewares/authMiddlewares');

router.post("/signup", verifyIfUserExists, usersController.post);

module.exports = router;
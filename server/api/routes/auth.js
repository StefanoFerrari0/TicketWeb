var express = require("express");
var router = express.Router();
var AuthController = require("../../controllers/auth");

//Login
router.post("/login", AuthController.loginUser);

//verifyToken
router.post("/verifyToken", AuthController.verifyToken);

module.exports = router;
var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/user");
var AuthController = require("../../controllers/auth");

const Middleware = require("../../middlewares/index");

//CreateUser
router.post("/", UserController.createUser);

router.post("/login", AuthController.loginUser);

//GetById
router.get("/:userId", UserController.getUserById);

//GetAll
router.get("/", UserController.getAllUsers);

//Edit
router.put("/edit/:userId", UserController.editUser);

//Delete
router.put("/delete/:userId", UserController.deleteUser);

module.exports = router;

var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/user");
const Middleware = require("../../middlewares/index");

//CreateUser
router.post("/", UserController.createUser);

//GetById
router.get("/:userId", UserController.getUserById);

//GetAll
router.get("/", UserController.getAllUsers);

//Edit
router.put("/edit/:userId", UserController.editUser);

//Delete
router.put(
  "/delete/:userId",
  Middleware.isRole("admin"),
  UserController.deleteUser
);

module.exports = router;

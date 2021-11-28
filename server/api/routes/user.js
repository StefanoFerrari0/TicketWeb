const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user");
const Middleware = require("../../middlewares/index");

//CreateUser
router.post("/", Middleware.isRole("admin"), UserController.createUser);

//GetById
router.get("/:userId", Middleware.isRole("admin"), UserController.getUserById);

//GetAll
router.get("/", Middleware.isRole("admin"), UserController.getAllUsers);

//Edit
router.put("/edit/:userId", UserController.editUser);

//Delete
router.put(
  "/delete/:userId",
  Middleware.isRole("admin"),
  UserController.deleteUser
);

module.exports = router;

const express = require("express");
const router = express.Router();
const RoleController = require("../../controllers/role");
const Middleware = require("../../middlewares/index");

//Create
router.post("/", Middleware.isRole("admin"), RoleController.createRole);

//GetById
router.get("/:roleId", Middleware.isRole("admin"), RoleController.getRoleById);

//GetAll
router.get("/", Middleware.isRole("admin"), RoleController.getAllRoles);

//Edit
router.put("/edit/:roleId", Middleware.isRole("admin"), RoleController.editRole);

//Delete
router.put("/delete/:roleId", Middleware.isRole("admin"), RoleController.deleteRole);

module.exports = router;
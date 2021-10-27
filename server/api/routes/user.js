var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/user");

//CreateUser
router.post("/", (req, res, next) => {
  const { email, password, roles } = req.body;

  UserController.createUser(email, password, roles);
  res.status(200).send({ ok: true });
});

//GetById
router.get("/:userId", (req, res, next) => {
  let userId = req.params.userId;

  const user = UserController.getUser(userId);
  res.status(200).send({ ok: true, user });

  /*  User.findbyId(userId, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({ message: `error al realizar la peticion: ${err}` });
    if (!user) return res.status(404).send({ message: `el usuario no existe` });

    res.status(200).send({ user });
  }); */
});

//GetAll
router.get("/", (req, res, next) => {
  const users = UserController.getAllUsers();
  res.status(200).send({ ok: true, users });
});

//Edit
router.put("/edit/:userId", (req, res, next) => {
  let data = req.body;

  UserController.editUser(data);
  res.status(200).send({ ok: true });
});

//DeleteById????
router.put("/delete/:userId", (req, res, next) => {
  let userId = req.params.userId;
  UserController.deleteUser(userId);
  res.status(200).send({ ok: true });
});

module.exports = router;

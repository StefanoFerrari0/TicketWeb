var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/user");

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
  let userId = req.params.userId;
  const users = UserController.getAllUsers(userId);
  res.status(200).send({ ok: true, users });
});

//DeleteById????
router.delete("/:userId", (req, res, next) => {
  let userId = req.params.userId;
  UserController.deleteUser(userId);
  res.status(200).send({ ok: true });
});

//Edit
router.put("/:userId", (req, res, next) => {
  let data = req.body;

  UserController.editUser(data);
  res.status(200).send({ ok: true });
});

//CreateUser

router.post("/", (req, res, next) => {
  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.roles = req.body.roles;

  UserController.createUser(user);
  res.status(200).send({ ok: true });
});

module.exports = router;

var mongoose = require("mongoose");
var User = require("../models/userModel");
var Role = require("../models/roleModel");

module.exports = {
  create: async (email, password, roles, name, surname) => {
    //buscar roles
    const rolesFound = await Role.find({ name: { $in: roles } });

    let newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
      name,
      surname,
      roles: rolesFound.map((role) => role._id),
      isDelete: false,
    });

    newUser.password = await User.encryptPassword(user.password);

    await newUser.save();
    return newUser;
  },

  getById: async (userId) => {
    const user = await User.findById(userId);
    return user;
  },

  getByEmail: async (email) => {
    const user = await User.findOne({
      email: email,
      isDelete: false,
    })
      .populate("roles")
      .exec();

    return user;
  },

  getAll: async () => {
    const users = await User.find({ isDelete: false });
    console.log(users);
    return users;
  },

  edit: async (data) => {
    const user = await User.findByIdAndUpdate(data._id, data);
    return user;
  },

  delete: async (userId) => {
    const user = await User.findByIdAndUpdate(userId, { isDelete: true });
    return user;
  },
};
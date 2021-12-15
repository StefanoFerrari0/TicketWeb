const mongoose = require("mongoose");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

module.exports = {
  create: async (email, password, roles, name, surname) => {

    let newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
      name,
      surname,
      roles: [roles],
      isDelete: false,
    });

    newUser.password = await User.encryptPassword(newUser.password);

    await newUser.save();
    return newUser;
  },

  getById: async (userId) => {
    
    let user = await User.findById(userId).populate("roles").exec();
    if (user.isDelete == true){
      user = false;
    }
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
    const users = await User.find({ isDelete: false }).populate("roles").exec();

    return users;
  },

  edit: async (userId, data) => {
    const user = await User.findByIdAndUpdate(userId, data);
    return user;
  },

  resetDefaultPassword: async (name, surname) => {
    let nameSplice = name.slice(0,1).toUpperCase();
    nameSplice = nameSplice.concat(surname);
    return await User.encryptPassword(nameSplice);
  },

  encryptPassword: async (password) => {
    return await User.encryptPassword(password);
  },

  comparePassword: async (oldPassword, newPassword) => {
    return await User.comparePassword(oldPassword, newPassword);
  },

  delete: async (userId) => {
    const user = await User.findByIdAndUpdate(userId, { isDelete: true });
    return user;
  },
  checkAuth: async (userLogged, userId) =>{
    
    const isAdmin = userLogged.roles.find(roles => roles.name == "admin");
    
    if (userLogged._id !== userId && isAdmin === undefined) {
      //Necesita ser admin para acceder a la informacion
      const auth = false;
      return auth;
    }
    else{
      const auth = true;
      return auth;
    }
  },
};

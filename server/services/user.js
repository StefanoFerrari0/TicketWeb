const mongoose = require("mongoose");
const User = require("../models/userModel");


module.exports = {
  create: async (email, password, roles, name, surname, lastUserEdit) => {

    let newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
      name,
      surname,
      roles,
      lastUserEdit,
      isDelete: false,
    });

    newUser.password = await User.encryptPassword(newUser.password);

    await newUser.save();
    return newUser;
  },

  getById: async (userId) => {
    
    const user = await User.findOne({_id: userId, isDelete: false}).populate('roles').exec();
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

    return users;
  },

  edit: async (userId, data) => {
    const user = await User.findByIdAndUpdate(userId, data, {lastUserEdit: data.lastUserEdit});
    return user;
  },

  updateToken:async (userId, data) =>{
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

  delete: async (userId, lastUserEdit) => {
    const user = await User.findByIdAndUpdate(userId, { isDelete: true, lastUserEdit: lastUserEdit });
    return user;
  },
  checkAuth: async (userLogged, userId) =>{
    console.log(userLogged); 
    const isAdmin = userLogged.roles.name === 'admin' ? true : false
    
    if (userLogged._id !== userId && isAdmin === false ) {
      //Necesita ser admin para acceder a la informacion
      return false;
    }
    else{
      return true;
    }
  },
};

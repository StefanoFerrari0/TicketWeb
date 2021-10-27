var mongoose = require("mongoose");
var User = require("../models/userModel");

module.exports = {
  createUser: async ({ email, password, roles }) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: password,
      roles: roles,
      isDelete: false,
    });
    try {
      const newUser = await user.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("El usuario no existe");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const users = await User.find({});
      if (!user) {
        throw new Error("El usuario no existe");
      }

      return users;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const user = await User.findByIdAndUpdate(userId, { isDelete: true });
      if (!user) {
        throw new Error("El usuario no existe");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },

  editUser: async (data) => {
    try {
      const user = await User.findByIdAndUpdate(data._id, data);
      if (!user) {
        throw new Error("El usuario no existe");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};

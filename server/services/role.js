const mongoose = require("mongoose");
const Role = require("../models/roleModel");

module.exports = {
  create: async (name) => {
    let role = new Role({
      _id: new mongoose.Types.ObjectId(),
      name,
      isDelete: false,
    });

    await role.save();
    return role;
  },

  getById: async (roleId) => {
    const role = await Role.findOne({_id: roleId, isDelete: false});
    return role;
  },

  getAll: async () => {
    const roles = await Role.find({ isDelete: false });
    return roles;
  },

  getByName: async (name) => {
    const role = await Role.findOne({
      name,
      isDelete: false,
    })

    return role;
  },
  
  edit: async (roleId, data) => {
    const role = await Role.findByIdAndUpdate(roleId, data);
    return role;
  },

  delete: async (roleId) => {
    const role = await Role.findByIdAndUpdate(roleId, { isDelete: true });
    return role;
  },


};

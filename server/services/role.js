const Role = require("../models/roleModel");

module.exports = {
  getName: async (roleId) => {
    const roleId = await Role.findById(roleId);
    const name = Role.find({ name: roleId });

    return name;
  },
};

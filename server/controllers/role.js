const RoleService = require("../services/role")

module.exports = {
  createRole: async (req, res, next) => {
    console.log("createRole");
    try {
      const { name } = req.body;
      let role = await RoleService.getByName(name);

      if (role) {
        return next(new Error("Ya existe un rol registrado con ese nombre"));
      }

     await RoleService.create(name);

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  getRoleById: async (req, res, next) => {
    console.log("getRoleById");
    try {
      const roleId = req.params.roleId;
      const role = await RoleService.getById(roleId);

      if (!role) {
        return next(new Error("No se encontró el rol."));
      }

      res.status(200).json({
        ok: true,
        data: role,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllRoles: async (req, res, next) => {
    console.log("getAllRoles");
    try {
      const role = await RoleService.getAll();

      if (!role) {
        return next(new Error("No existen roles."));
      }

      res.status(200).json({
        ok: true, 
        data: role 
      });
    } catch (error) {
      next(error);
    }
  },

  editRole: async (req, res, next) => {
    console.log("editRole");
  },
  
  deleteRole: async (req, res, next) => {
    console.log("deleteRole");
    try {
      const roleId = req.params.roleId;
      const role = await RoleService.delete(roleId);

      if (!role) {
        return next(new Error("No existe el rol"));
      }

      res.status(200).json({ 
        ok: true, 
      });
    } catch (error) {
      next(error);
    }
  },
};

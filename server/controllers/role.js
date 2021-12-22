const RoleService = require("../services/role")
const createHttpError = require("http-errors");
const role = require("../services/role");

module.exports = {
  createRole: async (req, res, next) => {
    console.log("createRole");
    try {
      const { name } = req.body;
      let role = await RoleService.getByName(name);

      if (role) {
        const error = new createHttpError.BadRequest("Ya existe un rol.");
        return next(error);
      }
      const lastUserEdit = req.userLogged._id;
     await RoleService.create(name, lastUserEdit);

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  getRoleById: async (req, res, next) => {
    console.log("getRoleById");
    try {
      const roleId = req.params.roleId;
      const role = await RoleService.getById(roleId);

      if (!role) {
        const error = new createHttpError.BadRequest("No se encontro el rol.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
        data: role,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  getAllRoles: async (req, res, next) => {
    console.log("getAllRoles");
    try {
      const role = await RoleService.getAll();

      if (!role) {
        const error = new createHttpError.BadRequest("No existen roles.");
        return next(error);
      }

      res.status(200).json({
        ok: true, 
        data: role 
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  editRole: async (req, res, next) => {
    console.log("editRole");
    try {
      const { name } = req.body;
      const roleId = req.params.roleId;
      const lastUserEdit = req.userLogged._id;
      
      const data = {name, lastUserEdit};
      const role = await RoleService.edit(roleId,data);

      if(!role){
        const error = new createHttpError.BadRequest("No se modifico el rol.");
        return next(error);
      }
      res.status(201).json({ok:true});
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },
  
  deleteRole: async (req, res, next) => {
    console.log("deleteRole");
    try {
      const roleId = req.params.roleId;
      const lastUserEdit = req.userLogged._id;
      const role = await RoleService.delete(roleId, lastUserEdit);

      if (!role) {
        const error = new createHttpError.BadRequest("No se pudo borrar el rol.");
        return next(error);
      }

      res.status(200).json({ 
        ok: true, 
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },
};

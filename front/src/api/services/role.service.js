import http from "../http-common";

class RoleService {
  create(data) {
    return http.post("/role/", data);
  }

  getById(roleId) {
    return http.get(`/role/${roleId}`);
  }

  getAll() {
    return http.get("/role/");
  }

  edit(roleId, data) {
    return http.put(`/role/edit/${roleId}`, data);
  }

  delete(roleId) {
    return http.put(`/role/delete/${roleId}`);
  }
}

export default new RoleService();

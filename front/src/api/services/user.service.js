import http from "../http-common";

class UserService {
  create(data) {
    return http.post("/user/", data);
  }

  getById(userId) {
    return http.get(`/user/${userId}`);
  }

  getAll() {
    return http.get("/user/");
  }

  edit(userId, data) {
    return http.put(`/user/edit/${userId}`, data);
  }

  resetDefaultPassword(userId) {
    return http.put(`/user/reset-default-password/${userId}`);
  }

  changePassword(data) {
    return http.put(`/change-password/`, data);
  }

  delete(userId) {
    return http.put(`/user/delete/${userId}`);
  }
}

export default new UserService();

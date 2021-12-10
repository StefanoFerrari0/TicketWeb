import http from "../http-common";

class AuthService {
  login(data) {
    return http.post("/auth/login/", data);
  }

  verifyToken() {
    return http.post(`/auth/verifyToken/`);
  }
}

export default new AuthService();

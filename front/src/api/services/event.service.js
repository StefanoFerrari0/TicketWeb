import http from "../http-common";

class EventService {
  create(data) {
    return http.post("/event/", data);
  }

  getById(eventId) {
    return http.get(`/event/${eventId}`);
  }

  getAll() {
    return http.get("/event/");
  }

  edit(eventId, data) {
    return http.put(`/event/edit/${eventId}`, data);
  }

  delete(eventId) {
    return http.put(`/event/delete/${eventId}`);
  }
}

export default new EventService();

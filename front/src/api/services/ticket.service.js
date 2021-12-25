import http from "../http-common";

class TicketService {
  create(data) {
    return http.post(`/ticket/`, data);
  }

  getById(ticketId) {
    return http.get(`/ticket/${ticketId}`);
  }

  getAll() {
    return http.get(`/ticket/`);
  }

  getByUser(ticketId) {
    return http.get(`/ticket/get-by-user/${ticketId}`);
  }

  edit(ticketId, data) {
    return http.put(`/ticket/edit/${ticketId}`, data);
  }

  delete(ticketId) {
    return http.put(`/ticket/delete/${ticketId}`);
  }
}

export default new TicketService();

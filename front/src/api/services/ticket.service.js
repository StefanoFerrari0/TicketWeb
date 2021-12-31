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

  getByUser(userId) {
    return http.get(`/ticket/get-by-user/${userId}`);
  }

  edit(ticketId, data) {
    return http.put(`/ticket/edit/${ticketId}`, data);
  }

  sendQrCodeByEmail(ticketId) {
    return http.post(`/ticket/send-qr-code/${ticketId}`);
  }

  delete(ticketId) {
    return http.put(`/ticket/delete/${ticketId}`);
  }
}

export default new TicketService();

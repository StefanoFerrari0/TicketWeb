import http from "../http-common";

class BatchesService {
  create(data) {
    return http.post(`/batches/`, data);
  }

  getById(batchesId) {
    return http.get(`/batches/${batchesId}`);
  }

  getByEvent(eventId){
    return http.get(`/batches/get-by-event/${eventId}`)
  }
  
  getAll() {
    return http.get(`/batches/`);
  }

  edit(batchesId, data) {
    return http.put(`/batches/edit/${batchesId}`, data);
  }

  delete(batchesId) {
    return http.put(`/batches/delete/${batchesId}`);
  }
}

export default new BatchesService();

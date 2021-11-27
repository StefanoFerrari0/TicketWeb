const EventService = require("../services/event");

module.exports = {
  createEvent: async (req, res, next) => {
    console.log("createEvent");
    try {
      const { name, date, batches } = req.body;
      const event = await EventService.create(name, date, batches);
      res.status(200).json({
        ok: true,
        event,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllEvents: async (req, res, next) => {
    console.log("getAllEvents");
    try {
      const events = await EventService.getAll();
      res.status(200).json({
        ok: true,
        data: events,
      });
    } catch (err) {
      next(err);
    }
  },

  getEventId: async (req, res, next) => {
    console.log("getEventId");
    try {
      const eventId = req.params.eventId;
      const event = await EventService.getById(eventId);

      if (!event) {
        return next(new Error("No se encontro el evento."));
      }

      res.status(200).json({
        ok: true,
        event,
      });
    } catch (error) {
      next(error);
    }
  },

  getEventByName: async (req, res, next) => {
    console.log("getEventByName");
    try {
      const name = req.params.name;
      const event = await EventService.getByName(name);

      if (!event) {
        return next(new Error("No existe el evento."));
      }

      res.status(200).json({
        ok: true,
        event,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteEvent: async (req, res, next) => {
    console.log("deleteEvent");
    try {
      const eventId = req.params.eventId;

      const event = await EventService.delete(eventId);

      if (!event) {
        return next(new Error("El evento no existe."));
      }

      res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  },

  editEvent: async (req, res, next) => {
    try {
      const data = req.params.data;
      const event = await EventService.edit(data);

      if (!event) return next(new Error("el usuario no existe"));

      res.status(201).json({ 
        ok: true, 
        event 
      });
    } catch (error) {
      next(error);
    }
  },
};

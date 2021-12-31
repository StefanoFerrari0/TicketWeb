const EventService = require("../services/event");
const createHttpError = require("http-errors");
const UserService = require("../services/user");

module.exports = {
  createEvent: async (req, res, next) => {
    console.log("createEvent");
    try {
      const { name, date, location, active } = req.body;
      const event = await EventService.create(name, date, location, active);
      
      if(!event){
        const error = new createHttpError.BadRequest("No se pudo crear el evento.");
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

  getAllEvents: async (req, res, next) => {
    console.log("getAllEvents");
    try {
      const events = await EventService.getAll();
      
      if(!events){
        const error = new createHttpError.BadRequest("No se encontraron eventos.");
        return next(error);
      }
      res.status(200).json({
        ok: true,
        data: events,
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

  getEventId: async (req, res, next) => {
    console.log("getEventId");
    try {
      const eventId = req.params.eventId;
      const event = await EventService.getById(eventId);

      if (!event) {
        const error = new createHttpError.BadRequest("No se encontro el evento.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
        data: event,
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

  getEventByName: async (req, res, next) => {
    console.log("getEventByName");
    try {
      const name = req.params.name;
      const event = await EventService.getByName(name);

      if (!event) {
        const error = new createHttpError.BadRequest("No se encontro el evento.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
        data: event,
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

  getAllEventsActives:async(req, res, next)=>{
    console.log("getAllEventsActives");
    try {
      const events = await EventService.getAllActives();   

      if(!events){
        const error = new createHttpError.BadRequest("No se encontraron eventos.");
        return next(error);
      }
      res.status(200).json({
        ok: true,
        data: events,
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

  editEvent: async (req, res, next) => {
    console.log("editEvent"); 
    try {
      const {name, date, location, active} = req.body;
      const eventId = req.params.eventId;
      
      if (!eventId) {
        const error = new createHttpError.BadRequest("No se encontró el evento.");
        return next(error);
      }
      
      const data = {
        name,
        date,
        location,
        active
      };
      const event = await EventService.edit(eventId, data);
      if(!event){
        const error = new createHttpError.BadRequest("No se modifico la evento.");
        return next(error);
      }
      res.status(201).json({ 
        ok: true,
        date: date,
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

  deleteEvent: async (req, res, next) => {
    console.log("deleteEvent");
    try {
     const eventId = req.params.eventId;

      const event = await EventService.delete(eventId);

      if (!event) {
        const error = new createHttpError.BadRequest("No se encontro el evento.");
        return next(error);
      }

      res.status(200).json({ ok: true });
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

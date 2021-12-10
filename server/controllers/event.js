const EventService = require("../services/event");
const createHttpError = require("http-errors");
const UserService = require("../services/user");

module.exports = {
  createEvent: async (req, res, next) => {
    console.log("createEvent");
    try {
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const auth = UserService.checkAuth( userLogged, userId);

      if (auth == false) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

      const { name, date } = req.body;
      const event = await EventService.create(name, date);
      
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
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const auth = UserService.checkAuth( userLogged, userId);

      if (auth == false) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

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

  editEvent: async (req, res, next) => {
    console.log("editEvent"); 
    try {
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const auth = UserService.checkAuth( userLogged, userId);

      if (auth == false) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

      const {name, date, batches} = req.body;
      const eventId = req.params.eventId;
      
      if (!eventId) {
        const error = new createHttpError.BadRequest("No se modifico el evento.");
        return next(error);
      }
      
      const data ={
        name,
        date,
        
      };
      const event = await EventService.edit(eventId,data);
      if(!event){
        const error = new createHttpError.BadRequest("No se modifico la evento.");
        return next(error);
      }
      res.status(201).json({ 
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

  deleteEvent: async (req, res, next) => {
    console.log("deleteEvent");
    try {
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const auth = UserService.checkAuth( userLogged, userId);

      if (auth == false) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

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

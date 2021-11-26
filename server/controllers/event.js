const { json } = require("express");
var Event = require("../models/eventModel")
var eventService = require("../services/event")
module.exports={

  
  createEvent : async (req,res,next)=>{
    console.log("createEvent");
    try{
        const {name,date,batches}=req.body;
        const event = await eventService.create(name,date,batches);
        res.status(201).json({
          ok:true,
          event
        });
    }catch(error){
      next(error);
    }
  },
     getAllEvents: async(req,res,next)=>{
       console.log("getAllEvents");
      try{
          const events = await eventService.getAll();
          res.status(200).json({
            ok:true,
            data:events,
          });
       }
       catch(err){
        next(err);
      }
     },

    
    getEventId:async(res,req,next)=>{
      try {
      const eventId= req.body.eventId;
      console.log(req.params);
      const event = await eventService.getById(eventId);
      if(!event){
        return next(new Error("No se encontro el evento."))
      }
      res.status(201).json({
        ok:true,
        event,
      });
    } catch (error) {
      next(error);
    }
    },
  
      getEventByName:async (req,res,next)=>{
      try {
        const name=req.params.name;
        const event = await eventService.getByName(name);

         if (!event){
           return next(new Error("No existe el evento."));   
         }
         res.status(200).json({
           ok:true,
           event,
         });
      } catch(error) {
        next(error);
      }
      },
      deleteEvent: async(req,res,next)=>{
      console.log("deleteEvent"); 
      try {
       const eventId= req.params.eventId;
     
       const event = await eventService.delete(eventId);
         if(!event){
           return next( new Error("El evento no existe."))
         }
        res.status(204).json({ok:true});
      } catch (error) {
       next(error);
       }
      },

      editEvent: async (req,res,next)=>{
      try{
      const data = req.params.data;
      const event = await eventService.edit(data);
      if(!event) return next(new Error("el usuario no existe"));
      res.status(204).json({ok:true,event});
      }catch (error){
      next(error);
      }
      },

};
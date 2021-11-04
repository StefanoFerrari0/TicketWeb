const { json } = require("express");
var mongoose = require("mongoose");
var Event = require("../models/eventModel");
var eventService = require("../services/event")
module.exports={

  
  createEvent : async (req,res,next)=>{
    console.log("createEvent");
    try{
        const {name,date}=req.body;
        const event = eventService.create(name,date);
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

  
  getEventId: async (res,req,next)=>{
    console.log("getEventId")
    try {
      const eventId=req.params.eventId;
      const event = await eventService.getId(eventId);
      if(!event){
        return next(new Error("No se encontro el evento."))
      }
      res.status(200).json({
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
      const data = req.body.data;
      const event = await eventService.edit(data);
      if(!event) return next(new Error("el usuario no existe"));
      res.status(204).json({ok:true,event});
    }catch (error){
      next(error);
    }
  },

};
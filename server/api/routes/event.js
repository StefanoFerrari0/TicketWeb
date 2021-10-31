var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Event = require("../../models/eventModel");

//GetById
router.get("/:eventId", (req, res) => {
  let eventId = req.params.eventId;
  Event.findbyId(eventId, (err, event) => {
    if (err)
      return res
        .status(500)
        .send({ message: `error al realizar la peticion: ${err}` });
    if (!event) return res.status(404).send({ message: `el evento no existe` });

    res.status(200).send({ event });
  });
});

//GetAll
router.get("/", (req, res) => {
  Event.find({}, (err, events) => {
    if (err)
      return res
        .status(500)
        .send({ message: `error al realizar la peticion: ${err}` });
    if (!events) return res.status(404).send({ message: `no existen eventos` });

    res.status(200).send({ events });
  });
});

//Delete
router.delete("/:eventId", (req, res) => {
  let eventId = req.params.eventId;

  Event.findById(eventId, (err, event) => {
    if (err)
      res.status(500).send({ message: `Error al borrar el evento:${err}` });

    event.remove((err) => {
      if (err)
        res.status(500).send({ message: `Error al borrar el evento:${err}` });
      res.status(200).send({ message: `El evento fue eliminado` });
    });
  });
});

//Edit
router.put("/:eventId", (req, res) => {
  let eventId = req.params.eventId;
  let update = req.body;
  Event.findByIdAndUpdate(eventId, update, (err, eventUpdated) => {
    if (err)
      res.status(500).send({ message: `Error al actualizar el evento:${err}` });

    res.status(200).send({ eventId: eventUpdated });
  });
});

//Add
router.post("/", (req, res) => {
  let event = new Event();
  event.name = req.body.name;
  event.date = req.body.date;
  event.idDelete = req.body.isDelete;

  event.save((err, eventSaved) => {
    if (err)
      res.status(500).send({ message: `error al crear el evento:${err}` });

    res.status(200).send({ event: eventSaved });
  });
});

module.exports = router;

const app = express();
const express = require('express');
var mongoose = require("mongoose")
var Ticket = mongoose.model("ticketModel")

app.get("/api/ticket/:ticketId",(req,res)=>{
    let ticketId   =  req.params.ticketId
    Ticket.findbyId(ticketId,(err,ticket)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion: ${err}`})
        if(!ticket) return res.status(404).send({message:`el evento no existe`})

        res.status(200).send ({ticket})
    })
    
});

app.get('/api/ticket',(req,res)=> {

    Ticket.find({},(err,ticket)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion: ${err}`})
        if(!ticket) return res.status(404).send({message:`no existen tickets `})

        res.status(200).send({ticket: ticket})
    })
});

app.delete("/api/ticket/:ticketId",(req,res)=>{

    let ticketId =  req.params.ticketId

    Ticket.findById(ticketId,(err,ticket)=>{
        if(err)res.status(500).send({message:`Error al borrar el ticket:${err}`})

        ticket.remove(err=>{
            if(err)res.status(500).send({message:`Error al borrar el ticket:${err}`})
            res.status(200).send({message:`El ticket fue eliminado`})
        })
    })

});

app.put("/api/ticket/:ticketId",(req,res)=>{
    let ticketId=req.params.ticketId
    let update = req.body
    Ticket.findByIdAndUpdate(ticketId,update, (err,ticketUpdated) =>{
        if(err)res.status(500).send({message:`Error al actualizar el ticket:${err}`})

        res.status(200).send({ticketId:ticketUpdated})
    })
})
app.post("/api/ticket",(req,res)=>{
    let ticket = new Ticket()
    ticket.buyDate = req.body.buyDate
    ticket.seller = req.body.seller
    ticket.price = req.body.price
    ticket.email = req.body.email
    ticket.phone = req.body.phone
    ticket.name = req.body.name
    ticket.lastName = req.body.lastName
    ticket.dni = ticket.body.dni
    ticket.qr  =ticket.body.qr
    ticket.idDelete = req.body.isDelete
    ticket.state = req.body.state
    ticket.batch = req.body.batch

    ticket.save((err,ticketSaved)=>{
        if (err)res.status(500).send({message:`error al crear el ticket:${err}`})

        res.status(200).send({ticket:ticketSaved})
    })

});
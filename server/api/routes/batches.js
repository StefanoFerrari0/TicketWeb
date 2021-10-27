const app = express();
const express = require('express');
var mongoose = require("mongoose")
var Batches = mongoose.model("batchesModel")

app.get("/api/batches/:batchesId",(req,res)=>{
    let batchesId   =  req.params.batchesId
    Batches.findbyId(batchesId,(err,batches)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion: ${err}`})
        if(!batches) return res.status(404).send({message:`el evento no existe`})

        res.status(200).send ({batches})
    })
    
});

app.get('/api/batches',(req,res)=> {

    Batches.find({},(err,batches)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion: ${err}`})
        if(!batches) return res.status(404).send({message:`no existen tandas`})

        res.status(200).send({batches})
    })
});

app.delete("/api/batches/:batchesId",(req,res)=>{

    let batchesId =  req.params.batchesId

    Batches.findById(batchesId,(err,batches)=>{
        if(err)res.status(500).send({message:`Error al borrar el evento:${err}`})

        batches.remove(err=>{
            if(err)res.status(500).send({message:`Error al borrar el evento:${err}`})
            res.status(200).send({message:`El tanda fue eliminado`})
        })
    })

});

app.put("/api/batches/:batchesId",(req,res)=>{
    let batchesId=req.params.batchesId
    let update = req.body
    Event.findByIdAndUpdate(batchesId,update, (err,batchesUpdated) =>{
        if(err)res.status(500).send({message:`Error al actualizar el evento:${err}`})

        res.status(200).send({batches:batchesUpdated})
    })
})
app.post("/api/batches",(req,res)=>{
    let batches = new Batches()
    batches.name = req.body.name
    batches.dateFrom = req.body.dateFrom
    batches.datoTo = req.body.datoTo
    batches.price = req.body.batches
    batches.idDelete = req.body.isDelete
    batches.quantity = req.body.quantity
    batches.event = req.body.event
    batches.save((err,batchesSaved)=>{
        if (err)res.status(500).send({message:`error al crear el evento:${err}`})

        res.status(200).send({event:batchesSaved})
    })

});
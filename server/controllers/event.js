const app = require("../../app");
const Event = require("../../models/eventModel")
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.post("/api/event/" , (req,res)=>{
    console.log('POST /API/EVENT')
    console.log(req.body)

    let event = new Event()
})

const handler =async (req,res)=>{

    const {method} =req;
    const {name , date , isDelete} = req.body;


    switch(method){

        case "POST":
        try {  
                const event = new Event()
                name= req.body.name,
                date=req.body.date,
                isDelete=req.body.isDelete
                event.save((err,eventnew)=>{
                if(err) res.status(500).send({message:`Error al crear el evento:${err}`})
                res.status(200).send({event:eventnew})
                 });
            }
            catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            });
            }
            break;
            case "GET":
            try{
                app.get("/api/event/",(req,res)=>{
                    let event = req.params.event
                  
                    Event.find(event,(err,even)=>{
                      if (err) return res.status(500).send({message:`Error al realizar la peticion :${err}`})
                      if(!even) return res.status(400).send({message:`el evento no existe`})
                  
                      res.status(200).send({even})
                    })
                  });
            }
            catch{
                res.status(400).json({
                    success:false,
                    message:error.message
                });
            }
        
        default:
        res.status(400).json({success:false,}); 
        break;
    }
};

export default handler;
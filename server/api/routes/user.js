const app = express();
const express = require('express');
var mongoose = require("mongoose")
var User = mongoose.model("userModel")

app.get("/api/user/:userId",(req,res)=>{
    let userId   =  req.params.userId
    User.findbyId(userId,(err,user)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion: ${err}`})
        if(!user) return res.status(404).send({message:`el usuario no existe`})

        res.status(200).send ({user})
    })
    
});

app.get('/api/user',(req,res)=> {

    User.find({},(err,users)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion: ${err}`})
        if(!users) return res.status(404).send({message:`no existen usuarios`})

        res.status(200).send({users})
    })
});

app.delete("/api/user/:userId",(req,res)=>{

    let userId =  req.params.userId

    User.findById(userId,(err,user)=>{
        if(err)res.status(500).send({message:`Error al borrar el usuario:${err}`})

        user.remove(err=>{
            if(err)res.status(500).send({message:`Error al borrar el usuario:${err}`})
            res.status(200).send({message:`El usuario fue eliminado`})
        })
    })

});

app.put("/api/user/:userId",(req,res)=>{
    let userId=req.params.userId
    let update = req.body
    User.findByIdAndUpdate(userId,update, (err,userUpdated) =>{
        if(err)res.status(500).send({message:`Error al actualizar el usuario:${err}`})

        res.status(200).send({user:userUpdated})
    })
})
app.post("/api/user",(req,res)=>{
    let user = new User()
    user.email = req.body.email
    user.password = req.body.password
    user.idDelete = req.body.isDelete
    user.roles =req.body.roles
    
    user.save((err,userSaved)=>{
        if (err)res.status(500).send({message:`error al crear el usuario:${err}`})

        res.status(200).send({user:userSaved})
    })

});
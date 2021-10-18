import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({

    Name:{
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    Description:{
        type:String,
        required:true
    }

})
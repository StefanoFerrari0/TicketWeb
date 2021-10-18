
import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({

    Name:{
        type:String,
        required: true,
        trim:true,
    },

    Date:{
        type:Date,
        required: true,
        unique:true,

    },
    
    State:{
        type:Boolean(true),
        required:true
    }
})
import mongoose from 'mongoose'

const batchesSchema = new mongoose.Schema({
    Name:{
        type:String,
        required: true,
        trim:true,
        unique:true
    },

    DateFrom:{
        type:Date,
        required: true,
        unique:true,

    },

    DateTo:{
        type:Date,
        required: true,
        unique:true,

    },

    Price:{
        type:Float64Array,
        required:true,
    },
    events:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"eventModels"
    },
    state:{
        type:Boolean(true),
        required:true
    }
})
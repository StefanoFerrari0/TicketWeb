import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({

    BuyDate:{
        type:Date,
        required: true,
        
    },

    Seller:{
        type:String,
        required: true,
        trim:true,
    },

    Price:{
        type:Float64Array,
        required: true,
        
    },

    Email:{
        type:String,
        required: true,
        trim:true,
    },
    
    Phone:{
        type:Float64Array,
        required: true,
        trim:true,
    },
    
    Name:{
        type:String,
        required: true,
        trim:true,
    },
    
    LastName:{
        type:String,
        required: true,
        trim:true,
    },
    
    DNI:{
        type:String,
        required: true,
        trim:true,
    },
    
    Qr?:{
        type:String,
        required: true,
        trim:true,
    },
    
    State:{
        type:Boolean(true),
        required: true,
        
    },

    Batch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"batchesModels"
    }
        
})
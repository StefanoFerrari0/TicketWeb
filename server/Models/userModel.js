import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true
    }, 
    roles:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"role"
    }]

}, {
        timestamps: true
    }
)


userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async(password, receivedPassword) =>{
   return await bcrypt.compare(password, receivedPassword)
}


export default mongoose.models.user || mongoose.model('user', userSchema)
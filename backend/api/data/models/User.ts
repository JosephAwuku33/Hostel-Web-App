import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        default: null
    },

    last_name: {
        type: String, 
        required: true,
        default: null
    },

    email: { 
        type: String,
        required: true,
        unique: true
    },

    password: { 
        type: String, 
        required: true
    },
});


export default mongoose.model('User', userSchema);

 

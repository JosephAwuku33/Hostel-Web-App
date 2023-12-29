import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        default: null
    },

    status: {
        type: String, 
        required: true,
        default: null,
        enum: ["available", "occupied"]
    },

    type: { 
        type: String,
        required: true,
        default: null,
    },

    occupants: { 
        type: Number,
        required: true,
        default: null, 
        min: 1,
    },

    price: {
        type: Number,
        required: true,
        default: null,
    },

    gender_type: {
        type: String,
        required: true,
        default: null,
        enum: ["male", "female"]
    }
});
const Rooms = mongoose.model('rooms', roomSchema);
export default Rooms;
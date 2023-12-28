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
        default: null
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
    }
});
const Rooms = mongoose.model('rooms', roomSchema);
export default Rooms;
import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        default: null
    },

    status: {
        type: String, 
        default: null
    },

    type: { 
        type: String,
        default: null,
    },

    occupants: { 
        type: Number,
        default: null, 
    },

    price: {
        type: Number,
        default: null,
    },

    gender_type: {
        type: String,
        default: null,
    }
});
const Rooms = mongoose.model('rooms', roomSchema);
export default Rooms;
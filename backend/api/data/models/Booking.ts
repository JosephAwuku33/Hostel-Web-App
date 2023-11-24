import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'rooms', required: true},
    
});
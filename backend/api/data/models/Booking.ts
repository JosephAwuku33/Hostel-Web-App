import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", /*required: true*/ },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      /*required: true*/
    },
    checkInDate: { type: String /*required: true*/ },
    checkOutDate: { type: String, /*required: true */},
    status: { type: String, /*required: true*/ },
    totalAmountPaid: { type: mongoose.Schema.Types.Number, /*required: true*/ },
    transactionMethod: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;

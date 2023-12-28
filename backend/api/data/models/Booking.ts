import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" /*required: true*/,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      /*required: true*/
    },
    checkInDate: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(\d{2})$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid date suggestion!`,
      },
      /*required: true*/
    },
    checkOutDate: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(\d{2})$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid date suggestion!`,
      },
      /*required: true */
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "PENDING", "FAILED"],
      /*required: true*/
    },
    totalAmountPaid: {
      type: mongoose.Schema.Types.Number,
      /*required: true*/
    },
    transactionMethod: {
      type: String,
      enum: ["BANK ACCOUNT", "MOMO"]
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;

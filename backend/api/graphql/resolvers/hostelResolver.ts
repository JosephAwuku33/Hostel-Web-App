import Rooms from "../../data/models/Rooms.js";
import Booking from "../../data/models/Booking.js";
import { GraphQLError } from "graphql";
import { MyContext } from "../../../types/context.js";

export const resolvers = {
  Query: {
    // query for returning rooms available
    rooms: async (_: any, __: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        throw new GraphQLError(
          "Not an authenticated user to be retriveing rooms requests",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }

      try {
        const rooms = await Rooms.find({ status: "available" });
        const roomsArray = [...rooms];

        return roomsArray;
      } catch (err) {
        throw new Error("Error fetching rooms from database");
      }
    },

    room: async (_: any, args: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        throw new GraphQLError(
          "Not an authenticated user to be retrieving room requests",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }

      const { id } = args;

      // query specific room by ID
      try {
        const room = await Rooms.findById(id);
        return room;
      } catch (err) {
        throw new Error("Room not found");
      }
    },
  },

  Mutation: {
    // mutation to add a new booking
    addBooking: async (_: any, args: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        throw new GraphQLError(
          "Not an authenticated user to be making booking requests",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }
      const {
        room,
        user,
        checkInDate,
        checkOutDate,
        status,
        totalAmountPaid,
        transactionMethod,
      } = args.input;

      try {
        const newBooking = await Booking.create({
          room: room,
          user: user,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          status: status,
          totalAmountPaid: totalAmountPaid,
          transactionMethod: transactionMethod,
        });

        const roomId = newBooking.room;

        const updatedRoom = await Rooms.findByIdAndUpdate(
          roomId,
          {
            $inc: { occupants: -1 }, // Decrement the occupants by 1
          },
          { new: true }
        );

        if (updatedRoom?.occupants === 0) {
          await Rooms.findByIdAndUpdate(roomId, {
            $set: { status: "occupied" },
          });
        }

        return newBooking;
      } catch (err) {
        console.error(err);
      }
    },

    // I think I'll need a review of this later
    deleteBooking: async (_: any, args: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        throw new GraphQLError(
          "Not an authenticated user to be deleting booking requests",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }

      const { id } = args;
      try {
        // Well first you have to make sure any other fields in the sub documents have to be updated rightly first
        // E.g the status of the room,
        const selectedBooking = await Booking.findById(id);
        const roomId = selectedBooking?.room;
        const updatedRoom = await Rooms.findByIdAndUpdate(roomId, {
          $inc: {
            occupants: +1,
          } /**If a booking has been made by this particular user and he/she deletes it, 
         then it means the occupant number of the room increases as there is space for it */,
        });
        if (updatedRoom?.occupants !== 0) {
          await Rooms.findByIdAndUpdate(roomId, {
            $set: { status: "available" },
          });
        }
        const deletedBooking = await Booking.findByIdAndDelete(id);
        return deletedBooking;
      } catch (err) {
        throw new Error(
          "Error occured while deleting booking, either the booking hasn't been made or a network issue"
        );
      }
    },
  },
};

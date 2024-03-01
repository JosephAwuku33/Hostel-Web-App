import Rooms from "../../data/models/Rooms.js";
import Booking from "../../data/models/Booking.js";
import { GraphQLError } from "graphql";
import { MyContext } from "../../../types/context.js";

export const resolvers = {
  Query: {
    // query for returning rooms available
    rooms: async (_: any, __: any, contextValue: MyContext) => {
      console.log(contextValue.user);
      if (!contextValue.user) {
        return new GraphQLError(
          "Not authenticated to be making room requests",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }

      try {
        const rooms = await Rooms.find({ status: "available" }).sort({
          number: 1,
        });
        const roomsArray = [...rooms];

        return roomsArray;
      } catch (err) {
        throw new Error("Error fetching rooms from database");
      }
    },

    // query for returning a single room given its id
    room: async (_: any, args: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        return new GraphQLError(
          "Not authenticated to be making room requests",
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

    // query for returning the number of available rooms
    roomCount: async (_: any, __: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        return new GraphQLError(
          "Not authenticated to be making room requests regarding its count",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }

      try {
        const count = await Rooms.countDocuments({ status: "available" });
        return { count };
      } catch (err) {
        throw new Error("Couldn't return the count of rooms");
        console.log(err);
      }
    },

    // query for returning the total number, i.e the total number of beds currently available in the hostel
    totalOccupants: async (_: any, __: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        return new GraphQLError(
          "Not authenticated to be making room requests regarding its count of beds",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }

      try {
        const totalOccupantsBedLeftAggregate = await Rooms.aggregate([
          {
            $match: { status: "available" },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$occupants" },
            },
          },
        ]);
        if (totalOccupantsBedLeftAggregate.length === 0) {
          // Handle the case where there are no documents matching the criteria
          return { totalCount: 0 }; // Return a default value
        }
    
        const totalCount = totalOccupantsBedLeftAggregate[0].total;
    
        console.log("Total Beds Left:", totalCount);
    
        return { totalCount };
      } catch (err) {
        console.log(err);
        throw new Error("There was a problem with your request");
      }
    },
  },
  Mutation: {
    // mutation to add a new booking
    addBooking: async (_: any, args: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        return new GraphQLError(
          "Not authenticated to be making booking requests",
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
        return new GraphQLError("Not authenticated to be deleting bookings", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
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

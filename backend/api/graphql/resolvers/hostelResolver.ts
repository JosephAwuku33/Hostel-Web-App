import Rooms from "../../data/models/Rooms.js";
import Booking from "../../data/models/Booking.js";
import { GraphQLError } from "graphql";
import { MyContext } from "../../../types/context.js";

export const resolvers = {
  Query: {
    // query for returning rooms available
    rooms: async (parent: any, args: any, contextValue: MyContext) => {
      if (!contextValue.user) {
        throw new GraphQLError(
          "Not an authenticated user to be making requests",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }
      
      try {
        const rooms = await Rooms.find();
        const roomsArray = [...rooms];
        
        return roomsArray;
      } catch (err) {
        throw new Error("Error fetching rooms from database");
      }
    },
  },

  Mutation: {
    // mutation to add a new booking 
    addBooking: async (
      parent: any,
      args: any,
      contextValue: MyContext
    ) => {
      if (!contextValue.user) {
        throw new GraphQLError(
          "Not an authenticated user to be making requests",
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
        console.log("Argument set 2");
        return newBooking;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

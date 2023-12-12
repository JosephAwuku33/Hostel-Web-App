import Rooms from "../../data/models/Rooms.js";

export const resolvers = {
  Query: {
    rooms: async () => {
      try {
        const rooms = await Rooms.find();
        return rooms;
      } catch (err) {
        throw new Error("Error fetching rooms from database");
      }
    }
  },

  Mutation: {
    
  }
  
};

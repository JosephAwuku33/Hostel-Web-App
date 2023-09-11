import Rooms from "../../data/models/Rooms.js";

export const resolvers = {
  Query: {
    rooms: async () => await Rooms.find() ,
  }
};

import Rooms from "../models/Rooms.js";
import { roomsData } from "./roomsData.js";

export const addtoDB = () => {
  roomsData.forEach( async (roomData) => {
    try {
      const room = new Rooms(roomData);
      await room.save();
      console.log("Populating Database");
    } catch (err) {
      console.error(err);
    }
  });
};

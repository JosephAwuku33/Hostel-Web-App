import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = () => {
    mongoose
    .connect(MONGO_URL, {
      autoIndex: false
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URL = process.env.MONGODB_URL;

console.log("MONGODB_URI ====>", MONGODB_URL);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default dbConnect;

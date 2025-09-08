import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) throw new Error("MONGO_URL not defined in .env");

if (!global._mongooseConnection) {
  global._mongooseConnection = mongoose.connect(MONGODB_URI);
}

export default global._mongooseConnection;

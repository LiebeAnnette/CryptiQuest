import mongoose from "mongoose";

const mongoURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cryptiquest_db";

mongoose.connect(mongoURI); // No options needed!

export default mongoose.connection;

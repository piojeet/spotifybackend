import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("MongoDB connection established");
    });

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'spotify',  // Specifying the database name
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);  // Exit process with failure
  }
};

export default connectDB;

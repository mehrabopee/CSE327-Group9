import mongoose from "mongoose";
import colors from "colors";

/**
 * Connects to a MongoDB database using the provided URL.
 *
 * @function
 * @name connectDB
 * @returns {Promise<void>} - A Promise that resolves when the database connection is established or rejects on error.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in MongoDB Connection: ${error}`.bgRed.white);
  }
};

export default connectDB;

/**
 * E-commerce Application Server
 *
 * @module app
 */

import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

// Configure environment variables from a .env file
dotenv.config();

// Initialize and connect to the database
connectDB();

// Create an Express application
const app = express();

// Middleware

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 * @name corsMiddleware
 */
app.use(cors());

/**
 * Middleware to parse JSON request bodies.
 * @name jsonParserMiddleware
 */
app.use(express.json());

/**
 * Middleware to log HTTP requests to the console.
 * @name morganLoggerMiddleware
 */
app.use(morgan("dev"));

// Routes

/**
 * The authentication-related API routes.
 * @name authRoutes
 */
app.use("/api/v1/auth", authRoutes);

// REST API

/**
 * Welcome message for the root route.
 *
 * @function
 * @name getRoot
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// PORT

/**
 * The port on which the server will listen for incoming requests.
 * @name PORT
 * @type {number}
 * @default 8080
 */
const PORT = process.env.PORT || 8080;

// Start the server

/**
 * Start the Express server and listen on the specified port.
 *
 * @function
 * @name startServer
 */
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});

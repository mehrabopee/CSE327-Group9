/**
 * Express Router for Authentication and Testing Routes.
 *
 * @module authRoutes
 */

import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Create an Express router
const router = express.Router();

// Authentication Routes

/**
 * Route to register a new user.
 *
 * @function
 * @name POST /register
 */
router.post("/register", registerController);

/**
 * Route to log in an existing user.
 *
 * @function
 * @name POST /login
 */
router.post("/login", loginController);

// Test Route

/**
 * Route for testing purposes, requires user to be signed in and have admin privileges.
 *
 * @function
 * @name GET /test
 * @middleware {@link requireSignIn} Middleware that checks if the user is signed in.
 * @middleware {@link isAdmin} Middleware that checks if the user has admin privileges.
 */
router.get("/test", requireSignIn, isAdmin, testController);

// Export the router
export default router;

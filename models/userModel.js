/**
 * Mongoose Schema for User Data.
 *
 * @module userSchema
 */

import mongoose from "mongoose";

/**
 * User Schema for storing user information.
 *
 * @typedef {Object} UserSchema
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user (must be unique).
 * @property {string} password - The hashed password of the user.
 * @property {string} phone - The phone number of the user.
 * @property {string} address - The address of the user.
 * @property {number} role - The role of the user (0 for default user).
 * @property {Date} createdAt - The date when the user document was created.
 * @property {Date} updatedAt - The date when the user document was last updated.
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Create a Mongoose model for the "users" collection using the userSchema
const User = mongoose.model("users", userSchema);

// Export the Mongoose model
export default User;

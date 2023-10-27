import bcrypt from "bcrypt";

/**
 * Hashes a plain text password using bcrypt.
 *
 * @function
 * @name hashPassword
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - A Promise that resolves to the hashed password.
 */
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Compares a plain text password to a hashed password using bcrypt.
 *
 * @function
 * @name comparePassword
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The previously hashed password for comparison.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the passwords match, false otherwise.
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

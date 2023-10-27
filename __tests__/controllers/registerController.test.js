import { hashPassword } from "../../helpers/authHelper.js";
import userModel from "../../models/userModel.js";
import { registerController } from "../../controllers/authController.js";

/**
 * Mock the hashPassword module to prevent actual password hashing.
 */
jest.mock("../../helpers/authHelper.js");

/**
 * Test suite for the registerController function.
 * @function
 */
describe("registerController", () => {
  // Mock request and response objects
  const req = {
    body: {
      name: "Test User",
      email: "test@example.com",
      password: "testPassword",
      phone: "1234567890",
      address: "Test Address",
      answer: "Test Answer",
    },
  };

  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  /**
   * Clear all mocks after each test case to avoid interference.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case for registering a new user successfully.
   * @async
   */
  it("should register a new user", async () => {
    // Mock the findOne method to return null (no existing user)
    userModel.findOne = jest.fn(() => null);

    // Mock the save method for the new user
    userModel.prototype.save = jest.fn(() => Promise.resolve(req.body));

    // Mock the hashPassword function
    hashPassword.mockResolvedValue("hashedPassword");

    await registerController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: "User Registered Successfully",
      user: req.body,
    });
  });

  /**
   * Test case for returning an error for an existing user.
   * @async
   */
  it("should return an error for an existing user", async () => {
    // Mock the findOne method to return an existing user
    userModel.findOne = jest.fn(() => ({ email: "test@example.com" }));

    await registerController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "Already Register please login",
    });
  });
});

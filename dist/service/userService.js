"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
// import { createCartRepository } from "../repository/cartRepository";
const userRepository_1 = require("../repository/userRepository");
const ApiError_1 = require("../utils/ApiError");
async function registerUser(userDetails) {
    const existingUser = await (0, userRepository_1.findUser)({
        $or: [
            { email: userDetails.email },
            { mobileNumber: userDetails.mobileNumber },
        ],
    });
    if (existingUser) {
        throw new ApiError_1.ApiError("User with given email or mobile number already exists", 400);
    }
    const newUser = await (0, userRepository_1.createUser)(userDetails);
    // await createCartRepository(newUser._id);
    return newUser;
}

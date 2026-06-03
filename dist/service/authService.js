"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repository/userRepository");
const serverConfig_1 = __importDefault(require("../config/serverConfig"));
const ApiError_1 = require("../utils/ApiError");
async function loginUser(authDetails) {
    const { email, password } = authDetails;
    const user = await (0, userRepository_1.findUserWithPassword)({
        email,
    });
    if (!user) {
        throw new ApiError_1.ApiError("No user found with the given email", 404);
    }
    const isPasswordValidated = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValidated) {
        throw new ApiError_1.ApiError("Invalid password, please try again", 401);
    }
    const userRole = user.role || "USER";
    const token = jsonwebtoken_1.default.sign({
        email: user.email,
        id: user._id,
        role: userRole,
    }, serverConfig_1.default.JWT_SECRET, {
        expiresIn: serverConfig_1.default.JWT_EXPIRY,
    });
    return {
        token,
        userRole,
        userData: {
            email: user.email,
            firstName: user.firstName,
        },
    };
}

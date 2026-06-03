"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
const authService_1 = require("../service/authService");
const ApiError_1 = require("../utils/ApiError");
async function login(req, res) {
    try {
        const response = await (0, authService_1.loginUser)(req.body);
        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 *
                24 *
                60 *
                60 *
                1000,
        });
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                userRole: response.userRole,
                userData: response.userData,
            },
            error: null,
        });
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            return res
                .status(error.statusCode)
                .json({
                success: false,
                message: error.message,
                data: null,
                error: null,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: null,
        });
    }
}
async function logout(req, res) {
    console.log("Cookies from frontend", req.cookies);
    res.cookie("authToken", null, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
    });
    return res.status(200).json({
        success: true,
        message: "Logout successful",
        error: null,
        data: null,
    });
}

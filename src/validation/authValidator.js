const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnauthorizedError = require("../utils/unAuthorisedError");

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];

    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "Not auth token provided"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) {
            throw new UnauthorizedError();
        }

        // If reached here, then user is authenticated allow them to access the API

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }

        next();
    } catch (error) {
        console.log(error.name);
        if(error.name === "TokenExpiredError") {
            res.cookie("authToken", "", {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
                success: true,
                message: "Log out successfull",
                error: {},
                data: {}
            });
        }
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Not auth token provided"
        });
    }
}
/**
 * This function checks if the authenticated user is admin or not.
 * Because we'll call is admin after isLoggedIn that's why we'll recieve user details
 */

function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    console.log(loggedInUser)
    if(loggedInUser.role === "ADMIN") {
        next();
    } else {
        return res.status(401).json({
            success: false,
            data: {},
            message: "You're not authorized for this action",
            error: {
                statusCode: 401,
                reason: "Unauthorized user for this action"
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}
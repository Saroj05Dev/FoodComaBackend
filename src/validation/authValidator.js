const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnauthorizedError = require("../utils/unAuthorisedError");

/**
 * Middleware to check if user is logged in
 */
async function isLoggedIn(req, res, next) {
    try {
        const token = req.cookies?.authToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                data: {},
                error: "No auth token provided",
                message: "You must be logged in to access this resource",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            throw new UnauthorizedError("Invalid token");
        }

        // Attach user info to request
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role,
        };

        return next();
    } catch (error) {
        console.log("Auth error:", error.name);

        // Handle expired token explicitly
        if (error.name === "TokenExpiredError") {
            res.clearCookie("authToken", {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production", // secure only in prod
            });

            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again.",
                error: {},
                data: {},
            });
        }

        return res.status(401).json({
            success: false,
            data: {},
            error: error.message || "Unauthorized",
            message: "Invalid authentication token",
        });
    }
}

/**
 * Middleware to check if user is an admin
 */
function isAdmin(req, res, next) {
    const loggedInUser = req.user;

    if (!loggedInUser || loggedInUser.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            data: {},
            message: "You're not authorized for this action",
            error: {
                statusCode: 403,
                reason: "Forbidden: Admins only",
            },
        });
    }

    return next();
}

module.exports = {
    isLoggedIn,
    isAdmin,
};

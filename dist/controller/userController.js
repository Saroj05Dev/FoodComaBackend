"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const UserService = __importStar(require("../service/userService"));
const ApiError_1 = require("../utils/ApiError");
async function createUser(req, res) {
    try {
        const user = await UserService.registerUser(req.body);
        const userResponse = user.toObject();
        const { password, ...safeUser } = userResponse;
        return res.status(201).json({
            success: true,
            message: "Successfully registered user",
            data: safeUser,
            error: null,
        });
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            return res.status(error.statusCode).json({
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

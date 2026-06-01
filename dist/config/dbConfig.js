"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const serverConfig_1 = __importDefault(require("./serverConfig"));
async function connectDB() {
    try {
        await mongoose_1.default.connect(serverConfig_1.default.DB_URL);
        console.log("Successfully connected to mongodb...");
    }
    catch (error) {
        console.log("Failed to connect mongodb");
        console.log(error);
    }
}
exports.default = connectDB;

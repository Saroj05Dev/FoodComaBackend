"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
/* We have to initialize a router object to add routes in a new file.
Routers are used to segregate your routes in different modules **/
const authRouter = express_1.default.Router();
authRouter.post('/login', authController_1.login); // This is a route registration
authRouter.post('/logout', authController_1.logout);
module.exports = authRouter; // Exporting this router 

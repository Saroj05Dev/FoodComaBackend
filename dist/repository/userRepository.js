"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = findUser;
exports.createUser = createUser;
exports.findUserWithPassword = findUserWithPassword;
const userSchema_1 = __importDefault(require("../schema/userSchema"));
async function findUser(filters) {
    return userSchema_1.default.findOne(filters);
}
async function createUser(userDetails) {
    return userSchema_1.default.create(userDetails);
}
async function findUserWithPassword(filters) {
    return userSchema_1.default.findOne(filters).select("+password");
}

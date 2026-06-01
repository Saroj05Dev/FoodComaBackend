"use strict";
// import express from "express";
// import ServerConfig from "./config/serverConfig";
// import connectDB from "./config/dbConfig";
// import userRouter from "./routes/userRoutes";
// import authRouter from "./routes/authRouter";
// import cookieParser from "cookie-parser";
// import productRouter from "./routes/productRoutes";
// import cartRouter from "./routes/cartRoutes";
// import orderRouter from "./routes/orderRoutes";
// import cors from "cors";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://foodcomaapp.netlify.app",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cookie_parser_1.default)());
// Routing middlewares
app.use("/users", userRoutes_1.default);
// app.use("/auth", authRouter);
// app.use("/products", productRouter);
// app.use("/carts", cartRouter);
// app.use("/orders", orderRouter);
app.get("/ping", (req, res) => {
    console.log(req.body);
    return res.json({
        message: "pong",
    });
});
// Testing Cloudinary
// app.post("/photo", uploader.single("incomingFile"), async (req, res) => {
//     console.log(req.file);
// });
app.listen(serverConfig_1.default.PORT, async () => {
    await (0, dbConfig_1.default)();
    console.log(`Server started at port ${serverConfig_1.default.PORT}...`);
});

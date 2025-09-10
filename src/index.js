const express = require("express");
const ServerConfig = require('./config/serverConfig');
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const { isLoggedIn } = require("./validation/authValidator");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routing middlewares
app.use('/users', userRouter) // Connects the router to the server
app.use('/auth', authRouter)

app.post("/ping", isLoggedIn, (req, res) => {
    console.log(req.body);
    return res.json({ message: "pong" });
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server got started at port ${ServerConfig.PORT}...`);
});
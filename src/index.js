const express = require("express");
const ServerConfig = require('./config/serverConfig');
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const { isLoggedIn } = require("./validation/authValidator");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'https://foodcomaapp.netlify.app', // allow to server to accept request our frontend url
    credentials: true, // allow session cookie from browser to pass through
}));

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routing middlewares
app.use('/users', userRouter) // Connects the router to the server
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/carts', cartRouter)
app.use('/orders', orderRouter)

app.get("/ping", (req, res) => {
    console.log(req.body);
    return res.json({ message: "pong" });
})

// Testing Cloudinary
// app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
//     console.log(req.file);
//     const result = await cloudinary.uploader.upload(req.file.path);
//     console.log("result from cloudinary", result);
//     await fs.unlink(req.file.path);
//     return res.json({message: 'ok'});
// });

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server got started at port ${ServerConfig.PORT}...`);
});
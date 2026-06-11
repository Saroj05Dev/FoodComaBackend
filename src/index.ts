// import orderRouter from "./routes/orderRoutes";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import ServerConfig from "./config/serverConfig";
import connectDB from "./config/dbConfig";

import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRouter";
import productRouter from "./routes/productRoutes";
import cartRouter from "./routes/cartRoutes";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://foodcomaapp.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.text());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// Routing middlewares
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
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

app.listen(ServerConfig.PORT, async () => {
  await connectDB();

  console.log(
    `Server started at port ${ServerConfig.PORT}...`
  );
});
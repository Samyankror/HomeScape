import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import uploadImageRouter from "./routes/upload.routes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/upload", uploadImageRouter);


app.use((err, req, res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

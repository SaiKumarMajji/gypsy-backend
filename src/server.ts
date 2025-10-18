import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserDetail } from "./routes";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const userDetailRoute = new UserDetail();
app.use("/api/v1", userDetailRoute.router)

// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
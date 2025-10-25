import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserDetail } from "./routes";
import axios from "axios";


const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://gypsyaviator.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());

// Routes
const userDetailRoute = new UserDetail();
app.use("/api/v1", userDetailRoute.router)

// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// === Keep Render alive ===
const SELF_URL = "https://gypsy-aviators.onrender.com";
const PING_INTERVAL = 60 * 1000; // ping every 5 minutes (safe interval)

const keepAlive = () => {
  axios.get(SELF_URL)
    .then(() => console.log("💡 Keep-alive ping successful"))
    .catch((err) => console.error("⚠️ Keep-alive failed:", err.message));
};

setInterval(keepAlive, PING_INTERVAL);

// === Root route ===
app.get("/", (req, res) => {
  res.send("Server is up and running ✅");
});


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
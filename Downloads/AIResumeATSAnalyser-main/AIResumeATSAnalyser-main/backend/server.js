import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// Disable Mongoose command buffering so queries fail quickly with clear errors if DB is unreachable
mongoose.set("bufferCommands", false);

// MongoDB Connection Setup
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("CRITICAL: MONGO_URI is not set in environment variables!");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

connectDB();

// Auto-reconnect listener
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. Attempting reconnection...");
  connectDB();
});

// Middleware: Check Database Connection before handling DB-dependent routes
app.use((req, res, next) => {
  if (req.path.startsWith("/auth") || req.path.startsWith("/resume")) {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: "Database is currently connecting or unreachable. Please verify MONGO_URI on Render or try again in a few seconds."
      });
    }
  }
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
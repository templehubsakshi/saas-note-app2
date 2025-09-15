import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB (Vercel will handle connections per request)
connectDB();

// Export the app for Vercel (No app.listen here)
export default app;

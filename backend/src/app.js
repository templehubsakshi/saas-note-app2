import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://saas-note-app2-odjltl3hj-templehubsakshis-projects.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "false"); // optional
  if (req.method === "OPTIONS") return res.sendStatus(200); // respond to preflight
  next();
});

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// Error middleware
app.use(errorMiddleware);

export default app;

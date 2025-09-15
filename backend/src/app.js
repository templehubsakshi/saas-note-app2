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

// Enable CORS for frontend domain(s)
const allowedOrigins = [
  "http://localhost:5173", // local dev frontend
  "https://saas-note-app2-iu50set5w-templehubsakshis-projects.vercel.app" // deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const msg = `CORS policy does not allow access from origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true, // allow cookies / auth headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

// Health endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// Error middleware
app.use(errorMiddleware);

export default app;

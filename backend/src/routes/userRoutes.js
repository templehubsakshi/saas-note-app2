// routes/userRoutes.js
import express from "express";
import { inviteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/invite", authMiddleware, adminMiddleware, inviteUser);

export default router;

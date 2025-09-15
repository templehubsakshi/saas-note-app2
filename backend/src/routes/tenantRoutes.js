// routes/tenantRoutes.js
import express from "express";
import { upgradeTenant } from "../controllers/tenantController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { tenantMiddleware } from "../middleware/tenantMiddleware.js";

const router = express.Router();

router.post("/:slug/upgrade", authMiddleware, adminMiddleware, tenantMiddleware, upgradeTenant);

export default router;

// controllers/userController.js
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import bcrypt from "bcryptjs";

export const inviteUser = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const tenantId = req.user.tenantId; // from JWT

    if (!email || !name || !role) return res.status(400).json({ message: "Missing fields" });
    if (!["admin", "member"].includes(role)) return res.status(400).json({ message: "Invalid role" });

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash("password", 10); // default password
    const newUser = await User.create({
      name,
      email,
      role,
      tenant: tenantId,
      password: passwordHash,
    });

    res.status(201).json({ message: "User invited", user: newUser });
  } catch (error) {
    console.error("Invite error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// backend/src/seeder.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import Tenant from "../models/Tenant.js";
import User from "../models/User.js";

dotenv.config();

const seedData = async () => {
  try {
    // 1. Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // 2. Clear old data
    await Tenant.deleteMany({});
    await User.deleteMany({});
    console.log("Old data cleared 🗑️");

    // 3. Create tenants
    const acme = await Tenant.create({ name: "Acme", slug: "acme", plan: "free" });
    const globex = await Tenant.create({ name: "Globex", slug: "globex", plan: "free" });

    // 4. Create users
    const passwordHash = await bcrypt.hash("password", 10);

    await User.create([
      { name: "Acme Admin", email: "admin@acme.test", password: passwordHash, role: "admin", tenant: acme._id },
      { name: "Acme User", email: "user@acme.test", password: passwordHash, role: "member", tenant: acme._id },
      { name: "Globex Admin", email: "admin@globex.test", password: passwordHash, role: "admin", tenant: globex._id },
      { name: "Globex User", email: "user@globex.test", password: passwordHash, role: "member", tenant: globex._id },
    ]);

    console.log("Tenants and Users seeded ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();

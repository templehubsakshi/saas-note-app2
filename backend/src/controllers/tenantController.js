import Tenant from "../models/Tenant.js";

export const upgradeTenant = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Tenant find karo slug se
    const tenant = await Tenant.findOne({ slug });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // 2. Plan ko Pro me update karo
    tenant.plan = "pro";
    await tenant.save();

    res.json({ message: `${tenant.name} upgraded to Pro`, plan: tenant.plan });
  } catch (error) {
    console.error("Upgrade error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

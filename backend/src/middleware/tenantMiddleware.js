// middleware/tenantMiddleware.js
import Tenant from "../models/Tenant.js";

export const tenantMiddleware = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Slug se tenant find karo
    const tenant = await Tenant.findOne({ slug });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // Check karo ki user isi tenant ka hai
    if (tenant._id.toString() !== req.user.tenantId) {
      return res.status(403).json({ message: "Access denied for this tenant" });
    }

    // Tenant ko request object me daal do
    req.tenant = tenant;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Tenant verification failed" });
  }
};

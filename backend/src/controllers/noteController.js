import Note from "../models/Note.js";
import Tenant from "../models/Tenant.js";

// ---------------- Create Note ----------------
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { tenantId, userId } = req.user; // 👈 ensure JWT se aa raha hai

    // Tenant check
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    // Free plan limit check (max 3 notes)
    if (tenant.plan === "free") {
      const noteCount = await Note.countDocuments({ tenantId });
      if (noteCount >= 3) {
        return res
          .status(403)
          .json({ message: "Free plan limit reached. Upgrade to Pro." });
      }
    }

    // Create new note
    const note = await Note.create({
      title,
      content,
      tenantId,       // 👈 fixed
      createdBy: userId, // 👈 fixed
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Create Note Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get All Notes ----------------
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ tenantId: req.user.tenantId });
    res.json(notes);
  } catch (error) {
    console.error("Get Notes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get Single Note ----------------
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Get Note Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Update Note ----------------
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.tenantId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Update Note Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Delete Note ----------------
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error("Delete Note Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {   
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    sponsorCode: { type: String, required: true },
    sponsorName: { type: String, required: true },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    idNumber: { type: String, required: false, unique: true },
    nationality: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferredLanguage: { type: String, default: "English" },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String },
    image: { type: String },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
     role: { type: String, enum: ["admin", "user"], default: "user" }, // ✅ নতুন ফিল্ড
    // New fields
    Usercode: { type: String, required: true, unique: true }, // auto code
    isApproved: { type: Boolean, default: false }, // Admin approval
    visibility: { type: String, enum: ["private", "public"], default: "private" }, // Data privacy
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

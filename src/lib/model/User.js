// src/models/User.js
import mongoose from "mongoose";
import crypto from "crypto";

// Function to generate a random 6-digit numeric code
const generateUserCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};

const userSchema = new mongoose.Schema(
  {
    userCode: {
      type: String,
      unique: true,
      default: generateUserCode, // auto-generate on creation
    },
    sponsorCode: { type: String, required: true },
    sponsorName: { type: String, required: true },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    idNumber: { type: String, unique: true, default: () => crypto.randomBytes(4).toString("hex").toUpperCase() },
    nationality: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferredLanguage: { type: String, default: "English" },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String },
    image: { type: String }, // URL for uploaded image
    password: { type: String, required: true },
    balance: { type: Number, default: 0 }, // for sponsor reward system
  },
  { timestamps: true }
);

// Pre-save hook to ensure userCode is unique
userSchema.pre("save", async function (next) {
  if (!this.userCode) {
    let code;
    let exists = true;
    while (exists) {
      code = generateUserCode();
      exists = await mongoose.models.User.findOne({ userCode: code });
    }
    this.userCode = code;
  }

  if (!this.idNumber) {
    let id;
    let exists = true;
    while (exists) {
      id = crypto.randomBytes(4).toString("hex").toUpperCase();
      exists = await mongoose.models.User.findOne({ idNumber: id });
    }
    this.idNumber = id;
  }

  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);

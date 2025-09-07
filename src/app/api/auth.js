// src/pages/api/auth.js
import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await db;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action } = req.query; // ?action=register or ?action=login

  try {
    // ------------------ REGISTER ------------------
    if (action === "register") {
      const {
        sponsorCode,
        sponsorName,
        fullName,
        gender,
        dob,
        nationality,
        mobile,
        email,
        preferredLanguage,
        address,
        state,
        city,
        postCode,
        password,
      } = req.body;

      if (!email || !password || !fullName) {
        return res.status(400).json({ error: "All required fields must be filled" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user without sending idNumber/userCode from frontend
      const newUser = new User({
        sponsorCode,
        sponsorName,
        fullName,
        gender,
        dob,
        nationality,
        mobile,
        email,
        preferredLanguage,
        address,
        state,
        city,
        postCode,
        password: hashedPassword,
        balance: 0,
      });

      await newUser.save();

      return res.status(201).json({
        message: "✅ Registration successful",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          userCode: newUser.userCode,
          idNumber: newUser.idNumber,
        },
      });
    }

    // ------------------ LOGIN ------------------
    if (action === "login") {
      const { email, password, userCode } = req.body;

      if ((!email && !userCode) || !password) {
        return res.status(400).json({ error: "Email/UserCode and password are required" });
      }

      // Find by email or userCode
      const user = await User.findOne(
        email ? { email } : { userCode }
      );

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "mysecret",
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "✅ Login successful",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          userCode: user.userCode,
          idNumber: user.idNumber,
          balance: user.balance,
        },
      });
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

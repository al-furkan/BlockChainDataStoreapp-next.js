// src/pages/api/public-users.js
import db from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  await db;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const users = await User.find({ visibility: "public", isApproved: true })
      .select("fullName email mobile Usercode balance");
    return res.status(200).json({ users });
  } catch (err) {
    console.error("Public users error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

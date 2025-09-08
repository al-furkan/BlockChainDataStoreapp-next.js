// src/pages/api/admin/users.js
import db from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  await db;

  try {
    if (req.method === "GET") {
      // সব ইউজারের ডাটা (password ছাড়া)
      const users = await User.find().select("-password");
      return res.status(200).json({ users });
    }

    if (req.method === "PATCH") {
      const { userId, isApproved } = req.body;
      if (!userId) return res.status(400).json({ error: "User ID required" });

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      user.isApproved = isApproved;
      await user.save();

      return res.status(200).json({ message: "User approval updated", user });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Admin error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

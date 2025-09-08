import db from "@/lib/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  await db;

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Update allowed fields
    const allowedFields = ["fullName", "mobile", "address", "city", "state"];
    allowedFields.forEach((field) => {
      if (body[field]) user[field] = body[field];
    });

    await user.save();
    return NextResponse.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("Update profile error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

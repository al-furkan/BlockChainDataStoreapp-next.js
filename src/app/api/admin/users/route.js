import db from "@/lib/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

async function authAdmin(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const token = auth.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET(req) {
  await db;
  const admin = await authAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const users = await User.find().select("-password");
  return NextResponse.json({ users });
}

export async function PATCH(req) {
  await db;
  const admin = await authAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status:401 });
  const body = await req.json();
  const { userId, isApproved } = body;
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error:"Not found"}, {status:404});
  user.isApproved = isApproved;
  await user.save();
  return NextResponse.json({ message: "Updated", user });
}

export async function DELETE(req) {
  await db;
  const admin = await authAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status:401 });
  const body = await req.json();
  const { userId } = body;
  await User.findByIdAndDelete(userId);
  return NextResponse.json({ message: "Deleted" });
}

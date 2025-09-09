import { NextResponse } from "next/server";
import db from "../../../lib/db";
import User from "../../../models/User";
import fs from "fs";
import path from "path";

// ফাইল আপলোড রুট
export async function POST(req) {
  try {
    await db();

    const formData = await req.formData();
    const userId = formData.get("userId");
    const file = formData.get("file");
    const visibility = formData.get("visibility") || "private"; // default private

    if (!userId || !file) {
      return NextResponse.json(
        { success: false, message: "User ID and file required" },
        { status: 400 }
      );
    }

    // ইউজার খুঁজে বের করা
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // public/uploads ডিরেক্টরি তৈরি যদি না থাকে
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ফাইল সেভ
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    // ফাইল ডাটা DB তে রাখা
    const fileRecord = {
      name: file.name,
      path: `/uploads/${fileName}`,
      visibility,
      uploadedAt: new Date(),
    };

    user.files = user.files || [];
    user.files.push(fileRecord);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      file: fileRecord,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

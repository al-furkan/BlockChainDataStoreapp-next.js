//src/app/api/users/[id]/route.js
import db from "../../../../lib/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

// =============================
// GET /api/users/[id] → ইউজারের প্রোফাইল ডেটা আনা
// =============================
export async function GET(req, { params }) {
  try {
    await db();
    const { id } = params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("GET User Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// =============================
// PUT /api/users/[id] → প্রোফাইল আপডেট
// =============================
export async function PUT(req, { params }) {
  try {
    await db();
    const { id } = params;
    const body = await req.json();

    // আপডেটেবল ফিল্ডস
    const updatableFields = [
      "fullName",
      "gender",
      "dob",
      "idNo",
      "nationality",
      "mobile",
      "email",
      "preferredLanguage",
      "address",
      "state",
      "city",
      "postCode",
    ];

    const updates = {};
    updatableFields.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("PUT User Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// =============================
// DELETE /api/users/[id] → ইউজার মুছে ফেলা
// =============================
export async function DELETE(req, { params }) {
  try {
    await db();
    const { id } = params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE User Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

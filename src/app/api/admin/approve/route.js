//src/app/api/admin/approve/route.js
import db from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// কমিশন স্ট্রাকচার
const commissionLevels = [20, 5, 3, 3, 3, 3, 3, 2.5, 2.5, 2.5, 2.5];

export async function POST(req) {
  try {
    await db();

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
    }

    // ইউজার খুঁজে বের করা
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (user.approved) {
      return NextResponse.json({ success: false, message: "User already approved" }, { status: 400 });
    }

    // ইউজার অ্যাপ্রুভ করা
    user.approved = true;
    user.balance = (user.balance || 0) + commissionLevels[0]; // ইউজার নিজে 20 টাকা পাবে
    await user.save();

    // স্পন্সর কমিশন বন্টন করা
    let sponsorCode = user.sponsorCode;
    for (let i = 1; i < commissionLevels.length; i++) {
      if (!sponsorCode) break;

      const sponsor = await User.findOne({ sponsorCode });
      if (!sponsor) break;

      sponsor.balance = (sponsor.balance || 0) + commissionLevels[i];
      await sponsor.save();

      sponsorCode = sponsor.sponsorCode; // নেক্সট আপলাইন খুঁজে বের করার চেষ্টা
    }

    return NextResponse.json({ success: true, message: "User approved successfully" });
  } catch (error) {
    console.error("Approval Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

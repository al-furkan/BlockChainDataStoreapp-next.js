import db from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Disable default body parsing (for file uploads)
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await db;

  try {
    const formData = await req.formData();
    const fields = Object.fromEntries(formData.entries());
    const imageFile = formData.get("image"); // Optional file

    const {
      sponsorCode,
      sponsorName,
      fullName,
      gender,
      dob,
      nationality,
      mobile,
      email,
      preferredLanguage = "English",
      address,
      state,
      city,
      password,
      Usercode,
    } = fields;

    // Required field check
    if (!email || !password || !fullName || !Usercode) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Check duplicates
    if (await User.findOne({ email })) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    if (await User.findOne({ Usercode })) {
      return NextResponse.json({ error: "Usercode already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
      password: hashedPassword,
      Usercode,
      balance: 0,
      image: imageFile ? Buffer.from(await imageFile.arrayBuffer()) : null, // Save image as buffer
    });

    await newUser.save();

    // Sponsor bonus logic
    const bonusLevels = [20, 5, 3, 3, 3, 3, 3, 2.5, 2.5, 2.5, 2.5];
    let currentSponsorCode = sponsorCode;
    let level = 0;

    while (currentSponsorCode && level < bonusLevels.length) {
      const sponsor = await User.findOne({ Usercode: currentSponsorCode });
      if (!sponsor) break;

      sponsor.balance += bonusLevels[level];
      await sponsor.save();

      currentSponsorCode = sponsor.sponsorCode;
      level++;
    }

    return NextResponse.json(
      { message: "✅ Registration successful with sponsor bonus" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

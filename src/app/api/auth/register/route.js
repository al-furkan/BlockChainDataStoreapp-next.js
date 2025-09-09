import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

function generateSponsorCode() {
  return 'SP' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req) {
  await dbConnect();

  const formData = await req.formData(); // ✅ instead of req.json()

  const body = {};
  for (const [key, value] of formData.entries()) {
    body[key] = value;
  }

  const {
    sponsorCode: sponsorCodeProvided,
    refSponsorCode,
    refSponsorName,
    fullName,
    gender,
    dob,
    idNo,
    nationality,
    mobile,
    email,
    preferredLanguage,
    address,
    state: stateProvince,
    city: cityTown,
    postCode,
    image,
    password
  } = body;

  // Optional sponsor reference
  let sponsorDoc = null;
  if (refSponsorCode) {
    sponsorDoc = await User.findOne({ sponsorCode: refSponsorCode });
  }

  // Unique sponsor code generation
  let newCode = generateSponsorCode();
  while (await User.findOne({ sponsorCode: newCode })) {
    newCode = generateSponsorCode();
  }

  const hashed = await bcrypt.hash(password || 'defaultpass', 10);

  const user = new User({
    sponsorCode: newCode,
    sponsor: sponsorDoc ? sponsorDoc._id : null,
    sponsorName: refSponsorName,
    fullName,
    gender,
    dob,
    idNo,
    nationality,
    mobile,
    email,
    preferredLanguage,
    address,
    stateProvince,
    cityTown,
    postCode,
    image,
    password: hashed,
    isApproved: false
  });

  await user.save();

  return new Response(JSON.stringify({ message: 'Registration successful. Wait for admin approval.', sponsorCode: newCode }), { status: 201 });
}

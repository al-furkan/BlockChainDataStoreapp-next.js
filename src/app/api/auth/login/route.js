import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await dbConnect();
  const { sponsorCode, password } = await req.json();

  const user = await User.findOne({ sponsorCode });
  if (!user) 
    return new Response(JSON.stringify({ error: 'Invalid sponsor code or password' }), { status: 401 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) 
    return new Response(JSON.stringify({ error: 'Invalid sponsor code or password' }), { status: 401 });

  if (!user.isApproved)
    return new Response(JSON.stringify({ error: 'Account not approved yet' }), { status: 403 });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  return new Response(JSON.stringify({ 
      message: 'Logged in successfully', 
      user: { id: user._id, role: user.role } 
    }), {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}; SameSite=Strict; Secure`
      }
    });
}
